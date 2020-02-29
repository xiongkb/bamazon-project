var mysql = require("mysql");
var inquirer = require("inquirer");

// connecting to mysql
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazonDB"
});

connection.connect(function(err) {
    if (err) throw err;
    showDB();
});

function showDB() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
    question();
};

function question() {
    inquirer.prompt(
        {
            name: "todo",
            type: "list",
            message: "What would you like to do",
            choices: [
                "Buy a product",
                "Nothing"
            ]


        }
    )
}