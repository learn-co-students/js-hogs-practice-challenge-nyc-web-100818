document.addEventListener('DOMContentLoaded', ()=>{

  const hogForm = document.querySelector('#hog-form')

  const hogContainer = document.querySelector('#hog-container')
  let allHogData = []


  function fetchHogs(){
    fetch("http://localhost:3000/hogs")
    .then(r=>r.json())
    .then(r=>{
      allHogData = r
      hogContainer.innerHTML = renderHTML(r)
    })
  }
   fetchHogs()


  function HTML(hog){
  return `<div class="hog-card"><h2 id="${hog.id}">${hog.name}</h2>
    Specialty: ${hog.specialty}<br>
    Weight: ${hog["weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water"]}<br>
    Highest Medal Achieved: ${hog["highest medal achieved"].toUpperCase()}<br>
    <img src=${hog.image}><br>
    <span>greased: <input id="${hog.id}" type="checkbox" name="greased" value="greased" data-action="check" ${hog.greased ? "checked" : ""}></span>
    <button data-action="delete" id="${hog.id}">Delete</button></div>
    `
  }

  function renderHTML(hogObject){
    return hogObject.map(HTML).join('')
  }
////////////////////////////////////////////////////////////////post////////////////////////////////////////
  hogForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    let greasedValue = document.querySelector('#greased').checked
    let nameInputValue = document.querySelector('#nameInput').value
    let specialtyInputValue = document.querySelector('#specialtyInput').value
    let medalInputValue = document.querySelector('#medalInput').value
    let weightInputValue = document.querySelector('#weightInput').value
    let imageValue = document.querySelector('#imageInput').value

    fetch(`http://localhost:3000/hogs`, {method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        id: allHogData[allHogData.length-1].id + 1,
        name: nameInputValue,
        image: imageValue,
        specialty: specialtyInputValue,
        greased: greasedValue,
        "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water": weightInputValue,
        "highest medal achieved": medalInputValue
      })
    })//end of fetch
      .then(r=>r.json())
      .then(r => {
        hogContainer.innerHTML += HTML(r)
      })
    })//end of event listener
//////////////////////////////////////////////delete////////////////////////////////////////////
    hogContainer.addEventListener('click', (e)=>{
      if (e.target.dataset.action === 'delete'){
        let clickedId = parseInt(e.target.id)
        let index = allHogData.findIndex((hog)=>{
          return hog.id === clickedId
        })
        allHogData.splice(index, 1)
        fetch(`http://localhost:3000/hogs/${clickedId}`, {method: 'DELETE'})
        hogContainer.innerHTML = renderHTML(allHogData)
      }
      else if (e.target.dataset.action === 'check'){
        let checkedValue = e.target.checked
        fetch(`http://localhost:3000/hogs/${e.target.id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          "greased": checkedValue
          })
      })
    }
  })//end of hogContainer event listener















})//end of add event listener
