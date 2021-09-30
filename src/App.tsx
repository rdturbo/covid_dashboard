import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import configureStore from "./store/configureStore";
import theme from "./common/theme";
import Layout from "./Layout";

const App: React.FC = () => {
  return (
    <Provider store={configureStore()}>
      <ThemeProvider theme={theme}>
        <Layout />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
