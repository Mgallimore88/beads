"use client";

import React from "react";
import { type Sketch } from "@p5-wrapper/react";
// @ts-ignore
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { RowManager } from "./simulation/row-manager";
import { ColorPicker } from "./simulation/color-picker";

const sketch: Sketch = (p5) => {
  const width = 500;
  const height = 500;
  const gridWidth = 10;

  const rowManager = new RowManager(undefined, undefined, 23);
  const colorPicker = new ColorPicker();

  p5.setup = () => {
    p5.createCanvas(width, height, p5.WEBGL);
  };

  p5.draw = () => {
    p5.translate(-width / 2, -height / 2);
    p5.background(50);
    rowManager.rows.forEach((row) => {
      row.draw(p5);
    });
    rowManager.nextRow(colorPicker.currentColor);
  };

  p5.keyPressed = (event: any) => {
    if (event.key === "ArrowDown") {
      console.log("down");
      rowManager.addRow();
    }

    if (event.key === "ArrowUp") {
      console.log("up");
      rowManager.removeRow();
    }

    if (event.key === "ArrowLeft") {
      console.log("left");
      rowManager.currentWidth--;
    }

    if (event.key === "ArrowRight") {
      console.log("right");
      rowManager.currentWidth++;
    }

    if (event.key === " ") {
      console.log("space");
      colorPicker.next();
    }

    if (event.key === "z") {
      console.log("z");
      colorPicker.prev();
    }

    if (["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(event.key)) {
      colorPicker.add(event.key);
    }
  };

  p5.mousePressed = (event: any) => {
    const currentColor = colorPicker.getCurrentColor();
    const { x, y } = event;

    rowManager.getAllCircles().forEach((circle) => {
      if (circle.isClicked(x, y)) {
        circle.changeColor(currentColor);
      }
    });
  };
};

export default function Page() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
