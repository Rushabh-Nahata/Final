import ErrorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/userModels.js";
import catchAsyncErrors from "./catchAsyncErrors.js";

// const ErrorHandler = require("../utils/errorhander");
// const catchAsyncErrors = require("./catchAsyncErrors");
// const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");

export const isAuthenticatedUser = async (req, res, next) => {
  try{
  const { token } = req.cookies;
  console.dir("isAuthenticatedUsers",req.cookies.name);
  
  console.log("Checkign my token");
  // console.log(token);

  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  next();
}
catch (err) {
  console.error(err);
}
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    //All roles that are present in the array will be allowed
    //Ex : If the specified array has 'admin', and the user that is logged in is a admin then do nothing and allow
    //Else give a error that user is not allowed

    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: '${req.user.role}' is not allowed to access this resource`,
          403
        )
      );
    }

    next();
  };
};
