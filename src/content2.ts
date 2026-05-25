import { getProfileGuid } from './utils';

const ICON_RESET = '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 3v5h5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>';
const ICON_SPIN = '<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2.5" stroke-dasharray="28 28" stroke-linecap="round" style="animation:nfx-spin .8s linear infinite;transform-origin:center"/>';

function createResetButton(originalButton: Element): void {
  const container = originalButton.parentNode?.parentElement;

  if (!container || !container.parentNode) return;
  if (container.parentNode.querySelector('[data-dup-clone="true"]')) return;

  const nfxButton = container.cloneNode(true) as HTMLElement;
  const svgElement = nfxButton.querySelector('svg') as SVGElement | null;
  if (!svgElement) return;

  svgElement.innerHTML = ICON_RESET;
  svgElement.setAttribute('fill', 'none');

  nfxButton.dataset.dupClone = 'true';
  nfxButton.removeAttribute('data-uia');

  nfxButton.addEventListener('click', async (e: Event) => {
    e.stopPropagation();
    e.preventDefault();

    const guid = getProfileGuid();
    if (!guid) return;

    svgElement.innerHTML = ICON_SPIN;

    const hrefVideo = (container as HTMLElement)
      .closest('.buttonControls--container')
      ?.querySelector('a')
      ?.getAttribute('href');

    if (!hrefVideo) return;

    const videoId = hrefVideo.split('?')[0].split('/')[2];

    console.log('[NFX Reset] Sending hide request for videoId', videoId, 'and profileGuid', guid);

    try {
      const resp = await chrome.runtime.sendMessage({
        type: 'HIDE_TITLE',
        videoId,
        profileGuid: guid,
        originUrl: window.location.href,
      });

      if (!resp?.ok) svgElement.innerHTML = ICON_RESET;

      window.location.reload();
    } catch (err) {
      console.log('[NFX Reset] Error sending message to background script', err);
    }
  });

  (container.parentNode as ParentNode).insertBefore(nfxButton, container.nextSibling);
}

function injectResetButton(): void {
  const buttons = document.querySelectorAll('[data-uia*="my-list"]');
  if (buttons.length > 0) {
    buttons.forEach(createResetButton);
  } else {
    document.querySelectorAll("[data-dup-clone='true']").forEach((c) => c.remove());
  }
}

(function () {
  'use strict';

  const observer = new MutationObserver(() => {
    injectResetButton();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  injectResetButton();
})();


