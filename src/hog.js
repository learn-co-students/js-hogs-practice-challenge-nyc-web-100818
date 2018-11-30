class Hog {
  constructor({
    id, 
    name, 
    greased, 
    specialty, 
    "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water": weight, // YYYYY
    "highest medal achieved": medal,
    image
  }) {
    this.id = id
    this.name = name
    this.greased = greased
    this.specialty = specialty
    this.weight = weight
    this.medal = medal
    this.image = image
    Hog.all.push(this)
  }

  renderCard() {
    return `<div class="hog-card">
              <h1>${this.name}</h1>
              <img src="${this.image}">
              <h4>Weight: ${this.weight}</h4>
              <h4>Medal: ${this.medal}</h4>
              <h4>Specialty: ${this.specialty}</h4>
              <div>
                <label for="greased">Greased?</label><input data-id="${this.id}" data-action="update" name="greased" type="checkbox" ${this.greased ? "checked" : ""} />
                <button data-id="${this.id}" class="delete">Delete</button>
              </div>
            </div>`
  }

  updateApi(data) {
    return Hog.adapter.patch(this.id, data)
  }

  static create(data) {
    return Hog.adapter.post(data)
      .then(json => {
        new Hog(json)
      })
      .catch(console.error)
  }

  static findById(id) {
    return Hog.all.find(h => h.id == id)
  }

  static remove(id) {
    Hog.all = Hog.all.filter(h => h.id != id)
    return Hog.adapter.delete(id)
  }

  static renderCards() {
    return Hog.all.map(h => h.renderCard()).join("")
  }
  
  static populateFromAPI() {
    return Hog.adapter.getAll()
      .then(json => {
        json.forEach(hogObj => {
          new Hog(hogObj)
        })
      })
      .catch(console.error)
  }
}

Hog.all = []
Hog.adapter = new JSONAPIAdapter('http://localhost:3000/hogs')
