module.exports.pickAmountOfRandomaElements = (array, amount) => {
    const mapedArray = array.map((element) => {return element;});
    const pickedElements = [];
    for (let i = mapedArray.length - 1, e = 0; e < amount; i--) {
        let randomIndex = 0;
        if (i !== 0) {
            randomIndex = Math.floor(Math.random() * (i - 1));
        }
        
        const randomElement = mapedArray[randomIndex];
        pickedElements[e] = randomElement;
        mapedArray[randomIndex] = mapedArray[i];
        mapedArray[i] = randomElement;
        e++;
    }
    return pickedElements;
}

// para usarla:^
// const utils = require('../utils/utils')´
// utils.pickAmountOf...

/*
shuffle() {
    for (let i = this.elements.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i - 1));
      const randomElement = this.elements[randomIndex];
      this.elements[randomIndex] = this.elements[i];
      this.elements[i] = randomElement;
    }
}


function takeRandomChamp() {
    Champion.distinct('name').then((names) => {
        const championNames = names;
    
        const i = Math.floor(Math.random() * championNames.length)

        Champion.find({"name": `${championNames[i]}`}).then((champion) => {
            console.log(champion)
        });
    });
}
*/

/*    
    let championNum = 0;
    Champion.count().then((n) => {
        championNum = n
    });
*/