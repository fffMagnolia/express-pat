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

let createItem = (req, res) => {
  let item = db.items.build({ body: req.body.body, list_id: req.body.list_id });
  item.save().then((result) => {
    res.json(result);
    res.end();
  })
}

/* 
 * localhost:3000/items/ からの相対パスで指定
 * getは多分使わないので封印
*/
router.post('/', jsonParser, createItem);
//router.get('/', getList);
//router.put('/:listId/:itemId', jsonParser, updateListItem);
//router.delete('/:listId', deleteItems);

module.exports = router;
