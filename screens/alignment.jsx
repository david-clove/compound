/* ============================================================================
   COMPOUND — Alignment signalling
   "Are you building / selling what you said matters?"
   Production / content evidence  ↔  alignment axis  ↔  declared strategy
   ========================================================================== */
const ALIGN_STATUS = {
  aligned:    { c: 'var(--mint)',  label: 'aligned' },
  watch:      { c: 'var(--slate)', label: 'watch' },
  misaligned: { c: 'var(--amber)', label: 'misaligned' },
};
const EV_GLYPH = { pr: '⎇', commit: '●', session: '◐', asset: '▤', social: '✕', email: '✉', ad: '◎', study: '❝', blog: '▦' };

const FACETS = {
  build: [
    { id: 'sessions', label: 'Sessions', col: 'evidence' },
    { id: 'commits', label: 'Commits', col: 'evidence' },
    { id: 'roadmap', label: 'Roadmap', axis: 'production_vs_roadmap' },
    { id: 'icp', label: 'ICP map', axis: 'production_vs_icp' },
    { id: 'positioning', label: 'Positioning', axis: 'production_vs_positioning' },
    { id: 'gtm', label: 'GTM', axis: 'production_vs_gtm' },
    { id: 'signals', label: 'Signals', col: 'signal' },
  ],
  content: [
    { id: 'drafts', label: 'Drafts', col: 'evidence' },
    { id: 'channels', label: 'Channels', col: 'evidence' },
    { id: 'positioning', label: 'Positioning', axis: 'content_vs_positioning' },
    { id: 'icp', label: 'ICP', axis: 'content_vs_icp' },
    { id: 'messaging', label: 'Messaging', axis: 'content_vs_messaging' },
    { id: 'proof', label: 'Proof', axis: 'content_vs_proof' },
    { id: 'signals', label: 'Signals', col: 'signal' },
  ],
};

