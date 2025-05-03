import mongoose from 'mongoose';


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Set the timeout for server selection (5 seconds)
      socketTimeoutMS: 45000, // Set socket timeout (45 seconds)
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process in case of connection failure
  }
};

export default connectDB;
