import classNames from "classnames";
import React, { useEffect, useState } from "react";

export default function LazyImage({ src, alt, large, square }) {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const module = await import("../" + src);
        setImageSrc(module.default);
      } catch (error) {
        console.error(`Failed to load image: ${src}`, error);
      }
    };

    loadImage();
  }, [src]);

  return imageSrc ? (
    <img src={imageSrc} alt={alt} className={classNames(large ? "w-[50%] max-w-[100px]" : "max-w-[2rem]","object-cover aspect-square", square ? "rounded-lg" : "rounded-full")} />
  ) : (
    <div>Loading...</div>
  );
}
