import { motion } from "framer-motion";

/* **
 * Props and types
 ** */

interface PageHeaderProps {
  title: string;
  showShadow?: boolean;
}

/* **
 * Component
 ** */

export function PageHeader({ title, showShadow = false }: PageHeaderProps) {
  /* Render */

  return (
    <header id="page-header" className="relative z-10">
      <h1 className="text-text w-full overflow-hidden text-4xl leading-[initial] font-bold tracking-tight text-ellipsis whitespace-nowrap sm:text-5xl">
        {title}
      </h1>
      {showShadow && (
        <motion.div
          className="from-base-color-pri absolute bottom-0 left-0 h-px w-full bg-gradient-to-r to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{
            duration: 0.45,
            delay: 0.15,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          style={{ transformOrigin: "left" }}
        />
      )}
    </header>
  );
}
