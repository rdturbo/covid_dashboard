import React from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Grid,
  Typography,
  Divider,
  CircularProgress,
  LinearProgress,
  Button,
} from "@material-ui/core";

import { Menu as MenuIcon, ArrowForwardIos } from "@material-ui/icons";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import BloomImage from "../custom/BloomImage";
import BloomNotification from "../custom/BloomNotification";

import * as coronaActions from "../../actions/coronaAction";
import SideMenu from "./SideMenu";
import CountryData from "./CountryData";
import BarGraph from "../BarGraph";
import RenderDetail from "../RenderDetail";
import CoronaImage from "../CoronaImage";
import {
  allCoronaImages,
  randomIntFromInterval,
} from "../CoronaImage/allCoronaImage";
import {
  isFamous,
  isAfrice,
  isAmerica,
  isAsia,
  isEurope,
  isOceania,
} from "./filterCountries";
import "./Dashboard.scss";

interface State {
  menuSlider: boolean;
  notificationType: "success" | "error";
  notificationVisiblity: boolean;
  notificationMessage: string;

  totalConfirmed: number;
  totalDeaths: number;
  totalRecovered: number;
  summaryIndia: { [key: string]: number };
  summaryUSA: { [key: string]: number };
  indiaLabel: string[];
  indiaLabelData: number[];
  usaLabel: string[];
  usaLabelData: number[];
  famousCountriesData: { [key: string]: number }[];
  allCountries: { [key: string]: number }[];
  allAsia: { [key: string]: number }[];
  allAfrica: { [key: string]: number }[];
  allEurope: { [key: string]: number }[];
  allOcenia: { [key: string]: number }[];
  allAmerica: { [key: string]: number }[];
  progress: number;
  loading: boolean;
}

interface DashboardActionProps {
  getLatestDataWorld: (data: any) => void;
  getLatestDataIndia: (data: any) => void;
  getLatestDataUSA: (data: any) => void;
  getAllCountriesData: (data: any) => void;
}

const loadingImage =
  allCoronaImages[randomIntFromInterval(0, 111)] || "60rtu.jpg";

class Dashboard extends React.Component<any, State> {
  progressTimer: number;
  constructor(props: any) {
    super(props);

    this.state = {
      menuSlider: false,
      notificationType: "success",
      notificationMessage: "",
      notificationVisiblity: false,
      totalConfirmed: 0,
      totalDeaths: 0,
      totalRecovered: 0,
      summaryIndia: {},
      summaryUSA: {
        confirmed: 0,
        deaths: 0,
        recovered: 0,
      },
      indiaLabel: [],
      indiaLabelData: [],
      usaLabel: [],
      usaLabelData: [],
      famousCountriesData: [],
      allCountries: [],
      allAsia: [],
      allAfrica: [],
      allEurope: [],
      allOcenia: [],
      allAmerica: [],
      progress: 0,
      loading: true,
    };
    this.progressTimer = 0;
  }

  componentDidMount() {
    const {
      getLatestDataWorld,
      getLatestDataIndia,
      getLatestDataUSA,
      getAllCountriesData,
      allDataUSA,
      summaryUSA,
      allCountriesData,
      initialLoading,
    } = this.props;

    if (initialLoading) {
      this.progressTimer = window.setInterval(() => this.progressBar(), 100);
    }

    allDataUSA && allDataUSA.length > 1
      ? this.initializeUSAData(allDataUSA, summaryUSA)
      : getLatestDataUSA().then((res: any) => {
          if (res) {
            const { latest, locations } = res;
            this.initializeUSAData(locations, latest);
          }
        });

    allCountriesData && allCountriesData.length > 1
      ? this.initializeAllCountriesData(allCountriesData)
      : getAllCountriesData().then((res: any) => {
          if (res) {
            this.initializeAllCountriesData(res.locations);
          }
        });

    getLatestDataWorld().then((res: any) => {
      if (res) {
        const { confirmed, deaths, recovered } = res;
        this.setState({
          totalConfirmed: confirmed,
          totalDeaths: deaths,
          totalRecovered: recovered,
        });
      }
    });

    getLatestDataIndia().then((res: any) => {
      if (res) {
        const { summary, regional } = res;
        const indiaLabel: string[] = [];
        const indiaLabelData: number[] = [];

        for (let i = 0; i < regional.length; i++) {
          const { loc, confirmedCasesIndian } = regional[i];
          if (confirmedCasesIndian > 100) {
            indiaLabel.push(loc);
            indiaLabelData.push(confirmedCasesIndian);
          }
        }
        this.setState({
          summaryIndia: summary,
          indiaLabel: indiaLabel,
          indiaLabelData: indiaLabelData,
        });
      }
    });
  }

  componentWillUnmount() {
    if (this.progressTimer) {
      clearInterval(this.progressTimer);
    }
  }

  progressBar() {
    const { progress } = this.state;
    if (progress === 100) {
      clearInterval(this.progressTimer);
      this.setState({ loading: false });
    } else {
      const diff = Math.random() * 5;
      this.setState({ progress: Math.min(progress + diff, 100) });
    }
  }

