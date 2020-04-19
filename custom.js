let jobFooters = document.getElementsByClassName('jobsearch-SerpJobCard-footer');
const digitsRegex = /\d+/;

for (let footer of jobFooters) {
  let daysOld = getPostAge(footer);
  applyStyleToPost(footer, daysOld);
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