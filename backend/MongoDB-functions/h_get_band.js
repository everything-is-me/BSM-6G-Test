//HTTPS Endpoint function to get band
// This function is the endpoint's request handler.
exports = async function ({ query, headers, body }, response) {
  // Data can be extracted from the request as follows:

  // Query params, e.g. '?arg1=hello&arg2=world' => {arg1: "hello", arg2: "world"}
  const { id, cat } = query;

  // Querying a mongodb service:
  const doc = context.services
    .get("mongodb-atlas")
    .db("DSM2")
    .collection("fat_edited2");

  // Build the aggregation pipeline for filtering bands based on the provided "id"
  let aggregationPipeline = [];
  if (id) {
    aggregationPipeline.push(
      { $unwind: "$bands" },
      { $match: { "bands.id": parseInt(id) } },
      { $group: { _id: "$_id", bands: { $push: "$bands" } } }
    );
  } else if (cat) {
    aggregationPipeline.push(
      { $unwind: "$bands" },
      { $match: { "bands.cat": cat } },
      { $group: { _id: "$_id", bands: { $push: "$bands" } } }
    );
  }

  let bands = await doc.aggregate(aggregationPipeline).toArray();

  return bands.length > 0 ? bands[0].bands : [];
};
