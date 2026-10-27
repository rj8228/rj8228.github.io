// The painted scene drifts slower than the page (parallax) and zooms out a touch on load.
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

export default function HeroScene({ src }: { src: string }) {
	const reduce = useReducedMotion();
	const { scrollY } = useScroll();
	const y = useTransform(scrollY, [0, 800], [0, reduce ? 0 : 220]);
	const scale = useTransform(scrollY, [0, 800], [1, reduce ? 1 : 1.12]);
	return (
		<motion.img
			src={src}
			alt=""
			style={{ y, scale }}
			initial={reduce ? false : { opacity: 0, scale: 1.25 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
		/>
	);
}
