"use client";

import React from "react";
import { type Sketch } from "@p5-wrapper/react";
// @ts-ignore
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { RowManager } from "./simulation/row-manager";

const sketch: Sketch = (p5) => {
  const width = 500;
  const height = 500;

  const rowManager = new RowManager(undefined, undefined, 23);
  let colorPicker: any;

  p5.setup = () => {
    p5.createCanvas(width, height, p5.WEBGL);
    colorPicker = p5.createColorPicker("deeppink");
    colorPicker.position(0, 0);
  };

  p5.draw = () => {
    p5.translate(-width / 2, -height / 2);
    p5.background(50);
    rowManager.rows.forEach((row) => {
      row.draw(p5);
    });
    rowManager.nextRow([255, 0, 0]).draw(p5);
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
  };

  p5.mouseDragged = (event: any) => {
    const currentColor = colorPicker?.color();
    const { x, y } = event;

    rowManager.getAllCircles().forEach((circle) => {
      if (circle.isClicked(x, y)) {
        circle.changeColor(currentColor);
      }
    });
  };

  p5.mousePressed = (event: any) => {
    const currentColor = colorPicker?.color();
    const { x, y } = event;

    rowManager.getAllCircles().forEach((circle) => {
      if (circle.isClicked(x, y)) {
        circle.changeColor(currentColor);
      }
    });
  };
};

export default function Page() {
  return (
    <div style={{ display: "flex" }}>
      <NextReactP5Wrapper sketch={sketch} />
      <div style={{ padding: 8 }}>
        <h1 style={{ fontSize: 32 }}>Welcome!</h1>
        <p>App for designing colour patterns:</p>
        <p>Runs in a browser on a laptop.</p>
        <p>Press the arrow keys to design the shape.</p>
        <p>To use the colour picker:</p>
        <p>Click the colour picker to choose a colour</p>
        <p>De-select colour picker by clicking background</p>
        <p>Click on beads to color them with the selected color</p>
        <p>No save function so take a screenshot.</p>
        <p>Have fun!</p>
      </div>
    </div>
  );
}
