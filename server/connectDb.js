import mongoose from 'mongoose'

const connectDB = async () =>{
    try{
        const conn = await mongoose.connect('mongodb+srv://Admin:1234@fordifferntthings.f4rjd.mongodb.net/Chebyrnet', {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })

        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch(err) {
        console.log(err.message);
        process.exit(1)
    }
}

export default connectDB