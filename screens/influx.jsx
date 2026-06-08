/* ============================================================================
   COMPOUND — Influx: the Ingestion Plane
   Store-grouped connectors · health · evidence ceiling · cadence · contract
   ========================================================================== */
const HEALTH = {
  healthy:  { c: 'var(--mint)',  label: 'Healthy' },
  degraded: { c: 'var(--amber)', label: 'Degraded' },
  down:     { c: 'var(--coral)', label: 'Down' },
  off:      { c: 'var(--text-faint)', label: 'Off' },
};

function InfluxScreen({ nav }) {
  const sources = D.SOURCES;
  const onCount = sources.filter(s => s.on).length;
  const [sel, setSel] = useState('claude');
  const src = sources.find(s => s.id === sel);
  const store = src ? D.STORES[src.store] : null;

  const grouped = Object.keys(D.STORES).map(k => ({ key: k, ...D.STORES[k], items: sources.filter(s => s.store === k) }));

  return (
    <div style={{ flex: 1, display: 'flex', minHeight: 0, position: 'relative' }}>
      <GlowBg a="rgba(52,214,196,0.09)" b="rgba(93,141,239,0.06)" />

      {/* sources column */}
      <div style={{ width: 296, flexShrink: 0, borderRight: '1px solid var(--line)', overflow: 'auto', padding: '20px 14px', position: 'relative', zIndex: 1, background: 'var(--bg-0)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <h2 className="ser" style={{ fontSize: 22, fontWeight: 500, margin: 0 }}>Influx</h2>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: 99, background: 'var(--teal)', animation: 'pulse 1.6s infinite' }} />
            <span className="mono" style={{ fontSize: 9, color: 'var(--teal)', letterSpacing: '.12em' }}>LIVE</span>
          </span>
        </div>
        <div className="mono" style={{ fontSize: 9, color: 'var(--text-faint)', marginBottom: 18, letterSpacing: '.06em' }}>{onCount} OF {sources.length} CONNECTED · THE INGESTION PLANE</div>

        {grouped.map(g => (
          <div key={g.key} style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 9, padding: '0 4px' }}>
              <span style={{ width: 7, height: 7, borderRadius: 2, background: g.color }} />
              <span className="mono" style={{ fontSize: 10, color: g.color, letterSpacing: '.1em' }}>{g.label.toUpperCase()}</span>
              <span className="mono" style={{ fontSize: 8.5, color: 'var(--text-faint)', marginLeft: 'auto' }}>{g.items.filter(s => s.on).length}/{g.items.length}</span>
            </div>
            <div style={{ display: 'grid', gap: 4 }}>
              {g.items.map(s => {
                const active = sel === s.id;
                const h = HEALTH[s.on ? s.health : 'off'];
                return (
                  <button key={s.id} onClick={() => setSel(s.id)} className="lift" style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 9, textAlign: 'left',
                    background: active ? 'var(--bg-3)' : 'var(--bg-1)',
                    border: '1px solid ' + (active ? 'var(--line-3)' : 'var(--line)'), opacity: s.on ? 1 : 0.5,
                  }}>
                    <span style={{ position: 'relative', flexShrink: 0 }}>
                      <span style={{ color: g.color, fontSize: 13 }}>{s.glyph}</span>
                    </span>
                    <span style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ fontSize: 12.5, color: active ? 'var(--text)' : 'var(--text-dim)', fontWeight: 500, display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</span>
                      <span className="mono" style={{ fontSize: 8.5, color: 'var(--text-faint)' }}>{s.cadence}</span>
                    </span>
                    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
                      <Ev score={s.ceiling.length > 2 ? s.ceiling.split('\u2013')[0] : s.ceiling} />
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ width: 6, height: 6, borderRadius: 99, background: h.c, animation: s.on && s.health === 'degraded' ? 'pulse 1.6s infinite' : 'none' }} />
                        <span className="mono" style={{ fontSize: 8, color: h.c }}>{s.on ? s.health.toUpperCase() : 'OFF'}</span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* inspector / pipeline */}
      <div style={{ flex: 1, overflow: 'auto', padding: '20px 26px', position: 'relative', zIndex: 1, minWidth: 0 }}>
        {/* entities strip */}
        <div style={{ display: 'flex', alignItems: 'stretch', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
          {D.INFLUX_ENTITIES.map(e => (
            <div key={e.label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 11px', borderRadius: 9, background: 'var(--bg-1)', border: '1px solid var(--line)', flex: '1 1 0', minWidth: 110 }}>
              <span style={{ width: 22, height: 22, borderRadius: 6, background: 'var(--teal-soft)', color: 'var(--teal)', display: 'grid', placeItems: 'center', fontSize: 11, flexShrink: 0 }}>{e.glyph}</span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 11.5, fontWeight: 600, whiteSpace: 'nowrap' }}>{e.label} <span style={{ color: 'var(--mint)' }}>+{e.today}</span></div>
                <div className="mono" style={{ fontSize: 8, color: 'var(--text-faint)' }}>{e.total} TOTAL</div>
              </div>
            </div>
          ))}
          <button onClick={() => nav({ tab: 'graph' })} className="mono lift" style={{ fontSize: 9, color: 'var(--teal)', border: '1px solid var(--teal)', borderRadius: 9, padding: '0 14px', letterSpacing: '.06em', flexShrink: 0 }}>◈ GRAPH</button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18, padding: '9px 13px', borderRadius: 9, background: 'var(--bg-0)', border: '1px solid var(--line)' }}>
          <span className="mono" style={{ fontSize: 8.5, color: 'var(--text-faint)', letterSpacing: '.08em', marginRight: 4 }}>PIPELINE</span>
          {D.PIPELINE.map((p, i) => (
            <React.Fragment key={p}>
              {i > 0 && <span style={{ color: 'var(--text-faint)', fontSize: 10 }}>→</span>}
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><span style={{ width: 5, height: 5, borderRadius: 99, background: 'var(--teal)' }} /><span style={{ fontSize: 11, color: 'var(--text-dim)' }}>{p}</span></span>
            </React.Fragment>
          ))}
          <span style={{ color: 'var(--text-faint)', fontSize: 10 }}>→</span>
          <span className="mono" style={{ fontSize: 10, color: 'var(--mint)', letterSpacing: '.06em' }}>KNOW</span>
        </div>
        {src && (
          <div className="fade-in" key={src.id}>
            <Label style={{ marginBottom: 12, color: store.color }}>{store.label.toUpperCase()} STORE · CONNECTOR</Label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 20 }}>
              <span style={{ width: 42, height: 42, borderRadius: 11, background: 'color-mix(in srgb,' + store.color + ' 14%, transparent)', color: store.color, display: 'grid', placeItems: 'center', fontSize: 19 }}>{src.glyph}</span>
              <div style={{ flex: 1 }}>
                <h1 className="ser" style={{ fontSize: 26, fontWeight: 500, margin: 0 }}>{src.name}</h1>
                <div className="mono" style={{ fontSize: 9.5, color: 'var(--text-faint)', marginTop: 2 }}>Source → Thread → Episode → Signal</div>
              </div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, border: '1px solid ' + HEALTH[src.on ? src.health : 'off'].c, borderRadius: 7, padding: '6px 10px' }}>
                <span style={{ width: 7, height: 7, borderRadius: 99, background: HEALTH[src.on ? src.health : 'off'].c }} />
                <span className="mono" style={{ fontSize: 9.5, color: HEALTH[src.on ? src.health : 'off'].c, letterSpacing: '.06em' }}>{HEALTH[src.on ? src.health : 'off'].label.toUpperCase()}</span>
              </span>
            </div>

            {/* stat row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 18 }}>
              {[['Evidence ceiling', src.ceiling, store.color], ['Cadence', src.cadence, 'var(--text)'], ['Episodes today', '+' + src.today, 'var(--mint)'], ['Watermark', src.watermark, 'var(--text)']].map(([k, v, c]) => (
                <div key={k} style={{ background: 'var(--bg-1)', border: '1px solid var(--line)', borderRadius: 10, padding: '12px 13px' }}>
                  <Label style={{ fontSize: 8, marginBottom: 6 }}>{k}</Label>
                  <div style={{ fontSize: 14.5, fontWeight: 600, color: c }}>{v}</div>
                </div>
              ))}
            </div>

            {src.note && <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.55, margin: '0 0 18px', maxWidth: 620 }}>{src.note}</p>}

            {(src.thread || src.episode) && (
              <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                {src.thread && <span style={chip()}>Thread = <b style={{ color: 'var(--text)' }}>{src.thread}</b></span>}
                {src.episode && <span style={chip()}>Episode = <b style={{ color: 'var(--text)' }}>{src.episode}</b></span>}
                <span style={chip()}>Routes → <b style={{ color: store.color }}>{store.routes}</b></span>
              </div>
            )}

            {/* X failover special panel */}
            {src.failover && (
              <div style={{ border: '1px solid var(--amber)', background: 'var(--amber-soft)', borderRadius: 12, padding: 16, marginBottom: 18 }}>
                <Label style={{ color: 'var(--amber)', marginBottom: 10 }}>⚠ 3-TIER FAILOVER · FAIL LOUDLY</Label>
                {[['Tier 1', 'Self-hosted Nitter (Docker + founder token)', 'down'], ['Tier 2', 'Public-instance pool via rotating proxy', 'active'], ['Tier 3', 'Paid X API — decision-critical feeds only', 'standby']].map(([t, d, st], i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderTop: i ? '1px solid var(--line)' : 'none' }}>
                    <span className="mono" style={{ fontSize: 9.5, color: 'var(--text-mute)', width: 42 }}>{t}</span>
                    <span style={{ fontSize: 12, color: 'var(--text-dim)', flex: 1 }}>{d}</span>
                    <span className="mono" style={{ fontSize: 8.5, color: st === 'active' ? 'var(--amber)' : st === 'down' ? 'var(--coral)' : 'var(--text-faint)', border: '1px solid currentColor', borderRadius: 4, padding: '2px 6px' }}>{st.toUpperCase()}</span>
                  </div>
                ))}
              </div>
            )}

            {/* six-clause contract */}
            <Label style={{ marginBottom: 12 }}>SIX-CLAUSE INGESTION CONTRACT</Label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
              {D.INGEST_CONTRACT.map(c => {
                const isDegradeClause = c.n === '06' && src.health === 'degraded';
                return (
                  <div key={c.n} style={{ display: 'flex', gap: 10, padding: '11px 12px', borderRadius: 10, background: 'var(--bg-1)', border: '1px solid ' + (isDegradeClause ? 'var(--amber)' : 'var(--line)') }}>
                    <span style={{ width: 18, height: 18, borderRadius: 99, flexShrink: 0, display: 'grid', placeItems: 'center', fontSize: 10, background: isDegradeClause ? 'var(--amber-soft)' : 'var(--mint-soft)', color: isDegradeClause ? 'var(--amber)' : 'var(--mint)' }}>{isDegradeClause ? '!' : '✓'}</span>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>{c.name}</div>
                      <div style={{ fontSize: 10.5, color: 'var(--text-mute)', lineHeight: 1.4, marginTop: 2 }}>{c.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function chip() {
  return { display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--text-mute)', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 6, padding: '5px 9px' };
}
window.InfluxScreen = InfluxScreen;
