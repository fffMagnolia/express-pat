var express = require('express');
var router = express.Router();

let db = require('../models/index');

let getList = (req, res, next) => {
  db.lists.findAll({
    include: [{ model: db.items }]
  }).then((result) => {
    res.json(result);
    res.end();
    //next();
  })
}

//GETより先に処理される。つまり、URLを入力した時点で動く
//router.use(getList);

// localhost:3000/lists/ からの相対パスで指定
router.get('/', getList);

module.exports = router;
