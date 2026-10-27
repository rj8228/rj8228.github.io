// The hero name pops in letter by letter, like a comic SFX, then each letter bounces on hover.
import { motion, MotionConfig } from 'motion/react';

export default function HeroTitle({ text }: { text: string }) {
	return (
		<MotionConfig reducedMotion="user">
			<h1 aria-label={text}>
				{text.split(' ').map((word, w) => (
					<span key={w} className="word" aria-hidden="true">
						{[...word].map((ch, i) => (
							<motion.span
								key={i}
								className="letter"
								initial={{ opacity: 0, y: 60, rotate: -20, scale: 0.4 }}
								animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
								whileHover={{ y: -12, rotate: i % 2 ? 8 : -8, transition: { type: 'spring', stiffness: 500, damping: 10 } }}
								transition={{ type: 'spring', stiffness: 420, damping: 16, delay: 0.25 + (w * 5 + i) * 0.05 }}
							>
								{ch}
							</motion.span>
						))}
					</span>
				))}
			</h1>
		</MotionConfig>
	);
}
