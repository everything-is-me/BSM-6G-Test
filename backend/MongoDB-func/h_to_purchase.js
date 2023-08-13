exports = async function ({ query, headers, body }, response) {
  const { id, state } = query;

  // Check if "state" is provided and is either '1' or '0'.
  if (state && parseInt(state) !== 1 && parseInt(state) !== 0) {
    return { message: "state should be either '1' or '0'." };
  }

  // Ensure "state" is a boolean (true or false).
  const stateBool = parseInt(state) === 1;

  // Querying a MongoDB service:
  const doc = context.services
    .get("mongodb-atlas")
    .db("DSM2")
    .collection("fat_edited2");

  // Build the aggregation pipeline for filtering bands based on the provided "id".
  let aggregationPipeline = [];
  if (id) {
    aggregationPipeline.push(
      { $unwind: "$bands" },
      { $match: { "bands.id": parseInt(id) } },
      { $group: { _id: "$_id", bands: { $push: "$bands" } } }
    );
  }

  let bands = await doc.aggregate(aggregationPipeline).toArray();

  if (bands[0].bands[0].regulatorsPermission === false) {
    return {
      message: "Band not allowed to list and / or purchased by Regulators",
    };
  }

  if (bands.length > 0 && bands[0].bands.length > 0) {
    const bandToUpdate = bands[0].bands[0];
    if (stateBool === true) {
      if (!bandToUpdate.listed && bandToUpdate.purchased) {
        return { message: "Band already purchased." };
      } else if (bandToUpdate.listed && bandToUpdate.purchased) {
        return { message: "Error, band cannot be listed and purch true." };
      } else if (bandToUpdate.listed && !bandToUpdate.purchased) {
        const result = await doc.updateOne(
          { "bands.id": parseInt(id) },
          {
            $set: {
              "bands.$.listed": false,
              "bands.$.purchased": true,
            },
          }
        );
        if (result.modifiedCount === 1) {
          return {
            message:
              "Band listed new state: " +
              false +
              ", and purchased new state: " +
              true,
          };
        } else {
          return { message: "Band not found or purchased field not updated." };
        }
      } else if (!bandToUpdate.listed && !bandToUpdate.purchased) {
        return { message: "Band not listed." };
      } else {
        return { message: "Error" };
      }
    } else if (stateBool === false) {
      if (bandToUpdate.listed && !bandToUpdate.purchased) {
        return { message: "No update needed." };
      } else if (!bandToUpdate.listed && bandToUpdate.purchased) {
        const result = await doc.updateOne(
          { "bands.id": parseInt(id) },
          { $set: { "bands.$.purchased": false } }
        );
        if (result.modifiedCount === 1) {
          return { message: "Band purchased new state: " + false };
        } else {
          return { message: "Band not found or purchased field not updated." };
        }
      } else if (!bandToUpdate.listed && !bandToUpdate.purchased) {
        return { message: "No update needed." };
      } else {
        return { message: "Error, band cannot be listed and purchased true." };
      }
    }
  } else {
    return { message: "Band not found." };
  }
};
