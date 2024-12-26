"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";

interface BeamOptions {
  initialX?: number;
  translateX?: number;
  initialY?: number;
  translateY?: number;
  rotate?: number;
  className?: string;
  duration?: number;
  delay?: number;
  repeatDelay?: number;
  color?: string;
}

export const BackgroundBeamsWithCollision = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const [beams, setBeams] = useState<BeamOptions[]>([]);

  const colors = [
    "from-[#888888] via-[#AAAAAA] to-transparent",
    "from-[#666666] via-[#999999] to-transparent",
    "from-[#AAAAAA] via-[#BBBBBB] to-transparent",
    "from-[#444444] via-[#777777] to-transparent",
    "from-[#BBBBBB] via-[#DDDDDD] to-transparent",
  ];

  const recalculateBeams = () => {
    const screenWidth = window.innerWidth;
    const usableWidth = screenWidth * 0.8;

    setBeams([
      {
        initialX: usableWidth * 0.02,
        translateX: usableWidth * 0.02,
        duration: 7,
        repeatDelay: 3,
        delay: 2,
      },
      {
        initialX: usableWidth * 0.5,
        translateX: usableWidth * 0.5,
        duration: 3,
        repeatDelay: 3,
        delay: 4,
      },
      {
        initialX: usableWidth * 0.1,
        translateX: usableWidth * 0.1,
        duration: 7,
        repeatDelay: 7,
        className: "h-6",
      },
      {
        initialX: usableWidth * 0.4,
        translateX: usableWidth * 0.4,
        duration: 5,
        repeatDelay: 14,
        delay: 4,
      },
      {
        initialX: usableWidth * 0.8,
        translateX: usableWidth * 0.8,
        duration: 11,
        repeatDelay: 2,
        className: "h-20",
      },
      {
        initialX: usableWidth * 1.0,
        translateX: usableWidth * 1.0,
        duration: 4,
        repeatDelay: 2,
        className: "h-12",
      },
      {
        initialX: usableWidth * 1.2,
        translateX: usableWidth * 1.2,
        duration: 6,
        repeatDelay: 4,
        delay: 2,
        className: "h-6",
      },
    ]);
  };

  useEffect(() => {
    recalculateBeams();
    window.addEventListener("resize", recalculateBeams);

    return () => {
      window.removeEventListener("resize", recalculateBeams);
    };
  }, []);

  return (
    <div
      ref={parentRef}
      className={cn(
        "h-screen md:h-[40rem] relative flex items-center w-full justify-center overflow-hidden",
        className
      )}
    >
      {beams.map((beam, index) => (
        <CollisionMechanism
          key={index}
          beamOptions={{
            ...beam,
            color: colors[Math.floor(Math.random() * colors.length)],
          }}
          containerRef={containerRef}
          parentRef={parentRef}
        />
      ))}
      {children}
      <div
        ref={containerRef}
        className="absolute bottom-0 w-full inset-x-0 pointer-events-none"
        style={{
          boxShadow:
            "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
        }}
      ></div>
    </div>
  );
};

const CollisionMechanism = React.forwardRef<
  HTMLDivElement,
  {
    containerRef: React.RefObject<HTMLDivElement>;
    parentRef: React.RefObject<HTMLDivElement>;
    beamOptions?: BeamOptions;
  }
>(({ parentRef, containerRef, beamOptions = {} }, ref) => {
  const beamRef = useRef<HTMLDivElement>(null);
  const [collision, setCollision] = useState<{
    detected: boolean;
    coordinates: { x: number; y: number } | null;
  }>({
    detected: false,
    coordinates: null,
  });
  const [beamKey, setBeamKey] = useState(0);
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

  useEffect(() => {
    const checkCollision = () => {
      if (
        beamRef.current &&
        containerRef.current &&
        parentRef.current &&
        !cycleCollisionDetected
      ) {
        const beamRect = beamRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const parentRect = parentRef.current.getBoundingClientRect();

        if (beamRect.bottom >= containerRect.top) {
          const relativeX =
            beamRect.left - parentRect.left + beamRect.width / 2;
          const relativeY = beamRect.bottom - parentRect.top;

          setCollision({
            detected: true,
            coordinates: {
              x: relativeX,
              y: relativeY,
            },
          });
          setCycleCollisionDetected(true);
        }
      }
    };

    const animationInterval = setInterval(checkCollision, 50);

    return () => clearInterval(animationInterval);
  }, [cycleCollisionDetected, containerRef, parentRef]);

  useEffect(() => {
    if (collision.detected && collision.coordinates) {
      setTimeout(() => {
        setCollision({ detected: false, coordinates: null });
        setCycleCollisionDetected(false);
      }, 2000);

      setTimeout(() => {
        setBeamKey((prevKey) => prevKey + 1);
      }, 2000);
    }
  }, [collision]);

  return (
    <>
      <motion.div
        key={beamKey}
        ref={beamRef}
        animate="animate"
        initial={{
          translateY: beamOptions.initialY || "-200px",
          translateX: beamOptions.initialX || "0px",
          rotate: beamOptions.rotate || 0,
        }}
        variants={{
          animate: {
            translateY: beamOptions.translateY || "1800px",
            translateX: beamOptions.translateX || "0px",
            rotate: beamOptions.rotate || 0,
          },
        }}
        transition={{
          duration: beamOptions.duration || 8,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          delay: beamOptions.delay || 0,
          repeatDelay: beamOptions.repeatDelay || 0,
        }}
        className={cn(
          `absolute left-0 top-20 m-auto h-14 w-px rounded-full bg-gradient-to-t ${beamOptions.color}`,
          beamOptions.className
        )}
      />
      <AnimatePresence>
        {collision.detected && collision.coordinates && (
          <Explosion
            key={`${collision.coordinates.x}-${collision.coordinates.y}`}
            ref={ref}
            className=""
            style={{
              left: `${collision.coordinates.x}px`,
              top: `${collision.coordinates.y}px`,
              transform: "translate(-50%, -50%)",
            }}
            color={beamOptions.color}
          />
        )}
      </AnimatePresence>
    </>
  );
});

CollisionMechanism.displayName = "CollisionMechanism";

const Explosion = ({
  color,
  ...props
}: React.HTMLProps<HTMLDivElement> & { color?: string }) => {
  const spans = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    initialX: 0,
    initialY: 0,
    directionX: Math.floor(Math.random() * 80 - 40),
    directionY: Math.floor(Math.random() * -50 - 10),
  }));

  return (
    <div {...props} className={cn("absolute z-50 h-2 w-2", props.className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className={`absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full bg-gradient-to-r from-transparent via-${color} to-transparent blur-sm`}
      ></motion.div>
      {spans.map((span) => (
        <motion.span
          key={span.id}
          initial={{ x: span.initialX, y: span.initialY, opacity: 1 }}
          animate={{
            x: span.directionX,
            y: span.directionY,
            opacity: 0,
          }}
          transition={{ duration: Math.random() * 1.5 + 0.5, ease: "easeOut" }}
          className={`absolute h-1 w-1 rounded-full bg-gradient-to-b ${color}`}
        />
      ))}
    </div>
  );
};
