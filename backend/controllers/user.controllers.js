const { hashPassword, comparePassword } = require("../utils/passwordUtils");
const { generateToken } = require("../utils/authUtils");
const { executeProcedure } = require("../config/db.config");
const { parseNestedObject } = require("../utils/JSONUtils");
const sql = require("mssql");

exports.registerLecturer = async (req, res) => {
  const {
    userName,
    password,
    phoneNumber,
    email,
    street,
    ward,
    district,
    city,
    dateOfBirth,
    gender,
    degrees,
    currentWorkplaceStreet,
    currentWorkplaceWard,
    currentWorkplaceDistrict,
    currentWorkplaceCity,
  } = req.body;

  try {
    const hashedPassword = await hashPassword(password);

    const result = await executeProcedure("RegisterLecturer", [
      { name: "UserName", type: sql.NVarChar, value: userName },
      { name: "Password", type: sql.Char, value: hashedPassword },
      { name: "PhoneNumber", type: sql.NVarChar, value: phoneNumber },
      { name: "Email", type: sql.VarChar, value: email },
      { name: "Street", type: sql.NVarChar, value: street },
      { name: "Ward", type: sql.NVarChar, value: ward },
      { name: "District", type: sql.NVarChar, value: district },
      { name: "City", type: sql.NVarChar, value: city },
      { name: "DateOfBirth", type: sql.DateTime2, value: dateOfBirth },
      { name: "Gender", type: sql.VarChar, value: gender },
      { name: "Degrees", type: sql.NVarChar, value: degrees },
      {
        name: "CurrentWorkplaceStreet",
        type: sql.NVarChar,
        value: currentWorkplaceStreet,
      },
      {
        name: "CurrentWorkplaceWard",
        type: sql.NVarChar,
        value: currentWorkplaceWard,
      },
      {
        name: "CurrentWorkplaceDistrict",
        type: sql.NVarChar,
        value: currentWorkplaceDistrict,
      },
      {
        name: "CurrentWorkplaceCity",
        type: sql.NVarChar,
        value: currentWorkplaceCity,
      },
    ]);

    const resParse = parseNestedObject(result[0]);

    return res.status(201).json(resParse);
  } catch (error) {
    console.error("Error registering lecturer:", error);
    return res.status(500).json({
      Message: "An error occurred while registering the lecturer.",
      error: error.message,
    });
  }
};

exports.registerStudent = async (req, res) => {
  const {
    userName,
    password,
    phoneNumber,
    email,
    street,
    ward,
    district,
    city,
    dateOfBirth,
    gender,
  } = req.body;

  try {
    const hashedPassword = await hashPassword(password);

    const result = await executeProcedure("RegisterStudent", [
      { name: "UserName", type: sql.NVarChar, value: userName },
      { name: "Password", type: sql.Char, value: hashedPassword },
      { name: "PhoneNumber", type: sql.NVarChar, value: phoneNumber },
      { name: "Email", type: sql.VarChar, value: email },
      { name: "Street", type: sql.NVarChar, value: street },
      { name: "Ward", type: sql.NVarChar, value: ward },
      { name: "District", type: sql.NVarChar, value: district },
      { name: "City", type: sql.NVarChar, value: city },
      { name: "DateOfBirth", type: sql.DateTime2, value: dateOfBirth },
      { name: "Gender", type: sql.VarChar, value: gender },
    ]);

    const resParse = parseNestedObject(result[0]);

    return res.status(201).json(resParse);
  } catch (error) {
    console.error("Error registering student:", error);
    return res.status(500).json({
      Message: "An error occurred while registering the student.",
      error: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = await executeProcedure("LoginUser", [
      { name: "Email", type: sql.VarChar, value: email },
    ]);

    if (!users.length) {
      return res.status(401).json({ Message: "Invalid email or password" });
    }

    const user = parseNestedObject(users[0]);

    const isMatch = await comparePassword(password, user.User.Password);

    if (!isMatch) {
      return res.status(401).json({ Message: "Invalid email or password" });
    }

    delete user.User.Password;

    return res.json(user);
  } catch (error) {
    console.error("Error logging in user:", error);
    return res
      .status(500)
      .json({ Message: "An error occurred while logging in the user." });
  }
};
