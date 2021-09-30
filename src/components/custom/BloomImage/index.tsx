import React from "react";
import { Skeleton, SkeletonProps } from "@material-ui/lab";
import "./BloomImage.scss";

interface BloomImageProps extends SkeletonProps {
  src?: string;
  className?: string;
  alt?: string;
  icon?: boolean;
  onClick?: () => void;
}

const BloomImage = (props: BloomImageProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const { src, className, alt, icon, onClick } = props;

  return (
    <>
      <img
        src={src}
        className={`${className} ${isLoading ? "hide-image" : ""}`}
        alt={alt}
        onLoad={() => {
          setIsLoading(false);
        }}
        onClick={onClick}
      />

      {isLoading ? (
        <Skeleton
          variant="rect"
          animation="wave"
          width={"100%"}
          height={"100%"}
          className={`${className} ${icon ? "icon-skeleton" : "skeleton-item"}`}
        />
      ) : null}
    </>
  );
};

export default BloomImage;
