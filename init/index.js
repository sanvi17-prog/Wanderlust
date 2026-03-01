const mongoose = require("mongoose"); // FIXED
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to db");
    initDB(); // Call the function AFTER connection is successful
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  // Assuming data.js exports an object like { data: [...] }
  await Listing.insertMany(initData.data); // FIXED from initData.data to data.data
  console.log("data was initialized");
};