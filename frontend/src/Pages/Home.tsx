import { Button } from "@/components/ui/button";
import { FC } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/Spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const words =
  "Because managing money with friends shouldn't feel like math class.";

const Home: FC = () => {
  return (
    <motion.div
      className="relative flex flex-col justify-center items-center text-center min-h-[90vh] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background Light Effect */}
      <Spotlight
        className="absolute left-0 top-20 md:left-32 md:top-0 lg:left-64 lg:-top-60 opacity-20 blur-2xl"
        fill="white"
      />

      {/* Hero Content */}
      <div className="z-10 flex flex-col justify-center items-center px-4">
        <h1 className="tracking-tight text-[clamp(3rem,5vw,4rem)] leading-[1.1] font-bold mb-6 mt-16">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="block"
          >
            Sharing Bills{" "}
            <span className="bg-gradient-to-r from-teal-400 via-purple-500 to-orange-500 bg-clip-text text-transparent animate-gradient">
              Without the Thrills
            </span>{" "}
            (or Fights...){" "}
          </motion.span>
        </h1>


        {/* Subtext */}
        <TextGenerateEffect
          className="text-center font-light text-lg md:text-2xl max-w-2xl mx-auto mb-10"
          words={words}
        />

        {/* Get Started Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Button
            asChild
            className="inline-flex h-14 items-center justify-center rounded-full border-2 border-teal-400/50 bg-gradient-to-r from-black via-gray-900 to-black bg-[length:200%_100%] hover:scale-105 hover:shadow-lg transition-all duration-300 px-8 font-semibold text-white"
          >
            <Link to="/signup">Get Started</Link>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
