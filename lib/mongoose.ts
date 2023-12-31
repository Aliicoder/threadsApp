import mongoose from "mongoose";

let isConnected = false;
export const connectToDB = async ():Promise<void> =>
{
  mongoose.set("strictQuery", true);
  if(!process.env.MONGODB_URL)  return 
  //console.log(process.env.MONGODB_URL) 
  if(isConnected) return   
  await mongoose.connect('mongodb+srv://kcoc3000:JBJ6tZBTbPAg74T4@cluster0.ivqfhsd.mongodb.net/?retryWrites=true&w=majority')
  isConnected=true
}