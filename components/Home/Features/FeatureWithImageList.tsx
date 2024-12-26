"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Player } from "@lottiefiles/react-lottie-player";
import styles from "@/styles";
import { TitleText, TypingText } from "@/components/ui/CustomTexts";
import { planetVariants, staggerContainer, fadeIn } from "@/utils/motions";
import FeatureCard from "@/components/ui/Steps/FeatureCard";

type Feature = {
  imgUrl: string;
  title: string;
  subtitle: string;
};

type FeatureWithImageListProps = {
  features: Feature[];
  typingText: string;
  titleText: string;
  imageUrl: string;
  isRtl: boolean;
};

const FeatureWithImageList: React.FC<FeatureWithImageListProps> = ({
  features,
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
        dir={isRtl ? "rtl" : ""}
          variants={fadeIn("right", "tween", 0.2, 1) as Variants}
          className="flex-1 flex justify-center flex-col px-6 lg:px-20"
        >
          <TypingText title={typingText} isRtl={isRtl} />
          <TitleText title={titleText}  isRtl={isRtl}/>
          <div className="mt-12 flex flex-wrap justify-center lg:justify-between gap-6">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={planetVariants("right") as Variants}
          className={`flex-1 ${styles.flexCenter}`}
        >
          {isLottie ? (
            <Player
              src={imageUrl}
              className="object-contain w-full h-auto lg:w-[90%] lg:h-[90%]"
              autoplay
              loop
            />
          ) : (
            <Image
              src={imageUrl}
              alt={titleText}
              className="object-contain w-full h-auto lg:w-[90%] lg:h-[90%]"
              width={800}
              height={800}
            />
          )}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FeatureWithImageList;
