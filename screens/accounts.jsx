/* ============================================================================
   COMPOUND — Accounts (companies + contacts) → drill into a call
   ========================================================================== */
function AccountsScreen({ venture, nav, state }) {
  // delegate to the call view when a call is opened
  if (state.sub && state.sub.call && window.CallScreen) {
    return <window.CallScreen venture={venture} nav={nav} state={state} />;
  }

  const [tab, setTab] = useState('companies');
  const [sel, setSel] = useState(D.ACCOUNTS[0].id);
  const acct = D.ACCOUNTS.find(a => a.id === sel);
  const convColor = c => c >= 70 ? 'var(--mint)' : c >= 50 ? 'var(--amber)' : 'var(--text-mute)';

  const openCall = () => nav({ tab: 'accounts', sub: { call: D.CALL.id, crumb: 'Discovery — Brightman LLP' } });

  return (
    <div style={{ flex: 1, display: 'flex', minHeight: 0, position: 'relative' }}>
      <GlowBg b="rgba(52,214,196,0.06)" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, position: 'relative', zIndex: 1 }}>
        {/* tabs + search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '16px 24px', borderBottom: '1px solid var(--line)' }}>
          <Tab active={tab === 'companies'} onClick={() => setTab('companies')}>COMPANIES</Tab>
          <Tab active={tab === 'contacts'} onClick={() => setTab('contacts')}>CONTACTS</Tab>
          <div style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 7, background: 'var(--bg-1)', border: '1px solid var(--line-2)', borderRadius: 8, padding: '6px 11px' }}>
            <span style={{ color: 'var(--text-faint)', fontSize: 11 }}>⌕</span>
            <span className="mono" style={{ fontSize: 9.5, color: 'var(--text-mute)', letterSpacing: '.06em' }}>SORT · CONVERSION</span>
          </div>
        </div>

        {/* table */}
        <div style={{ flex: 1, overflow: 'auto', padding: '6px 24px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1.4fr 70px 1.4fr 70px', gap: 14, padding: '12px 14px', position: 'sticky', top: 0 }}>
            {['ACCOUNT', 'CALLS', 'SIGNALS', 'ICP FIT', 'CONVERT'].map((h, i) => (
              <span key={h} className="mono" style={{ fontSize: 9.5, color: 'var(--text-faint)', letterSpacing: '.1em', textAlign: i >= 2 ? (i === 3 ? 'left' : 'right') : 'left' }}>{h}</span>
            ))}
          </div>
          <div style={{ display: 'grid', gap: 6 }}>
            {D.ACCOUNTS.map((a, idx) => {
              const active = sel === a.id;
              return (
                <div key={a.id} onClick={() => setSel(a.id)} className="lift fade-up" style={{
                  display: 'grid', gridTemplateColumns: '1.6fr 1.4fr 70px 1.4fr 70px', gap: 14, alignItems: 'center',
                  padding: '13px 14px', borderRadius: 10, cursor: 'pointer', animationDelay: (idx * 0.03) + 's',
                  background: active ? 'var(--bg-2)' : 'var(--bg-0)',
                  border: '1px solid ' + (active ? 'var(--line-3)' : 'var(--line)'),
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                    <Avatar text={a.avatar} color={a.color} size={30} />
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 600 }}>{a.name}</div>
                      <div className="mono" style={{ fontSize: 9, color: 'var(--text-faint)' }}>{a.domain}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 5 }}>
                    {Array.from({ length: a.calls }).map((_, i) => (
                      <button key={i} onClick={(e) => { e.stopPropagation(); openCall(); }} className="lift" style={{ width: 22, height: 22, borderRadius: 5, background: 'var(--mint-soft)', color: 'var(--mint)', display: 'grid', placeItems: 'center', fontSize: 9 }}>▶</button>
                    ))}
                  </div>
                  <span className="mono" style={{ fontSize: 12, color: 'var(--text-dim)', textAlign: 'right' }}>{a.signals}</span>
                  <FitBar value={a.fit} color={a.fit >= 0.7 ? 'var(--mint)' : a.fit >= 0.5 ? 'var(--amber)' : 'var(--slate)'} />
                  <span style={{ fontSize: 17, fontWeight: 600, color: convColor(a.convert), textAlign: 'right', fontFamily: 'var(--mono)' }}>{a.convert}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* detail panel */}
      <div style={{ width: 300, flexShrink: 0, borderLeft: '1px solid var(--line)', overflow: 'auto', padding: 22, position: 'relative', zIndex: 1, background: 'var(--bg-0)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 18 }}>
          <Avatar text={acct.avatar} color={acct.color} size={38} />
          <div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>{acct.name}</div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--text-faint)' }}>{acct.domain}</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 22 }}>
          {[['CALLS', acct.calls, 'var(--text)'], ['SIGNALS', acct.signals, 'var(--text)'], ['CONVERT', acct.convert + '%', convColor(acct.convert)]].map(([k, v, c]) => (
            <div key={k} style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 9, padding: '11px 8px', textAlign: 'center' }}>
              <div style={{ fontSize: 17, fontWeight: 600, color: c }}>{v}</div>
              <Label style={{ fontSize: 8, marginTop: 3 }}>{k}</Label>
            </div>
          ))}
        </div>

        <Label style={{ marginBottom: 10 }}>ICP FIT · {acct.fitLabel.toUpperCase()}</Label>
        <div style={{ marginBottom: 22 }}><FitBar value={acct.fit} segs={16} color={acct.fit >= 0.7 ? 'var(--mint)' : acct.fit >= 0.5 ? 'var(--amber)' : 'var(--slate)'} /></div>

        <Label style={{ marginBottom: 10 }}>CHAMPION</Label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 22 }}>
          <Avatar text={acct.champion.initials} color={acct.color} size={32} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{acct.champion.name}</div>
            <div style={{ fontSize: 11, color: 'var(--text-mute)' }}>{acct.champion.role}</div>
          </div>
          <span style={{ color: 'var(--text-faint)', fontSize: 14 }}>◬</span>
        </div>

        <Label style={{ marginBottom: 10 }}>TOP SIGNAL</Label>
        <div style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 10, padding: 13, marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
            <span style={{ color: D.SIGNAL_TYPES[acct.topSignal.type].color, fontSize: 13 }}>{D.SIGNAL_TYPES[acct.topSignal.type].glyph}</span>
            <span style={{ fontSize: 12.5, color: 'var(--text-dim)', lineHeight: 1.4, flex: 1 }}>{acct.topSignal.text}</span>
            <Ev score={acct.topSignal.ev} />
          </div>
        </div>

        <button onClick={openCall} className="mono lift" style={{ width: '100%', fontSize: 10, color: 'var(--text-dim)', letterSpacing: '.08em', border: '1px solid var(--line-2)', borderRadius: 9, padding: '11px', background: 'var(--bg-2)' }}>▶ OPEN LATEST CALL ↗</button>
      </div>
    </div>
  );
}
window.AccountsScreen = AccountsScreen;
