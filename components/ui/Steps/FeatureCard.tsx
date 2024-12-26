import Image from "next/image";
import styles from "@/styles";

type FeatureCardProps = {
  imgUrl: string;
  title: string;
  subtitle: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  imgUrl,
  title,
  subtitle,
}) => (
  <div className="flex-1 flex flex-col sm:max-w-[250px] min-w-[210px]">
    <div
      className={`${styles.flexCenter} w-[70px] h-[70px] rounded-[24px] dark:bg-tertiary-dark bg-tertiary-light`}
    >
      <Image
        src={imgUrl}
        alt="icon"
        className="w-1/2 h-1/2 object-contain"
        width={35}
        height={35}
      />
    </div>
    <h1 className="mt-[26px] font-bold text-[24px] leading-[30.24px] dark:text-primary-light text-primary-dark ">
      {title}
    </h1>
    <p className="flex-1 mt-[16px] font-normal text-[18px] dark:text-secondary-light text-secondary-dark leading-[32.4px]">
      {subtitle}
    </p>
  </div>
);

export default FeatureCard;
