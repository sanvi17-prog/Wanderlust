const express=require("express");
const router = express.Router();
const {listingSchema,reviewSchema}=require("../schema.js");
const wrapAsync=require("../utils/wrapAsync.js");
const{isLoggedIn}=require("../middleware.js");
const Listing = require("../models/listing.js");
const listingController = require("../controllers/listing.js");

const validateListing = (req,res,next)=>{
  let { error } = listingSchema.validate(req.body);

  if(error){
    let errMsg = error.details.map((el)=> el.message).join(",");

    req.flash("error", errMsg);

    return res.redirect("/listings/new");
  }

  next();
};



//Index Route
router.get("/", listingController.index);

//New Route
router.get("/new", isLoggedIn,listingController.newListing);

//Show Route
router.get("/:id",isLoggedIn,listingController.show);

//Create Route
router.post(
  "/",
  isLoggedIn,
  validateListing,
  wrapAsync(listingController.createNew));

  //Edit Route
router.get("/:id/edit",isLoggedIn,listingController.editListing);

//Update Route
router.put("/:id", isLoggedIn,listingController.updateListing);

//Delete Route
router.delete("/:id",isLoggedIn,listingController.deleteListing);

module.exports=router;