import { Document, model, Schema } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
export type TSession = {
    name: string;
};

export interface ISession extends TSession, Document { }

// 2. Create a Schema corresponding to the document interface.
const sessionSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
});

// 3. Create a Model.
const Session = model<ISession>("Session", sessionSchema);

export default Session;