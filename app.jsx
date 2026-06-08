/* ============================================================================
   COMPOUND — app shell + router
   ========================================================================== */
const NAV = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'signals',   label: 'Signals'   },
  { id: 'accounts',  label: 'Accounts'  },
  { id: 'agents',    label: 'Multi-Agent' },
  { id: 'alignment', label: 'Alignment' },
  { id: 'memory',    label: 'Memory'    },
  { id: 'triage',    label: 'Triage'    },
  { id: 'graph',     label: 'Knowledge Graph' },
  { id: 'influx',    label: 'Influx'    },
];

/* minimal line icons */
function NavIcon({ id, c }) {
  const p = { fill: 'none', stroke: c, strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const map = {
    dashboard: <g {...p}><rect x="3" y="3" width="7" height="7" rx="1.4"/><rect x="12" y="3" width="7" height="4.5" rx="1.4"/><rect x="3" y="13" width="7" height="4.5" rx="1.4"/><rect x="12" y="10.5" width="7" height="7" rx="1.4"/></g>,
    signals: <g {...p}><path d="M11 2 4 12h6l-1 8 8-11h-6z"/></g>,
    accounts: <g {...p}><rect x="4" y="3" width="9" height="16" rx="1.4"/><path d="M13 8h5v11h-5"/><path d="M7 7h3M7 10h3M7 13h3"/></g>,
    memory: <g {...p}><path d="M11 3v16"/><circle cx="6" cy="6" r="2"/><circle cx="6" cy="15" r="2"/><circle cx="16" cy="10" r="2"/><path d="M8 6h2a2 2 0 0 1 2 2M8 15h2a2 2 0 0 0 2-2"/></g>,
    triage: <g {...p}><rect x="4" y="3" width="14" height="16" rx="1.6"/><path d="M7 8h8M7 11h8M7 14h5"/></g>,
    graph: <g {...p}><circle cx="6" cy="6" r="2.2"/><circle cx="16" cy="7" r="2.2"/><circle cx="9" cy="16" r="2.2"/><circle cx="17" cy="15" r="1.6"/><path d="M8 7l6 .5M8 8l1 6M15 9l-5 6M11 16h4"/></g>,
    influx: <g {...p}><path d="M4 5h5M4 11h5M4 17h5"/><circle cx="16" cy="11" r="3.2"/><path d="M9 5c5 0 4 6 4 6M9 17c5 0 4-6 4-6"/></g>,
    agents: <g {...p}><circle cx="11" cy="5" r="2.4"/><circle cx="5.5" cy="15" r="2.4"/><circle cx="16.5" cy="15" r="2.4"/><path d="M11 7.4 6.5 13M11 7.4 15.5 13M8 15h6"/></g>,
    alignment: <g {...p}><path d="M11 3v16"/><path d="M6 8H3.5M6 8a2.5 2.5 0 0 1-5 0M6 8a2.5 2.5 0 0 0-5 0"/><circle cx="16" cy="13" r="2.3"/><path d="M16 3v7.7M16 15.3V19"/></g>,
  };
  return <svg width="20" height="20" viewBox="0 0 22 22">{map[id]}</svg>;
}

function Sidebar({ venture, tab, nav }) {
  return (
    <div style={{
      width: 196, flexShrink: 0, borderRight: '1px solid var(--line)',
      background: 'var(--bg-0)', display: 'flex', flexDirection: 'column',
      padding: '14px 12px', gap: 4, position: 'relative', zIndex: 2,
    }}>
      <button onClick={() => nav({ view: 'portfolio' })} className="lift" style={{
        display: 'flex', alignItems: 'center', gap: 9, padding: '7px 8px', borderRadius: 8,
        marginBottom: 6, textAlign: 'left',
      }}>
        <span style={{ width: 22, height: 22, borderRadius: 6, background: 'var(--mint-soft)', color: 'var(--mint)', display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 700 }}>+</span>
        <span>
          <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em' }}>Compound</span>
          <span className="mono" style={{ display: 'block', fontSize: 8.5, color: 'var(--text-faint)', letterSpacing: '.12em', marginTop: 1 }}>STUDIO INTELLIGENCE</span>
        </span>
      </button>

      <button onClick={() => nav({ view: 'portfolio' })} className="mono lift" style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '6px 9px', borderRadius: 7,
        fontSize: 10, letterSpacing: '.06em', color: 'var(--text-mute)', marginBottom: 8,
      }}>← ALL VENTURES</button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 9px 10px' }}>
        <span style={{ width: 8, height: 8, borderRadius: 3, background: venture.color }} />
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>{venture.name}</div>
          <div className="mono" style={{ fontSize: 8.5, color: 'var(--text-faint)' }}>{venture.domain}</div>
        </div>
      </div>

      {NAV.map(n => {
        const active = tab === n.id;
        return (
          <button key={n.id} onClick={() => nav({ tab: n.id, sub: null })} className="lift" style={{
            display: 'flex', alignItems: 'center', gap: 11, padding: '8px 9px', borderRadius: 8,
            textAlign: 'left', color: active ? 'var(--text)' : 'var(--text-mute)',
            background: active ? 'var(--bg-2)' : 'transparent',
            borderLeft: '2px solid ' + (active ? venture.color : 'transparent'),
          }}>
            <NavIcon id={n.id} c={active ? venture.color : 'var(--text-mute)'} />
            <span style={{ fontSize: 13, fontWeight: active ? 600 : 500 }}>{n.label}</span>
            {n.id === 'memory' && venture.drift > 0 &&
              <span style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: 99, background: 'var(--amber)' }} />}
          </button>
        );
      })}

      <div style={{ marginTop: 'auto', borderTop: '1px solid var(--line)', paddingTop: 12 }}>
        <Label style={{ marginBottom: 8, padding: '0 4px' }}>NIGHTLY LOOP · CYCLE #348</Label>
        <div style={{ display: 'flex', gap: 4, padding: '0 4px' }}>
          {D.LOOP.map(s => (
            <div key={s.n} title={s.name} style={{ flex: 1, height: 4, borderRadius: 4, background: s.auto ? 'var(--mint-2)' : 'var(--amber)', opacity: s.auto ? 0.85 : 1 }} />
          ))}
        </div>
        <div className="mono" style={{ fontSize: 8.5, color: 'var(--text-faint)', padding: '7px 4px 0', letterSpacing: '.06em' }}>
          5 AUTO · 1 <span style={{ color: 'var(--amber)' }}>DECIDE</span>
        </div>
      </div>
    </div>
  );
}

