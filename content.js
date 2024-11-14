// Initialize variables to track interactions
let clicks = 0;
let keystrokes = 0;
let distanceScrolled = 0;

// Track clicks
document.addEventListener('click', () => {
  clicks++;
  updateStats();
});

// Track keystrokes
document.addEventListener('keydown', () => {
  keystrokes++;
  updateStats();
});

// Track scroll distance
let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
window.addEventListener('scroll', () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  distanceScrolled += Math.abs(scrollTop - lastScrollTop);
  lastScrollTop = scrollTop;
  updateStats();
});

// Track page views
chrome.runtime.sendMessage({ type: 'page_viewed' });

// Update stats in storage
function updateStats() {
  chrome.storage.local.get('stats', (data) => {
    const stats = data.stats || { daily: {}, allTime: {} };

    // Update daily stats
    stats.daily.clicks = (stats.daily.clicks || 0) + clicks;
    stats.daily.keystrokes = (stats.daily.keystrokes || 0) + keystrokes;
    stats.daily.distanceScrolled = (stats.daily.distanceScrolled || 0) + distanceScrolled;

    // Update all-time stats
    stats.allTime.clicks = (stats.allTime.clicks || 0) + clicks;
    stats.allTime.keystrokes = (stats.allTime.keystrokes || 0) + keystrokes;
    stats.allTime.distanceScrolled = (stats.allTime.distanceScrolled || 0) + distanceScrolled;

    // Save back the stats
    chrome.storage.local.set({ stats });

    // Reset local counters
    clicks = 0;
    keystrokes = 0;
    distanceScrolled = 0;
  });
}
