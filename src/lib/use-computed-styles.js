import { useState, useEffect } from '/web_modules/haunted.js';
import useWindowSize from './use-window-size.js';

export default function useComputedStyles(element) {
  const [styles, setStyles] = useState(getComputedStyle(element));
  const windowSize = useWindowSize();

  useEffect(() => {
    setStyles(getComputedStyle(element));
  }, [element, windowSize]);

  return styles;
}
