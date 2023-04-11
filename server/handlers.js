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

client.connect();

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
  const { user } = req.body;
  const { userId, name, nickname, email } = user;
  await client.connect();

  try {
    const existingUser = await users.findOne({ _id: userId });

    if (existingUser) {
      res.status(200).json({ success: true, data: existingUser });
    } else {
      const newUser = {
        _id: userId,
        name: name,
        nickname: nickname,
        email: email,
        reviews: [],
        favorites: [],
      };

      const result = await users.insertOne(newUser);
      console.log("Received user data:", result);

      const insertedId = result.insertedId;

      const savedUser = await users.findOne({ _id: insertedId });
      await client.close();

      res.status(201).json({ success: true, data: savedUser });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, message: "Error creating user" });
  }
};

const createReview = async (req, res) => {
  try {
    const { companyId } = req.params;
    const { userId, userName, company, date, title, text, grade } = req.body;

    await client.connect();

    const review = {
      _id: uuidv4(),
      userId: userId,
      userName: userName,
      company: company,
      date: date,
      title: title,
      text: text,
      grade: grade,
    };

    const companyResult = await companies.updateOne(
      { _id: companyId },
      { $push: { reviews: review } }
    );

    const userResult = await users.updateOne(
      { _id: userId },
      { $push: { reviews: review } }
    );

    await client.close();

    if (companyResult.modifiedCount === 0) {
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

const createFavorite = async (req, res) => {
  try {
    const { userId, companyId, companyName } = req.body; // Update this line

    await client.connect();

    const user = await users.findOne({ _id: userId });

    if (!user) {
      await client.close();
      return res.status(404).json({
        status: 404,
        message: "User not found.",
        data: null,
      });
    }

    const alreadyAdded = user.favorites.some(
      (favorite) => favorite._id === companyId
    );

    if (alreadyAdded) {
      await client.close();
      return res.status(409).json({
        status: 409,
        message: "The company is already in the user's favorites.",
        data: null,
      });
    }

    await users.updateOne(
      { _id: userId },
      { $addToSet: { favorites: { _id: companyId, name: companyName } } }
    );

    await client.close();

    return res.status(200).json({
      status: 200,
      message: `Company ${companyName} has been successfully added to favorites.`,
      data: null,
    });
  } catch (error) {
    console.error("Error adding favorite:", error);
    await client.close();
    return res.status(500).json({
      status: 500,
      message: "An error occurred while adding the favorite.",
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
      });
    }

    return res.status(200).json({
      status: 200,
      data: company,
    });
  } catch (error) {
    console.error("Error getting company by ID:", error);
    await client.close();
    return res.status(500).json({
      status: 500,
      message: "An error occurred while fetching the company.",
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
    console.log(id);

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

    const validReviews = user.reviews.filter((review) => review !== null);

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

const getUserFavorites = async (req, res) => {
  try {
    const { userId } = req.params;

    await client.connect();
    const user = await users.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found.",
        data: null,
      });
    }

    const validFavorites = user.favorites.filter(
      (favorite) => favorite !== null
    );

    res.status(200).json({
      status: 200,
      message: "User favorites fetched successfully.",
      data: validFavorites,
    });
  } catch (error) {
    console.error("Error fetching user favorites:", error);
    res.status(500).json({
      status: 500,
      message: "Error fetching user favorites.",
      data: { error: error.message },
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

const deleteAllReviewsForCompany = async (req, res) => {
  try {
    const { id } = req.params;

    await client.connect();

    // Find all reviews related to the specified company
    const companyReviews = await companies.findOne(
      { _id: id },
      { projection: { reviews: 1 } }
    );

    if (!companyReviews) {
      return res.status(404).json({
        status: 404,
        message: "Company not found.",
      });
    }

    // Extract review IDs
    const reviewIds = companyReviews.reviews.map((review) => review._id);

    // Delete all reviews from the specified company
    const { value: updatedCompany } = await companies.findOneAndUpdate(
      { _id: id },
      { $set: { reviews: [] } },
      { returnOriginal: false }
    );

    // Delete all reviews related to the specified company from all users
    await users.updateMany(
      { "reviews._id": { $in: reviewIds } },
      { $pull: { reviews: { _id: { $in: reviewIds } } } }
    );

    await client.close();

    return res.status(200).json({
      status: 200,
      message: "All reviews for the company deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting all reviews for the company:", error);
    await client.close();
    return res.status(500).json({
      status: 500,
      message: "An error occurred while deleting all reviews for the company.",
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    await client.connect();

    // Delete review from company
    const { value: updatedCompany } = await companies.findOneAndUpdate(
      { "reviews._id": id },
      { $pull: { reviews: { _id: id } } },
      { returnOriginal: false }
    );

    // Delete review from user
    const { value: updatedUser } = await users.findOneAndUpdate(
      { "reviews._id": id },
      { $pull: { reviews: { _id: id } } },
      { returnOriginal: false }
    );

    await client.close();

    if (!updatedCompany || !updatedUser) {
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

module.exports = {
  createCompany,
  createUser,
  createReview,
  createFavorite,
  getAllCompanies,
  getCompaniesByServiceType,
  getCompanyById,
  getAllReviews,
  getReviewById,
  getAllUsers,
  getUserById,
  getUserReviews,
  getUserFavorites,
  updateCompany,
  updateUser,
  updateReview,
  deleteCompany,
  deleteUser,
  deleteAllReviewsForCompany,
  deleteReview,
};
