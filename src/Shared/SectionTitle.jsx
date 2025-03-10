import React from "react";
import { TextAnimate } from "../components/magicui/text-animate";

const SectionTitle = ({ title, subTitle }) => {
  return (
    <div>
      <TextAnimate
        variants={{
            hidden: {
              opacity: 0,
              y: 30,
              rotate: 45,
              scale: 0.5,
            },
            show: (i) => ({
              opacity: 1,
              y: 0,
              rotate: 0,
              scale: 1,
              transition: {
                delay: i * 0.1,
                duration: 0.4,
                y: {
                  type: "spring",
                  damping: 12,
                  stiffness: 200,
                  mass: 0.8,
                },
                rotate: {
                  type: "spring",
                  damping: 8,
                  stiffness: 150,
                },
                scale: {
                  type: "spring",
                  damping: 10,
                  stiffness: 300,
                },
              },
            }),
            exit: (i) => ({
              opacity: 0,
              y: 30,
              rotate: 45,
              scale: 0.5,
              transition: {
                delay: i * 0.1,
                duration: 0.4,
              },
            }),
          }}
          by="character"
        className="text-3xl font-bold text-center text-gray-800 mb-4"
      >
        {title}
      </TextAnimate>
      <TextAnimate
        variants={{
          hidden: {
            opacity: 0,
            y: 30,
            rotate: 45,
            scale: 0.5,
          },
          show: (i) => ({
            opacity: 1,
            y: 0,
            rotate: 0,
            scale: 1,
            transition: {
              delay: i * 0.1,
              duration: 0.4,
              y: {
                type: "spring",
                damping: 12,
                stiffness: 200,
                mass: 0.8,
              },
              rotate: {
                type: "spring",
                damping: 8,
                stiffness: 150,
              },
              scale: {
                type: "spring",
                damping: 10,
                stiffness: 300,
              },
            },
          }),
          exit: (i) => ({
            opacity: 0,
            y: 30,
            rotate: 45,
            scale: 0.5,
            transition: {
              delay: i * 0.1,
              duration: 0.4,
            },
          }),
        }}
        by="character"
        className="text-lg text-center text-gray-800 mb-8"
      >
        {subTitle}
      </TextAnimate>
    </div>
  );
};

export default SectionTitle;
