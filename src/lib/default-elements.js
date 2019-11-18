export default Object.freeze({
  rectangle: Object.freeze({
    type: 'rectangle',
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    backgroundColor: 'black',
    rx: 0
  }),
  circle: Object.freeze({
    type: 'circle',
    cx: 0,
    cy: 0,
    rx: 0,
    ry: 0
  }),
  text: Object.freeze({
    type: 'text',
    x: 0,
    y: 0,
    lengthAdjust: 'spacing',
    textLength: 0
  })
});
