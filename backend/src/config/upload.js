import multer from "multer"

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "text/csv") {
      cb(new Error("Only CSV files allowed"))
    }
    cb(null, true)
  }
})

export default upload
