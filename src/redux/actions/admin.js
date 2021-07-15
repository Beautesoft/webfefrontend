import { adminApi } from "service/apiVariables";

export const createAdmin = body => (dispatch, getState, { api, Toast }) => {
    return new Promise((resolve, reject) => {
        api({ ...adminApi.createAdmin, body }).then(({ message }) => {
            resolve(Toast({ type: "success", message }));
        }).catch(({ message }) => {
            reject(Toast({ type: "error", message }));
        });
    });
};