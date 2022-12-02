export const registerUser = async (newData) => {
  const res = await fetch("/api/user", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  const result = await res.json();
  return result;
};

export const updateUser = async (newData, id) => {
  const res = await fetch("/api/user/" + id, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  const result = await res.json();
  return result;
};

export const authLogin = async (newData) => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  const result = await res.json();
  return result;
};

export const getUser = async () => {
  const res = await fetch("/api/auth/checkAuth", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const result = await res.json();
  return result;
};

export const authLogout = async () => {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const result = await res.json();
  return result;
};

export const changePassword = async (newData) => {
  const res = await fetch("/api/user/change_password/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  const result = await res.json();
  return result;
};

export const changeUsername = async (newData) => {
  const res = await fetch("/api/user/change_username/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  const result = await res.json();
  return result;
};
export const idChecker = async (id) => {
  const res = await fetch("/api/user/update/" + id, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: true }),
  });
  const result = await res.json();
  return result;
};

export const updatePassword = async (id, newData) => {
  const res = await fetch("/api/user/update/" + id, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  const result = await res.json();
  return result;
};
