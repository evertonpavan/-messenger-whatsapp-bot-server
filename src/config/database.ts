import { connect } from "mongoose";

const { MONGO_URI } = process.env;

const connectionOptions = { useUnifiedTopology: true }

const connectDB = async () => {
    try {
        const mongooseConnecteded = await connect(MONGO_URI || "");
        console.log("Mongo database connected!");
        return mongooseConnecteded
    } catch (err: any) {
        console.error(err);
        // Exit process with failure
        process.exit(1);
    }
};

export default connectDB;