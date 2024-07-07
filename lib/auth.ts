import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

export const getJwtSecretKey = () => {
  const secret = "fsdokfsodfewfovovkwldmcowmv";

  if (!secret || secret.length === 0) {
    throw new Error("The environment variable JWT_SECRET_KEY is not set.");
  }

  return secret;
};

const alg = "HS256";

async function createToken(payload: JWTPayload) {
  try {
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setIssuer("urn:example:issuer")
      .setAudience("urn:example:audience")
      .setExpirationTime("12 hrs")
      .sign(new TextEncoder().encode(getJwtSecretKey()));
    return token;
  } catch (err) {
    throw err;
  }
}

const verifyAuth = async (token: string) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey())
    );
    return verified.payload as { id: string; role: string };
  } catch (ex) {
    throw new Error("Error occurred while trying to verifying the token.");
  }
};

const getSession = async () => {
  let session = cookies().get("session")?.value;
  const authUser = session && (await verifyAuth(session).catch((ex) => {}));

  return authUser;
};

const setSession = async (data: JWTPayload) => {
  const token = await createToken(data);

  cookies().set("session", token, { httpOnly: true });
};

export { createToken, verifyAuth, getSession, setSession };
