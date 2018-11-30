fetch('http://localhost:3000/hogs', { method: 'GET' })
.then(response => response.json())
.then(array => {
  array.forEach(hog => {
    createHog(hog);
  })
})

const postHog = (hog) => {
  fetch('http://localhost:3000/hogs', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: hog.name,
      specialty: hog.specialty,
      greased: hog.greased,
      "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water": hog.weight,
      "highest medal achieved": hog.medal,
      image: hog.image
    })
  })
}

const deleteHog = (hog) => {
  fetch(`http://localhost:3000/hogs/${hog.id}`, {method: 'DELETE'})
  let hogIndex = dataStore.hogz.indexOf(hog)
  dataStore.hogz.splice(hogIndex, 1)
  debugger
  proxy2.hogz = dataStore.hogz
}

const patchHog = (hog) => {
  if (hog.greased == false) {
    hog.greased = true
  } else {
    hog.greased = false
  }
  fetch(`http://localhost:3000/hogs/${hog.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      greased: hog.greased
    })
  })
  proxy2.hog = dataStore2.hog
}
