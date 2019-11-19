import { useState, useEffect } from '/web_modules/haunted.js';

export const NOT_DRAGGING = 'not dragging';
export const DRAGGING = 'dragging';

export default function useDrag() {
  const [state, setState] = useState(NOT_DRAGGING);
  const [positionDelta, setPositionDelta] = useState({ x: 0, y: 0 });

  function handleMouseDown(event) {
    setState(DRAGGING);
  }

  useEffect(() => {
    if (state === DRAGGING) {
      function handleMouseMove(event) {}
      window.addEventListener('mousemove', handleMouseMove);

      function handleMouseUp(event) {}
      window.addEventListener('mouseup', handleMouseUp);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [state]);
}
