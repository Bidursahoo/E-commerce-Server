const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const multer = require("multer");
const { app } = require("../Configs/FirebaseConfig");
const formidable = require('formidable');
const form = new formidable.IncomingForm();

const storage = getStorage(app);
const upload = multer({ storage: multer.memoryStorage(), limits: { files: 5 } });

const uploadFilesMiddleware = async (req, res, next) => {
  try {
    if(req.method !== 'POST'){
        next();
    }
    form.parse(req, async function(err, fields, files) {
        // `file` is the name of the <input> field of type `file`
        // console.log();
        const fileed =  files.files;
        const fild = fields;
        if (!fileed || fileed.length === 0) {
            return next(); // No files, pass control to the next middleware
          }
          const downloadURLs = [];

          // Process each uploaded file
          console.log(fileed)
          for (const file of fileed) {
            const dateTime = Date.now();
            const storageRef = ref(storage, `files/${file.originalFilename} `);
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
          const jsonObject = Object.fromEntries(
              Object.entries(fild).map(([key, value]) => [
                key,
                key === 'available' ? value[0] === 'true' : isNaN(value[0]) ? value[0] : Number(value[0]),
              ])
            );
          req.jsonData = jsonObject;
          console.log("Files uploaded successfully!");
          req.downloadURLs = downloadURLs; // Attach the download URLs to the request
          next(); // Pass control to the next middleware
    });
    
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "An error occurred while uploading the files." });
  }
};

module.exports = uploadFilesMiddleware;
