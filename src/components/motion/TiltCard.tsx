// A comic panel that tilts toward the pointer in 3D, with a spotlight that follows it.
// Touch and reduced-motion users get a flat card.
import { motion, MotionConfig, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react';
import type { PointerEvent, ReactNode } from 'react';

export default function TiltCard({ children, className }: { children?: ReactNode; className?: string }) {
	const px = useMotionValue(0.5);
	const py = useMotionValue(0.5);
	const lit = useMotionValue(0);
	const spring = { stiffness: 220, damping: 18 };
	const rotateY = useSpring(useTransform(px, [0, 1], [-9, 9]), spring);
	const rotateX = useSpring(useTransform(py, [0, 1], [9, -9]), spring);
	const glowOpacity = useSpring(lit, spring);
	const glow = useMotionTemplate`radial-gradient(260px circle at ${useTransform(px, (v) => v * 100)}% ${useTransform(py, (v) => v * 100)}%, rgba(245, 158, 11, 0.28), transparent 70%)`;

	const move = (e: PointerEvent<HTMLElement>) => {
		if (e.pointerType !== 'mouse') return;
		const r = e.currentTarget.getBoundingClientRect();
		px.set((e.clientX - r.left) / r.width);
		py.set((e.clientY - r.top) / r.height);
		lit.set(1);
	};
	const leave = () => {
		px.set(0.5);
		py.set(0.5);
		lit.set(0);
	};

	return (
		<MotionConfig reducedMotion="user">
			<motion.article
				className={className}
				onPointerMove={move}
				onPointerLeave={leave}
				style={{ rotateX, rotateY, transformPerspective: 900 }}
				initial={{ opacity: 0, y: 50, rotate: -2 }}
				whileInView={{ opacity: 1, y: 0, rotate: 0 }}
				viewport={{ once: true, amount: 0.3 }}
				transition={{ type: 'spring', stiffness: 240, damping: 20 }}
			>
				<motion.div className="spotlight" style={{ background: glow, opacity: glowOpacity }} aria-hidden="true" />
				{children}
			</motion.article>
		</MotionConfig>
	);
}
