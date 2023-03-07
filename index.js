const searchForm = document.querySelector("form");
const resultDiv = document.querySelector("#result");
const url = "https://api.github.com/users/";

const getCreationDate = (createdDate) => {
      const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
  return createdDate.toLocaleDateString("fr-FR", options)
}

const getDiffDate = (createdDate) => {
    const dateNow = new Date();
    const timeDiff = dateNow.getTime() - createdDate.getTime();
    const daysDiff = Math.trunc(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
}

const displayResult = (data) => {
  if (data.hasOwnProperty('message')) {
    resultDiv.insertAdjacentHTML(
      "beforeend",
      `<div id="profil-result"><h1>Utilisateur introuvable !!</h1></div>`
    );
  } else {
    const { name, public_repos, created_at, avatar_url, login } = data;
    const createdDate = new Date(created_at);

    resultDiv.innerHTML = "";
    const htmlProfil = `
    <div id="profil-result">
    <img src="${avatar_url}" alt="Avatar de ${name}">
    <h1>Nom : <strong>${name || login}</strong></h1>
    <p>Nombre de repo publics : <strong>${public_repos}</strong> repo</p>
    <p>Profil crée le <strong>${getCreationDate(createdDate)}</strong></p>
    <p>Le profil a été crée il y a <strong>${getDiffDate(createdDate)}</strong> jours.</p>
    </div>
    `;
    resultDiv.insertAdjacentHTML("beforeend", htmlProfil);
  }
};

const fetchSubmit = (event) => {
  event.preventDefault();
  const searchInput = document.querySelector("#search");
  fetch(`${url}${searchInput.value}`)
    .then((response) => response.json())
    .then(displayResult)
    .catch((error) => console.log);
};

searchForm.addEventListener("submit", fetchSubmit);
