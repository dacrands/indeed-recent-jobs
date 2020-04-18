let jobFooters = document.getElementsByClassName('jobsearch-SerpJobCard-footer');

for (let footer of jobFooters) {
  if(!footer.innerText.includes('30+')) {
    footer.parentElement.style.border = '2px solid #c5decc';
  }
}