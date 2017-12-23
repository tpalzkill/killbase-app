var express = require('express');
var router = express.Router();
var knex = require('../knex');

router.post('/', function (req, res) {
  const formInfo = req.body;
console.log(formInfo);
  let targ = {
    full_name: formInfo.target_name
  }
  let clientName = {
    full_name: formInfo.client_name
  }
  let forTarg = {
    photo: formInfo.photo,
    location: formInfo.location,
    sec_level: Number(formInfo.sec_level),
  }
  let forClients={};
  let forCont = {
    budget: Number(formInfo.budget)
  }
  let pushArr = [];
  knex('people')
    .insert(targ).as('target_name')
    .returning('*')
    .then(function(targyid) {
      forTarg.person_id = targyid[0].person_id;
    })
    .then(function() {
      return knex('people')
        .insert(clientName).as('client_name')
        .returning('*')
    })
    .then(function(people) {
      forClients.person_id = people[0].person_id;
      return knex('targets')
        .insert(forTarg)
        .returning('*')
    }).then(function(targs) {
      forCont.target_id = targs[0].target_id;

    })
    .then(function (){
      return knex('clients')
        .insert(forClients)
        .returning('*')
    })
    .then(function(butt){
      console.log(butt[0]);
      forCont.client_id = Number(butt[butt.length-1].client_id);
      return knex.insert(forCont).into('contracts')
    })
    .then(function() {
      res.redirect('/contracts')
      // res.redirect('/assassins')
    })
    .catch(error => {
      console.log(error);
      res.status(500)
    });
})
router.post('/:id', function(req, res, next) {
  let contId = req.params.id;
let ass = (req.body).selectField;
console.log(ass);
let forAssCon = {contract_id : contId,};

knex('people')
  .leftJoin('assassins', 'assassins.person_id', 'people.person_id')
  .where('people.full_name', ass)

.then(function(pass) {
  let assassinId= pass[0].assassin_id;
  console.log(assassinId);
  forAssCon.assassin_id = assassinId;
})
.then(function(){
  return knex('ass_con')
  .insert(forAssCon)
})
.then(function(){
  res.redirect('/contracts')
})
})
/* GET assassins home page. */
router.get('/', function(req, res, next) {
  // Get all assassins from db.
  let fullPeopleArr;
  knex('people')
    .leftJoin('clients', 'people.person_id', 'clients.person_id')
    .leftJoin('targets', 'people.person_id', 'targets.person_id')
    .leftJoin('contracts as c1', 'targets.target_id', 'c1.target_id')
    .leftJoin('contracts as c2', 'clients.client_id', 'c2.client_id')
    .select('targets.target_id', 'targets.location','targets.photo', 'targets.sec_level','people.full_name', 'c1.budget', 'c1.completed', 'c1.client_id', 'c1.contract_id', 'c1.completed_by_ass_id')
    .then(function(peopleArr) {
      fullPeopleArr = peopleArr;
    })
    .then(function() {
      knex('people')
        .leftJoin('clients', 'people.person_id', 'clients.person_id')
        .leftJoin('contracts', 'clients.client_id', 'contracts.client_id')
        .then(function(clientInfo) {
          res.render('contracts', {
            clients: fullPeopleArr,
            contracts: clientInfo
          });
        })
    })
    .catch(function(error) {
      res.sendStatus(500);
    })
})

router.get('/newHit', function(req, res, next) {
  res.render('newHit');
})
router.get('/contpatch/:id', function(req, res, next) {
  let id = req.params.id;
  let most = [];
  let clientName = [];

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

  .then(function() {
    knex('people')
      .leftJoin('clients', 'people.person_id', 'clients.person_id')
      .leftJoin('contracts', 'clients.client_id', 'contracts.client_id')
        .where('contracts.contract_id', id)
  .then(function(clientNames) {
        res.render('contPatch', {
          otherShit: clientNames,
          contract: most,
        })
      })
  })
    .catch(function(error) {
      res.sendStatus(500);
    });
})

router.put('/:id', function(req,res) {
let id = Number(req.params.id);
let upInfo = req.body;
let targ = {
  full_name: upInfo.target_name
}

let clientName = {
  full_name: upInfo.client_name
}
let forTarg = {
  photo: upInfo.photo,
  location: upInfo.location,
  sec_level: Number(upInfo.sec_level),
}
let forCont = {
  budget: Number(upInfo.budget)
}


return knex('contracts')
    .where('target_id', id)
    .update(forCont)
    .returning('client_id')
    .then(function(cli_id){
    return knex('clients')
      .select('person_id')
      .where('client_id', cli_id[0])
      .returning('*')
    })
    .then(function(data){
      return knex('people')
       .where('person_id', data[0].person_id)
       .update(clientName)
    })
    .then(function(){
      return knex('targets')
        .where('target_id', id)
        .update(forTarg)
        .returning('person_id')
    })
  .then(function(pers_id) {
    return knex('people')
      .where('person_id', Number(pers_id))
      .update(targ)
      .returning('person_id')
    })
  .then(function(){
    res.redirect('/contracts')
  })
  .catch(function(error){
    console.log(error);
  })

})
router.get('/:id', function(req, res, next) {
  let id = Number(req.params.id);
  console.log(typeof id);
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
    .catch(function(error) {
      res.sendStatus(500);
    });
});
router.delete('/:id', function (req, res) {
  const id= req.params.id;
  knex('contracts')
  .select('contract_id')
  .where('contract_id', id)
  .first()
  .del()
  .then(function(){
    res.redirect('/contracts')
  })
})



module.exports = router;
