/* ============================================================================
   COMPOUND — shared primitives
   ========================================================================== */
const { useState, useEffect, useRef, useMemo, useCallback } = React;
const D = window.DATA;

const cx = (...a) => a.filter(Boolean).join(' ');

/* --- Evidence badge (E1..E5) ---------------------------------------------- */
function Ev({ score, dim }) {
  const c = D.EVIDENCE[score]?.color || 'var(--faint)';
  return (
    <span className="mono" style={{
      fontSize: 9.5, fontWeight: 600, color: c, border: `1px solid ${c}`,
      borderRadius: 4, padding: '1px 4px', lineHeight: 1.2, letterSpacing: '.02em',
      opacity: dim ? 0.5 : 1, background: 'transparent', whiteSpace: 'nowrap',
    }}>{score}</span>
  );
}

/* --- Signal type chip ------------------------------------------------------ */
function SignalChip({ type, mini }) {
  const t = D.SIGNAL_TYPES[type];
  if (!t) return null;
  return (
    <span className="mono" style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      fontSize: mini ? 9 : 9.5, fontWeight: 600, color: t.color,
      background: 'transparent', border: `1px solid ${t.color}`,
      borderRadius: 4, padding: mini ? '1px 5px' : '2px 6px', letterSpacing: '.08em',
      opacity: 0.92,
    }}>
      <span style={{ fontFamily: 'var(--sans)', fontSize: mini ? 9 : 10 }}>{t.glyph}</span>
      {t.label}
    </span>
  );
}

/* --- 2-letter avatar tile -------------------------------------------------- */
function Avatar({ text, color, size = 28 }) {
  return (
    <span style={{
      width: size, height: size, borderRadius: 7, flexShrink: 0,
      display: 'grid', placeItems: 'center', fontSize: size * 0.36, fontWeight: 600,
      background: 'color-mix(in srgb, ' + (color || 'var(--slate)') + ' 16%, transparent)',
      color: color || 'var(--slate)', fontFamily: 'var(--mono)', letterSpacing: '.02em',
    }}>{text}</span>
  );
}

/* --- Segmented ICP-fit bar ------------------------------------------------- */
function FitBar({ value, segs = 14, color = 'var(--mint)', track }) {
  const filled = Math.round(value * segs);
  return (
    <span style={{ display: 'inline-flex', gap: 3, alignItems: 'center' }}>
      {Array.from({ length: segs }).map((_, i) => (
        <span key={i} style={{
          width: 7, height: 7, borderRadius: 2,
          background: i < filled ? color : (track || 'rgba(255,255,255,0.07)'),
        }} />
      ))}
    </span>
  );
}

/* --- Smooth progress bar --------------------------------------------------- */
function Bar({ value, color = 'var(--mint)', h = 5, track = 'rgba(255,255,255,0.06)' }) {
  return (
    <span style={{ display: 'block', width: '100%', height: h, borderRadius: h, background: track, overflow: 'hidden' }}>
      <span style={{ display: 'block', height: '100%', width: (value * 100) + '%', background: color, borderRadius: h, transition: 'width .5s ease' }} />
    </span>
  );
}

/* --- Sparkline ------------------------------------------------------------- */
function Spark({ data, color = 'var(--mint)', w = 96, h = 26 }) {
  const min = Math.min(...data), max = Math.max(...data);
  const span = max - min || 1;
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * w,
    h - 3 - ((v - min) / span) * (h - 6),
  ]);
  const dpath = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  return (
    <svg width={w} height={h} style={{ display: 'block', overflow: 'visible' }}>
      <path d={dpath} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="2.5" fill={color} />
    </svg>
  );
}

/* --- mono section label ---------------------------------------------------- */
function Label({ children, color = 'var(--text-mute)', style }) {
  return <div className="mono" style={{ fontSize: 10, color, letterSpacing: '.12em', ...style }}>{children}</div>;
}

