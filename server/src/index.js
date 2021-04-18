const express = require('express');
const env = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
// routes

const userRoutes = require('./routes/user');

// Environtment variable or you can say constants
env.config();

// monggodb Connection
//mongodb+srv://root:<password>@cluster0.5wa7q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

// Connection Mongo DB
const uri = `mongodb://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0-shard-00-00.5wa7q.mongodb.net:27017,cluster0-shard-00-01.5wa7q.mongodb.net:27017,cluster0-shard-00-02.5wa7q.mongodb.net:27017/${process.env.MONGO_DB_DATABASE}?ssl=true&replicaSet=atlas-12xi9b-shard-0&authSource=admin&retryWrites=true&w=majority`;

try {
  // Connect to the MongoDB cluster
  mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    () => console.log(' Mongoose is connected')
  );
} catch (e) {
  console.log('could not connect');
}

app.use(bodyParser.json());

app.use('/api', userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is Runing on port ${process.env.PORT}`);
});
