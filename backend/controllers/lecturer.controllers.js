const { executeProcedure } = require("../config/db.config");
const { parseNestedObject } = require("../utils/JSONUtils");
const sql = require("mssql");

exports.getLecturerById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await executeProcedure("GetLecturerById", [
      { name: "UserId", type: sql.UniqueIdentifier, value: id },
    ]);

    if (!result.length || !result[0].LecturerProfile) {
      return res.status(404).json({ Message: "Lecturer not found" });
    }

    const lecturerProfile = parseNestedObject(result[0]);

    return res.json(lecturerProfile);
  } catch (error) {
    console.error("Error retrieving lecturer information:", error);
    return res.status(500).json({
      Message: "An error occurred while retrieving the lecturer's information.",
      error: error.message,
    });
  }
};
