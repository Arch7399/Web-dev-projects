import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/personsDB", {useNewUrlParser: true});

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    comments: String
});

const Person = mongoose.model("Person", personSchema);

const instructor = new Person({
    name: "Ray",
    age: 34,
    comments: "Top Notch"
});

const prof = new Person({
    name: "Shiv",
    age: 34,
    comments: "Average"
});

const officeStaff = new Person({
    name: "Gun",
    age: 28,
    comments: "Below Average"
});

Person.insertMany([instructor, prof, officeStaff], function(err){
    if(err){
        console.log(err);
    } else {
        console.log("Saved all people");
    }
});

Person.find(function(err, people){
    if (err) {
        console.log(err);
    } else {
        mongoose.connection.close();
        people.forEach(peep => {
            console.log(peep.name);
        });
    }
});