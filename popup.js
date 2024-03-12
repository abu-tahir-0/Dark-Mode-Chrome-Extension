document.addEventListener('DOMContentLoaded', function() {
  let toggleGlobalDarkMode = document.getElementById('toggleGlobalDarkMode');
  let isGlobalDarkModeEnabled = false;
  let isSiteDarkModeDisabled = false;

  // Retrieve the state of the global dark mode and site-specific dark mode from chrome.storage
  chrome.storage.sync.get(['globalDarkMode', 'siteDarkMode'], function(data) {
    isGlobalDarkModeEnabled = data.globalDarkMode || false;
    isSiteDarkModeDisabled = data.siteDarkMode || false;
    
    toggleGlobalDarkMode.checked = isGlobalDarkModeEnabled;
    applyDarkMode(isGlobalDarkModeEnabled, isSiteDarkModeDisabled);
  });

  toggleGlobalDarkMode.addEventListener('change', function() {
    isGlobalDarkModeEnabled = toggleGlobalDarkMode.checked;
    isSiteDarkModeDisabled = !toggleGlobalDarkMode.checked; // Update this line with your logic for determining the value of isSiteDarkModeDisabled
    chrome.storage.sync.set({ globalDarkMode: isGlobalDarkModeEnabled, siteDarkMode: isSiteDarkModeDisabled });
    applyDarkMode(isGlobalDarkModeEnabled, isSiteDarkModeDisabled);
  });

  function applyDarkMode(isGlobalDarkModeEnabled, isSiteDarkModeDisabled) {
    const shouldApplyDarkMode = isGlobalDarkModeEnabled && !isSiteDarkModeDisabled;

    if (shouldApplyDarkMode) {
      document.documentElement.style.filter = 'invert(100%)';
      document.querySelectorAll('img').forEach(img => {
        img.style.filter = 'invert(100%)';
      });
    } else {
      document.documentElement.style.filter = '';
      document.querySelectorAll('img').forEach(img => {
        img.style.filter = '';
      });
    }
  }
});