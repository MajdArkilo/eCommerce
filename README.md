# eCommerce
This is a static eCommerce website using Node.js for server, AngularJS for frontend, SQLite for database and Google Maps API (No CSS added yet).  Environment: to be deploy on AWS EC2 instance

## Services built in Node.js:

### List: 
This service receives the parameter “id”, an integer, and returns the id’s and names of all products in the Product table of the  Models_R_US.db whose category ID “catID” is equal to the passed parameter. 

The return format is “application/json” and should be an array of JSON objects with keys: “id” and “name”.
 
### Productname: 
This service receives the parameter “id”, an integer. 

Returns only the product name only.

The return format is "text/plain"

### Product: 
This service receives the parameter “id”, an integer. 

Returns the entire product info.

The return format is application/json

### Catalog: 
This service receives URL with  one parameter “id” containing an integer and returns the id and name of row corresponding to that id in the Category table of the Models_R_US.db. 

Response’s content type is “Application/JSON”. 

If the id parameter is missing then the return should be an array of json objects for all rows in the table.

### Cart: 
This service receives the parameter “item”, a JSON object containing the “id”, “price” and “qty” of a product.

Returns the updated cart as an array of JSON object. If the parameter is missing, the current cart is returned.

### Trip: 
This service receives URL with two parameters “from” and “to” containing the start and the end of the trip. 

It returns the optimal distance and time (in km and minutes) between them given the current traffic condition. 

The parameters expected to be passed to Google Maps API is: “from” address, “to” address, API key, Departure time.

## Frontend pages implemented using AngularJS

### Catalog: 
Upon visiting the page, the user is presented with all the product categories. All listing are clickable and will redirect the user to the corresponding category page.

### Category: 
All products belonging to the selected category are displayed. All listing are clickable and will redirect you to the corresponding product page.

### Product: 
All details of the selected product are displayed. The user can click a product to add it to the cart.

### Cart: 
If a product was added, the cart is displayed. The user can change the quantity of the product.

### Shipto: 
A page where user can fill in their address.

### Checkout: 
- Shows the shipping address.
- Each product info, price and quantity.
- The total price

This page have two buttons which give the user the option to either “Continue Shopping” ,which will take the use to catalog page, and “Checkout”
