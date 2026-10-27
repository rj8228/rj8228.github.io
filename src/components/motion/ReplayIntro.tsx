// Small button in the hero that plays the intro again.
export default function ReplayIntro() {
	return (
		<button type="button" className="btn ghost replay" onClick={() => window.dispatchEvent(new Event('intro:replay'))}>
			<svg viewBox="0 0 24 24" aria-hidden="true">
				<path d="M8 5v14l11-7z" />
			</svg>
			Watch the intro
		</button>
	);
}
