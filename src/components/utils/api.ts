export const postRequest = <T>(body: T) => {
  return fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        return {
          error: res,
          message: `An error with status ${res.status} occured`,
        };
      }

      return res.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
