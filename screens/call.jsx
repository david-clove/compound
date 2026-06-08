/* ============================================================================
   COMPOUND — Call detail (drilled from an account)
   ========================================================================== */
function CallScreen({ nav }) {
  const c = D.CALL;
  const acct = D.ACCOUNTS.find(a => a.id === c.account);
  const [phase, setPhase] = useState('analysing'); // analysing -> ready
  useEffect(() => { const t = setTimeout(() => setPhase('ready'), 1600); return () => clearTimeout(t); }, []);

  const back = () => nav({ tab: 'accounts', sub: null });

  const evTotal = Object.values(c.evidence).reduce((a, b) => a + b, 0);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, position: 'relative' }}>
      <GlowBg b="rgba(164,129,240,0.07)" />
      {/* call header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 24px', borderBottom: '1px solid var(--line)', position: 'relative', zIndex: 1 }}>
        <button onClick={back} className="lift" style={{ color: 'var(--text-mute)', fontSize: 16, padding: '2px 6px', borderRadius: 6 }}>←</button>
        <span style={{ color: 'var(--mint)', fontSize: 14 }}>▷</span>
        <span style={{ fontSize: 14, fontWeight: 600 }}>{c.title}</span>
        <span className="mono" style={{ fontSize: 10, color: 'var(--text-faint)' }}>{c.when} · {c.dur}</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 12, color: 'var(--text-faint)', fontSize: 14 }}><span>☆</span><span>⋯</span></div>
      </div>

      {phase === 'analysing' ? (
        <div className="fade-in" style={{ flex: 1, display: 'grid', placeItems: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: 'var(--mint-soft)', color: 'var(--mint)', display: 'grid', placeItems: 'center', fontSize: 22, margin: '0 auto 20px', animation: 'pulse 1.6s infinite' }}>✷</div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--mint)', letterSpacing: '.12em', marginBottom: 16 }}>⟳ ANALYSING CALL · FINDING INSIGHTS</div>
            <div style={{ width: 200, height: 3, borderRadius: 3, background: 'rgba(255,255,255,0.08)', margin: '0 auto', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '40%', background: 'var(--mint)', borderRadius: 3, animation: 'loadbar 1.6s ease forwards' }} />
            </div>
          </div>
          <style>{`@keyframes loadbar{from{width:6%}to{width:100%}}`}</style>
        </div>
      ) : (
        <div className="fade-in" style={{ flex: 1, display: 'grid', gridTemplateColumns: '200px 1fr 280px', minHeight: 0, position: 'relative', zIndex: 1 }}>
          {/* LEFT */}
          <div style={{ borderRight: '1px solid var(--line)', overflow: 'auto', padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <Avatar text={acct.avatar} color={acct.color} size={32} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{acct.name}</div>
                <div className="mono" style={{ fontSize: 9, color: 'var(--text-faint)' }}>{acct.domain}</div>
              </div>
            </div>
            <div style={{ border: '1px solid var(--line)', borderRadius: 10, padding: 12, marginBottom: 18 }}>
              <Label style={{ marginBottom: 9 }}>ICP FIT</Label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FitBar value={c.fit} segs={7} color="var(--mint)" />
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--mint)' }}>{c.fitLabel}</span>
              </div>
            </div>
            <Label style={{ marginBottom: 12 }}>PARTICIPANTS</Label>
            <div style={{ display: 'grid', gap: 12 }}>
              {c.participants.map(p => (
                <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Avatar text={p.initials} color={p.color} size={28} />
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 600 }}>{p.name}</div>
                    <div style={{ fontSize: 10.5, color: 'var(--text-mute)' }}>{p.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CENTER */}
          <div style={{ overflow: 'auto', padding: '20px 26px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <Label style={{ color: 'var(--mint)' }}>◇ MAIN INSIGHTS</Label>
              <AutoTag label="AUTO-EXTRACTED" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
              <div style={{ background: 'var(--bg-1)', border: '1px solid var(--line)', borderRadius: 10, padding: 14 }}>
                <Label style={{ fontSize: 8.5, marginBottom: 10 }}>EVIDENCE</Label>
                <div style={{ display: 'flex', height: 7, borderRadius: 4, overflow: 'hidden', marginBottom: 10 }}>
                  {['E5', 'E4', 'E3', 'E2'].map(k => (
                    <span key={k} style={{ flex: c.evidence[k] || 0.01, background: D.EVIDENCE[k].color }} />
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  {Object.entries(c.evidence).map(([k, v]) => (
                    <span key={k} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ fontSize: 12, fontWeight: 600 }}>{v}</span>
                      <span className="mono" style={{ fontSize: 9.5, color: D.EVIDENCE[k].color }}>{k}</span>
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ background: 'var(--bg-1)', border: '1px solid var(--line)', borderRadius: 10, padding: 14 }}>
                <Label style={{ fontSize: 8.5, marginBottom: 10 }}>INSIGHT DENSITY</Label>
                <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <span key={i} style={{ flex: 1, height: 14, borderRadius: 3, background: i < Math.round(c.density * 12) ? 'var(--mint)' : 'rgba(255,255,255,0.07)' }} />
                  ))}
                </div>
                <span className="mono" style={{ fontSize: 10, color: 'var(--text-mute)' }}>{c.insightCount} insights · {c.dur}</span>
              </div>
            </div>

            <div style={{ display: 'grid', gap: 9 }}>
              {c.insights.map((ins, i) => (
                <div key={i} className="lift fade-up" style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '13px 15px', borderRadius: 10,
                  background: 'var(--bg-1)', border: '1px solid var(--line)', animationDelay: (i * 0.06) + 's',
                }}>
                  <SignalChip type={ins.type} mini />
                  <span style={{ fontSize: 13.5, fontWeight: 500, flex: 1 }}>{ins.text}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: D.EVIDENCE[ins.ev].color }}>
                    <span style={{ fontSize: 9 }}>▂▄▆</span><Ev score={ins.ev} />
                  </span>
                  <span className="mono" style={{ fontSize: 9.5, color: 'var(--text-faint)' }}>{ins.t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div style={{ borderLeft: '1px solid var(--line)', overflow: 'auto', padding: 18 }}>
            <div style={{ position: 'relative', aspectRatio: '16/10', borderRadius: 10, overflow: 'hidden', marginBottom: 18, background: 'linear-gradient(135deg,#13202a,#1a1430)' }}>
              <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
                <span style={{ width: 44, height: 44, borderRadius: 99, background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(4px)', display: 'grid', placeItems: 'center', fontSize: 15, color: '#fff' }}>▶</span>
              </div>
              <span className="mono" style={{ position: 'absolute', bottom: 8, right: 10, fontSize: 10, color: 'rgba(255,255,255,0.8)' }}>{c.dur.replace(' min', ':00')}</span>
            </div>
            <Label style={{ marginBottom: 12 }}>TRANSCRIPT</Label>
            <div style={{ display: 'grid', gap: 13 }}>
              {c.transcript.map((line, i) => (
                <div key={i} style={{ opacity: line.dim ? 0.4 : 1 }}>
                  <div style={{ fontSize: 11.5, fontWeight: 600, color: line.who === 'Marta' ? 'var(--purple)' : line.who === 'You' ? 'var(--mint)' : 'var(--text-dim)', marginBottom: 3 }}>{line.who}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--text-dim)', lineHeight: 1.5 }}>{line.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
window.CallScreen = CallScreen;
