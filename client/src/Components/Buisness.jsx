import React from "react";
import star from "../assets/Star.svg";
import shield from "../assets/Shield.svg";
import send from "../assets/Send.svg";

const features = [
  {
    id: "feature-1",
    icon: star,
    title: "Salary Advance",
    content:
      "Employees can request a portion of their next month's salary in advance as a loan, facilitating financial flexibility and planning.",
  },
  {
    id: "feature-2",
    icon: shield,
    title: "Automated Disbursement",
    content:
      "Efficiently disburse salaries to employees on a predefined date using our automated system, ensuring timely and secure payments.",
  },
  {
    id: "feature-3",
    icon: send,
    title: "NFT Salary Slips",
    content:
      "Salary slips are stored as non-fungible tokens (NFTs) on the blockchain, providing immutable records and enhanced security.",
  },
];

const styles = {
  boxWidth: "xl:max-w-[1280px] w-full",
  heading2:
    "font-poppins font-semibold xs:text-[48px] text-[40px] text-black xs:leading-[76.8px] leading-[66.8px] w-full",
  paragraph:
    "font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px]",
  flexCenter: "flex justify-center",
  flexStart: "flex justify-center items-start",
  paddingX: "sm:px-16 px-6",
  paddingY: "sm:py-16 py-6",
  padding: "sm:px-16 px-6 sm:py-12 py-4",
  marginX: "sm:mx-16 mx-6",
  marginY: "sm:my-16 my-6",
};

export const layout = {
  section: `flex md:flex-row flex-col ${styles.paddingY}`,
  sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,
  sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
  sectionImg: `flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,
  sectionInfo: `flex-1 ${styles.flexStart}  flex-col`,
};

const Button = ({ styles }) => (
  <button
    type="button"
    className={`py-4 px-6 font-poppins font-medium text-[18px] text-white bg-black rounded-[10px] outline-none ${styles}`}
    data-aos="fade-up"
  >
    Get Started
  </button>
);

const FeatureCard = ({ icon, title, content, index }) => (
  <div
    className={`flex flex-row p-6 rounded-[20px] justify-center items-center ${
      index !== features.length - 1 ? "mb-6" : "mb-0"
    } feature-card`}
  >
    <div
      className={`w-[64px] h-[64px] ${styles.flexCenter} bg-dimBlue`}
    >
      <img src={icon} alt="star" className="w-[50%] h-[50%] object-contain" />
    </div>
    <div className="flex-1 flex flex-col ml-3">
      <h4 className="font-poppins font-semibold text-black text-[23px]  mb-1">
        {title}
      </h4>
    </div>
  </div>
);

const Business = () => (
  <section
    id="features"
    className={`${layout.section} pl-[120px] m-[30px] text-black bg-white`}
  >
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>Empower Your Salary Management</h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Explore the features that make our platform ideal for decentralized salary management.
        Provide salary advances, automate disbursements, and store salary slips securely as NFTs.
      </p>
      <Button styles={`mt-10`} />
    </div>
    <div className={`${layout.sectionImg} flex-col`}>
      {features.map((feature, index) => (
        <FeatureCard key={feature.id} {...feature} index={index} />
      ))}
    </div>
  </section>
);

export default Business;
