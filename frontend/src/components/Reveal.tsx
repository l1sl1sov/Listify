import { useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

interface RevealProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    yOffset?: number;
    scaleEffect?: boolean;
    rotateEffect?: boolean;
}

//component for animations while scrolling on child
  
export const Reveal = ({
    children,
    delay = 0.25,
    duration = 0.6,
    yOffset = 10,
    scaleEffect = false,
    rotateEffect = false}: RevealProps) => {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const controls = useAnimation();
    
    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        };
    }, [controls, isInView])

    return(
    <motion.div
    ref={ref}
    variants={{
        hidden: { 
          opacity: 0, 
          y: yOffset,
          scale: scaleEffect ? 0.95 : 1,
          rotate: rotateEffect ? 2 : 0,
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: 0,
          transition: {
            duration: duration,
            delay: delay,
            ease: [0.16, 0.77, 0.47, 0.97],
            when: "beforeChildren",
            staggerChildren: 0.1,
          },
        },
      }}
    initial='hidden'
    animate={controls}>
        {children}
    </motion.div>
    )
}