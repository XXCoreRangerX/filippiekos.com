"use client";

import { motion } from "framer-motion";
import React from "react";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ y: 15, opacity: 0.01 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.3 }}
        >
            {children}
        </motion.div>
    );
}
