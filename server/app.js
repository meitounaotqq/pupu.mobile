const express=require('express');
//引入路由器
const userRouter=require('./router/user.js');
const proRouter=require('./router/product.js');
//引入body-parser中间件
const bodyParser=require('body-parser');
const cors=require("cors");
const app=express();
app.listen(5000);
//托管静态资源到public目录
app.use( express.static('public') );
app.use( express.static('ajax') );
app.use(cors({
  origin:['http://127.0.0.1:8080','http://localhost:8080','http://176.204.25.107:8080']
}))
//应用中间件，将post请求的数据解析为对象
app.use( bodyParser.urlencoded({
  extended:false
}) );
//挂载路由器，并添加前缀/user
app.use('/user',userRouter);
app.use('/product',proRouter);