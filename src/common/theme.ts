import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      contrastText: "#fff",
      main: "#01d6d5",
      dark: "#08b2b1",
    },
    secondary: {
      contrastText: "#fff",
      main: "#7832fd",
    },
    error: {
      contrastText: "#fff",
      main: "#fe3246",
    },
    text: {
      disabled: "#e5e5ea",
      hint: "#e5e5ea",
      primary: "#1b1b1e",
      secondary: "#8e8e93",
    },
    success: {
      contrastText: "#fff",
      main: "#00b248",
    },
    warning: {
      contrastText: "#fff",
      main: "#f78a00",
    },
    info: {
      contrastText: "#fff",
      main: "#6184f3",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: 16,
    htmlFontSize: 16,
    h1: {
      color: "#1b1b1e",
      fontFamily: "'Rubik', sans-serif",
      fontSize: "1.75rem",
      lineHeight: "2rem",
      fontWeight: 500,
      // @ts-ignore
      margin: 0,
      "@media (min-width: 960px)": {
        fontSize: "3.875rem",
        lineHeight: "4.5rem",
      },
    },
    h2: {
      color: "#1b1b1e",
      fontFamily: "'Rubik', sans-serif",
      fontSize: "1.5rem",
      lineHeight: "1.75rem",
      fontWeight: 500,
      // @ts-ignore
      margin: 0,
      "@media (min-width: 960px)": {
        fontSize: "1.75rem",
        lineHeight: "3rem",
      },
    },
    h3: {
      color: "#1b1b1e",
      fontFamily: "'Rubik', sans-serif",
      fontSize: "1.125rem",
      lineHeight: "1.375rem",
      fontWeight: 500,
      // @ts-ignore
      margin: 0,
      "@media (min-width: 960px)": {
        fontSize: "1.625rem",
        lineHeight: "2.25rem",
      },
    },
    h4: {
      color: "#1b1b1e",
      fontFamily: "'Rubik', sans-serif",
      fontSize: "1rem",
      lineHeight: "1.25rem",
      fontWeight: 500,
      // @ts-ignore
      margin: 0,
      "@media (min-width: 960px)": {
        fontSize: "1.25rem",
        lineHeight: "1.875rem",
      },
    },
    h5: {
      color: "#1b1b1e",
      fontFamily: "'Rubik', sans-serif",
      fontSize: ".875rem",
      lineHeight: "1.125rem",
      fontWeight: 500,
      // @ts-ignore
      margin: 0,
      "@media (min-width: 960px)": {
        fontSize: "1.125rem",
        lineHeight: "1.75rem",
      },
    },
    h6: {
      color: "#1b1b1e",
      fontFamily: "'Rubik', sans-serif",
      fontSize: ".75rem",
      lineHeight: "1.5rem",
      fontWeight: 500,
      // @ts-ignore
      margin: 0,
      "@media (min-width: 960px)": {
        fontSize: ".875rem",
        lineHeight: "1.5rem",
      },
    },
    overline: {
      color: "#1b1b1e",
      fontSize: "1.5rem",
      lineHeight: "1.75rem",
      fontWeight: 500,
      textTransform: "none",
      // @ts-ignore
      margin: 0,
      "@media (min-width: 960px)": {
        fontSize: "2.375rem",
        lineHeight: "2.75rem",
      },
    },
    subtitle1: {
      color: "#1b1b1e",
      fontSize: "1.125rem",
      lineHeight: "1.375rem",
      fontWeight: 500,
      // @ts-ignore
      margin: 0,
      "@media (min-width: 960px)": {
        fontSize: "1.25rem",
        lineHeight: "1.625rem",
      },
    },
    subtitle2: {
      color: "#1b1b1e",
      fontSize: "1rem",
      lineHeight: "1.25rem",
      fontWeight: 400,
      // @ts-ignore
      margin: 0,
      "@media (min-width: 960px)": {
        fontSize: "1.125rem",
        lineHeight: "1.5rem",
      },
    },
    body1: {
      color: "#1b1b1e",
      fontSize: ".875rem",
      lineHeight: "1.125rem",
      fontWeight: 400,
      // @ts-ignore
      margin: 0,
      "@media (min-width: 960px)": {
        fontSize: "1rem",
        lineHeight: "1.375rem",
      },
    },
    body2: {
      color: "#1b1b1e",
      fontSize: ".75rem",
      lineHeight: "1rem",
      fontWeight: 400,
      // @ts-ignore
      margin: 0,
      "@media (min-width: 960px)": {
        fontSize: ".875rem",
        lineHeight: "1.25rem",
      },
    },
    caption: {
      color: "#1b1b1e",
      fontSize: ".675rem",
      lineHeight: ".875rem",
      fontWeight: 400,
      "@media (min-width: 960px)": {
        fontSize: ".75rem",
        lineHeight: "1.125rem",
      },
    },
    button: {
      color: "#fff",
      fontSize: ".875rem",
      textTransform: "none",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        fontFamily: "'Rubik', sans-serif",
        minWidth: 50,
        padding: "8px 16px",
        height: 50,
      },
      contained: {
        boxShadow: "none",
      },
      text: {
        padding: 0,
      },
    },
    MuiFab: {
      root: {
        boxShadow: "none",
      },
    },
    MuiInput: {
      underline: {
        "&::before": {
          borderBottom: "0 !important",
        },
      },
    },
    MuiInputBase: {
      root: {
        fontSize: "1rem",
      },
    },
    MuiLinearProgress: {
      root: {
        height: "8px",
        borderRadius: "8px",
      },
      bar: {
        borderRadius: "8px",
      },
    },
    MuiSvgIcon: {
      colorPrimary: {
        color: "#01d6d5",
      },
      fontSizeSmall: {
        fontSize: ".875rem",
      },
      root: {
        fontSize: "1.25rem",
      },
    },
    MuiTypography: {
      gutterBottom: {
        marginBottom: 8,
      },
      paragraph: {
        marginBottom: 16,
      },
    },
  },
});

export default theme;
