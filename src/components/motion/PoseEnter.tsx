// Each section's pose makes its own entrance, so the character's moves read as one story down the
// page: crouch springs up, web-shot fires from below, swing arcs in on the web, flip spins, land
// drops with a squash, wave waves.
import { motion, MotionConfig, type TargetAndTransition, type Transition } from 'motion/react';
import type { CSSProperties } from 'react';

type Move = { from: TargetAndTransition; to?: TargetAndTransition; transition: Transition };

const moves: Record<string, Move> = {
	crouch: {
		from: { y: 60, scaleY: 0.7, opacity: 0 },
		transition: { type: 'spring', stiffness: 380, damping: 14 },
	},
	'web-shot': {
		from: { y: 160, opacity: 0 },
		transition: { type: 'spring', stiffness: 220, damping: 18 },
	},
	'swing-low': {
		from: { x: -260, y: -80, rotate: -35, opacity: 0 },
		transition: { type: 'spring', stiffness: 90, damping: 11 },
	},
	flip: {
		from: { rotate: -372, y: -120, opacity: 0 },
		to: { rotate: -12 },
		transition: { type: 'spring', stiffness: 120, damping: 14 },
	},
	land: {
		from: { y: -260, opacity: 0 },
		to: { y: [-260, 0, 0, 0], scaleY: [1, 0.78, 1.06, 1], scaleX: [1, 1.18, 0.96, 1] },
		transition: { duration: 0.9, times: [0, 0.45, 0.7, 1], ease: 'easeOut' },
	},
	wave: {
		from: { y: 80, opacity: 0 },
		to: { rotate: [0, -6, 5, -4, 0] },
		transition: { type: 'spring', stiffness: 200, damping: 16, rotate: { duration: 1.4, delay: 0.4 } },
	},
};

type Props = { id: string; src: string; x: number; h: number };

export default function PoseEnter({ id, src, x, h }: Props) {
	const m = moves[id];
	return (
		<MotionConfig reducedMotion="user">
			<div className={`head-pose ${id}`} style={{ '--x': x, '--h': `${h}px` } as CSSProperties}>
				<motion.img
					src={src}
					alt=""
					loading="lazy"
					style={{ originY: 1 }}
					initial={m.from}
					whileInView={{ x: 0, y: 0, rotate: 0, scaleX: 1, scaleY: 1, opacity: 1, ...m.to }}
					whileHover={{ scale: 1.06, rotate: id === 'flip' ? -6 : 3 }}
					viewport={{ once: true, amount: 0.6 }}
					transition={m.transition}
				/>
			</div>
		</MotionConfig>
	);
}
