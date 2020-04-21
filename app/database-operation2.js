//database

const lowdb = require('lowdb');
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("database.json");
const database = lowdb(adapter);

            
//======================== NEW PRODUCT which post it on /api/products/add
  
      const newProduct = async(id, name, price, image) => {
       const data = await database
       .get('products')
        .push({ id, name, price, image})
        .write();
        return data;
       };

//==============================================================ADD TO CART

      const addToCart= async id => {
      const checkCart = await database
      .get('cart')
      .find({ id })
      .value();
      if (!checkCart) {
        let message = "";
        return message;

      } else {
           await database
          .get('products')
          .find({ id })
          .value();
      
        if (data) {
          data = await database
            .get('cart')
            .push(data)
            .write();
          return data;
        } else {
        response = false;
      
      return response;
    }
}
};


  //================================================================ CLEAR CART

 
  const removeFromCart = async name => {
    const checkCart = await database
      .get("cart")
      .find({ name })
      .value();
    if (checkCart) {
      let response = await database
        .get("cart")
        .remove({ name })
        .write();
      return response;
    } else {
      response = "";
      return response;
    }
  };


       exports.newProduct = newProduct;
       exports.addToCart = addToCart;
       exports.removeFromCart = removeFromCart;
      
