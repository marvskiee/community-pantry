export const getGuidelines = async () => {
  const res = await fetch("/api/guideline", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const result = await res.json();
  return result;
};

export const setGuidelines = async (id, newData) => {
  const res = await fetch("/api/guideline/update/" + id, {
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

export const newGuidelines = async () => {
  const res = await fetch("/api/guideline", {
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
