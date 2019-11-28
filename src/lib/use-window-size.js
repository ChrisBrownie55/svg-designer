import { useEffect, useState } from '../../web_modules/haunted.js';
import { debounce } from '../../web_modules/mini-debounce.js';

export default function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const resizeHandler = debounce(() => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }, 50);

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  });

  return size;
}
