const hogDiv = document.getElementById('hog-container');
const newHogForm = document.getElementById("hog-form");

createHog = (hog) => {
  let newHog = new Hog(hog);
  hogDiv.innerHTML += `
  <div class="hog-card">
    <h1> ${newHog.name}</h1>
    <img src=${newHog.image} style="max-width:100%">
    <div class="hog-abilities-${newHog.id}" >
      <p>Specialty: ${newHog.specialty} </p>
      <p>Weight: ${newHog.weight} </p>
      <p>Highest Medal: ${newHog.medal} </p>
      <button class="delete-button" data-id="${newHog.id}">Delete Hog</button>
      </br></br>
      </div>
  </div>
  `
  const hogAbilities = document.querySelector(`.hog-abilities-${newHog.id}`)
  let greasedHTML = ``;
  if (newHog.greased) {
    greasedHTML = `checked="true"`
  }
  hogAbilities.innerHTML += `Greased: <input type="checkbox" name="greased" data-id=${newHog.id} value="Greased" ${greasedHTML}>`
}

reCreateHog = (hog) => {
  hogDiv.innerHTML += `
  <div class="hog-card">
    <h1> ${hog.name}</h1>
    <img src=${hog.image} style="max-width:100%">
    <div class="hog-abilities-${hog.id}" >
      <p>Specialty: ${hog.specialty} </p>
      <p>Weight: ${hog.weight} </p>
      <p>Highest Medal: ${hog.medal} </p>
      <button class="delete-button" data-id="${hog.id}">Delete Hog</button>
      </br></br>
      </div>
  </div>
  `
  const hogAbilities = document.querySelector(`.hog-abilities-${hog.id}`)
  let greasedHTML = ``;
  if (hog.greased) {
    greasedHTML = `checked="true"`
  }
  hogAbilities.innerHTML += `Greased: <input type="checkbox" name="greased" data-id=${hog.id} value="Greased" ${greasedHTML}>`
}
