const { connectToDatabase } = require("./api.js");
const Task = require("../../app/models/db/wallet.js");

exports.handler = async (event) => {
  try {
    await connectToDatabase();

    const { httpMethod, path, body } = event;
    const pathSegments = path.split("/").filter(Boolean);

    if (httpMethod === "POST" && pathSegments.includes("post")) {
      const requestBody = JSON.parse(body || "{}");
      console.log(requestBody);

      if (
        requestBody.amount === undefined ||
        typeof requestBody.amount !== "number"
      ) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            message: "Missing or invalid required fields",
          }),
        };
      }

      const data = new Wallet({
        amount: requestBody.amount,
      });

      const dataToSave = await data.save();
      return {
        statusCode: 200,
        body: JSON.stringify(dataToSave),
      };
    } else if (httpMethod === "GET" && pathSegments.length === 1) {
      const data = await Wallet.find().limit(1);
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    } else if (httpMethod === "PATCH" && pathSegments.includes("update")) {
      const requestBody = JSON.parse(body || "{}");
      const id = process.env.WALLET_ID;

      if (
        requestBody.amount === undefined ||
        typeof requestBody.amount !== "number"
      ) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            message: "Missing or invalid required fields",
          }),
        };
      }

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "Invalid ID format" }),
        };
      }

      const result = await Wallet.findByIdAndUpdate(id, requestBody, {
        new: true,
      })
        .then((updatedDocument) => {
          console.log("Document updated successfully:", updatedDocument);
          return updatedDocument;
        })
        .catch((error) => {
          console.error("Error updating document:", error);
          throw error;
        });

      return {
        statusCode: 200,
        body: JSON.stringify(result),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Route not found" }),
      };
    }
  } catch (error) {
    console.error("Error in wallet handler:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
