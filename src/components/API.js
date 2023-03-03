export function boardTemplate () {

  return (
    {
      origin: { x: 0, y: 0 },
      apogee: { x: 1000, y: 500 },
      scale: 25,
      selector: { x: undefined, y: undefined},
      selected: { x: undefined, y: undefined},
      zombies: [ {x: 0, y: 0}, {x: 100, y: 100} ],
      walls: [ {begin: {x:70, y: 30}, end: {x: 330, y: 110}}, {begin: {x:827, y: 155}, end: {x: 310, y: 404}} ]
    }
  )
}

// 