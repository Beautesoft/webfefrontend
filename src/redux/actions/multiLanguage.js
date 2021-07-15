import { multiLanguage } from "service/apiVariables";

//get language data
export const getMultiLanguage =
  (body) =>
  (dispatch, getState, { api, Toast }) => {
    return new Promise((resolve, reject) => {
      api({ ...multiLanguage.getMultiLanguage, body })
        .then((response) => {
          resolve(response);
          let { status } = response;
          if (status !== 200)
            reject(Toast({ type: "error", message: "Multi Language Failed" }));
        })
        .catch(({ message }) => {
          reject(Toast({ type: "error", message }));
        });
    });
  };
