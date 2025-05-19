import * as AuthAPI from "@/Infrastructure/API/AuthAPI";

export const loginUser = async ({ email, password }) => {
  const user = await AuthAPI.login(email, password);
  return user; // evt. tilføj localStorage eller context her
};

export const registerUser = async ({ email, password, username }) => {
  const result = await AuthAPI.register(email, password, username);
  return result;
};

export const fetchCurrentUser = async () => {
  return await AuthAPI.getMe();
};

export const logoutUser = async () => {
  return await AuthAPI.logout();
};
