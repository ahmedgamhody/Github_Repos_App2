let form = document.getElementById("elForm");
let btns = document.querySelector(".lang");
let word = document.getElementById("typeLan");
let box = document.querySelector(".box");
let userName = document.getElementById("username");

form.addEventListener("submit", formHanderal);

function formHanderal(e) {
  e.preventDefault();

  let user = userName.value.trim();

  if (user) {
    box.innerHTML = "";
    getDataFetch(user);
  } else {
    alert("Please Enter Username To Show Data");
  }
}

function getDataFetch(user) {
  fetch(`https://api.github.com/users/${user}/repos`)
    .then((e) => e.json())
    .then((data) => {
      showData(data, user);
    });
}
function showData(data, user) {
  word.innerHTML = user;
  data.forEach((e) => {
    let name = e.owner.login + `/` + e.name;
    box.innerHTML += `
      <a href=./repo.html?repo=${name} id="repo" target="_blank">
        <span>${e.owner.login}/${e.name}</span>
        <span>${
          e.open_issues_count > 0
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-check-square"></i>'
        }</span>
      </a>
    `;
  });
}

btns.addEventListener("click", typeLan);

function typeLan(e) {
  let lan = e.target.getAttribute("data-lan");
  if (lan) {
    box.innerHTML = "";
    getLan(lan);
  }
}

function getLan(lan) {
  fetch(`https://api.github.com/search/repositories?q=${lan}`)
    .then((e) => e.json())
    .then((data) => {
      showData(data.items, lan);
    });
}
