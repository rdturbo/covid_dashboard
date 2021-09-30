import APIClient from "./client";

var client: any;
var clientIndia: any;

if (!client) {
  client = new APIClient("https://coronavirus-tracker-api.ruizlab.org").client;
}
if (!clientIndia) {
  clientIndia = new APIClient("https://api.rootnet.in/covid19-in").client;
}

export default {
  get_latest_data_world() {
    return client.get("/v2/latest");
  },

  get_latest_data_india() {
    return clientIndia.get("/stats/latest");
  },

  get_latest_data_usa() {
    return client.get("/v2/locations?source=csbs");
  },

  get_latest_data_all_countries() {
    return client.get("/v2/locations");
  },

  get_latest_data_by_country_code(countryCode: string) {
    return client.get(`/v2/locations?country_code=${countryCode}`);
  },

  get_country_timeline(countryCode: string) {
    return client.get(`/v2/locations?country_code=${countryCode}&timelines=1`);
  },

  get_usa_timeline() {
    return client.get("/v2/locations?source=csbs&timelines=1");
  },

  get_india_details_history() {
    return clientIndia.get("/stats/history");
  },
};
