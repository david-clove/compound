/* ============================================================================
   COMPOUND — Signals board
   ========================================================================== */
const TYPE_COUNTS = [
  ['pain', 235], ['wtp', 21], ['workflow', 139], ['buying', 26], ['role', 40],
  ['objection', 57], ['constraint', 3], ['feature', 75], ['feedback', 57], ['competitor', 37],
];
const STRENGTH_COUNTS = [['E5', 18], ['E4', 76], ['E3', 183], ['E2', 405], ['E1', 2]];

function SignalsScreen({ nav }) {
  const [typeFilter, setTypeFilter] = useState(new Set());
  const [evFilter, setEvFilter] = useState(new Set());
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(null);

  const filtered = D.SIGNALS.filter(s =>
    (!typeFilter.size || typeFilter.has(s.type)) &&
    (!evFilter.size || evFilter.has(s.ev)) &&
    (!q || s.text.toLowerCase().includes(q.toLowerCase()))
  );
  const groups = {};
  filtered.forEach(s => { (groups[s.type] = groups[s.type] || []).push(s); });

  const toggle = (set, setter, v) => { const n = new Set(set); n.has(v) ? n.delete(v) : n.add(v); setter(n); };

  const Row = ({ active, color, glyph, label, count, onClick }) => (
    <button onClick={onClick} className="lift" style={{
      display: 'flex', alignItems: 'center', gap: 9, padding: '6px 8px', borderRadius: 7, width: '100%', textAlign: 'left',
      background: active ? 'var(--bg-3)' : 'transparent',
    }}>
      <span style={{ width: 13, height: 13, borderRadius: 4, border: '1.5px solid ' + (active ? color : 'var(--line-3)'), background: active ? color : 'transparent', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
        {active && <span style={{ fontSize: 9, color: 'var(--bg)' }}>✓</span>}
      </span>
      <span style={{ color, fontSize: 11 }}>{glyph}</span>
      <span style={{ fontSize: 12.5, color: active ? 'var(--text)' : 'var(--text-dim)', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</span>
      <span className="mono" style={{ fontSize: 10, color: 'var(--text-faint)' }}>{count}</span>
    </button>
  );

  return (
    <div style={{ flex: 1, display: 'flex', minHeight: 0, position: 'relative' }}>
      <GlowBg />
      {/* filter rail */}
      <div style={{ width: 218, flexShrink: 0, borderRight: '1px solid var(--line)', overflow: 'auto', padding: '18px 14px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <h2 className="ser" style={{ fontSize: 24, fontWeight: 500, margin: 0 }}>Signals</h2>
          <span style={{ display: 'flex', gap: 6, color: 'var(--text-faint)', fontSize: 13 }}><span>⟳</span><span>⇅</span></span>
        </div>
        <div className="mono" style={{ fontSize: 11, color: 'var(--text-mute)', marginBottom: 14 }}>684</div>

        <div style={{ position: 'relative', marginBottom: 16 }}>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search…" style={{
            width: '100%', background: 'var(--bg-0)', border: '1px solid var(--line-2)', borderRadius: 8,
            padding: '8px 10px 8px 28px', color: 'var(--text)', fontSize: 12.5, outline: 'none',
          }} />
          <span style={{ position: 'absolute', left: 9, top: 8, color: 'var(--text-faint)', fontSize: 12 }}>⌕</span>
        </div>

        <Label style={{ marginBottom: 8 }}>TYPE</Label>
        <div style={{ display: 'grid', gap: 1, marginBottom: 18 }}>
          {TYPE_COUNTS.map(([t, c]) => (
            <Row key={t} active={typeFilter.has(t)} color={D.SIGNAL_TYPES[t].color} glyph={D.SIGNAL_TYPES[t].glyph}
              label={D.SIGNAL_TYPES[t].label} count={c} onClick={() => toggle(typeFilter, setTypeFilter, t)} />
          ))}
        </div>

        <Label style={{ marginBottom: 8 }}>SIGNAL STRENGTH</Label>
        <div style={{ display: 'grid', gap: 1 }}>
          {STRENGTH_COUNTS.map(([e, c]) => (
            <button key={e} onClick={() => toggle(evFilter, setEvFilter, e)} className="lift" style={{
              display: 'flex', alignItems: 'center', gap: 9, padding: '6px 8px', borderRadius: 7, textAlign: 'left',
              background: evFilter.has(e) ? 'var(--bg-3)' : 'transparent',
            }}>
              <span style={{ width: 13, height: 13, borderRadius: 4, border: '1.5px solid ' + (evFilter.has(e) ? D.EVIDENCE[e].color : 'var(--line-3)'), background: evFilter.has(e) ? D.EVIDENCE[e].color : 'transparent' }} />
              <Ev score={e} />
              <span style={{ fontSize: 12.5, color: 'var(--text-dim)', flex: 1 }}>{D.EVIDENCE[e].label}</span>
              <span className="mono" style={{ fontSize: 10, color: 'var(--text-faint)' }}>{c}</span>
            </button>
          ))}
        </div>
      </div>

      {/* main board */}
      <div style={{ flex: 1, overflow: 'auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', gap: 10, padding: '16px 24px', borderBottom: '1px solid var(--line)', position: 'sticky', top: 0, background: 'rgba(10,12,15,0.86)', backdropFilter: 'blur(8px)', zIndex: 2 }}>
          <Pillctrl label="SORT" value="PRIORITY" />
          <Pillctrl label="GROUP BY" value="SIGNAL TYPE" />
          {(typeFilter.size || evFilter.size || q) ?
            <button onClick={() => { setTypeFilter(new Set()); setEvFilter(new Set()); setQ(''); }} className="mono lift" style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--text-mute)', letterSpacing: '.08em' }}>CLEAR FILTERS ✕</button>
            : <span className="mono" style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--text-faint)' }}>{filtered.length} SHOWN</span>}
        </div>

        <div style={{ padding: '8px 24px 40px' }}>
          {Object.keys(groups).length === 0 &&
            <div style={{ padding: 60, textAlign: 'center', color: 'var(--text-mute)', fontSize: 13 }}>No signals match these filters.</div>}
          {Object.entries(groups).map(([type, items]) => (
            <div key={type} style={{ marginTop: 22 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <span className="mono" style={{ fontSize: 10.5, color: D.SIGNAL_TYPES[type].color, letterSpacing: '.1em' }}>{D.SIGNAL_TYPES[type].label.toUpperCase()}</span>
                <span className="mono" style={{ fontSize: 10, color: 'var(--text-faint)' }}>{items.length}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 12 }}>
                {items.map(s => (
                  <div key={s.id} onClick={() => setSel(sel === s.id ? null : s.id)} className="lift" style={{
                    background: 'var(--bg-1)', border: '1px solid ' + (sel === s.id ? 'var(--line-3)' : 'var(--line)'),
                    borderRadius: 'var(--r)', padding: 15, cursor: 'pointer',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 11 }}>
                      <SignalChip type={s.type} />
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span className="mono" style={{ fontSize: 9.5, color: 'var(--text-faint)' }}>{s.age}</span>
                        {s.flagged && <span style={{ color: 'var(--amber)', fontSize: 11 }}>▣</span>}
                        <Ev score={s.ev} />
                        <span style={{ color: 'var(--text-faint)', fontSize: 13 }}>⋯</span>
                      </div>
                    </div>
                    <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)', lineHeight: 1.42, margin: 0 }}>{s.text}</p>
                    {s.src && D.SOURCES.find(x => x.id === s.src) && (() => {
                      const so = D.SOURCES.find(x => x.id === s.src);
                      return (
                        <div className="mono" style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, fontSize: 9, color: 'var(--text-faint)', letterSpacing: '.04em' }}>
                          <span style={{ color: D.STORES[so.store].color }}>{so.glyph}</span>
                          <span>VIA {so.name.toUpperCase()}</span>
                          {so.health === 'degraded' && <span style={{ color: 'var(--amber)' }}>· LOW-TRUST SOURCE</span>}
                        </div>
                      );
                    })()}
                    {(s.accounts.length > 0) && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
                        {s.accounts.map(aid => {
                          const a = D.ACCOUNTS.find(x => x.id === aid);
                          return a ? <span key={aid} style={tagStyle}><Avatar text={a.avatar} color={a.color} size={15} />{a.name}</span> : null;
                        })}
                        {s.more && <span style={{ ...tagStyle, color: 'var(--text-mute)' }}>+{s.more}</span>}
                      </div>
                    )}
                    {sel === s.id && (
                      <div className="fade-in" style={{ marginTop: 13, paddingTop: 13, borderTop: '1px solid var(--line)', display: 'flex', gap: 8 }}>
                        <button onClick={(e) => { e.stopPropagation(); nav({ tab: 'graph', sub: { focus: 's-' + s.type, crumb: 'trace' } }); }} className="mono lift" style={{ fontSize: 9.5, color: 'var(--teal)', border: '1px solid var(--teal)', borderRadius: 6, padding: '6px 10px', letterSpacing: '.06em' }}>◈ TRACE IN GRAPH</button>
                        <button onClick={(e) => { e.stopPropagation(); nav({ tab: 'memory' }); }} className="mono lift" style={{ fontSize: 9.5, color: 'var(--text-mute)', border: '1px solid var(--line-2)', borderRadius: 6, padding: '6px 10px', letterSpacing: '.06em' }}>→ AFFECTED POSITION</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const tagStyle = {
  display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 10.5, color: 'var(--text-dim)',
  background: 'var(--bg-3)', border: '1px solid var(--line)', borderRadius: 6, padding: '3px 7px 3px 4px',
};

function Pillctrl({ label, value }) {
  return (
    <button className="lift" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'var(--bg-1)', border: '1px solid var(--line-2)', borderRadius: 8, padding: '6px 11px' }}>
      <span className="mono" style={{ fontSize: 9.5, color: 'var(--text-mute)', letterSpacing: '.08em' }}>{label}</span>
      <span className="mono" style={{ fontSize: 9.5, color: 'var(--text)', letterSpacing: '.08em' }}>{value}</span>
      <span style={{ color: 'var(--text-faint)', fontSize: 10 }}>⌄</span>
    </button>
  );
}
window.SignalsScreen = SignalsScreen;
