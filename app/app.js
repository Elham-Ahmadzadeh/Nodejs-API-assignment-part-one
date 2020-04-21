/* 

GET => Kunna lägga till produkter i en varukorg.

POST => Hämta varukorgen med alla tillagda produkter.

DELETE => Kunna ta bort produkter i varukorgen.

 */

//===============================================================================

// VARIABLES WITH CONST

const {
    addToCart,
    newProduct,
    removeFromCart,
    
} = require('./database-operation2'),

lowdb = require('lowdb'),

FileSync = require("lowdb/adapters/FileSync"),

adapter = new FileSync("database.json"),

database = lowdb(adapter),

express = require('express'),

app = express();


//==================================================================================

//console.log(products);

//ROOT ENDPOINT
app.get('/', (req, res) => {
res.send('Welcome here!')
})

//===================================================================================

// HÄMTA PRODUKTER MED GET

app.get('/api/products', async(req, res) => {

 //get poducts from database

   const selectedProduct = products.filter(item => item.id > 0)

  //console.log(productInCart);

  res.send(selectedProduct); 

 });
  



 //KUNNA LÄGGA TILL PRODUKTER MED POST

app.post('/api/products', async(req, res) => {

    let message = {
        success: true,
        message: " new product added"
    }; 
 const { id, name, price, image } = req.query;

 const data = await newProduct(id, name, price, image );

 message.data= data[res.length - 1]; 

 return res.send(message);
 
 })



//================================================================

// HÄMTA CART MED GET

app.get('/api/cart', async(req, res) => {

   // get cart from database

   res.json(database.get('cart').value());

   return res;
})


//KUNNA LÄGGA TILL PRODUKTER MED POST

app.post('/api/cart', async(req, res) => {

    const { name } = req.query;

    const data = await addToCart(name)

    let message = {
        success: true,
        message: 'Product is already in your cart'
    };

    if (typeof data == 'string' || data instanceof String) {
        message = {
            success: false,
            message: 'Product not found'
        };
    } else {
        message = {
            success: true,
            message: 'Product removed form the cart'
        };
    }
    message.data = data[res.length - 1];

    return res.send(message);
});


//===========================================================================

// DELETE FROM THE CART
 
 app.delete("/api/cart/products", async (request, response) => {

    const { name } = request.query;

    const data = await removeFromCart(name);

    if (typeof data == "string" || data instanceof String) {
      message = {
        success: false,
        message: "Prduct not found"
      };
    } else {
      message = {
        success: true,
        message: "Product removed"
      };
    }
    message.data = data[response.lenght - 1];
    return response.send(message);
  });
 

//exporting app so i can run  server.js

module.exports = app;







 