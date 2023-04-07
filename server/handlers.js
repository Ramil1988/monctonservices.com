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
const database = client.db("MonctonServicesCom");
const companies = database.collection("companies");
const users = database.collection("users");

const createCompany = async (req, res) => {
  try {
    const { serviceType, name, address, image } = req.body;

    await client.connect();

    const company = {
      _id: uuidv4(),
      serviceType: serviceType,
      name: name,
      address: address,
      image: image,
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

    const newUser = {
      _id: user.userId,
      name: user.name,
      nickname: user.nickname,
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
    const { date, title, text, grade } = req.body;

    await client.connect();

    const review = {
      _id: uuidv4(),
      date: date,
      title: title,
      text: text,
      grade: grade,
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
      message: `Review ${title} has been successfully added.`,
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

const getAllCompanies = async (req, res) => {
  try {
    await client.connect();

    const allCompanies = await companies.find().toArray();

    await client.close();

    return res.status(200).json({
      status: 200,
      message: "All companies retrieved successfully.",
      data: allCompanies,
    });
  } catch (error) {
    console.error("Error fetching companies:", error);
    await client.close();
    return res.status(500).json({
      status: 500,
      message: "An error occurred while fetching companies.",
      data: null,
    });
  }
};

const getCompaniesByServiceType = async (req, res) => {
  try {
    const { serviceType } = req.params;
    const formattedServiceType =
      serviceType.charAt(0).toUpperCase() + serviceType.slice(1).toLowerCase();

    await client.connect();

    const matchingCompanies = await companies
      .find({ serviceType: formattedServiceType })
      .toArray();

    await client.close();

    if (matchingCompanies.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "No companies found for the specified service type.",
        data: null,
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Companies retrieved successfully.",
      data: matchingCompanies,
    });
  } catch (error) {
    console.error("Error fetching companies by service type:", error);
    await client.close();
    return res.status(500).json({
      status: 500,
      message: "An error occurred while fetching companies by service type.",
      data: null,
    });
  }
};

const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;

    await client.connect();
    const company = await companies.findOne({ _id: id });

    await client.close();

    if (!company) {
      return res.status(404).json({
        status: 404,
        message: "Company not found.",
        data: null,
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Company retrieved successfully.",
      data: company,
    });
  } catch (error) {
    console.error("Error fetching company by ID:", error);
    await client.close();
    return res.status(500).json({
      status: 500,
      message: "An error occurred while fetching the company by ID.",
      data: null,
    });
  }
};

const getAllReviews = async (req, res) => {
  try {
    await client.connect();

    const allCompanies = await companies.find().toArray();
    const allReviews = allCompanies.flatMap((company) =>
      company.reviews.map((review) => ({
        ...review,
        companyName: company.name,
        companyId: company._id,
      }))
    );

    await client.close();

    return res.status(200).json({
      status: 200,
      message: "All reviews retrieved successfully.",
      data: allReviews,
    });
  } catch (error) {
    console.error("Error fetching all reviews:", error);
    await client.close();
    return res.status(500).json({
      status: 500,
      message: "An error occurred while fetching all reviews.",
      data: null,
    });
  }
};

const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;

    await client.connect();
    const database = client.db("MonctonServicesCom");
    const companies = database.collection("companies");

    const companyWithReview = await companies.findOne({ "reviews._id": id });

    await client.close();

    if (!companyWithReview) {
      return res.status(404).json({
        status: 404,
        message: "Review not found.",
        data: null,
      });
    }

    const review = companyWithReview.reviews.find(
      (review) => review._id === id
    );
    const reviewWithCompany = {
      ...review,
      companyName: companyWithReview.name,
      companyId: companyWithReview._id,
    };

    return res.status(200).json({
      status: 200,
      message: "Review retrieved successfully.",
      data: reviewWithCompany,
    });
  } catch (error) {
    console.error("Error fetching review by ID:", error);
    await client.close();
    return res.status(500).json({
      status: 500,
      message: "An error occurred while fetching the review by ID.",
      data: null,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    await client.connect();

    const allUsers = await users.find().toArray();
    await client.close();

    return res.status(200).json({
      status: 200,
      message: "All users retrieved successfully.",
      data: allUsers,
    });
  } catch (error) {
    console.error("Error fetching all users:", error);
    await client.close();
    return res.status(500).json({
      status: 500,
      message: "An error occurred while fetching all users.",
      data: null,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    await client.connect();
    const user = await users.findOne({ _id: id });

    await client.close();

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found.",
        data: null,
      });
    }

    return res.status(200).json({
      status: 200,
      message: "User retrieved successfully.",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    await client.close();
    return res.status(500).json({
      status: 500,
      message: "An error occurred while fetching the user by ID.",
      data: null,
    });
  }
};

const getUserReviews = async (req, res) => {
  try {
    const { id } = req.params;

    await client.connect();
    const user = await users.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found.",
        data: null,
      });
    }

    const validReviews = user.Reviews.filter((review) => review !== null);

    res.status(200).json({
      status: 200,
      message: "User reviews fetched successfully.",
      data: validReviews,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error fetching user reviews.",
      data: error,
    });
  }
};

const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { serviceType, name, address, image } = req.body;

    await client.connect();
    const database = client.db("MonctonServicesCom");
    const companies = database.collection("companies");

    const updatedFields = {};
    if (serviceType) updatedFields.serviceType = serviceType;
    if (name) updatedFields.name = name;
    if (address) updatedFields.address = address;
    if (image) updatedFields.image = image;

    const { value: updatedCompany } = await companies.findOneAndUpdate(
      { _id: id },
      { $set: updatedFields },
      { returnOriginal: false }
    );

    await client.close();

    if (!updatedCompany) {
      return res.status(404).json({
        status: 404,
        message: "Company not found.",
        data: null,
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Company updated successfully.",
      data: updatedCompany,
    });
  } catch (error) {
    console.error("Error updating company:", error);
    await client.close();
    return res.status(500).json({
      status: 500,
      message: "An error occurred while updating the company.",
      data: null,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, nickname, favorites, reviews } = req.body;

    await client.connect();

    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (email) updatedFields.email = email;
    if (nickname) updatedFields.nickname = nickname;
    if (favorites) updatedFields.favorites = favorites;
    if (reviews) updatedFields.reviews = reviews;

    const { value: updatedUser } = await users.findOneAndUpdate(
      { _id: id },
      { $set: updatedFields },
      { returnOriginal: false }
    );

    await client.close();

    if (!updatedUser) {
      return res.status(404).json({
        status: 404,
        message: "User not found.",
        data: null,
      });
    }

    return res.status(200).json({
      status: 200,
      message: "User updated successfully.",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    await client.close();
    return res.status(500).json({
      status: 500,
      message: "An error occurred while updating the user.",
      data: null,
    });
  }
};

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, title, text, user, grade } = req.body;

    await client.connect();

    const updatedFields = {};
    if (date) updatedFields["reviews.$.date"] = date;
    if (title) updatedFields["reviews.$.title"] = title;
    if (text) updatedFields["reviews.$.text"] = text;
    if (user) updatedFields["reviews.$.user"] = user;
    if (grade) updatedFields["reviews.$.grade"] = grade;

    const { value: updatedCompany } = await companies.findOneAndUpdate(
      { "reviews._id": id },
      { $set: updatedFields },
      { returnOriginal: false }
    );

    await client.close();

    if (!updatedCompany) {
      return res.status(404).json({
        status: 404,
        message: "Review not found.",
        data: null,
      });
    }

    const updatedReview = updatedCompany.reviews.find(
      (review) => review._id === id
    );

    return res.status(200).json({
      status: 200,
      message: "Review updated successfully.",
      data: updatedReview,
    });
  } catch (error) {
    console.error("Error updating review:", error);
    await client.close();
    return res.status(500).json({
      status: 500,
      message: "An error occurred while updating the review.",
      data: null,
    });
  }
};

