import { Color } from "./types";

export class ColorPicker {
  constructor(
    private index = 0,
    private rgbPallette: Color[] = [
      [255, 0, 0],
      [0, 255, 0],
      [0, 0, 255],
      [255, 255, 0],
      [0, 255, 255],
      [255, 0, 255],
      [255, 255, 255],
      [0, 0, 0],
    ],
    public currentColor: Color = [255, 0, 0],
    private colorDictionary: Record<string, Color> = {}
  ) {}

  public addColor(color: Color) {
    this.rgbPallette.push(color);
  }

  public next() {
    this.index++;

    if (this.index >= this.rgbPallette.length) {
      this.index = 0;
    }

    this.currentColor = this.rgbPallette[this.index];
  }

  public prev() {
    this.index--;

    if (this.index < 0) {
      this.index = this.rgbPallette.length - 1;
    }

    this.currentColor = this.rgbPallette[this.index];
  }

  public getCurrentColor() {
    return this.currentColor;
  }

  public add(key: string) {
    if (key in this.colorDictionary) {
      this.currentColor = this.colorDictionary[key];
    } else {
      this.colorDictionary[key] = this.currentColor;
    }
  }
}
