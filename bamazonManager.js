const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host     : 'localhost',
    port     : '3306',
    user     : 'root',
    password : '',
    database : 'bamazon'
  });

connection.connect(function(err){
    if(err){
        throw err;
    }
});

start();

function showProducts(){
    connection.query(`SELECT * FROM bamazon.products`, function(err, results){
        if (err) throw err;
        console.table(results);
        start();
    });
}
function start(){
    let options = ['View products for sale', 'View low inventory', 'Add to inventory', 'Add new products', 'exit'];
    inquirer.prompt([
        {
            name: "option",
            type: "list",
            message: "What would you like to do?",
            choices: options
        }
        ])
        .then(function(response, err){
            switch(response.option){
                case 'View products for sale':
                    showProducts();
                    break;
                case 'View low inventory':
                    lowInventory();
                    break;
                case 'Add to inventory':
                    addInventory();
                    break;
                case 'Add new products':
                    addProduct();
                    break;
                case 'exit':
                    quit();
                    break;
            }
        })
}

function addProduct(){
    inquirer.prompt([
        {
            name: "itemName",
            type: "input",
            message: "What item would you like to add ?"
        },
        {
            name: "itemQuantity",
            type: "input",
            message: "How much would you like to add?"
        },
        {
            name: "deptName",
            type: "input",
            message: "What department would you like to add it to?"
        },
        {
            name: "itemPrice",
            type: "input",
            message: "How much shoud it be listed for?"
        }
    ]).then(function(data){
        connection.query(`INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES('${data.itemName}', '${data.deptName}', ${data.itemPrice}, ${data.itemQuantity})`, function(resp, err){
            start();
        })
    })
}

function addInventory(){
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "What item id would you like to add to?"
        },
        {
            name: "quantity",
            type: "input",
            message: "How much would you like to add?"
        }
    ]).then(function(data){
        id = data.id;
        quantity = data.quantity;
        connection.query(`SELECT * FROM bamazon.products WHERE item_id = ${id}`, function(err, response){
            let amount = response[0].stock_quantity;
            connection.query(`UPDATE products SET stock_quantity = ${parseInt(amount) + parseInt(quantity)} WHERE item_id = ${id}`, function(err, response){
                start();
            })
    })
    })
}

function lowInventory(){
    connection.query(`SELECT * FROM bamazon.products WHERE stock_quantity <= 5`, function(err, results){
        if (err) throw err;
        console.table(results);
        start();
    });
}


function quit(){
    connection.end();
    return;
}


