chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.onChanged.addListener(function(changes, area){
    chrome.tabs.executeScript({ file: 'custom.js'})
    console.log("storage changed")
  })
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostContains: 'indeed.com'}
      })
      ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }])
  })
})