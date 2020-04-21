
//database
const lowdb = require('lowdb');
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("database.json");
const database = lowdb(adapter);


//setting up the database
exports.checkDB = () => {
    const dbInitiated = database.has("products").value();
    const hasCart = database.has("cart").value();

    if (!dbInitiated) {

       database.defaults({ products: [], cart: [] }).write();

    }

    if (!hasCart) {
        database.defaults({ products: [], cart: []}).write();
    }
    };


    //=====================================================================


  
 exports.checkDB = this.checkDB;

   

 
    
    
    
    






