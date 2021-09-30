import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { withRouter } from "react-router-dom";
import * as coronaActions from "../../actions/coronaAction";
import { BackButton } from "../../common/backButton";
import moment from "moment";
import { Typography, Grid, CircularProgress } from "@material-ui/core";
import LineChart from "../CountryHistory/LineGraph";
import BarGraph from "../BarGraph";
import CoronaImage from "../CoronaImage";
import "./IndiaDetails.scss";

interface CountryDetailsActionProps {
  getIndiaDetails: () => void;
}

const CountryDetails = (props: any) => {
  const [indiaHistoryData, setIndiaHistoryData] = useState<any>({});
  const [barGraphData, setBarGraphData] = useState<any>({});

  useEffect(() => {
    const { getIndiaDetails } = props;

    getIndiaDetails().then((res: any) => {
      if (res) {
        const { data } = res;
        const indiaHistory: any = {};
        const barData: any = {};

        data.forEach((elm: any) => {
          const { regional, day } = elm;
          regional.forEach((el: any) => {
            if (indiaHistory[el.loc]) {
              indiaHistory[el.loc] = {
                ...indiaHistory[el.loc],
                [day]: {
                  confimed: el.totalConfirmed,
                  deaths: el.deaths,
                  discharged: el.discharged,
                },
              };
            } else {
              indiaHistory[el.loc] = {
                [day]: {
                  confimed: el.totalConfirmed,
                  deaths: el.deaths,
                  discharged: el.discharged,
                },
              };
            }
          });
        });
        data.forEach((elm: any) => {
          const { regional, day } = elm;
          if (barData[day]) {
            barData[day] = barData[day].push({
              label: regional.map((el: any) => el.loc),
              value: regional.map((el: any) => el.totalConfirmed),
            });
          } else {
            barData[day] = [
              {
                label: regional.map((el: any) => el.loc),
                value: regional.map((el: any) => el.totalConfirmed),
              },
            ];
          }
        });

        setBarGraphData(barData);
        setIndiaHistoryData(indiaHistory);
      }
    });
  }, []);

  return (
    <>
      <Grid className="header">
        <BackButton onClick={() => props.history.goBack()} />
        <Typography align="center" variant="h4" className="flex-1">
          India Timeline
        </Typography>
      </Grid>

      <div className="container">
        <CoronaImage />
        {Object.keys(indiaHistoryData).length === 0 ? (
          <>
            <div className="page-loader">
              <CircularProgress />
            </div>
          </>
        ) : (
          <div className="country-india container main-content">
            <Grid container spacing={5}>
              <Grid container>
                <Typography align="center" variant="h3">
                  Cornavirus India In-depth Statistics
                </Typography>
              </Grid>

              <Grid container>
                {Object.keys(indiaHistoryData).length > 1 &&
                  Object.keys(indiaHistoryData).map(
                    (el: any, index: number) => {
                      const labels = Object.keys(
                        indiaHistoryData[el]
                      ).map((el) => moment(el).format("DD MMM YYY"));
                      const confirmedCases = Object.values(
                        indiaHistoryData[el]
                      ).map((e: any) => e.confimed);
                      const deathCases = Object.values(
                        indiaHistoryData[el]
                      ).map((e: any) => e.deaths);
                      const dischargedCases = Object.values(
                        indiaHistoryData[el]
                      ).map((e: any) => e.discharged);
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
                            Timeline in {el}
                          </Typography>

                          <LineChart
                            height={200}
                            labels={labels}
                            renderData={[
                              {
                                count: confirmedCases,
                                countryName: `Confirmed Cases in ${el}`,
                              },
                              {
                                count: deathCases,
                                countryName: `Death Cases in ${el}`,
                              },
                              {
                                count: dischargedCases,
                                countryName: `Death Cases in ${el}`,
                              },
                            ]}
                          />
                        </Grid>
                      );
                    }
                  )}

                {Object.keys(barGraphData).length > 1 &&
                  Object.keys(barGraphData).map((el: any, index: number) => {
                    const labels = barGraphData[el][0].label;
                    const value = barGraphData[el][0].value;

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
                          Date {moment(el).format("DD MMM YYYY")}
                        </Typography>

                        <BarGraph height={170} label={labels} value={value} />
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
      getIndiaDetails: coronaActions.getIndiaDetails,
    },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(withRouter(CountryDetails));
