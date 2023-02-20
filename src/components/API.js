export function boardTemplate () {

  return (
    {
      origin: { x: 0, y: 0 },
      apogee: { x: 1000, y: 500 },
      scale: 25,
      selector: {},
      selected: { x: 0, y: 0},
      zombies: [ {x: 0, y: 0}, {x: 100, y: 100} ]
    }
  )
}