const updateUserReview = async (req, res) => {
  try {
    const { id } = req.params;

    await client.connect();

    const { date, title, text, grade } = req.body;

    console.log("Received data:", req.body);

    const user = await users.findOne({ _id: id });
    console.log("User found:", user);

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found.",
        data: null,
      });
    }

    const review = {
      _id: uuidv4(),
      date: date,
      title: title,
      text: text,
      grade: grade,
    };

    const userResult = await users.updateOne(
      { _id: user._id },
      { $push: { Reviews: review } }
    );

    await client.close();

    if (userResult.modifiedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "User not found.",
        data: null,
      });
    }

    return res.status(201).json({
      status: 201,
      message: `Review ${title} has been successfully added.`,
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

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    await client.connect();

    const { value: updatedCompany } = await companies.findOneAndUpdate(
      { "reviews._id": id },
      { $pull: { reviews: { _id: id } } },
      { returnOriginal: false }
    );

    await client.close();

    if (!updatedCompany) {
      return res.status(404).json({
        status: 404,
        message: "Review not found.",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Review deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    await client.close();
    return res.status(500).json({
      status: 500,
      message: "An error occurred while deleting the review.",
    });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    await client.connect();
    const result = await companies.deleteOne({ _id: id });

    await client.close();

    if (result.deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Company not found.",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Company deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting company:", error);
    await client.close();
    return res.status(500).json({
      status: 500,
      message: "An error occurred while deleting the company.",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await client.connect();

    const result = await users.deleteOne({ _id: id });

    await client.close();

    if (result.deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "User deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    await client.close();
    return res.status(500).json({
      status: 500,
      message: "An error occurred while deleting the user.",
    });
  }
};

module.exports = {
  createCompany,
  createReview,
  createUser,
  getAllCompanies,
  getCompaniesByServiceType,
  getCompanyById,
  getAllReviews,
  getReviewById,
  getAllUsers,
  getUserById,
  getUserReviews,
  updateCompany,
  updateUser,
  updateReview,
  updateUserReview,
  deleteReview,
  deleteCompany,
  deleteUser,
};
