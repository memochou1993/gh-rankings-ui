const open = (url) => window.open(url, '_blank', 'noreferrer noopener');
const defer = (seconds) => new Promise((resolve) => setTimeout(() => resolve(), seconds * 1000));
const scrollToTop = () => window.scrollTo({ top: 0 });

export {
  open,
  defer,
  scrollToTop,
};
