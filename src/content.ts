import { getProfileGuid } from './utils';

const ICON_RESET = '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 3v5h5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>';
const ICON_SPIN = '<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2.5" stroke-dasharray="28 28" stroke-linecap="round" style="animation:nfx-spin .8s linear infinite;transform-origin:center"/>';

function createResetButton(episodeItem: Element): void {
  const episodeDuration = episodeItem.querySelector('.titleCard-duration');

  if (!episodeDuration || !episodeDuration.parentNode) return;
  if (episodeDuration.parentNode.querySelector('[data-dup-clone-episode="true"]')) return;


  const resetButton = document.createElement('span');
  resetButton.dataset.dupCloneEpisode = 'true';
  resetButton.className = 'nfx-reset-button';
  resetButton.innerText = 'Reset';
  resetButton.style.padding = '0px 10px 0px 0px'
  resetButton.style.zIndex = '999';

  resetButton.addEventListener('mouseenter', () => {
    resetButton.style.textDecoration = 'underline';
  });

  resetButton.addEventListener('mouseleave', () => {
    resetButton.style.textDecoration = 'none';
  });

  resetButton.addEventListener('click', () => {
    alert('E')
  });

  const seperator = document.createElement('span');
  seperator.dataset.dupCloneEpisode = 'true';
  seperator.innerText = '•'
  seperator.style.color = '#404040'

  episodeDuration.insertBefore(seperator, episodeDuration.firstChild);
  episodeDuration.insertBefore(resetButton, episodeDuration.firstChild);
}

function injectResetButton(): void {
  const buttons = document.querySelectorAll('.episode-item');
  if (buttons.length > 0) {
    buttons.forEach(createResetButton);
  } else {
    document.querySelectorAll("[data-dup-clone-episode='true']").forEach((c) => c.remove());
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


