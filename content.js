let isGlobalDarkModeEnabled = false;
let isSiteDarkModeDisabled = false;

chrome.storage.sync.get(['globalDarkMode', 'siteDarkMode'], function(data) {
  isGlobalDarkModeEnabled = data.globalDarkMode || false;
  isSiteDarkModeDisabled = data.siteDarkMode || false;
  applyDarkMode();
});

chrome.storage.onChanged.addListener(function(changes, areaName) {
  if (areaName === 'sync') {
    if (changes.globalDarkMode) {
      isGlobalDarkModeEnabled = changes.globalDarkMode.newValue;
      applyDarkMode();
    }
    if (changes.siteDarkMode) {
      isSiteDarkModeDisabled = changes.siteDarkMode.newValue;
      applyDarkMode();
    }
  }
});

function applyDarkMode() {
  const shouldApplyDarkMode = isGlobalDarkModeEnabled && !isSiteDarkModeDisabled;

  if (shouldApplyDarkMode) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
}

function enableDarkMode() {
  // Apply dark mode styles
  document.documentElement.style.filter = 'invert(100%)';
  document.querySelectorAll('img').forEach(img => {
    img.style.filter = 'invert(100%)';
  });
}

function disableDarkMode() {
  // Remove dark mode styles
  document.documentElement.style.filter = '';
  document.querySelectorAll('img').forEach(img => {
    img.style.filter = '';
  });
}