const { parseNestedObject } = require("../utils/JSONUtils");
const { executeProcedure } = require("../config/db.config");
const sql = require("mssql");

const getAllCourses = async (req, res) => {
  try {
    const result = await executeProcedure("GetAllCourses");
    const resParse = parseNestedObject(result);
    return res.status(201).json({ courses: resParse });
  } catch (error) {
    console.error("Error occurred during getting courses:", error);
    return res.status(500).json({
      Message: "Error occurred during getting courses.",
      error: error.message,
    });
  }
};

const getCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await executeProcedure("GetCourseById", [
      { name: "CourseId", type: sql.UniqueIdentifier, value: id },
    ]);

    if (!result.length) {
      throw new Error("Course not found");
    }

    const resParse = parseNestedObject(result[0]);

    res.status(201).json({ course: resParse });
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    res
      .status(500)
      .json({ Message: "Error occurred while fetching course details" });
  }
};

const addCartItem = async (req, res) => {
  const { cartId, courseId } = req.body;

  try {
    const result = await executeProcedure("AddCartItem", [
      { name: "CartId", type: sql.UniqueIdentifier, value: cartId },
      { name: "CourseId", type: sql.UniqueIdentifier, value: courseId },
    ]);

    const message = result[0]?.Message || "No message returned";

    return res.status(201).json({ Message: message });
  } catch (error) {
    console.error("Error occurred during adding cart item:", error);
    return res.status(500).json({
      Message: "Error occurred while adding cart item.",
      error: error.message,
    });
  }
};

const removeCartItem = async (req, res) => {
  const { cartId, courseId } = req.body;

  try {
    const result = await executeProcedure("RemoveCartItem", [
      { name: "CartId", type: sql.UniqueIdentifier, value: cartId },
      { name: "CourseId", type: sql.UniqueIdentifier, value: courseId },
    ]);

    const message = result[0]?.Message || "No message returned";
    const errorCode = result[0]?.ErrorCode || 0;

    if (errorCode === 0) {
      return res.status(200).json({ Message: message });
    } else {
      return res.status(400).json({
        Message: message,
        ErrorDetail: result[0]?.ErrorDetail || "No error details returned",
        Severity: result[0]?.Severity,
        State: result[0]?.State,
      });
    }
  } catch (error) {
    console.error("Error occurred during removing cart item:", error);
    return res.status(500).json({
      Message: "Error occurred while removing cart item.",
      error: error.message,
    });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  addCartItem,
  removeCartItem,
};
