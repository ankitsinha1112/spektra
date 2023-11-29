const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;
// mongoose.set('strictQuery', false);
// const mongoURI = 'mongodb://localhost:27017/tatoo'; 
const mongoURI = 'mongodb+srv://root:ankit@cluster0.3hrun.mongodb.net/tatoo'; 

const connectDatabase = () => {
    // mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    //     .then(() => {
    //         console.log("Mongoose Connected");
    //     });
        mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
          .then(() => {
            console.log('Connected to MongoDB');
            // Your server setup and other code here
          })
          .catch((error) => {
            console.error('Error connecting to MongoDB:', error.message);
          });
}


module.exports = connectDatabase;