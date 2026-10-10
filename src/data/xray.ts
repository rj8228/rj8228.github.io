// Content for the X-ray homepage. "See inside" fields (x, why, decision, bug, numbers, inside, proof)
// show only when the switch is on. Leave any field as '' to hide it until you have the story.

export const site = {
	name: 'Raj Joshi',
	kicker: 'RAJ JOSHI · SOFTWARE ENGINEER · MUMBAI',
	kickerOn: '<h1> · the one line every section below must prove',
	headline: 'I make complex systems',
	headlineAccent: 'visible',
	intro:
		'Full-stack engineer at J.P. Morgan, Mumbai. Five years turning research and portfolio data into tools people can understand. Outside work, I build exchanges, cubes and AI agents you can see inside.',
	location: 'Mumbai, India · open to senior full-stack and product roles',
	contact: {
		email: 'rj8228@gmail.com',
		github: 'https://github.com/rj8228',
		linkedin: 'https://www.linkedin.com/in/rj8228/',
		credly: 'https://www.credly.com/users/rj8228',
		cv: '/raj-joshi-cv.pdf', // '' hides every CV link
	},
};

export type Project = {
	name: string;
	badge: string;
	line: string;
	tags: string;
	image?: string;
	links: { label: string; href: string }[];
	flow: string[];
	why: string;
	decision: string;
	bug: string;
	numbers: string;
	talk: string;
};

export const projects: Project[] = [
	{
		name: 'Prayog',
		badge: 'FLAGSHIP · MVP DONE',
		line: 'A simulated stock exchange and bot arena. Simulated traders move the market; you trade by hand or with your own bot.',
		tags: 'Java 21 · LMAX Disruptor · Kafka · PostgreSQL · Redis · React · Python SDK',
		image: '/work/prayog.webp',
		links: [
			{ label: 'How it works', href: 'https://rj8228.github.io/prayog/' },
			{ label: 'Code', href: 'https://github.com/rj8228/prayog' },
		],
		flow: ['Traders + bots', 'Gateway', 'Disruptor ring', 'Matcher', 'Journal', 'Kafka', 'Ledger'],
		why: 'my 2021 induction win was an algo strategy for an exchange I could not see inside, so I built one I could',
		decision: 'one single-threaded matcher, journal first: replay gives a byte-identical event log, and Kafka downtime never stops trading',
		bug: 'p99 hit 445 ms with 3.5 s spikes. Traced it to Serial GC pauses in a memory-starved container; ZGC made it 5x worse, so I kept the default and wrote down why',
		numbers: '~100 ns per command matching · 20,000 commands/s with fsync · live p99 14 ms · 23 ADRs',
		talk: 'Why an engineer at a bank builds his own exchange, and why the disk, not the code, sets the latency.',
	},
	{
		name: 'Galois',
		badge: 'LIVE · v0.6',
		line: "Group theory through an interactive 3D Rubik's cube, from identity and permutations to why every position solves in 20 moves.",
		tags: 'TypeScript · React · cubing.js · PWA · Vitest · Playwright',
		image: '/work/galois.webp',
		links: [
			{ label: 'Live', href: 'https://rj8228.github.io/galois/' },
			{ label: 'Code', href: 'https://github.com/rj8228/galois' },
		],
		flow: ['Move', 'Permutation', 'Group op', 'Lesson check', '3D render'],
		why: 'I learned the cube from YouTube at 13; this is the version that explains the math',
		decision: 'turn first, name it later: every idea starts as something you do on the cube; fully static on GitHub Pages',
		bug: 'a release that never arrived: the offline service worker kept serving the old app, so new workers now take over as soon as they install',
		numbers: '6 of 8 phases shipped · tested on phone, tablet and laptop · Solve of the Day',
		talk: 'How the same group axioms explain Git, undo stacks and CRDTs.',
	},
	{
		name: 'Finfluencer AI',
		badge: 'TOP 700 / 57,000+ · AGENTIC AI DAY',
		line: 'A personal financial advisor that reads your real money data through Fi Money\'s MCP server and turns a goal ("open a dance studio", "retire by 50") into a plan. Built for Google Cloud Agentic AI Day, July 2025.',
		tags: 'Gemini · Google ADK · Vertex AI · MCP · Streamlit',
		image: '/work/fi-agent.webp',
		links: [{ label: 'Demo video', href: '/work/fi-agent-demo.mp4' }],
		flow: ['Question', 'Orchestrator', 'Fi MCP tools', 'MoneyMind · Lakshya AI', 'Gemini', 'Plan'],
		why: 'people have the data about their money but no one to explain it',
		decision: 'one orchestrator routes to specialist agents (MoneyMind for cash flow, Lakshya AI for goal plans) and asks for missing inputs before it plans',
		bug: '',
		numbers: 'top 700 of 57,000+ developers · net worth, credit score, EPF, funds and stocks from one MCP server',
		talk: 'Designing agents that touch real money data: guardrails and context engineering.',
	},
];

// Unshipped ideas. Shown only when showNext is true.
export const showNext = false;
export const next = [
	{ name: 'Strategy X-ray', line: 'Replay a Prayog bot and see why it made every trade.' },
	{ name: 'Bias game', line: 'A 2-minute trading game that shows your own biases.' },
	{ name: 'Portfolio X-ray', line: 'Paste holdings, see exposure and index overlap.' },
];

