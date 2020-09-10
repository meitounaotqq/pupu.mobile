const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
//创建路由器对象
const router=express.Router();

//1.用户注册路由   post   /reg
router.post("/register",(req,res)=>{
  let phone=req.body.phone;
  let password=req.body.password;
  let userName=req.body.userName;
  let sex=req.body.sex;
  // let birthday=req.body.birthday;
  //执行sql语句
  let sql="SELECT phone FROM users WHERE phone=?"
  pool.query(sql,[phone],(err,results)=>{
    if(err) throw err;
    if(results.length>0){
      res.send({message:"用户已存在",code:0});
    }else{
      let sql="INSERT INTO users(phone,password,userName,sex) VALUES(?,?,?,?)";
      pool.query(sql,[phone,password,userName,sex],(err,results)=>{
        if(err) throw err;
        if(results.affectedRows>0){
          res.send({message:"注册成功",code:1});
        }else{
          res.send({message:"注册失败",code:0});
        }
      });
    }
  }); 
});


//2.用户登录路由 get  /login
router.get('/login',(req,res)=>{
  let phone=req.query.phone;
  let password=req.query.password;
  let sql='SELECT phone,password FROM users WHERE phone=? AND password=?';
  pool.query(sql,[phone,password],(err,result)=>{
    if(err) throw err;
    if(result.length>0){
      res.send({message:'登录成功',code:1})
    }else{
      res.send({message:'密码错误',code:0})
    }
  })

})















//路由器对象导出
module.exports=router;