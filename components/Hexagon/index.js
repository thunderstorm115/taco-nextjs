import React, { useEffect } from "react";

export default ({ text, color, id }) => {
  useEffect(() => {
    let canvas = document.querySelector(`#hexagon-${id}`).getContext("2d");
    let side = 0;
    let size = 30;
    let x = 50;
    let y = 50;
    canvas.clearRect(0, 0, 90, 90);

    canvas.beginPath();
    canvas.moveTo(x + size * Math.sin(0), y + size * Math.cos(0));

    for (side; side < 7; side++) {
      canvas.lineTo(
        x + size * Math.sin((side * 2 * Math.PI) / 6),
        y + size * Math.cos((side * 2 * Math.PI) / 6)
      );
    }

    canvas.strokeStyle = color;
    canvas.lineWidth = 3;
    canvas.stroke();
    
    canvas.font = "15px Arial";
    canvas.fillStyle = "white";
    canvas.textAlign = "center";
    canvas.fillText(text, 50, 55);
  }, [color, id, text]);

  return <canvas id={`hexagon-${id}`} width="100" height="90"></canvas>;
};
