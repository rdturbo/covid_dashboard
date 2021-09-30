import React from "react";
import BloomImage from "../custom/BloomImage";
import { Grid } from "@material-ui/core";
import { allCoronaImages, randomIntFromInterval } from "./allCoronaImage";
import "./CoronaImage.scss";

const CoronaImage = () => {
  const random1 = allCoronaImages[randomIntFromInterval(0, 112)] || "60rtu.jpg";
  const random2 = allCoronaImages[randomIntFromInterval(0, 112)] || "60rtu.jpg";
  const random3 = allCoronaImages[randomIntFromInterval(0, 112)] || "60rtu.jpg";

  return (
    <Grid className="container">
      <div className="corona-image">
        <Grid container>
          <Grid className="image-container--large">
            <BloomImage
              alt="CoronaVirus image illustation"
              src={require(`../../images/illustrations/${random1}`)}
              className="image-container--large"
            />
            <BloomImage
              alt="CoronaVirus image illustation"
              src={require(`../../images/illustrations/${random2}`)}
              className="image-container--large corona-image-mobile--hide"
            />
            <BloomImage
              alt="CoronaVirus image illustation"
              src={require(`../../images/illustrations/${random3}`)}
              className="image-container--large corona-image-mobile--hide"
            />
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};

export default React.memo(CoronaImage);
