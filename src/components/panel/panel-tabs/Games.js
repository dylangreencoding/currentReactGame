import React from "react";

export function Games ({board, setBoard}) {
  return (
    <div>
      <h1>GAMES</h1>
      <h1>{board.selected.x}, {board.selected.y}</h1>
      
    </div>
  )
}
