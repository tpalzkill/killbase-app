
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('role').del()
    .then(function () {
      return knex('people').del()
    })
        .then(function(){
      // Inserts seed entries
      return knex('people').insert([
        {full_name: 'Alexander Duggan', deceased: false},
        {full_name: 'Anton Chigurh', deceased: false},
        {full_name: null , deceased: false },
        {full_name: 'Jason Bourne', deceased: false},
        {full_name: 'John Wick', deceased: false},
        {full_name: 'Jules Winnfield', deceased: false},
        {full_name: 'Leon', deceased: false},
        {full_name: 'Nikita Mears', deceased: false},
        {full_name: 'Pickle Rick', deceased: false},
        {full_name: 'Butch Coolidge', deceased: false},
        {full_name: 'The Jaguar', deceased: false},
        {full_name: 'Norman Stansfield', deceased: false},
        {full_name: 'Santino D\'Antonio', deceased: false},
        {full_name: 'Sonny Valerio', deceased: false},
        {full_name: 'Marcellus Wallace', deceased: false},
        {full_name: 'Concerto', deceased: false},
        {full_name: 'Mathilda', deceased: false},
        {full_name: 'Winston', deceased: false},
        {full_name: 'Ray Largo', deceased: false}
      ]).returning(['person_id']);

})
.then(function(people){

      return knex('role').insert([
        {person_id: people[0].person_id, Assassin: true, Target: false, Client: false},
        {person_id: people[1].person_id, Assassin: true, Target: false, Client: false},
        {person_id: people[2].person_id, Assassin: true, Target: false, Client: false},
        {person_id: people[3].person_id, Assassin: true, Target: false, Client: false},
        {person_id: people[4].person_id, Assassin: true, Target: false, Client: false},
        {person_id: people[5].person_id, Assassin: true, Target: false, Client: false},
        {person_id: people[6].person_id, Assassin: true, Target: false, Client: false},
        {person_id: people[7].person_id, Assassin: true, Target: false, Client: false},
        {person_id: people[8].person_id, Assassin: true, Target: false, Client: false},
        {person_id: people[9].person_id, Assassin: false, Target: true, Client: false},
        {person_id: people[10].person_id, Assassin: false, Target: true, Client: false},
        {person_id: people[11].person_id, Assassin: false, Target: true, Client: false},
        {person_id: people[12].person_id, Assassin: false, Target: true, Client: false},
        {person_id: people[13].person_id, Assassin: false, Target: true, Client: false},
        {person_id: people[14].person_id, Assassin: false, Target: false, Client: true},
        {person_id: people[15].person_id, Assassin: false, Target: false, Client: true},
        {person_id: people[16].person_id, Assassin: false, Target: false, Client: true},
        {person_id: people[17].person_id, Assassin: false, Target: false, Client: true}
      ]).returning(['person_id']);
    })
    // .then(function(dawson) {
//       let balls = dawson;
//       return knex('assassins').insert([
//         {person_id: dawson[0].person_id, weapon: 'Sniper Rifle', contact_info: 'jackal@gmail.com', age: 31, min_price: 45, rating: 7.5, kills:28},
//         {person_id: dawson[1].person_id, weapon: 'Pneumatic Bolt Gun', contact_info: 'pneujackcity@gmail.com', age: 52, min_price: 40, rating: 9, kills:72},
//         {person_id: dawson[2].person_id, weapon: 'Pistol', contact_info: 'ghostdog@gmail.com', age: 28, min_price: 20, rating: 6.5, kills:35},
//         {person_id: dawson[3].person_id, weapon: 'Parkour', contact_info: 'jb@gmail.com', age: 27, min_price: 25, rating: 7, kills:48},
//         {person_id: dawson[4].person_id, weapon: 'Lots of guns', contact_info: 'babayaga@gmail.com	', age: 35, min_price: 50, rating: 9.5, kills:433},
//         {person_id: dawson[5].person_id, weapon: 'Pistol', contact_info: 'bmf@gmail.com', age: 26, min_price: 15, rating: 6.5, kills:13},
//         {person_id: dawson[6].person_id, weapon: 'Everything', contact_info: 'leon@gmail.com', age: 41, min_price: 30, rating: 8.5, kills:87},
//         {person_id: dawson[7].person_id, weapon: 'Silenced pistols', contact_info: 'nikita@gmail.com', age: 28, min_price: 30, rating: 7, kills:32},
//         {person_id: dawson[8].person_id, weapon: 'Lasers and Office Supplies', contact_info: 'rsanchez@gmail.com', age: 60, min_price: 0, rating: 8, kills:24},
//       ]);
//     }).then(function(dawson) {
//
//       return knex('targets').insert([
//         {person_id: dawson[9].person_id, location: 'Los Angeles' , photo:'https://goo.gl/LCquZj' , sec_level:3 },
//         {person_id: dawson[10].person_id, location: 'Russian Embassy', photo: 'https://goo.gl/6JWsiv', sec_level:9 },
//         {person_id: dawson[11].person_id, location: 'Manhattan', photo: 'https://i.imgur.com/mdIk33E.jpg', sec_level:7 },
//         {person_id: dawson[12].person_id, location: 'Contintental Hotel', photo: 'https://goo.gl/fUPkYy', sec_level:10 },
//         {person_id: dawson[13].person_id, location: 'Queens', photo: 'https://goo.gl/8DHYUS', sec_level:4 }
//       ]).returning(dawson);
// })

}
