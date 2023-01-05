import mongoose from 'mongoose'

mongoose.connect("mongodb+srv://jean:jean@cluster0.n6g726d.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log('✅ Successfully connected to the database'))
  .catch((e) => console.log(`⛔️ Error during database connection ${e}`))