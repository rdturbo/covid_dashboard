import React from "react";
import {
  Tabs,
  Tab,
  Typography,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { ArrowForward, Tune } from "@material-ui/icons";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { BackButton } from "../../common/backButton";

import * as coronaActions from "../../actions/coronaAction";
import "./USADetails.scss";
import CountryCard from "../CountryDetails/CountryCard";

interface TransactionActionProps {
  getLatestDataUSA: () => void;
}

const USADetails = (props: any) => {
  const [usaProvinces, setUSAProvinces] = React.useState<any>({});
  const [usaProvincesTitle, setUSAProvincesTitle] = React.useState<string[]>(
    []
  );
  const [swipeableIndex, setSwipeableIndex] = React.useState<number>(0);

  React.useEffect(() => {
    const { allDataUSA } = props;
    if (allDataUSA.length > 1) {
      processData(allDataUSA);
    } else {
      getUSAData();
    }
  }, []);

  const processData = (locations: any) => {
    const provinceData: any = {};
    for (let i = 0; i < locations.length; i++) {
      const elm = locations[i];
      if (provinceData[elm.province]) {
        provinceData[elm.province].push(elm);
      } else {
        provinceData[elm.province] = [elm];
      }
    }
    setUSAProvinces(provinceData);
    setUSAProvincesTitle(Object.keys(provinceData));
  };

  const getUSAData = () => {
    const { getLatestDataUSA } = props;
    getLatestDataUSA().then((res: any) => {
      if (res) {
        const { locations } = res;
        processData(locations);
      }
    });
  };

  const handleChange = (event: React.ChangeEvent<{}>, newValue: any) => {
    setSwipeableIndex(newValue);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onClickHandler = () => {
    const { history } = props;
    history.push("/country-history/US");
  };

  const renderSwipableContent = (swipeableIndex: number) => {
    const provinceIndex = usaProvincesTitle[swipeableIndex];
    if (provinceIndex) {
      return usaProvinces[provinceIndex].map((elm: any, i: number) => {
        return (
          <div key={i}>
            <CountryCard
              key={i}
              title={elm.county}
              confirmed={elm.latest.confirmed}
              deaths={elm.latest.deaths}
              recovered={elm.latest.recovered}
              updated={elm.last_updated}
              onClick={() => onClickHandler()}
            />
          </div>
        );
      });
    }
    return <div></div>;
  };

  const renderContent = () => {
    return (
      <Grid container className="container">
        {usaProvincesTitle.length > 1 ? (
          <>
            <Grid item md={3} className="cashflow-mobile--hide">
              <Tabs
                orientation="vertical"
                value={swipeableIndex}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="standard"
                scrollButtons="auto"
                aria-label="scrollable auto tabs"
              >
                {usaProvincesTitle.map((elm: any, i: number) => {
                  return <Tab label={elm} key={i} />;
                })}
              </Tabs>
            </Grid>

            <Grid
              item
              xs={12}
              className="cashflow-desktop--hide margin-bottom-30"
            >
              <Tabs
                style={{ borderBottom: "1px solid #e8e8e8" }}
                value={swipeableIndex}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs"
              >
                {usaProvincesTitle.map((elm: any, i: number) => {
                  return <Tab label={elm} key={i} />;
                })}
              </Tabs>
            </Grid>

            <Grid item md={9} xs={12}>
              {renderSwipableContent(swipeableIndex)}
            </Grid>
          </>
        ) : (
          <div className="page-loader">
            <CircularProgress />
          </div>
        )}
      </Grid>
    );
  };

  return (
    <div className="transactions">
      <Grid className="header">
        <BackButton
          className="header-back-btn-pos--absolute"
          onClick={() => props.history.goBack()}
        />
        <Typography align="center" variant="h4" className="flex-1">
          USA Details
        </Typography>
      </Grid>
      <div className="transactions-content main-content">{renderContent()}</div>
    </div>
  );
};

function mapStateToProps(state: any): any {
  return {
    summaryUSA: state.summaryUSA,
    allDataUSA: state.allDataUSA,
  };
}

function mapDispatchToProps(dispatch: Dispatch): TransactionActionProps {
  return bindActionCreators(
    {
      getLatestDataUSA: coronaActions.getLatestDataUSA,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(USADetails));
