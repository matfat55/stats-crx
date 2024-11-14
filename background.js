// background.js
chrome.runtime.onInstalled.addListener(() => {
  // Initialize stats storage
  chrome.storage.local.set({
    dailyStats: {
      date: new Date().toDateString(),
      clicks: 0,
      keystrokes: 0,
      scrollDistance: 0,
      pagesViewed: 0
    },
    allTimeStats: {
      clicks: 0,
      keystrokes: 0,
      scrollDistance: 0,
      pagesViewed: 0
    }
  });
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  chrome.storage.local.get(['dailyStats', 'allTimeStats'], (result) => {
    let { dailyStats, allTimeStats } = result;
    
    // Check if it's a new day
    if (dailyStats.date !== new Date().toDateString()) {
      dailyStats = {
        date: new Date().toDateString(),
        clicks: 0,
        keystrokes: 0,
        scrollDistance: 0,
        pagesViewed: 0
      };
    }

    // Update stats based on message type
    switch (message.type) {
      case 'click':
        dailyStats.clicks++;
        allTimeStats.clicks++;
        break;
      case 'keystroke':
        dailyStats.keystrokes++;
        allTimeStats.keystrokes++;
        break;
      case 'scroll':
        dailyStats.scrollDistance += message.distance;
        allTimeStats.scrollDistance += message.distance;
        break;
      case 'pageview':
        dailyStats.pagesViewed++;
        allTimeStats.pagesViewed++;
        break;
    }

    // Save updated stats
    chrome.storage.local.set({ dailyStats, allTimeStats });
  });
});
