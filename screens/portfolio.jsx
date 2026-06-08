/* ============================================================================
   COMPOUND — Portfolio + Summary Analytics (top level)
   ========================================================================== */
function PortfolioScreen({ nav }) {
  const V = D.VENTURES;
  const totalSignals = V.reduce((a, v) => a + v.signals, 0);
  const totalContra = V.reduce((a, v) => a + v.contradictions, 0);
  const avgConv = V.reduce((a, v) => a + v.conviction, 0) / V.length;
  const needDecide = V.filter(v => v.drift > 0);
  const maxSig = Math.max(...V.map(v => v.signals));

  const healthColor = h => h === 'on-track' ? 'var(--mint)' : h === 'at-risk' ? 'var(--coral)' : h === 'exploring' ? 'var(--amber)' : 'var(--slate)';

  const open = id => nav({ view: 'project', venture: id, tab: 'dashboard', sub: null });
  const open2 = (id, tab) => nav({ view: 'project', venture: id, tab: tab || 'dashboard', sub: null });

  return (
    <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}>
      <GlowBg />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1180, margin: '0 auto', padding: '44px 40px 60px' }}>

        {/* hero */}
        <div className="fade-up" style={{ marginBottom: 34 }}>
          <Label style={{ color: 'var(--mint)', marginBottom: 14 }}>◆ COMPOUND STUDIO · 5 ACTIVE VENTURES</Label>
          <h1 className="ser" style={{ fontSize: 46, fontWeight: 500, margin: 0, lineHeight: 1.04, letterSpacing: '-0.02em' }}>
            While you slept, the studio <span style={{ fontStyle: 'italic', color: 'var(--mint)' }}>compounded</span>.
          </h1>
          <p style={{ fontSize: 15.5, color: 'var(--text-dim)', maxWidth: 680, marginTop: 14, lineHeight: 1.55 }}>
            Cycle <span className="mono" style={{ color: 'var(--text)' }}>#348</span> ran across every venture overnight. It ingested
            {' '}<b style={{ color: 'var(--text)' }}>1,204 new items</b>, promoted <b style={{ color: 'var(--mint)' }}>23 signals</b>,
            and opened <b style={{ color: 'var(--amber)' }}>{totalContra} contradictions</b> waiting on your decision.
          </p>
        </div>

        {/* rollup stat strip */}
        <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 14 }}>
          {[
            { k: 'Portfolio conviction', v: (avgConv * 100).toFixed(0) + '%', sub: '+4 pts this cycle', c: 'var(--mint)', bar: avgConv },
            { k: 'Signals in memory', v: totalSignals.toLocaleString(), sub: 'across 5 ventures', c: 'var(--text)' },
            { k: 'Open contradictions', v: totalContra, sub: 'highest-value to resolve', c: 'var(--amber)' },
            { k: 'Need your decision', v: D.DECIDE_QUEUE.length, sub: 'human gates across ventures', c: 'var(--amber)' },
          ].map((m, i) => (
            <div key={i} style={card()}>
              <Label style={{ marginBottom: 10 }}>{m.k}</Label>
              <div style={{ fontSize: 30, fontWeight: 600, color: m.c, letterSpacing: '-0.02em', fontFamily: 'var(--serif)' }}>{m.v}</div>
              <div style={{ fontSize: 11.5, color: 'var(--text-mute)', marginTop: 4 }}>{m.sub}</div>
              {m.bar != null && <div style={{ marginTop: 10 }}><Bar value={m.bar} color={m.c} /></div>}
            </div>
          ))}
        </div>

        {/* analytics: signal volume by venture */}
        <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 14, marginBottom: 30 }}>
          <div style={card()}>
            <Label style={{ marginBottom: 16 }}>SIGNAL VOLUME BY VENTURE</Label>
            <div style={{ display: 'grid', gap: 12 }}>
              {V.map(v => (
                <div key={v.id} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 52px', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 12.5, color: 'var(--text-dim)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.name}</span>
                  <Bar value={v.signals / maxSig} color={v.color} h={7} />
                  <span className="mono" style={{ fontSize: 11, color: 'var(--text-mute)', textAlign: 'right' }}>{v.signals}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={card()}>
            <Label style={{ marginBottom: 14 }}>STAGE DISTRIBUTION</Label>
            <div style={{ display: 'grid', gap: 9 }}>
              {D.JOURNEY.map(j => {
                const inStage = V.filter(v => v.stage === j.id);
                return (
                  <div key={j.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span className="mono" style={{ fontSize: 10, color: 'var(--text-mute)', width: 64 }}>{j.label}</span>
                    <div style={{ display: 'flex', gap: 4, flex: 1 }}>
                      {inStage.length ? inStage.map(v => (
                        <span key={v.id} title={v.name} style={{ width: 9, height: 9, borderRadius: 3, background: v.color }} />
                      )) : <span style={{ width: 9, height: 9, borderRadius: 3, background: 'rgba(255,255,255,0.06)' }} />}
                    </div>
                    <span className="mono" style={{ fontSize: 10, color: 'var(--text-faint)' }}>{inStage.length || '—'}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* WHICH VENTURE NEEDS YOU TODAY — the founder's triage */}
        {(() => {
          const counts = {};
          D.DECIDE_QUEUE.forEach(q => { counts[q.venture] = (counts[q.venture] || 0) + 1; });
          const ranked = D.VENTURES.filter(v => counts[v.id]).sort((a, b) => counts[b.id] - counts[a.id]);
          const firstTab = vid => (D.DECIDE_QUEUE.find(q => q.venture === vid) || {}).tab || 'dashboard';
          return (
            <div className="fade-up" style={{ ...card(), padding: 18, marginBottom: 30, borderColor: 'rgba(232,145,58,0.30)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <span style={{ width: 26, height: 26, borderRadius: 7, background: 'var(--amber-soft)', color: 'var(--amber)', display: 'grid', placeItems: 'center', fontSize: 13 }}>◬</span>
                <div>
                  <div className="disp" style={{ fontSize: 16, fontWeight: 700 }}>Which venture needs you today</div>
                  <div className="mono" style={{ fontSize: 9, color: 'var(--text-faint)', letterSpacing: '.06em', marginTop: 1 }}>{D.DECIDE_QUEUE.length} HUMAN GATES · YOU OWN ONE VERB</div>
                </div>
                <span className="ser" style={{ fontStyle: 'italic', fontSize: 13.5, color: 'var(--text-mute)', marginLeft: 'auto' }}>Compound did the work. These are yours.</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + ranked.length + ',1fr)', gap: 10 }}>
                {ranked.map(v => (
                  <button key={v.id} onClick={() => open2(v.id, firstTab(v.id))} className="lift" style={{
                    display: 'flex', alignItems: 'center', gap: 11, padding: '12px 13px', borderRadius: 10,
                    background: 'var(--bg-0)', border: '1px solid var(--line)', textAlign: 'left',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(232,145,58,0.42)'; e.currentTarget.style.background = 'var(--bg-2)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.background = 'var(--bg-0)'; }}>
                    <span style={{ width: 9, height: 9, borderRadius: 3, background: v.color, flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.name}</div>
                      <div className="mono" style={{ fontSize: 8.5, color: 'var(--text-faint)' }}>{v.health.replace('-', ' ').toUpperCase()}</div>
                    </div>
                    <span className="mono" style={{ fontSize: 11, color: 'var(--bg-void)', background: 'var(--amber)', borderRadius: 99, padding: '1px 7px', fontWeight: 700 }}>{counts[v.id]}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })()}

        {/* ventures */}
        <Label style={{ marginBottom: 16 }}>VENTURES <span style={{ color: 'var(--text-faint)' }}>· sorted by conviction</span></Label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
          {[...V].sort((a, b) => b.conviction - a.conviction).map((v, i) => (
            <button key={v.id} onClick={() => open(v.id)} className="lift fade-up" style={{
              ...card(), textAlign: 'left', cursor: 'pointer', animationDelay: (i * 0.04) + 's',
              borderColor: 'var(--line)',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--line-3)'; e.currentTarget.style.background = 'var(--bg-2)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.background = 'var(--bg-1)'; }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 12 }}>
                <span style={{ width: 32, height: 32, borderRadius: 8, background: 'color-mix(in srgb,' + v.color + ' 16%, transparent)', color: v.color, display: 'grid', placeItems: 'center', fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 15 }}>{v.name[0]}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 16, fontWeight: 600 }}>{v.name}</span>
                    <span className="mono" style={{ fontSize: 8.5, color: 'var(--text-mute)', border: '1px solid var(--line-2)', borderRadius: 3, padding: '1px 5px', letterSpacing: '.06em' }}>{v.tag}</span>
                  </div>
                  <div className="mono" style={{ fontSize: 9, color: 'var(--text-faint)', marginTop: 2 }}>{v.domain}</div>
                </div>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 7, height: 7, borderRadius: 99, background: healthColor(v.health) }} />
                  <span className="mono" style={{ fontSize: 9, color: healthColor(v.health), letterSpacing: '.06em' }}>{v.health.replace('-', ' ').toUpperCase()}</span>
                </span>
              </div>

              <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.5, margin: '0 0 14px', minHeight: 38 }}>{v.thesis}</p>

              {/* journey */}
              <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
                {D.JOURNEY.map((j, idx) => (
                  <div key={j.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                    <span style={{ width: '100%', height: 3, borderRadius: 3, background: idx <= v.stageIdx ? v.color : 'rgba(255,255,255,0.07)' }} />
                    <span className="mono" style={{ fontSize: 8, color: idx === v.stageIdx ? v.color : 'var(--text-faint)', letterSpacing: '.04em' }}>{j.label}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 18, borderTop: '1px solid var(--line)', paddingTop: 12 }}>
                <Metric label="Conviction" value={(v.conviction * 100).toFixed(0) + '%'} trend={v.convictionTrend} color={v.color} />
                <Metric label="Signals" value={v.signals} />
                <Metric label="Contradictions" value={v.contradictions} color={v.contradictions > 6 ? 'var(--amber)' : null} />
                <Metric label="Runway" value={v.runway} />
                <div style={{ marginLeft: 'auto' }}>
                  {v.drift > 0
                    ? <span className="mono" style={{ fontSize: 9.5, color: 'var(--amber)', background: 'var(--amber-soft)', borderRadius: 5, padding: '4px 8px', letterSpacing: '.06em' }}>◬ {v.drift} DRIFT · DECIDE</span>
                    : <span className="mono" style={{ fontSize: 9.5, color: 'var(--text-faint)' }}>NO DRIFT →</span>}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value, trend, color }) {
  return (
    <div>
      <Label style={{ fontSize: 8.5, marginBottom: 3 }}>{label}</Label>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
        <span style={{ fontSize: 16, fontWeight: 600, color: color || 'var(--text)' }}>{value}</span>
        {trend != null && <span className="mono" style={{ fontSize: 9.5, color: trend >= 0 ? 'var(--mint)' : 'var(--coral)' }}>{trend >= 0 ? '▲' : '▼'}{Math.abs(trend * 100).toFixed(0)}</span>}
      </div>
    </div>
  );
}

function card() {
  return { background: 'var(--bg-1)', border: '1px solid var(--line)', borderRadius: 'var(--r)', padding: 18 };
}

window.PortfolioScreen = PortfolioScreen;
window.__card = card;
