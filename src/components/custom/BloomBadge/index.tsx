import React from "react";

import { Typography } from "@material-ui/core";

import "./BloomBadge.scss";

interface BloomBadgeProps {
  className?: string;
  color: string;
  label: string;
}

const BloomBadge = (props: BloomBadgeProps) => {
  const { className, color, label } = props;
  const style = {
    color: color,
  };
  const backgroundStyle = {
    backgroundColor: color,
  };

  return (
    <div className={`bloom-badge${className ? ` ${className}` : ""}`}>
      <div className="bloom-badge-background" style={backgroundStyle}></div>
      <Typography
        className="text--medium"
        color="inherit"
        variant="body2"
        style={style}
      >
        {label}
      </Typography>
    </div>
  );
};
export default BloomBadge;
