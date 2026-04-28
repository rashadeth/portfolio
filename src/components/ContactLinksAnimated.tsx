"use client";

import { motion } from "framer-motion";

type ContactLink = {
  label: string;
  href: string;
};

type ContactLinksAnimatedProps = {
  links: ContactLink[];
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function ContactLinksAnimated({ links }: ContactLinksAnimatedProps) {
  return (
    <motion.div
      className="mt-10 sm:mt-12"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      {links.map((itemLink) => (
        <motion.div
          key={itemLink.label}
          variants={item}
          whileHover={{ x: 2 }}
          className="group grid w-full grid-cols-[1fr_auto] items-center border-b border-white/[0.05] py-5 sm:py-6"
        >
          <span className="text-xs font-light uppercase tracking-[0.18em] sm:text-sm">{itemLink.label}</span>
          <motion.a
            href={itemLink.href}
            target={itemLink.href.startsWith("http") ? "_blank" : undefined}
            rel={itemLink.href.startsWith("http") ? "noopener noreferrer" : undefined}
            aria-label={`Open ${itemLink.label}`}
            className="justify-self-end text-lg font-light text-white"
            whileHover={{ x: 6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            →
          </motion.a>
        </motion.div>
      ))}
    </motion.div>
  );
}
