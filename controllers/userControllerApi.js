let User = require('../models/userModel');
let connection = require('../db');
let userList = [];

// List of users
exports.userList = function (request, response) {    
    connection.query("Select * from user", function (error, resultSQL) {
        if (error)  {
            response.status(400).json({'message': error});        
        }
        else {
            response.status(200);
            userList =  resultSQL;
            console.log( userList);
            response.json({users:userList});
        }
    });
}

// Add  user in the list
exports.userNew =  function(request, response) {
    let lastname =  request.body.lastname;
    let firstname = request.body.firstname;

    let user = new User(lastname,firstname);
    console.log(user);
    connection.query("INSERT INTO user set ?", user, function (error, resultSQL) {
        if(error) {
            response.status(400).json({'message': error});   
        }
        else{
            response.status(201).json({'message': 'success'}); 
        }
    });
}

// Update one user in the list
exports.userUpdate =  function(request, response) {
    let iduser = request.params.iduser;
    let lastname =  request.body.lastname;
    let firstname = request.body.firstname;

    let user = new User(lastname,firstname);
    console.log(user);
    connection.query("UPDATE user SET ? WHERE iduser = ?", [user, iduser], function (error, resultSQL) {
        if(error) {
            response.status(400).json({'message': error});  
        } else if (resultSQL.affectedRows != 1) {
            console.log(resultSQL.affectedRows);
            response.status(400).json({'message': "Erreur SQL "});  
        }
        else{
            response.status(202).json({'message': 'success'}); 
        }
    });

    //console.log(userList);
}

exports.userRemove = function (request, response) {
    let sql = "DELETE FROM `user` WHERE `user`.`iduser` = ?";
    connection.query( sql , [request.params.iduser], (error, resultSQL) => {
        if(error) {
            response.status(400).json({'message': error});  
        } else if (resultSQL.affectedRows != 1) {
            console.log(resultSQL.affectedRows);
            response.status(400).json({'message': "Erreur SQL "});  
        }
        else {
            response.json({'message': 'success'}); 
        }
    }); 
    
 };