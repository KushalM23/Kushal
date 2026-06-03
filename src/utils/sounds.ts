type WindowWithWebkitAudioContext = Window & {
    webkitAudioContext?: typeof AudioContext;
};

class SoundManager {
    private ctx: AudioContext | null = null;
    private masterGain: GainNode | null = null;
    private playLoopSource: AudioBufferSourceNode | null = null;
    private playLoopGain: GainNode | null = null;
    private whirSource: AudioBufferSourceNode | null = null;
    private whirGain: GainNode | null = null;

    private buffers: Record<string, AudioBuffer> = {};
    private offsets: Record<string, number> = {};
    private loading: Partial<Record<string, Promise<void>>> = {};
    private readonly soundUrls: Record<string, string> = {
        click: "/sounds/click.mp3",
        play: "/sounds/play-cassette.mp3",
        insert: "/sounds/insert-cassette.mp3",
    };

    constructor() {
        void this.preloadAll();
    }

    // ─────────────────────────────────────────────
    // Context Setup
    // ─────────────────────────────────────────────

    private getCtx() {
        if (!this.ctx) {
            const AudioContextConstructor =
                window.AudioContext ||
                (window as WindowWithWebkitAudioContext).webkitAudioContext;

            if (!AudioContextConstructor) {
                throw new Error("Web Audio API is not supported in this browser.");
            }

            this.ctx = new AudioContextConstructor();
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.value = 0.95;
            this.masterGain.connect(this.ctx.destination);
        }

        if (this.ctx.state === "suspended") {
            this.ctx.resume();
        }

        return this.ctx;
    }

    warmUp() {
        this.getCtx();
        void this.preloadAll();
    }

    // ─────────────────────────────────────────────
    // Audio Loader
    // ─────────────────────────────────────────────

    private async loadSound(name: string, url: string) {
        if (this.buffers[name]) return;
        if (this.loading[name]) return this.loading[name];

        const ctx = this.getCtx();

        this.loading[name] = fetch(url)
            .then(res => res.arrayBuffer())
            .then(data => ctx.decodeAudioData(data))
            .then(buffer => {
                this.buffers[name] = buffer;
                this.offsets[name] = this.detectLeadingOffset(buffer);
                delete this.loading[name];
            })
            .catch(() => {
                delete this.loading[name];
            });

        return this.loading[name];
    }

    private detectLeadingOffset(buffer: AudioBuffer) {
        const threshold = 0.002;
        const totalSamples = buffer.length;
        const channels = buffer.numberOfChannels;

        for (let i = 0; i < totalSamples; i++) {
            for (let c = 0; c < channels; c++) {
                if (Math.abs(buffer.getChannelData(c)[i]) > threshold) {
                    return i / buffer.sampleRate;
                }
            }
        }

        return 0;
    }

    private playBuffer(name: string, volume = 1, playbackRate = 1) {
        const ctx = this.getCtx();
        if (!this.masterGain) return;
        if (!this.buffers[name]) {
            const url = this.soundUrls[name];
            if (!url) return;
            void this.loadSound(name, url).then(() => {
                this.playBuffer(name, volume, playbackRate);
            });
            return;
        }

        const source = ctx.createBufferSource();
        source.buffer = this.buffers[name];
        source.playbackRate.value = playbackRate;
        const offset = this.offsets[name] ?? 0;

        const gain = ctx.createGain();
        gain.gain.value = volume;

        source.connect(gain);
        gain.connect(this.masterGain);

        source.start(ctx.currentTime + 0.001, offset);
    }

    // ─────────────────────────────────────────────
    // Public Methods
    // ─────────────────────────────────────────────

    async preloadAll() {
        await Promise.all(Object.entries(this.soundUrls).map(([name, url]) => this.loadSound(name, url)));
    }

    playClick() {
        this.playBuffer("click", 1, 1 + (Math.random() - 0.5) * 0.02);
    }

    playTypewriterClick() {
        this.playClick();
    }

    playCassettePlay() {
        this.playBuffer("play", 1, 1);
    }

    startCassettePlayLoop() {
        const ctx = this.getCtx();
        if (!this.masterGain) return;

        this.stopCassettePlayLoop();

        const playBuffer = this.buffers["play"];
        if (!playBuffer) {
            void this.preloadAll();
            return;
        }

        const source = ctx.createBufferSource();
        source.buffer = playBuffer;
        source.loop = true;
        source.playbackRate.value = 1;
        const offset = this.offsets["play"] ?? 0;

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.16, ctx.currentTime + 0.1);

        source.connect(gain);
        gain.connect(this.masterGain);

        source.start(ctx.currentTime + 0.001, offset);
        this.playLoopSource = source;
        this.playLoopGain = gain;
    }

    stopCassettePlayLoop() {
        if (!this.ctx || !this.playLoopSource || !this.playLoopGain) {
            this.playLoopSource = null;
            this.playLoopGain = null;
            return;
        }

        const ctx = this.ctx;
        const sourceRef = this.playLoopSource;
        const gainRef = this.playLoopGain;

        gainRef.gain.cancelScheduledValues(ctx.currentTime);
        gainRef.gain.setValueAtTime(Math.max(gainRef.gain.value, 0.0001), ctx.currentTime);
        gainRef.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);

        setTimeout(() => {
            try {
                sourceRef.stop();
            } catch {}
        }, 100);

        this.playLoopSource = null;
        this.playLoopGain = null;
    }

    playInsertCassette() {
        this.playBuffer("insert", 1, 1);
    }

    startCassetteWhir(isRewind: boolean = true) {
        const ctx = this.getCtx();
        if (!this.masterGain) return;

        this.stopCassetteWhir();

        const duration = 1.2;
        const bufferSize = Math.floor(ctx.sampleRate * duration);
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = noiseBuffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const source = ctx.createBufferSource();
        source.buffer = noiseBuffer;
        source.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(isRewind ? 500 : 850, ctx.currentTime);
        filter.Q.setValueAtTime(1.2, ctx.currentTime);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.14, ctx.currentTime + 0.1);

        source.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        source.start(ctx.currentTime + 0.001);
        this.whirSource = source;
        this.whirGain = gain;
    }

    stopCassetteWhir() {
        if (!this.ctx || !this.whirSource || !this.whirGain) {
            this.whirSource = null;
            this.whirGain = null;
            return;
        }

        const ctx = this.ctx;
        const sourceRef = this.whirSource;
        const gainRef = this.whirGain;

        gainRef.gain.cancelScheduledValues(ctx.currentTime);
        gainRef.gain.setValueAtTime(Math.max(gainRef.gain.value, 0.0001), ctx.currentTime);
        gainRef.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);

        setTimeout(() => {
            try {
                sourceRef.stop();
            } catch {}
        }, 120);

        this.whirSource = null;
        this.whirGain = null;
    }

    setMasterVolume(value: number) {
        if (this.masterGain) {
            this.masterGain.gain.value = Math.max(0, Math.min(1, value));
        }
    }
}

export const soundManager =
    typeof window !== "undefined" ? new SoundManager() : null;
