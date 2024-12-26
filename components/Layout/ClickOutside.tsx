import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface Props {
  children: React.ReactNode;
  exceptionRef?: React.RefObject<HTMLElement>;
  onClick: () => void;
  className?: string;
}

const ClickOutside: React.FC<Props> = ({
  children,
  exceptionRef,
  onClick,
  className,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentWrapperRef = wrapperRef.current; // Capture the current value of wrapperRef

    if (currentWrapperRef) {
      gsap.fromTo(
        currentWrapperRef,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
      );
    }

    return () => {
      if (currentWrapperRef) {
        gsap.to(currentWrapperRef, { opacity: 0, scale: 0.8, duration: 0.2 });
      }
    };
  }, []);

  useEffect(() => {
    const handleClickListener = (event: MouseEvent) => {
      const currentWrapperRef = wrapperRef.current; // Safely capture wrapperRef in each event listener invocation
      let clickedInside: null | boolean = false;

      if (exceptionRef) {
        clickedInside =
          (currentWrapperRef && currentWrapperRef.contains(event.target as Node)) ||
          (exceptionRef.current && exceptionRef.current === event.target) ||
          (exceptionRef.current &&
            exceptionRef.current.contains(event.target as Node));
      } else {
        clickedInside =
          currentWrapperRef && currentWrapperRef.contains(event.target as Node);
      }

      if (!clickedInside) onClick();
    };

    document.addEventListener("mousedown", handleClickListener);

    return () => {
      document.removeEventListener("mousedown", handleClickListener);
    };
  }, [exceptionRef, onClick]);

  return (
    <div ref={wrapperRef} className={`${className || ""}`}>
      {children}
    </div>
  );
};

export default ClickOutside;
