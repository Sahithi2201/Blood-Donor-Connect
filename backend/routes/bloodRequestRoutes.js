
const express = require("express");
const router = express.Router();

const BloodRequest = require("../models/BloodRequest");

// 1. Create a blood request
router.post("/", async (req, res) => {
  try {
    const { phone } = req.body;

    // Validate Indian mobile number
    if (!phone || !/^[6-9]\d{9}$/.test(String(phone))) {
      return res.status(400).json({
        message: "Please enter a valid 10-digit Indian mobile number."
      });
    }

    const newRequest = new BloodRequest(req.body);

    await newRequest.save();

    res.status(201).json({
      message: "Blood request submitted successfully!",
      request: newRequest
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

// 2. Get all blood requests
router.get("/", async (req, res) => {
  try {
    const requests = await BloodRequest.find().sort({ createdAt: -1 });

    res.status(200).json({
      count: requests.length,
      requests
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// 3. Get request by ID
router.get("/:id", async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Blood request not found"
      });
    }

    res.status(200).json(request);

  } catch (error) {
    res.status(400).json({
      message: "Invalid request ID"
    });
  }
});

// 4. Update request status
router.put("/:id", async (req, res) => {
  try {
    const updatedRequest = await BloodRequest.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({
        message: "Blood request not found"
      });
    }

    res.status(200).json({
      message: "Request updated successfully!",
      request: updatedRequest
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

// 5. Delete request
router.delete("/:id", async (req, res) => {
  try {
    const deletedRequest = await BloodRequest.findByIdAndDelete(
      req.params.id
    );

    if (!deletedRequest) {
      return res.status(404).json({
        message: "Blood request not found"
      });
    }

    res.status(200).json({
      message: "Blood request deleted successfully!"
    });

  } catch (error) {
    res.status(400).json({
      message: "Invalid request ID"
    });
  }
});

module.exports = router;
