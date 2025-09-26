const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

module.exports = router;
const Model = require("../../react-router/app/models/db/wallet");
//Post Method
router.post("/post", async (req, res) => {
  console.log(req.body);
  if (req.body.amount === undefined || typeof req.body.amount !== "number") {
    return res
      .status(400)
      .json({ message: "Missing or invalid required fields" });
  }

  const data = new Model({
    amount: req.body.amount,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get by ID Method
router.get("/", async (req, res) => {
  try {
    const data = await Model.find().limit(1);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
router.patch("/update", async (req, res) => {
  try {
    const id = process.env.WALLET_ID;
    if (req.body.amount === undefined || typeof req.body.amount !== "number") {
      return res
        .status(400)
        .json({ message: "Missing or invalid required fields" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const result = await Model.findByIdAndUpdate(id, req.body, { new: true })
      .then((updatedDocument) => {
        console.log("Document updated successfully:", updatedDocument);
        return updatedDocument;
      })
      .catch((error) => {
        console.error("Error updating document:", error);
        throw error;
      });

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
