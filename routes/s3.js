var express = require("express");
var router = express.Router();
const AWS = require("aws-sdk");

router.post("/store", (req, res) => {
  var bucketName = "n10164138-aws-bucket";
  var s3Key = req.query;
  var body = req.body;

  //   const params = { Bucket: bucketName, Key: s3Key, Body: body };
  //   try {
  //     const uploadPromise = new AWS.S3({ apiVersion: "2006-03-01" })
  //       .putObject(params)
  //       .promise();
  //     uploadPromise
  //       .then((data) => {
  //         console.log(
  //           "Successfully uploaded data to " + bucketName + "/" + s3Key
  //         );
  //       })
  //       .then(() => {
  //         res.status(200).send("done");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
});

module.exports = router;
