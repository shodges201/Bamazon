const inquirer = require("inquirer");
const mysql = require("mysql");
const lodash = require("lodash");

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

function start(){
    let options = ['View products sales by department', 'Create new department', 'exit'];
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
                case options[0]:
                    viewSales();
                    break;
                case options[1]:
                    createDepartment();
                    break;
                case options[2]:
                    quit();
                    break;
            }
        })
}

function viewSales(){
    let deptTable;
    connection.query(`SELECT * FROM bamazon.departments`, function(err, resp){
        deptTable = resp;
        console.table(deptTable);
        connection.query(`SELECT bamazon.products.department_name, sum(bamazon.products.product_sales)
        FROM bamazon.products
        INNER JOIN bamazon.departments ON bamazon.products.department_name=bamazon.departments.department_name
        GROUP BY bamazon.products.department_name`, function(err, response){
            let list = [];
            deptTable.forEach(function(item){
                let name = item.department_name;
                let match = false;
                response.forEach(function(element){
                    if(!match && element === response[response.length-1]){
                        let obj = {
                            'department_id': item.department_id,
                            'department_name': item.department_name,
                            'over_head_costs': item.over_head_costs,
                            'product_sales' : 0,
                            'total_profit' : (-1 * item.over_head_costs)
                        }
                        match = true;
                        list.push(obj);
                    }
                    //same department
                    else if(element.department_name === item.department_name){
                        let profit = parseFloat(element['sum(bamazon.products.product_sales)']) - parseFloat(item.over_head_costs);
                        let obj = {
                            'department_id': item.department_id,
                            'department_name': name,
                            'over_head_costs': item.over_head_costs,
                            'product_sales' : element['sum(bamazon.products.product_sales)'],
                            'total_profit' : profit
                        }
                        match = true;
                        list.push(obj);
                    }
                })

            });
            console.table(list);
            start();
        })
    })
}

function createDepartment(){
    inquirer.prompt([
        {
            name: "deptName",
            type: "input",
            message: "What department would you like to create"
        },
        {
            name: "overhead",
            type: "input",
            message: "What's the expected overhead cost of this department"
        }
    ]).then(function(resp, err){
        if(err){
            return;
        }
        else{
            connection.query(`INSERT INTO bamazon.departments(department_name, over_head_costs) VALUES ('${resp.deptName}', ${resp.overhead})`, function(err, resp){
                start();
            })
        }
    })
}

function quit(){
    connection.end();
    return;
}