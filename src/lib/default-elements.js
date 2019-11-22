export const TYPES = {
  NUMBER: Object.freeze({ type: 'number' }),
  STRING: Object.freeze({ type: 'string' }),
  ENUM: (...values) => Object.freeze({ type: 'enum', values })
};

export const RECTANGLE = 'rectangle';
const RECTANGLE_STYLES = {
  x: TYPES.NUMBER,
  y: TYPES.NUMBER,
  rx: TYPES.NUMBER,
  width: TYPES.NUMBER,
  height: TYPES.NUMBER,
  fill: TYPES.STRING,
  stroke: TYPES.STRING
};

export const CIRCLE = 'circle';
const CIRCLE_STYLES = {
  x: TYPES.NUMBER,
  y: TYPES.NUMBER,
  rx: TYPES.NUMBER,
  ry: TYPES.NUMBER,
  fill: TYPES.STRING,
  stroke: TYPES.STRING
};

export const TEXT = 'text';
const TEXT_STYLES = {
  x: TYPES.NUMBER,
  y: TYPES.NUMBER,
  lengthAdjust: TYPES.ENUM('spacing', 'spacingAndGlyphs'),
  textLength: TYPES.NUMBER,
  fill: TYPES.STRING,
  stroke: TYPES.STRING,
  text: TYPES.STRING,
  fontFamily: TYPES.STRING,
  fontWeight: TYPES.NUMBER,
  fontSize: TYPES.NUMBER
};

export const STYLES = {
  [RECTANGLE]: RECTANGLE_STYLES,
  [CIRCLE]: CIRCLE_STYLES,
  [TEXT]: TEXT_STYLES
};

export default Object.freeze({
  [RECTANGLE]: Object.freeze({
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
  [CIRCLE]: Object.freeze({
    type: 'circle',
    hidden: false,
    x: 150,
    y: 50,
    rx: 50,
    ry: 50,
    fill: 'lightblue',
    stroke: 'none'
  }),
  [TEXT]: Object.freeze({
    type: 'text',
    hidden: false,
    x: 0,
    y: 120,
    lengthAdjust: 'spacing',
    textLength: 0,
    fill: 'black',
    stroke: 'none',
    text: 'The quick brown fox jumps over the lazy dog',
    fontFamily: 'Roboto, Arial, Helvetica, sans-serif',
    fontWeight: 500,
    fontSize: 16
  })
});
