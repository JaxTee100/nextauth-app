import mongoose, {Document, Model, Schema} from "mongoose";


interface IUser extends Document{
    name: string;
    email: string;
    password?: string;
    phoneNumber: string;
    country: string;
    id: string;
}


const UserSchema: Schema<IUser> = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true,
        unique: true
    },
    country: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true, // Ensure it's required
        validate: {
            validator: function (v: string) {
                return /^\d{10,15}$/.test(v); // Validates 10-15 digits
            },
            message: (props) => `${props.value} is not a valid phone number!`,
        },
    },
   
})
mongoose.set('debug', true);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
export default User