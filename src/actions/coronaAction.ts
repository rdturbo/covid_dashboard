import { Action } from "redux";
import * as types from "./coronaTypes";
import { ThunkAction } from "redux-thunk";

import apiClient from "../apiClient";

export function setLatestDataWorld(latestData: any): any {
  return {
    type: types.SET_LATEST_DATA_WORLD,
    latestData: latestData,
  };
}

export function getLatestDataWorld(): ThunkAction<
  void,
  any,
  null,
  Action<string>
> {
  return (dispatch) => {
    dispatch({ type: "GET_LATEST_DATA_WORLD" });
    return apiClient
      .get_latest_data_world()
      .then((res: any) => {
        const { latest } = res.data;
        dispatch(setLatestDataWorld(latest));
        return latest;
      })
      .catch((response: any) => {
        console.log(response);
      });
  };
}

export function setLatestDataIndia(data: any): any {
  return {
    type: types.SET_LATEST_DATA_INDIA,
    data: data,
  };
}

export function getLatestDataIndia(): ThunkAction<
  void,
  any,
  null,
  Action<string>
> {
  return (dispatch) => {
    dispatch({ type: "GET_LATEST_DATA_INDIA" });
    return apiClient
      .get_latest_data_india()
      .then((res: any) => {
        const { success, data } = res.data;
        if (success) {
          dispatch(setLatestDataIndia(data));
          return data;
        }
      })
      .catch((response: any) => {
        console.log(response);
      });
  };
}

export function setLatestDataUSA(data: any): any {
  return {
    type: types.SET_LATEST_DATA_USA,
    data: data,
  };
}

export function getLatestDataUSA(): ThunkAction<
  void,
  any,
  null,
  Action<string>
> {
  return (dispatch) => {
    dispatch({ type: "GET_LATEST_DATA_USA" });
    return apiClient
      .get_latest_data_usa()
      .then((res: any) => {
        if (res) {
          const { data } = res;
          dispatch(setLatestDataUSA(data));
          return data;
        }
      })
      .catch((response: any) => {
        console.log(response);
      });
  };
}

export function setAllCountriesData(data: any): any {
  return {
    type: types.SET_ALL_COUNTRIES_DATA,
    data: data,
  };
}

export function getAllCountriesData(): ThunkAction<
  void,
  any,
  null,
  Action<string>
> {
  return (dispatch) => {
    dispatch({ type: "GET_ALL_COUNTRIES_DATA" });
    return apiClient
      .get_latest_data_all_countries()
      .then((res: any) => {
        if (res) {
          const { data } = res;
          dispatch(setAllCountriesData(data));
          return data;
        }
      })
      .catch((response: any) => {
        console.log(response);
      });
  };
}

export function getCountryDataByCode(
  countryCode: string
): ThunkAction<void, any, null, Action<string>> {
  return (dispatch) => {
    dispatch({ type: "GET_COUNTRY_DATA_BY_CODE" });
    return apiClient
      .get_latest_data_by_country_code(countryCode)
      .then((res: any) => {
        if (res) {
          const { data } = res;
          return data;
        }
      })
      .catch((response: any) => {
        console.log(response);
      });
  };
}

export function getCountryTimelineData(
  countryCode: string
): ThunkAction<void, any, null, Action<string>> {
  return (dispatch) => {
    dispatch({ type: "GET_COUNTRY_TIMELINE" });
    return apiClient
      .get_country_timeline(countryCode)
      .then((res: any) => {
        if (res) {
          const { data } = res;
          return data;
        }
      })
      .catch((response: any) => {
        console.log(response);
      });
  };
}

export function getUSATimelineData(): ThunkAction<
  void,
  any,
  null,
  Action<string>
> {
  return (dispatch) => {
    dispatch({ type: "GET_USA_TIMELINE" });
    return apiClient
      .get_usa_timeline()
      .then((res: any) => {
        if (res) {
          const { data } = res;
          return data;
        }
      })
      .catch((response: any) => {
        console.log(response);
      });
  };
}

export function getIndiaDetails(): ThunkAction<
  void,
  any,
  null,
  Action<string>
> {
  return (dispatch) => {
    dispatch({ type: "GET_INDIA_DETAILS" });
    return apiClient
      .get_india_details_history()
      .then((res: any) => {
        if (res) {
          const { data } = res;
          return data;
        }
      })
      .catch((response: any) => {
        console.log(response);
      });
  };
}
