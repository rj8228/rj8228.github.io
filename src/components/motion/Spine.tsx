// The timeline's centre spine draws itself downward as the reader scrolls through the chapters.
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { useRef } from 'react';

export default function Spine() {
	const ref = useRef<HTMLDivElement>(null);
	const reduce = useReducedMotion();
	const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] });
	const scaleY = useSpring(scrollYProgress, { stiffness: 140, damping: 26 });
	return (
		<div ref={ref} className="spine" aria-hidden="true">
			<motion.div className="spine-fill" style={{ scaleY: reduce ? 1 : scaleY }} />
		</div>
	);
}
