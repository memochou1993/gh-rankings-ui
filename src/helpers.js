const open = (url) => window.open(url, '_blank', 'noreferrer noopener');
const defer = (seconds) => new Promise((resolve) => setTimeout(() => resolve(), seconds * 1000));
const parseTag = (tags, target) => tags.find((tag) => tag.includes(target))?.split(':').pop();
const scrollToTop = () => window.scrollTo({ top: 0 });

export {
  open,
  defer,
  parseTag,
  scrollToTop,
};
