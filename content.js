// content.js
// Track clicks
document.addEventListener('click', () => {
  chrome.runtime.sendMessage({ type: 'click' });
});

// Track keystrokes
document.addEventListener('keydown', () => {
  chrome.runtime.sendMessage({ type: 'keystroke' });
});

// Track scrolling
let lastScrollY = window.scrollY;
document.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  const distance = Math.abs(currentScrollY - lastScrollY);
  lastScrollY = currentScrollY;
  chrome.runtime.sendMessage({ type: 'scroll', distance });
});

// Track page view
chrome.runtime.sendMessage({ type: 'pageview' });
