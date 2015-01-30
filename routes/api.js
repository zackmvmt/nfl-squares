module.exports = function(app) {

  // EXAMPLE API
  app.get('/api/users', function(req, res) {
    var users = [
      { firstName: 'Zack', lastName: 'Stickles', age: 27 },
      { firstName: 'John', lastName: 'Doe', age: 32 },
      { firstName: 'Jane', lastName: 'Doe', age: 18 }
    ];
    res.json(users);
  });

  app.get('/api/game', require('../controllers/game.js').gameData);

};