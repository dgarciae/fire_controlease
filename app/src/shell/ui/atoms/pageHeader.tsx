import { motion } from "framer-motion";

/* **
 * Props and types
 ** */

interface PageHeaderProps {
  title: string;
}

/* **
 * Component
 ** */

export function PageHeader({ title }: PageHeaderProps) {
  /* Render */

  return (
    <header id="page-header" className="relative z-10 my-4 pb-1">
      <h1 className="text-text w-full overflow-hidden text-4xl leading-[initial] font-bold tracking-tight text-ellipsis whitespace-nowrap sm:text-5xl">
        {title}
      </h1>
      <motion.div
        className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-red-500 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{
          duration: 0.45,
          delay: 0.15,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        style={{ transformOrigin: "left" }}
      />
    </header>
  );
}
