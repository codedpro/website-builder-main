"use client";

import React, { useState, useEffect, useRef } from "react";
import { Compare } from "@/components/ui/compare";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { TypingText } from "@/components/ui/CustomTexts";

type ImageDimensions = {
  width: number;
  height: number;
};

type CompareGalleryProps = {
  images: {
    firstImage: string;
    secondImage: string;
    description: string;
  }[];
  headerText: string;
  isRtl: boolean;
  beforeText: string;
  afterText: string;
};

export function CompareGallery({
  images,
  headerText,
  isRtl,
  beforeText,
  afterText,
}: CompareGalleryProps) {
  const windowSize = useWindowSize();
  const MAX_WIDTH = windowSize.width
    ? windowSize.width < 768
      ? windowSize.width * 0.95
      : windowSize.width * 0.6
    : 800;

  const MAX_HEIGHT = windowSize.width
    ? windowSize.width < 768
      ? 500
      : 800
    : 800;

  const [imageDimensions, setImageDimensions] = useState<ImageDimensions[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadImageSizes = async () => {
      const dimensions = await Promise.all(
        images.map(async (pair) => {
          const loadImage = (src: string): Promise<ImageDimensions> =>
            new Promise((resolve) => {
              const img = new Image();
              img.onload = () =>
                resolve({ width: img.width, height: img.height });
              img.onerror = () => resolve({ width: 300, height: 300 });
              img.src = src;
            });

          const firstImageSize = await loadImage(pair.firstImage);
          const secondImageSize = await loadImage(pair.secondImage);

          const maxWidth = Math.max(
            firstImageSize.width,
            secondImageSize.width
          );
          const maxHeight = Math.max(
            firstImageSize.height,
            secondImageSize.height
          );

          return { width: maxWidth, height: maxHeight };
        })
      );
      setImageDimensions(dimensions);
    };

    loadImageSizes();
  }, [images]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const offset = direction === "left" ? -300 : 300;
      scrollContainerRef.current.scrollBy({
        left: offset,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        scroll("left");
      } else if (event.key === "ArrowRight") {
        scroll("right");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative w-full mt-16 px-1 md:px-8">
      {/* Header Text */}
      <div
        className={`text-xl font-bold mb-8 mr-8 ${
          isRtl ? "text-right" : "text-left"
        } `}
      >
        <TypingText
          title={headerText}
          isRtl={isRtl}
          textStyles="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold  mb-8"
        />
      </div>

      <div
        ref={scrollContainerRef}
        className={`w-full overflow-x-auto flex space-x-4 items-center pb-8 ${
          isRtl ? "rtl" : ""
        }`}
        style={{
          scrollbarWidth: "none",
        }}
        dir={isRtl ? "rtl" : "ltr"}
      >
        {/* Hide scrollbar for WebKit browsers */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {images.map((imagePair, index) => {
          const dimensions =
            imageDimensions[index] ||
            ({ width: 300, height: 300 } as ImageDimensions);

          const scaleFactorHeight =
            dimensions.height > MAX_HEIGHT ? MAX_HEIGHT / dimensions.height : 1;
          const scaleFactorWidth =
            dimensions.width > MAX_WIDTH ? MAX_WIDTH / dimensions.width : 1;
          const scaleFactor = Math.min(scaleFactorHeight, scaleFactorWidth);

          const adjustedWidth = dimensions.width * scaleFactor;
          const adjustedHeight = dimensions.height * scaleFactor;

          return (
            <div
              key={index}
              style={{
                width: `${adjustedWidth}px`,
                height: `${adjustedHeight}px`,
              }}
              className="flex-shrink-0 flex items-center justify-center mx-8"
            >
              <div
                style={{
                  width: `${adjustedWidth}px`,
                  height: `${adjustedHeight}px`,
                }}
                className="relative p-1 md:p-4 border rounded-3xl dark:bg-primary-dark bg-primary-light border-secondary-light dark:border-secondary-dark flex flex-col items-center transform transition-transform duration-300 hover:scale-105"
              >
                {/* Before and After Labels */}
                <div
                  className="flex flex-row justify-center gap-4 mb-2"
                  dir="ltr"
                >
                  <span className="text-sm text-primary-dark dark:text-primary-light">
                    {beforeText}
                  </span>
                  <span className="text-sm text-primary-dark dark:text-primary-light">
                    {afterText}
                  </span>
                </div>
                {/* Image Comparison */}
                <Compare
                  firstImage={imagePair.firstImage}
                  secondImage={imagePair.secondImage}
                  firstImageClassName="object-contain w-full h-full"
                  secondImageClassName="object-contain w-full h-full"
                  className="w-full h-full rounded-[22px] md:rounded-lg"
                  slideMode="hover"
                  autoplay={false}
                />

                <div className="absolute bottom-0 left-0 w-full z-50">
                  <div className="overlay-description text-center text-lg font-semibold dark:bg-primary-dark bg-opacity-50 bg-primary-light text-primary-dark dark:text-primary-light py-2 hover:bg-opacity-75 hover:brightness-110 transition duration-300 ease-in-out">
                    {imagePair.description}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className={`absolute -bottom-8 ${
          isRtl ? "left-4" : "right-4"
        } flex gap-2 z-50`}
      >
        <button
          onClick={() => scroll("left")}
          className="bg-secondary-light  dark:bg-secondary-dark bg-opacity-50 hover:bg-opacity-75 text-primary-dark dark:text-primary-light rounded-full p-2 shadow-md"
          aria-label="Scroll Left"
        >
          <FiArrowLeft size={24} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="bg-secondary-light dark:bg-secondary-dark bg-opacity-50 hover:bg-opacity-75 text-primary-dark dark:text-primary-light rounded-full p-2 shadow-md"
          aria-label="Scroll Right"
        >
          <FiArrowRight size={24} />
        </button>
      </div>
    </div>
  );
}

function useWindowSize(): {
    width: number | undefined;
    height: number | undefined;
  } {
    const isClient = typeof window === "object";
  
    const getSize = React.useCallback(() => {
      return {
        width: isClient ? window.innerWidth : undefined,
        height: isClient ? window.innerHeight : undefined,
      };
    }, [isClient]);
  
    const [windowSize, setWindowSize] = useState<{
      width: number | undefined;
      height: number | undefined;
    }>(getSize());
  
    useEffect(() => {
      if (!isClient) {
        return;
      }
  
      function handleResize() {
        setWindowSize(getSize());
      }
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [getSize, isClient]);
  
    return windowSize;
  }
  