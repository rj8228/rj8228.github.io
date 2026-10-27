// A comic panel that tilts toward the pointer in 3D, with a spotlight that follows it.
// Touch and reduced-motion users get a flat card. With `media`, the card opens on the mission's
// trailer: it plays on hover with a mouse, or while the card is on screen on touch devices.
import {
	motion,
	MotionConfig,
	useInView,
	useMotionTemplate,
	useMotionValue,
	useReducedMotion,
	useSpring,
	useTransform,
} from 'motion/react';
import { useEffect, useRef, type PointerEvent, type ReactNode } from 'react';

type Media = { poster: string; video: string; alt: string };

export default function TiltCard({ children, className, media }: { children?: ReactNode; className?: string; media?: Media }) {
	const px = useMotionValue(0.5);
	const py = useMotionValue(0.5);
	const lit = useMotionValue(0);
	const spring = { stiffness: 220, damping: 18 };
	const rotateY = useSpring(useTransform(px, [0, 1], [-9, 9]), spring);
	const rotateX = useSpring(useTransform(py, [0, 1], [9, -9]), spring);
	const glowOpacity = useSpring(lit, spring);
	const glow = useMotionTemplate`radial-gradient(260px circle at ${useTransform(px, (v) => v * 100)}% ${useTransform(py, (v) => v * 100)}%, rgba(245, 158, 11, 0.28), transparent 70%)`;

	const video = useRef<HTMLVideoElement>(null);
	const reduce = useReducedMotion();
	const onScreen = useInView(video, { amount: 0.7 });

	const play = () => {
		if (reduce) return;
		video.current?.play().catch(() => {});
	};
	const stop = () => {
		const v = video.current;
		if (!v) return;
		v.pause();
		v.currentTime = 0;
	};

	// Touch screens have no hover, so the trailer plays while the card is mostly on screen.
	useEffect(() => {
		if (!media || !matchMedia('(hover: none)').matches) return;
		if (onScreen) play();
		else stop();
	}, [onScreen]);

	const move = (e: PointerEvent<HTMLElement>) => {
		if (e.pointerType !== 'mouse') return;
		const r = e.currentTarget.getBoundingClientRect();
		px.set((e.clientX - r.left) / r.width);
		py.set((e.clientY - r.top) / r.height);
		lit.set(1);
	};
	const enter = (e: PointerEvent<HTMLElement>) => {
		if (e.pointerType === 'mouse') play();
	};
	const leave = (e: PointerEvent<HTMLElement>) => {
		px.set(0.5);
		py.set(0.5);
		lit.set(0);
		if (e.pointerType === 'mouse') stop();
	};

	return (
		<MotionConfig reducedMotion="user">
			<motion.article
				className={className}
				onPointerEnter={enter}
				onPointerMove={move}
				onPointerLeave={leave}
				onFocus={play}
				onBlur={stop}
				style={{ rotateX, rotateY, transformPerspective: 900 }}
				initial={{ opacity: 0, y: 50, rotate: -2 }}
				whileInView={{ opacity: 1, y: 0, rotate: 0 }}
				viewport={{ once: true, amount: 0.3 }}
				transition={{ type: 'spring', stiffness: 240, damping: 20 }}
			>
				<motion.div className="spotlight" style={{ background: glow, opacity: glowOpacity }} aria-hidden="true" />
				{media && (
					<div className="mission-media">
						<video ref={video} src={media.video} poster={media.poster} muted loop playsInline preload="none" aria-label={media.alt} />
					</div>
				)}
				{children}
			</motion.article>
		</MotionConfig>
	);
}
