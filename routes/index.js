var express = require('express');
var router = express.Router();

let db = require('../models/index');

let getList = (req, res, next) => {
  db.lists.findAll({
    include: [{ model: db.items }]
  }).then((result) => {
    res.json(result);
    next();
  })
}

// /にアクセスした際、router.getの処理以前に呼び出される
router.use('/', getList);

router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express'});
  console.log('root access!!');
});

module.exports = router;
