const multer = require('multer')
const path = require('path')

const storeImageToFolder = (uploadFolder) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./public/uploads/${uploadFolder}`)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '_' + uniqueSuffix + path.extname(file.originalname))
    }
  })
  return multer({ storage })
}

module.exports = { storeImageToFolder }
