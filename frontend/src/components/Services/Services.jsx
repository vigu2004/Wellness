import React from "react";
import { GiLungs } from 'react-icons/gi';
import { GiRunningShoe } from 'react-icons/gi';
import { GiMeditation } from 'react-icons/gi';
import { MdHealthAndSafety } from 'react-icons/md';
import { GiLotus } from 'react-icons/gi';
import { FaBrain } from 'react-icons/fa';
import { motion } from "framer-motion";

const ServicesData = [
  {
    id: 1,
    title: "YOGA",
    link: "#",
    icon: <GiMeditation />, // Updated icon for Yoga
    delay: 0.2,
  },  
  {
    id: 2,
    title: "AEROBICS",
    link: "#",
    icon: <GiRunningShoe />, // Updated icon for Aerobics
    delay: 0.3,
  },  
  {
    id: 3,
    title: "PRANAYAM",
    link: "#",
    icon: <GiLungs />, // Updated icon for Pranayam
    delay: 0.4,
  },
  {
    id: 9,
    title: "HEALTH ASSESSMENTS",
    link: "#",
    icon: <MdHealthAndSafety />, // Updated icon for Health Assessments
    delay: 1.0,
  },
  {
    id: 5,
    title: "STRESS MANAGEMENT",
    link: "#",
    icon: <FaBrain />, // Updated icon for Stress Management
    delay: 0.9,
  },
  {
    id: 6,
    title: "MEDITATION SESSIONS",
    link: "#",
    icon: <GiLotus />, // Updated icon for Meditation
    delay: 0.7,
  },
];

const SlideLeft = (delay) => {
  return {
    initial: {
      opacity: 0,
      x: 50,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };
};
const Services = () => {
  return (
    <section className="bg-white">
      <div className="container pb-14 pt-16">
        <h1 className="text-4xl font-bold text-left pb-10">
          Services we provide
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
          {ServicesData.map((service) => (
            <motion.div
              variants={SlideLeft(service.delay)}
              initial="initial"
              whileInView={"animate"}
              viewport={{ once: true }}
              className="bg-[#f4f4f4] rounded-2xl flex flex-col gap-4 items-center justify-center p-4 py-7 hover:bg-white hover:scale-110 duration-300 hover:shadow-2xl"
            >
              <div className="text-4xl mb-4"> {service.icon}</div>
              <h1 className="text-lg font-semibold text-center px-3">
                {service.title}
              </h1>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
