const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const router = require("express").Router();
const multer = require("multer");
const { app } = require("../../Configs/FirebaseConfig");

const storage = getStorage(app); // Initialize storage after initializing the app
const upload = multer({ storage: multer.memoryStorage(), limits: { files: 5 } });

router.post("/uploadFiles", upload.array("files", 5), async (req, res) => {
  try {
    const downloadURLs = [];

    // Process each uploaded file
    for (const file of req.files) {
      const dateTime = Date.now();
      const storageRef = ref(storage, `files/${file.originalname} ${dateTime}`);
      const metaData = {
        contentType: file.mimetype,
      };

      const snapShot = await uploadBytesResumable(storageRef, file.buffer, metaData);
      const downloadURL = await getDownloadURL(snapShot.ref);

      downloadURLs.push({
        name: file.originalname,
        type: file.mimetype,
        downloadURL: downloadURL,
      });
    }

    console.log("Files uploaded successfully!");
    return res.status(200).send(downloadURLs);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "An error occurred while uploading the files." });
  }
});

module.exports = router;
