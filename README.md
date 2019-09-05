# Bamazon

## Instructions
In order to use the program: clone the repo, and inside of the cloned repo run ```npm i``` in the terminal to install the required node modules. Then using mysql workbench, or mysql CLI run the schema.sql file to create the tables needed for the project, as well as to insert some initial entries. Then by running the command ```node.js bamazonCustomer.js``` , ```node.js bamazonSupervisor.js``` , or ```node.js bamazonManager.js``` the three different CLI's can be used to add, remove, and edit items in the database, and interact with the mini economy which has been created in the database.

## Summary

Node.js and MySQL project used simulate the role of a 'Bamazon' customer, manager and supervisor including adding items to the marketplace, buying items from the market place, restocking items, and adding new departments. The node inquirer package is used to create a more user friendly command line experience, and to limit responses to what is included in the database currently.
