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


// RANDOMIZER

module.exports.randomChamp = (req,res,next) => {
    Champion.distinct('name').then((names) => {
        const championNames = names;
        const pickedChamps = [];

        
        for (let i = championNames.length - 1, e = 0; e < 5; i--) {
            const randomIndex = Math.floor(Math.random() * (i - 1));
            const randomChampion = championNames[randomIndex];
            pickedChamps[e] = randomChampion;

            championNames[randomIndex] = championNames[i];
            championNames[i] = randomChampion;
            e++
        }

        Champion.find({ name: { $in: [`${pickedChamps[0]}`, `${pickedChamps[1]}`, `${pickedChamps[2]}`, `${pickedChamps[3]}`, `${pickedChamps[4]}`] } }).then((champions) => {
            const champs = [];
            let i = 4;
            champions.map((x) => {
                champs[i] = x;
                i--;
            });

            const champ1 = champs[0], champ2 = champs[1], champ3 = champs[2], champ4 = champs[3], champ5 = champs[4];
            res.render("champions/random", {champ1, champ2, champ3, champ4, champ5})

        })
        .catch(next);
    }
)}

/*

`${pickedChamps}`

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
 