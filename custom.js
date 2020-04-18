let jobFooters = document.getElementsByClassName('jobsearch-SerpJobCard-footer');

for (let footer of jobFooters) {
  if(!footer.innerText.includes('30+')) {
    footer.style.backgroundColor = '#c5decc';
  }
}