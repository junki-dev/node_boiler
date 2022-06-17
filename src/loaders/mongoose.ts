import mongoose from 'mongoose';

const mongoConnection = async () => {
  await mongoose.connect('mongodb://localhost:270171/mydb');
};

export default mongoConnection;
