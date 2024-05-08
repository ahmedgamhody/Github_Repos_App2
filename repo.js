let box = document.querySelector(".box");
function getRepoName() {
  let name = window.location.search.split("=")[1];
  if (name) {
    getIssus(name);
  }
}
getRepoName();

function getIssus(name) {
  fetch(`https://api.github.com/repos/${name}/issues`)
    .then((e) => e.json())
    .then((data) => {
      showIssuses(data);
    });
}

function showIssuses(data) {
  data.forEach((e) => {
    box.innerHTML += `
        <a href="${e.html_url}" id="repo" target="_blank">
          <span>${e.title}</span>
        </a>
      `;
  });
}
