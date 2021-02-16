const open = (url) => window.open(url, '_blank', 'noreferrer noopener');

const defer = (seconds) => new Promise((resolve) => setTimeout(() => resolve(), seconds * 1000));

const scrollToTop = () => window.scrollTo({ top: 0 });

const debounce = (fn, delay) => {
  let timeoutID;
  return function (...args) {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => fn.apply(this, args), delay);
  };
};

export {
  open,
  defer,
  scrollToTop,
  debounce,
};
