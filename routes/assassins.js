var express = require('express');
var router = express.Router();
var knex = require('../knex');

/* GET assassins home page. */
router.put('/:id', function(req,res) {
let id = Number(req.params.id);
let upInfo = req.body;
let updateAss = {
  weapon: upInfo.weapon,
  contact_info: upInfo.contact_info,
  age: Number(upInfo.age),
  min_price: Number(upInfo.min_price),
  rating: Number(upInfo.rating),
  kills: Number(upInfo.kills)
};
let updateCodenames = {
  code_name: upInfo.code_name
};
let updatePeople = {
  full_name: upInfo.full_name
};


  // knex('people')
  // .where('people.person_id', id)
  // .join('assassins', 'people.person_id', 'assassins.person_id')
  // .innerJoin('codenames', 'codenames.assassin_id', 'assassins.assassin_id')
  // .then(function(ogInfo) {
    return knex('people')
    .where('person_id', id)
    .update(updatePeople)
  .then(function(peepid){
    return knex('assassins')
    .where('person_id', id)
    .returning('assassin_id')
    .update(updateAss)
  }).then(function(assId){
    console.log('2nd nonsense');
    return knex('codenames')
    .where('codenames.assassin_id', Number(assId))
    .update(updateCodenames)
  })
  .then(function(){
    res.redirect('/assassins')
  })
  .catch(function(error){
    console.log(error);
  })

})
router.get('/', function(req, res, next) {
  // Get all assassins from db.
  knex.select('assassins.person_id', 'assassins.assassin_id', 'people.full_name', 'assassins.min_price', 'assassins.rating', 'assassins.contact_info', 'assassins.weapon', 'assassins.kills', 'codenames.code_name',).from('people').innerJoin('assassins', 'assassins.person_id', 'people.person_id').innerJoin('codenames', 'codenames.assassin_id', 'assassins.assassin_id')

    .then(function(assassinsArr) {
      // Successfully fetched all assassins. Respond however you like.
      res.render('assassins', {
        assassins: assassinsArr
      });
    })
    .catch(function(error) {
      res.sendStatus(500);
    })
});

router.get('/create', function(req, res) {
  res.render('create');
});

router.get('/asspatch/:id', function(req, res) {
  let id = req.params.id;
    console.log(id);
  knex.select('*')
    .from('people')
    .join('assassins', 'people.person_id', 'assassins.person_id')
    .innerJoin('codenames', 'codenames.assassin_id', 'assassins.assassin_id')
    .where('people.person_id', id)
    .first()
    .then(function(butthead) {
      res.render('asspatch', {
        assassin: butthead
      });
    })
    .catch(function(error) {
      res.sendStatus(500);
    });
})


router.get('/:id', function(req, res, next) {
  let id = req.params.id;
  let most = [];
  let clientName = [];
  let assassins =[];
  knex('people')
    .leftJoin('clients', 'people.person_id', 'clients.person_id')
    .leftJoin('targets', 'people.person_id', 'targets.person_id')
    .leftJoin('contracts as c1', 'targets.target_id', 'c1.target_id')
    .leftJoin('contracts as c2', 'clients.client_id', 'c2.client_id')
      .select('targets.target_id', 'targets.location','targets.photo', 'targets.sec_level', 'people.full_name', 'c1.budget', 'c1.completed', 'c1.client_id', 'c1.contract_id', 'c1.completed_by_ass_id')
      .where('c1.contract_id', id)
      .first()
  .then(function(first) {
    most.push(first);
  })
  .then(function(){
    return knex('assassins')
      .leftJoin('people', 'people.person_id', 'assassins.person_id')
  .then(function(asshats){
    asshats.forEach(function(ass){
      assassins.push(ass.full_name);
    })
  })
  })
  .then(function() {
    knex('people')
      .leftJoin('clients', 'people.person_id', 'clients.person_id')
      .leftJoin('contracts', 'clients.client_id', 'contracts.client_id')
        .where('contracts.contract_id', id)
  .then(function(clientNames) {
    console.log('contract:', most, 'otherShit', clientNames);
        res.render('contid', {
          otherShit: clientNames,
          contract: most,
          asshats: assassins
        })
      })
  })

  knex.select('assassins.kills', 'assassins.assassin_id', 'people.full_name', 'assassins.min_price', 'assassins.rating', 'assassins.kills', 'assassins.weapon', 'assassins.contact_info', 'codenames.code_name')
    .from('people')
    .join('assassins', 'people.person_id', 'assassins.person_id')
    .innerJoin('codenames', 'codenames.assassin_id', 'assassins.assassin_id')
    .where('people.person_id', id)
    .first()
    .then(function(reptar) {
      res.render('assid', {
        assassin: reptar
      });
    })
    .catch(function(error) {
      res.sendStatus(500);
    });
});
router.delete('/:id', function (req, res) {
  const id= req.params.id;
  knex('people')
  .select('person_id')
  .where('person_id', id)
  .first()
  .del()
  .then(function(){
    res.redirect('/assassins')
  })
})
router.post('/', (req, res) => {
  const formInfo = req.body;
  console.log(formInfo);
  for (let requiredParameter of ['weapon', 'kills', 'rating']) {
    if (!formInfo[requiredParameter]) {
      return res
        .status(422)
        .send({
          error: `Yo Dumbass -- Expected format: { Full_name(optional): <string>, code_name: <string>,  Weapon: <String>, Kill Count: <number>, Kill: <Number> }.`
        });
    }
  }
  let forAss = {
    weapon: formInfo.weapon,
    contact_info: formInfo.contact_info,
    age: Number(formInfo.age),
    min_price: Number(formInfo.min_price),
    rating: Number(formInfo.rating),
    kills: Number(formInfo.kills)
  };
  let forCodenames = {
    code_name: formInfo.code_name
  };
  let forPeople = {
    full_name: formInfo.full_name
  };


  knex('people')
    .insert(forPeople)
    .returning('*')
    .then(function(people) {


      forAss.person_id = people[0].person_id;

      return knex('assassins')
        .insert(forAss)
        .returning('*')
    }).then(function(assassins) {
      forCodenames.assassin_id = assassins[0].assassin_id;
      return knex.insert(forCodenames).into('codenames')
    }).then(function() {
      res.redirect('/assassins')
      // res.redirect('/assassins')
    })
    .catch(error => {
      console.log(error);
      res.status(500)
    });
  // res.send(req.body);
});



module.exports = router;