/* --- mac window chrome bar ------------------------------------------------- */
function Chrome({ children, right }) {
  return (
    <div style={{
      height: 38, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 14,
      padding: '0 16px', borderBottom: '1px solid var(--line)',
      background: 'linear-gradient(180deg, #16191e, #101317)',
    }}>
      <div style={{ display: 'flex', gap: 8 }}>
        {['#f0605f', '#f5bd4f', '#61c554'].map(c => (
          <span key={c} style={{ width: 12, height: 12, borderRadius: 99, background: c }} />
        ))}
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>{children}</div>
      {right}
    </div>
  );
}

/* --- evidence distribution rows -------------------------------------------- */
function EvDistribution({ dist }) {
  return (
    <div style={{ display: 'grid', gap: 7 }}>
      {dist.map(d => {
        const c = D.EVIDENCE[d.k].color;
        return (
          <div key={d.k} style={{ display: 'grid', gridTemplateColumns: '22px 1fr 34px', alignItems: 'center', gap: 8 }}>
            <span className="mono" style={{ fontSize: 9.5, color: c }}>{d.k}</span>
            <Bar value={d.pct} color={c} h={6} />
            <span className="mono" style={{ fontSize: 9.5, color: 'var(--text-mute)', textAlign: 'right' }}>{Math.round(d.pct * 100)}%</span>
          </div>
        );
      })}
    </div>
  );
}

