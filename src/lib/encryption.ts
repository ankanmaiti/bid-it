import bcrypt from "bcrypt";

export async function encryptString(str: string) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(str, saltRounds);

  return {
    hash,
    success: await bcrypt.compare(str, hash),
  } as const;
}
