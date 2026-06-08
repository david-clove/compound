/* ============================================================================
   COMPOUND — Weekly Strategic Triage (generated briefing)
   ========================================================================== */
function TriageScreen({ nav }) {
  const t = D.TRIAGE;
  return (
    <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}>
      <GlowBg />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 880, margin: '0 auto', padding: '34px 36px 56px' }}>

        <Label style={{ marginBottom: 16 }}>INTELLIGENCE › TRIAGE › WEEKLY REPORT</Label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
          <h1 className="ser" style={{ fontSize: 30, fontWeight: 500, margin: 0, lineHeight: 1.1 }}>Weekly Strategic Triage</h1>
          <AutoTag label="AUTO-GENERATED" />
          <span className="mono" style={{ fontSize: 9.5, color: 'var(--mint)', background: 'var(--mint-soft)', borderRadius: 4, padding: '2px 7px', letterSpacing: '.08em' }}>NEW</span>
        </div>
        <div className="mono" style={{ fontSize: 11, color: 'var(--text-mute)', marginBottom: 30, letterSpacing: '.04em' }}>
          {t.when}&nbsp;&nbsp;·&nbsp;&nbsp;<span style={{ color: 'var(--text)' }}>{t.conversations}</span> conversations&nbsp;&nbsp;·&nbsp;&nbsp;<span style={{ color: 'var(--text)' }}>{t.learnings}</span> learnings&nbsp;&nbsp;·&nbsp;&nbsp;<span style={{ color: 'var(--text)' }}>{t.paths}</span> paths&nbsp;&nbsp;·&nbsp;&nbsp;cycle <span style={{ color: 'var(--text)' }}>#{t.cycle}</span>
        </div>

        {/* summary */}
        <Label style={{ marginBottom: 14 }}>SUMMARY</Label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 250px', gap: 24, marginBottom: 40 }}>
          <p style={{ fontSize: 14.5, color: 'var(--text-dim)', lineHeight: 1.65, margin: 0 }}>{t.summary}</p>
          <div style={{ background: 'var(--bg-1)', border: '1px solid var(--line)', borderRadius: 12, padding: 16 }}>
            <Label style={{ fontSize: 8.5, marginBottom: 12 }}>EVIDENCE DISTRIBUTION</Label>
            <EvDistribution dist={t.distribution} />
          </div>
        </div>

        {/* narratives */}
        {t.narratives.map((n, i) => (
          <div key={i} className="fade-up" style={{ marginBottom: 30, animationDelay: (i * 0.05) + 's' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <h2 className="mono" style={{ fontSize: 16, fontWeight: 600, margin: 0, letterSpacing: '.02em', color: 'var(--text)' }}>{n.title}</h2>
              {n.trust
                ? <span className="mono" style={{ fontSize: 9, color: 'var(--mint)', border: '1px solid var(--mint)', borderRadius: 4, padding: '2px 7px', letterSpacing: '.1em' }}>TRUST</span>
                : <span className="mono" style={{ fontSize: 9, color: 'var(--amber)', border: '1px solid var(--amber)', borderRadius: 4, padding: '2px 7px', letterSpacing: '.1em' }}>WATCH</span>}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 14 }}>
              {Object.entries(n.counts).map(([k, v]) => (
                <span key={k} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--text-dim)', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 6, padding: '4px 9px' }}>
                  {k} <span style={{ fontWeight: 600, color: 'var(--text)' }}>{v}</span>
                </span>
              ))}
            </div>

            <p style={{ fontSize: 13.5, color: 'var(--text-dim)', lineHeight: 1.6, margin: '0 0 14px' }}>{n.lede}</p>

            <div style={{ display: 'grid', gap: 1, marginBottom: 16, border: '1px solid var(--line)', borderRadius: 10, overflow: 'hidden' }}>
              {n.rows.map((r, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', background: 'var(--bg-1)' }}>
                  <Ev score={r.ev} />
                  <span style={{ fontSize: 12.5, color: 'var(--text-dim)', flex: 1 }}>{r.text}</span>
                  <span className="mono" style={{ fontSize: 9.5, color: 'var(--text-faint)', whiteSpace: 'nowrap' }}>{r.who}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ border: '1px solid var(--coral-soft)', background: 'var(--coral-soft)', borderRadius: 10, padding: 14 }}>
                <Label style={{ color: 'var(--coral)', marginBottom: 8 }}>⚔ DEVIL'S ADVOCATE</Label>
                <p style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.5, margin: 0 }}>{n.devil}</p>
              </div>
              <div style={{ border: '1px solid var(--mint-soft)', background: 'var(--mint-soft)', borderRadius: 10, padding: 14 }}>
                <Label style={{ color: 'var(--mint)', marginBottom: 8 }}>→ NEXT WEEK</Label>
                <p style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.5, margin: 0 }}>{n.next}</p>
              </div>
            </div>
          </div>
        ))}

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 8 }}>
          <button onClick={() => nav({ tab: 'graph' })} className="mono lift" style={{ fontSize: 10, color: 'var(--teal)', border: '1px solid var(--teal)', borderRadius: 8, padding: '10px 16px', letterSpacing: '.06em' }}>◈ EXPLORE THE {t.paths} PATHS IN GRAPH</button>
          <button onClick={() => nav({ tab: 'memory' })} className="mono lift" style={{ fontSize: 10, color: 'var(--text-mute)', border: '1px solid var(--line-2)', borderRadius: 8, padding: '10px 16px', letterSpacing: '.06em' }}>REVIEW POSITIONS</button>
        </div>
      </div>
    </div>
  );
}
window.TriageScreen = TriageScreen;
