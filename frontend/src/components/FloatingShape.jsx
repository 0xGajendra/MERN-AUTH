import React from 'react'
import { motion } from "motion/react"
const FloatingShape = ({color, size, top, left, delay}) => {
  return (
    <motion.div
    className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl`}
    style={{top, left}}
    animate={{
        y:["0%", "100%", "0%"],
        x:["9%", "100%", "0%"],
        rotate: [0, 360],
    }}

    transition={{
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        delay: delay
    }}
    aria-hidden='true' //not accessable by screen readers
    />
  )
}

export default FloatingShape
