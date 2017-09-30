const express = require('express');
const proxy = require('http-proxy-middleware');//引入代理中间件
const app = express();

const fs = require('fs');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/JSON
app.use(bodyParser.json())  // 解析json的格式

const utils = require('./lib/utils.js')

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})
let shopList = {};
fs.readFile('./data/shop-list.json', (error, data) => {
  shopList = {
    list: JSON.parse(data.toString())
  }
})

let shopItem = {};
fs.readFile('./data/shop-item.json', (error, data) => {
  shopItem = {
    list: JSON.parse(data.toString())
  }
})

app.get('/api/list', (req, res) => {
  // 暂时先已读取的形式
  res.send(shopList)
})

app.post('/api/getItem', (req, res) => {
  let {itemId} = req.body;
  let d = fs.readFileSync('./data/shop-item.json')
  if(d.toString()){
    d = JSON.parse(d.toString())
    for(var goodId in d){
      if(goodId === itemId){
        res.send(d[goodId])
      }
    }
  }
})

app.post('/api/setShopCarList', (req, res) => {
  let {carList} = req.body
  let isExist = fs.existsSync('./data/carList.json')
  let arr = []
  if(isExist){
    let d = fs.readFileSync('./data/carList.json')
    if(d.toString()){
      arr = JSON.parse(d);
    }

  }

  let getDate = JSON.parse(carList);

  let findData = arr.find((item) => {
    return item.sku_id === getDate.sku_id
  })

  if(findData){
    if(findData.sku_num < 5){
      findData.sku_num = ++findData.sku_num
    }else{
      res.send({
        code: 1,
        mesText: '已达到上限',
        car_list: arr
      })
      return;
    }


  }else {
    getDate.sku_num = 1
    getDate.price = shopItem.list[getDate.sku_id].data.price
    arr.push(getDate);
  }

  fs.writeFileSync('./data/carList.json', JSON.stringify(arr))

  res.send({
    code: 0,
    car_list: arr
  })


})

//增加一个
app.post('/api/addOne', (req, res) => {
  let {carList} = req.body
  let isExist = fs.existsSync('./data/carList.json')//获取的是购物车内商品的所有的信息
  let arr = []
  if(isExist){//如果有商品，读取文件内的商品
    let d = fs.readFileSync('./data/carList.json')
    if(d.toString()){
      arr = JSON.parse(d);
    }
  }
  //将发送过来的单个的商品数据转为对象
  let getDate = JSON.parse(carList);
  //在所有的商品信息中找到该id对应的商品
  let findData = arr.find((item) => {
    return item.sku_id === getDate.sku_id
  })
  //如果购物车中有该商品
  if(findData){
    //判断商品数量是否<5个，是的话，就添加
    if(findData.sku_num < 5){
      findData.sku_num = ++findData.sku_num
      //否则就发送添加失败信息
    }else{
      res.send({
        code: 1,
        mesText: '已达到上限',
        car_list: arr
      })
      return;
    }
  }
  // 写入购物车数据
  fs.writeFileSync('./data/carList.json', JSON.stringify(arr))

  res.send({
    code: 0,
    car_list: arr
  })
})

//减少一个
app.post('/api/reduceOne', (req, res) => {
  let {carList} = req.body
  let isExist = fs.existsSync('./data/carList.json')//获取的是购物车内商品的所有的信息
  let arr = []
  if(isExist){//如果有商品，读取文件内的商品
    let d = fs.readFileSync('./data/carList.json')
    if(d.toString()){
      arr = JSON.parse(d);
    }
  }
  //将发送过来的单个的商品数据转为对象
  let getDate = JSON.parse(carList);
  //在所有的商品信息中找到该id对应的商品
  let findData = arr.find((item) => {
    return item.sku_id === getDate.sku_id
  })
  //如果购物车中有该商品
  if(findData){//减少的时候肯定有该信息
    //判断商品数量是否>1个，最少为一个是的话，就添加
    if(findData.sku_num > 1){
      findData.sku_num = --findData.sku_num
      //否则就发送添加失败信息
    }else{
      res.send({
        code: 1,
        mesText: '已达到上限',
        car_list: arr
      })
      return;
    }
  }
  // 写入购物车数据
  fs.writeFileSync('./data/carList.json', JSON.stringify(arr))

  res.send({
    code: 0,
    car_list: arr
  })
})

app.get('/api/getShopCarList', (req, res) => {
  let isExist = fs.existsSync('./data/carList.json')
  if(isExist){
    let d = fs.readFileSync('./data/carList.json')
    if(d.toString()){
      res.send({
        car_list: JSON.parse(d)
      })
    }
    return

  }
  res.send({
    car_list: []
  })
})
/* fs.readFile('./data/shop-item.json', (error, data) => {
  let data2 = JSON.parse(data.toString());
  let json = {};
  data2.map((item) => {
    if(item.data){
      json[item.data.id] = item
    }
  })
}) */

app.post('/api/removeCarShopById', (req, res) => {
  let {removeId} = req.body;
  console.log(removeId)
  let isExist = fs.existsSync('./data/carList.json')
  if(isExist){
    let d = fs.readFileSync('./data/carList.json')
    if(d.toString()){
      d = JSON.parse(d.toString())
      d = d.filter(item => {
        return item.sku_id !== removeId
      })
      fs.writeFileSync('./data/carList.json', JSON.stringify(d))
      res.send({
        car_list: d
      })
    }
  }
})

app.get('/item', (req, res) => {
  let {id} = req.query;

})
//'192.168.2.81',
app.listen(3100,  () => {
  console.log('Listening on: http://192.168.2.81:3100');
});
