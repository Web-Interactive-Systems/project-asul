export function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export function throttle(fn, delay) {
  let timeoutId;
  return function (...args) {
    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        fn(...args);
        timeoutId = null;
      }, delay);
    }
  };
}
