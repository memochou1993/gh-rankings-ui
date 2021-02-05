export default {
  open: (url) => window.open(url, '_blank', 'noreferrer noopener'),
  defer: (seconds) => new Promise((resolve) => setTimeout(() => resolve(), seconds * 1000)),
};
