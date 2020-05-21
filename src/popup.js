let companyInput = document.getElementById('companyInput');
let companyBtn = document.getElementById('companyBtn');
const btns = document.querySelector('.btns');
const chromeStorageSync = chrome.storage.sync;
const INIT_COMPANIES = ['REVATURE']      

function removeCompany(companyName) {
  chromeStorageSync.get(['badCompanies'], result => {
    let compArr = result.badCompanies
                    .filter(c => c !== companyName);
    chromeStorageSync.set({ badCompanies: compArr })
  })
}

function createCompanyBtns(compArr) {
  btns.innerHTML = '';
  for (const co of compArr) {
    let newBtn = document.createElement('button');  
    newBtn.classList.add('btns__btn'); 
    newBtn.setAttribute('title', `Remove ${co}`) 
    newBtn.innerHTML = `${co} &#11199;`;    
    btns.appendChild(newBtn);
    newBtn.onclick = function() {
      removeCompany(co)
      this.parentNode.removeChild(this)
    }
  }
} 

window.onload = function() {  
  chromeStorageSync.get(['badCompanies'], result => {
    if (!result.badCompanies) {      
      chromeStorageSync.set({ badCompanies :  INIT_COMPANIES });
      createCompanyBtns(INIT_COMPANIES);
    } else {      
      createCompanyBtns(result.badCompanies);
    }
  });
}

companyBtn.onclick = function() {
  chromeStorageSync.get(['badCompanies'], function(result) {
    let badCompanies = Array.from(result.badCompanies)
    let newCompany = companyInput.value.toUpperCase();
    if (badCompanies.includes(newCompany)) {
      alert(`"${newCompany}" is already in your list of bad companies.`);
      return;
    }
    badCompanies.push(newCompany);
    chromeStorageSync.set({ badCompanies }, function() {
      console.log(`Added ${newCompany} to bad company list. Bad Companies: ${badCompanies}`)
      createCompanyBtns(badCompanies)
    });
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          {file: 'custom.js'});
    });
  });  
}