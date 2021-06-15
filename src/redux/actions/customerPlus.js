import { CustomerPlusActionType } from "redux/actions/actionType";
import { customerPlus, lpManagement } from "../../service/apiVariables";

// create customer action
export const CreateCustomerPlus =
  (body) =>
  (dispatch, getState, { api, Toast }) => {
    return new Promise((resolve, reject) => {
      api({
        ...customerPlus.addCustomerPlus,
        body,
        header: { type: "Content-Type", value: "application/json" },
      })
        .then((response) => {
          resolve(response);
          let { message, status } = response;
          if (status === 200) {
            // dispatch({ type: ArticalsActionType.getArticalsDetails, payload: data });
            Toast({ type: "success", message });
          } else {
            reject(Toast({ type: "error", message }));
          }
        })
        .catch(({ message }) => {
          reject(Toast({ type: "error", message }));
        });
    });
  };

// update customer action
export const updateCustomerPlus =
  (id, body) =>
  (dispatch, getState, { api, Toast }) => {
    return new Promise((resolve, reject) => {
      customerPlus.updateCustomerPlus.addQuery = { key: "id", payload: id };
      api({
        ...customerPlus.updateCustomerPlus,
        body,
        header: { type: "Content-Type", value: "application/json" },
      })
        .then((response) => {
          resolve(response);
          let { message, status } = response;
          if (status === 200) {
            // dispatch({ type: ArticalsActionType.getArticalsDetails, payload: data });
            Toast({ type: "success", message });
          } else {
            reject(Toast({ type: "error", message }));
          }
        })
        .catch(({ message }) => {
          reject(Toast({ type: "error", message }));
        });
    });
  };

// get customer action
export const getCustomerPlus =
  (id) =>
  (dispatch, getState, { api, Toast }) => {
    return new Promise((resolve, reject) => {
      customerPlus.getCustomerPlus.addQuery = { key: "id", payload: id };

      api({ ...customerPlus.getCustomerPlus })
        .then((response) => {
          resolve(response);
          let { message, status, data } = response;
          if (status === 200) {
            dispatch({
              type: CustomerPlusActionType.getCustomerPlusDetail,
              payload: data,
            });
            // Toast({ type: 'success', message })
          } else {
            reject(Toast({ type: "error", message }));
          }
        })
        .catch(({ message }) => {
          reject(Toast({ type: "error", message }));
        });
    });
  };

// get customer settings action
export const getCustomerPlusSettings =
  (id) =>
  (dispatch, getState, { api, Toast }) => {
    return new Promise((resolve, reject) => {
      if (id)
        customerPlus.getCustomerPlusSettings.addQuery = {
          key: "id",
          payload: id,
        };

      api({ ...customerPlus.getCustomerPlusSettings })
        .then((response) => {
          resolve(response);
          let { message, status, data } = response;
          if (status === 200) {
            dispatch({
              type: CustomerPlusActionType.getCustomerPlusSettings,
              payload: data,
            });
            // Toast({ type: 'success', message })
          } else {
            reject(Toast({ type: "error", message }));
          }
        })
        .catch(({ message }) => {
          reject(Toast({ type: "error", message }));
        });
    });
  };

// update customer settings action
export const updateCustomerPlusSettings =
  (body) =>
  (dispatch, getState, { api, Toast }) => {
    return new Promise((resolve, reject) => {
      api({
        ...customerPlus.updateCustomerPlusSettings,
        body,
        header: { type: "Content-Type", value: "application/json" },
      })
        .then((response) => {
          resolve(response);
          let { message, status } = response;
          if (status === 200) {
            Toast({ type: "success", message });
          } else {
            reject(Toast({ type: "error", message }));
          }
        })
        .catch(({ message }) => {
          reject(Toast({ type: "error", message }));
        });
    });
  };

//get lpmanagement reward settings
export const getRewardPlolicySettings =
  (id) =>
  (dispatch, getState, { api, Toast }) => {
    return new Promise((resolve, reject) => {
      lpManagement.getRewardPolicy.addQuery = { key: "id", payload: id };
      api({
        ...lpManagement.getRewardPolicy,
      })
        .then((response) => {
          resolve(response);
          let { message, status, data } = response;
          if (status === 200) {
            dispatch({
              type: CustomerPlusActionType.getRewardPolicySettings,
              payload: data,
            });
          } else {
            reject(Toast({ type: "error", message }));
          }
        })
        .catch(({ message }) => {
          reject(Toast({ type: "error", message }));
        });
    });
  };

//get lpmanagement redeem settings
export const getRedeemPlolicySettings =
  (id) =>
  (dispatch, getState, { api, Toast }) => {
    return new Promise((resolve, reject) => {
      lpManagement.getRedeemPolicy.addQuery = { key: "id", payload: id };
      api({
        ...lpManagement.getRedeemPolicy,
      })
        .then((response) => {
          resolve(response);
          let { message, status, data } = response;
          if (status === 200) {
            dispatch({
              type: CustomerPlusActionType.getRedeemPolicySettings,
              payload: data,
            });
          } else {
            reject(Toast({ type: "error", message }));
          }
        })
        .catch(({ message }) => {
          reject(Toast({ type: "error", message }));
        });
    });
  };
