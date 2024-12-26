"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Player } from "@lottiefiles/react-lottie-player";
import styles from "@/styles";
import { TitleText, TypingText } from "@/components/ui/CustomTexts";
import { staggerContainer, fadeIn, planetVariants } from "@/utils/motions";
import BenefitCard from "@/components/ui/Steps/BenefitCard";

type Benefit = {
  texts: string;
};

type FeaturesWithDotListProps = {
  benefits: Benefit[];
  typingText: string;
  titleText: string;
  imageUrl: string;
  isRtl: boolean;
};

const FeaturesWithDotList: React.FC<FeaturesWithDotListProps> = ({
  benefits,
  typingText,
  titleText,
  imageUrl,
  isRtl,
}) => {
  const isLottie = /\.(lottie|json)$/i.test(imageUrl);

  return (
    <section className={`${styles.paddings} relative z-10 w-full`}>
      <motion.div
        variants={staggerContainer(0.1, 0)}
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
            <Player
              src={imageUrl}
              className="object-contain w-full h-auto lg:w-[85%] lg:h-[85%]"
              autoplay
              loop
            />
          ) : (
            <Image
              src={imageUrl}
              alt={titleText}
              className="object-contain w-full h-auto lg:w-[85%] lg:h-[85%]"
              width={800}
              height={800}
            />
          )}
        </motion.div>

        <motion.div
          variants={fadeIn("left", "tween", 0.2, 1) as Variants}
          className={`${isRtl ? "md:mr-32" : ""} flex-1 flex justify-center flex-col`}
        >
          <TypingText title={typingText} isRtl={isRtl} />

          <TitleText title={titleText} isRtl={isRtl} />

          <div  dir={isRtl ? "rtl" : ""} className="mt-12 grid grid-cols-1 md:grid-cols-2 justify-center gap-6">
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} text={benefit.texts} isRtl={isRtl}/>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FeaturesWithDotList;
