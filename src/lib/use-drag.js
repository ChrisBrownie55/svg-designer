import { useState, useEffect } from '/web_modules/haunted.js';

export const NOT_DRAGGING = 'not dragging';
export const DRAGGING = 'dragging';

/**
 * @returns {{ state: DRAGGING|NOT_DRAGGING, positionDelta: { x: number, y: number }, handleMouseDown: (event: MouseEvent) => {}}}
 */
export default function useDrag(onRelease) {
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
      let updatedPositionDelta = positionDelta;

      // on mousemove recalculate the delta from the dragStart position
      function handleMouseMove(event) {
        updatedPositionDelta = {
          x: event.clientX - dragStart.x,
          y: event.clientY - dragStart.y
        };
        setPositionDelta(updatedPositionDelta);
      }
      window.addEventListener('mousemove', handleMouseMove);

      // on mouseup fire onRelease with the delta, then stop all dragging and reset the delta in position
      function handleMouseUp() {
        onRelease(updatedPositionDelta);

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
  }, [state, dragStart]);

  return {
    state,
    positionDelta,
    handleMouseDown
  };
}
