
const app = require('./app/app');
const  {
    checkDB
} = require('./app/database-operation1');
const port = process.env.port || 3000;
const host = "localhost";


app.listen(port, host, () => {
    console.log(`server is listening to the ${host} at the port ${port}`);
    checkDB();
});


