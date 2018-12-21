
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c help im trapped in a loaded browzer!', 'color: yellow')

  const endPoint = 'http://localhost:3000/hogs'
  const newHogForm = document.getElementById('hog-form')
  const hogDiv = document.getElementById('hog-container')
  const hogCheckBox = document.querySelector(`input[type='checkbox']`)
  let allHogs = []

  fetch(endPoint)
    .then(res => res.json())
    .then(hogsJSON => {
      allHogs = hogsJSON
      hogDiv.innerHTML = renderAllHogs(hogsJSON)
    })


     //event listeners + fetch reqs

  hogDiv.addEventListener('click', e => {

    if (e.target.dataset.action === 'delete') {
      const deleteId = e.target.dataset.id
      allHogs = allHogs.filter(hog => hog.id != deleteId)
      renderAllHogs(allHogs)
      fetch(`${endPoint}/${deleteId}`, { method: 'DELETE' })
    }
  })


  hogDiv.addEventListener('change', e => {

    if (e.target.dataset.action === 'update'){
      checkedId = e.target.dataset.id
      const checkedHog = allHogs.find(h => h.id == checkedId)
      let greased = checkedHog.checked
      const body = { greased }
      patchGreased(body, checkedId)
    }
  })


  const patchGreased = (body, id) => {

    fetch(`${endPoint}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(body)
      }).then(res => res.json())
      .then(data => console.log(data))
  }


  newHogForm.addEventListener('submit', e => {

    e.preventDefault()
    let data = {
      'greased': e.target.greased.checked,
      'name': e.target.name.value,
      'specialty': e.target.specialty.value,
      'highest medal achieved': e.target.medal.value,
      'weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water': e.target.weight.value,
      'image': e.target.img.src
    }
    
    fetch(endPoint, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Accept: 'application/json'
        },
        body: JSON.stringify(data)
      
      })
        .then(r => r.json())
        .then(newHog => {
          allHogs.push(newHog)
        document.querySelector('.hog-card').innerHTML += renderHogCard(newHog)
        renderAllHogs(allHogs)
      })

  })


//render helpers

  const renderAllHogs = hogs => hogs.map(renderHogCard).join('')

  const renderHogCard = (hog) => {
    return `
      <div class='hog-card' data-id='${hog.id}'>
        <h4 id='name'>Name:  ${hog.name}</h4>
        <img id='hog-img' src='${hog.image}'>
        <p id='specialty'>Specialty: ${hog.specialty}</p>
        <p id='medal'>Highest medal achieved: ${hog.medal}</p>
        <p id='weight'>Weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water:  ${hog.weight}</p>
        <p>Greased: <input class='isChecked' type="checkbox" id="isGreased" data-action='update'
        data-id='${hog.id}' name="greased" value='greased' ${hog.greased ? 'checked' : ''}></p>
        <br>
        <button data-action='delete' data-id='${hog.id}'>DELETE</button>
        <br>
      </div>
      `
  }


})
//end domload