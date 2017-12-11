targetIds = [];
clientIds = [];
assIds = [];
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('contracts').del()
  .then(function () {
      return knex('targets')
      .select('target_id')
      .then(function (targetData) {
        targetData.forEach(function(id){
          targetIds.push(parseInt(Object.values(id)));
        });
      });
    })
    .then(function () {
      return knex('clients')
      .select('client_id')
      .then(function (clientData) {
        clientData.forEach(function(id){
          clientIds.push(parseInt(Object.values(id)));
        });
      });
    })
    .then(function () {
      return knex('assassins')
      .select('assassin_id')
      .then(function (assData) {
        assData.forEach(function(id){
          assIds.push(parseInt(Object.values(id)));
        });
      });
    })
    .then(function () {
      return knex('contracts').insert([
        {target_id: targetIds[0], client_id: clientIds[0], budget: 40, completed: false, completed_by_ass_id: null},
        {target_id: targetIds[1], client_id: clientIds[1], budget: 70, completed: false, completed_by_ass_id: null},
        {target_id: targetIds[2], client_id: clientIds[2], budget: 35, completed: false, completed_by_ass_id: null},
        {target_id: targetIds[3], client_id: clientIds[3], budget: 25, completed: false, completed_by_ass_id: null},
        {target_id: targetIds[4], client_id: clientIds[4], budget: 10, completed: false, completed_by_ass_id: null}
      ]);
    });
};
