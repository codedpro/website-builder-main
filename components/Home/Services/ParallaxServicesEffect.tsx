"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const ParallaxServicesEffect = ({
  services,
  title,
  subtitle,
  isRtl,
}: {
  title: string;
  isRtl: boolean;
  subtitle: string;
  services: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const [sectionHeight, setSectionHeight] = useState("auto");
  const firstRow = services.slice(0, 3);
  const secondRow = services.slice(3, 6);
  const thirdRow = services.slice(6, 9);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  useEffect(() => {
    if (ref.current) {
      const totalHeight = ref.current.scrollHeight;
      setSectionHeight(`${totalHeight + 500}px`);
    }
  }, [services]);

  return (
    <div
      ref={ref}
      style={{ minHeight: "100vh", height: sectionHeight }}
      className="w-full py-40 flex flex-col justify-start overflow-hidden no-scrollbar antialiased relative [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header title={title} subtitle={subtitle} isRtl={isRtl} />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="flex-grow mt-40 md:mt-0"
      >
        <motion.div
          className="flex flex-row-reverse space-x-reverse no-scrollbar space-x-20 mb-20 overflow-y-hidden overflow-x-auto scroll-snap-x [scroll-snap-type:x mandatory] -mx-4 px-4"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title + product.thumbnail + product.link}
            />
          ))}
        </motion.div>
        <motion.div
          className="flex flex-row mb-20 space-x-20 no-scrollbar overflow-x-auto overflow-y-hidden scroll-snap-x [scroll-snap-type:x mandatory] -mx-4 px-4"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title + product.thumbnail + product.link}
            />
          ))}
        </motion.div>
        <motion.div
          className="flex flex-row-reverse space-x-reverse no-scrollbar overflow-y-hidden space-x-20 overflow-x-auto scroll-snap-x [scroll-snap-type:x mandatory] -mx-4 px-4"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title + product.thumbnail + product.link}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = ({
  title,
  subtitle,
  isRtl,
}: {
  title: string;
  subtitle: string;
  isRtl: boolean;
}) => {
  return (
    <div
      dir={isRtl ? "rtl" : ""}
      className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0"
    >
      <h1 className="text-2xl md:text-7xl font-bold text-primary-dark dark:text-primary-light ">
        {title}
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 text-secondary-dark dark:text-secondary-light">
        {subtitle}
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title + product.thumbnail + product.link}
      className="group/product h-[27vh] md:h-96 w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl relative flex-shrink-0 scroll-snap-align-center"
    >
      <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl"
      >
        <Image
          src={product.thumbnail}
          fill={true}
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  );
};
