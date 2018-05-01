const mysql = require("mysql");
const inquirer = require("inquirer");

//cart is an empty array that keeps a record
let cart = [];
//update updates the database
let update = [];
//create variable to show customer total cost of the purchase
let total = 0;


//connection is a variable that represents mysql formula to create a connection
//connecting to localhost and this port
//localhost a unique universal ip address
const connection = mysql.createConnection({
	host: "localhost",
	port: "8889",

	user: "root",
	password: "root",
	database: "Bamazon_DB"

});
//using a formula from mysql library that connects me to the database (mysql.connect)
//.connect a function of mysql
//function(err) is a callback function that throws an error if error
connection.connect(function(err){
	//if error, throw error
	if (err) throw err;
	//confirm that you are connected - one way to confirm that you connected is output connection.threadId
	//.threadId is variable from mysql connect function; 
	console.log("connected as id: " + connection.threadId);
	//do what you want once connected;
	ProductsForSale();
});
//list items for sale
function ProductsForSale() {
	//define variable, throw variable to connection
	//connection.query() is a function from mysql.connect
	//.query takes (string variable, function which handle err or response)
	let query = "SELECT * FROM products"; 
	//standard mysql lingo to connect my database
		connection.query(query, function(err, res){
			//presenting a table from the database
				console.log("Item Id 		Product Name 		Product Kind 		Price 		Quantity");
			//res is an database response to your query
			//creating a for loop to render the database
			//response is everything from product
			for (var i = 0; i < res.length; i++) {
				console.log(`${res[i].item_id} 			${res[i].product_name} 		${res[i].product_kind} 		${res[i].price} 		${res[i].stock_quantity}`);
			}
			// `${}` allows to skip concatenation 	
		})
	// delay in calling the purchase function so it isnt thrown onto the table
	//setTimeout(function(){_____()}, 1000 = 1 second);
	setTimeout(function(){purchase()}, 1000);
};

function purchase() {
	//space two lines
	console.log("\r\n");
	//call .prompt on inquirer to ask questions
	inquirer
			.prompt([
				{
					name: "item_id",
					type: "input",
					message: "Which item would you like to purchase (type ID)?",
				},
				{
					name: "quantity",
					type: "input",
					message: "How many would you like to purchase?",
				}
				])
			// answer is a inquirer requirement - client input
			//.then is a promise if promt is answered
			.then(function(answer) {
				
				//once you have the answer, deduct appropriate amount from table
				//when you are talking to the mysql database, the only variable it can take is a question mark
				let queryTwo = "SELECT * FROM products WHERE item_id = ?";
				//standard mysql lingo to connect to the database
				//? = answer;
				// here we are interested in answer.item_id
				connection.query(queryTwo, answer.item_id, function(err, res){
					//if your response has data, do the following:
					if (res.length > 0)
						//if quatity requested is greater than available, do the following:
						if (answer.quantity > res[0].stock_quantity) {
							console.log("\r\n");
							console.log("Sorry, quantity not available! Please try again: ");
							purchase();
						}
						else {
							//push response and quantity to an array cart
								cart.push(res, parseInt(answer.quatity));
								console.log(cart);
							//push response and answer to database
							//res[0] => first item in the response array
								update.push(res[0].item_id, (parseInt(res[0].stock_quantity) - parseInt(answer.quantity)));
								console.log("\r\n");
								console.log("Item Id 		Product Name 		Product Kind 		Price 		Quantity");
								for (var i = 0; i < cart.length; i+=2) {
									console.log(`${cart[i][0].item_id} 		${cart[i][0].product_name} 		${cart[i][0].product_kind} 		${parseInt(cart[i][0].price)} 		${parseInt(cart[i+1])}`);
									total += (cart[i][0].price * cart[i+1]);
								}
								console.log(`																		TOTAL: ${total}`);
								console.log(cart);
								checkOut();
							}
							else {

								console.log('\r\n');
								console.log("Sorry, this item is not in inventory. Please try again: ");
								purchase();
									}
				})
			})
}

function checkOut() {
	console.log("\r\n");

	inquirer
	.prompt([
		{
			name: "next",
			type: "list",
			message: " ",
			choices: ["Continue Shopping, Checkout, Exit"],
		}
	])
	.then(function(answer) {
		let run = 1;
		switch (answer.next) {
			case "Continue to purchasing":

			break;

			case "Checkout":
				for (var i = 0; i < update.length; i+=2) {
					queryThree = "UPDATE products SET stock_quantity = ?";
					connection.query(queryThree, [update[i+1], update[i]], function(err, results){})
				}
				console.log("\r\n");
				console.log("Your payment has been processed.");
				console.log("\r\n");
				run = 0;
			break;

			case "Exit":
				run = 0;
			break;
		}
		if (run === 1) {purchase()};
	})
	
}

