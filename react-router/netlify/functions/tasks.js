const { connectToDatabase } = require("./api.js");
const Task = require("../../app/models/db/task.js");

exports.handler = async (event) => {
  try {
    await connectToDatabase();

    const { httpMethod, path, queryStringParameters, body } = event;
    const pathSegments = path.split("/").filter(Boolean);
    const id = pathSegments.length > 2 ? pathSegments[2] : null;

    if (httpMethod === "POST" && pathSegments.includes("post")) {
      const requestBody = JSON.parse(body || "{}");
      if (
        !requestBody.name ||
        typeof requestBody.points !== "number" ||
        !requestBody.status
      ) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            message: "Missing or invalid required fields",
          }),
        };
      }

      const data = new Task({
        name: requestBody.name,
        points: requestBody.points,
        status: requestBody.status,
      });

      const dataToSave = await data.save();
      return {
        statusCode: 200,
        body: JSON.stringify(dataToSave),
      };
    } else if (httpMethod === "GET" && pathSegments.includes("getAll")) {
      const data = await Task.find();
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    } else if (httpMethod === "GET" && pathSegments.includes("getOne") && id) {
      const data = await Task.findById(id);
      if (!data) {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: "Task not found" }),
        };
      }
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    } else if (
      httpMethod === "PATCH" &&
      pathSegments.includes("update") &&
      id
    ) {
      const updatedData = JSON.parse(body || "{}");
      const options = { new: true };
      const result = await Task.findByIdAndUpdate(id, updatedData, options);
      if (!result) {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: "Task not found" }),
        };
      }
      return {
        statusCode: 200,
        body: JSON.stringify(result),
      };
    } else if (
      httpMethod === "DELETE" &&
      pathSegments.includes("delete") &&
      id
    ) {
      const data = await Task.findByIdAndDelete(id);
      if (!data) {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: "Task not found" }),
        };
      }
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: `Task with name ${data.name} has been deleted.`,
        }),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Route not found" }),
      };
    }
  } catch (error) {
    console.error("Error in tasks handler:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
