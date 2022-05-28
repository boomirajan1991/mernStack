const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb+srv://mernstack:dvRCREtK86roNZZo@cluster0.dsbxv.mongodb.net/tour_db?retryWrites=true&w=majority'
    await mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .catch((error) => console.log(error))
    // const connection = mongoose.connection
    // console.log(connection)
    console.log('MONGODB CONNECTED SUCCESSFULLY!')
  } catch (error) {
    console.log(error)
    return error
  }
}

module.exports = connectDB
