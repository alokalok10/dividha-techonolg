Selling API

Run on localhost://3000;
#For login page 
localhost://3000/login Redirect page in dashboard.


Table of Contents
Check out the Getting Started section below for a quick overview.

This README is divided into several sections:

Setup
Configuration options
Examples
Debug mode
Supported API segments
Seller APIs
Vendor APIs
Restricted operations
Uploading and downloading documents
Downloading a report document
Uploading a feed document
Downloading a feed result document
Working with model classes
Response headers
Custom request authorization
Custom request signing


Getting Started
Prerequisites
You need a few things to get started:

A Selling Partner API developer account
An AWS IAM user or role configured for use with the Selling Partner API
A Selling Partner API application


Setup
The Configuration constructor takes a single argument: an associative array with all the configuration information that's needed to connect to the Selling Partner API:
const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/');


const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error in connecting to MongoDB"));

db.once("open", () => {
  console.log("Connected to MongoDB successfully!");
});

module.exports = db;