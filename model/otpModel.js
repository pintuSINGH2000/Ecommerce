import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    otp:{
        type: String,
        required:true,
        trim: true
    },
    email:{
        type:String,
        required: true,
    },
    timestamp:{
        type:String,
        required: true
    },
    isotplogin:{
        type:Number,
        default:0
    }
});

export default mongoose.model('otps',otpSchema);