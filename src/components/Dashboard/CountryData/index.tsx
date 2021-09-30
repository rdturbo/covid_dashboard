import React from "react";
import { Grid, Typography, Button, Divider } from "@material-ui/core";
import { ArrowForward, ArrowForwardIos } from "@material-ui/icons";
import BloomBadge from "../../custom/BloomBadge";

import theme from "../../../common/theme";
import moment from "moment";

interface CountryDataProps {
  title: string;
  countryData: any;
  history: any;
}

const CountryData: React.FC<CountryDataProps> = (props) => {
  const { title, countryData, history } = props;
  return (
    <>
      <Grid
        container
        className="margin-top-15"
        justify="space-between"
        alignItems="center"
      >
        <Grid item md={12} xs={12}>
          <Divider className="margin-top-15 margin-bottom-15" />
        </Grid>
        <Grid>
          <Typography variant="h3">{title}</Typography>
        </Grid>
        <Grid>
          <a href="https://nuirupayandas-ask-me-anything.netlify.app/">
            <Button color="primary" endIcon={<ArrowForwardIos />}>
              Ask me anything
            </Button>
          </a>
        </Grid>
        {/* <Grid>
          <Link to="/cashflows">
            <Button color="primary">View All</Button>
          </Link>
        </Grid> */}
      </Grid>

      <Grid
        container
        className="margin-top-15"
        justify="space-between"
        alignItems="center"
      >
        <Grid
          container
          className="margin-top-5 dashboard-mobile--hide"
          spacing={5}
        >
          {countryData.map((elm: any, i: number) => {
            const { latest } = elm;
            return (
              <Grid
                onClick={() =>
                  history.push({
                    pathname:
                      elm.country === "US"
                        ? "/country-usa"
                        : `/country-details/${elm.country_code}`,
                  })
                }
                key={i}
                item
                md={4}
                xs={12}
                className="txn-cards"
              >
                <Grid
                  container
                  justify="space-between"
                  className="grey-card white-space-no-wrap"
                >
                  <Grid container justify="space-between">
                    <Grid>
                      <BloomBadge
                        color={theme.palette.error.main}
                        label={`Deaths ${latest.deaths}`}
                      />
                    </Grid>
                    <Grid>
                      <BloomBadge
                        color={theme.palette.primary.main}
                        label={`Confirmed ${latest.confirmed}`}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    className="margin-top-15"
                    justify="space-between"
                  >
                    <Grid>
                      <Typography variant="body1" color="textSecondary">
                        {elm.province ? elm.country : elm.country_code}
                      </Typography>
                      <Typography className="text--medium">
                        {elm.province || elm.country}
                      </Typography>
                    </Grid>
                    <Grid>
                      <Typography variant="body1" color="textSecondary">
                        Updated&nbsp;
                        {moment(elm.last_updated)
                          .format("DD MMM HH:MM")
                          .toString()}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    alignItems="center"
                    className="margin-top-30"
                    justify="space-between"
                  >
                    <Grid>
                      <Grid container alignItems="baseline">
                        <Typography
                          variant="h6"
                          className="text--normal"
                          color="error"
                        >
                          {latest.deaths} Deaths and&nbsp;
                        </Typography>
                        <Typography
                          variant="h6"
                          className="margin-top-5"
                          color="primary"
                        >
                          {latest.confirmed} confirmed cases
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid>
                      <ArrowForward
                        color="primary"
                        onClick={() =>
                          history.push({
                            pathname:
                              elm.country === "US"
                                ? "/country-usa"
                                : `/country-details/${elm.country_code}`,
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>

        <div className="flex-row horizontal-cards margin-top-15 dashboard-desktop--hide">
          {countryData.map((elm: any, i: number) => {
            const { latest } = elm;
            return (
              <div
                key={i}
                className="grey-card white-space-no-wrap margin-right-10 transaction-cards"
                onClick={() =>
                  history.push({
                    pathname:
                      elm.country === "US"
                        ? "/country-usa"
                        : `/country-details/${elm.country_code}`,
                  })
                }
              >
                <div className="flex-row space-between">
                  <BloomBadge
                    color={theme.palette.error.main}
                    label={`Deaths ${latest.deaths}`}
                  />
                  <BloomBadge
                    color={theme.palette.primary.main}
                    label={`Confirmed ${latest.confirmed}`}
                  />
                </div>
                <div className="flex-row space-between margin-top-15">
                  <div>
                    <Typography variant="body1" color="textSecondary">
                      {elm.province ? elm.country : elm.country_code}
                    </Typography>
                    <Typography className="text--medium">
                      {elm.province || elm.country}
                    </Typography>
                  </div>
                  <Typography variant="body1" color="textSecondary">
                    Updated&nbsp;
                    {moment(elm.last_updated).format("DD MMM HH:MM").toString()}
                  </Typography>
                </div>
                <div className="flex-row space-between align-items-center margin-top-30">
                  <div className="flex-row align-item-baseline">
                    <Typography
                      variant="h6"
                      className="text--normal"
                      color="error"
                    >
                      {latest.deaths} Deaths and&nbsp;
                    </Typography>
                    <Typography
                      variant="h6"
                      className="margin-top-5"
                      color="primary"
                    >
                      {latest.confirmed} confirmed cases
                    </Typography>
                  </div>
                  <Grid>
                    <ArrowForward
                      color="primary"
                      onClick={() =>
                        history.push({
                          pathname:
                            elm.country === "US"
                              ? "/country-usa"
                              : `/country-details/${elm.country_code}`,
                        })
                      }
                    />
                  </Grid>
                </div>
              </div>
            );
          })}
        </div>
      </Grid>
    </>
  );
};

export default React.memo(CountryData);
