let companyInput = document.getElementById('companyInput');
let companyBtn = document.getElementById('companyBtn');
window.onload = function(element) {  
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {file: 'custom.js'});
  });
};

companyBtn.onclick = function() {
  alert(companyInput.value)
}