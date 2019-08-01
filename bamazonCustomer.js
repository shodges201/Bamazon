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

displayItems();


function displayItems(){
    var id;
    var quantity;
    connection.query(`SELECT * FROM bamazon.products`, function(err, results){
        console.table(results);
        inquirer.prompt([
            {
                name: "id",
                type: "input",
                message: "What item id would you like to purchase?('exit' to leave)"
            },
            {
                name: "quantity",
                type: "input",
                message: "How much would you like to purchase?"
            }
        ]).then(function(data){
            id = data.id;
            if(id === 'exit'){
                connection.end();
                return;
            }
            quantity = data.quantity;
        
            connection.query(`SELECT * FROM bamazon.products WHERE item_id = ${parseInt(id)}`, function(err, response){
                let amount = response[0].stock_quantity;
                let price = response[0].price;
                if(quantity > amount){
                    console.log("Insufficient Quantity");
                    displayItems();
                }
                else{
                    connection.query(`UPDATE products SET stock_quantity = ${parseInt(amount) - parseInt(quantity)} WHERE item_id = ${id}`, function(err, response){
                        console.log(`You spent $${price * quantity} on this purchase`);
                        connection.query(`UPDATE products SET product_sales = ${price * quantity} WHERE item_id = ${id}`, function(err, response){
                            displayItems();
                        })
                    })
                }
            });
        });
    });
}