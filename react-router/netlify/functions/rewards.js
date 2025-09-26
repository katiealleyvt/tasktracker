const { connectToDatabase } = require("./api.js");
const Reward = require("../../app/models/db/reward.js");

exports.handler = async (event) => {
  try {
    await connectToDatabase();

    const { httpMethod, path, body } = event;
    const pathSegments = path.split("/").filter(Boolean);
    const id = pathSegments.length > 2 ? pathSegments[2] : null;

    if (httpMethod === "POST" && pathSegments.includes("post")) {
      const requestBody = JSON.parse(body || "{}");
      console.log(requestBody);

      const data = new Reward({
        name: requestBody.name,
        cost: requestBody.cost,
        isArchived: requestBody.isArchived,
      });

      const dataToSave = await data.save();
      return {
        statusCode: 200,
        body: JSON.stringify(dataToSave),
      };
    } else if (httpMethod === "GET" && pathSegments.includes("getAll")) {
      const data = await Reward.find();
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    } else if (httpMethod === "GET" && pathSegments.includes("getOne") && id) {
      const data = await Reward.findById(id);
      if (!data) {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: "Reward not found" }),
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
      console.log("Updated data", updatedData);
      const options = { new: true };
      const result = await Reward.findByIdAndUpdate(id, updatedData, options);
      if (!result) {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: "Reward not found" }),
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
      const data = await Reward.findByIdAndDelete(id);
      if (!data) {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: "Reward not found" }),
        };
      }
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: `Reward with name ${data.name} has been deleted.`,
        }),
      };
    }

    // Route not found
    else {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Route not found" }),
      };
    }
  } catch (error) {
    console.error("Error in rewards handler:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
