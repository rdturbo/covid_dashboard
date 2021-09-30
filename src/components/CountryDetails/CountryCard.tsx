import React from "react";
import { Typography, Grid } from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";
import moment from "moment";
import "./CountryCard.scss";

interface CountryCardProps {
  title: string;
  confirmed: number;
  deaths: number;
  recovered: number;
  updated?: number;
  onClick?: () => void;
}

const CountryCard: React.FC<CountryCardProps> = ({
  title,
  confirmed,
  deaths,
  recovered,
  updated,
  onClick,
}: CountryCardProps) => {
  return (
    <Grid container>
      <Grid className="funds-card" container justify="space-between">
        <Grid item lg={11} xs={11} onClick={onClick}>
          <Typography className="text--medium" variant="h3">
            {title}
          </Typography>
          <div
            className="margin-top-10 flex-row"
            style={{ alignItems: "baseline" }}
          >
            <Grid item md={3} xs={12}>
              <Grid
                container
                justify="space-between"
                className="margin-bottom-15 mobile--hide"
              >
                <Typography variant="subtitle2" color="textSecondary">
                  Confirmed
                </Typography>
              </Grid>
              <Typography variant="h6" color="primary" className="text--medium">
                {confirmed}
              </Typography>
            </Grid>
            <Grid item md={3} xs={12}>
              <Grid
                container
                justify="space-between"
                className="margin-bottom-15 mobile--hide"
              >
                <Typography variant="subtitle2" color="textSecondary">
                  Deaths
                </Typography>
              </Grid>
              <Typography variant="h6" color="error" className="text--medium">
                {deaths}
              </Typography>
            </Grid>
            <Grid item md={3} xs={12}>
              <Grid
                container
                justify="space-between"
                className="margin-bottom-10 mobile--hide"
              >
                <Typography variant="subtitle2" color="textSecondary">
                  Recovered
                </Typography>
              </Grid>
              <Typography
                variant="h6"
                color="textSecondary"
                className="text--medium"
              >
                {recovered}
              </Typography>
            </Grid>
            {updated && (
              <Grid item md={3} xs={12}>
                <Grid
                  container
                  justify="space-between"
                  className="margin-bottom-15 mobile--hide"
                >
                  <Typography variant="subtitle2" color="textSecondary">
                    Last updated
                  </Typography>
                </Grid>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  className="text--medium"
                >
                  {moment(updated).format("LLL").toString()}
                </Typography>
              </Grid>
            )}
          </div>
        </Grid>
        <Grid
          item
          className="align-self-center"
          onClick={onClick}
          lg={1}
          xs={1}
        >
          <ArrowForward color="primary" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(CountryCard);
