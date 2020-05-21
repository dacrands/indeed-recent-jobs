var jobFooters = document.getElementsByClassName('jobsearch-SerpJobCard-footer');
var jobCompanies = document.getElementsByClassName('company');
var digitsRegex = /\d+/;

var BAD_CO_STYLE = `
  opacity: 0.5;
  border: 1px solid red;
  color: red !important;
  font-weight: bold;
`;

var OVERLAY_STYLE = `
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;      
  color: red;
  padding: 8px;
  text-align: right;
`;

var OLD_JOB_STYLE = `
  position: relative;
  opacity: 0.5;    
  height: 52px;
  overflow: hidden;
`;

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
      post.style.cssText = BAD_CO_STYLE;
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
  let parent = footer.parentElement;
  if (daysOld < 7) {
    parent.style.border = '2px solid #c5decc';
  }
  else if (daysOld < 14 && daysOld >= 7) {
    parent.style.border = '2px solid #e0dc82';
  } 
  else {    
    let overlay = document.createElement('div');
    parent.appendChild(overlay);
    overlay.innerHTML = `<strong>Old Job </strong>(${daysOld} days old)`
    overlay.style.cssText = OVERLAY_STYLE;
    parent.style.cssText = OLD_JOB_STYLE;
  }
}