// Journey, newest first. body: one plain sentence on what the job is. highlights: what I changed, with results.
// marks: dated wins. links: folded with the details. inside: shown only in X-ray mode.
// body, highlights and marks stay folded until the viewer opens "Show details".
export const timeline = [
	{
		when: 'May 2025 — now',
		title: 'Associate, Software Engineer II',
		org: 'J.P. Morgan · Portfolio Insights, Asset & Wealth Management',
		body: "I help deliver features for J.P. Morgan's Model Portfolios platform, which financial advisors use to choose, compare and present model portfolios to their clients. I take each feature from discovery with the product owner through to production.",
		highlights: [
			'Opened the platform to alternatives and separately managed accounts, a new business line expected to scale fast.',
			"Built white-labeling, so an advisor's firm name and logo appear on every fact sheet and trade-commentary PDF.",
			"Connected models to the Heatmap fund-comparison app, and designed a fund-suitability check that compares a fund against the client's existing portfolio.",
			'Moved the platform to new EKS and EMR clusters with zero downtime, using blue/green deployments.',
		],
		marks: [
			{ y: '2025–26', t: 'City lead & SME, AWS AI League' },
			{ y: 'Jul 2025', t: 'Top 700 / 57,000+, Agentic AI Day' },
		],
		links: [],
		inside: 'Stack: Java, Spring Boot, React, EKS/ECS, Kafka, DynamoDB, Redis. I use GitHub Copilot and Roo Code daily, with reusable agent skills, and mentor junior engineers.',
	},
	{
		when: 'Jul 2021 — Apr 2025',
		title: 'Analyst → Associate, Software Engineer',
		org: 'J.P. Morgan · Index Research',
		body: 'I owned a client-reporting application and the daily-operations modules behind it, working with the operations team to turn their manual tasks into software.',
		highlights: [
			'Redesigned the database schema that limited growth, then added caching, so new clients onboard easily and monthly reports reach a large client base on time.',
			'Led the Java 8 → 11 → 17 upgrade and the iBatis → MyBatis migration, and removed an outdated Sybase package for faster, safer releases.',
			'Built end-user feedback with Lucene search, a Cypress/Cucumber BDD proof of concept, and parts of a new ETF platform (FastAPI, PostgreSQL, AWS) that replaced a legacy system.',
		],
		marks: [
			{ y: '2024', t: 'Co-led DeepRacer for 700+' },
			{ y: '2023', t: '2nd place, DeepRacer, led team of 6' },
			{ y: '2022', t: 'Won SEPathon hackathon' },
			{ y: '2021', t: 'Won induction with an algo-trading app' },
		],
		links: [],
		inside: 'DeepRacer 2023: nobody on the team could tell why the car made certain decisions, so I built a tool that drew what our reward function was actually rewarding on the track. That is how we climbed to 2nd. The next year I co-ran the competition for 700+ people.',
	},
	{
		when: '2017 — 2021',
		title: 'B.E. Computer Engineering',
		org: 'VESIT, Chembur · University of Mumbai',
		body: '',
		highlights: [],
		marks: [],
		links: [
			{
				label: 'Paper · Machine Learning and Technology in Diagnostic Research: The Case Study of Cognitive Disorders among Toddlers (SSRN, 2020)',
				href: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3561862',
			},
		],
		inside: '',
	},
	{
		when: '2015 — 2017',
		title: 'School · HSC and SSC',
		org: 'Swami Vivekanand Junior College, Dahisar · St. Francis High School, Bhayandar',
		body: '',
		highlights: [],
		marks: [],
		links: [],
		inside: "Taught myself the Rubik's cube at 13–15 from YouTube. Ten years later it became Galois.",
	},
];

export const skills = [
	{ name: 'AI and agents', chips: ['LLM agents', 'Bedrock', 'Vertex AI', 'Gemini', 'Google ADK', 'MCP', 'Multi-agent design', 'Context engineering'], proof: 'Finfluencer AI (top 700 / 57k) · AWS AI League city lead' },
	{ name: 'Backend', chips: ['Java', 'Spring Boot', 'Python', 'FastAPI', 'Django', 'Kafka', 'REST', 'Lucene'], proof: '5 years of production Java at J.P. Morgan · Prayog matching engine and Kafka ledger' },
	{ name: 'Frontend', chips: ['React', 'Redux', 'TypeScript', 'Vite', 'JavaScript'], proof: 'Galois 3D app · Prayog trading workspace · portfolio insights UIs at work' },
	{ name: 'Data and cloud', chips: ['AWS EKS / ECS / EMR / Lambda', 'Docker', 'Terraform', 'PostgreSQL', 'DynamoDB', 'Redis'], proof: 'Prayog: 11-container stack, Prometheus and Grafana' },
	{ name: 'Engineering practice', chips: ['CI/CD', 'Jenkins', 'Git', 'Sonar', 'Cypress', 'Cucumber BDD'], proof: 'Galois: Vitest + Playwright in CI · Prayog: 23 decision records, benchmarks with dates' },
	{ name: 'Finance domain', chips: ['Asset management', 'Model portfolios', 'ETFs', 'Portfolio analytics', 'Client reporting'], proof: 'Index Research → Portfolio Insights · Prayog' },
];

export const beyond = [
	{ tag: 'COMMUNITY', title: 'Running AI competitions', body: 'City lead and SME for the AWS AI League in Mumbai; co-led DeepRacer for 700+ engineers.', inside: 'leading without authority, explaining ML to non-ML engineers' },
	{ tag: 'PUZZLES', title: 'Self-taught cuber', body: "Learned the Rubik's cube from YouTube as a teenager; now I teach the math behind it.", inside: 'breaking hard problems into moves you can reason about' },
	{ tag: 'MARKETS', title: 'Markets and game theory', body: 'Strategy games, auctions and how real traders differ from rational ones.', inside: 'the instinct behind Prayog and its bots' },
	{ tag: 'MUSIC AND MIND', title: 'Learning piano and DJing', body: 'Deep music listener, learning to play and mix; reading psychology and how people learn.', inside: 'practice loops and spaced repetition in how Galois teaches' },
];
