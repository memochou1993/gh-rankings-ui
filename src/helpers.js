const open = (url) => window.open(url, '_blank', 'noreferrer noopener');
const defer = (seconds) => new Promise((resolve) => setTimeout(() => resolve(), seconds * 1000));
const scrollToTop = () => window.scrollTo({ top: 0 });

function debounce(fn, delay) {
  let timeoutID = null;
  // eslint-disable-next-line
  return function () {
    clearTimeout(timeoutID);
    // eslint-disable-next-line
    const args = arguments;
    const that = this;
    timeoutID = setTimeout(() => {
      fn.apply(that, args);
    }, delay);
  };
}

export {
  open,
  defer,
  scrollToTop,
  debounce,
};
