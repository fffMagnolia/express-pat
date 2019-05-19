var express = require('express');
var router = express.Router();

let db = require('../models/index');

/* GET home page. */
/**
  * やりたいこと：
  * listテーブルからリスト情報を取得
  * 取得したリスト情報のIDと一致するitemsデータを取得。
  * {list_name: ['item1', 'item2']}みたいな形でビュー側に渡せたら最高
  */
router.get('/', function(req, res, next) {
  db.lists.findAll({}).then((lists) => {
    console.log(JSON.parse(JSON.stringify(lists)))
    res.render('index', { title: 'Express', lists: JSON.parse(JSON.stringify(lists)) });
  });
});

module.exports = router;
