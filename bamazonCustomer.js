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
    console.log("=====================\n")
    console.log("Thank you for shopping with Bamazon!\nCome again next time!");
    console.log("=====================\n")
    connection.end();
};
// shopping for items available
function shop() {
    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "What product would you like to order? Enter the item_id: ",
            validate: function(value) {
                if (isNaN(value) === false && (value <= 10)) {
                    return true;
                }
                console.log("\nThat item does not exist, try again.");
                return false;
            }
        },
        {
            name: "unit",
            type: "input",
            message: "How many units would you like to buy?",
            validate: function(value) {
                if (isNaN(value) === false) {
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
            var qty = parseInt(res[0].stock_qty) - parseInt(answer.unit);
            if (qty >= 0) {
                updateDB(answer.item, answer.unit);
            } else {
                console.log("=====================\n")
                console.log("There are not enough items in stock!\nPlease change your QTY or select new product!")
                console.log("=====================\n")
                shop();
            };
        });
    });
};
// updating info to databse
function updateDB(item, unit) {
    var query = "UPDATE products SET stock_qty = (stock_qty - ?) WHERE item_id = ?";
    var data = [unit, item];
    connection.query(query, data, function(err, res) {
        if (err) throw err;
        purchase(item, unit);
    });
};
// purchasing the item showing total price
function purchase(itemID, units) {
    var query = "SELECT * FROM products WHERE item_id = ?";
    var entry = itemID;
    connection.query(query, entry, function(err, res) {
        if (err) throw err;
        var total = units * res[0].price;
        console.log("=====================\n")
        console.log("You are buying the following item: " + res[0].product_name + 
        "\nEach one costs $" + res[0].price +
        "\nYour total is $" + total.toFixed(2) + ".");
        console.log("=====================\n")
        question();
    })
}