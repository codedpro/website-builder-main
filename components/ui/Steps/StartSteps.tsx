import styles from "@/styles";

type StartStepsProps = {
  number: string | number;
  text: string;
  isRtl: boolean;
};

const StartSteps: React.FC<StartStepsProps> = ({ number, text, isRtl }) => (
  <div className={`${styles.flexCenter} flex-row`}>
    <div
      className={`${styles.flexCenter} w-[70px] h-[70px] rounded-[24px] bg-tertiary-light dark:bg-tertiary-dark `}
    >
      <p className="font-bold text-[20px] dark:text-secondary-light text-secondary-dark">{number}</p>
    </div>
    <p
      className={`flex-1 ${
        isRtl ? "mr-[30px]" : "ml-[30px]"
      }  font-normal text-[18px] dark:text-secondary-light text-secondary-dark leading-[32.4px]`}
    >
      {text}
    </p>
  </div>
);

export default StartSteps;
