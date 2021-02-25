let button = document.getElementById("remove-button");

function YouTubeGetID(url) {
  var ID = "";
  url = url
    .replace(/(>|<)/gi, "")
    .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if (url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_\-]/i);
    ID = ID[0];
  } else {
    ID = url;
  }
  return ID;
}

button.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  const youtubeID = YouTubeGetID(tab.url);

  if (typeof youtubeID === "string") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: removeYoutubeTitle,
    });
  }
});

function removeYoutubeTitle() {
  document.title = "a";
  document.querySelector("h1.title").children[0].innerText = "";
}
