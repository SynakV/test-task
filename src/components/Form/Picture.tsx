import React from "react";
import NextImage from "next/image";
import type { PictureType } from "../utils/types";

export const Picture = ({ image, position }: PictureType) => {
  return (
    <div className="picture">
      {image && (
        <NextImage
          src={image}
          alt="image"
          width={100}
          height={100}
          className="image"
        />
      )}
      {position && (
        <NextImage
          width={50}
          height={50}
          alt="ribbon"
          src="/red-corner-ribbon.png"
          className={`ribbon ribbon--${position}`}
        />
      )}
    </div>
  );
};
