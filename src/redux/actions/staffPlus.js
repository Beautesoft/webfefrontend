import { StaffPlusActionType } from "redux/actions/actionType";
import { staffPlus } from "service/apiVariables";

// create staffplus action
export const createStaffPlus =
  (body) =>
  (dispatch, getState, { api, Toast }) => {
    return new Promise((resolve, reject) => {
      api({ ...staffPlus.addStaff, body })
        .then((response) => {
          resolve(response);
          let { message, status, data } = response;
          if (status === 200) {
            // dispatch({ type: StaffActionType.getStaffDetail, payload: data });
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

// get workschedule action
export const getWorkSchedule =
  (id) =>
  (dispatch, getState, { api, Toast }) => {
    return new Promise((resolve, reject) => {
      staffPlus.getWorkSchedule.addQuery = { key: "id", payload: id };
      api({ ...staffPlus.getWorkSchedule })
        .then((response) => {
          resolve(response);
          let { message, status, data } = response;
          if (status === 200) {
            dispatch({
              type: StaffPlusActionType.getStaffPlusWorkSchedule,
              payload: data,
            });
            // Toast({ type: 'success', message })
          } else {
            // reject(Toast({ type: 'error', message }));
          }
        })
        .catch(({ message }) => {
          reject(Toast({ type: "error", message }));
        });
    });
  };

// update workschedule action
export const updateWorkSchedule =
  (id, body) =>
  (dispatch, getState, { api, Toast }) => {
    return new Promise((resolve, reject) => {
      staffPlus.updateWorkSchedule.addQuery = { key: "id", payload: id };
      api({ ...staffPlus.updateWorkSchedule, body })
        .then((response) => {
          resolve(response);
          let { message, status, data } = response;
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

// update staffplus action
export const updateStaffPlus =
  (id, body) =>
  (dispatch, getState, { api, Toast }) => {
    return new Promise((resolve, reject) => {
      staffPlus.updateStaff.addQuery = { key: "id", payload: id };
      api({ ...staffPlus.updateStaff, body })
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

// update staffplus action
export const updateEmpInfo =
  (id, body) =>
  (dispatch, getState, { api, Toast }) => {
    return new Promise((resolve, reject) => {
      staffPlus.updateEmpInfo.addQuery = { key: "id", payload: id };
      api({ ...staffPlus.updateEmpInfo, body })
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

// get staffplus  action
export const getStaffPlus =
  (id) =>
  (dispatch, getState, { api, Toast }) => {
    return new Promise((resolve, reject) => {
      staffPlus.getStaffPlus.addQuery = { key: "id", payload: id };
      api({ ...staffPlus.getStaffPlus })
        .then((response) => {
          resolve(response);
          let { message, status, data } = response;
          if (status === 200) {
            dispatch({
              type: StaffPlusActionType.getStaffPlusDetail,
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

// delete staff action
export const deleteStaffPlus =
  (id, body) =>
  (dispatch, getState, { api, Toast }) => {
    return new Promise((resolve, reject) => {
      staffPlus.deleteStaff.addQuery = { key: "id", payload: id };
      api({ ...staffPlus.deleteStaff, body })
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
