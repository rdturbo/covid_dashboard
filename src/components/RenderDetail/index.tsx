import React from "react";
import { Grid, Typography } from "@material-ui/core";

const RenderDetail = ({ title, value }: { title: string; value: number }) => (
  <Grid item md={3} xs={12} className="margin-bottom-15">
    <Grid container>
      <Typography
        variant="body1"
        color="textSecondary"
        className="margin-bottom-5"
      >
        {title}
      </Typography>
      <Grid container alignItems="baseline">
        <Typography variant="overline" className="plan-font-size">
          {value?.toLocaleString("en-IN") || 0}
        </Typography>
      </Grid>
    </Grid>
  </Grid>
);

export default RenderDetail;
