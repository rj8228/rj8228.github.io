// A web line across the top of the page that fills as you read.
import { motion, useScroll, useSpring } from 'motion/react';

export default function ScrollProgress() {
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
	return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}
