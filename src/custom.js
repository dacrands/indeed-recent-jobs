var jobFooters = document.getElementsByClassName('jobsearch-SerpJobCard-footer');
var jobCompanies = document.getElementsByClassName('company');
var digitsRegex = /\d+/;

for (let footer of jobFooters) {
  let daysOld = getPostAge(footer);
  applyStyleToPost(footer, daysOld);
}

chrome.storage.sync.get(['badCompanies'], function(result) {  
  for (const co of jobCompanies) {
    let company = getPostCompany(co).toUpperCase();    
    if(result.badCompanies.includes(company)) {
      let post = co.parentElement.parentElement.parentElement;
      post.innerHTML = `WARNING: ${company} is bad!`;
      // Add class `company` to preserve HTMLCollection length
      post.classList.add('company');
      post.style.cssText = `
      border: 1px solid red;
      color: red !important;
      font-weight: bold;
      `;
    }
  }
})

function getPostCompany(companySpan) {
  return companySpan.innerText;
}

function getPostAge(footer) {
  let daysOld;  
  if (footer.innerText.includes('Just posted') || footer.innerText.includes('Today')) {
    daysOld = 0;
  } else {
    daysOld = Number(digitsRegex.exec(footer.innerText)[0]);
  }
  return daysOld;
}

function applyStyleToPost(footer, daysOld) {
  if (daysOld < 7) {
    footer.parentElement.style.border = '2px solid #c5decc';
  }
  else if (daysOld < 14 && daysOld >= 7) {
    footer.parentElement.style.border = '2px solid #e0dc82';
  } 
  else {
    footer.parentElement.style.opacity = '0.5';
  }
}