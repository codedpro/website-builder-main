"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import styles from "@/styles";
import { Player } from "@lottiefiles/react-lottie-player";

import { fadeIn, planetVariants, staggerContainer } from "@/utils/motions";
import { TitleText, TypingText } from "@/components/ui/CustomTexts";
import StartSteps from "@/components/ui/Steps/StartSteps";

type FeatureWithNumberListProps = {
  startingFeatures: string[];
  titleText: string;
  typingText: string;
  imageUrl: string;
  isRtl: boolean;
};

const FeatureWithNumberList: React.FC<FeatureWithNumberListProps> = ({
  startingFeatures,
  titleText,
  typingText,
  imageUrl,
  isRtl,
}) => {
  const isLottie = /\.(lottie|json)$/i.test(imageUrl);

  return (
    <section className={`${styles.paddings} relative z-10 w-full`}>
      <motion.div
        variants={staggerContainer(0.1, 0.25) as Variants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8`}
      >
        <motion.div
          variants={planetVariants("left") as Variants}
          className={`flex-1 ${styles.flexCenter}`}
        >
          {isLottie ? (
            <Player src={imageUrl} className="w-[85%] h-[85%]" autoplay loop />
          ) : (
            <Image
              src={imageUrl}
              alt="get-started"
              className="w-[85%] h-[85%] object-contain"
              width={800}
              height={800}
            />
          )}
        </motion.div>
        <motion.div
          dir={isRtl ? "rtl" : ""}
          variants={fadeIn("left", "tween", 0.2, 1) as Variants}
          className={`flex-[0.75] flex justify-center flex-col ${
            isRtl ? "mr-28" : ""
          }`}
        >
          <TypingText title={typingText} isRtl={isRtl} />
          <TitleText title={titleText} isRtl={isRtl} />
          <div
            dir={isRtl ? "rtl" : ""}
            className="mt-[31px] flex flex-col max-w-[370px] gap-[24px]"
          >
            {startingFeatures.map((feature, index) => (
              <StartSteps
                isRtl={isRtl}
                key={`${index}-${feature}`}
                number={`${index < 10 ? "0" : ""}${index + 1}`}
                text={feature}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FeatureWithNumberList;
