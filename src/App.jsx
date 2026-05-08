import { useState, useEffect } from 'react';
import { Search, Sun, Moon, X, Star, Plus, Trash2, Settings } from 'lucide-react';
import { TEAMS, SCHOOLS, GAMES, WIRE, SURVEYS, INITIAL_RECENT, CALENDAR, TEAM_ABBREVIATIONS, DARK_PALETTES, hexToRgba, COLTS_LOGO } from './data';

function App() {
  const [theme, setTheme] = useState('light');
  const [palette, setPalette] = useState('sky');
  const [league, setLeague] = useState('pro');
  const [activeTeam, setActiveTeam] = useState('cowboys');
  const [recent, setRecent] = useState(INITIAL_RECENT);

  useEffect(() => { document.body.dataset.theme = theme; }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');
  const switchLeague = (next) => { if (next === league) return; setLeague(next); setActiveTeam(TEAMS[next][0].id); };
  const removeRecent = (id, e) => { e.stopPropagation(); setRecent(items => items.filter(i => i.id !== id)); };
  const clearRecent = () => setRecent(items => items.filter(i => i.pinned));
  const pinCurrent = () => {
    const teamName = TEAMS[league].find(t => t.id === activeTeam)?.name;
    if (!teamName) return;
    const idx = recent.findIndex(r => r.label === teamName && r.type === 'page');
    if (idx >= 0) setRecent(items => items.map((it, i) => i === idx ? { ...it, pinned: !it.pinned } : it));
    else setRecent(items => [{ id: Date.now(), type: 'page', label: teamName, pinned: true }, ...items]);
  };

  const rootStyle = theme === 'dark' ? {
    '--color-accent': DARK_PALETTES[palette].accent,
    '--color-accent-text': DARK_PALETTES[palette].accentText,
    '--color-accent-soft': hexToRgba(DARK_PALETTES[palette].accent, 0.08),
    '--color-accent-hover': hexToRgba(DARK_PALETTES[palette].accent, 0.12),
    '--color-recent-bg': hexToRgba(DARK_PALETTES[palette].accent, 0.12),
    '--color-recent-hover': hexToRgba(DARK_PALETTES[palette].accent, 0.22),
    '--color-strip-bg': DARK_PALETTES[palette].accent,
    '--color-strip-text': DARK_PALETTES[palette].accentText,
  } : {};

  const sortedRecent = [...recent].sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned));
  const currentTeams = TEAMS[league];
  const totalPinned = recent.filter(r => r.pinned).length;

  const typeLabel = (type) => type === 'player' ? 'PLR' : type === 'school' ? 'SCH' : type === 'game' ? 'GM' : 'PG';
  const typeBg = (type) => {
    if (type === 'player') return 'bg-accent text-accent-text';
    if (type === 'school') return 'bg-ink text-bg';
    if (type === 'game') return 'bg-line-2 text-ink';
    return 'bg-line text-muted';
  };

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''} font-condensed bg-bg text-ink min-h-screen antialiased transition-[background,color] duration-200`} style={rootStyle}>

      {/* Palette Picker */}
      <div className="flex items-center gap-2.5 px-[18px] py-2 bg-panel-2 border-b border-dashed border-line-2 font-mono text-[0.62rem] tracking-[0.1em] uppercase text-muted flex-wrap">
        <span className="font-bold text-ink">DARK PALETTE:</span>
        {Object.entries(DARK_PALETTES).map(([key, p]) => (
          <button
            key={key}
            className={`flex items-center gap-1.5 px-2.5 py-1 bg-bg border text-muted font-mono font-bold tracking-[0.08em] uppercase transition-all duration-150 cursor-pointer text-[0.62rem] hover:border-ink hover:text-ink ${palette === key ? 'border-ink text-ink' : 'border-line-2'}`}
            onClick={() => setPalette(key)}
            title={p.label}
          >
            <span className="w-3 h-3 inline-block border border-black/15" style={{ background: p.accent }}></span>
            <span>{p.label}</span>
          </button>
        ))}
        <span className="ml-auto text-muted-soft text-[0.58rem] italic normal-case tracking-normal">
          {theme === 'light' ? 'switch to dark mode to preview' : 'live preview'}
        </span>
      </div>

      {/* Top Strip */}
      <div className="bg-strip-bg text-strip-text font-mono text-[0.7rem] px-[18px] py-1.5 flex justify-between tracking-[0.08em] uppercase transition-[background,color] duration-200">
        <span className="live-dot">Live · 4 transactions in last hr</span>
        <span>FRI · 05.08.26 · 17:42 EST</span>
      </div>

      {/* Chrome (header + nav + recent) */}
      <div>
        {/* Header */}
        <header className="bg-bg border-b border-line px-[18px] py-3.5 flex items-center gap-[18px] transition-[background,border-color] duration-200">
          <div className="flex items-center gap-3.5">
            <img className="w-[38px] h-auto flex-shrink-0" src={COLTS_LOGO} alt="Indianapolis Colts" />
            <div className="flex flex-col gap-[3px]">
              <div className="font-black text-[1.6rem] tracking-[0.04em] leading-none uppercase text-ink">ICFO</div>
              <div className="font-mono text-[0.6rem] text-muted tracking-[0.08em] uppercase font-medium">Indianapolis Colts Football Operations</div>
            </div>
          </div>
          <div className="flex gap-[18px]">
            <button
              className={`py-1 px-0 bg-transparent border-none border-b-2 font-bold text-[0.85rem] tracking-[0.1em] uppercase transition-[color,border-color] duration-150 cursor-pointer font-condensed ${league === 'pro' ? 'text-ink border-accent' : 'text-muted border-transparent hover:text-ink'}`}
              onClick={() => switchLeague('pro')}
            >Pro</button>
            <button
              className={`py-1 px-0 bg-transparent border-none border-b-2 font-bold text-[0.85rem] tracking-[0.1em] uppercase transition-[color,border-color] duration-150 cursor-pointer font-condensed ${league === 'college' ? 'text-ink border-accent' : 'text-muted border-transparent hover:text-ink'}`}
              onClick={() => switchLeague('college')}
            >College</button>
          </div>
          <div className="flex-1 max-w-[380px] flex items-center border border-line-2 bg-bg">
            <span className="font-mono text-[0.65rem] text-accent px-3 border-r border-line-2 leading-[32px] tracking-[0.1em] font-bold flex items-center gap-1.5">
              <Search size={11} strokeWidth={2.5} /> QUERY
            </span>
            <input
              type="text"
              placeholder="player.search > _"
              className="flex-1 bg-transparent border-none text-ink font-mono text-[0.78rem] px-3 py-2 outline-none placeholder:text-muted-soft"
            />
          </div>
          <div className="ml-auto flex items-center gap-3 font-mono text-[0.7rem] text-muted">
            <button
              className="w-[38px] h-[30px] bg-bg border border-line-2 flex items-center justify-center text-accent transition-[background,color,border-color] duration-150 cursor-pointer hover:bg-accent-soft hover:border-accent"
              onClick={toggleTheme}
              title="Toggle theme"
            >
              {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
            </button>
            <button className="flex items-center gap-2 text-muted border-none bg-transparent border-l border-line-2 pl-3 cursor-pointer" title="Settings">
              <span className="w-[26px] h-[26px] bg-accent text-accent-text flex items-center justify-center font-black text-[0.7rem] tracking-[0.04em] font-condensed">RM</span>
              <Settings size={13} />
            </button>
          </div>
        </header>

        {/* Nav */}
        <nav className="bg-bg border-b border-line px-[18px] flex overflow-x-auto transition-[background,border-color] duration-200">
          {currentTeams.map(t => (
            <button
              key={t.id}
              className={`px-4 py-2.5 bg-transparent border-none border-r border-line font-bold text-[0.82rem] tracking-[0.06em] uppercase relative whitespace-nowrap transition-colors duration-[120ms] cursor-pointer font-condensed ${
                activeTeam === t.id
                  ? 'text-accent after:content-[""] after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-0.5 after:bg-accent'
                  : 'text-nav-text hover:text-ink'
              }`}
              onClick={() => setActiveTeam(t.id)}
            >{t.name}</button>
          ))}
        </nav>

        {/* Recent Bar */}
        <div className="bg-recent-bg border-b border-line flex items-stretch overflow-x-auto transition-colors duration-200 [&::-webkit-scrollbar]:h-0">
          <div className="font-mono text-[0.62rem] text-accent tracking-[0.15em] uppercase px-3.5 flex items-center gap-2 border-r border-line-2 bg-transparent whitespace-nowrap font-bold">
            ↩ Recent
          </div>
          {sortedRecent.map(item => (
            <button key={item.id} className="recent-item flex items-center gap-2 px-3.5 py-1.5 border-none border-r border-line text-ink bg-transparent whitespace-nowrap transition-colors duration-[120ms] cursor-pointer hover:bg-recent-hover font-condensed">
              {item.pinned && <Star size={10} fill="currentColor" className="text-accent" />}
              <span className={`font-mono text-[0.55rem] px-[5px] py-[3px] tracking-[0.1em] uppercase leading-none font-bold ${typeBg(item.type)}`}>
                {typeLabel(item.type)}
              </span>
              <span className="font-bold text-[0.88rem] tracking-[0.03em] uppercase text-ink">{item.label}</span>
              {item.meta && <span className="font-mono text-[0.62rem] text-ink border-l border-line-2 pl-2 ml-1 opacity-60">{item.meta}</span>}
              <span className="recent-close bg-transparent border-none text-muted p-0.5 ml-1 opacity-0 flex transition-[opacity,color] duration-[120ms] hover:text-red" onClick={(e) => removeRecent(item.id, e)} role="button">
                <X size={12} />
              </span>
            </button>
          ))}
          <div className="ml-auto flex border-l border-line-2 bg-transparent">
            <button className="bg-transparent border-none text-accent font-mono text-[0.6rem] tracking-[0.1em] uppercase px-3.5 border-r border-line font-bold flex items-center gap-1.5 transition-[color,background] duration-[120ms] cursor-pointer hover:bg-recent-hover hover:text-ink" onClick={pinCurrent} title="Pin current page">
              <Plus size={10} strokeWidth={3} /> PIN {totalPinned > 0 && `(${totalPinned})`}
            </button>
            <button className="bg-transparent border-none text-accent font-mono text-[0.6rem] tracking-[0.1em] uppercase px-3.5 font-bold flex items-center gap-1.5 transition-[color,background] duration-[120ms] cursor-pointer hover:bg-recent-hover hover:text-ink" onClick={clearRecent} title="Clear unpinned">
              <Trash2 size={10} strokeWidth={2.5} /> CLEAR
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-24 max-lg:px-6">
        {/* Title Pane */}
        <div className="px-8 py-7 bg-bg flex items-center justify-between border-b border-line flex-wrap gap-4">
          <h1 className="font-black text-[2.6rem] tracking-[0.01em] leading-[0.95] uppercase text-ink m-0">
            REG <span className="text-accent">/</span> Week 11
          </h1>
          <div className="flex gap-9 font-mono">
            {[
              { v: '24', l: 'Schools' },
              { v: '147', l: 'Prospects' },
              { v: '38', l: 'Rejects' },
              { v: '12', l: 'Games Live' },
            ].map(s => (
              <div key={s.l}>
                <div className="font-condensed font-black text-[1.7rem] text-ink tracking-[0.01em] leading-none">{s.v}</div>
                <div className="text-[0.6rem] text-muted uppercase tracking-[0.1em] mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr_1fr] gap-px bg-line transition-colors duration-200">
          {/* Schools Board */}
          <div className="bg-panel p-[18px_20px] flex flex-col transition-colors duration-200">
            <div className="flex items-center justify-between pb-2.5 border-b border-line mb-3.5">
              <h3 className="font-extrabold text-[0.95rem] tracking-[0.08em] uppercase text-ink m-0">Schools // Board</h3>
              <span className="font-mono text-[0.65rem] text-accent font-bold">24 ACTIVE</span>
            </div>
            <div>
              {SCHOOLS.map(s => (
                <div key={s.rank} className="grid grid-cols-[24px_1fr_auto_auto] items-center gap-3 py-[9px] border-b border-dashed border-line">
                  <span className="font-mono text-[0.7rem] text-muted">{String(s.rank).padStart(2, '0')}</span>
                  <span className="font-semibold tracking-[0.02em] text-[0.92rem] text-ink">{s.name}</span>
                  <div className="w-20 h-1 bg-line-2 relative">
                    <div className="h-full bg-accent transition-colors duration-200" style={{ width: `${s.fill}%` }} />
                  </div>
                  <span className="font-mono text-[0.7rem] font-bold">
                    <span className="text-accent">+{s.p}</span>{' '}
                    <span className="text-red">−{s.r}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Games Live */}
          <div className="bg-panel p-[18px_20px] flex flex-col transition-colors duration-200">
            <div className="flex items-center justify-between pb-2.5 border-b border-line mb-3.5">
              <h3 className="font-extrabold text-[0.95rem] tracking-[0.08em] uppercase text-ink m-0">Games // Live</h3>
              <span className="font-mono text-[0.65rem] text-accent font-bold">WK 11 · 12 ACTIVE</span>
            </div>
            <div>
              {GAMES.map((g, i) => {
                const homeWin = !g.awayWin && g.hs > g.as;
                const awayWin = g.awayWin || g.as > g.hs;
                return (
                  <div key={i} className="border border-line p-[10px_12px] mb-2 grid grid-cols-[1fr_auto] gap-2 bg-bg">
                    <div>
                      <div className={`flex justify-between font-bold text-base tracking-[0.04em] uppercase ${homeWin ? 'text-ink' : 'text-muted font-medium'} mb-[3px]`}>
                        <span>{g.home}</span><span className="font-mono font-bold">{g.hs}</span>
                      </div>
                      <div className={`flex justify-between font-bold text-base tracking-[0.04em] uppercase ${awayWin ? 'text-ink' : 'text-muted font-medium'}`}>
                        <span>{g.away}</span><span className="font-mono font-bold">{g.as}</span>
                      </div>
                    </div>
                    <div className="border-l border-line pl-2.5 font-mono text-[0.6rem] text-muted uppercase tracking-[0.08em] flex flex-col justify-center text-right font-bold gap-0.5">
                      <span>{g.status}</span>
                      <span className="text-ink">{g.league}</span>
                      {g.extra && <span>{g.extra}</span>}
                      {g.live && <span className="text-red">● LIVE</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Wire Live Feed */}
          <div className="bg-panel p-[18px_20px] flex flex-col transition-colors duration-200">
            <div className="flex items-center justify-between pb-2.5 border-b border-line mb-3.5">
              <h3 className="font-extrabold text-[0.95rem] tracking-[0.08em] uppercase text-ink m-0">Wire // Live Feed</h3>
              <span className="font-mono text-[0.65rem] text-accent font-bold">● 4 IN 1H</span>
            </div>
            <div>
              {WIRE.map((w, i) => (
                <div key={i} className={`border p-3 mb-2.5 grid grid-cols-[40px_1fr] gap-3 bg-bg transition-[border-color,background] duration-150 ${w.hot ? 'border-accent! bg-accent-soft!' : 'border-line'}`}>
                  <div className={`flex flex-col items-center justify-center font-black text-[1.05rem] py-1 tracking-[0.02em] ${w.hot ? 'bg-accent text-accent-text' : 'bg-ink text-bg'}`}>
                    {w.jersey}<span className="text-[0.55rem] opacity-70 tracking-[0.1em] font-bold">{w.pos}</span>
                  </div>
                  <div>
                    <div className="font-extrabold text-[1.02rem] tracking-[0.04em] uppercase text-ink">{w.name}</div>
                    <div className="font-mono text-[0.7rem] text-muted mt-1 leading-[1.4]">
                      {w.deal.map((part, j) => (
                        <span key={j}>
                          {part === '→' ? <span className="text-accent font-bold"> → </span>
                            : TEAM_ABBREVIATIONS.includes(part) ? <span className="text-ink font-bold">{part}</span>
                            : <span>{j > 0 ? ' ' : ''}{part}</span>}
                          {j === 2 && w.action === 'TRADE' && <br />}
                        </span>
                      ))}
                    </div>
                    <div className="font-mono text-[0.6rem] text-accent mt-1.5 tracking-[0.08em] font-bold">{w.time} · {w.action}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Surveys */}
        <section className="bg-panel p-[18px_20px] border-t border-line transition-colors duration-200">
          <div className="flex items-center justify-between pb-2.5 border-b border-line mb-3.5">
            <h3 className="font-extrabold text-[0.95rem] tracking-[0.08em] uppercase text-ink m-0">Surveys // Pending</h3>
            <span className="font-mono text-[0.65rem] text-accent font-bold">6 ACTIVE · 1 OVERDUE</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {SURVEYS.map(s => {
              const statusClass = s.overdue ? 'overdue' : (s.urgent ? 'urgent' : '');
              const statusText = s.overdue ? `OVERDUE ${Math.abs(s.daysLeft)}D` : `DUE ${s.daysLeft}D`;
              return (
                <div key={s.id} className={`bg-bg border p-[14px_16px] flex flex-col gap-3 transition-[border-color,background] duration-150 hover:border-accent ${statusClass === 'overdue' ? 'border-red bg-red-soft' : statusClass === 'urgent' ? 'border-warn' : 'border-line'}`}>
                  <span className={`font-mono text-[0.6rem] tracking-[0.1em] uppercase font-bold self-start px-2 py-1 ${statusClass === 'overdue' ? 'text-red bg-red-soft' : statusClass === 'urgent' ? 'text-warn bg-warn-soft' : 'text-accent bg-accent-soft'}`}>
                    ● {statusText}
                  </span>
                  <h4 className="font-extrabold text-[0.98rem] tracking-[0.02em] uppercase leading-[1.2] text-ink m-0">{s.title}</h4>
                  <div className="flex items-center gap-2 font-mono text-[0.7rem] text-muted tracking-[0.04em]">
                    <span className="w-[22px] h-[22px] bg-ink text-bg flex items-center justify-center font-condensed font-extrabold text-[0.6rem] tracking-[0.04em] flex-shrink-0">{s.initials}</span>
                    <span>{s.author}</span>
                  </div>
                  <div className="font-mono text-[0.62rem] text-muted tracking-[0.05em] uppercase border-t border-line pt-2 mt-auto flex justify-between">
                    <span>{s.dueDate}</span>
                    <span className="text-accent font-bold">{s.questions}Q</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Calendar */}
        <div className="p-[18px_20px] bg-panel transition-colors duration-200 border-t border-line border-b border-line">
          <div className="flex items-center justify-between pb-2.5 border-b border-line mb-3.5">
            <h3 className="font-extrabold text-[0.95rem] tracking-[0.08em] uppercase text-ink m-0">Schedule // 2-Week View</h3>
            <span className="font-mono text-[0.65rem] text-accent font-bold">MAY 04 — MAY 17</span>
          </div>
          <div className="grid grid-cols-7 lg:grid-cols-[repeat(14,1fr)] gap-[3px]">
            {CALENDAR.map((d, i) => (
              <div
                key={i}
                className={`border p-[8px_6px] min-h-[80px] flex flex-col font-mono bg-bg transition-colors duration-150 ${
                  d.today
                    ? 'bg-accent! border-accent!'
                    : d.tag
                      ? 'bg-accent-soft! border-line-2!'
                      : 'border-line'
                }`}
              >
                <div className={`text-[0.55rem] uppercase tracking-[0.1em] font-bold ${d.today ? 'text-accent-text opacity-70' : 'text-muted'}`}>{d.day}</div>
                <div className={`font-extrabold text-[1.05rem] tracking-[0.01em] ${d.today ? 'text-accent-text' : 'text-ink'}`}>{d.date}</div>
                {d.tag && <div className="mt-auto text-[0.55rem] text-accent leading-[1.2] uppercase tracking-[0.05em] font-bold">{d.tag}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-bg px-[18px] py-3.5 flex justify-between items-center font-mono text-[0.65rem] text-muted tracking-[0.08em] uppercase font-medium gap-4 flex-wrap transition-colors duration-200">
        <div className="flex gap-3.5 items-center">
          <span className="text-accent font-bold">ICFO v3.2.1</span>
          <span className="text-line-2">·</span>
          <span>Operator: R. Mendez</span>
          <span className="text-line-2">·</span>
          <span>Env: Production</span>
        </div>
        <div className="flex gap-3.5 items-center">
          <span>Last sync: 12s ago</span>
          <span className="text-line-2">·</span>
          <span>Latency: 84ms</span>
          <span className="text-line-2">·</span>
          <span className="text-accent font-bold">● All Systems Nominal</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
