const express = require("express");
const UserData = require("./User-Data.json")
const bodyparser = require("body-parser");
const { name } = require("ejs");
const fs = require('fs');
const app = express();
const port = 3000;
app.use(express.json());
app.use(bodyparser.urlencoded({extended : true}));

app.get("/", (req, res)=>{
    res.render('./index.ejs')
});
app.get("/api/users", (req, res)=>{
    res.render('./userslist.ejs', {Users: UserData.Users})
});
let foundUser = null;
app.post("/api/users/:id", (req, res) => {
    let id = parseInt(req.body.id);
    console.log("Searching for user with ID:", id);
    
    const user = UserData.Users.find(user => user.id === id);
    console.log("Found user:", user);
    
    if(user) {
        foundUser = user;
        res.status(200).json({
            status: 200,
            message: `User with ID ${id} found successfully`,
            user: user
        });
    } else {
        res.status(404).json({
            status: 404,
            message: `User with ID ${id} not found`
        });
    }
});
app.get("/api/users/:id", (req, res)=>{
    if(foundUser){
    res.render('./userslist.ejs', {
        Users: [foundUser]
    });
    foundUser = null;
}
    else{
        res.redirect('/api/users');
    }
});
app.route("/api/newuser")
    .get((req, res)=>{
    res.render("./newuser.ejs");
})
    .post((req, res)=>{
    const newId = UserData.Users[UserData.Users.length - 1].id + 1;
    console.log("Creating new user with ID:", newId);
    
    const newUser = {
        "id": newId,
        "first_name": req.body.first,
        "last_name": req.body.last,
        "email": req.body.email,
        "gender": req.body.gender
    };
    
    UserData.Users.push(newUser);
    fs.writeFile('./User-Data.json', JSON.stringify(UserData, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return res.status(500).json({
                status: 500,
                message: "Error creating user",
                error: err.message
            });
        }
        return res.status(201).json({
            status: 201,
            message: "User created successfully",
            user: newUser
        });
    });
});
app.get("/api/updation", (req, res)=>{
        res.render("./updation.ejs", {
            user: undefined
        }
    );
});
app.post("/api/update/search", (req, res) => {
    const searchId = parseInt(req.body.id);
    console.log("Searching for user to update, ID:", searchId);
    
    const user = UserData.Users.find(user => user.id === searchId);
    
    if(user) {
        res.status(200).json({
            status: 200,
            message: `User with ID ${searchId} found`,
            user: user
        });
    } else {
        res.status(404).json({
            status: 404,
            message: `User with ID ${searchId} not found`
        });
    }
});
app.patch("/api/updation/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    console.log("Attempting to update user with ID:", userId);
    
    const userIndex = UserData.Users.findIndex(user => user.id === userId);
    console.log("User index:", userIndex);
    
    if(userIndex !== -1) {
        const updatedUser = {
            ...UserData.Users[userIndex],
            ...req.body
        };
        UserData.Users[userIndex] = updatedUser;
        
        fs.writeFile('./User-Data.json', JSON.stringify(UserData, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({
                    status: 500,
                    message: "Error updating user",
                    error: err.message
                });
            }
            return res.status(200).json({
                status: 200,
                message: `User with ID ${userId} updated successfully`,
                user: updatedUser
            });
        });
    } else {
        return res.status(404).json({
            status: 404,
            message: `User with ID ${userId} not found`
        });
    }
});
app.get("/api/deletion", (req, res) => {
    res.render("./DeletingUsers.ejs", {
        user: undefined
    });
});
app.delete("/api/deletion/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    console.log("Attempting to delete user with ID:", userId); 

    const userIndex = UserData.Users.findIndex(user => user.id === userId);
    console.log("User index:", userIndex);
    
    if (userIndex !== -1) {
        const deletedUser = UserData.Users[userIndex];
        UserData.Users.splice(userIndex, 1);
        fs.writeFile('./User-Data.json', JSON.stringify(UserData, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({ 
                    status: 500,
                    message: "Error deleting user",
                    error: err.message
                });
            }
            return res.status(200).json({
                status: 200,
                message: `User with ID ${userId} deleted successfully`,
                deletedUser: deletedUser
            });
        });
    } else {
        return res.status(404).json({ 
            status: 404,
            message: `User with ID ${userId} not found`
        });
    }
});
app.listen(port, ()=>{
console.log("Server is listening at " + port);
});