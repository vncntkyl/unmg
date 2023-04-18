import React, { useEffect, useState } from "react";

export default function LazyImage({ src, alt }) {
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
    <img src={imageSrc} alt={alt} className="max-w-[2rem] rounded-full object-cover aspect-square" />
  ) : (
    <div>Loading...</div>
  );
}
