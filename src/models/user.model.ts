import mongoose from "mongoose";
import bcrypt from "bcrypt";
export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next: any) {
  let user = this as UserDocument;
  if (!user.isModified("password")) {
    return next();
  }
  try {
    const salt = Number(process.env.NODE_ENV_SALT) ?? "";
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    return next();
  } catch (error: any) {
    next(error);
  }
});
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;
  return bcrypt
    .compare(candidatePassword, user.password)
    .catch((error: any) => false);
};
const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;
