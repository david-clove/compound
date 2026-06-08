/* ============================================================================
   COMPOUND — Company Memory: knowledge tree, position, drift detection
   ========================================================================== */
function MemoryScreen({ nav }) {
  const pos = D.POSITION;
  const drift = D.DRIFT;
  const [decision, setDecision] = useState(null); // adopt | revise | hold
  const [active, setActive] = useState('icp');

  return (
    <div style={{ flex: 1, display: 'flex', minHeight: 0, position: 'relative' }}>
      <GlowBg b="rgba(226,179,71,0.06)" />

      {/* knowledge tree */}
      <div style={{ width: 206, flexShrink: 0, borderRight: '1px solid var(--line)', overflow: 'auto', padding: 18, position: 'relative', zIndex: 1 }}>
        <h2 className="ser" style={{ fontSize: 21, fontWeight: 500, margin: '0 0 4px' }}>Company Memory</h2>
        <div className="mono" style={{ fontSize: 9.5, color: 'var(--text-faint)', marginBottom: 18, letterSpacing: '.06em' }}>ALWAYS CURRENT · NEVER LOST</div>
        <div style={{ display: 'grid', gap: 1 }}>
          {D.MEMORY_TREE.map(n => {
            const isActive = active === n.id;
            return (
              <button key={n.id} onClick={() => setActive(n.id)} className="lift" style={{
                display: 'flex', alignItems: 'center', gap: 8, textAlign: 'left',
                padding: '7px 9px', paddingLeft: 9 + n.depth * 16, borderRadius: 7,
                background: isActive ? 'var(--bg-3)' : 'transparent',
                color: isActive ? 'var(--text)' : n.depth === 0 ? 'var(--text-dim)' : 'var(--text-mute)',
              }}>
                {n.depth === 0 && <span style={{ fontSize: 9, color: 'var(--text-faint)' }}>{n.open ? '▾' : '▸'}</span>}
                <span style={{ fontSize: 12.5, fontWeight: n.depth === 0 ? 600 : 500 }}>{n.label}</span>
                {n.id === 'icp' && <span style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: 99, background: 'var(--amber)' }} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* position document */}
      <div style={{ flex: 1, overflow: 'auto', padding: '30px 34px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 620 }}>
          <Label style={{ marginBottom: 14 }}>POSITION · STRATEGIC MEMORY</Label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
            <h1 className="ser" style={{ fontSize: 29, fontWeight: 500, margin: 0 }}>{pos.title}</h1>
            <span className="mono" style={{ fontSize: 9.5, color: 'var(--text-faint)', border: '1px solid var(--line-2)', borderRadius: 4, padding: '2px 6px' }}>v{pos.version}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 26 }}>
            <span className="mono" style={{ fontSize: 10, color: 'var(--text-mute)' }}>CONFIDENCE</span>
            <div style={{ width: 160 }}><Bar value={pos.confidence} color="var(--mint)" h={6} /></div>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--mint)' }}>{Math.round(pos.confidence * 100)}%</span>
            <span className="mono" style={{ fontSize: 10, color: 'var(--text-faint)', marginLeft: 'auto' }}>UPDATED {pos.updated.toUpperCase()}</span>
          </div>

          <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text)', fontFamily: 'var(--serif)' }}>
            {pos.body.map((seg, i) => (
              <span key={i}>
                {seg.t}
                {seg.cites.map(ci => (
                  <sup key={ci} title={'Evidence ' + ci} style={{ color: 'var(--mint)', fontSize: 11, fontFamily: 'var(--mono)', cursor: 'pointer', margin: '0 1px', verticalAlign: 'super' }}>[{ci}]</sup>
                ))}
                {i < pos.body.length - 1 ? ', ' : '.'}
              </span>
            ))}
          </p>

          <div style={{ display: 'flex', gap: 8, marginTop: 28 }}>
            <button onClick={() => nav({ tab: 'graph', sub: { focus: 'p-icp', crumb: 'this position' } })} className="mono lift" style={{ fontSize: 9.5, color: 'var(--teal)', border: '1px solid var(--teal)', borderRadius: 7, padding: '8px 12px', letterSpacing: '.06em' }}>◈ VIEW IN KNOWLEDGE GRAPH</button>
            <button onClick={() => nav({ tab: 'signals' })} className="mono lift" style={{ fontSize: 9.5, color: 'var(--text-mute)', border: '1px solid var(--line-2)', borderRadius: 7, padding: '8px 12px', letterSpacing: '.06em' }}>14 SUPPORTING SIGNALS</button>
          </div>
        </div>
      </div>

      {/* drift rail */}
      <div style={{ width: 304, flexShrink: 0, borderLeft: '1px solid var(--line)', overflow: 'auto', padding: 20, position: 'relative', zIndex: 1, background: 'var(--bg-0)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: 99, background: 'var(--amber)', animation: 'pulse 1.8s infinite' }} />
          <Label style={{ color: 'var(--amber)' }}>DRIFT DETECTED</Label>
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 600, margin: '10px 0 8px' }}>{drift.title}</h3>
        <p style={{ fontSize: 12.5, color: 'var(--text-dim)', lineHeight: 1.55, margin: '0 0 18px' }}>{drift.body}</p>

        <Label style={{ marginBottom: 10 }}>CONTRIBUTING CONVERSATIONS</Label>
        <div style={{ display: 'grid', gap: 7, marginBottom: 20 }}>
          {drift.conversations.map((c, i) => (
            <button key={i} onClick={() => nav({ tab: 'accounts' })} className="lift" style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '9px 11px', borderRadius: 9, background: 'var(--bg-2)', border: '1px solid var(--line)', textAlign: 'left' }}>
              <span style={{ width: 6, height: 6, borderRadius: 99, background: 'var(--amber)' }} />
              <span style={{ fontSize: 12, color: 'var(--text-dim)', flex: 1 }}>{c.who}</span>
              <span className="mono" style={{ fontSize: 9.5, color: 'var(--text-faint)' }}>{c.when}</span>
              <Ev score={c.ev} />
            </button>
          ))}
        </div>

        <Label style={{ marginBottom: 8 }}>CONFIDENCE HISTORY</Label>
        <div style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 10, padding: '14px 14px 10px', marginBottom: 22 }}>
          <Spark data={pos.history} color="var(--mint)" w={272} h={44} />
          <div className="mono" style={{ fontSize: 9, color: 'var(--text-faint)', marginTop: 8, display: 'flex', justifyContent: 'space-between' }}><span>8 VERSIONS</span><span style={{ color: 'var(--mint)' }}>▲ +29 PTS</span></div>
        </div>

        {/* THE DECIDE GATE */}
        <div style={{ border: '1px solid var(--amber)', background: 'var(--amber-soft)', borderRadius: 12, padding: 16 }}>
          <Label style={{ color: 'var(--amber)', marginBottom: 8 }}>◬ DECIDE · ONLY YOU</Label>
          <p style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.5, margin: '0 0 14px' }}>
            Five loop steps ran autonomously. This one is yours: how should the ICP position respond to the emerging Legal-Ops buyer?
          </p>
          {!decision ? (
            <div style={{ display: 'grid', gap: 7 }}>
              {[['adopt', 'Adopt — add Legal Ops as a co-buyer', 'var(--mint)'], ['revise', 'Revise — widen the buyer definition', 'var(--blue)'], ['hold', 'Hold — need more evidence first', 'var(--text-mute)']].map(([k, label, color]) => (
                <button key={k} onClick={() => setDecision(k)} className="lift" style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '10px 12px', borderRadius: 8, background: 'var(--bg-1)', border: '1px solid var(--line-2)', textAlign: 'left' }}>
                  <span style={{ width: 8, height: 8, borderRadius: 99, border: '1.5px solid ' + color }} />
                  <span style={{ fontSize: 12, color: 'var(--text)' }}>{label}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="fade-in" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px', background: 'var(--bg-1)', borderRadius: 8, border: '1px solid var(--mint)' }}>
              <span style={{ width: 22, height: 22, borderRadius: 99, background: 'var(--mint-soft)', color: 'var(--mint)', display: 'grid', placeItems: 'center', fontSize: 12 }}>✓</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--mint)', textTransform: 'capitalize' }}>{decision} recorded</div>
                <div className="mono" style={{ fontSize: 9, color: 'var(--text-faint)' }}>POSITION v{pos.version + 1} · CYCLE #348 · AUDITED</div>
              </div>
              <button onClick={() => setDecision(null)} className="mono lift" style={{ fontSize: 9, color: 'var(--text-mute)' }}>UNDO</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
window.MemoryScreen = MemoryScreen;
