document.addEventListener("DOMContentLoaded", function() {
    var saveButton = document.getElementById("saveButton");
    var clearButton = document.getElementById("clearButton");
    var linkList = document.getElementById("linkList");
  
    
    chrome.storage.sync.get("links", function(result) {
      var links = result.links || [];
      displayLinks(links);
    });
  
    
    saveButton.addEventListener("click", function() {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var currentUrl = tabs[0].url;
        chrome.storage.sync.get("links", function(result) {
          var links = result.links || [];
          links.push(currentUrl);
          chrome.storage.sync.set({ links: links }, function() {
            displayLinks(links);
          });
        });
      });
    });
  
    
    clearButton.addEventListener("click", function() {
      chrome.storage.sync.remove("links");
      linkList.innerHTML = "";
    });
  
   
    function displayLinks(links) {
      linkList.innerHTML = "";
      links.forEach(function(link) {
        var listItem = document.createElement("li");
        var linkItem = document.createElement("a");
        linkItem.href = link;
        linkItem.target = "_blank";
        linkItem.textContent = link;
        listItem.appendChild(linkItem);
        linkList.appendChild(listItem);
      });
    }
  });

  