class Profiler {
  logger = console.log;
  enabled = false;

  constructor(logger?: (msg?: any) => void) {
    if (logger) {
      this.logger = logger;
    }
  }

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
  }

  tick(module: string, subsystem: string) {
    if (!this.enabled) return () => {};

    const start = new Date();

    const tock = (payload?: any) => {
      const end = new Date();
      const profile: ProfilingEvent = {
        ts: start.toISOString(),
        delta: (end.getTime() - start.getTime()).toFixed(2).toString(),
        module: module,
        sub: subsystem,
        payload: payload,
      };

      this.logger(profile);
    };

    return tock.bind(this);
  }
}

export default Profiler;
