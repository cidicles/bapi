'use strict';
const expressJwt = require('express-jwt');
const constants = require('../../const');
const authenticate = expressJwt({secret : constants.jwtSecret});

module.exports = function(app) {
  const betList = require('../controllers/betController');

  // Creation / Viewing Bet
  app.route('/api/bet/:page/:limit')
    .get(betList.list_all_Bets);

  app.route('/api/bet')
    .post(authenticate, betList.create_a_Bet);

  // Updating / Deletion of parent Bet
  app.route('/api/bet/:collectionId')
    .get(betList.get_a_Bet)
    .put(authenticate, betList.update_a_Bet)
    .delete(authenticate, betList.delete_a_Bet);

};
