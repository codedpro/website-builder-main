import styles from "@/styles";

type BenefitCardProps = {
  text: string;
  isRtl: boolean;
};

const BenefitCard: React.FC<BenefitCardProps> = ({ text, isRtl }) => (
  <div className="flex-1 flex flex-col sm:max-w-[250px] min-w-[210px]">
    <div className="flex items-start">
      <div
        className={`${styles.flexCenter} flex-shrink-0 w-[12px] h-[12px] rounded-full bg-tertiary-light dark:bg-tertiary-dark mt-1`}
      >
        <div className="w-[5px] h-[5px] rounded-full dark:bg-secondary-light bg-secondary-dark" />
      </div>
      <p
        className={`${
          isRtl ? "mr-2" : "ml-2"
        } text-sm font-semibold dark:text-primary-light text-primary-dark leading-[1.4]`}
      >
        {text}
      </p>
    </div>
  </div>
);

export default BenefitCard;
