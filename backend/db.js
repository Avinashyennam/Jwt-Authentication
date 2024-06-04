const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1/loginProject")
mongoose.connect("mongodb://127.0.0.1/multi")
.then(()=>{
    console.log("connected");
})
.catch((e)=>{
    console.log("Failed to connect ", e);
});

// const userSchema = new mongoose.Schema({
//     name:{
//         type: String,
//         required: true,
//     },
//     password:{
//         type: String,
//         required: true,
//     }
// });
                // changed to
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password: {
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

// const collection = new mongoose.model("collection1",userSchema);
// module.exports = collection;

module.exports = {User, Transaction};
