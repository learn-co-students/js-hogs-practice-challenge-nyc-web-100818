newHogForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const newHogName = event.target.querySelectorAll('input')[0].value
  const newHogSpecialty = event.target.querySelectorAll('input')[1].value
  const newHogMedal = event.target.querySelectorAll('input')[2].value
  const newHogWeight = event.target.querySelectorAll('input')[3].value
  const newHogImage = event.target.querySelectorAll('input')[4].value
  const newHogGreased = event.target.querySelectorAll('input')[5].value
  let newHog = new HogLong(newHogName, newHogSpecialty, newHogMedal, newHogWeight, newHogImage, newHogGreased)
  proxy1.hogz = dataStore.hogz
  postHog(newHog);
})

document.addEventListener('click', (event) => {
  if (event.target.className == "delete-button") {
    let hogId = event.target.dataset.id
    let hog = dataStore.hogz.find(hog => hog.id == hogId)
    deleteHog(hog)
  } else if (event.target.type == "checkbox") {
    let hogId = event.target.dataset.id
    let hog = dataStore.hogz.find(hog => hog.id == hogId)
    patchHog(hog)
  }
})
