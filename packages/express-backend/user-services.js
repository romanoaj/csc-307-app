import mongoose from "mongoose";
import userModel from "./users.js"; 

mongoose.set("debug");

mongoose
    .connect("mongodb://localhost:27017/users", { // port num is by+for mongo (don't change)
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch((error) => console.log(error));

function getUsers(name, job){
    let promise;
    if (name === undefined && job === undefined) {
        promise = userModel.find();
    } else if (name && !job) {
        promise = findUserByName(name);
    } else if (job && !name) {
        promise = findUserByJob(job);
    } else {
        promise = findUserByNameAndJob(name, job);
    }
    return promise;
}

function findUserById(id){
    return userModel.findById(id);
}

function addUser(user){
    const userToAdd = new userModel(user);
    const promise = userToAdd.save();
    return promise;
}

function findUserByName(name){
    return userModel.find({name: name});
}

function findUserByJob(job){
    return userModel.find({job: job});
}

function findUserByNameAndJob(name, job){
    return userModel.find({name: name, job: job});
}

function deleteUserById(id){
    return userModel.findByIdAndDelete({_id: ObjectId(id)});
}

export default {
    addUser,
    getUsers, // check 
    findUserById, // check
    findUserByName, //check 
    findUserByJob, // check
    findUserByNameAndJob // check
};