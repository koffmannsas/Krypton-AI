export enum SoundType {
  IDLE = "idle",
  HOVER = "hover",
  FLIP = "flip",
  WARP = "warp",
  CLICK = "click",
}

class KryptonSoundEngine {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = true;
  private masterGain: GainNode | null = null;
  private idleNodes: {
    source: AudioBufferSourceNode;
    filter: BiquadFilterNode;
    gain: GainNode;
  } | null = null;
  private backAmbianceNodes: {
    source: AudioBufferSourceNode;
    gain: GainNode;
  } | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      window.addEventListener("click", () => this.init(), { once: true });
    }
  }

  private init() {
    if (this.ctx) return;
    const AudioContextClass =
      (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    this.ctx = new AudioContextClass();
    this.masterGain = this.ctx!.createGain();
    this.masterGain.gain.value = 0.12; // Moderate volume for premium feel
    this.masterGain.connect(this.ctx!.destination);

    if (this.ctx!.state === "suspended") {
      this.ctx!.resume();
    }
  }

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    if (!enabled) {
      this.stopIdleAmbiance();
      this.stopBackAmbiance();
    }
  }

  private async ensureCtx() {
    if (!this.ctx) this.init();
    if (this.ctx?.state === "suspended") await this.ctx.resume();
  }

  // 1. IDLE STATE - Subtle cosmic background
  public async playIdleAmbiance() {
    if (!this.isEnabled || !this.ctx || this.idleNodes) return;
    await this.ensureCtx();

    const bufferSize = this.ctx.sampleRate * 10;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(150, this.ctx.currentTime);

    // LFO for subtle variation
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.value = 0.1;
    lfoGain.gain.value = 50;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.03, this.ctx.currentTime + 2);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain!);

    source.start();
    this.idleNodes = { source, filter, gain };
  }

  public stopIdleAmbiance() {
    if (this.idleNodes) {
      const { gain, source } = this.idleNodes;
      if (this.ctx) {
        gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1);
        setTimeout(() => source.stop(), 1100);
      }
      this.idleNodes = null;
    }
  }

  // 2. HOVER - Activation riser with specific gate identities
  public async playHover(gateId: string) {
    if (!this.isEnabled || !this.ctx) return;
    await this.ensureCtx();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    let freq = 200;
    let type: OscillatorType = "sine";

    switch (gateId) {
      case "TERRA":
        freq = 120; // Stable, grave
        type = "sine";
        break;
      case "MARS":
        freq = 220; // Pulsation rythmée
        type = "triangle";
        const pulse = this.ctx.createOscillator();
        const pulseGain = this.ctx.createGain();
        pulse.frequency.value = 8;
        pulseGain.gain.value = 0.5;
        pulse.connect(pulseGain.gain);
        break;
      case "KRYPTON":
        freq = 350; // Electric, precise
        type = "sawtooth";
        filter.type = "highpass";
        filter.frequency.value = 1000;
        break;
      case "GALAXY":
        freq = 180; // Spatial, deep
        type = "sine";
        const mod = this.ctx.createOscillator();
        const modGain = this.ctx.createGain();
        mod.frequency.value = 0.5;
        modGain.gain.value = 20;
        mod.connect(modGain);
        modGain.connect(osc.frequency);
        mod.start();
        break;
    }

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(
      freq * 1.3,
      this.ctx.currentTime + 0.5,
    );

    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.1);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.6);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain!);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.6);
  }

  // 3. FLIP - Whoosh effect
  public async playFlip() {
    if (!this.isEnabled || !this.ctx) return;
    await this.ensureCtx();

    const bufferSize = this.ctx.sampleRate * 0.9;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.Q.value = 4;
    filter.frequency.setValueAtTime(200, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(
      3500,
      this.ctx.currentTime + 0.4,
    );
    filter.frequency.exponentialRampToValueAtTime(
      400,
      this.ctx.currentTime + 0.9,
    );

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.25, this.ctx.currentTime + 0.4);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.9);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain!);

    source.start();
    source.stop(this.ctx.currentTime + 0.9);
  }

  // 4. BACK AMBIANCE - Clarity and control
  public async playBackAmbiance() {
    if (!this.isEnabled || !this.ctx || this.backAmbianceNodes) return;
    await this.ensureCtx();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 440; // Clean A4

    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1200;

    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.02, this.ctx.currentTime + 0.5);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain!);

    osc.start();
    this.backAmbianceNodes = { source: osc as any, gain };
  }

  public stopBackAmbiance() {
    if (this.backAmbianceNodes) {
      const { gain, source } = this.backAmbianceNodes;
      if (this.ctx) {
        gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.5);
        setTimeout(() => (source as any).stop(), 600);
      }
      this.backAmbianceNodes = null;
    }
  }

  // 5. WARP - Engagement transition
  public async playWarp() {
    if (!this.isEnabled || !this.ctx) return;
    await this.ensureCtx();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.setValueAtTime(1000, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(20, this.ctx.currentTime + 1.5);

    filter.type = "lowpass";
    filter.Q.value = 25;
    filter.frequency.setValueAtTime(4000, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(
      100,
      this.ctx.currentTime + 1.5,
    );

    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.4, this.ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.5);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain!);

    osc.start();
    osc.stop(this.ctx.currentTime + 1.6);
  }

  public async playClick() {
    if (!this.isEnabled || !this.ctx) return;
    await this.ensureCtx();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(
      0.01,
      this.ctx.currentTime + 0.2,
    );

    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(this.masterGain!);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  }
}

export const soundEngine = new KryptonSoundEngine();
