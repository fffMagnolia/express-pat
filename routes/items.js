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
  let item = db.items.build({ body: req.body.item, list_id: req.body.list_id });
  item.save().then((result) => {
    res.json(result);
    res.end();
  })
}

let updateItem = (req, res) => {
  let item = db.items.findOne({ where: { id: req.params['itemId'] } })
    .then((item) => {
      //TODO:body,stateのどちらかしか変更されない場合に処理わけしたい
      item.update({ body: req.body.body, state: req.body.state })
      item.save().then((result) => {
        res.json(result);
      })
    })
}

let deleteItem = (req, res) => {
  db.items.findOne({ where: { id: req.params['itemId'] } })
    .then((item) => {
      item.destroy();
      res.end();
    })
}

/* リストに紐づいたアイテムを一括削除する */
let deleteItems = (req, res) => {
  db.items.destroy({ where: { list_id: req.params['listId'] } })
    .then( _ => {
      res.end();
    })
}

/* 
 * localhost:3000/items/ からの相対パスで指定
 * getは多分使わないので封印
 * postとputの:listIdはルーティングをわかりやすくするため入れている
*/
router.post('/:listId', jsonParser, createItem);
//router.get('/', getList);
router.put('/:listId/:itemId', jsonParser, updateItem);
router.delete('/:listId/:itemId', deleteItem);
router.delete('/:listId', deleteItems);

module.exports = router;
