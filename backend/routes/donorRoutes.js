
const express = require("express");
const router = express.Router();

const Donor = require("../models/Donor");
console.log("DONOR ROUTES LOADED");

// 1. Register a new donor
router.post("/register", async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      bloodGroup,
      phone,
      email,
      city
    } = req.body;

    // Validate Indian mobile number
    if (!phone || !/^[6-9]\d{9}$/.test(String(phone))) {
      return res.status(400).json({
        message: "Please enter a valid 10-digit Indian mobile number."
      });
    }

    const newDonor = new Donor({
      name,
      age,
      gender,
      bloodGroup,
      phone,
      email,
      city
    });

    await newDonor.save();

    res.status(201).json({
      message: "Donor registered successfully!",
      donor: newDonor
    });

  } catch (error) {
    res.status(400).json({
      message: error.code === 11000
        ? "Email already registered"
        : error.message
    });
  }
});


// 2. Get all donors
router.get("/", async (req, res) => {
  try {
    const donors = await Donor.find();

    res.status(200).json({
      count: donors.length,
      donors
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


// 3. Search donors by blood group and city
router.get("/search", async (req, res) => {
  try {
    const { bloodGroup, city } = req.query;

    const filter = {
      available: true
    };

    if (bloodGroup) {
      filter.bloodGroup = bloodGroup;
    }

    if (city) {
      filter.city = {
        $regex: city,
        $options: "i"
      };
    }

    const donors = await Donor.find(filter);

    res.status(200).json({
      message: "Donors fetched successfully!",
      count: donors.length,
      donors
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


// 4. Get donor by ID
router.get("/:id", async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);

    if (!donor) {
      return res.status(404).json({
        message: "Donor not found"
      });
    }

    res.status(200).json(donor);

  } catch (error) {
    res.status(400).json({
      message: "Invalid donor ID"
    });
  }
});


// 5. Update donor details
router.put("/:id", async (req, res) => {
  try {
    const updatedDonor = await Donor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedDonor) {
      return res.status(404).json({
        message: "Donor not found"
      });
    }

    res.status(200).json({
      message: "Donor updated successfully!",
      donor: updatedDonor
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});


// 6. Delete donor
router.delete("/:id", async (req, res) => {
  try {
    const deletedDonor = await Donor.findByIdAndDelete(
      req.params.id
    );

    if (!deletedDonor) {
      return res.status(404).json({
        message: "Donor not found"
      });
    }

    res.status(200).json({
      message: "Donor deleted successfully!"
    });

  } catch (error) {
    res.status(400).json({
      message: "Invalid donor ID"
    });
  }
});

module.exports = router;
