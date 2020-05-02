let companyInput = document.getElementById('companyInput');
let companyBtn = document.getElementById('companyBtn');
const btns = document.querySelector('.btns');
const chromeStorageSync = chrome.storage.sync;

function createCompanyBtns(compArr) {
  btns.innerHTML = '';
  for (const co of compArr) {
    let newBtn = document.createElement('button');
    newBtn.innerText =  co;
    btns.appendChild(newBtn);
  }
} 

window.onload = function() {  
  chromeStorageSync.get(['badCompanies'], result => {
    if (!result.badCompanies) {
      console.log(`Setting companies`)
      chromeStorageSync.set({ badCompanies : ['revature', 'cybercoders', 'FDM Group'] })
    } else {
      console.log(`Current companies: ${result.badCompanies}`)
      createCompanyBtns(result.badCompanies)
    }
  });
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
      console.log(`Added ${newCompany} to bad company list. Bad Companies: ${badCompanies}`)
      createCompanyBtns(badCompanies)
    });
  })  
}