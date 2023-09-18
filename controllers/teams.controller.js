const Build = require("../models/build");
const Champion = require("../models/champions.model");
const Item = require("../models/items.model");
const Rune = require("../models/runes.model");
const Utils = require("../utils/utils");

module.exports.randomComp = (req,res,next) => {
    const team = {
        1: {"position": "https://res.cloudinary.com/dg1pgnrnl/image/upload/Positions/Top.png"},
        2: {"position": "https://res.cloudinary.com/dg1pgnrnl/image/upload/Positions/Jungle.png"},
        3: {"position": "https://res.cloudinary.com/dg1pgnrnl/image/upload/Positions/Mid.png"},
        4: {"position": "https://res.cloudinary.com/dg1pgnrnl/image/upload/Positions/Bot.png"},
        5: {"position": "https://res.cloudinary.com/dg1pgnrnl/image/upload/Positions/Support.png"},
    };
    
    Champion.distinct('name').then((names) => {
        const pickedNames = Utils.pickAmountOfRandomaElements(names, 5);
        Champion.find({ name: { $in: pickedNames } }).then((champions) => {
            const champs = Utils.pickAmountOfRandomaElements(champions, 5);
            for (let i = 1, e = 0; i <= 5; i++, e++) {
                team[`${i}`].champion = champs[e]
            }

            setTimeout(() => {
                res.render("random/team", { team })
            }, 750)

        })
    });

    Rune.find({"level": 1})
    .then((runes) => {
        for(let i = 1; i <= 5; i++) {
            team[`${i}`].rune = Utils.pickAmountOfRandomaElements(runes, 1)[0]
        }
    })

    Item.find({ boots: { $eq: true } })
    .then((boots) => {
        for(let i = 1; i <= 5; i++) {
            team[`${i}`].boots = Utils.pickAmountOfRandomaElements(boots, 1)[0]
        }
    })
    .catch();
    Item.find({ mythic: { $eq: true } })
    .then((mythics) => {
        for(let i = 1; i <= 5; i++) {
            team[`${i}`].mythic = Utils.pickAmountOfRandomaElements(mythics, 1)[0]
        }
    })
    .catch(() => {});
    Item.find({$and: [{ boots: { $in: [ false ] }},{ mythic: { $in: [ false ] }}]})
    .then((legendaries) => {
        for(let i = 1; i <= 5; i++) {
            const items = Utils.pickAmountOfRandomaElements(legendaries, 5);
            team[`${i}`].item1 = items[0];
            team[`${i}`].item2 = items[1];
            team[`${i}`].item3 = items[2];
            team[`${i}`].item4 = items[3];
            team[`${i}`].item5 = items[4];
        }
        
    })
    .catch(() => {});



}