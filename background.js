chrome.runtime.onInstalled.addListener(() => {
  initializeStats();
});

chrome.runtime.onStartup.addListener(() => {
  initializeStats();
});

function initializeStats() {
  chrome.storage.local.get(['stats', 'dayStarted'], (data) => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date (YYYY-MM-DD)
    
    if (!data.stats) {
      // Initialize stats if not present
      chrome.storage.local.set({
        stats: {
          daily: {
            clicks: 0,
            keystrokes: 0,
            distanceScrolled: 0,
            pagesViewed: 0
          },
          allTime: {
            clicks: 0,
            keystrokes: 0,
            distanceScrolled: 0,
            pagesViewed: 0
          }
        },
        dayStarted: today
      });
    } else if (data.dayStarted !== today) {
      // Reset daily stats if it's a new day
      const updatedStats = data.stats;
      updatedStats.daily = {
        clicks: 0,
        keystrokes: 0,
        distanceScrolled: 0,
        pagesViewed: 0
      };
      chrome.storage.local.set({
        stats: updatedStats,
        dayStarted: today
      });
    }
  });
}
