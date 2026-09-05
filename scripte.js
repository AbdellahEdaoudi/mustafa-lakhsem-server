require("dotenv").config();
const { connectDB } = require("./config/dbConnect");
const User = require("./models/user.model");
const bcrypt = require("bcryptjs");

// get users
connectDB();

async function createuser() {
    // const salt = await bcrypt.genSalt(10);
    // const email = "[EMAIL_ADDRESS]"
    // const password = "[PASSWORD]"
    // const createuser = new User({
    //     name: "Mustafa Lakhsem",
    //     email: email,
    //     password: bcrypt.hashSync(password, salt),
    // });
    // await createuser.save();
    // console.log(createuser);
    // get user
    const users = await User.find();
    console.log(users);
}

createuser();