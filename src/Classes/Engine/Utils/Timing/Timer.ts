export default class Timer {
  protected target: number;
  protected elapsed: number = 0;
  protected _justFinished = false;
  public repeating: boolean;

  constructor(target: number, repeating: boolean = true) {
    this.target = target;
    this.repeating = repeating;
  }

  tick(time: number): typeof this {
    this._justFinished = false;
    this.elapsed += time;
    if (this.target <= this.elapsed) {
      this._justFinished = true;
      if (this.repeating) {
        this.reset();
      }
    }
    return this;
  }

  get justFinished(): boolean {
    return this._justFinished;
  }

  get percentRemaining(): number {
    return 1 - this.elapsed / this.target;
  }

  get remaining(): number {
    return this.target - this.elapsed;
  }

  reset(): typeof this {
    this.elapsed = 0;
    return this;
  }
}
