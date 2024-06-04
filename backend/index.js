const express = require("express");
const app = express();
const cors = require("cors");
const {User, Transaction} = require("./db");
const jwt = require("jsonwebtoken");
app.use(express.json());
const SECRET_KEY = "qwertyuioplkjhg";
const corsOption = {
    origin: "http://localhost:3000",
    methods:"GET, PUT, POST, DELETE",
    credential : true
}
const {login, signup, data} = require("./controllers/authentication");
app.use(cors(corsOption));
app.get("/", (req, res) => {
    res.send("Hii");
})

// app.post("/login",login);

app.post("/signup", signup);

// app.get("/data", data);
app.get("/:username/data", data);
app.listen(5000, () => {
    console.log("Port running on the port 5000");
});

app.post("/login", async (req, res) => {
    const { name, password } = req.body;
    console.log("data from frontend is ",req.body);
    console.log("name from frontend is ",req.body.name);
    console.log("password from frontend is ",req.body.password);
    const checkEmail = await User.findOne({
        $and: [
            { username: name },
            { password: password }
        ]
    });
    console.log("checkEmail is ", checkEmail);
    if (!checkEmail) {
        // return res.status(404).json({mesage:"user not found"});
        console.log("user not found");
    }
    if (checkEmail && checkEmail.password === password) {
        // console.log("registered user",checkEmail.name,"with password",checkEmail.password);
        console.log("registered user",checkEmail.username,"with password",checkEmail.password);
        const token = jwt.sign({
            // name: checkEmail.name,
            name: checkEmail.username,
            id: checkEmail._id
        }, SECRET_KEY);
        res.json({ user: checkEmail, token: token });
        //res.json(token);
    }
    else {
        //res.send("User not found");
        res.json({message: "user not found"});
        console.log("failed to fetch user :(");
    }
});