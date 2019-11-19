import { useState, useEffect } from '/web_modules/haunted.js';

export const NOT_DRAGGING = 'not dragging';
export const DRAGGING = 'dragging';

/**
 * @returns {{ state: DRAGGING|NOT_DRAGGING, dragStart: { x: number, y: number }, positionDelta: { x: number, y: number }}}
 */
export default function useDrag() {
  const [state, setState] = useState(NOT_DRAGGING);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [positionDelta, setPositionDelta] = useState({ x: 0, y: 0 });

  // on mousedown start dragging and set initial x and y positions
  function handleMouseDown(event) {
    setState(DRAGGING);
    setDragStart({ x: event.clientX, y: event.clientY });
  }

  useEffect(() => {
    if (state === DRAGGING) {
      // on mousemove recalculate the delta from the dragStart position
      function handleMouseMove(event) {
        setPositionDelta({
          x: event.clientX - dragStart.x,
          y: event.clientY - dragStart.y
        });
      }
      window.addEventListener('mousemove', handleMouseMove);

      // on mouseup stop all dragging and reset the delta in position
      function handleMouseUp() {
        setState(NOT_DRAGGING);
        setPositionDelta({ x: 0, y: 0 });
      }
      window.addEventListener('mouseup', handleMouseUp);

      // cleanup
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [state]);

  return {
    state,
    dragStart,
    positionDelta,
    handleMouseDown
  };
}
