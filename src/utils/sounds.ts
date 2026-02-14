/**
 * Sound Manager — 3 sounds only:
 * 1. playClick()          — Low-pitch mechanical thunk
 * 2. playTypewriterClick() — Same thunk for typewriter animation
 * 3. startCassetteWhir()  — Looping tape whir for rewind/fast-forward
 */

class SoundManager {
    private ctx: AudioContext | null = null;
    private whirSource: AudioBufferSourceNode | null = null;
    private whirGain: GainNode | null = null;
    private clickBuffer: AudioBuffer | null = null;

    private getCtx() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
        return this.ctx;
    }

    /**
     * Warm up AudioContext on first user gesture so subsequent
     * programmatic playback (e.g. typewriter) is not blocked.
     */
    warmUp() {
        this.getCtx();
    }

    /**
     * Pre-render a low-pitch mechanical thunk.
     * Heavier, darker, typewriter-style sound.
     */
    private ensureClickBuffer(): AudioBuffer {
        if (this.clickBuffer) return this.clickBuffer;

        const ctx = this.getCtx();
        const sampleRate = ctx.sampleRate;

        const duration = 0.08; // 80ms
        const length = Math.floor(sampleRate * duration);
        const buffer = ctx.createBuffer(1, length, sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < length; i++) {
            const t = i / sampleRate;
            let sample = 0;

            // ── Layer 1: Deep body thunk (main weight)
            if (t < 0.06) {
                const sweepFreq = 110 - (t / 0.06) * 35; // 110Hz → 75Hz
                const body = Math.sin(2 * Math.PI * sweepFreq * t);
                const envelope = 1 - (t / 0.06);
                sample += body * 0.9 * envelope;
            }

            // ── Layer 2: Mid mechanical resonance
            if (t < 0.05) {
                const resonance = Math.sin(2 * Math.PI * 220 * t);
                const envelope = 1 - (t / 0.05);
                sample += resonance * 0.25 * envelope;
            }

            // ── Layer 3: Dark impact texture (low-passed noise)
            if (t < 0.015) {
                const noise = Math.sin(i * 91.7) * Math.sin(i * 47.3);
                const envelope = 1 - (t / 0.015);
                sample += noise * 0.15 * envelope;
            }

            data[i] = sample;
        }

        this.clickBuffer = buffer;
        return buffer;
    }

    /**
     * Low mechanical thunk click.
     * Silently no-ops if AudioContext is still suspended (no user gesture yet).
     */
    playClick() {
        const ctx = this.getCtx();
        if (ctx.state === 'suspended') {
            // AudioContext not yet unlocked by a user gesture — skip silently
            return;
        }
        const now = ctx.currentTime;

        const source = ctx.createBufferSource();
        source.buffer = this.ensureClickBuffer();

        const compressor = ctx.createDynamicsCompressor();
        compressor.threshold.setValueAtTime(-20, now);
        compressor.knee.setValueAtTime(6, now);
        compressor.ratio.setValueAtTime(8, now);
        compressor.attack.setValueAtTime(0.003, now);
        compressor.release.setValueAtTime(0.08, now);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.95, now);

        source.connect(gain);
        gain.connect(compressor);
        compressor.connect(ctx.destination);
        source.start(now);
    }

    playTypewriterClick() {
        this.playClick();
    }

    // ── Cassette whir (unchanged logic, slightly fuller) ──

    startCassetteWhir(isRewind: boolean = true) {
        const ctx = this.getCtx();
        this.stopCassetteWhir();

        const duration = 2.0;
        const bufferSize = Math.floor(ctx.sampleRate * duration);
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
        filter.frequency.setValueAtTime(isRewind ? 500 : 850, ctx.currentTime);
        filter.Q.setValueAtTime(1.2, ctx.currentTime);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.1);

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
                try { sourceRef.stop(); } catch {}
            }, 120);
        }
        this.whirSource = null;
        this.whirGain = null;
    }
}

export const soundManager =
    typeof window !== 'undefined' ? new SoundManager() : null;
