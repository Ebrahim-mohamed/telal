// models/User.ts
import mongoose, {Schema} from 'mongoose';

interface IUser {
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
    },
    {timestamps: true}
);

// Check if model exists before creating a new one (avoid model overwrite error during hot reloads)
const userModel = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default userModel;