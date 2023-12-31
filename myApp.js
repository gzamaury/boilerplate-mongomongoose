mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let Person = require('./models/person');

const createAndSavePerson = (done) => {
  let personObj = {
    name: "Amaury",
    age: 23,
    favoriteFoods: ["Roasted Chicken", "Milanesa", "Pizza"]
  }
  let person = new Person(personObj);

  person.save((error, data) => {
    if (error) return done(error);
    done(null , data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (error, data) => {
    if (error) return done(error);
    done(null , data);
  })
};

const findPeopleByName = (personName, done) => {
  let searchByName = {name: personName}
  
  Person.find(searchByName, (error, data) => {
    if (error) return done(error);
    done(null , data);
  })
};

const findOneByFood = (food, done) => {
  let searchByFood = {favoriteFoods: [food]}
  
  Person.findOne(searchByFood, (error, data) => {
    if (error) return done(error);
    done(null , data);
  })
};

const findPersonById = (personId, done) => {
  let searchById = {_id: personId}
  
  Person.findById(searchById, (error, data) => {
    if (error) return done(error);
    done(null , data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  let searchById = {_id: personId}
  
  Person.findById(searchById, (error, data) => {
    if (error) return done(error);

    data.favoriteFoods.push(foodToAdd);
    
    data.save((error, data) => {
      if (error) return done(error);
      done(null , data);
    });
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  let searchByName = {name: personName}
  let updateAge = {age: ageToSet}
  // returns the modified object
  let options = {new: true}
  
  Person.findOneAndUpdate(searchByName, updateAge, options, (error, data) => {
    if (error) return done(error);
    done(null , data);
  })
};

const removeById = (personId, done) => {
  let searchById = {_id: personId}
  
  Person.findByIdAndRemove(searchById, (error, data) => {
    if (error) return done(error);
    done(null , data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  let removeByName = {name: nameToRemove}
  
  Person.remove(removeByName, (error, data) => {
    if (error) return done(error);
    done(null , data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  
  let searchByFood = {favoriteFoods: foodToSearch}
  let orderByName = {name: "asc"}
  let limitResult = 2
  let selectedFields = "-age"
  
  Person.find(searchByFood)
    .sort(orderByName)
    .limit(limitResult)
    .select(selectedFields)
    .exec((error, data) => {
      if (error) return done(error);
      done(null , data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
