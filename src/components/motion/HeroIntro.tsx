// Plays the swing video over the hero once per visit, then fades away to reveal the page.
// The inline script in the page head decides whether it plays (sets html[data-intro="play"]) before
// first paint, so the hero copy can hold its entrance until the intro ends.
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

const SEEN = 'intro-seen';

export const introDone = () => {
	const root = document.documentElement;
	if (root.dataset.intro !== 'play') return;
	root.dataset.intro = 'done';
	window.dispatchEvent(new Event('intro:done'));
	try {
		sessionStorage.setItem(SEEN, '1');
	} catch {}
};

export default function HeroIntro({ src, poster }: { src: string; poster: string }) {
	const [playing, setPlaying] = useState(false);
	const video = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (document.documentElement.dataset.intro === 'play') setPlaying(true);
		const replay = () => {
			document.documentElement.dataset.intro = 'play';
			setPlaying(true);
		};
		window.addEventListener('intro:replay', replay);
		return () => window.removeEventListener('intro:replay', replay);
	}, []);

	const finish = () => {
		setPlaying(false);
		introDone();
	};

	return (
		<AnimatePresence>
			{playing && (
				<motion.div
					className="intro"
					initial={{ opacity: 1 }}
					exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.6, ease: 'easeIn' } }}
				>
					<video
						ref={video}
						src={src}
						poster={poster}
						autoPlay
						muted
						playsInline
						onEnded={finish}
						onError={finish}
						aria-label="Intro: Raj leaps off a Mumbai local train and swings across the city at night"
					/>
					<button type="button" className="btn intro-skip" onClick={finish}>
						Skip intro
					</button>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
