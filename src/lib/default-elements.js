export default Object.freeze({
  rectangle: Object.freeze({
    type: 'rectangle',
    hidden: false,
    x: 0,
    y: 0,
    rx: 0,
    width: 100,
    height: 100,
    fill: 'black',
    stroke: 'none'
  }),
  circle: Object.freeze({
    type: 'circle',
    hidden: false,
    cx: 150,
    cy: 50,
    rx: 50,
    ry: 50,
    fill: 'lightblue',
    stroke: 'none'
  }),
  text: Object.freeze({
    type: 'text',
    hidden: false,
    x: 0,
    y: 0,
    lengthAdjust: 'spacing',
    textLength: 0,
    fill: 'black',
    stroke: 'none',
    text: 'The quick brown fox jumps over the lazy dog',
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize: 16
  })
});
