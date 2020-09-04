import { API } from "../config";

//create a product
//no content type because we are submitting a form data
export const createProduct = (userId, token, product) => {
  //send request to the backend
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
