import mongoose from 'mongoose'

const connectDB = () => {
  const URI = `${process.env.MONGODB_URI}${process.env.MONGODB_NAME}`
  mongoose.connect(URI, {
    user: process.env.MONGODB_USER,
    pass: process.env.MONGODB_PASSOWORD,
  })

  mongoose.connection.once('open', () => console.log('Database started'))

  mongoose.connection.on('error', () => console.log('Error to connect database'))
}

export default connectDB
