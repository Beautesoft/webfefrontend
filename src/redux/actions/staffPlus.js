import { StaffActionType } from 'redux/actions/actionType';
import { staffPlus } from 'service/apiVariables';

// get staffplus  action
export const getStaffPlus = (id) => (dispatch, getState, { api, Toast }) => {
    return new Promise((resolve, reject) => {
      staffPlus.getStaffPlus.addQuery = { key: 'id', payload: id };
      api({ ...staffPlus.getStaffPlus })
        .then((response) => {
          resolve(response)
          let { message, status, data } =  response
          if(status===200){
            dispatch({ type: StaffActionType.getStaffDetail, payload: data });
            // Toast({ type: 'success', message })
          } else {
            reject(Toast({ type: 'error', message }));
          }
        })
        .catch(({ message }) => {
          reject(Toast({ type: 'error', message }));
        });
    });
  };

  // delete staff action
export const deleteStaffPlus = (id, body) => (dispatch, getState, { api, Toast }) => {
    return new Promise((resolve, reject) => {
      staffPlus.deleteStaff.addQuery = { key: 'id', payload: id };
      api({ ...staffPlus.deleteStaff, body })
        .then((response) => {
          resolve(response)
          let { message, status } =  response
          if(status===200){
            // dispatch({ type: ArticalsActionType.getArticalsDetails, payload: data });
            Toast({ type: 'success', message })
          } else {
            reject(Toast({ type: 'error', message }));
          }
        })
        .catch(({ message }) => {
          reject(Toast({ type: 'error', message }));
        });
    });
  };