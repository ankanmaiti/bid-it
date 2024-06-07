import { insertUserIntoDB } from "@/helpers/insertUser";
import { ApiError } from "@/helpers/apiError";
import { ApiResponse } from "@/helpers/apiResponse";
import { asyncHandler } from "@/helpers/asyncHandler";
import { encryptString } from "@/lib/encryption";
import { userSchema } from "@/validations/user.validation";
import { StatusCodes } from "http-status-codes";

/*
 * - validation check
 * - encrypt password
 * - create user if not exists
 */
export const signup = asyncHandler(async function (req: Request) {
  // validation
  const {
    data: validatedData,
    success: isValidated,
    error: validationError,
  } = userSchema.safeParse(await req.json());

  if (!isValidated) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      "validation error",
      validationError.formErrors.fieldErrors,
    );
  }

  // encrypt password
  const { hash: encryptedPassword, success: isPasswordEncrypted } =
    await encryptString(validatedData.password);

  if (!isPasswordEncrypted || !encryptedPassword) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      "Something went wrong while encrypting password",
    );
  }

  // convert dob type string to date
  const [day, month, year] = validatedData.dob.split("-");
  const dob = new Date(`${year}-${month}-${day}`);

  // create user
  const user = await insertUserIntoDB({
    name: validatedData.name,
    email: validatedData.email,
    dob: dob,
    password: encryptedPassword,
  });

  if (!user) {
    throw new ApiError(StatusCodes.CONFLICT, "user already exists");
  }

  return new ApiResponse(
    StatusCodes.CREATED,
    user,
    "user register successfully",
  );
});
