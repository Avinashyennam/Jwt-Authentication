// const collection = require("../db");
const {User, Transaction} = require("../db");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "qwertyuioplkjhg";

const signup = async (req, res) => {
    const { name, password } = req.body;
    const checkEmail = await User.findOne({
        $and: [
            // { name: name },
            {username: name},
            { password: password }
        ]
    });
    console.log(checkEmail);
    // if (checkEmail.length != 0) {
    //     return res.status(404).send("User already exists");
    // }
    if(checkEmail != null)
    {
        return res.status(404).send("User already exists");
    }
    const newDoc = {
        username: name,
        password: password
    };
    // const result = await collection.insertMany(newDoc);
    const result = await User.insertMany(newDoc);
    const token = jwt.sign(newDoc, SECRET_KEY);
    return res.status(201).send({
        user: result,
        token: token
    });

}

const login = async (req, res) => {
    const { name, password } = req.body;
    const checkEmail = await collection.findOne({
        $and: [
            { name: name },
            { password: password }
        ]
    });
    if (!checkEmail) {
        return res.status(404).json({ mesage: "user not found" });
    }
    const token = jwt.sign({
        name: checkEmail.name,
        id: checkEmail._id
    }, SECRET_KEY);
    res.status(201).json({ user: checkEmail, token: token });
}

const data = async (req,res)=>{
    const username = req.params.username;
    console.log(username);
    const resp = await Transaction.find({user_id: username});
    // const resp = await collection.find();
    res.send(resp)
}
module.exports = { login, signup, data };














// if (checkEmail && checkEmail.password === password) {
//     // console.log("registered user",checkEmail.name,"with password",checkEmail.password);
//     // const token = jwt.sign({
//     //     name: checkEmail.name,
//     //     id: checkEmail._id
//     // }, SECRET_KEY);
//     // res.status(201).json({ user: checkEmail, token: token });
// }
// else {
//     res.send("User not found");
//     console.log("failed to fetch user :(");
// }