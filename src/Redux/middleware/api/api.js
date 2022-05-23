// @ts-nocheck
import ACTIONS from "./actionTypes";
import { toast } from "react-toastify";
import { apiError, apiStart, apiSuccess } from "./actions";

const baseUrl = `https://dataservice.accuweather.com/`;
const apiKey = "JPFQnX6PUHAU257PGCDgGPAOIBVvAWKI";

 const apiMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action.type !== ACTIONS.API) return next(action);

    const { label = "" } = action.payload;
    dispatch(apiStart(label));

    let {
      endpoint = "",
      method = "GET",
      data = {},
      headers = {},
      onSuccess = () => ({ type: "" }),
      onError = () => ({ type: "" }),
      callback = () => {},
    } = action.payload;

    data.apikey = apiKey;

    let url = baseUrl + endpoint;
    let options = { method, mode: 'cors', redirect: 'follow', headers };

    if (method === "GET") {
      const queryString = Object.keys(data)
        .map((key) => key + "=" + data[key])
        .join("&");
      url += "?" + queryString;
    }

    fetch(url, options)
      .then(async (res) => {
        const data = await res.json();

        dispatch(apiSuccess(label, data));
        dispatch(onSuccess(data));

        if (typeof callback === "function") return callback(data);
      })
      .catch((err) => {
        dispatch(apiError(label, err));
        dispatch(onError(err));
        toast.error(
          "An error has occurred while fetching fata. Try again later.",
          { toastId: "toast-error-api" }
        );
      });
  };

  export default apiMiddleware;