  initializeAllCountriesData = (locations: any) => {
    const famousCountries = [];
    const allAsia = [];
    const allAfrica = [];
    const allEurope = [];
    const allOcenia = [];
    const allAmerica = [];
    const allCountries = [];

    for (let i = 0; i < locations.length; i++) {
      const elm = locations[i];
      if (isFamous(elm.country_code) && elm.latest.confirmed > 1000) {
        famousCountries.push(elm);
      } else if (isAsia(elm.country_code)) {
        allAsia.push(elm);
      } else if (isAfrice(elm.country_code)) {
        allAfrica.push(elm);
      } else if (isEurope(elm.country_code)) {
        allEurope.push(elm);
      } else if (isOceania(elm.country_code)) {
        allOcenia.push(elm);
      } else if (isAmerica(elm.country_code)) {
        allAmerica.push(elm);
      } else {
        allCountries.push(elm);
      }
    }
    this.setState({
      famousCountriesData: famousCountries,
      allAsia: allAsia,
      allAfrica: allAfrica,
      allEurope: allEurope,
      allOcenia: allOcenia,
      allAmerica: allAmerica,
      allCountries: allCountries,
    });
  };

  initializeUSAData = (locations: any, latest: any) => {
    const finalProvince: any = {};
    for (let i = 0; i < locations.length; i++) {
      const { province, latest } = locations[i];
      if (finalProvince[province]) {
        finalProvince[province] += latest.confirmed;
      } else {
        finalProvince[province] = latest.confirmed;
      }
    }
    const usaLabel: string[] = Object.keys(finalProvince);
    const usaLabelData: number[] = Object.values(finalProvince);

    this.setState({
      summaryUSA: latest,
      usaLabel: usaLabel.slice(0, 15),
      usaLabelData: usaLabelData.slice(0, 15),
    });
  };

  renderDashboard = () => {
    const { history } = this.props;
    const {
      totalConfirmed,
      totalDeaths,
      totalRecovered,
      summaryIndia,
      summaryUSA,
      indiaLabel,
      indiaLabelData,
      usaLabel,
      usaLabelData,
      famousCountriesData,
      allCountries,
      allAsia,
      allAfrica,
      allEurope,
      allOcenia,
      allAmerica,
    } = this.state;

    return (
      <Grid container className="container">
        <CoronaImage />
        <Grid
          container
          className="margin-bottom-15"
          justify="space-between"
          alignItems="center"
        >
          <Grid>
            <Typography variant="h3">Cornavirus Cases in the world</Typography>
          </Grid>
          <Grid>
            <a href="https://nuirupayandas-ask-me-anything.netlify.app/">
              <Button color="primary" endIcon={<ArrowForwardIos />}>
                Ask me anything
              </Button>
            </a>
          </Grid>
        </Grid>
        <Grid container>
          <RenderDetail title="Total Confirmed Cases" value={totalConfirmed} />
          <RenderDetail title="Total Deaths" value={totalDeaths} />
          <RenderDetail title="Total Recovered" value={totalRecovered} />
          {/* <a href="https://nuirupayandas-ask-me-anything.netlify.app/">
            <Button color="primary" variant="contained" fullWidth>
              Ask me anything
            </Button>
          </a> */}
          <Grid item md={12} xs={12}>
            <Divider className="margin-top-30 margin-bottom-30" />
          </Grid>
        </Grid>

        {Object.keys(summaryIndia).length > 0 && (
          <>
            <Grid
              container
              className="margin-bottom-15"
              justify="space-between"
              alignItems="center"
            >
              <Grid>
                <Typography variant="h3">Cornavirus Cases in India</Typography>
              </Grid>
              <Grid>
                <Link to="/country-india">
                  <Button color="primary" endIcon={<ArrowForwardIos />}>
                    Explore More
                  </Button>
                </Link>
              </Grid>
            </Grid>

            <Grid container>
              <RenderDetail title="Total" value={summaryIndia.total} />
              <RenderDetail
                title="Discharged"
                value={summaryIndia.discharged}
              />
              <RenderDetail title="Deaths" value={summaryIndia.deaths} />
              <Grid item md={12} xs={12}>
                <Divider className="margin-top-30 margin-bottom-30" />
              </Grid>
            </Grid>
          </>
        )}

        {Object.keys(summaryUSA).length > 0 && (
          <>
            <Grid
              container
              className="margin-bottom-15"
              justify="space-between"
              alignItems="center"
            >
              <Grid>
                <Typography variant="h3">Cornavirus Cases in USA</Typography>
              </Grid>
              <Grid>
                <Link to="/country-usa">
                  <Button color="primary" endIcon={<ArrowForwardIos />}>
                    Explore More
                  </Button>
                </Link>
              </Grid>
            </Grid>
            <Grid container>
              <RenderDetail title="Confirmed" value={summaryUSA.confirmed} />
              <RenderDetail title="Deaths" value={summaryUSA.deaths} />
              <RenderDetail title="Recovered" value={summaryUSA.recovered} />
              <Grid item md={12} xs={12}>
                <Divider className="margin-top-30 margin-bottom-30" />
              </Grid>
            </Grid>
          </>
        )}
        <Grid
          container
          className="margin-top-15"
          justify="space-between"
          alignItems="center"
        >
          <Grid>
            <Typography variant="h3">Total Confirmed Cases</Typography>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item md={6} xs={12} className="margin-top-15">
            {indiaLabel && indiaLabelData ? (
              <BarGraph label={indiaLabel} value={indiaLabelData} />
            ) : (
              <CircularProgress />
            )}
          </Grid>

          <Grid item md={6} xs={12} className="margin-top-15">
            {usaLabel.length > 1 && usaLabelData.length > 1 ? (
              <BarGraph label={usaLabel} value={usaLabelData} />
            ) : (
              <CircularProgress />
            )}
          </Grid>
        </Grid>

        {famousCountriesData.length > 0 ? (
          <CountryData
            title="Top Counties with over 1000 cases"
            history={history}
            countryData={famousCountriesData}
          />
        ) : (
          <CircularProgress />
        )}

        {allAsia.length > 0 && (
          <CountryData
            title="Cornavirus Cases in Asia"
            history={history}
            countryData={allAsia}
          />
        )}

        {allAmerica.length > 0 && (
          <CountryData
            title="Cornavirus Cases in America"
            history={history}
            countryData={allAmerica}
          />
        )}

        {allEurope.length > 0 && (
          <CountryData
            title="Cornavirus Cases in Europe"
            history={history}
            countryData={allEurope}
          />
        )}

        {allAfrica.length > 0 && (
          <CountryData
            title="Cornavirus Cases in Africa"
            history={history}
            countryData={allAfrica}
          />
        )}

        {allOcenia.length > 0 && (
          <CountryData
            title="Cornavirus Cases in Ocenia Australia"
            history={history}
            countryData={allOcenia}
          />
        )}

        {allCountries.length > 0 && (
          <CountryData
            title="Cornavirus Cases in Other Countries"
            history={history}
            countryData={allCountries}
          />
        )}
      </Grid>
    );
  };

