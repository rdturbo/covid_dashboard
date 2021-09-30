import React from "react";
import BloomImage from "../custom/BloomImage";
import { Grid, Typography } from "@material-ui/core";
import { BackButton } from "../../common/backButton";
import { withRouter } from "react-router-dom";
import { allCoronaImages } from "../CoronaImage/allCoronaImage";
import "./Illustration.scss";

const CoronaIllustrations = (props: any) => {
  return (
    <>
      <Grid className="header">
        <BackButton
          className="header-back-btn-pos--absolute"
          onClick={() => props.history.goBack()}
        />
        <Typography align="center" variant="h4" className="flex-1">
          Illustrations
        </Typography>
      </Grid>
      <div className="main-content">
        <div className="illustration illustraion-content">
          <Grid container className="container">
            <Grid container className="margin-bottom-15">
              <Typography variant="h3">Covid 19 Illustrations</Typography>
            </Grid>
            {allCoronaImages.map((el: string, index: number) => (
              <BloomImage
                key={index}
                className="photos"
                alt={`CoronaVirus image illustation ${index}`}
                src={require(`../../images/illustrations/${el}`)}
              />
            ))}
          </Grid>
        </div>
      </div>
    </>
  );
};

export default React.memo(withRouter(CoronaIllustrations));
