let express = require('express');
let router = express.Router();

let db = require('../models/index');

/* req.bodyの処理に必要
 * 各parserは個別に準備する
 * extended: 配列を渡された時に{[a, b]}のようにするか
 * urlencoded: urlでは本来扱えない文字列を処理するのに必要
*/
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: false })
let jsonParser = bodyParser.json();

 /* 
  * DBへのアクセス処理
  * CRUD順に並んでいる
  */
let createList = (req, res) => {
  let list = db.lists.build({ title: req.body.title });
  list.save().then((result) => {
    res.json(result);
    res.end();
  })
}

let getList = (req, res) => {
  db.lists.findAll({
    include: [{ model: db.items }]
  }).then((result) => {
    res.json(result);
    res.end();
  })
}

let updateListTitle = (req, res) => {
  db.lists.findOne({ where: { id: req.params['listId'] } })
    .then((list) => {
      list.update({ title: req.body.title })
      list.save().then((result) => { 
        res.json(result);
      })
    })
}

//TODO:listIDに紐づくitemも同時に削除したい
let deleteList = (req, res) => {
  db.lists.findOne({ where: { id: req.params['listId'] } })
    .then((list) => {
      list.destroy();
      res.end();
    })
}

// localhost:3000/lists/ からの相対パスで指定
router.post('/', jsonParser, createList);
router.get('/', getList);
router.put('/:listId', jsonParser, updateListTitle);
router.delete('/:listId', deleteList);

module.exports = router;
