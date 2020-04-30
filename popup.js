let companyInput = document.getElementById('companyInput');
let companyBtn = document.getElementById('companyBtn');
window.onload = function() {  
  chrome.storage.sync.set({ badCompanies : ['revature', 'cybercoders', 'FDM Group'] })
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {file: 'custom.js'});
  });
};

companyBtn.onclick = function() {
  chrome.storage.sync.get(['badCompanies'], function(result) {
    let badCompanies = Array.from(result.badCompanies)
    badCompanies.push(companyInput.value);
    chrome.storage.sync.set({ badCompanies }, function() {
      console.log('Added bad company to storage')
      window.location.reload();
    });
  })  
}