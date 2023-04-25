const mongoose = require("mongoose");

const DB_URL = "mongodb://localhost:27017/out-circle";

// create Admin User Schema For Admin User Model

const admin_user_schema = mongoose.Schema({
    email: String,
    password: String,
    account_type: {
        default: "admin",
        type: String
    },
});

// create Admin User Model In Database

const admin_user_model = mongoose.model("admin", admin_user_schema);

// require bcryptjs module for password encrypting

const bcrypt = require("bcryptjs");

let userInfo = {
    email: "outcircle2023@gmail.com",
    password: "O@c@0944807936",
};

async function create_admin_user_account() {
    try {
        await mongoose.connect(DB_URL);
        let user = await admin_user_model.findOne({ email: userInfo.email });
        if (user) {
            await mongoose.disconnect();
            return "Sorry, Can't Insert Admin Data To Database Because it is Exist !!!";
        } else {
            let password = userInfo.password;
            let encrypted_password = await bcrypt.hash(password, 10);
            userInfo.password = encrypted_password;
            let new_admin_user = new admin_user_model(userInfo);
            await new_admin_user.save();
            await mongoose.disconnect();
            return "Ok !!, Create Admin Account Is Successfuly !!";
        }
    } catch(err) {
        await mongoose.disconnect();
        throw Error("Sorry, Error In Process, Please Repeated This Process !!");
    }
}

create_admin_user_account().then((result) => console.log(result));