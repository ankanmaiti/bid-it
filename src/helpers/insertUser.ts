import { ApiError } from "@/helpers/apiError";
import { StatusCodes } from "http-status-codes";
import { db } from "../db";
import { InsertUser, users } from "../db/schemas/user.schemas";

export async function insertUserIntoDB(newUser: InsertUser) {
  try {
    const [user] = await db
      .insert(users)
      .values(newUser)
      .onConflictDoNothing()
      .returning({
        name: users.name,
        email: users.email,
        createdAt: users.createdAt,
      });

    return user;
  } catch (error) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Something went wrong while inserting user into db",
    );
  }
}
