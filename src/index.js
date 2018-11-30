const hogAdapter = new Adapter()

document.addEventListener('DOMContentLoaded', () => {
  displayAll()
  bindSubmit()
})

// Empty and reload all hogs
function displayAll() {
  const hogContainer = document.getElementById('hog-container')
  hogAdapter.getAll().then(res => {
    hogContainer.innerHTML = ''
    res.forEach((hog) => {
    const pig = new Hog(hog)
    hogContainer.innerHTML += pig.render()
    })
    bindGreased(hogContainer)
    bindDelete(hogContainer)
  })
}

// Update Greased Status
function bindGreased(hogContainer) {
  const checkboxes = Array.from(hogContainer.querySelectorAll('input'))
  checkboxes.forEach(box => {
    box.addEventListener('change', updateGreased)
  })
}

function updateGreased(event) {
  const body = {greased: event.target.checked}
  hogAdapter.update(event.target.dataset.id, body).then(res => console.log(res))
}

// Create Hogs
function bindSubmit() {
  const hogForm = document.getElementById('hog-form')
  hogForm.addEventListener('submit', submitNew)
}

function submitNew(event) {
  event.preventDefault()
  const hogForm = event.target

  // Get all the information about a hog
  const hogName = hogForm.querySelector('input[name="name"]').value
  const hogSpecialty = hogForm.querySelector('input[name="specialty"]').value
  const hogMedal = hogForm.querySelector('input[name="medal"]').value
  const hogWeight = hogForm.querySelector('input[name="weight"]').value
  const hogImg = hogForm.querySelector('input[name="img"]').value
  const hogGreased = !hogForm.querySelector('input[name="greased"]').value

  // Format the fetch body first
  body = {name: hogName,
    specialty: hogSpecialty,
    greased: hogGreased,
    "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water": hogWeight,
    "highest medal achieved": hogMedal,
    image: hogImg
  }

  // And then send it in a fetch request
  hogAdapter.create(body).then(res => {
    console.log(res)
    displayAll()
  })
}

function bindDelete(hogContainer) {
  const deleteBtns = Array.from(hogContainer.querySelectorAll('.delete'))
  deleteBtns.forEach(button => {
    button.addEventListener('click', deleteHog)
  })
}

function deleteHog(event) {
  const id = event.target.dataset.id
  hogAdapter.delete(id).then(res => {
    console.log(res)
    displayAll()
  })
}
