var express = require('express');
var mysql = require('mysql');
var app = express();

var connection = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'mamp',
    password: '',
    database: 'comp440'
});

///*** NOT NEEDED WHEN DOING CONNECTION POOL ***///
// connection.connect((err) => {
//     if(err){
//         console.log('Error')
//     } else {
//         console.log('Connected');
//     }
// });

app.get('/:table', (req, res) => {
    // mysql stuff
    let tableName = req.params.table;
    connection.getConnection((err, tempConn) => {
        if(err) {
            tempConn.release();
            console.log("error connecting");
        } else {
            console.log(req.params.table, "**")
            tempConn.query("SELECT * FROM " + tableName + "", (err, rows, field) => {
                tempConn.release();
                if(err) {console.log("Error executing query")}
                else {
                    console.log("successful query\n");
                    //console.log("posted by: ",rows);
                    //console.log(field[0]);
                    res.status(200).json(rows);
                    console.log("posted");
                }
            });
        }
    });
});

app.listen(1337);
