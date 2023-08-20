//Trigger function to change band.regulatorsPermission

exports = async function (changeEvent) {
  const docId = changeEvent.documentKey._id;

  const serviceName = "mongodb-atlas";
  const database = "DSM2"; // The database where the collections are located
  const regulatorsCollection = context.services
    .get(serviceName)
    .db(database)
    .collection("regulators");
  const fatEdited2Collection = context.services
    .get(serviceName)
    .db(database)
    .collection("fat_edited2");

  try {
    const regulatorsDoc = await regulatorsCollection.findOne({});
    const fatEdited2Doc = await fatEdited2Collection.findOne({});

    if (regulatorsDoc && fatEdited2Doc) {
      const rules = regulatorsDoc.rules;

      // Find rules
      const catRule = rules.find((rule) => rule.id === 0);
      const rangeRule = rules.find((rule) => rule.id === 1);

      // Update bands within the scenearios
      if (catRule.state && rangeRule.state) {
        fatEdited2Doc.bands.forEach((band) => {
          if (
            band.cat === "S" &&
            band.lf > rangeRule.range.lf &&
            band.uf < rangeRule.range.uf
          ) {
            band.regulatorsPermission = true;
          } else {
            band.regulatorsPermission = false;
          }
        });
      } else if (!catRule.state && !rangeRule.state) {
        fatEdited2Doc.bands.forEach((band) => {
          band.regulatorsPermission = true;
        });
      } else if (catRule.state && !rangeRule.state) {
        fatEdited2Doc.bands.forEach((band) => {
          if (band.cat === "S") {
            band.regulatorsPermission = true;
          } else {
            band.regulatorsPermission = false;
          }
        });
      } else if (!catRule.state && rangeRule.state) {
        fatEdited2Doc.bands.forEach((band) => {
          if (band.lf > rangeRule.range.lf && band.uf > rangeRule.range.uf) {
            band.regulatorsPermission = true;
          } else {
            band.regulatorsPermission = false;
          }
        });
      }

      await fatEdited2Collection.updateOne(
        { _id: fatEdited2Doc._id },
        { $set: { bands: fatEdited2Doc.bands } }
      );
    }
  } catch (err) {
    console.log("error performing mongodb write: ", err.message);
  }
};
