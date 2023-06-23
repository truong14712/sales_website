import instance from "./instance";
import { AxiosResponse } from "axios";
import { AuthType } from "../interface/auth";
export const signup = (user: AuthType) => {
  return instance.post("/auth/signup", user);
};
export const signin = (user: AuthType):Promise<AxiosResponse> => {
  return instance.post("/auth/signin", user);
};