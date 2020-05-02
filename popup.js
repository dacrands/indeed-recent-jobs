let companyInput = document.getElementById('companyInput');
let companyBtn = document.getElementById('companyBtn');
const btns = document.querySelector('.btns');
const chromeStorageSync = chrome.storage.sync;

window.onload = function() {  
  chromeStorageSync.set({ badCompanies : ['revature', 'cybercoders', 'FDM Group'] })
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {file: 'custom.js'});
  });
};

companyBtn.onclick = function() {
  chromeStorageSync.get(['badCompanies'], function(result) {
    let badCompanies = Array.from(result.badCompanies)
    let newCompany = companyInput.value;
    badCompanies.push(newCompany);
    chromeStorageSync.set({ badCompanies }, function() {
      console.log(`Added ${newCompany} to bad company list`)
    });
  })  
}