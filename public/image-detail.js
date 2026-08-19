const interactiveImageAncestorSelector = 'a, button, [role="button"], input, label, summary';

const isStandaloneImage = (image) => (
  image instanceof HTMLImageElement
  && (
    image.dataset.imageAction === 'detail'
    || !image.parentElement?.closest(interactiveImageAncestorSelector)
  )
);

const getImageSource = (image) => image.currentSrc || image.src;

const openStandaloneImage = (image) => {
  const source = getImageSource(image);
  if (!source) return;

  window.open(source, '_blank', 'noopener,noreferrer');
};

const enhanceStandaloneImage = (image) => {
  if (!isStandaloneImage(image) || image.hasAttribute('data-standalone-image')) return;

  image.dataset.standaloneImage = '';
  image.tabIndex = 0;
  image.setAttribute('role', 'button');
  image.setAttribute('aria-label', `${image.alt || '이미지'} 자세히 보기`);

  image.addEventListener('click', () => openStandaloneImage(image));
  image.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;

    event.preventDefault();
    openStandaloneImage(image);
  });
};

document.querySelectorAll('img').forEach(enhanceStandaloneImage);

const imageObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (!(node instanceof Element)) return;

      if (node.matches('img')) enhanceStandaloneImage(node);
      node.querySelectorAll('img').forEach(enhanceStandaloneImage);
    });
  });
});

imageObserver.observe(document.body, { childList: true, subtree: true });
