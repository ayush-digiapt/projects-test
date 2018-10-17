var express = require('express');
var db = require('../db/db');
var router = express.Router();
var async =  require('async');

exports.createUser = function(req,res) {
console.log("inside the create");

//console.log("request body: ", req.body);
//console.log('req',req);

 //connection = db.getDbConnection();

    async.waterfall([
        function task1(callback){
         console.log("task1");
         connection = db.getDbConnection();
        //console.log('req',req);
        queryStatement1="insert into users(first_name, last_name, email, is_archived, created, updated)  values('"+req.body.first_name+"', '"+req.body.last_name+"', '"+req.body.email+"',0,now(),now())";
     // queryStatement1="insert into users(first_name, last_name, email, is_archived, created, updated)  values('ayush','ranka','abhklkl@gmail.com',0,now(),now())"; 
        connection.query(queryStatement1,function (err,result1){
            if (!err) {
                callback(null,result1);
            } else {
                callback(err);
            }
           // console.log("query");

            // if(err)
            // {
            //     console.log(err);
            //     res.status(400).send(err);
            // }
            // else{
            //     console.log(result1);
            //    if(result1.affectedRows===1){
            //     console.log("cteated");
            //     res.status(200).send("result");
            //    }

            //     console.log("users created");
            //   //  res.status(201).send("user created");
            //     }
          //  callback(null,result1)
            
                
            // }
        // callback(null,'one');
        // console.log(err);
        //     console.log();
         });
        

       
        },
        
            function task2(result1,callback){
                
                if(result1.affectedRows===1)
                {
                    console.log("users is created");
                  //  res.status(201).send("users is created");

                }
                
                console.log("task2");
               // connection = db.getDbConnection();
                queryStatement2="select user_id from users where email = '"+req.body.email+"'";
                connection.query(queryStatement2,function(err,result2){
                    if (!err) {
                        callback(null,result2);
                    } else {
                        callback(err);
                    }
                   // var id= result2;
                    //console.log(id);
                    // if(err)
                    // {
                    //     console.log(err);
                    //     res.status(400).send(err);
                    // }
                    // else{
                        // if(result2.length >1){
                        //     console.log("user_id found",result2);
                        //     res.status(200).send("user_id found",result2);
                        //     }
                    //         else{
                    //             console.log("user_id is notfound");
                    //             res.status(204).send("user_id is not found");
                    //         }
                    // }
                    //callback(null,result2);
                    // console.log(err);
                   // callback(null,result2)
                 });
                
               },
                
            
        function task3(result2,callback){
           
            if(result2.length>0)
            {
            //     console.log(result2);
            //    var id =result2;
            //    console.log(id);


                //res.status(200).send(id);
            }  
            
            console.log("task3");
            console.log(result2);
          // var result2arr = result2;
          var result2=result2[0].user_id
          console.log("user_id is "+result2);
        
         // console.log(Object.values(object1));
         //  var result2=  JSON.parse(JSON.stringify(result2))
            // console.log(result2);
           // connection = db.getDbConnection();
            queryStatement3="insert into addresses(address_line_1, address_line_2, city, state, user_id, is_archived, created, updated) values('"+req.body.address_line_1+"', '"+req.body.address_line_2+"', '"+req.body.city+"', '"+req.body.state+"',"+result2+",0,now(),now())";
            //queryStatement3="insert into addresses(address_line_1, address_line_2, city, state, users_id, is_archived, created, updated) values('abc', 'def', 'indore','mp' ,59,0,now(),now())";
            connection.query(queryStatement3,function(err,result3){
                //console.log("entering in q3");
                if (!err) {
                    callback(null,result3);
                } else {
                    callback(err);
                }
                
                // if(err)
                // {
                //     console.log(err);
                //     res.status(400).send(err);
                // }
                // else{
                //     if(result3.affectedRows===1){
                //         console.log("addresses created");
                //         res.status(201).send("addresses created");
                //         }
                // }
             //   callback(null,result3);
            //console.log(result3);
             });
            },

            function task4(result3,callback){
               // console.log(result3);
                if(result3.affectedRows===1)
                {
                    console.log("users address created");
                   res.status(201).send("user deatails submited successfully");
                }
                    callback(null)
                }
            
            ],
            
       
     
      function (err) {
        if(err)
        {
            console.log(err);
            res.status(400).send(err);
        }else {
          console.log('No error happened in any tasks, all tasks done!');  
         
      }
      

    });
}



exports.details = function(req,res) {

  connection = db.getDbConnection();

  async.parallel([
    function task1(callback){
     console.log("task1");
    // connection = db.getDbConnection();
     queryStatement1="select user_id, first_name, last_name, email from users where is_archived=0 ";
     connection.query(queryStatement1,function(err,result1){
        if (!err) {
            callback(null,result1);
        } else {
            callback(err);
        }
        // if(err)
        // {
        //     console.log(err);
        //     res.status(400).send(err);
        // }
        // else{
        //     if(result1.length>0){
        //     console.log("get allusers ",result1);
        //   //res.status(200).send("result1",result1);
        // //  res.status(200).send(result1)
        //     }
        //     else{
        //      //   console.log("no user is found");
        //        // res.status(204).send("no user found");
        //     }
            
        // }
        
       // callback(null,result1);
     });
   // callback(null,'result1');

    },
    function task2(callback){
        console.log("task2");
       // connection = db.getDbConnection();
        queryStatement2="select id, first_name, last_name, email, password from admins where is_archived=0";
      //  console.log("enter in query 2");
        connection.query(queryStatement2,function(err,result2){
            if (!err) {
                callback(null,result2);
            } else {
                callback(err);
            }
            
           // console.log("enter in function");
        //    if(err)
        //    {
        //        console.log(err);
        //        res.status(400).send(err);
        //    }
        //    else{
        //        if(result2.length>0){
        //       // console.log("get alladmins ",result2);
        //       // res.status(200).send(result2);
        //        }
        //        else{
        //       //  console.log("no admin is found");
        //         //res.status(204).send("no admin found");
        //     }
               
        //    }
      //  callback(null,result2);
        });
       //callback(null,'result2');
   
       }
],
function (err,result) {
    if (err) {
    //  throw new Error(err);
      console.log(err);
      res.status(400).send(err);
    } else {
      console.log('No error happened in any tasks, all tasks done!');  
     console.log(JSON.stringify(result));
     res.status(200).send(result);
     
    }
  

});
}




// async.parallel([
//     function(callback) {
//         setTimeout(function() {
//             callback(null, 'one');
//         }, 200);
//     },
//     function(callback) {
//         setTimeout(function() {
//             callback(null, 'two');
//         }, 100);
//     }
// ],
// // optional callback
// function(err, results) {
//     // the results array will equal ['one','two'] even though
//     // the second function had a shorter timeout.
// });



