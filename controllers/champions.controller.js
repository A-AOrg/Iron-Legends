const Champion = require("../models/champions.model")

module.exports.list = (req,res,next) => {
    Champion.find()
    .then((champions) => {

        Champion.distinct('name').then((names) => {
        console.log(names)
        const championNames = names;
        const i = Math.floor(Math.random() * championNames.length)
        const pickedChampName = championNames[i]

        Champion.find({"name": pickedChampName}).then((champion) => {
            
            console.log(champion)
        })
        .catch(next);
        });


        res.render("champions/list", { champions });
    })
    .catch(() => {});
};


module.exports.detail = (req,res,next) => {
    Champion.findById(req.params.id)
        .then((champion) => {
            res.render("champions/detail", { champion });
        })
        .catch(next);
};


module.exports.create = (req,res,next) => {
    res.render("champions/new")
}


module.exports.doCreate = (req,res,next) => {
    Champion.create({
        name: req.body.name,
        title: req.body.title,
        key: parseInt(req.body.key),
        splashart: req.body.splashart,
        icon: req.body.icon,
        frame: req.body.frame,
    })
    .then(() => {
        res.redirect("/champions/list");
    })
    .catch(next);
}

module.exports.randomChamp = (req,res,next) => {
    Champion.distinct('name').then((names) => {
        console.log(names)
        const championNames = names;
        const i = Math.floor(Math.random() * championNames.length)
        const pickedChampName = championNames[i]

        Champion.findOne({"name": pickedChampName}).then((champion) => {
            
            console.log(champion)

            res.render("champions/random", { champion });
        })
        .catch(next);
    });
}


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
 