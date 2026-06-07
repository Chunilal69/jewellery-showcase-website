import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

interface Props {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export default function Reveal({ children, width = "fit-content", delay = 0, direction = "up" }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const getHiddenState = () => {
    switch (direction) {
      case "up": return { opacity: 0, y: 75 };
      case "down": return { opacity: 0, y: -75 };
      case "left": return { opacity: 0, x: 75 };
      case "right": return { opacity: 0, x: -75 };
      default: return { opacity: 0, y: 75 };
    }
  };

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: getHiddenState(),
          visible: { opacity: 1, y: 0, x: 0 },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
