import axios from "axios";

const getClient = (baseUrl = null, session = false) => {
  let config: any = {
    baseURL: baseUrl,
  };

  const client = axios.create(config);
  return client;
};

export class APIClient {
  client: any;

  constructor(baseUrl: any = null) {
    this.client = getClient(baseUrl);
    // if (!session) { this.updateAuthToken('APICLIENT constructor') }
    // this.client.updateAuthToken = this.updateAuthToken
  }
}

export default APIClient;