  render() {
    const { menuSlider, loading, progress } = this.state;
    const { initialLoading } = this.props;

    return (
      <div className="dashboard">
        <SideMenu
          isMenuOpen={menuSlider}
          toggleIsMenuOpen={() => {
            this.setState((prevState) => ({
              menuSlider: !prevState.menuSlider,
            }));
          }}
        />
        <Grid container className="header">
          <MenuIcon
            className="header-menu-btn"
            onClick={() => this.setState({ menuSlider: true })}
            fontSize="large"
          />
          <Typography
            align="center"
            className="flex-1 dashboard-desktop--hide header-title-margin"
            variant="h3"
          >
            Dashboard
          </Typography>
          <Grid className="mobile--hide header-ask-me">
            <a href="https://nuirupayandas-ask-me-anything.netlify.app/">
              <Button color="primary" endIcon={<ArrowForwardIos />}>
                Ask me anything
              </Button>
            </a>
          </Grid>
          <Grid className="desktop--hide header-ask-me">
            <a href="https://nuirupayandas-ask-me-anything.netlify.app/">
              <Button color="primary" endIcon={<ArrowForwardIos />}>
                Ask me
              </Button>
            </a>
          </Grid>
        </Grid>

        {loading && initialLoading ? (
          <div className="dashboard-content main-content">
            <Grid container justify="center">
              <BloomImage
                src={require(`../../images/illustrations/${loadingImage}`)}
                className="loading-image-container"
                alt="logo"
              />
            </Grid>
            <Grid className="container" style={{ margin: "auto" }}>
              <div className="text-container">
                <Typography className="text--light" variant="h1">
                  Get all the latest information on
                </Typography>
                <Typography variant="h1" gutterBottom>
                  Coronavirus
                </Typography>
                <Typography color="textSecondary" variant="body1" paragraph>
                  Great to see you. Just a sec while we crawl the latest data
                  and build our dashboard.
                </Typography>
                <Typography paragraph />
                <LinearProgress
                  className="progress-bar"
                  variant="determinate"
                  value={progress}
                />
              </div>
            </Grid>
          </div>
        ) : (
          <div className="dashboard-content main-content">
            {this.renderDashboard()}
          </div>
        )}

        <BloomNotification
          message={this.state.notificationMessage}
          type={this.state.notificationType}
          visiblity={this.state.notificationVisiblity}
          onClose={() => this.setState({ notificationVisiblity: false })}
        />
      </div>
    );
  }
}

function mapStateToProps(state: any): any {
  return {
    summaryUSA: state.summaryUSA,
    allDataUSA: state.allDataUSA,
    allCountriesData: state.allCountriesData,
    initialLoading: state.initialLoading,
  };
}

function mapDispatchToProps(dispatch: Dispatch): DashboardActionProps {
  return bindActionCreators(
    {
      getLatestDataWorld: coronaActions.getLatestDataWorld,
      getLatestDataIndia: coronaActions.getLatestDataIndia,
      getLatestDataUSA: coronaActions.getLatestDataUSA,
      getAllCountriesData: coronaActions.getAllCountriesData,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Dashboard));
