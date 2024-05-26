"use server";

import { userType } from "@/lib/schemas";
import { validateUserData } from "./helpers";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { lucia } from "@/lib/auth";
import { User } from "@prisma/client";
import { cookies } from "next/headers";

export const signUpAction = async (data: userType) => {
  // validate data
  const validatedUserInput = validateUserData(data);

  const hashedpass = await bcrypt.hash("example", 10);
  validatedUserInput.hashedpassword = hashedpass;

  // sanitize data

  // insert data into db
  const dbInsertResponce = await addUserInDb(validatedUserInput, hashedpass);
  // afetr above operation completion let create session in db
  // this will create session in be via lucai in session table automatically
  if (dbInsertResponce.success === false) {
    return dbInsertResponce;
  }
  // creat session in db and add session in cookies
  if (dbInsertResponce?.success) {
    const createdSessionResponce = await createSessionInDb(
      dbInsertResponce.user
    );

    return createdSessionResponce;
  }
};

const addUserInDb = async (
  validatedUserInput: userType,
  hashedpass: string
) => {
  let user: User;
  try {
    user = await prisma.user.create({
      data: { ...validatedUserInput, hashedpassword: hashedpass },
    });

    if (!user) {
      return {
        success: false,
        error: { message: "failed to  insert user in db " },
      };
    }

    return {
      success: true,
      user: user,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};

const createSessionInDb = async (user) => {
  console.log("started creating sessions ------------------------------------");

  if (user.success && user.user) {
    const session = await lucia.createSession("dgdsajdsagdsg", {
      expiresAt: new Date(Date.now() + 300),
    });

    console.log(session.userId);
    console.log("ended creating session------------------------------------- ");
  }

  // if (!session) {
  //   return {
  //     success: false,
  //     error: {
  //       message: "failed to create session ",
  //     },
  //   };
  // }

  // const sessionCookie = lucia.createSessionCookie(session.id);
  // console.log(sessionCookie);

  // cookies().set("hoa", "valuex");

  // return { sucess: true, data: { user: user.id } };
};
