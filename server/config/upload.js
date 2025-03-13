const path = require('path')

const fs = require('fs')
const multer = require('multer')

const uploadPath = path.join(__dirname, '../../server/public/uploads/dishes')

const createDir = () => {
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true })
  }
}
createDir()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})

module.exports = multer({ storage })