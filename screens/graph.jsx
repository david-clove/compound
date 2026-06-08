/* ============================================================================
   COMPOUND — Knowledge Graph (the navigable KG for non-obvious insights)
   Hand-rolled force layout + pan/zoom + hover/select + path tracing.
   ========================================================================== */
const KIND = {
  position:      { c: 'var(--mint)',  label: 'Position' },
  account:       { c: 'var(--purple)',label: 'Account' },
  person:        { c: 'var(--blue)',  label: 'Person' },
  signal:        { c: 'var(--amber)', label: 'Signal' },
  thread:        { c: 'var(--teal)',  label: 'Thread' },
  source:        { c: 'var(--slate)', label: 'Source' },
  contradiction: { c: 'var(--coral)', label: 'Contradiction' },
};
const VB = { w: 900, h: 620 };

function GraphScreen({ state, nav }) {
  const { nodes, edges, insights } = D.KG;

  const [view, setView] = useState({ tx: 0, ty: 0, k: 1 });
  const [hover, setHover] = useState(null);
  const [sel, setSel] = useState(state.sub && state.sub.focus && nodes.find(n => n.id === state.sub.focus) ? state.sub.focus : null);
  const [hidden, setHidden] = useState(new Set());
  const [path, setPath] = useState(null); // array of node ids
  const drag = useRef(null);

  // adjacency
  const adj = useMemo(() => {
    const m = {};
    nodes.forEach(n => (m[n.id] = new Set()));
    edges.forEach(e => { m[e.s].add(e.t); m[e.t].add(e.s); });
    return m;
  }, []);

  // ---- force layout, computed synchronously (cheap for ~26 nodes) ----
  const P = useMemo(() => {
    const P = {};
    nodes.forEach((n, i) => {
      const ang = (i / nodes.length) * Math.PI * 2;
      const seed = { position: 0, contradiction: 60, signal: 130, account: 200, person: 250, thread: 300, source: 340 }[n.kind] || 0;
      const r = 90 + (i % 5) * 20;
      P[n.id] = {
        x: VB.w / 2 + Math.cos(ang + seed) * r,
        y: VB.h / 2 + Math.sin(ang + seed) * r * 0.7,
        vx: 0, vy: 0,
      };
    });
    let alpha = 1;
    const L = 84;
    for (let frame = 0; frame < 380 && alpha > 0.008; frame++) {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = P[nodes[i].id], b = P[nodes[j].id];
          let dx = a.x - b.x, dy = a.y - b.y;
          let d2 = dx * dx + dy * dy || 1;
          let d = Math.sqrt(d2);
          const f = (4400 / d2) * alpha;
          const fx = (dx / d) * f, fy = (dy / d) * f;
          a.vx += fx; a.vy += fy; b.vx -= fx; b.vy -= fy;
        }
      }
      edges.forEach(e => {
        const a = P[e.s], b = P[e.t];
        let dx = b.x - a.x, dy = b.y - a.y;
        let d = Math.sqrt(dx * dx + dy * dy) || 1;
        const f = ((d - L) / d) * 0.07 * alpha;
        const fx = dx * f, fy = dy * f;
        a.vx += fx; a.vy += fy; b.vx -= fx; b.vy -= fy;
      });
      nodes.forEach(n => {
        const p = P[n.id];
        p.vx += (VB.w / 2 - p.x) * 0.012 * alpha;
        p.vy += (VB.h / 2 - p.y) * 0.014 * alpha;
        p.vx *= 0.84; p.vy *= 0.84;
        p.x += p.vx; p.y += p.vy;
      });
      alpha *= 0.985;
    }
    return P;
  }, []);

  // highlight set
  const focusId = hover || sel;
  const pathSet = path ? new Set(path) : null;
  const pathEdges = path ? new Set(path.slice(0, -1).map((id, i) => [id, path[i + 1]].sort().join('|'))) : null;
  const neigh = focusId ? new Set([focusId, ...adj[focusId]]) : null;

  const visible = id => !hidden.has(nodes.find(n => n.id === id).kind);

  const nodeOpacity = (n) => {
    if (!visible(n.id)) return 0.06;
    if (pathSet) return pathSet.has(n.id) ? 1 : 0.12;
    if (neigh) return neigh.has(n.id) ? 1 : 0.16;
    return 1;
  };
  const edgeState = (e) => {
    if (!visible(e.s) || !visible(e.t)) return 'hide';
    const key = [e.s, e.t].sort().join('|');
    if (pathEdges) return pathEdges.has(key) ? 'path' : 'dim';
    if (neigh) return (neigh.has(e.s) && neigh.has(e.t)) ? 'on' : 'dim';
    return 'base';
  };

  // pan / zoom
  const onWheel = (ev) => {
    ev.preventDefault();
    const dk = ev.deltaY < 0 ? 1.12 : 0.89;
    setView(v => ({ ...v, k: Math.min(2.6, Math.max(0.45, v.k * dk)) }));
  };
  const onDown = (ev) => { drag.current = { x: ev.clientX, y: ev.clientY, tx: view.tx, ty: view.ty }; };
  const onMove = (ev) => {
    if (!drag.current) return;
    setView(v => ({ ...v, tx: drag.current.tx + (ev.clientX - drag.current.x), ty: drag.current.ty + (ev.clientY - drag.current.y) }));
  };
  const onUp = () => { drag.current = null; };

  const selNode = sel ? nodes.find(n => n.id === sel) : null;
  const selConns = sel ? edges.filter(e => e.s === sel || e.t === sel).map(e => ({ other: e.s === sel ? e.t : e.s, kind: e.kind })) : [];

  return (
    <div style={{ flex: 1, display: 'flex', minHeight: 0, position: 'relative' }}>
      <GlowBg a="rgba(52,214,196,0.08)" b="rgba(164,129,240,0.06)" />

      {/* left rail: insights + legend */}
      <div style={{ width: 252, flexShrink: 0, borderRight: '1px solid var(--line)', overflow: 'auto', padding: 18, position: 'relative', zIndex: 1, background: 'var(--bg-0)' }}>
        <h2 className="ser" style={{ fontSize: 20, fontWeight: 500, margin: '0 0 3px' }}>Knowledge Graph</h2>
        <div className="mono" style={{ fontSize: 9, color: 'var(--text-faint)', marginBottom: 18, letterSpacing: '.06em' }}>{nodes.length} NODES · {edges.length} EDGES</div>

        <Label style={{ color: 'var(--mint)', marginBottom: 10 }}>◈ DISCOVERED INSIGHTS</Label>
        <div style={{ display: 'grid', gap: 9, marginBottom: 22 }}>
          {insights.map((ins, i) => {
            const on = path && path.join() === ins.path.join();
            const c = ins.kind === 'contradiction' ? 'var(--coral)' : ins.kind === 'bridge' ? 'var(--teal)' : 'var(--mint)';
            return (
              <button key={i} onClick={() => { setPath(on ? null : ins.path); setSel(on ? null : ins.path[ins.path.length - 1]); }} className="lift" style={{
                textAlign: 'left', padding: 12, borderRadius: 10, background: on ? 'var(--bg-3)' : 'var(--bg-1)',
                border: '1px solid ' + (on ? c : 'var(--line)'),
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: 2, background: c }} />
                  <span className="mono" style={{ fontSize: 8.5, color: c, letterSpacing: '.08em' }}>{ins.kind.toUpperCase()}</span>
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.35, marginBottom: 5 }}>{ins.title}</div>
                <div style={{ fontSize: 11, color: 'var(--text-mute)', lineHeight: 1.45 }}>{ins.body}</div>
                {on && <div className="mono" style={{ fontSize: 8.5, color: c, marginTop: 8, letterSpacing: '.06em' }}>● TRACING PATH · CLICK TO CLEAR</div>}
              </button>
            );
          })}
        </div>

        <Label style={{ marginBottom: 10 }}>FILTER NODES</Label>
        <div style={{ display: 'grid', gap: 4 }}>
          {Object.entries(KIND).map(([k, v]) => {
            const off = hidden.has(k);
            const n = nodes.filter(x => x.kind === k).length;
            return (
              <button key={k} onClick={() => setHidden(s => { const m = new Set(s); m.has(k) ? m.delete(k) : m.add(k); return m; })} className="lift" style={{
                display: 'flex', alignItems: 'center', gap: 9, padding: '6px 8px', borderRadius: 7, opacity: off ? 0.4 : 1,
              }}>
                <span style={{ width: 9, height: 9, borderRadius: k === 'contradiction' ? 2 : 99, background: v.c, transform: k === 'contradiction' ? 'rotate(45deg)' : 'none' }} />
                <span style={{ fontSize: 12, color: 'var(--text-dim)', flex: 1, textAlign: 'left' }}>{v.label}</span>
                <span className="mono" style={{ fontSize: 9.5, color: 'var(--text-faint)' }}>{off ? '○' : n}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* graph canvas */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', zIndex: 1 }}
        onWheel={onWheel} onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}>
        <svg width="100%" height="100%" viewBox={`0 0 ${VB.w} ${VB.h}`} preserveAspectRatio="xMidYMid meet"
          style={{ cursor: drag.current ? 'grabbing' : 'grab', display: 'block' }}>
          <g transform={`translate(${view.tx} ${view.ty}) scale(${view.k})`} transform-origin="center">
            {P && edges.map((e, i) => {
              const a = P[e.s], b = P[e.t]; if (!a || !b) return null;
              const st = edgeState(e); if (st === 'hide') return null;
              let stroke = 'rgba(255,255,255,0.22)', w = 1.1, dash = null, op = 0.7;
              if (e.kind === 'contradict') { stroke = 'var(--coral)'; dash = '4 4'; op = 0.8; }
              else if (e.kind === 'weak') { stroke = 'rgba(255,255,255,0.14)', op = 0.5; }
              if (st === 'path') { stroke = 'var(--teal)'; w = 2.4; op = 1; dash = null; }
              else if (st === 'on') { op = 0.9; w = 1.6; }
              else if (st === 'dim') { op = 0.06; }
              return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={stroke} strokeWidth={w} strokeDasharray={dash} opacity={op} />;
            })}
            {P && nodes.map(n => {
              const p = P[n.id]; if (!p) return null;
              const k = KIND[n.kind];
              const r = n.size / 2;
              const op = nodeOpacity(n);
              const isSel = sel === n.id;
              const isContra = n.kind === 'contradiction';
              return (
                <g key={n.id} opacity={op} style={{ cursor: 'pointer', transition: 'opacity .2s' }}
                  onMouseEnter={() => setHover(n.id)} onMouseLeave={() => setHover(null)}
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => { e.stopPropagation(); setSel(isSel ? null : n.id); setPath(null); }}>
                  {(isSel || hover === n.id) && <circle cx={p.x} cy={p.y} r={r + 7} fill="none" stroke={k.c} strokeWidth="1.2" opacity="0.5" />}
                  {isContra
                    ? <rect x={p.x - r} y={p.y - r} width={r * 2} height={r * 2} rx="3" fill="var(--bg)" stroke={k.c} strokeWidth="2" transform={`rotate(45 ${p.x} ${p.y})`} />
                    : <circle cx={p.x} cy={p.y} r={r} fill={n.kind === 'position' ? k.c : 'var(--bg-2)'} stroke={k.c} strokeWidth={n.kind === 'position' ? 0 : 2} />}
                  <text x={p.x + r + 6} y={p.y + 3.5} fontSize={n.size > 18 ? 11 : 9.5} fill={op > 0.5 ? 'var(--text-dim)' : 'var(--text-faint)'} fontFamily="var(--sans)" style={{ pointerEvents: 'none', fontWeight: n.size > 20 ? 600 : 500 }}>{n.label}</text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* node count chip */}
        <div className="mono" style={{ position: 'absolute', left: 16, bottom: 16, fontSize: 10, color: 'var(--text-mute)', background: 'var(--bg-1)', border: '1px solid var(--line)', borderRadius: 8, padding: '8px 12px', letterSpacing: '.06em' }}>
          {nodes.length - hidden.size * 0} NODES · {edges.length} EDGES{path ? ' · TRACING' : ''}
        </div>

        {/* zoom controls */}
        <div style={{ position: 'absolute', right: 16, bottom: 16, display: 'grid', gap: 6 }}>
          {[['+', 1.2], ['−', 0.83], ['⊙', 0]].map(([t, m], i) => (
            <button key={i} onClick={() => m ? setView(v => ({ ...v, k: Math.min(2.6, Math.max(0.45, v.k * m)) })) : setView({ tx: 0, ty: 0, k: 1 })} className="lift" style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--bg-1)', border: '1px solid var(--line-2)', color: 'var(--text-dim)', fontSize: 14 }}>{t}</button>
          ))}
        </div>

        <div className="mono" style={{ position: 'absolute', left: 16, top: 16, fontSize: 9, color: 'var(--text-faint)', letterSpacing: '.06em' }}>DRAG TO PAN · SCROLL TO ZOOM · CLICK A NODE</div>
      </div>

      {/* inspector */}
      {selNode && (
        <div className="fade-in" style={{ width: 296, flexShrink: 0, borderLeft: '1px solid var(--line)', overflow: 'auto', padding: 20, position: 'relative', zIndex: 1, background: 'var(--bg-0)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <span className="mono" style={{ fontSize: 9, color: KIND[selNode.kind].c, border: '1px solid ' + KIND[selNode.kind].c, borderRadius: 4, padding: '2px 7px', letterSpacing: '.08em' }}>{KIND[selNode.kind].label.toUpperCase()}</span>
            <button onClick={() => setSel(null)} className="lift" style={{ color: 'var(--text-mute)', fontSize: 14 }}>✕</button>
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 4px', lineHeight: 1.25 }}>{selNode.label}</h3>
          <div className="mono" style={{ fontSize: 10, color: 'var(--text-mute)', marginBottom: 18 }}>{selNode.sub}</div>

          <Label style={{ marginBottom: 10 }}>CONNECTIONS · {selConns.length}</Label>
          <div style={{ display: 'grid', gap: 5, marginBottom: 20 }}>
            {selConns.map((conn, i) => {
              const o = nodes.find(n => n.id === conn.other);
              return (
                <button key={i} onClick={() => { setSel(o.id); setPath(null); }} className="lift" style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '8px 10px', borderRadius: 8, background: 'var(--bg-1)', border: '1px solid var(--line)', textAlign: 'left' }}>
                  <span style={{ width: 8, height: 8, borderRadius: o.kind === 'contradiction' ? 2 : 99, background: KIND[o.kind].c, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: 'var(--text-dim)', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{o.label}</span>
                  {conn.kind === 'contradict' && <span className="mono" style={{ fontSize: 8, color: 'var(--coral)' }}>✕ CONFLICT</span>}
                  {conn.kind === 'weak' && <span className="mono" style={{ fontSize: 8, color: 'var(--text-faint)' }}>WEAK</span>}
                </button>
              );
            })}
          </div>

          {selNode.kind === 'position' && (
            <button onClick={() => nav({ tab: 'memory' })} className="mono lift" style={{ width: '100%', fontSize: 10, color: 'var(--mint)', border: '1px solid var(--mint)', borderRadius: 8, padding: '10px', letterSpacing: '.06em', background: 'var(--mint-soft)' }}>OPEN IN COMPANY MEMORY ↗</button>
          )}
          {selNode.kind === 'account' && (
            <button onClick={() => nav({ tab: 'accounts' })} className="mono lift" style={{ width: '100%', fontSize: 10, color: 'var(--purple)', border: '1px solid var(--purple)', borderRadius: 8, padding: '10px', letterSpacing: '.06em', background: 'var(--purple-soft)' }}>OPEN ACCOUNT ↗</button>
          )}
          {selNode.kind === 'signal' && (
            <button onClick={() => nav({ tab: 'signals' })} className="mono lift" style={{ width: '100%', fontSize: 10, color: 'var(--amber)', border: '1px solid var(--amber)', borderRadius: 8, padding: '10px', letterSpacing: '.06em', background: 'var(--amber-soft)' }}>OPEN IN SIGNALS ↗</button>
          )}
        </div>
      )}
    </div>
  );
}
window.GraphScreen = GraphScreen;
