import React from "react";
import { GiLungs, GiRunningShoe, GiMeditation, GiLotus } from 'react-icons/gi';
import { MdHealthAndSafety } from 'react-icons/md';
import { FaBrain } from 'react-icons/fa';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";  // Import useNavigate

// Data for the services
const ServicesData = [
  {
    id: 1,
    title: "YOGA",
    link: "#",
    icon: <GiMeditation />,
    delay: 0.2,
  },
  {
    id: 2,
    title: "AEROBICS",
    link: "#",
    icon: <GiRunningShoe />,
    delay: 0.3,
  },
  {
    id: 3,
    title: "PRANAYAM",
    link: "#",
    icon: <GiLungs />,
    delay: 0.4,
  },
  {
    id: 9,
    title: "HEALTH ASSESSMENTS",
    link: "#",
    icon: <MdHealthAndSafety />,
    delay: 1.0,
  },
  {
    id: 5,
    title: "STRESS MANAGEMENT",
    link: "#",
    icon: <FaBrain />,
    delay: 0.9,
  },
  {
    id: 6,
    title: "MEDITATION SESSIONS",
    link: "#",
    icon: <GiLotus />,
    delay: 0.7,
  },
];

// Animation for the services section
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
  const navigate = useNavigate();  // Initialize navigate hook

  // Function to navigate to the Pricing page
  const handleJoinBatches = () => {
    navigate("/pricing");  // Navigate to the PricingApp component
  };

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
              key={service.id}
            >
              <div className="text-4xl mb-4"> {service.icon}</div>
              <h1 className="text-lg font-semibold text-center px-3">
                {service.title}
              </h1>
            </motion.div>
          ))}
        </div>

        {/* Join Batches Button */}
        <div className="text-center mt-8">
          <button
            className="py-2 px-6 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-600 transform hover:scale-105 transition duration-300 ease-in-out"
            onClick={handleJoinBatches}  // Handle click event
          >
            Join Paid Batches
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
