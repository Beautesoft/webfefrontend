import { ReportActionType } from "redux/actions/actionType";
import { Reporting } from "../../service/apiVariables";

export const getReport =
  (id) =>
  (dispatch, getState, { api, Toast }) => {
    return new Promise((resolve, reject) => {
      Reporting.getReportLayout.addQuery = { key: "id", payload: id };
      api({
        ...Reporting.getReportLayout,
      })
        .then((response) => {
          resolve(response);
          let { message, status, data } = response;
          if (status === 200) {
            dispatch({
              type: ReportActionType.getReportLayout,
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

export const updateReport =
  (id, body) =>
  (dispatch, getState, { api, Toast }) => {
    return new Promise((resolve, reject) => {
      Reporting.updateReportLayout.addQuery = { key: "id", payload: id };
      api({
        ...Reporting.updateReportLayout,
        body,
      })
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