/* --- The live status ticker (bottom bar) ----------------------------------- */
function StatusBar() {
  const items = D.TICKER;
  const dot = k => k === 'warn' ? 'var(--amber)' : k === 'info' ? 'var(--blue)' : 'var(--mint)';
  return (
    <div style={{
      height: 34, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 22,
      padding: '0 16px', borderTop: '1px solid var(--line)', background: 'var(--bg-0)',
      overflow: 'hidden', whiteSpace: 'nowrap',
    }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
        <span style={{ width: 7, height: 7, borderRadius: 99, background: 'var(--mint)', animation: 'pulse 2s infinite' }} />
        <span className="mono" style={{ fontSize: 10, color: 'var(--mint)', letterSpacing: '.14em' }}>LIVE</span>
        <span className="mono" style={{ fontSize: 9, color: 'var(--text-faint)', border: '1px solid var(--line-2)', borderRadius: 3, padding: '1px 4px' }}>CP</span>
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 22, overflow: 'hidden', maskImage: 'linear-gradient(90deg,#000 92%,transparent)' }}>
        {items.map((it, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <span className="mono" style={{ fontSize: 10, color: 'var(--text-faint)' }}>{it.t}</span>
            <span style={{ width: 6, height: 6, borderRadius: 99, background: dot(it.kind) }} />
            <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>{it.text}</span>
            <span className="mono" style={{ fontSize: 9, color: 'var(--text-faint)', border: '1px solid var(--line)', borderRadius: 3, padding: '1px 5px', letterSpacing: '.08em' }}>{it.tag}</span>
            {i < items.length - 1 && <span style={{ color: 'var(--text-faint)' }}>·</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

/* --- Edge glow background (subtle green/violet) ---------------------------- */
function GlowBg({ a = 'rgba(67,220,160,0.10)', b = 'rgba(164,129,240,0.07)' }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
      background: `radial-gradient(70% 55% at 12% 108%, ${a}, transparent 60%),
                   radial-gradient(60% 50% at 96% 4%, ${b}, transparent 55%)`,
    }} />
  );
}

/* --- Pill button / tab ----------------------------------------------------- */
function Tab({ active, onClick, children }) {
  return (
    <button onClick={onClick} className="mono lift" style={{
      fontSize: 10.5, letterSpacing: '.1em', padding: '6px 11px', borderRadius: 7,
      color: active ? 'var(--text)' : 'var(--text-mute)',
      background: active ? 'var(--bg-3)' : 'transparent',
      border: '1px solid ' + (active ? 'var(--line-2)' : 'transparent'),
    }}>{children}</button>
  );
}

/* --- AUTO machine-tag: marks autonomous / systematized output ------------- */
function AutoTag({ label = 'AUTO', title }) {
  return (
    <span className="mono" title={title || 'Handled autonomously by Compound'} style={{
      display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 8.5, fontWeight: 600,
      color: 'var(--mint)', background: 'var(--mint-soft)', border: '1px solid var(--border-green, rgba(52,211,153,0.32))',
      borderRadius: 4, padding: '2px 6px', letterSpacing: '.1em', whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 5, height: 5, borderRadius: 99, background: 'var(--mint)' }} />{label}
    </span>
  );
}

/* --- DECIDE tag: the one human verb. Always amber. ------------------------- */
function DecideTag({ label = 'DECIDE', title }) {
  return (
    <span className="mono" title={title || 'Requires your judgment'} style={{
      display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 8.5, fontWeight: 600,
      color: 'var(--amber)', background: 'var(--amber-soft)', border: '1px solid rgba(232,145,58,0.42)',
      borderRadius: 4, padding: '2px 6px', letterSpacing: '.1em', whiteSpace: 'nowrap',
    }}>◬ {label}</span>
  );
}

const DQ_KIND = {
  drift:         { c: 'var(--amber)', glyph: '◬', label: 'Drift' },
  align:         { c: 'var(--amber)', glyph: '⊿', label: 'Alignment' },
  review:        { c: 'var(--mint)',  glyph: '◉', label: 'Review' },
  verify:        { c: 'var(--blue)',  glyph: '⌖', label: 'Verify' },
  contradiction: { c: 'var(--coral)', glyph: '⤬', label: 'Contradiction' },
};

/* --- The Decide Queue overlay: every human-gate, portfolio-wide ------------ */
function DecideQueue({ open, onClose, nav, currentVenture }) {
  if (!open) return null;
  const Q = D.DECIDE_QUEUE;
  const byV = {};
  Q.forEach(it => { (byV[it.venture] = byV[it.venture] || []).push(it); });
  // current venture first
  const order = Object.keys(byV).sort((a, b) => (a === currentVenture ? -1 : b === currentVenture ? 1 : 0));

  const go = (it) => { nav({ view: 'project', venture: it.venture, tab: it.tab, sub: null }); onClose(); };

  return (
    <div className="fade-in" style={{ position: 'fixed', inset: 0, zIndex: 60, display: 'flex', justifyContent: 'flex-end' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(3,5,4,0.62)', backdropFilter: 'blur(2px)' }} />
      <div style={{
        position: 'relative', width: 432, maxWidth: '92vw', height: '100%', background: 'var(--bg-0)',
        borderLeft: '1px solid var(--line-2)', boxShadow: '-30px 0 60px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column',
        animation: 'slideIn .26s cubic-bezier(.16,1,.3,1) both',
      }}>
        <style>{`@keyframes slideIn{from{transform:translateX(24px);opacity:.4}to{transform:none;opacity:1}}`}</style>
        {/* header */}
        <div style={{ padding: '20px 22px 16px', borderBottom: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 26, height: 26, borderRadius: 7, background: 'var(--amber-soft)', color: 'var(--amber)', display: 'grid', placeItems: 'center', fontSize: 13 }}>◬</span>
            <div style={{ flex: 1 }}>
              <div className="disp" style={{ fontSize: 17, fontWeight: 700 }}>Decide</div>
              <div className="mono" style={{ fontSize: 9, color: 'var(--text-faint)', letterSpacing: '.08em' }}>YOUR ONE VERB · {Q.length} OPEN ACROSS {order.length} VENTURES</div>
            </div>
            <button onClick={onClose} className="lift" style={{ color: 'var(--text-mute)', fontSize: 16, padding: '2px 6px', borderRadius: 6 }}>✕</button>
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-mute)', lineHeight: 1.5, margin: '12px 0 0' }}>
            Compound did the work overnight. These are the items only you can resolve.
          </p>
        </div>
        {/* list */}
        <div style={{ flex: 1, overflow: 'auto', padding: '6px 16px 24px' }}>
          {order.map(vid => {
            const v = D.VENTURES.find(x => x.id === vid);
            return (
              <div key={vid} style={{ marginTop: 18 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 6px 10px' }}>
                  <span style={{ width: 7, height: 7, borderRadius: 2, background: v.color }} />
                  <span className="mono" style={{ fontSize: 10, color: 'var(--text-dim)', letterSpacing: '.08em' }}>{v.name.toUpperCase()}</span>
                  {vid === currentVenture && <span className="mono" style={{ fontSize: 8, color: 'var(--mint)', border: '1px solid var(--mint)', borderRadius: 3, padding: '0 4px' }}>HERE</span>}
                  <span className="mono" style={{ fontSize: 9, color: 'var(--text-faint)', marginLeft: 'auto' }}>{byV[vid].length}</span>
                </div>
                <div style={{ display: 'grid', gap: 8 }}>
                  {byV[vid].map(it => {
                    const k = DQ_KIND[it.kind];
                    return (
                      <button key={it.id} onClick={() => go(it)} className="lift" style={{
                        textAlign: 'left', padding: 14, borderRadius: 11, background: 'var(--bg-1)',
                        border: '1px solid var(--line)', borderLeft: '2px solid ' + k.c,
                      }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-2)'; e.currentTarget.style.borderColor = 'var(--line-2)'; e.currentTarget.style.borderLeftColor = k.c; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-1)'; e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.borderLeftColor = k.c; }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
                          <span className="mono" style={{ fontSize: 8.5, color: k.c, border: '1px solid ' + k.c, borderRadius: 4, padding: '1px 6px', letterSpacing: '.06em' }}>{k.label.toUpperCase()}</span>
                          {it.ev && <Ev score={it.ev} />}
                          <span className="mono" style={{ fontSize: 9, color: 'var(--text-faint)', marginLeft: 'auto' }}>{it.age}</span>
                        </div>
                        <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text)', marginBottom: 5 }}>{it.title}</div>
                        <div style={{ fontSize: 11.5, color: 'var(--text-mute)', lineHeight: 1.45, marginBottom: 10 }}>{it.detail}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span className="mono" style={{ fontSize: 9, color: 'var(--amber)', letterSpacing: '.04em' }}>{it.verb}</span>
                          <span style={{ marginLeft: 'auto', color: 'var(--text-faint)', fontSize: 11 }}>→</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* --- Division panel: the slide thesis, tied to live counts ----------------- */
function DivisionPanel({ compact }) {
  const dv = D.DIVISION;
  const Col = ({ side, data, accent, tag, foot }) => (
    <div style={{ flex: 1, background: 'var(--bg-1)', border: '1px solid ' + (side === 'founder' ? 'rgba(232,145,58,0.30)' : 'var(--line)'), borderRadius: 'var(--r)', padding: compact ? 16 : 20, position: 'relative', overflow: 'hidden' }}>
      {side === 'founder' && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, var(--amber), transparent)', opacity: 0.5 }} />}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        {side === 'founder' ? <DecideTag label="YOU HANDLE" /> : <AutoTag label="COMPOUND HANDLES" />}
      </div>
      <div style={{ display: 'grid', gap: compact ? 8 : 10 }}>
        {data.items.map((it, i) => (
          <div key={i} style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
            <span style={{ width: 5, height: 5, borderRadius: 99, background: accent, marginTop: 6, flexShrink: 0 }} />
            <span style={{ fontSize: compact ? 12.5 : 13.5, color: 'var(--text-dim)', lineHeight: 1.35 }}>{it}</span>
          </div>
        ))}
      </div>
      <div className="ser" style={{ fontStyle: 'italic', fontSize: 12.5, color: 'var(--text-mute)', marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--line)' }}>{foot}</div>
    </div>
  );
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'stretch' }}>
      <Col side="compound" data={dv.compound} accent="var(--mint)" foot={dv.compound.foot} />
      <Col side="founder" data={dv.founder} accent="var(--amber)" foot={dv.founder.foot} />
    </div>
  );
}

Object.assign(window, {
  cx, Ev, SignalChip, Avatar, FitBar, Bar, Spark, Label, Chrome,
  EvDistribution, StatusBar, GlowBg, Tab, AutoTag, DecideTag, DecideQueue, DivisionPanel,
});
