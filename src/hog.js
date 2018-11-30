class Hog {
  constructor(body) {
    this.id = body.id
    this.name = body.name
    this.specialty = body.specialty
    this.greased = body.greased
    this.weight = body['weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water']
    this.medal = body['highest medal achieved']
    this.image = body.image
  }

  render() {
    let html = `<div data-id='${this.id}' class='hog-card'>
    <img src='${this.image}'>
    <h1>${this.name}</h1>
    <p>Specialty: ${this.specialty}</p>
    <p>Weight: ${this.weight}</p>
    <p>Highest Medal: ${this.medal}</p>
    <span>Greased: <input type="checkbox" name="greased" value="greased" data-id='${this.id}' `
    if (this.greased) {
      html += ` checked`
    }
    html += `></span><button class='delete' data-id='${this.id}'>Delete</button></div>`
    return html
  }
}
