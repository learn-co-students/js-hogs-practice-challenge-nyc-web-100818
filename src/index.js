document.addEventListener('DOMContentLoaded', () => {
  const controller = new DOMController
  Hog.populateFromAPI()
    .then(() => {
      controller.render()
    })
})