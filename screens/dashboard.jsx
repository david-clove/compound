/* ============================================================================
   COMPOUND — Project Dashboard (the morning brief)
   ========================================================================== */
function DashboardScreen({ venture, nav }) {
  const d = D.DASH;
  const [jtab, setJtab] = useState(d.journey.current);
  const [openTask, setOpenTask] = useState(0);
  const pnl = s => ({ background: 'var(--bg-1)', border: '1px solid var(--line)', borderRadius: 'var(--r)', ...s });

  return (
    <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}>
      <GlowBg />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1120, margin: '0 auto', padding: '34px 36px 48px' }}>

        {/* greeting */}
        <div className="fade-up" style={{ textAlign: 'center', marginBottom: 30 }}>
          <Label style={{ justifySelf: 'center', display: 'inline-block', marginBottom: 12 }}>▦ {d.day}</Label>
          <h1 className="ser" style={{ fontSize: 44, fontWeight: 500, margin: 0, letterSpacing: '-0.015em' }}>
            Good morning, <span style={{ color: 'var(--mint)' }}>{d.name}</span>.
          </h1>
          <p style={{ fontSize: 14.5, color: 'var(--text-dim)', maxWidth: 620, margin: '14px auto 0', lineHeight: 1.6 }}>
            Since <span style={{ color: 'var(--text)' }}>{d.since}</span>, you've had <b style={{ color: 'var(--text)' }}>{d.convos} conversations</b>. Influx extracted
            {' '}<b style={{ color: 'var(--mint)' }}>{d.learnings} new learnings</b>, promoted <b style={{ color: 'var(--mint)' }}>{d.promoted} signals</b>, and unlocked <b style={{ color: 'var(--mint)' }}>{d.artifacts} artifacts</b>.
          </p>
        </div>

        {/* three columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr 1fr', gap: 14, alignItems: 'start' }}>

          {/* LEFT: meetings + signals */}
          <div className="fade-up" style={{ display: 'grid', gap: 14 }}>
            <div style={pnl({ padding: 16 })}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <Label>TODAY <span style={{ color: 'var(--text)' }}>{d.meetings.length}</span> MEETINGS</Label>
              <AutoTag label="AUTO-JOINED" />
            </div>
              <div style={{ display: 'grid', gap: 2 }}>
                {d.meetings.map((m, i) => (
                  <button key={i} onClick={() => m.soon && nav({ tab: 'accounts', sub: { call: true, crumb: 'Discovery' } })} className="lift" style={{
                    display: 'flex', alignItems: 'center', gap: 11, padding: '9px 8px', borderRadius: 8, textAlign: 'left',
                    background: m.soon ? 'var(--bg-3)' : 'transparent',
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: 99, background: m.soon ? 'var(--mint)' : 'var(--text-faint)' }} />
                    <span className="mono" style={{ fontSize: 11, color: m.soon ? 'var(--mint)' : 'var(--text-mute)', width: 36 }}>{m.t}</span>
                    <span style={{ fontSize: 12.5, color: m.soon ? 'var(--text)' : 'var(--text-dim)', flex: 1 }}>{m.title}</span>
                    <span style={{ color: 'var(--text-faint)', fontSize: 13 }}>{m.video ? '▷' : '▦'}</span>
                  </button>
                ))}
              </div>
            </div>

            <div style={pnl({ padding: 16 })}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <Label>SIGNALS <span style={{ color: 'var(--text)' }}>10</span> NEW</Label>
                <button onClick={() => nav({ tab: 'signals' })} className="mono lift" style={{ fontSize: 9.5, color: 'var(--mint)', letterSpacing: '.08em' }}>OPEN ALL ↗</button>
              </div>
              <div style={{ display: 'grid', gap: 12 }}>
                {D.SIGNALS.slice(0, 3).map(s => (
                  <button key={s.id} onClick={() => nav({ tab: 'signals' })} className="lift" style={{ display: 'flex', gap: 9, textAlign: 'left', padding: '2px 0' }}>
                    <span style={{ color: D.SIGNAL_TYPES[s.type].color, fontSize: 12, lineHeight: 1.4 }}>{D.SIGNAL_TYPES[s.type].glyph}</span>
                    <span style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.45, flex: 1 }}>{s.text.slice(0, 86)}{s.text.length > 86 ? '…' : ''}</span>
                    <span style={{ textAlign: 'right', flexShrink: 0 }}>
                      <Ev score={s.ev} />
                      <div className="mono" style={{ fontSize: 8.5, color: 'var(--text-faint)', marginTop: 3 }}>{s.age}</div>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CENTER: tasks */}
          <div className="fade-up" style={pnl({ padding: 16 })}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <Label>WHAT YOU HANDLE <span style={{ color: 'var(--text)' }}>{d.tasks.length}</span> OPEN</Label>
              <DecideTag />
            </div>
            <div style={{ display: 'grid', gap: 9 }}>
              {d.tasks.map((t, i) => {
                const open = openTask === i;
                return (
                  <div key={i} className="lift" style={{
                    border: '1px solid ' + (open ? 'var(--line-2)' : 'var(--line)'), borderRadius: 10,
                    background: open ? 'var(--bg-2)' : 'var(--bg-0)', overflow: 'hidden',
                  }}>
                    <button onClick={() => setOpenTask(open ? -1 : i)} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '13px 14px', width: '100%', textAlign: 'left' }}>
                      <span style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--bg-3)', display: 'grid', placeItems: 'center', color: i === 0 ? 'var(--mint)' : 'var(--text-mute)', fontSize: 14, flexShrink: 0 }}>{t.glyph}</span>
                      <span style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: i === 0 ? 'var(--text)' : 'var(--text-dim)' }}>{t.title}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-mute)', marginTop: 3, lineHeight: 1.45 }}>{t.sub}</div>
                      </span>
                      <span style={{ color: 'var(--text-faint)', fontSize: 11, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>⌄</span>
                    </button>
                    {open && t.body && (
                      <div className="fade-in" style={{ padding: '0 14px 14px 56px' }}>
                        <p style={{ fontSize: 12.5, color: 'var(--text-dim)', lineHeight: 1.5, margin: '0 0 11px' }}>{t.body}</p>
                        {t.cta && <button onClick={() => nav({ tab: 'memory' })} className="mono lift" style={{ fontSize: 10, color: 'var(--mint)', letterSpacing: '.08em', border: '1px solid var(--mint)', borderRadius: 7, padding: '7px 12px', background: 'var(--mint-soft)' }}>{t.cta} ↗</button>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: venturing journey */}
          <div className="fade-up" style={pnl({ padding: 16 })}>
            <Label style={{ marginBottom: 14 }}>YOUR VENTURING JOURNEY</Label>
            <div style={{ display: 'flex', gap: 4, marginBottom: 18 }}>
              {D.JOURNEY.map(j => {
                const active = jtab === j.id;
                const done = D.JOURNEY.findIndex(x => x.id === j.id) <= D.JOURNEY.findIndex(x => x.id === d.journey.current);
                return (
                  <button key={j.id} onClick={() => setJtab(j.id)} className="lift" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, padding: '4px 0' }}>
                    <span style={{ fontSize: 15, color: active ? 'var(--mint)' : done ? 'var(--text-mute)' : 'var(--text-faint)' }}>{j.glyph}</span>
                    <span className="mono" style={{ fontSize: 8.5, color: active ? 'var(--text)' : 'var(--text-faint)' }}>{j.label}</span>
                    <span style={{ width: '100%', height: 2, borderRadius: 2, background: active ? 'var(--mint)' : done ? 'var(--mint-2)' : 'rgba(255,255,255,0.07)', opacity: active ? 1 : 0.5 }} />
                  </button>
                );
              })}
            </div>

            <h3 className="ser" style={{ fontSize: 19, fontWeight: 500, color: 'var(--mint)', margin: '0 0 8px' }}>{d.journey.headline}</h3>
            <p style={{ fontSize: 12.5, color: 'var(--text-dim)', lineHeight: 1.5, margin: '0 0 16px' }}>{d.journey.blurb}</p>

            <div style={{ display: 'grid', gap: 12 }}>
              {d.journey.checks.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
                  <span style={{ width: 26, height: 26, borderRadius: 7, background: 'var(--bg-3)', display: 'grid', placeItems: 'center', fontSize: 12, color: 'var(--text-mute)', flexShrink: 0 }}>{c.glyph}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{c.title}</div>
                    <div style={{ fontSize: 11.5, color: c.ok ? 'var(--text-mute)' : 'var(--coral)', marginTop: 2, lineHeight: 1.4 }}>{c.sub}</div>
                  </div>
                  <span style={{ width: 18, height: 18, borderRadius: 99, display: 'grid', placeItems: 'center', fontSize: 11, background: c.ok ? 'var(--mint-soft)' : 'var(--coral-soft)', color: c.ok ? 'var(--mint)' : 'var(--coral)', flexShrink: 0 }}>{c.ok ? '✓' : '✕'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
window.DashboardScreen = DashboardScreen;
