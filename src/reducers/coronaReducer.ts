import {
  SET_LATEST_DATA_WORLD,
  GET_LATEST_DATA_WORLD,
  SET_LATEST_DATA_INDIA,
  GET_LATEST_DATA_INDIA,
  GET_LATEST_DATA_USA,
  SET_LATEST_DATA_USA,
  GET_ALL_COUNTRIES_DATA,
  SET_ALL_COUNTRIES_DATA,
} from "../actions/coronaTypes";

export default function CoronaReducer(state: any, action: any) {
  switch (action.type) {
    case SET_LATEST_DATA_WORLD:
      return {
        totalConfirmed: action.latestData.confirmed,
        totalDeaths: action.latestData.deaths,
        totalRecovered: action.latestData.recovered,
      };

    case GET_LATEST_DATA_WORLD:
      return {
        totalConfirmed: state.confirmed,
        totalDeaths: state.deaths,
        totalRecovered: state.recovered,
      };

    case SET_LATEST_DATA_INDIA:
      return {
        summaryIndia: action.data.summary,
        allDataIndia: action.data.regional,
      };

    case GET_LATEST_DATA_INDIA:
      return {
        summaryIndia: state.summaryIndia,
        allDataIndia: state.allDataUSA,
      };

    case SET_LATEST_DATA_USA:
      return {
        summaryUSA: action.data.latest,
        allDataUSA: action.data.locations,
        initialLoading: false,
      };

    case GET_LATEST_DATA_USA:
      return {
        summaryUSA: state.summaryUSA,
        allDataUSA: state.allDataUSA,
      };

    case SET_ALL_COUNTRIES_DATA:
      return {
        allCountriesData: action.data.locations,
        initialLoading: false,
      };

    case GET_ALL_COUNTRIES_DATA:
      return {
        allCountriesData: state.allCountriesData,
      };

    default:
      return {};
  }
}
