/* ============================================================================
   COMPOUND — mock dataset
   A studio of AI-first ventures. Top level = portfolio of ventures.
   Drill into one venture (Lanterna, legal-tech) for the full instrument set.
   ========================================================================== */
(function () {
  // ---- Signal type taxonomy -------------------------------------------------
  const SIGNAL_TYPES = {
    pain:        { label: 'Pain Point',        glyph: '✸', color: 'var(--coral)' },
    wtp:         { label: 'Willingness to Pay',glyph: '$', color: 'var(--mint)'  },
    workflow:    { label: 'Workflow',          glyph: '◉', color: 'var(--blue)'  },
    buying:      { label: 'Buying Signal',     glyph: '↗', color: 'var(--teal)'  },
    role:        { label: 'Buyer Role',        glyph: '◬', color: 'var(--purple)'},
    objection:   { label: 'Objection',         glyph: '⊙', color: 'var(--amber)' },
    constraint:  { label: 'Constraint',        glyph: '⊘', color: 'var(--slate)' },
    feature:     { label: 'Feature Request',   glyph: '✦', color: 'var(--mint)'  },
    feedback:    { label: 'Product Feedback',  glyph: '▢', color: 'var(--purple)'},
    competitor:  { label: 'Competitor',        glyph: '✕', color: 'var(--coral)' },
  };

  // ---- Evidence ladder ------------------------------------------------------
  const EVIDENCE = {
    E5: { label: 'Decision-grade', color: 'var(--mint)',  desc: 'Direct, attributed, corroborated' },
    E4: { label: 'Validated',      color: 'var(--mint-2)',desc: 'Multiple independent sources'      },
    E3: { label: 'Emerging',       color: 'var(--mint-3)',desc: 'Repeated but thinly sourced'        },
    E2: { label: 'Candidate',      color: 'var(--amber)', desc: 'Single mention, unverified'         },
    E1: { label: 'Noise',          color: 'var(--faint)', desc: 'Speculative / inferred'             },
  };

  // ---- Portfolio of ventures ------------------------------------------------
  const VENTURES = [
    {
      id: 'lanterna', name: 'Lanterna', domain: 'lanterna.legal',
      tag: 'Legal-tech', stage: 'Solution', stageIdx: 1, color: 'var(--mint)',
      thesis: 'Cross-jurisdiction clause intelligence for mid-market litigation & M&A firms.',
      conviction: 0.74, convictionTrend: +0.08,
      signals: 684, threads: 47, contradictions: 7, positions: 12,
      drift: 1, runway: '14 mo', mrr: '—', arr: 'pre-rev',
      health: 'on-track',
      metrics: { calls: 42, learnings: 387, evE3plus: 0.62 },
      primary: true,
    },
    {
      id: 'ledgerline', name: 'Ledgerline', domain: 'ledgerline.io',
      tag: 'Service-as-Software', stage: 'Growth', stageIdx: 4, color: 'var(--blue)',
      thesis: 'Agent-run bookkeeping that replaces the SMB accounting back office. Outcome-priced.',
      conviction: 0.88, convictionTrend: +0.03,
      signals: 1240, threads: 96, contradictions: 3, positions: 18,
      drift: 0, runway: '22 mo', mrr: '$48K', arr: '$576K',
      health: 'on-track',
      metrics: { calls: 71, learnings: 612, evE3plus: 0.71 },
    },
    {
      id: 'halcyon', name: 'Halcyon', domain: 'halcyon.health',
      tag: 'Health ops', stage: 'Shape', stageIdx: 2, color: 'var(--purple)',
      thesis: 'Prior-authorization agent mesh for specialty clinics. Governance-first.',
      conviction: 0.51, convictionTrend: -0.06,
      signals: 410, threads: 33, contradictions: 9, positions: 14,
      drift: 2, runway: '9 mo', mrr: '—', arr: 'pre-rev',
      health: 'at-risk',
      metrics: { calls: 28, learnings: 290, evE3plus: 0.44 },
    },
    {
      id: 'terra', name: 'Terra Index', domain: 'terraindex.ag',
      tag: 'Ag-tech', stage: 'Problem', stageIdx: 0, color: 'var(--amber)',
      thesis: 'Yield-risk underwriting from satellite + sensor fusion for row-crop lenders.',
      conviction: 0.34, convictionTrend: +0.11,
      signals: 198, threads: 19, contradictions: 4, positions: 8,
      drift: 1, runway: '11 mo', mrr: '—', arr: 'pre-rev',
      health: 'exploring',
      metrics: { calls: 16, learnings: 142, evE3plus: 0.38 },
    },
    {
      id: 'postscript', name: 'Postscript', domain: 'postscript.media',
      tag: 'Distribution', stage: 'Launch', stageIdx: 3, color: 'var(--teal)',
      thesis: 'Audience-graph routing that turns founder tool-exhaust into owned distribution.',
      conviction: 0.66, convictionTrend: +0.02,
      signals: 530, threads: 61, contradictions: 5, positions: 11,
      drift: 0, runway: '17 mo', mrr: '$12K', arr: '$144K',
      health: 'on-track',
      metrics: { calls: 39, learnings: 401, evE3plus: 0.58 },
    },
  ];

  // ---- Journey stages (the venturing journey) ------------------------------
  const JOURNEY = [
    { id: 'Problem',  glyph: '◎', label: 'Problem'  },
    { id: 'Solution', glyph: '✦', label: 'Solution' },
    { id: 'Shape',    glyph: '◈', label: 'Shape'    },
    { id: 'Launch',   glyph: '◭', label: 'Launch'   },
    { id: 'Growth',   glyph: '↗', label: 'Growth'   },
  ];

  // ---- Accounts (Lanterna's target firms) ----------------------------------
  const ACCOUNTS = [
    { id: 'brightman', name: 'Brightman LLP', domain: 'brightman.legal', avatar: 'BL', color: 'var(--purple)',
      calls: 5, signals: 47, fit: 0.84, convert: 84, fitLabel: 'Strong',
      champion: { name: 'Marta Devlin', role: 'General Counsel', initials: 'MA' },
      topSignal: { type: 'pain', text: 'Manual cross-jurisdiction comparison', ev: 'E5' } },
    { id: 'oakwell', name: 'Oakwell LLP', domain: 'oakwell.law', avatar: 'OL', color: 'var(--blue)',
      calls: 4, signals: 31, fit: 0.71, convert: 71, fitLabel: 'Strong',
      champion: { name: 'David Pell', role: 'Managing Partner', initials: 'DP' },
      topSignal: { type: 'wtp', text: 'Budget exists if it beats Westlaw on hours', ev: 'E4' } },
    { id: 'caldwell', name: 'Caldwell & Reed', domain: 'caldwellreed.com', avatar: 'CR', color: 'var(--amber)',
      calls: 3, signals: 19, fit: 0.58, convert: 58, fitLabel: 'Medium',
      champion: { name: 'Susan Hart', role: 'Practice Lead', initials: 'SH' },
      topSignal: { type: 'workflow', text: 'Associates burn hours reconciling precedents', ev: 'E4' } },
    { id: 'northgate', name: 'Northgate Law', domain: 'northgate.legal', avatar: 'NL', color: 'var(--coral)',
      calls: 2, signals: 12, fit: 0.39, convert: 39, fitLabel: 'Weak',
      champion: { name: 'Tom Reyes', role: 'Litigation Assoc.', initials: 'TR' },
      topSignal: { type: 'objection', text: 'Privileged data needs on-prem + DPA', ev: 'E3' } },
    { id: 'vorn', name: 'Vorn Legal', domain: 'vorn.legal', avatar: 'VL', color: 'var(--slate)',
      calls: 2, signals: 8, fit: 0.27, convert: 27, fitLabel: 'Weak',
      champion: { name: 'Ana Vorn', role: 'Founder', initials: 'AV' },
      topSignal: { type: 'competitor', text: 'Evaluating Harvey for the same wedge', ev: 'E2' } },
  ];

  // ---- Signals feed ---------------------------------------------------------
  const SIGNALS = [
    { id: 's1', type: 'pain', ev: 'E5', age: '24d', flagged: true, accounts: [], src: 'meet',
      text: 'Comparing how the same regulation is interpreted across jurisdictions is fully manual, so cross-border opinions take weeks and still miss conflicts.' },
    { id: 's2', type: 'pain', ev: 'E5', age: '25d', accounts: ['brightman'], src: 'meet',
      text: 'Litigators have no reliable way to estimate the odds of winning at trial, so they hedge their advice and clients lose confidence.' },
    { id: 's3', type: 'pain', ev: 'E4', age: '24d', accounts: [], src: 'notion',
      text: 'Associates burn hours reconciling contradictory precedents pulled from databases that don\u2019t talk to each other.' },
    { id: 's4', type: 'pain', ev: 'E5', age: '14d', accounts: ['caldwell', 'northgate', 'vorn'], more: 3, src: 'crm',
      text: 'Partners can\u2019t see which matters are about to blow past budget until the invoice has already gone to the client.' },
    { id: 's5', type: 'pain', ev: 'E3', age: '18d', accounts: [], src: 'gmail',
      text: 'Contract review is still done clause-by-clause in Word, so risky indemnity language slips through on high-volume deals.' },
    { id: 's6', type: 'pain', ev: 'E2', age: '31d', accounts: [], src: 'x',
      text: 'Smaller firms worry that acting on AI-generated advice could expose them to malpractice claims.' },
    { id: 's7', type: 'wtp', ev: 'E4', age: '12d', accounts: ['oakwell'], src: 'meet',
      text: 'Budget exists for a tool that beats Westlaw on billable hours saved \u2014 partners will reallocate research spend.' },
    { id: 's8', type: 'workflow', ev: 'E4', age: '11d', accounts: ['brightman'], src: 'meet',
      text: 'Precedent reconciliation currently spans three disconnected tools; a single source of truth would collapse the workflow.' },
    { id: 's9', type: 'role', ev: 'E3', age: '34m', accounts: [], src: 'raindrop',
      text: 'RevOps-style \u201clegal operations\u201d manager is emerging as a distinct buyer separate from the General Counsel.' },
    { id: 's10', type: 'objection', ev: 'E3', age: '2h', accounts: ['northgate'], src: 'meet',
      text: 'Read.ai sometimes drops calls \u2014 the founder does not notice until days later, so attribution silently breaks.' },
    { id: 's11', type: 'competitor', ev: 'E2', age: '5d', accounts: ['vorn'], src: 'x',
      text: 'Vorn Legal is actively evaluating Harvey for the same cross-jurisdiction wedge.' },
    { id: 's12', type: 'buying', ev: 'E4', age: '3d', accounts: ['brightman'], src: 'perplexity',
      text: 'Brightman asked for a pilot scoped to their cross-border M&A team \u2014 explicit next-step language.' },
  ];

  // ---- The featured call -----------------------------------------------------
  const CALL = {
    id: 'call-brightman-disc', title: 'Discovery \u2014 Brightman LLP', when: 'Today', dur: '44 min',
    account: 'brightman',
    participants: [
      { name: 'Marta Devlin', role: 'General Counsel', initials: 'MA', color: 'var(--purple)' },
      { name: 'You', role: 'Founder', initials: 'YO', color: 'var(--mint)' },
      { name: 'Tom Reyes', role: 'Litigation Assoc.', initials: 'TR', color: 'var(--slate)' },
    ],
    fit: 0.86, fitLabel: 'Strong',
    evidence: { E5: 3, E4: 2, E3: 1, E2: 1 },
    density: 0.7, insightCount: 7,
    insights: [
      { type: 'pain', ev: 'E5', t: '00:12', text: 'Cross-jurisdiction clause comparison is fully manual' },
      { type: 'workflow', ev: 'E4', t: '11:48', text: 'Precedent reconciled across 3 disconnected tools' },
      { type: 'wtp', ev: 'E4', t: '23:30', text: 'Budget exists if it beats Westlaw on hours' },
      { type: 'objection', ev: 'E3', t: '31:05', text: 'Privileged data needs on-prem + DPA' },
      { type: 'buying', ev: 'E5', t: '38:20', text: 'Asked for a pilot scoped to cross-border M&A team' },
    ],
    transcript: [
      { who: 'Marta', text: 'Comparing a clause in Germany versus France is all manual right now.' },
      { who: 'You', text: 'And how long does that take per matter?' },
      { who: 'Marta', text: 'Days. And we still miss conflicts that matter.' },
      { who: 'You', text: 'What would change if it took minutes?', dim: true },
      { who: 'Marta', text: 'Honestly? We\u2019d take on cross-border work we turn away today.', dim: true },
    ],
  };

  // ---- Company Memory: knowledge tree + a position -------------------------
  const MEMORY_TREE = [
    { id: 'overview', label: 'Overview', depth: 0 },
    { id: 'strategic', label: 'Strategic Memory', depth: 0, open: true },
    { id: 'buyer', label: 'Buyer Model', depth: 1 },
    { id: 'icp', label: 'ICP Definition', depth: 1, active: true },
    { id: 'problem', label: 'Problem Framing', depth: 1 },
    { id: 'positioning', label: 'Positioning', depth: 1 },
    { id: 'gtm', label: 'GTM Hypotheses', depth: 1 },
    { id: 'market', label: 'Market & Customer', depth: 0 },
    { id: 'product', label: 'Product & Roadmap', depth: 0 },
    { id: 'sales', label: 'Sales & GTM', depth: 0 },
    { id: 'cs', label: 'Customer Success', depth: 0 },
  ];

  const POSITION = {
    title: 'ICP Definition', confidence: 0.71, version: 8, updated: '2d ago',
    body: [
      { t: 'Mid-market litigation & M&A firms (20\u2013120 attorneys) that take on cross-border work', cites: [1, 13] },
      { t: 'feel acute pain reconciling how regulation is interpreted across jurisdictions', cites: [2] },
      { t: 'The economic buyer is the General Counsel or Managing Partner; budget is reallocated from research subscriptions (Westlaw/Lexis).', cites: [7, 25] },
    ],
    history: [0.42, 0.48, 0.55, 0.51, 0.6, 0.64, 0.68, 0.71],
  };

  const DRIFT = {
    detected: true,
    title: 'A distinct buyer is emerging',
    body: 'Three recent calls describe a \u201clegal operations\u201d manager who owns tooling decisions \u2014 a buyer the current ICP position does not account for.',
    conversations: [
      { who: 'Brightman LLP', when: '3d ago', ev: 'E4' },
      { who: 'Oakwell LLP', when: '6d ago', ev: 'E3' },
      { who: 'Caldwell & Reed', when: '9d ago', ev: 'E3' },
    ],
  };

  // ---- Weekly Strategic Triage ----------------------------------------------
  const TRIAGE = {
    when: 'Jun 5, 09:24', conversations: 42, learnings: 387, paths: 4, cycle: 348,
    summary: 'High signal volume, quality is solid. Over half of evidence is E3+. Two narratives are emerging: a cross-border knowledge gap and a budget-blindness problem in matter management. Critical strategic choice between two ICPs ahead. Next conversations must validate buyer and budget.',
    distribution: [
      { k: 'E5', pct: 0.06 }, { k: 'E4', pct: 0.21 }, { k: 'E3', pct: 0.35 }, { k: 'E2', pct: 0.31 }, { k: 'E1', pct: 0.07 },
    ],
    narratives: [
      {
        title: 'The Cross-Border Knowledge Gap', trust: true,
        counts: { 'Pain point': 11, 'Willingness to pay': 6, Workflow: 5, 'Buyer role': 1 },
        lede: 'Most validated pain. Manual cross-jurisdiction comparison is directly costing firms cross-border work they turn away today.',
        rows: [
          { ev: 'E5', text: 'Comparing a clause in Germany vs. France is all manual; takes days.', who: 'General Counsel' },
          { ev: 'E4', text: 'We\u2019d take on cross-border work we turn away today.', who: 'GC, Brightman' },
          { ev: 'E3', text: 'Three disconnected tools to reconcile one precedent.', who: 'Litigation Assoc.' },
        ],
        devil: 'Pain is vivid but concentrated in firms that already do cross-border work \u2014 a narrower wedge than the deck claims. Budget owner not yet confirmed on 4 of 6 accounts.',
        next: 'Get in front of a Managing Partner who owns the research budget. Ask: \u201cWhat do you spend on Westlaw, and what would you cut for this?\u201d',
      },
      {
        title: 'Budget Blindness in Matter Management', trust: false,
        counts: { 'Pain point': 7, Objection: 2, Constraint: 3 },
        lede: 'Partners can\u2019t see which matters will blow past budget until invoicing. Adjacent to the wedge \u2014 may be a distraction.',
        rows: [
          { ev: 'E4', text: 'We find out a matter is over budget when the invoice goes out.', who: 'Managing Partner' },
          { ev: 'E3', text: 'No live view of matter economics across the firm.', who: 'Practice Lead' },
        ],
        devil: 'Real pain, wrong product. Solving this pulls the roadmap toward practice-management software \u2014 a crowded category against incumbents.',
        next: 'Do not chase. Log as adjacent. Re-test only if it recurs in 3+ cross-border accounts.',
      },
    ],
  };

  // ---- Influx: the Ingestion Plane ------------------------------------------
  // Three stores (Part 4 routing): internal/decided · market · build
  const STORES = {
    internal: { label: 'Internal & Decided', color: 'var(--mint)',  routes: 'Position Tracking · Contradiction detection' },
    market:   { label: 'Market',             color: 'var(--amber)', routes: 'Competitor Scanner · Drift · Auto-Research' },
    build:    { label: 'Build',              color: 'var(--blue)',  routes: 'Roadmap · Architecture Decisions · Reflections' },
  };

  // Each source carries: store, evidence ceiling, cadence, health, watermark, today
  const SOURCES = [
    // INTERNAL & DECIDED
    { id: 'meet', name: 'Google Meet', glyph: '▷', on: true, store: 'internal', ceiling: 'E5', cadence: 'Realtime · webhook', health: 'healthy', today: 4, watermark: '6 min ago', thread: 'one meeting', episode: 'one speaker turn', note: 'First-party, attributed — the highest-trust source.' },
    { id: 'zoom', name: 'Zoom', glyph: '▷', on: true, store: 'internal', ceiling: 'E5', cadence: 'Realtime · webhook', health: 'healthy', today: 1, watermark: '2 h ago' },
    { id: 'teams', name: 'Microsoft Teams', glyph: '▷', on: false, store: 'internal', ceiling: 'E5', cadence: 'Realtime', health: 'off', today: 0, watermark: '—' },
    { id: 'calendar', name: 'Google Calendar', glyph: '▦', on: true, store: 'internal', ceiling: 'E4', cadence: 'Realtime', health: 'healthy', today: 6, watermark: '1 min ago' },
    { id: 'gmail', name: 'Gmail', glyph: '✉', on: true, store: 'internal', ceiling: 'E3', cadence: '30 min', health: 'healthy', today: 9, watermark: '12 min ago', note: 'High-noise — scored lower unless corroborated.' },
    { id: 'drive', name: 'Google Drive', glyph: '◇', on: true, store: 'internal', ceiling: 'E4', cadence: 'Nightly', health: 'healthy', today: 2, watermark: '8 h ago' },
    { id: 'notion', name: 'Notion', glyph: '▤', on: true, store: 'internal', ceiling: 'E4', cadence: 'Nightly', health: 'healthy', today: 3, watermark: '8 h ago', note: 'Canonical text a Position document points to.' },
    { id: 'slack', name: 'Slack', glyph: '◌', on: false, store: 'internal', ceiling: 'E3', cadence: '30 min', health: 'off', today: 0, watermark: '—' },
    { id: 'crm', name: 'CRM', glyph: '◬', on: true, store: 'internal', ceiling: 'E5', cadence: 'Nightly', health: 'healthy', today: 5, watermark: '8 h ago', note: 'The decided store — commercial reality-check against internal optimism.' },
    // MARKET
    { id: 'raindrop', name: 'Raindrop', glyph: '◈', on: true, store: 'market', ceiling: 'E4', cadence: '30–60 min', health: 'healthy', today: 7, watermark: '24 min ago', thread: 'one Collection', episode: 'bookmark + highlight', note: 'What the founder is paying attention to. Token-refresh daemon rotates before the 2-week expiry.' },
    { id: 'x', name: 'X / Twitter', glyph: '✕', on: true, store: 'market', ceiling: 'E2–E3', cadence: 'Daily', health: 'degraded', today: 2, watermark: '5 h ago', failover: true, note: 'Fragile by default in 2026. 3-tier failover; corroboration required before any signal is trusted.' },
    { id: 'perplexity', name: 'Perplexity', glyph: '✷', on: true, store: 'market', ceiling: 'E3–E5', cadence: 'Nightly · budget-capped', health: 'healthy', today: 4, watermark: '8 h ago', thread: 'research session', episode: 'query → answer', note: 'Arrives pre-cited — inherits the cited source\u2019s authority. Per-cycle spend cap.' },
    // BUILD
    { id: 'claude', name: 'Claude Code', glyph: '◐', on: true, store: 'build', ceiling: 'E4', cadence: 'Realtime · tail', health: 'healthy', today: 11, watermark: '40 s ago', thread: 'one conversation', episode: 'one message record', note: 'Tailed in near-real-time; PreCompact / SessionEnd hooks beat auto-deletion. Reasoning + Reflections, not just code.' },
    { id: 'codex', name: 'Codex', glyph: '◑', on: true, store: 'build', ceiling: 'E4', cadence: 'Realtime · tail', health: 'degraded', today: 3, watermark: '14 min ago', note: 'Limited-mode persistence drops begin/error events — affected Episodes flagged limited-fidelity.' },
    { id: 'github', name: 'GitHub', glyph: '⎇', on: true, store: 'build', ceiling: 'E5', cadence: 'Realtime · push hook', health: 'healthy', today: 8, watermark: '3 min ago', thread: 'one repository', episode: 'commit · PR · structural snapshot', note: 'The artifact is ground truth. git_origin_url is the join key linking sessions to commits.' },
  ];

  // The six-clause ingestion contract every connector must satisfy
  const INGEST_CONTRACT = [
    { n: '01', name: 'Idempotency', sub: 'sha256(source · native_id · hash) — re-ingest never duplicates an Episode' },
    { n: '02', name: 'Dual timestamping', sub: 't_event (world) + t_ingest (seen) — the temporal graph depends on it' },
    { n: '03', name: 'Provenance completeness', sub: 'author / URL / commit / path captured, or the item is quarantined — never dropped' },
    { n: '04', name: 'Incremental cursors', sub: 'never full-scan; persist a per-source watermark, pull only what\u2019s new' },
    { n: '05', name: 'Secret-scrubbing', sub: 'credentials, .env, PII redacted at the connector boundary before persistence' },
    { n: '06', name: 'Graceful degradation', sub: 'a failing source fails loudly — alert + health flag, never silent' },
  ];

  // Source → Thread → Episode → Signal
  const PIPELINE = ['Connector', 'Normalizer', 'Scrubber', 'Dedup', 'Watermark'];

  const INFLUX_ENTITIES = [
    { label: 'Threads', total: '614', today: 12, glyph: '▤' },
    { label: 'Episodes', total: '8,910', today: 184, glyph: '▦' },
    { label: 'Signals', total: '203', today: 8, glyph: '✸' },
    { label: 'Evidence', total: '412', today: 11, glyph: '❝' },
    { label: 'Reflections', total: '92', today: 3, glyph: '◈' },
    { label: 'Contradictions', total: '7', today: 1, glyph: '⤬' },
  ];

  // ---- The compounding loop --------------------------------------------------
  const LOOP = [
    { n: '01', name: 'Learn',   sub: 'Ingest every signal from every source', auto: true,  glyph: '◉' },
    { n: '02', name: 'Know',    sub: 'Extract patterns, score evidence',        auto: true,  glyph: '✷' },
    { n: '03', name: 'Reflect', sub: 'Compare against your positions',          auto: true,  glyph: '⤬' },
    { n: '04', name: 'Decide',  sub: 'You review. Adopt, revise, or hold',      auto: false, glyph: '◬' },
    { n: '05', name: 'Build',   sub: 'Positions compound into memory',          auto: true,  glyph: '▤' },
    { n: '06', name: 'Reach',   sub: 'Intelligence feeds your next move',       auto: true,  glyph: '◎' },
  ];

  // ---- Live status ticker ----------------------------------------------------
  const TICKER = [
    { t: '09:04:51', kind: 'warn', text: 'Diarization retry \u00b7 low SNR', tag: 'MARTA' },
    { t: '09:42:18', kind: 'ok', text: 'Signal promoted to validated', tag: 'JURISDICTIONS' },
    { t: '09:41:02', kind: 'ok', text: 'Learning extracted \u00b7 cross-border', tag: 'BRIGHTMAN' },
    { t: '09:38:44', kind: 'info', text: 'Drift detected on ICP position', tag: 'BUYER ROLE' },
    { t: '09:35:20', kind: 'warn', text: 'X/Nitter degraded \u00b7 Tier-2 failover active', tag: 'INGEST' },
    { t: '09:33:08', kind: 'ok', text: '184 Episodes scrubbed & enqueued', tag: '.CLAUDE' },
    { t: '09:31:10', kind: 'ok', text: 'Contradiction edge created', tag: 'POSITION \u2194 SIGNAL' },
  ];

  // ---- Dashboard payload -----------------------------------------------------
  const DASH = {
    name: 'Sarah', day: 'FRIDAY 5 JUNE',
    since: 'earlier today', convos: 0, learnings: 124, promoted: 4, artifacts: 2,
    meetings: [
      { t: '10:30', title: 'Discovery \u00b7 Lanterna Legal', video: true, soon: true },
      { t: '13:00', title: 'Intake review \u00b7 Marta (Brightman)', video: true },
      { t: '15:15', title: 'Case strategy sync', video: false },
      { t: '17:00', title: 'Close-out \u00b7 Oakwell LLP', video: true },
    ],
    tasks: [
      { glyph: '◬', title: 'Your ICP position is drifting', open: true,
        sub: 'New learnings pull away from what this position claims.',
        body: 'Three recent calls describe a different buyer than your ICP position records.',
        cta: 'GO TO REVIEW & MERGE' },
      { glyph: '◈', title: 'Advance: Jurisdiction Map',
        sub: 'Identify at least 3 jurisdictions that appear in \u22655 matters. Run the role miner.' },
      { glyph: '▶', title: '3 calls waiting to review',
        sub: 'Import or dismiss them before they count toward signals.' },
      { glyph: '⌖', title: 'Verify Brightman LLP',
        sub: 'Confirm the company on its calls so its signals attribute right.' },
      { glyph: '◉', title: 'Confirm a speaker in Tuesday\u2019s Brightman call',
        sub: 'An unmatched voice is holding back this call\u2019s learnings.' },
    ],
    journey: { current: 'Problem',
      checks: [
        { glyph: '✸', title: 'Pain Severity', sub: 'Clients consistently describe the problem as urgent.', ok: true },
        { glyph: '◬', title: 'ICP Specificity', sub: 'Litigation and M&A segments are clearly defined.', ok: true },
        { glyph: '◬', title: 'Stakeholder Map', sub: 'Not enough decision-makers.', ok: false },
      ],
      headline: 'Clear problem understanding',
      blurb: 'Strong problem understanding. You ran many calls and dug deep with strong interviewing.',
    },
  };

  // ---- Knowledge Graph: nodes + edges ---------------------------------------
  // Node kinds: account, person, signal, position, thread, source, contradiction
  const KG = buildGraph();

  // ---- Multi-Agent build (reconstructed from .claude / .codex sessions) -----
  const AGENTS = {
    session: { repo: 'lanterna/clause-engine', branch: 'feat/jurisdiction-map', model: 'Claude Sonnet 4.6 + Codex', tokens: '1.24M', cost: '$3.18', started: '2h 14m ago', src: 'claude' },
    mesh: [
      { id: 'lead', name: 'Orchestrator', type: 'lead', status: 'steering', model: 'Sonnet 4.6', tokens: '412K',
        action: 'Routing 4 subagents \u00b7 awaiting your decision on the diff schema' },
      { id: 'miner', name: 'Jurisdiction Miner', type: 'subagent', status: 'working', model: 'Sonnet 4.6', tokens: '288K',
        action: 'Extracting jurisdictions from 1,204 matters' },
      { id: 'differ', name: 'Clause Differ', type: 'subagent', status: 'working', model: 'Sonnet 4.6', tokens: '201K',
        action: 'Building cross-border diff for DE \u2194 FR' },
      { id: 'carto', name: 'Repo Cartographer', type: 'subagent', status: 'review', model: 'Haiku', tokens: '96K',
        action: 'Mapped 312-node dependency graph' },
      { id: 'validator', name: 'Signal Validator', type: 'subagent', status: 'blocked', model: 'Sonnet 4.6', tokens: '74K',
        action: 'Blocked: needs on-prem DPA confirmation' },
    ],
    columns: [
      { id: 'backlog', label: 'Backlog', glyph: '○', tasks: [
        { id: 'b1', title: 'Cross-jurisdiction clause diff view', agent: 'differ', files: [], extracted: null },
        { id: 'b2', title: 'Wire role-miner to the live matter corpus', agent: 'miner', files: [], extracted: null },
      ]},
      { id: 'progress', label: 'In Progress', glyph: '◐', tasks: [
        { id: 'p1', title: 'Reconcile precedent across 3 disconnected sources', agent: 'differ', status: 'working',
          files: [ { op: 'Read', path: 'src/lib/precedent-service.ts' }, { op: 'Read', path: 'src/lib/jurisdiction-map.ts' }, { op: 'Write', path: 'src/lib/clause-aligner.ts', add: 84, del: 12 } ],
          extracted: '2 Decisions \u00b7 1 Reflection' },
        { id: 'p2', title: 'Mine jurisdictions from matter corpus', agent: 'miner', status: 'working',
          files: [ { op: 'Read', path: 'data/matters/*.json' }, { op: 'Write', path: 'src/miners/role-miner.ts', add: 47, del: 3 } ],
          extracted: '1 Signal' },
      ]},
      { id: 'review', label: 'Review', glyph: '●', tasks: [
        { id: 'r1', title: 'Fixed off-by-one in the conflict-detection ranker', agent: 'carto', status: 'review',
          files: [ { op: 'Write', path: 'src/lib/clause-ranker.ts', add: 3, del: 1 } ], commit: 'a91f \u00b7 5bddbff', actions: true,
          extracted: '1 Decision \u00b7 1 Reflection', note: 'Edge ranking dropped a valid conflict when scores tied.' },
      ]},
    ],
    // extracted atoms flowing into the BUILD store
    extracted: [
      { kind: 'Decision', ev: 'E5', agent: 'Clause Differ', text: 'Chose a deterministic clause aligner over an LLM diff \u2014 auditability beats recall for legal output.' },
      { kind: 'Reflection', ev: 'E4', agent: 'Orchestrator', text: 'The cross-border wedge is narrower but deeper than the \u201call firms\u201d framing in the deck.' },
      { kind: 'Blocker', ev: 'E3', agent: 'Signal Validator', text: 'Privileged data needs on-prem + DPA before any pilot can run.' },
    ],
  };

  // ---- Content agents (Reach — creating content to sell the product) --------
  const CONTENT = {
    session: { campaign: 'Cross-border launch', channels: 'Landing · X · Email · Case study', model: 'Sonnet 4.6', tokens: '486K', cost: '$1.04', started: '40m ago', src: 'claude' },
    mesh: [
      { id: 'clead', name: 'Reach Orchestrator', type: 'lead', status: 'steering', model: 'Sonnet 4.6', tokens: '142K',
        action: 'Sequencing 4 content agents against declared positioning' },
      { id: 'copy', name: 'Copy Agent', type: 'subagent', status: 'working', model: 'Sonnet 4.6', tokens: '128K',
        action: 'Drafting landing hero v3 from the cross-border wedge' },
      { id: 'social', name: 'Social Agent', type: 'subagent', status: 'review', model: 'Haiku', tokens: '64K',
        action: 'Queued an X thread on usage-based pricing' },
      { id: 'email', name: 'Sequence Agent', type: 'subagent', status: 'working', model: 'Sonnet 4.6', tokens: '88K',
        action: 'Personalising a GC-persona cold sequence' },
      { id: 'proof', name: 'Proof Agent', type: 'subagent', status: 'blocked', model: 'Sonnet 4.6', tokens: '64K',
        action: 'Blocked: no approved Brightman case-study quote' },
    ],
    columns: [
      { id: 'backlog', label: 'Backlog', glyph: '○', tasks: [
        { id: 'cb1', title: 'Case study \u2014 Brightman cross-border pilot', agent: 'proof', files: [], extracted: null },
      ]},
      { id: 'progress', label: 'Drafting', glyph: '◐', tasks: [
        { id: 'cp1', title: 'Landing hero v3 \u00b7 cross-border wedge', agent: 'copy', status: 'working',
          files: [ { op: 'Write', path: 'site/(marketing)/hero.mdx', add: 31, del: 18 } ], extracted: 'aligns → Positioning' },
        { id: 'cp2', title: 'Cold sequence \u00b7 GC persona', agent: 'email', status: 'working',
          files: [ { op: 'Write', path: 'campaigns/gc-seq/step-1.md', add: 22, del: 4 } ], extracted: 'aligns → ICP' },
      ]},
      { id: 'review', label: 'Review', glyph: '●', tasks: [
        { id: 'cr1', title: 'Ad set \u00b7 "AI for every firm"', agent: 'social', status: 'review', misaligned: true,
          files: [ { op: 'Write', path: 'ads/meta/cross-border.json', add: 12, del: 0 } ], actions: true,
          extracted: 'conflicts → ICP', note: 'Targets all firms; declared ICP is cross-border only.' },
      ]},
    ],
    extracted: [
      { kind: 'Asset', ev: 'E4', agent: 'Copy Agent', text: 'Landing hero v3 leads with the cross-border wedge \u2014 matches declared positioning.' },
      { kind: 'Conflict', ev: 'E2', agent: 'Social Agent', text: 'Ad set targets \u201cevery firm\u201d \u2014 contradicts the cross-border-only ICP.' },
    ],
  };

  // ---- Alignment: are you building / selling what you said matters? ----------
  const ALIGN = {
    build: {
      evidenceLabel: 'Production evidence', evidenceSub: 'coding sessions + commits',
      evidence: [
        { id: 'e1', kind: 'pr', code: 'PR #184', label: 'checkout risk', linked: false },
        { id: 'e2', kind: 'commit', code: 'commit a91f', label: 'pricing UI', linked: true },
        { id: 'e3', kind: 'session', code: 'session 26.4k', label: 'new modal', linked: false },
        { id: 'e4', kind: 'commit', code: 'commit c02d', label: 'admin export', linked: true },
        { id: 'e5', kind: 'pr', code: 'PR #187', label: 'persona sync', linked: true },
        { id: 'e6', kind: 'session', code: 'session 18.9k', label: 'billing flow', linked: false },
        { id: 'e7', kind: 'commit', code: 'commit 77e', label: 'growth hook', linked: false },
      ],
      axes: [
        { id: 'production_vs_roadmap', score: 0.84, status: 'aligned', evidence: ['e2', 'e5'], declared: 'd1' },
        { id: 'production_vs_icp', score: 0.38, status: 'watch', evidence: ['e3', 'e6'], declared: 'd2' },
        { id: 'production_vs_positioning', score: 0.71, status: 'aligned', evidence: ['e2', 'e4'], declared: 'd3' },
        { id: 'production_vs_gtm', score: 0.62, status: 'misaligned', evidence: ['e1', 'e7'], declared: 'd4' },
      ],
      declared: [
        { id: 'd1', name: 'Roadmap Q3', tag: 'branch-doc', ev: 'E5' },
        { id: 'd2', name: 'ICP pain', tag: 'E5 source', ev: 'E4' },
        { id: 'd3', name: 'Positioning', tag: 'E4 review', ev: 'E3' },
        { id: 'd4', name: 'GTM hypothesis', tag: 'E3 draft', ev: 'E2' },
        { id: 'd5', name: 'North-star', tag: 'owner note', ev: 'E4' },
        { id: 'd6', name: 'Launch gate', tag: 'decision log', ev: 'E5' },
      ],
      gate: { axis: 'production_vs_gtm', score: 0.62, label: 'MISALIGNED', note: '62% of build tokens have no linked ICP pain / GTM hypothesis' },
    },
    content: {
      evidenceLabel: 'Content evidence', evidenceSub: 'agent-generated GTM assets',
      evidence: [
        { id: 'c1', kind: 'asset', code: 'hero v3', label: 'cross-border', linked: true },
        { id: 'c2', kind: 'social', code: 'X thread', label: 'usage pricing', linked: true },
        { id: 'c3', kind: 'email', code: 'GC sequence', label: 'persona cold', linked: true },
        { id: 'c4', kind: 'ad', code: 'ad set', label: 'every firm', linked: false },
        { id: 'c5', kind: 'study', code: 'case study', label: 'Brightman', linked: false },
        { id: 'c6', kind: 'blog', code: 'blog draft', label: 'clause diffing', linked: true },
      ],
      axes: [
        { id: 'content_vs_positioning', score: 0.79, status: 'aligned', evidence: ['c1', 'c6'], declared: 'cd1' },
        { id: 'content_vs_icp', score: 0.41, status: 'misaligned', evidence: ['c4'], declared: 'cd2' },
        { id: 'content_vs_messaging', score: 0.73, status: 'aligned', evidence: ['c2', 'c3'], declared: 'cd3' },
        { id: 'content_vs_proof', score: 0.45, status: 'watch', evidence: ['c5'], declared: 'cd4' },
      ],
      declared: [
        { id: 'cd1', name: 'Positioning', tag: 'E4 review', ev: 'E4' },
        { id: 'cd2', name: 'ICP definition', tag: 'E5 source', ev: 'E5' },
        { id: 'cd3', name: 'Messaging pillars', tag: 'brand-doc', ev: 'E3' },
        { id: 'cd4', name: 'Proof points', tag: 'evidence log', ev: 'E4' },
        { id: 'cd5', name: 'Tone & voice', tag: 'owner note', ev: 'E4' },
        { id: 'cd6', name: 'Launch gate', tag: 'decision log', ev: 'E5' },
      ],
      gate: { axis: 'content_vs_icp', score: 0.41, label: 'MISALIGNED', note: 'Ad spend targets all firms \u2014 no link to the cross-border-only ICP' },
    },
    signal: { counts: { E5: 14, E4: 22, E3: 38, E2: 9 }, spark: [0.4, 0.55, 0.48, 0.62, 0.5, 0.66, 0.58, 0.72, 0.62] },
  };

  // ---- The Decide Queue: every human-gate across the portfolio ---------------
  // The founder owns exactly one verb. This is the only place it lives.
  // kind: drift · align · review · verify · contradiction
  const DECIDE_QUEUE = [
    { id: 'dq1', venture: 'lanterna', tab: 'memory', kind: 'drift', sev: 'amber', age: 'today', ev: 'E4',
      title: 'ICP position is drifting', detail: 'A distinct \u201clegal-ops\u201d buyer emerged across 3 calls. Adopt, revise, or hold the ICP position.', verb: 'Adopt · Revise · Hold' },
    { id: 'dq2', venture: 'lanterna', tab: 'alignment', kind: 'align', sev: 'amber', age: '2h', ev: 'E3',
      title: 'Build \u2194 GTM misaligned · 0.62', detail: '62% of build tokens have no linked ICP pain or GTM hypothesis. Re-aim the roadmap or accept the bet.', verb: 'Re-aim · Accept' },
    { id: 'dq3', venture: 'lanterna', tab: 'alignment', kind: 'align', sev: 'amber', age: '40m', ev: 'E2',
      title: 'Ad set contradicts ICP', detail: 'Content agent is buying \u201cevery firm\u201d \u2014 the declared ICP is cross-border only. Approve, edit, or kill.', verb: 'Approve · Edit · Kill' },
    { id: 'dq4', venture: 'lanterna', tab: 'agents', kind: 'review', sev: 'green', age: '14m', ev: 'E5',
      title: 'Clause Differ ready to commit', detail: 'Fixed an off-by-one in the conflict ranker. Review the diff and ship, or send back.', verb: 'Commit · Send back' },
    { id: 'dq5', venture: 'lanterna', tab: 'accounts', kind: 'verify', sev: 'blue', age: '1d',
      title: 'Confirm a speaker · Brightman call', detail: 'An unmatched voice is holding back this call\u2019s learnings from attribution.', verb: 'Confirm' },
    { id: 'dq6', venture: 'ledgerline', tab: 'memory', kind: 'contradiction', sev: 'coral', age: '3h', ev: 'E4',
      title: 'Pricing position contradicted', detail: 'Two enterprise calls reject outcome-based pricing that the position claims is validated.', verb: 'Resolve' },
    { id: 'dq7', venture: 'halcyon', tab: 'memory', kind: 'drift', sev: 'amber', age: '5h', ev: 'E3',
      title: 'Problem framing is drifting', detail: 'Prior-auth pain is fragmenting into two distinct workflows. The framing position no longer holds both.', verb: 'Split · Hold' },
    { id: 'dq8', venture: 'halcyon', tab: 'alignment', kind: 'align', sev: 'amber', age: '6h', ev: 'E2',
      title: 'Governance gate · clinical claims', detail: 'Content drafts make efficacy claims with no E4+ evidence behind them. Gate before publish.', verb: 'Gate · Allow' },
    { id: 'dq9', venture: 'postscript', tab: 'agents', kind: 'review', sev: 'green', age: '8h', ev: 'E4',
      title: 'Audience-router PR awaiting merge', detail: 'Routing change passed checks and aligns with the channel position. Merge or hold.', verb: 'Merge · Hold' },
  ];

  // ---- The Division (slide thesis): AI does the work, founders make the calls
  const DIVISION = {
    lede: 'The studio runs on a simple division. Compound handles everything that can be systematized. You handle everything that requires judgment.',
    compound: {
      foot: 'Compound does 80% of the work.',
      items: [
        'Signal extraction from every conversation',
        'Company Memory maintenance across all sources',
        'Evidence scoring (E1\u2013E5) on every signal',
        'Behavioral coaching after every call',
        'Morning briefings with drift detection',
        'Network matching on validated evidence',
        'Cross-portfolio pattern recognition',
      ],
    },
    founder: {
      foot: 'You do 100% of the thinking.',
      items: [
        'What problem to solve', 'When to pivot', 'Which market to enter',
        'What to kill', 'Who to hire', 'How to position',
        'Where to invest energy', 'When to raise capital',
      ],
    },
  };

  window.DATA = {
    SIGNAL_TYPES, EVIDENCE, VENTURES, JOURNEY, ACCOUNTS, SIGNALS, CALL,
    MEMORY_TREE, POSITION, DRIFT, TRIAGE, SOURCES, STORES, INGEST_CONTRACT, PIPELINE,
    INFLUX_ENTITIES, LOOP, TICKER, DASH, KG, AGENTS, CONTENT, ALIGN,
    DECIDE_QUEUE, DIVISION,
  };

  // ---------------------------------------------------------------------------
  function buildGraph() {
    const nodes = [
      // positions (hubs)
      { id: 'p-icp', kind: 'position', label: 'ICP Definition', sub: 'conf 0.71', size: 26 },
      { id: 'p-price', kind: 'position', label: 'Pricing Wedge', sub: 'conf 0.58', size: 22 },
      { id: 'p-prob', kind: 'position', label: 'Problem Framing', sub: 'conf 0.80', size: 24 },
      { id: 'p-chan', kind: 'position', label: 'Channel', sub: 'conf 0.40', size: 18 },
      // accounts
      { id: 'a-brightman', kind: 'account', label: 'Brightman LLP', sub: '47 signals', size: 22 },
      { id: 'a-oakwell', kind: 'account', label: 'Oakwell LLP', sub: '31 signals', size: 20 },
      { id: 'a-caldwell', kind: 'account', label: 'Caldwell & Reed', sub: '19 signals', size: 18 },
      { id: 'a-northgate', kind: 'account', label: 'Northgate Law', sub: '12 signals', size: 16 },
      { id: 'a-vorn', kind: 'account', label: 'Vorn Legal', sub: '8 signals', size: 14 },
      // people
      { id: 'pe-marta', kind: 'person', label: 'Marta Devlin', sub: 'General Counsel', size: 16 },
      { id: 'pe-david', kind: 'person', label: 'David Pell', sub: 'Managing Partner', size: 15 },
      { id: 'pe-legalops', kind: 'person', label: 'Legal Ops Mgr', sub: 'emerging buyer', size: 14 },
      // signals
      { id: 's-xjuris', kind: 'signal', label: 'Manual cross-jurisdiction', sub: 'E5 · Pain', size: 18 },
      { id: 's-budget', kind: 'signal', label: 'Budget if beats Westlaw', sub: 'E4 · WTP', size: 16 },
      { id: 's-3tools', kind: 'signal', label: '3 disconnected tools', sub: 'E4 · Workflow', size: 15 },
      { id: 's-onprem', kind: 'signal', label: 'On-prem + DPA needed', sub: 'E3 · Objection', size: 14 },
      { id: 's-pilot', kind: 'signal', label: 'Asked for pilot', sub: 'E5 · Buying', size: 16 },
      { id: 's-overbudget', kind: 'signal', label: 'Over-budget at invoice', sub: 'E4 · Pain', size: 15 },
      { id: 's-harvey', kind: 'signal', label: 'Evaluating Harvey', sub: 'E2 · Competitor', size: 13 },
      // threads
      { id: 't-disc', kind: 'thread', label: 'Discovery call', sub: 'Brightman · 44m', size: 14 },
      { id: 't-intake', kind: 'thread', label: 'Intake review', sub: 'Oakwell', size: 13 },
      { id: 't-perplexity', kind: 'thread', label: 'Perplexity thread', sub: 'usage-based pricing', size: 12 },
      // sources
      { id: 'src-meet', kind: 'source', label: 'Google Meet', sub: 'source', size: 11 },
      { id: 'src-raindrop', kind: 'source', label: 'Raindrop', sub: 'source', size: 11 },
      { id: 'src-claude', kind: 'source', label: '.claude session', sub: 'build source', size: 12 },
      { id: 'src-git', kind: 'source', label: 'clause-engine repo', sub: 'git · build', size: 12 },
      // build thread + extracted atoms
      { id: 't-build', kind: 'thread', label: 'Build session', sub: 'feat/jurisdiction-map', size: 14 },
      { id: 's-archdec', kind: 'signal', label: 'Deterministic aligner', sub: 'E5 · Decision', size: 15 },
      { id: 's-reflect', kind: 'signal', label: 'Wedge narrower, deeper', sub: 'E4 · Reflection', size: 14 },
      // contradictions
      { id: 'c-buyer', kind: 'contradiction', label: 'Buyer role conflict', sub: 'GC vs Legal Ops', size: 18 },
      { id: 'c-scope', kind: 'contradiction', label: 'Wedge breadth conflict', sub: 'cross-border vs all', size: 16 },
      { id: 'c-align', kind: 'contradiction', label: 'Build ↔ GTM misalign', sub: '62% tokens unlinked', size: 16 },
    ];

    const E = (s, t, kind) => ({ s, t, kind: kind || 'support' });
    const edges = [
      // signals -> positions
      E('s-xjuris', 'p-prob'), E('s-xjuris', 'p-icp'),
      E('s-budget', 'p-price'), E('s-3tools', 'p-prob'),
      E('s-pilot', 'p-icp'), E('s-onprem', 'p-icp', 'contradict'),
      E('s-overbudget', 'p-prob', 'weak'), E('s-harvey', 'p-chan', 'contradict'),
      // signals -> accounts
      E('s-xjuris', 'a-brightman'), E('s-3tools', 'a-brightman'),
      E('s-pilot', 'a-brightman'), E('s-budget', 'a-oakwell'),
      E('s-overbudget', 'a-caldwell'), E('s-onprem', 'a-northgate'),
      E('s-harvey', 'a-vorn'),
      // people -> accounts
      E('pe-marta', 'a-brightman'), E('pe-david', 'a-oakwell'),
      E('pe-legalops', 'a-brightman', 'weak'), E('pe-legalops', 'a-oakwell', 'weak'),
      E('pe-legalops', 'a-caldwell', 'weak'),
      // people -> signals
      E('pe-marta', 's-xjuris'), E('pe-marta', 's-pilot'),
      E('pe-david', 's-budget'),
      // threads -> signals
      E('t-disc', 's-xjuris'), E('t-disc', 's-3tools'), E('t-disc', 's-pilot'),
      E('t-intake', 's-budget'), E('t-perplexity', 's-budget', 'weak'),
      // sources -> threads
      E('src-meet', 't-disc'), E('src-meet', 't-intake'), E('src-raindrop', 't-perplexity'),
      E('src-claude', 't-build'), E('src-git', 't-build'),
      // build thread -> extracted atoms -> positions
      E('t-build', 's-archdec'), E('t-build', 's-reflect'),
      E('s-archdec', 'p-prob'), E('s-reflect', 'p-icp'),
      E('c-align', 't-build', 'contradict'), E('c-align', 'p-chan', 'contradict'), E('c-align', 's-reflect'),
      // contradictions
      E('c-buyer', 'p-icp', 'contradict'), E('c-buyer', 'pe-legalops', 'contradict'),
      E('c-buyer', 'pe-marta'),
      E('c-scope', 'p-icp', 'contradict'), E('c-scope', 's-xjuris'), E('c-scope', 'p-chan'),
      // cross links (non-obvious)
      E('s-budget', 'p-prob', 'weak'), E('a-oakwell', 'p-icp', 'weak'),
      E('a-brightman', 'p-icp'),
    ];

    // discovered insights (cross-link findings)
    const insights = [
      { kind: 'contradiction', title: 'Buyer-role conflict across 3 accounts',
        body: 'A \u201cLegal Ops\u201d buyer appears in Brightman, Oakwell & Caldwell but your ICP position names the GC. Two paths disagree.',
        path: ['pe-legalops', 'a-brightman', 'p-icp'] },
      { kind: 'bridge', title: 'Non-obvious bridge: Perplexity \u2192 Pricing',
        body: 'Your own Perplexity research on usage-based pricing connects to Oakwell\u2019s \u201cbudget if it beats Westlaw\u201d signal \u2014 same wedge, two sources.',
        path: ['t-perplexity', 's-budget', 'p-price'] },
      { kind: 'cluster', title: 'Brightman is the conviction core',
        body: 'Three E4+ signals, the champion, and the only pilot ask all route through Brightman. It carries the ICP position alone right now.',
        path: ['a-brightman', 's-pilot', 'p-icp'] },
      { kind: 'bridge', title: 'Build \u2192 Problem: code is validating the wedge',
        body: 'The .claude build session\u2019s \u201cdeterministic aligner\u201d decision and \u201cwedge is narrower, deeper\u201d reflection both route into your standing positions \u2014 production evidence agreeing with declared strategy.',
        path: ['src-claude', 't-build', 's-reflect', 'p-icp'] },
    ];

    return { nodes, edges, insights };
  }
})();
