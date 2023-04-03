"use strict";

const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);

const createCompany = async (req, res) => {
  try {
    const { serviceType, name, address } = req.body;

    await client.connect();
    const database = client.db("MonctonServicesCom");
    const companies = database.collection("companies");

    const company = {
      _id: uuidv4(),
      serviceType: serviceType,
      name: name,
      address: address,
      reviews: [],
    };

    await companies.insertOne(company);

    await client.close();

    return res.status(201).json({
      status: 201,
      message: `Company ${name} successfully created.`,
      createdCompany: company,
    });
  } catch (error) {
    console.error("Error adding company:", error);
    await client.close();
    return {
      status: 500,
      message: "An error occurred while creating the company.",
      data: null,
    };
  }
};

const createUser = async (req, res) => {
  try {
    const { user } = req.body;

    await client.connect();
    const database = client.db("MonctonServicesCom");
    const users = database.collection("users");

    const newUser = {
      _id: user.userId,
      name: user.name,
      email: user.email,
  
      Reviews: [],
      Favorites: [],
    };

    const result = await users.insertOne(newUser);

    await client.close();

    return res.status(201).json({
      status: 201,
      message: "User successfully created.",
      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    await client.close();
    return res.status(500).json({
      status: 500,
      message: "An error occurred while creating the user.",
      data: null,
    });
  }
};

const createReview = async (req, res) => {
  try {
    const { companyId } = req.params;
    const { Date, Title, Text, User, Grade } = req.body;

    await client.connect();
    const database = client.db("MonctonServicesCom");
    const companies = database.collection("companies");

    const review = {
      _id: uuidv4(),
      Date: Date,
      Title: Title,
      Text: Text,
      User: User,
      Grade: Grade,
    };

    const result = await companies.updateOne(
      { _id: companyId },
      { $push: { reviews: review } }
    );

    await client.close();

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Company not found.",
        data: null,
      });
    }

    return res.status(201).json({
      status: 201,
      message: `Review ${Title} has been successfully added.`,
      review: review,
    });
  } catch (error) {
    console.error("Error adding review:", error);
    await client.close();
    return res.status(500).json({
      status: 500,
      message: "An error occurred while adding the review.",
      data: null,
    });
  }
};

module.exports = { createCompany, createReview, createUser };
