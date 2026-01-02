"use server";

import connectMongoDB from "@/lib/mongodb/connection";
import userModel from "@/models/user_model";
import { LoginType } from "@/schema/login.schema";

export async function loginUser(data: LoginType) {
  await connectMongoDB();

  const user = await userModel.findOne({ name: data.userName });
  if (!user) {
    throw new Error("Invalid username or password");
  }

  const isMatch = data.password === user.password;
  if (!isMatch) {
    throw new Error("Invalid username or password");
  }

  // Return minimal user info (for localStorage)
  return {
    success: true,
    user: {
      id: user._id.toString(),
      name: user.name,
    },
  };
}

// export async function addUser(data: LoginType) {
//   await connectMongoDB();

//   const existingUser = await userModel.findOne({ name: data.userName });
//   if (existingUser) {
//     throw new Error("Username already taken");
//   }

//   const hashedPassword = await bcrypt.hash(data.password, 10);

//   const newUser = await userModel.create({
//     name: data.userName,
//     password: hashedPassword,
//   });

//   return {
//     success: true,
//     message: "User created successfully",
//     user: {
//       id: newUser._id.toString(),
//       name: newUser.name,
//     },
//   };
// }
