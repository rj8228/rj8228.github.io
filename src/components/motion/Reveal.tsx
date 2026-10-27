// Fades and lifts its children into place the first time they scroll into view.
import { motion, MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';

type Props = {
	children?: ReactNode;
	delay?: number;
	from?: 'up' | 'left' | 'right';
	className?: string;
};

const offset = { up: { y: 40 }, left: { x: -60 }, right: { x: 60 } };

export default function Reveal({ children, delay = 0, from = 'up', className }: Props) {
	return (
		<MotionConfig reducedMotion="user">
			<motion.div
				className={className}
				initial={{ opacity: 0, rotate: from === 'up' ? -1.5 : 0, ...offset[from] }}
				whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
				viewport={{ once: true, amount: 0.25 }}
				transition={{ type: 'spring', stiffness: 260, damping: 22, delay }}
			>
				{children}
			</motion.div>
		</MotionConfig>
	);
}
