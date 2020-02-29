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
    connection.query("SELECT item_id, product_name, price FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(JSON.parse(JSON.stringify(res[i])));
        }
    });
    question();
};

function question() {
    inquirer.prompt(
        {
            name: "todo",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Buy a product",
                "Nothing"
            ]
        }
    ).then(function(answer) {
        switch (answer.todo) {
            case "Buy a product":
                shop();
                break;
            case "Nothing":
                close();
                break;
        }
    });
};

function close() {
    console.log("Thank you for shopping with Bamazon!\nCome again next time!");
    connection.end();
}

function shop() {
    inquirer.prompt(
        {
            name: "buy",
            type: "input",
            message: "What product would you like to buy?"
        },
        {
            name: "item",
            type: "input",
            message: "How many units would you like to buy?"
        }
    ).then(function(answer) {
        console.log(answer.buy);
        console.log(answer.item);
    });
};