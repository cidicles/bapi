'use strict';
const mongoose = require('mongoose');
const Bet = mongoose.model('Bet');

/**
 * @api {get} /bet/:page/:limit Get a paginated list of all Bets
 * @apiName List All Bets
 * @apiGroup Bets
 *
 * @apiParam {Int} page The current page.
 * @apiParam {Int} limit The amount to return.
 *
 */
exports.list_all_Bets = function(req, res) {
  Bet.paginate(parseInt(req.params.page), parseInt(req.params.limit), function(err, Bets, total) {
    handleError(err, res);
    res.json({
      "bets": Bets,
      "total": total
    });
  });
};

/**
 * @api {post} /bet Create a new Bet
 * @apiName Create a Bet
 * @apiGroup Bets
 *
 * @apiParam {String} name Name of the Bet.
 * @apiParam {String} locale Locale of the Bet.
 * @apiParam {String} currency Currency of the Bet.
 * @apiParam {Float} amount Amount of the Bet.
 * @apiPermission authenticated
 *
 * @apiSuccessExample {json} Success:
 *     HTTP/1.1 200 OK
 *       {
 *           "__v": 0,
 *           "creator": "test",
 *           "name": "Amount Sample Float",
 *           "amount": 10.01,
 *           "recipient": "5b2719c10ea1df53b0e19b90",
 *           "_id": "5b27183945c44053c4992048",
 *           "locale": [
 *               "en_us"
 *           ],
 *           "created_date": "2018-06-18T02:26:01.380Z",
 *           "currency": [
 *               "usd"
 *           ],
 *           "status": [
 *               "unresolved"
 *           ]
 *       }
 *
 */
exports.create_a_Bet = function(req, res) {
  let new_Bet = new Bet(req.body);
  new_Bet.creator = req.user;
  new_Bet.save(function(err, Bet) {
    handleError(err, res);
    res.json(Bet);
  });
};

/**
 * @api {get} /bet/:collectionId Get a Bet
 * @apiName Get a Bet
 * @apiGroup Bets
 *
 * @apiParam {String} collectionId Id of the Bet.
 *
 */
exports.get_a_Bet = function(req, res) {
  Bet.findById(req.params.collectionId, function(err, Bet) {
    handleError(err, res);
    res.json(Bet);
  });
};

/**
 * @api {put} /bet/:collectionId Update a Bet
 * @apiName Update a Bet
 * @apiGroup Bets
 *
 * @apiParam {String} collectionId Id of the Bet.
 * @apiPermission authenticated creator
 *
 */
exports.update_a_Bet = function(req, res) {
  Bet.findOneAndUpdate({_id: req.params.collectionId}, req.body, {new: true}, function(err, Bet) {
    handleError(err, res);
    res.json(Bet);
  });
};

/**
 * @api {delete} /bet/:collectionId Delete a Bet
 * @apiName Delete a Bet
 * @apiGroup Bets
 *
 * @apiParam {String} collectionId Id of the Bet.
 * @apiPermission authenticated creator
 *
 */
exports.delete_a_Bet = function(req, res) {
  Bet.remove({
    _id: req.params.collectionId
  }, function(err, Bet) {
    handleError(err, res);
    res.status(200).json({
      message: 'Bet successfully deleted'
    });
  });
};

/* Helpers
------------------------*/

function handleError(err, res){
  if (err) {
    res.status(500).send(err);
  }
}
