/**
 * Retro mechanical sound synthesis
 * Uses Web Audio API noise generation and filtering to simulate
 * typewriter clicks and cassette mechanical whirring.
 */

class SoundManager {
    private ctx: AudioContext | null = null;
    private whirSource: AudioBufferSourceNode | null = null;
    private whirGain: GainNode | null = null;

    private getCtx() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
        return this.ctx;
    }

    // Mechanical typewriter click
    playClick() {
        const ctx = this.getCtx();
        const now = ctx.currentTime;

        const bufferSize = ctx.sampleRate * 0.05;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const source = ctx.createBufferSource();
        source.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(2000, now);
        filter.Q.setValueAtTime(1, now);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        source.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        source.start(now);
    }

    // Fast typewriter typing click
    playTypewriterClick() {
        const ctx = this.getCtx();
        const now = ctx.currentTime;

        const bufferSize = ctx.sampleRate * 0.02;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const source = ctx.createBufferSource();
        source.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(3000 + Math.random() * 2000, now);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);

        source.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        source.start(now);
    }

    // Mechanical hover (lighter click)
    playHover() {
        const ctx = this.getCtx();
        const now = ctx.currentTime;
        const gain = ctx.createGain();
        const osc = ctx.createOscillator();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.03);

        gain.gain.setValueAtTime(0.02, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.03);
    }

    // Cassette mechanical click (toggle)
    playToggle(isOpen: boolean) {
        const ctx = this.getCtx();
        const now = ctx.currentTime;

        const playClunk = (time: number, freq: number, vol: number) => {
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(freq, time);
            osc.frequency.exponentialRampToValueAtTime(50, time + 0.05);
            g.gain.setValueAtTime(vol, time);
            g.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
            osc.connect(g);
            g.connect(ctx.destination);
            osc.start(time);
            osc.stop(time + 0.05);
        };

        if (isOpen) {
            playClunk(now, 150, 0.1);
            playClunk(now + 0.05, 300, 0.05);
        } else {
            playClunk(now, 300, 0.1);
            playClunk(now + 0.05, 100, 0.05);
        }
    }

    // Start loopable cassette whir
    startCassetteWhir(isRewind: boolean = true) {
        const ctx = this.getCtx();
        this.stopCassetteWhir();

        const duration = 2.0;
        const bufferSize = ctx.sampleRate * duration;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(isRewind ? 600 : 1000, ctx.currentTime);
        filter.Q.setValueAtTime(1.5, ctx.currentTime);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.1);

        source.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        source.start();
        this.whirSource = source;
        this.whirGain = gain;
    }

    stopCassetteWhir() {
        if (this.whirGain && this.whirSource) {
            const ctx = this.getCtx();
            this.whirGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1);
            const sourceRef = this.whirSource;
            setTimeout(() => {
                try { sourceRef.stop(); } catch (e) { }
            }, 100);
        }
        this.whirSource = null;
        this.whirGain = null;
    }

    // Legacy one-shot support
    playCassetteWhir(duration: number = 0.5, isRewind: boolean = true) {
        this.startCassetteWhir(isRewind);
        setTimeout(() => this.stopCassetteWhir(), duration * 1000);
    }
}

export const soundManager = typeof window !== 'undefined' ? new SoundManager() : null;
