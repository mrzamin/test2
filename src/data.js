export const DARK_PALETTES = {
  sky:    { label: 'Sky Blue',    accent: '#4A90E2', accentText: '#0a0b0e' },
  royal:  { label: 'Royal Blue',  accent: '#2D6FB8', accentText: '#ffffff' },
  deep:   { label: 'Deep Blue',   accent: '#1E5BA0', accentText: '#ffffff' },
  field:  { label: 'Field Green', accent: '#22C55E', accentText: '#0a0b0e' },
  mint:   { label: 'Mint',        accent: '#10B981', accentText: '#0a0b0e' },
};

export const hexToRgba = (hex, alpha) => {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const TEAMS = {
  pro: [
    { id: 'cowboys', name: 'Cowboys' }, { id: 'patriots', name: 'Patriots' },
    { id: '49ers', name: '49ers' }, { id: 'chiefs', name: 'Chiefs' },
    { id: 'bills', name: 'Bills' }, { id: 'eagles', name: 'Eagles' },
    { id: 'ravens', name: 'Ravens' }, { id: 'lions', name: 'Lions' },
    { id: 'packers', name: 'Packers' }, { id: 'bengals', name: 'Bengals' },
  ],
  college: [
    { id: 'alabama', name: 'Alabama' }, { id: 'georgia', name: 'Georgia' },
    { id: 'osu', name: 'Ohio State' }, { id: 'texas', name: 'Texas' },
    { id: 'michigan', name: 'Michigan' }, { id: 'oregon', name: 'Oregon' },
    { id: 'nd', name: 'Notre Dame' }, { id: 'usc', name: 'USC' },
    { id: 'psu', name: 'Penn State' }, { id: 'fsu', name: 'FSU' },
  ],
};

export const SCHOOLS = [
  { rank: 1, name: 'Alabama', fill: 92, p: 12, r: 3 },
  { rank: 2, name: 'Georgia', fill: 78, p: 9, r: 2 },
  { rank: 3, name: 'Ohio State', fill: 70, p: 8, r: 4 },
  { rank: 4, name: 'Texas', fill: 62, p: 7, r: 1 },
  { rank: 5, name: 'Michigan', fill: 54, p: 6, r: 2 },
  { rank: 6, name: 'Oregon', fill: 46, p: 5, r: 3 },
  { rank: 7, name: 'Notre Dame', fill: 40, p: 4, r: 1 },
  { rank: 8, name: 'USC', fill: 35, p: 4, r: 2 },
];

export const GAMES = [
  { home: 'BAMA', hs: 31, away: 'LSU', as: 17, status: 'FINAL', league: 'SEC', extra: 'OT' },
  { home: 'OSU', hs: 42, away: 'PSU', as: 28, status: 'FINAL', league: 'B1G' },
  { home: 'UGA', hs: 14, away: 'FLA', as: 21, status: 'Q3 8:42', league: 'SEC', live: true, awayWin: true },
  { home: 'USC', hs: 35, away: 'UCLA', as: 10, status: 'FINAL', league: 'B1G' },
];

export const WIRE = [
  { jersey: '14', pos: 'WR', name: 'M. Hollis', deal: ['CLE', '→', 'PHI', '+ 2026 3rd-rd'], time: '02M AGO', action: 'TRADE', hot: true },
  { jersey: '52', pos: 'LB', name: 'T. Brooks', deal: ['→', 'CIN', '1YR / $4.2M'], time: '41M AGO', action: 'SIGN' },
  { jersey: '94', pos: 'DT', name: 'D. Payne', deal: ['WAS', 'released → UFA'], time: '18M AGO', action: 'CUT' },
  { jersey: '23', pos: 'CB', name: 'J. Carter', deal: ['DAL', 'hamstring · 4–6w'], time: '1H AGO', action: 'IR' },
];

export const SURVEYS = [
  { id: 1, title: 'Draft Day Logistics Check', author: 'M. Murray', initials: 'MM', dueDate: 'May 9, 2026', daysLeft: 1, questions: 6, urgent: true },
  { id: 2, title: 'Position Need Assessment Q2', author: 'C. Ballard', initials: 'CB', dueDate: 'May 11, 2026', daysLeft: 3, questions: 12, urgent: true },
  { id: 3, title: 'Pre-Combine Trait Rankings', author: 'S. Steichen', initials: 'SS', dueDate: 'May 15, 2026', daysLeft: 7, questions: 24 },
  { id: 4, title: 'Free Agent Tier Review', author: 'D. Rapp', initials: 'DR', dueDate: 'May 14, 2026', daysLeft: 6, questions: 18 },
  { id: 5, title: 'Practice Squad Promotions', author: 'C. Ballard', initials: 'CB', dueDate: 'May 20, 2026', daysLeft: 12, questions: 8 },
  { id: 6, title: 'Off-Season Workout Vote', author: 'A. Wright', initials: 'AW', dueDate: 'May 6, 2026', daysLeft: -2, questions: 4, overdue: true },
];

export const INITIAL_RECENT = [
  { id: 1, type: 'player', label: 'M. Hollis', meta: 'WR · CLE', pinned: true },
  { id: 2, type: 'school', label: 'Alabama', meta: '12P / 3R' },
  { id: 3, type: 'game', label: 'BAMA vs LSU', meta: '31–17 OT' },
  { id: 4, type: 'player', label: 'T. Brooks', meta: 'LB · CIN' },
  { id: 5, type: 'school', label: 'Ohio State', meta: '8P / 4R' },
  { id: 6, type: 'page', label: 'Draft Board' },
  { id: 7, type: 'player', label: 'D. Payne', meta: 'DT · UFA' },
];

export const CALENDAR = [
  { day: 'MON', date: '04', tag: 'PRO DAY · UGA' },
  { day: 'TUE', date: '05' }, { day: 'WED', date: '06' }, { day: 'THU', date: '07' },
  { day: 'FRI', date: '08', today: true },
  { day: 'SAT', date: '09', tag: 'BAMA vs LSU' },
  { day: 'SUN', date: '10', tag: 'FILM REVIEW' },
  { day: 'MON', date: '11' }, { day: 'TUE', date: '12' },
  { day: 'WED', date: '13', tag: 'VISIT · OSU' },
  { day: 'THU', date: '14' }, { day: 'FRI', date: '15' },
  { day: 'SAT', date: '16', tag: 'UGA vs FLA' },
  { day: 'SUN', date: '17' },
];

export const TEAM_ABBREVIATIONS = ['CLE', 'PHI', 'CIN', 'WAS', 'DAL'];

export const COLTS_LOGO = 'data:image/png;base64,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';
