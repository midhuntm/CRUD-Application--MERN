const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./routes/routes');
const app = express();
const PORT = 5007;
const db = 'mongodb+srv://MIDHUN:Midhun8940@student.8dkr6fs.mongodb.net/crudapplication?retryWrites=true&w=majority';

mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => console.log('DB is Connected')).catch((error) => console.log(error.message));
app.use(cors());
app.use(express.json());
app.use(router);
app.listen(PORT,() => {
    console.log(`Server is Running ${PORT}`);
})

