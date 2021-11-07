require("dotenv").config();
const mongoose = require("mongoose");
const mongoDB = process.env.MONGO_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  title: { type: String, required: true },
  count: { type: Number, required: true },
});

const Item = mongoose.model("Item", ItemSchema);

function createItemWithThen(title, cb) {
  Item.findOne({ title: title })
    .then((result) => {
      if (!result) {
        return Item.create({ title: title, count: 0 });
      } else {
        return Item.findOneAndUpdate(
          { _id: result._id },
          { count: result.count + 1 },
          { new: true }
        );
      }
    })
    .then((newResult) => {
      console.log("created/updated entry is: ", newResult);
      cb();
    })
    .catch((err) => {
      console.log(err);
      cb();
    });
}

async function createItemWithAwait(title, cb) {
  try {
    const result = await Item.findOne({ title: title });
    let newResult = null;
    if (!result) {
      newResult = await Item.create({ title: title, count: 0 });
    } else {
      newResult = await Item.findOneAndUpdate(
        { _id: result._id },
        { count: result.count + 1 },
        { new: true }
      );
    }
    console.log("created/updated entry is: ", newResult);
    cb();
  } catch (err) {
    console.log(err);
    cb();
  }
}

function createItem2() {
  createItemWithAwait("banana", closeDb);
}

function closeDb() {
  mongoose.connection.close();
}

createItemWithThen("apple", createItem2);
