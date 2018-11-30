const dataStore = { hogz: [] }
const dataStore2 = { hog: []}

const helper1 = {
  set: () => {
    console.log("rendering new hog");
    let lastHog = dataStore2.hog
    createHog(lastHog);
  }
}

const helper2 = {
  set: () => {
    console.log("re-rendering all hogs");
    document.getElementById('hog-container').innerHTML = ''
    dataStore.hogz.forEach(hog => {
      reCreateHog(hog)
    })
  }
}

const proxy1 = new Proxy(dataStore, helper1);
const proxy2 = new Proxy(dataStore, helper2);

class Hog {
  constructor(hog) {
    this.id = hog.id;
    this.name = hog.name;
    this.specialty = hog.specialty;
    this.greased = hog.greased;
    this.weight = hog["weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water"]
    this.medal = hog["highest medal achieved"];
    this.image = hog.image;
    dataStore.hogz.push(this);
  }
}

class HogLong {
  constructor(name, specialty, medal, weight, image, greased) {
    this.id = dataStore.hogz[dataStore.hogz.length - 1].id + 1
    this.name = name;
    this.specialty = specialty;
    this.greased = greased;
    this.medal = medal;
    this.weight = weight;
    this.image = image;
    dataStore2.hog = this;
  }
}
