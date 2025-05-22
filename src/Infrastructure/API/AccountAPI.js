// src/Infrastructure/API/AccountAPI.js

export const changePasswordAPI = async ({ oldPassword, newPassword }) => {
  return await fetch("https://localhost:5107/api/account/change-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ oldPassword, newPassword }),
  });
};

export const fetchUserProfileAPI = async () => {
  return await fetch("https://localhost:5107/api/account/me", {
    credentials: "include",
  });
};

export const updateUserProfileAPI = async (profile) => {
  return await fetch("https://localhost:5107/api/account", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(profile),
  });
};
