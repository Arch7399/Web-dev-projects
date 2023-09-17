import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import _ from "lodash";

const app = express();
const workItems = [];
const port = 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://0.0.0.0:27017/todolistDB");

const itemSchema = {
  name: String
};

const Item = mongoose.model("item", itemSchema);

const listSchema = {
  name: String,
  items: [itemSchema]
}
const List = mongoose.model("List", listSchema);

const item1 = new Item({
  name: "Welcome"
});

const item2 = new Item({
  name: "+ to Add"
});

const item3 = new Item({
  name: "<-- to delete"
});

const defaultItems = [item1, item2, item3];

app.get("/", function(req, res) {

  Item.find({}).then(function(result){
    if(result.length === 0){
      Item.insertMany(defaultItems);
      res.redirect("/");
    } else {
      res.render("list", {listTitle: "Today", newListItems: result});
    }
  });
});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const newItem = new Item({
    name: itemName
  });

  if(listName === "Today"){
    newItem.save();
    res.redirect("/");
  } else {
    List.findOne({name: listName}).then(function(otherList){
      otherList.items.push(newItem);
      otherList.save();
    });
    res.redirect("/"+listName);
  }
});

app.post("/delete", (req,res) => {
  const itemId = req.body.checkbox;
  const listName = req.body.listName;

  if(listName === "Today"){
    Item.findByIdAndRemove(itemId).then(function(){
      console.log("Item Deleted");
      res.redirect("/");
    }).catch(function(err){
      console.log(err);
    });
  } else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: itemId}}}).then(function(foundList){
      res.redirect("/"+listName);
    });
  }
});

app.get("/:customList", function(req,res){
  const listName = _.capitalize(req.params.customList);
  List.findOne({name: listName}).then(function(foundList){
    if(!foundList){
      const newList = new List({
        name: listName,
        items: defaultItems
      });
      newList.save();
      res.redirect("/"+listName);
    } else {
      res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
    }
  });
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(port, function() {
  console.log("Server started on port 3000");
});
