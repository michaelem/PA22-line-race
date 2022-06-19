export default class KeyState {
  keymap: Map<string, boolean>;

  constructor() {
    this.keymap = new Map<string, boolean>();
    console.log(this.keymap);
  }

  isDown(code: string) {
    return this.keymap.get(code) || false;
  }

  onKeydown(event: KeyboardEvent) {
    this.keymap.set(event.code, true);
  }

  onKeyup(event: KeyboardEvent) {
    this.keymap.set(event.code, false);
  }
}
