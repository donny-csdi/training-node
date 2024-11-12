import fs from "fs";

import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import { JwtPayload } from "jsonwebtoken";
import env from "../config/env.config";
import { createError, readJSONFile, writeJSONFile } from "../utils";
import { generateRefreshToken, generateToken, verifyToken } from "../utils/jwt";
import { IUser } from "../interfaces";

let refreshTokens: string[] = [];

const usersFile = "users.json";
const register = async (username: string, password: string) => {
  const users = readJSONFile(usersFile);

  const userExists = users.some((user: IUser) => user.username === username);

  if (userExists) {
    throw createError("User already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: uuid(),
    username,
    password: hashedPassword,
  };

  users.push(newUser);

  writeJSONFile(usersFile, users);

  return {
    id: newUser.id,
    username: newUser.username,
  };
};

const login = async (username: string, password: string) => {
  const users = readJSONFile(usersFile);

  const user = users.find((user: IUser) => user.username === username);

  if (!user) {
    throw createError("User not found", 404);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw createError("Invalid password", 400);
  }

  const accessToken = generateToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  refreshTokens.push(refreshToken);

  return { accessToken, refreshToken };
};

const refreshToken = async (refreshToken: string) => {
  if (!refreshTokens.includes(refreshToken)) {
    throw createError("Invalid refresh token", 400);
  }

  const decodedToken = verifyToken(
    refreshToken,
    env.REFRESH_TOKEN_SECRET
  ) as JwtPayload;

  const user = readJSONFile(usersFile).find(
    (user: IUser) => user.id === decodedToken.userId
  );

  if (!user) {
    throw createError("User not found", 404);
  }

  const accessToken = generateToken(user.id);
  const newRefreshToken = generateRefreshToken(user.id);

  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  refreshTokens.push(newRefreshToken);

  return { accessToken, refreshToken: newRefreshToken };
};

const SAuth = {
  register,
  login,
  refreshToken,
};

export default SAuth;
