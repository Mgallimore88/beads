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

  let myPicker: any; 

  p5.setup = () => {
    p5.createCanvas(width, height, p5.WEBGL);
    myPicker = p5.createColorPicker('deeppink');
    myPicker.position(0, 0);
  };

  p5.draw = () => {
    p5.translate(-width / 2, -height / 2);
    p5.background(50);
    rowManager.rows.forEach((row) => {
      row.draw(p5);
    });
    rowManager.nextRow(colorPicker.currentColor).draw(p5);
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
    if (event.key === "a") {
      console.log("Adding colour to library");
      colorPicker.addColor(myPicker.color());
    }

    if (["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(event.key)) {
      colorPicker.add(event.key);
    }
  };

  p5.mouseDragged = (event: any) => {
    const currentColor = colorPicker.getCurrentColor();
    const { x, y } = event;

    rowManager.getAllCircles().forEach((circle) => {
      if (circle.isClicked(x, y)) {
        circle.changeColor(currentColor);
      }
    });
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
  return (
    <div style={{display: 'flex'}}>
      <NextReactP5Wrapper sketch={sketch} />
      <div style={{paddingLeft: 8}}>
        <h1 style={{fontSize: 32 }}>Welcome!</h1>
        <p>App for designing colour patterns:</p>
        <p>Runs in a browser on a laptop.</p>
        <p>Press the arrow keys to design the shape.</p>
        <p>Press SPACE to cycle through colours.</p>
        <p>1 through 9 to add or recall a color shortcut.</p>
        <p>To use the colour picker:</p>
        <p>Click the colour picker to choose a colour</p>
        <p>De-select colour picker by clicking background</p>
        <p>Press A to save a colour from the colour picker.</p>
        <p>No save function so take a screenshot.</p>
        <p>Have fun!</p>

      </div>
    </div>
  )
}