function Breadcrumb({ crumbs }) {
  return (
    <div className="mono" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, letterSpacing: '.05em' }}>
      {crumbs.map((c, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          {i > 0 && <span style={{ color: 'var(--text-faint)' }}>›</span>}
          {c.onClick
            ? <button onClick={c.onClick} className="lift" style={{ color: 'var(--text-mute)', letterSpacing: '.05em', fontFamily: 'var(--mono)', fontSize: 11 }}>{c.label}</button>
            : <span style={{ color: i === crumbs.length - 1 ? 'var(--text)' : 'var(--text-mute)' }}>{c.label}</span>}
        </span>
      ))}
    </div>
  );
}

function App() {
  const [state, setState] = useState({ view: 'portfolio', venture: 'lanterna', tab: 'dashboard', sub: null });
  const nav = useCallback((p) => setState(s => ({ ...s, ...p })), []);
  const venture = D.VENTURES.find(v => v.id === state.venture) || D.VENTURES[0];

  // crumbs
  let crumbs;
  if (state.view === 'portfolio') {
    crumbs = [{ label: 'COMPOUND' }, { label: 'PORTFOLIO' }];
  } else {
    const navLabel = NAV.find(n => n.id === state.tab)?.label || state.tab;
    crumbs = [
      { label: 'COMPOUND', onClick: () => nav({ view: 'portfolio' }) },
      { label: venture.name.toUpperCase(), onClick: () => nav({ tab: 'dashboard', sub: null }) },
      { label: navLabel.toUpperCase() },
    ];
    if (state.sub && state.sub.crumb) crumbs.push({ label: state.sub.crumb.toUpperCase() });
  }

  const screenProps = { venture, nav, state };
  let Screen = null;
  if (state.view === 'portfolio') Screen = window.PortfolioScreen;
  else Screen = ({
    dashboard: window.DashboardScreen, signals: window.SignalsScreen,
    accounts: window.AccountsScreen, memory: window.MemoryScreen,
    triage: window.TriageScreen, graph: window.GraphScreen,
    influx: window.InfluxScreen, agents: window.AgentsScreen,
    alignment: window.AlignmentScreen,
  })[state.tab];

  const [decideOpen, setDecideOpen] = useState(false);
  const decideCount = D.DECIDE_QUEUE.length;
  const ventureDecide = D.DECIDE_QUEUE.filter(q => q.venture === venture.id).length;

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <Chrome right={
        <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
          <button onClick={() => setDecideOpen(true)} className="lift" title="Your decide queue" style={{
            display: 'inline-flex', alignItems: 'center', gap: 7, padding: '4px 9px 4px 9px', borderRadius: 99,
            background: 'var(--amber-soft)', border: '1px solid rgba(232,145,58,0.42)', whiteSpace: 'nowrap', flexShrink: 0,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: 99, background: 'var(--amber)', animation: 'pulse 2s infinite', flexShrink: 0 }} />
            <span className="mono" style={{ fontSize: 9.5, color: 'var(--amber)', letterSpacing: '.1em', fontWeight: 600 }}>DECIDE</span>
            <span className="mono" style={{ fontSize: 9.5, color: 'var(--bg-void)', background: 'var(--amber)', borderRadius: 99, padding: '0 6px', fontWeight: 700, lineHeight: '14px', flexShrink: 0 }}>{state.view === 'project' ? ventureDecide : decideCount}</span>
          </button>
          <span className="mono" style={{ fontSize: 10, color: 'var(--text-faint)' }}>⌘K</span>
          <span style={{ width: 26, height: 26, borderRadius: 7, background: 'var(--purple-soft)', color: 'var(--purple)', display: 'grid', placeItems: 'center', fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600 }}>SA</span>
        </div>
      }>
        <Breadcrumb crumbs={crumbs} />
      </Chrome>

      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        {state.view === 'project' && <Sidebar venture={venture} tab={state.tab} nav={nav} />}
        <div style={{ flex: 1, minWidth: 0, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {Screen ? <Screen key={state.view + state.tab + venture.id} {...screenProps} /> :
            <div style={{ padding: 40, color: 'var(--text-mute)' }}>Coming soon.</div>}
        </div>
      </div>

      <StatusBar />
      <DecideQueue open={decideOpen} onClose={() => setDecideOpen(false)} nav={nav} currentVenture={state.view === 'project' ? venture.id : null} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
