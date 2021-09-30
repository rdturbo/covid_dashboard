import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { Typography, Divider, Grid, CircularProgress } from "@material-ui/core";
import CoronaImage from "../CoronaImage";
import moment from "moment";
import { BackButton } from "../../common/backButton";
import CountryCard from "./CountryCard";
import RenderDetail from "../RenderDetail";
import * as coronaActions from "../../actions/coronaAction";

interface CountryDetailsActionProps {
  getCountryDataByCode: (data: string) => void;
}

const CountryDistribution: React.FC<any> = (props) => {
  //   handleCardClick = (val: any) => {
  //     this.props.history.push("/fund-details/" + val);
  //   };

  const [countryData, setCountryData] = React.useState<any>([]);
  const [latest, setLatest] = React.useState<any>({});

  React.useEffect(() => {
    const { getCountryDataByCode, history } = props;
    const countryCode = props.match.params.country_code;

    if (countryCode === "US") {
      history.push("/country-usa");
    } else {
      getCountryDataByCode(countryCode).then((res: any) => {
        if (res) {
          const { latest, locations } = res;
          setCountryData(locations);
          setLatest(latest);
        }
      });
    }
  }, []);

  const onClickHandler = (countryCode: string) => {
    const { history } = props;
    history.push(`/country-history/${countryCode}`);
  };

  return (
    <div className="transactions">
      <Grid className="header">
        <BackButton
          className="header-back-btn-pos--absolute"
          onClick={() => {
            props.history.push("/dashboard");
          }}
        />
        <Typography align="center" variant="h4" className="flex-1">
          Country Details
        </Typography>
      </Grid>
      <CoronaImage />
      {countryData.length ? (
        <div className="transactions-content main-content">
          <Grid className="container">
            <Grid container>
              <Grid item md={3} xs={12}>
                <Grid container justify="space-between">
                  <Typography variant="subtitle2" color="textSecondary">
                    Country Code
                  </Typography>
                </Grid>
                <Typography
                  variant="h3"
                  className="text--bold margin-bottom-15"
                >
                  {countryData[0]?.country_code}
                </Typography>
              </Grid>

              <Grid item md={3} xs={12}>
                <Grid
                  container
                  justify="space-between"
                  className="mobile--hide"
                >
                  <Typography variant="subtitle2" color="textSecondary">
                    Country
                  </Typography>
                </Grid>
                <Typography
                  variant="h3"
                  className="text--bold mobile--hide margin-bottom-15"
                >
                  {countryData[0]?.country}
                </Typography>
              </Grid>

              <Grid item md={3} xs={12}>
                <Grid
                  container
                  justify="space-between"
                  className="mobile--hide"
                >
                  <Typography variant="subtitle2" color="textSecondary">
                    Province
                  </Typography>
                </Grid>
                <Typography
                  variant="h3"
                  className="text--bold margin-bottom-15 mobile--hide"
                >
                  {countryData[0]?.province
                    ? countryData.length
                    : "No provinces"}
                </Typography>
              </Grid>

              <Grid item md={3} xs={12}>
                <Grid
                  container
                  justify="space-between"
                  className="mobile--hide"
                >
                  <Typography variant="subtitle2" color="textSecondary">
                    Last Updated on
                  </Typography>
                </Grid>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  className="margin-bottom-15"
                >
                  {moment(countryData[0]?.last_updated)
                    .format("LLLL")
                    .toString()}
                </Typography>
              </Grid>
            </Grid>
            <Divider className="margin-top-30 margin-bottom-30" />

            {countryData[0]?.province && (
              <>
                <Grid
                  container
                  className="margin-bottom-15"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid>
                    <Typography variant="h3">
                      Total Cases in {countryData[0]?.country}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <RenderDetail title="Confirmed" value={latest.confirmed} />
                  <RenderDetail title="Deaths" value={latest.deaths} />
                  <RenderDetail title="Recovered" value={latest.recovered} />
                  <Grid item md={12} xs={12}>
                    <Divider className="margin-top-30 margin-bottom-30" />
                  </Grid>
                </Grid>
              </>
            )}

            <Grid container spacing={1}>
              {countryData.length === 0 && (
                <div className="page-loader">
                  <CircularProgress />
                </div>
              )}

              {countryData?.length > 0 ? (
                [...countryData]
                  .sort(
                    (a: any, b: any) => b.latest.confirmed - a.latest.confirmed
                  )
                  .map((elm: any, i: number) => {
                    return (
                      <Grid key={i} item md={6} xs={12}>
                        <CountryCard
                          key={i}
                          title={elm.province || elm.country}
                          confirmed={elm.latest.confirmed}
                          deaths={elm.latest.deaths}
                          recovered={elm.latest.recovered}
                          updated={elm.last_updated}
                          onClick={() => onClickHandler(elm.country_code)}
                        />
                      </Grid>
                    );
                  })
              ) : (
                <Grid container className="transaction-empty">
                  <Grid container justify="center">
                    <Typography variant="subtitle2" color="textSecondary">
                      No Data Found
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </div>
      ) : (
        <div className="page-loader">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

function mapDispatchToProps(dispatch: Dispatch): CountryDetailsActionProps {
  return bindActionCreators(
    {
      getCountryDataByCode: coronaActions.getCountryDataByCode,
    },
    dispatch
  );
}

export default connect(
  null,
  mapDispatchToProps
)(withRouter(CountryDistribution));
