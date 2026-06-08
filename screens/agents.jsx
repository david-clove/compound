/* ============================================================================
   COMPOUND — Multi-Agent view
   Founders steering multi-agent systems. Build lane + Content (Reach) lane.
   Reconstructed from .claude / .codex sessions → BUILD store.
   ========================================================================== */
const AGENT_STATUS = {
  steering: { c: 'var(--teal)',  label: 'Steering' },
  working:  { c: 'var(--mint)',  label: 'Working' },
  review:   { c: 'var(--blue)',  label: 'Review' },
  blocked:  { c: 'var(--coral)', label: 'Blocked' },
  idle:     { c: 'var(--text-faint)', label: 'Idle' },
};

function AgentsScreen({ nav }) {
  const [lane, setLane] = useState('build'); // build | content
  const dataset = lane === 'build' ? D.AGENTS : D.CONTENT;
  const s = dataset.session;
  const meshById = id => dataset.mesh.find(m => m.id === id);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, position: 'relative' }}>
      <GlowBg b="rgba(93,141,239,0.06)" />

      {/* session header */}
      <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--line)', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <h1 className="ser" style={{ fontSize: 23, fontWeight: 500, margin: 0 }}>Multi-Agent</h1>
          <div style={{ display: 'flex', gap: 4, background: 'var(--bg-1)', border: '1px solid var(--line)', borderRadius: 9, padding: 3 }}>
            <Tab active={lane === 'build'} onClick={() => setLane('build')}>◑ BUILD THE PRODUCT</Tab>
            <Tab active={lane === 'content'} onClick={() => setLane('content')}>◎ SELL THE PRODUCT</Tab>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16 }}>
            {lane === 'build'
              ? <span className="mono" style={{ fontSize: 10.5, color: 'var(--text-dim)' }}>⎇ {s.repo} <span style={{ color: 'var(--text-faint)' }}>·</span> {s.branch}</span>
              : <span className="mono" style={{ fontSize: 10.5, color: 'var(--text-dim)' }}>◎ {s.campaign} <span style={{ color: 'var(--text-faint)' }}>·</span> {s.channels}</span>}
            <span className="mono" style={{ fontSize: 9.5, color: 'var(--text-faint)' }}>{s.tokens} TOK · {s.cost} · {s.started}</span>
          </div>
        </div>
        <div className="mono" style={{ fontSize: 9, color: 'var(--text-faint)', marginTop: 8, letterSpacing: '.06em' }}>
          {lane === 'build' ? 'BUILD THREAD · RECONSTRUCTED FROM .CLAUDE + .CODEX SESSIONS' : 'REACH THREAD · CONTENT AGENTS GENERATING GTM ASSETS'} → {lane === 'build' ? 'BUILD' : 'MARKET'} STORE
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', minHeight: 0, position: 'relative', zIndex: 1 }}>
        {/* kanban */}
        <div style={{ flex: 1, overflow: 'auto', padding: '18px 20px', minWidth: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, alignItems: 'start', minHeight: '100%' }}>
            {dataset.columns.map(col => (
              <div key={col.id} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 4px 8px' }}>
                  <span style={{ color: col.id === 'review' ? 'var(--mint)' : col.id === 'progress' || col.id === 'drafting' ? 'var(--blue)' : 'var(--text-mute)', fontSize: 12 }}>{col.glyph}</span>
                  <span style={{ fontSize: 13.5, fontWeight: 600 }}>{col.label}</span>
                  <span className="mono" style={{ fontSize: 10, color: 'var(--text-faint)' }}>{col.tasks.length}</span>
                </div>
                {col.tasks.map(t => {
                  const ag = meshById(t.agent);
                  const st = t.status ? AGENT_STATUS[t.status] : null;
                  return (
                    <div key={t.id} className="lift" style={{
                      background: 'var(--bg-1)', border: '1px solid ' + (t.misaligned ? 'var(--amber)' : 'var(--line)'),
                      borderRadius: 11, padding: 14,
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 9 }}>
                        {ag && <Avatar text={ag.name.split(' ').map(w => w[0]).slice(0, 2).join('')} color={AGENT_STATUS[ag.status].c} size={20} />}
                        <span className="mono" style={{ fontSize: 9, color: 'var(--text-mute)', flex: 1, letterSpacing: '.04em' }}>{ag ? ag.name.toUpperCase() : ''}</span>
                        {st && <span className="mono" style={{ fontSize: 8, color: st.c, border: '1px solid ' + st.c, borderRadius: 4, padding: '1px 5px' }}>{st.label.toUpperCase()}</span>}
                      </div>
                      <div style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.35, marginBottom: t.files.length || t.note ? 11 : 0 }}>{t.title}</div>

                      {t.note && <div style={{ fontSize: 11.5, color: t.misaligned ? 'var(--amber)' : 'var(--text-mute)', lineHeight: 1.45, marginBottom: 11 }}>{t.note}</div>}

                      {t.files.length > 0 && (
                        <div style={{ display: 'grid', gap: 5, marginBottom: 11 }}>
                          {t.files.map((f, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'var(--mono)', fontSize: 10 }}>
                              <span style={{ color: f.op === 'Write' ? 'var(--mint)' : 'var(--blue)', width: 32 }}>{f.op}</span>
                              <span style={{ color: 'var(--text-mute)', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.path}</span>
                              {f.add != null && <span style={{ color: 'var(--mint)' }}>+{f.add}</span>}
                              {f.del != null && <span style={{ color: 'var(--coral)' }}>−{f.del}</span>}
                            </div>
                          ))}
                        </div>
                      )}

                      {t.commit && <div className="mono" style={{ fontSize: 9, color: 'var(--text-faint)', marginBottom: 10 }}>⎇ {t.commit}</div>}

                      {t.actions && (
                        <div style={{ display: 'flex', gap: 7, marginBottom: t.extracted ? 11 : 0 }}>
                          <button className="mono lift" style={{ flex: 1, fontSize: 9.5, color: 'var(--bg)', background: 'var(--mint)', borderRadius: 7, padding: '7px', letterSpacing: '.06em', fontWeight: 600 }}>{lane === 'build' ? 'COMMIT' : 'APPROVE'}</button>
                          <button onClick={() => nav({ tab: 'alignment' })} className="mono lift" style={{ flex: 1, fontSize: 9.5, color: 'var(--text-dim)', border: '1px solid var(--line-2)', borderRadius: 7, padding: '7px', letterSpacing: '.06em' }}>{t.misaligned ? 'CHECK ALIGN ↗' : lane === 'build' ? 'OPEN PR' : 'SCHEDULE'}</button>
                        </div>
                      )}

                      {t.extracted && (
                        <button onClick={() => nav({ tab: t.extracted.includes('conflict') ? 'alignment' : 'memory' })} className="lift" style={{
                          display: 'flex', alignItems: 'center', gap: 7, width: '100%', textAlign: 'left',
                          paddingTop: 10, borderTop: '1px solid var(--line)',
                        }}>
                          <span style={{ color: t.extracted.includes('conflict') ? 'var(--coral)' : 'var(--mint)', fontSize: 11 }}>{t.extracted.includes('conflict') ? '⤬' : '◈'}</span>
                          <span className="mono" style={{ fontSize: 9, color: 'var(--text-mute)', letterSpacing: '.04em', flex: 1 }}>{t.extracted.toUpperCase()}</span>
                          <span style={{ color: 'var(--text-faint)', fontSize: 10 }}>→</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* right rail: mesh + extracted */}
        <div style={{ width: 286, flexShrink: 0, borderLeft: '1px solid var(--line)', overflow: 'auto', padding: 18, background: 'var(--bg-0)' }}>
          <Label style={{ marginBottom: 12 }}>AGENT MESH · {dataset.mesh.length}</Label>
          <div style={{ position: 'relative', marginBottom: 22 }}>
            {dataset.mesh.map((m, i) => {
              const st = AGENT_STATUS[m.status];
              const isLead = m.type === 'lead';
              return (
                <div key={m.id} style={{ display: 'flex', gap: 10, padding: '9px 0', marginLeft: isLead ? 0 : 16, position: 'relative' }}>
                  {!isLead && <span style={{ position: 'absolute', left: -10, top: -2, bottom: '50%', width: 10, borderLeft: '1px solid var(--line-2)', borderBottom: '1px solid var(--line-2)', borderBottomLeftRadius: 6 }} />}
                  <Avatar text={m.name.split(' ').map(w => w[0]).slice(0, 2).join('')} color={st.c} size={26} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 12.5, fontWeight: 600 }}>{m.name}</span>
                      {isLead && <span className="mono" style={{ fontSize: 7.5, color: 'var(--teal)', border: '1px solid var(--teal)', borderRadius: 3, padding: '0 4px' }}>LEAD</span>}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-mute)', lineHeight: 1.4, marginTop: 2 }}>{m.action}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 5 }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ width: 6, height: 6, borderRadius: 99, background: st.c, animation: m.status === 'working' || m.status === 'steering' ? 'pulse 1.6s infinite' : 'none' }} />
                        <span className="mono" style={{ fontSize: 8, color: st.c }}>{st.label.toUpperCase()}</span>
                      </span>
                      <span className="mono" style={{ fontSize: 8, color: 'var(--text-faint)' }}>{m.model} · {m.tokens}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Label style={{ marginBottom: 12 }}>EXTRACTED → {lane === 'build' ? 'BUILD' : 'MARKET'} STORE</Label>
          <div style={{ display: 'grid', gap: 8 }}>
            {dataset.extracted.map((e, i) => {
              const conflict = e.kind === 'Conflict' || e.kind === 'Blocker';
              return (
                <button key={i} onClick={() => nav({ tab: conflict ? 'alignment' : 'memory' })} className="lift" style={{ textAlign: 'left', padding: 12, borderRadius: 10, background: 'var(--bg-1)', border: '1px solid var(--line)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
                    <span className="mono" style={{ fontSize: 8.5, color: conflict ? 'var(--coral)' : 'var(--mint)', border: '1px solid currentColor', borderRadius: 3, padding: '1px 5px', letterSpacing: '.06em' }}>{e.kind.toUpperCase()}</span>
                    <Ev score={e.ev} />
                    <span className="mono" style={{ fontSize: 8, color: 'var(--text-faint)', marginLeft: 'auto' }}>{e.agent}</span>
                  </div>
                  <div style={{ fontSize: 11.5, color: 'var(--text-dim)', lineHeight: 1.45 }}>{e.text}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
window.AgentsScreen = AgentsScreen;
