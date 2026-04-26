import mongoose from "mongoose";
import { Children } from "../model/children.model.js";
import { Centre } from "../model/center.model.js";


const registerChild = async (req, res) => {
  try {
    const {
      name,
      dob,
      gender,
      height,
      weight,
      centre,
      parentName,
      parentContact,
      medicalHistory,
      dateofjoining,
      detailsOfChild,
      achievementsOfChild,
      standardofEducation,
      childrenImage,
      aadharCardImage,
    } = req.body;

    if (!name ||!dob ||!gender ||!height ||!weight ||!centre ||!dateofjoining) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const centreData = await Centre.findById(centre);
    if (!centreData) {
      return res.status(404).json({ message: "Centre not found" });
    }

    if (centreData.currentOccupancy >= centreData.maxCapacity) {
      return res.status(400).json({
        message: "Centre has reached maximum capacity",
      });
    }

    const dobDate = new Date(dob);
    const dojDate = new Date(dateofjoining);

    let ageOfJoining = dojDate.getFullYear() - dobDate.getFullYear();
    const m = dojDate.getMonth() - dobDate.getMonth();
    if (m < 0 || (m === 0 && dojDate.getDate() < dobDate.getDate())) {
      ageOfJoining--;
    }

    const child = await Children.create({
      name,
      dob,
      gender,
      height,
      weight,
      centre,
      parentName,
      parentContact,
      medicalHistory,
      dateofjoining,
      ageOfJoining,
      detailsOfChild,
      achievementsOfChild,
      standardofEducation,
      childrenImage,
      aadharCardImage,
    });

    centreData.currentOccupancy += 1;
    await centreData.save();

    return res.status(201).json({
      message: "Child registered successfully",
      child,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to register child",
      error: error.message,
    });
  }
};


const updateChild = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedChild = await Children.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedChild) {
      return res.status(404).json({ message: "Child not found" });
    }

    return res.status(200).json({
      message: "Child updated successfully",
      child: updatedChild,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update child",
      error: error.message,
    });
  }
};


const getChildDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const child = await Children.findById(id).populate("centre");

    if (!child) {
      return res.status(404).json({ message: "Child not found" });
    }

    return res.status(200).json({
      success: true,
      data: child,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch child details",
      error: error.message,
    });
  }
};


const getChildrenDetailsByCentre = async (req, res) => {
  try {
    const { centreId } = req.params;

    const children = await Children.find({ centre: centreId })
      .populate("centre")
      .select("-__v");

    return res.status(200).json({
      success: true,
      count: children.length,
      data: children,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch children by centre",
      error: error.message,
    });
  }
};


const getAllChildren = async (req, res) => {
  try {
    const children = await Children.find()
      .populate("centre")
      .select("-__v");

    return res.status(200).json({
      success: true,
      count: children.length,
      data: children,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch children",
      error: error.message,
    });
  }
};

const filterChildren = async (req, res) => {
  try {
    const {
      minAge,
      maxAge,
      gender,
      centre,
      minSSC,
      maxSSC,
      standardofEducation,
    } = req.query;

    const query = {};

    if (minAge || maxAge) {
      const today = new Date();
      query.dob = {};

      if (minAge) {
        const maxDob = new Date(
          today.getFullYear() - minAge,
          today.getMonth(),
          today.getDate()
        );
        query.dob.$lte = maxDob;
      }

      if (maxAge) {
        const minDob = new Date(
          today.getFullYear() - maxAge - 1,
          today.getMonth(),
          today.getDate()
        );
        query.dob.$gte = minDob;
      }
    }

    if (gender) {
      query.gender = gender;
    }


    if (centre) {
      query.centre = centre;
    }

    if (minSSC || maxSSC) {
      query.sscMarks = {};
      if (minSSC) query.sscMarks.$gte = Number(minSSC);
      if (maxSSC) query.sscMarks.$lte = Number(maxSSC);
    }

    if (standardofEducation) {
      query.standardofEducation = standardofEducation;
    }

    const children = await Children.find(query)
      .populate("centre")
      .select("-__v");

    return res.status(200).json({
      success: true,
      count: children.length,
      filtersApplied: Object.keys(query),
      data: children,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to filter children",
      error: error.message,
    });
  }
};

export {
  registerChild,
  updateChild,
  getChildDetails,
  getChildrenDetailsByCentre,
  getAllChildren,
  filterChildren,
};
