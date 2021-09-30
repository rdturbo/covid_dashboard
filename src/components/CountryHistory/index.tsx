import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { withRouter } from "react-router-dom";
import * as coronaActions from "../../actions/coronaAction";
import { BackButton } from "../../common/backButton";
import "./CountryHistory.scss";
import moment from "moment";
import { Typography, Grid, CircularProgress, Divider } from "@material-ui/core";
import CoronImage from "../CoronaImage";
import LineChart from "./LineGraph";
import RenderDetail from "../RenderDetail";

type Data = {
  province: string;
  count: number;
};

interface CountryDetailsActionProps {
  getCountryTimelineData: (countryCode: string) => void;
}

const CountryDetails = (props: any) => {
  const [confirmedData, setConfirmedData] = useState<Data[]>([]);
  const [deathData, setDeathsData] = useState<any>([]);
  const [graphLabel, setGraphLabel] = useState<string[]>([]);
  const [latest, setLatest] = useState<any>({});

  useEffect(() => {
    const { getCountryTimelineData } = props;
    getCountryTimelineData(props.match.params.country_code).then((res: any) => {
      if (res) {
        const { latest, locations } = res;
        setLabel(locations);
        setConfimed(locations);
        setDeaths(locations);
        setLatest(latest);
      }
    });
  }, []);

  const setConfimed = (locations: any) => {
    const totalConfirmedProvinces: any = [];
    locations.map((el: any) => {
      const { confirmed } = el.timelines;
      const historyConfirmed = {
        countryName: el.province || locations[0].country,
        count: Object.values(confirmed.timeline),
      };
      totalConfirmedProvinces.push(historyConfirmed);
    });
    setConfirmedData(totalConfirmedProvinces);
  };

  const setDeaths = (locations: any) => {
    const totalDeathProvinces: any = [];
    locations.map((el: any) => {
      const { deaths } = el.timelines;
      const historyDeaths = {
        countryName: el.province || locations[0].country,
        count: Object.values(deaths.timeline),
      };
      totalDeathProvinces.push(historyDeaths);
    });
    setDeathsData(totalDeathProvinces);
  };

  const setLabel = (locations: any) => {
    const label = Object.keys(
      locations[0].timelines.confirmed.timeline
    ).map((el) => moment(el).format("DD MMM YYY").toString());
    setGraphLabel(label);
  };

  return (
    <>
      <Grid className="header">
        <BackButton onClick={() => props.history.goBack()} />
        <Typography align="center" variant="h4" className="flex-1">
          Cornavirus Timeline
        </Typography>
      </Grid>

      <CoronImage />
      <div className="container">
        {confirmedData.length === 0 && deathData.length === 0 ? (
          <>
            <div className="page-loader">
              <CircularProgress />
            </div>
          </>
        ) : (
          <div className="country-history container main-content">
            <Grid container spacing={5}>
              <Grid
                container
                className="margin-bottom-15"
                justify="space-between"
                alignItems="center"
              >
                <Grid>
                  <Typography variant="h3">
                    Cornavirus In-depth Statistics
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
              <Grid item md={6} xs={12}>
                <Typography
                  variant="h3"
                  align="center"
                  className="text--medium margin-bottom-15"
                >
                  Confirmed Cases
                </Typography>
                <LineChart
                  height={250}
                  labels={graphLabel}
                  renderData={confirmedData}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <Typography
                  variant="h3"
                  align="center"
                  className="text--medium margin-bottom-15"
                >
                  Death Cases
                </Typography>
                <LineChart
                  height={250}
                  labels={graphLabel}
                  renderData={deathData}
                />
              </Grid>

              <Grid container>
                {confirmedData.length > 1 &&
                  deathData.length > 1 &&
                  confirmedData.map((el: any, index: number) => {
                    return (
                      <Grid
                        key={index}
                        item
                        md={6}
                        xs={12}
                        className="margin-top-40"
                      >
                        <Typography
                          variant="h3"
                          align="center"
                          className="text--medium margin-bottom-15"
                        >
                          Confirmed Cases in {el.countryName}
                        </Typography>

                        <LineChart
                          height={200}
                          labels={graphLabel}
                          renderData={[
                            {
                              ...el,
                              countryName: `Confirmed Cases in ${el.countryName}`,
                            },
                            {
                              ...deathData[index],
                              countryName: `Death Cases in ${el.countryName}`,
                            },
                          ]}
                        />
                      </Grid>
                    );
                  })}
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    </>
  );
};

function mapDispatchToProps(dispatch: Dispatch): CountryDetailsActionProps {
  return bindActionCreators(
    {
      getCountryTimelineData: coronaActions.getCountryTimelineData,
    },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(withRouter(CountryDetails));
