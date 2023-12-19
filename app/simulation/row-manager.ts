import { Circle, Row } from "./shapes";
import { Color } from "./types";

export class RowManager {
  constructor(
    public currentWidth = 1,
    private gridWidth = 10,
    private offset = 10,
    private currentRow = 1,
    private positions: number[] = [],
    public rows: Row[] = []
  ) {
    this.positions = this.calculateXPositions();
    this.rows = [new Row(this.currentRow, this.positions)];
  }

  private calculateXPositions() {
    return Array.from({ length: this.currentWidth })
      .map((_, i) => i)
      .map((i) => this.offset + i - this.currentWidth / 2)
      .map((i) => i * this.gridWidth + this.offset);
  }

  public addRow() {
    const xPositions = this.calculateXPositions();
    this.currentRow++;
    this.rows.push(new Row(this.currentRow, xPositions));
  }

  public removeRow() {
    this.currentRow -= 1;
    this.rows.pop();
  }

  public nextRow(color: number | Color) {
    const xPositions = this.calculateXPositions();
    return new Row(this.currentRow + 1, xPositions, undefined, color);
  }

  public getAllCircles() {
    const allCircles: Circle[] = [];

    this.rows.forEach((row) => {
      allCircles.push(...row.getCircles());
    });

    return allCircles;
  }
}
