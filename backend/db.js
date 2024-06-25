const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGOURL)
.then(()=>{
    console.log("connected");
})
.catch((e)=>{
    console.log("Failed to connect ", e);
});

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});
const User = mongoose.model('users', userSchema);

const transactionSchema = new mongoose.Schema({
    user_id:{
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        ref: 'User',
        required: true
    },
    amount: Number,
    description: String
});
const Transaction = mongoose.model('transactions', transactionSchema);


module.exports = {User, Transaction};
