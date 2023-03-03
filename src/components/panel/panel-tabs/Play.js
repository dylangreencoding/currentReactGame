import React from "react";

export function Play ({board, setBoard}) {
  return (
    <div>
      <h1>{board.selected.x}, {board.selected.y}</h1>
      <p>- - looks up selected coordinates *above* in dictionary - 'x100y100' : featureNameId</p> 
      <p>- - looks up feature's name/identifier in dictionary and displays - featureNameId : featureInfo</p>
    </div>
  )
}
