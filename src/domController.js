class DOMController {
  constructor() {
    this.hogContainer = document.getElementById('hog-container')
    this.hogForm = document.getElementById('hog-form')
    this.hogContainer.addEventListener('click', this.handleHogClick.bind(this))
    this.hogForm.addEventListener('submit', this.handleHogForm.bind(this))
  }

  render() {
    this.hogContainer.innerHTML = Hog.renderCards()
  }

  handleHogForm(e) {
    e.preventDefault()
    const hogData = {
      "name": e.target.name.value,
      "specialty": e.target.specialty.value,
      "greased": e.target.greased.checked,
      "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water": e.target.weight.value,
      "highest medal achieved": e.target.medal.value,
      "image": e.target.img.value
    }
    Hog.create(hogData)
      .then(() => this.render())
    e.target.reset()
  }

  handleHogClick(e) {
    if (e.target.className === "delete") {
      const hogId = e.target.dataset.id
      Hog.remove(hogId)
        .then(() => this.render())
    } else if (e.target.dataset.action === "update") {
      const hogId = e.target.dataset.id
      const hog = Hog.findById(hogId)
      hog.greased = e.target.checked
      hog.updateApi({ greased: hog.greased })
    }
  }
}