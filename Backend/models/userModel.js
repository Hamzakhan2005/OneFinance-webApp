import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = mongoose.Schema({
  phone_number: {
    type: Number,
    requirerd: true,
  },
  email: {
    type: String,
    required: true,
  },
});

userSchema.plugin(passportLocalMongoose);

export const User = mongoose.model("User", userSchema);
