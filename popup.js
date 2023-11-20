chrome.runtime.onInstalled.addListener(function () {
    console.log('Extensão instalada.');
  });
  
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'applyFilter') {
      applyColorFilter(request.filter);
    }
  });
  
  function applyColorFilter(filter) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'applyFilter', filter: filter });
    });
  }
  
  chrome.action.onClicked.addListener(function (tab) {
    chrome.tabs.executeScript(tab.id, { file: 'contentScript.js' });
  });
  
  
  
  
  
  
  