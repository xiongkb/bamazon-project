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
        console.log("-------- Welcome to Bamazon! --------\nHere is a list of items that's available for purchase:\n");
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(JSON.parse(JSON.stringify(res[i])));
        }
        console.log("-------------------------\n")
        question();
    }); 
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
};

function shop() {
    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "What product would you like to buy? Enter the item_id: ",
            validate: function(value) {
                if (isNaN(value) ===false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "unit",
            type: "input",
            message: "How many units would you like to buy?",
            validate: function(value) {
                if (isNaN(value) ===false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function(answer) {
        console.log("You are buying # " + answer.item);
        var query = "SELECT * FROM products WHERE item_id = ?";
        connection.query(query, [answer.item], function(err, res) {
            if (err) throw err;
            if (res[0].stock_qty > 0) {
                updateDB(answer.item, answer.unit);
            } else {
                console.log("There are not enough items in stock!\nPlease change your QTY or select new product!")
                shop();
            };
        });
    });
};

function updateDB(item, unit) {
    console.log("==========You reached updateDB!==========")
    var query = "UPDATE products SET stock_qty = (stock_qty - ?) WHERE item_id = ?";
    var data = [unit, item];
    connection.query(query, data, function(err, res) {
        if (err) throw err;
        purchase(item);
    });
};

function purchase(itemID) {
    var query = "SELECT * FROM products WHERE item_id = ?";
    var entry = itemID;
    connection.query(query, entry, function(err, res) {
        console.log(res);
    })
    connection.end();
}