function AlignmentScreen({ nav }) {
  const [lane, setLane] = useState('build');
  const [facetId, setFacetId] = useState('signals');
  const data = D.ALIGN[lane];
  const facets = FACETS[lane];
  const facet = facets.find(f => f.id === facetId) || facets[facets.length - 1];
  const selAxis = facet.axis ? data.axes.find(a => a.id === facet.axis) : null;
  const evHi = selAxis ? new Set(selAxis.evidence) : null;
  const decHi = selAxis ? selAxis.declared : null;

  // reset facet when switching lane
  const switchLane = l => { setLane(l); setFacetId('signals'); };

  const dim = (on) => ({ opacity: on ? 1 : 0.32, transition: 'opacity .2s' });

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, position: 'relative' }}>
      <GlowBg b="rgba(67,220,160,0.06)" />

      {/* title bar */}
      <div style={{ padding: '18px 26px 16px', borderBottom: '1px solid var(--line)', position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 16 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, letterSpacing: '-0.01em' }}>
          <span className="ser" style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--mint)' }}>Are you {lane === 'build' ? 'building' : 'selling'}</span> what you said matters?
        </h1>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 4, background: 'var(--bg-1)', border: '1px solid var(--line)', borderRadius: 9, padding: 3 }}>
          <Tab active={lane === 'build'} onClick={() => switchLane('build')}>◑ BUILDING</Tab>
          <Tab active={lane === 'content'} onClick={() => switchLane('content')}>◎ SELLING</Tab>
        </div>
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '150px 1fr 1.4fr 1fr 88px', minHeight: 0, position: 'relative', zIndex: 1 }}>

        {/* facet rail */}
        <div style={{ borderRight: '1px solid var(--line)', overflow: 'auto', padding: '18px 12px', background: 'var(--bg-0)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 2px' }}>Alignment</h3>
          <div className="mono" style={{ fontSize: 8.5, color: 'var(--text-faint)', letterSpacing: '.06em', marginBottom: 16 }}>EVIDENCE GRAPH</div>
          <div style={{ display: 'grid', gap: 4 }}>
            {facets.map(f => {
              const active = facetId === f.id;
              return (
                <button key={f.id} onClick={() => setFacetId(f.id)} className="lift" style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 8, textAlign: 'left',
                  background: active ? 'var(--mint-soft)' : 'transparent', border: '1px solid ' + (active ? 'var(--mint)' : 'transparent'),
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: 99, background: active ? 'var(--mint)' : 'var(--text-faint)' }} />
                  <span style={{ fontSize: 12.5, color: active ? 'var(--text)' : 'var(--text-mute)', fontWeight: active ? 600 : 500 }}>{f.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* evidence column */}
        <div style={{ borderRight: '1px solid var(--line)', overflow: 'auto', padding: '20px 18px', ...dim(facet.col !== 'signal') }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 2px' }}>{data.evidenceLabel}</h3>
          <div className="mono" style={{ fontSize: 9, color: 'var(--text-faint)', letterSpacing: '.05em', marginBottom: 16 }}>{data.evidenceSub.toUpperCase()}</div>
          <div style={{ display: 'grid', gap: 9 }}>
            {data.evidence.map(e => {
              const on = !evHi || evHi.has(e.id);
              return (
                <div key={e.id} className="lift" style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '11px 13px', borderRadius: 9,
                  background: 'var(--bg-1)', border: '1px solid ' + (evHi && evHi.has(e.id) ? 'var(--mint)' : 'var(--line)'), ...dim(on),
                }}>
                  <span style={{ width: 8, height: 8, borderRadius: 99, background: e.linked ? 'var(--mint)' : 'var(--text-faint)', flexShrink: 0 }} />
                  <span style={{ color: 'var(--text-mute)', fontSize: 12 }}>{EV_GLYPH[e.kind]}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text)' }}>{e.code}</span>
                  <span className="mono" style={{ fontSize: 10, color: 'var(--text-mute)', marginLeft: 'auto' }}>{e.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* alignment axis */}
        <div style={{ borderRight: '1px solid var(--line)', overflow: 'auto', padding: '20px 22px' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 2px' }}>Alignment axis</h3>
          <div className="mono" style={{ fontSize: 9, color: 'var(--text-faint)', letterSpacing: '.05em', marginBottom: 18 }}>BUILT REALITY VS DECLARED STRATEGY</div>

          {/* ruler */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 2px 4px', marginBottom: 14, borderBottom: '1px solid var(--line)' }}>
            {['0', '0.25', '0.5', '0.75', '1'].map(t => <span key={t} className="mono" style={{ fontSize: 9, color: 'var(--text-faint)' }}>{t}</span>)}
          </div>

          <div style={{ display: 'grid', gap: 12, marginBottom: 18 }}>
            {data.axes.map(ax => {
              const st = ALIGN_STATUS[ax.status];
              const on = !selAxis || selAxis.id === ax.id;
              return (
                <button key={ax.id} onClick={() => setFacetId(facets.find(f => f.axis === ax.id)?.id || facetId)} className="lift" style={{
                  textAlign: 'left', background: 'var(--bg-1)', border: '1px solid ' + (selAxis && selAxis.id === ax.id ? st.c : 'var(--line)'),
                  borderRadius: 11, padding: '13px 15px', ...dim(on),
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 9 }}>
                    <span className="mono" style={{ fontSize: 12, color: 'var(--text)', fontWeight: 500 }}>{ax.id}</span>
                    <span className="mono" style={{ fontSize: 9.5, color: st.c, background: 'color-mix(in srgb,' + st.c + ' 14%, transparent)', border: '1px solid ' + st.c, borderRadius: 5, padding: '2px 8px', marginLeft: 'auto', letterSpacing: '.04em' }}>{st.label}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span className="mono" style={{ fontSize: 10, color: 'var(--text-mute)' }}>score</span>
                    <span className="mono" style={{ fontSize: 12, color: st.c, fontWeight: 600, width: 30 }}>{ax.score.toFixed(2)}</span>
                    <div style={{ flex: 1 }}><Bar value={ax.score} color={st.c} h={7} /></div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* decide gate */}
          <div style={{ border: '1px solid var(--amber)', background: 'var(--amber-soft)', borderRadius: 12, padding: 16, position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
              <span className="mono" style={{ fontSize: 19, fontWeight: 600, color: 'var(--amber)', letterSpacing: '.02em' }}>{data.gate.label} {data.gate.score.toFixed(2)}</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--amber)', marginBottom: 6 }}>Decide gate required</div>
            <p style={{ fontSize: 11.5, color: 'var(--text-dim)', lineHeight: 1.5, margin: '0 0 12px' }}>{data.gate.note}</p>
            <button onClick={() => nav({ tab: 'memory' })} className="mono lift" style={{ fontSize: 9.5, color: 'var(--amber)', border: '1px solid var(--amber)', borderRadius: 7, padding: '8px 12px', letterSpacing: '.06em' }}>◬ OPEN DECIDE GATE ↗</button>
          </div>
        </div>

        {/* declared strategy */}
        <div style={{ borderRight: '1px solid var(--line)', overflow: 'auto', padding: '20px 18px' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 2px' }}>Declared strategy</h3>
          <div className="mono" style={{ fontSize: 9, color: 'var(--text-faint)', letterSpacing: '.05em', marginBottom: 16 }}>ROADMAP · ICP · POSITIONING · GTM</div>
          <div style={{ display: 'grid', gap: 9 }}>
            {data.declared.map(d => {
              const on = !decHi || decHi === d.id;
              return (
                <div key={d.id} className="lift" style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '12px 13px', borderRadius: 9,
                  background: 'var(--bg-1)', border: '1px solid ' + (decHi === d.id ? 'var(--mint)' : 'var(--line)'), ...dim(on),
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{d.name}</div>
                    <div className="mono" style={{ fontSize: 9, color: 'var(--text-faint)', marginTop: 2 }}>{d.tag}</div>
                  </div>
                  <Ev score={d.ev} />
                </div>
              );
            })}
          </div>
        </div>

        {/* signal column */}
        <div style={{ overflow: 'auto', padding: '20px 12px', ...dim(facet.col === 'signal'), background: 'var(--bg-0)' }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 16px' }}>Signal</h3>
          <div style={{ display: 'grid', gap: 8, marginBottom: 20 }}>
            {Object.entries(data === D.ALIGN.build ? D.ALIGN.signal.counts : D.ALIGN.signal.counts).map(([k, v]) => (
              <div key={k} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', borderRadius: 8, background: 'var(--bg-1)', border: '1px solid var(--line)' }}>
                <Ev score={k} />
                <span className="mono" style={{ fontSize: 12, color: 'var(--text)', fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ background: 'var(--bg-1)', border: '1px solid var(--line)', borderRadius: 10, padding: '12px 10px' }}>
            <Spark data={D.ALIGN.signal.spark} color="var(--mint)" w={60} h={36} />
          </div>
          <div className="mono" style={{ fontSize: 8, color: 'var(--text-faint)', marginTop: 8, textAlign: 'center', letterSpacing: '.04em' }}>ALIGNMENT SIGNAL</div>
        </div>
      </div>
    </div>
  );
}
window.AlignmentScreen = AlignmentScreen;
