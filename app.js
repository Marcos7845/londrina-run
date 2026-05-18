/* app.js — Londrina Run Tracker */

// ── CONSTANTS ────────────────────────────────────────────────────────
const RACE_DATE = new Date('2026-07-05T08:00:00');
const T55 = 330; // 5:30/km em segundos
const T50 = 300; // 5:00/km em segundos

// ── PLAN DATA ────────────────────────────────────────────────────────
const PLAN = [
  {
    week: 1, label: 'Semana 1 · 19–25 mai', phase: 'base',
    phaseLabel: 'Base aeróbica', vol: '~22km',
    workouts: [
      { id:'w1d1', date:'19/05', day:'Seg', type:'run', badge:'Corrida leve',
        desc:'<strong>5km</strong> · 6:30–6:50/km · ritmo confortável', td:5, tp:410, tol:35 },
      { id:'w1d2', date:'20/05', day:'Ter', type:'str', badge:'Força',
        desc:'Circuito corpo · 30–40min · sem equipamento', td:null, tp:null },
      { id:'w1d3', date:'22/05', day:'Qui', type:'run', badge:'Corrida + strides',
        desc:'<strong>6km</strong> · 6:30/km + 4×80m acelerados', td:6, tp:390, tol:35 },
      { id:'w1d4', date:'24/05', day:'Sáb', type:'run', badge:'Corrida longa',
        desc:'<strong>10km</strong> · 6:40–7:00/km · sem pressão', td:10, tp:420, tol:35 },
    ]
  },
  {
    week: 2, label: 'Semana 2 · 26 mai–01 jun', phase: 'base',
    phaseLabel: 'Base aeróbica', vol: '~24km',
    workouts: [
      { id:'w2d1', date:'26/05', day:'Seg', type:'run', badge:'Corrida leve',
        desc:'<strong>6km</strong> · 6:30/km · fácil e constante', td:6, tp:390, tol:35 },
      { id:'w2d2', date:'27/05', day:'Ter', type:'str', badge:'Força',
        desc:'Circuito corpo · 35–40min', td:null, tp:null },
      { id:'w2d3', date:'29/05', day:'Qui', type:'run', badge:'Tempo run',
        desc:'<strong>7km</strong> · 2km aquec. + 3km a 5:40/km + 2km volta', td:7, tp:360, tol:25 },
      { id:'w2d4', date:'31/05', day:'Sáb', type:'run', badge:'Corrida longa',
        desc:'<strong>11km</strong> · 6:30–6:45/km · constante', td:11, tp:405, tol:25 },
    ]
  },
  {
    week: 3, label: 'Semana 3 · 02–08 jun', phase: 'dev',
    phaseLabel: 'Velocidade', vol: '~25km',
    workouts: [
      { id:'w3d1', date:'02/06', day:'Seg', type:'run', badge:'Corrida leve',
        desc:'<strong>6km</strong> · 6:20/km · recuperação ativa', td:6, tp:380, tol:35 },
      { id:'w3d2', date:'03/06', day:'Ter', type:'str', badge:'Força',
        desc:'Circuito + plyometria · 40min', td:null, tp:null },
      { id:'w3d3', date:'05/06', day:'Qui', type:'run', badge:'Intervalado',
        desc:'<strong>6×800m</strong> · pace 5:10–5:20/km · 90s recuperação', td:6, tp:315, tol:20 },
      { id:'w3d4', date:'07/06', day:'Sáb', type:'run', badge:'Corrida longa',
        desc:'<strong>12km</strong> · 6:20–6:40/km · 2km finais a 5:50', td:12, tp:390, tol:25 },
    ]
  },
  {
    week: 4, label: 'Semana 4 · 09–15 jun', phase: 'dev',
    phaseLabel: 'Velocidade', vol: '~26km',
    workouts: [
      { id:'w4d1', date:'09/06', day:'Seg', type:'run', badge:'Corrida leve',
        desc:'<strong>6km</strong> · 6:20/km · fácil', td:6, tp:380, tol:35 },
      { id:'w4d2', date:'10/06', day:'Ter', type:'str', badge:'Força',
        desc:'Circuito + plyometria · 40min', td:null, tp:null },
      { id:'w4d3', date:'12/06', day:'Qui', type:'run', badge:'Tempo run',
        desc:'<strong>8km</strong> · 2km aquec. + 4km a 5:30/km + 2km volta', td:8, tp:345, tol:20 },
      { id:'w4d4', date:'14/06', day:'Sáb', type:'run', badge:'Corrida longa',
        desc:'<strong>12km</strong> · 6:10–6:30/km · 3km finais a 5:40', td:12, tp:375, tol:25 },
    ]
  },
  {
    week: 5, label: 'Semana 5 · 16–22 jun', phase: 'peak',
    phaseLabel: 'Simulação', vol: '~24km',
    workouts: [
      { id:'w5d1', date:'16/06', day:'Seg', type:'run', badge:'Corrida leve',
        desc:'<strong>5km</strong> · 6:20/km · leve e solto', td:5, tp:380, tol:35 },
      { id:'w5d2', date:'17/06', day:'Ter', type:'str', badge:'Força',
        desc:'Circuito moderado · 35min', td:null, tp:null },
      { id:'w5d3', date:'19/06', day:'Qui', type:'run', badge:'Intervalado',
        desc:'<strong>6×1km</strong> · pace 5:10/km · 2min recuperação', td:6, tp:310, tol:20 },
      { id:'w5d4', date:'21/06', day:'Sáb', type:'run', badge:'Simulado 8km',
        desc:'<strong>8km</strong> · pace meta: 5:30–5:40/km · esforço real', td:8, tp:335, tol:15 },
    ]
  },
  {
    week: 6, label: 'Semana 6 · 23–29 jun', phase: 'peak',
    phaseLabel: 'Simulação', vol: '~22km',
    workouts: [
      { id:'w6d1', date:'23/06', day:'Seg', type:'run', badge:'Corrida leve',
        desc:'<strong>5km</strong> · 6:30/km · recuperação', td:5, tp:390, tol:35 },
      { id:'w6d2', date:'24/06', day:'Ter', type:'str', badge:'Força',
        desc:'Circuito leve · 30min', td:null, tp:null },
      { id:'w6d3', date:'26/06', day:'Qui', type:'run', badge:'Tempo run',
        desc:'<strong>7km</strong> · 2km aquec. + 3km a 5:20–5:30/km + 2km volta', td:7, tp:330, tol:15 },
      { id:'w6d4', date:'28/06', day:'Sáb', type:'run', badge:'Corrida longa',
        desc:'<strong>10km</strong> · 6:00–6:20/km · 3km finais a 5:30', td:10, tp:365, tol:20 },
    ]
  },
  {
    week: 7, label: 'Semana 7 · 30 jun–05 jul', phase: 'taper',
    phaseLabel: 'Taper', vol: '~13km',
    workouts: [
      { id:'w7d1', date:'30/06', day:'Seg', type:'run', badge:'Corrida leve',
        desc:'<strong>5km</strong> · 6:30/km · solto e sem pressão', td:5, tp:390, tol:45 },
      { id:'w7d2', date:'01/07', day:'Ter', type:'rest', badge:'Descanso',
        desc:'Alongamento e descanso ativo — sem força esta semana', td:null, tp:null },
      { id:'w7d3', date:'03/07', day:'Qui', type:'run', badge:'Ativação',
        desc:'<strong>3km</strong> + 4×100m no pace de prova', td:3, tp:360, tol:45 },
      { id:'w7d4', date:'05/07', day:'Sáb', type:'race', badge:'PROVA!',
        desc:'<strong>Maratona de Londrina · 10km</strong> · Boa corrida! 🏃', td:10, tp:330, tol:0 },
    ]
  },
];

// ── STATE ────────────────────────────────────────────────────────────
let S = {};
let allExpanded = false;
let chartPace = null;
let chartDist = null;

function loadState()  { try { S = JSON.parse(localStorage.getItem('lrun_v3') || '{}'); } catch(e) { S = {}; } }
function saveState()  { localStorage.setItem('lrun_v3', JSON.stringify(S)); }

// ── PACE HELPERS ─────────────────────────────────────────────────────
function p2s(str) {
  if (!str || !str.includes(':')) return null;
  const parts = str.trim().split(':');
  const m = parseInt(parts[0]);
  const s = parseInt(parts[1]);
  if (isNaN(m) || isNaN(s)) return null;
  return m * 60 + s;
}

function s2p(sec) {
  if (!sec || isNaN(sec)) return '--';
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  return m + ':' + (s < 10 ? '0' : '') + s;
}

// ── ANALYSE SINGLE WORKOUT ────────────────────────────────────────────
function analyzeWorkout(w, log) {
  if (!log || (!log.dist && !log.pace)) return [];
  const results = [];

  if (w.td && log.dist) {
    const d    = parseFloat(log.dist);
    const diff = d - w.td;
    const pct  = Math.abs(diff) / w.td * 100;
    if (diff < -0.5)
      results.push({ t:'warn', msg: `Distância: ${d.toFixed(1)}km de ${w.td}km planejados (${pct.toFixed(0)}% abaixo)` });
    else if (diff > 1.2)
      results.push({ t:'ok',   msg: `Excelente! ${d.toFixed(1)}km — ${diff.toFixed(1)}km a mais que o planejado` });
    else
      results.push({ t:'ok',   msg: `Distância ok: ${d.toFixed(1)}km ✓` });
  }

  if (w.tp && log.pace) {
    const actual = p2s(log.pace);
    if (actual) {
      const diff = actual - w.tp;
      const tol  = w.tol || 30;
      if (diff > tol)
        results.push({ t:'warn', msg: `Pace acima da zona: ${s2p(actual)}/km · meta era ${s2p(w.tp)}/km (+${diff}s)` });
      else if (diff < -tol)
        results.push({ t:'ok',   msg: `Pace abaixo da meta! ${s2p(actual)}/km · ${Math.abs(diff)}s mais rápido 🔥` });
      else
        results.push({ t:'ok',   msg: `Pace dentro da zona: ${s2p(actual)}/km ✓` });

      if (actual <= T50)
        results.push({ t:'ok',  msg: `Ritmo compatível com sub 50min! 🚀` });
      else if (actual <= T55)
        results.push({ t:'ok',  msg: `Ritmo compatível com sub 55min ✓` });
      else
        results.push({ t:'warn',msg: `Para sub 55 ainda precisa reduzir ${actual - T55}s/km` });
    }
  }

  return results;
}

// ── GLOBAL ANALYSIS ──────────────────────────────────────────────────
function globalAnalysis() {
  const allW    = PLAN.flatMap(w => w.workouts);
  const paces   = allW
    .filter(w => w.type === 'run' && S[w.id] && S[w.id].pace)
    .map(w => p2s(S[w.id].pace))
    .filter(Boolean);

  if (!paces.length) return {
    s: 'neutral', icon: '📊',
    title: 'AGUARDANDO DADOS',
    text:  'Registre seus primeiros treinos para receber análise personalizada do seu progresso em relação às metas.'
  };

  const avg  = Math.round(paces.reduce((a, b) => a + b, 0) / paces.length);
  const best = Math.min(...paces);

  let trend = '';
  if (paces.length >= 4) {
    const h     = Math.floor(paces.length / 2);
    const early = paces.slice(0, h).reduce((a, b) => a + b, 0) / h;
    const late  = paces.slice(-h).reduce((a, b) => a + b, 0) / h;
    const diff  = early - late;
    if (diff > 10)
      trend = ` Tendência de <strong>melhora: ${Math.round(diff)}s mais rápido</strong> nos últimos treinos.`;
    else if (diff < -10)
      trend = ` Atenção: pace <strong>subindo nos últimos treinos</strong> — verifique descanso e recuperação.`;
    else
      trend = ` Pace <strong>estável</strong> nas últimas sessões.`;
  }

  if (best <= T50) return {
    s:'ok', icon:'🚀', title:'ZONA DO SUB 50MIN!',
    text:`Seu melhor pace: <strong>${s2p(best)}/km</strong> — já dentro da zona sub 50! Média geral: <strong>${s2p(avg)}/km</strong>.${trend} Mantenha a consistência!`
  };
  if (avg <= T55) return {
    s:'ok', icon:'✅', title:'META SUB 55MIN ALCANÇÁVEL',
    text:`Média atual <strong>${s2p(avg)}/km</strong> — dentro da zona do sub 55! Para sub 50 ainda faltam <strong>${avg - T50}s/km</strong>.${trend}`
  };
  if (avg - T55 <= 60) return {
    s:'warn', icon:'⚡', title:'PRÓXIMO DA META!',
    text:`Média atual <strong>${s2p(avg)}/km</strong>. Faltam <strong>${avg - T55}s/km</strong> para sub 55. Foco nos intervalados e tempo runs!${trend}`
  };
  return {
    s:'danger', icon:'🎯', title:'RITMO ACIMA DA META',
    text:`Média atual <strong>${s2p(avg)}/km</strong>. Precisa reduzir <strong>${avg - T55}s/km</strong> para sub 55. Priorize treinos de qualidade.${trend}`
  };
}

// ── UPDATE STATS ─────────────────────────────────────────────────────
function updateStats() {
  const allW  = PLAN.flatMap(w => w.workouts);
  const total = allW.filter(w => w.type !== 'rest').length;
  const done  = allW.filter(w => (S[w.id] || {}).done).length;
  let   km    = 0;
  const paces = [];

  allW.forEach(w => {
    const log = S[w.id] || {};
    if (log.dist) km += parseFloat(log.dist);
    if (log.pace) { const s = p2s(log.pace); if (s) paces.push(s); }
  });

  setText('st-done', done);
  setText('st-done-sub', `de ${total} planejados`);
  setText('st-km', km.toFixed(1));
  setText('st-km-sub', `${Math.round(km / 156 * 100)}% da meta total do plano`);

  if (paces.length) {
    const best = Math.min(...paces);
    const avg  = Math.round(paces.reduce((a, b) => a + b, 0) / paces.length);

    setVal('st-pace',     s2p(best), best <= T50 ? 'g' : best <= T55 ? 'y' : 'r');
    setVal('st-avg-pace', s2p(avg),  avg  <= T50 ? 'g' : avg  <= T55 ? 'y' : 'r');
    setText('hero-best-pace', s2p(best));

    const pt = document.getElementById('st-pace-trend');
    if (best <= T50) { pt.textContent='🚀 zona sub 50!'; pt.className='stat-trend up'; }
    else if (best <= T55) { pt.textContent='✓ zona sub 55'; pt.className='stat-trend up'; }
    else { pt.textContent=`${best - T55}s acima do sub 55`; pt.className='stat-trend down'; }

    const at = document.getElementById('st-avg-trend');
    if (avg <= T55) { at.textContent='✓ meta sub 55!'; at.className='stat-trend up'; }
    else { at.textContent=`faltam ${avg - T55}s/km p/ sub 55`; at.className='stat-trend down'; }

    if (paces.length >= 2) {
      const diff = paces[0] - paces[paces.length - 1];
      setVal('st-evolution', (diff >= 0 ? '-' : '+') + Math.abs(diff) + 's/km', diff >= 0 ? 'g' : 'r');
      const ed = document.getElementById('st-evo-detail');
      ed.textContent = diff >= 0 ? 'evoluindo — pace caindo' : 'atenção — pace subindo';
      ed.className   = 'stat-trend ' + (diff >= 0 ? 'up' : 'down');
    }

    updateGauge(avg);
    setText('gauge-val', s2p(avg));
  }

  // Current week
  const now  = new Date();
  const start = new Date('2026-05-19');
  const cw   = Math.min(7, Math.max(1, Math.floor((now - start) / 86400000 / 7) + 1));
  const phases = { 1:'Base aeróbica', 2:'Base aeróbica', 3:'Velocidade', 4:'Velocidade', 5:'Simulação', 6:'Simulação', 7:'Taper' };
  setText('st-week', cw <= 7 ? cw + 'ª' : 'Prova!');
  setText('st-phase', phases[cw] || 'concluído');

  // Banner
  const a = globalAnalysis();
  const b = document.getElementById('analysis-banner');
  b.className = 'analysis-banner ' + a.s;
  b.innerHTML = `
    <div class="ab-icon">${a.icon}</div>
    <div class="ab-content">
      <div class="ab-title ${a.s}">${a.title}</div>
      <div class="ab-text">${a.text}</div>
    </div>`;

  renderWeekTrack(cw);
}

function setText(id, val)       { const el = document.getElementById(id); if (el) el.textContent = val; }
function setVal(id, val, cls)   {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = val;
  el.className   = 'stat-val ' + (cls || '');
}

// ── GAUGE ────────────────────────────────────────────────────────────
function updateGauge(avg) {
  const arc = document.getElementById('gauge-arc');
  if (!arc || !avg) return;
  const pct    = Math.max(0, Math.min(1, (420 - avg) / (420 - 270)));
  const offset = 339.3 - 339.3 * pct;
  arc.style.strokeDashoffset = offset;
  arc.style.stroke = avg <= T50 ? 'var(--acc)' : avg <= T55 ? 'var(--acc2)' : 'var(--danger)';
}

// ── WEEK TRACK ────────────────────────────────────────────────────────
function renderWeekTrack(cw) {
  const el = document.getElementById('week-track');
  if (!el) return;
  el.innerHTML = '';
  PLAN.forEach(week => {
    const rw  = week.workouts.filter(w => w.type !== 'rest' && w.type !== 'race');
    const dw  = rw.filter(w => (S[w.id] || {}).done).length;
    const pct = rw.length ? Math.round(dw / rw.length * 100) : 0;
    const div = document.createElement('div');
    div.className = 'wt-item' + (week.week === cw ? ' active-week' : pct === 100 ? ' done-week' : '');
    div.innerHTML = `
      <div class="wt-week-num">S${week.week}</div>
      <div class="wt-dots">
        ${rw.map(w => `<div class="wt-dot ${(S[w.id] || {}).done ? (S[w.id].pace ? 'done' : 'partial') : ''}" title="${w.badge}"></div>`).join('')}
      </div>
      <div class="wt-pct">${pct}%</div>`;
    el.appendChild(div);
  });
}

// ── CHARTS ────────────────────────────────────────────────────────────
function updateCharts() {
  const allW = PLAN.flatMap(w => w.workouts);
  const runs = allW
    .filter(w => w.type === 'run' && S[w.id] && (S[w.id].pace || S[w.id].dist))
    .map(w => ({
      lbl:  w.date,
      pace: p2s(S[w.id].pace),
      dist: parseFloat(S[w.id].dist || 0),
    }));

  const labels = runs.length ? runs.map(r => r.lbl) : ['--'];
  const axisStyle = { ticks: { color:'#55556a', font:{ size:10, family:'DM Mono' } }, grid: { color:'rgba(255,255,255,0.03)' } };

  // PACE chart
  const paceCtx = document.getElementById('chart-pace');
  if (paceCtx) {
    if (chartPace) chartPace.destroy();
    chartPace = new Chart(paceCtx.getContext('2d'), {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Pace', data: runs.map(r => r.pace || null),
            borderColor: '#7DB8F9', backgroundColor: 'rgba(125,184,249,0.07)',
            pointBackgroundColor: '#7DB8F9', pointRadius: 4, tension: 0.35, fill: true,
          },
          {
            label: 'Meta sub 55', data: runs.map(() => T55),
            borderColor: 'rgba(125,249,170,0.45)', borderDash: [5,4],
            pointRadius: 0, tension: 0,
          },
          {
            label: 'Meta sub 50', data: runs.map(() => T50),
            borderColor: 'rgba(249,196,125,0.45)', borderDash: [5,4],
            pointRadius: 0, tension: 0,
          },
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: c => s2p(c.raw) + '/km' } }
        },
        scales: {
          x: axisStyle,
          y: { ...axisStyle, reverse: true, min: 250, max: 460,
               ticks: { ...axisStyle.ticks, callback: v => s2p(v) } }
        }
      }
    });
  }

  // DIST chart
  const distCtx = document.getElementById('chart-dist');
  if (distCtx) {
    if (chartDist) chartDist.destroy();
    chartDist = new Chart(distCtx.getContext('2d'), {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Distância (km)', data: runs.map(r => r.dist || null),
          backgroundColor: 'rgba(125,249,170,0.18)', borderColor: 'rgba(125,249,170,0.55)',
          borderWidth: 1, borderRadius: 3,
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { x: axisStyle, y: axisStyle }
      }
    });
  }
}

// ── RENDER PLAN ───────────────────────────────────────────────────────
function badgeClass(type) {
  return { run:'b-run', str:'b-str', rest:'b-rest', race:'b-race' }[type] || 'b-rest';
}

function phaseClass(p) {
  return { base:'ph-base', dev:'ph-dev', peak:'ph-peak', taper:'ph-taper' }[p] || 'ph-base';
}

function renderPlan() {
  const container = document.getElementById('plan-container');
  if (!container) return;
  container.innerHTML = '';

  PLAN.forEach(week => {
    const rw  = week.workouts.filter(w => w.type !== 'rest' && w.type !== 'race');
    const dw  = rw.filter(w => (S[w.id] || {}).done).length;
    const pct = rw.length ? Math.round(dw / rw.length * 100) : 0;
    const scls = pct === 100 ? 'ok' : pct > 0 ? 'partial' : 'none';
    const stxt = pct === 100 ? '✓ completa' : pct > 0 ? `${dw}/${rw.length} feitos` : 'pendente';

    const block = document.createElement('div');
    block.className = 'week-block';
    block.id = 'wb-' + week.week;

    block.innerHTML = `
      <div class="week-head" onclick="toggleWeek(${week.week})">
        <div class="wh-left">
          <div class="wh-title">${week.label}</div>
          <span class="phase-pill ${phaseClass(week.phase)}">${week.phaseLabel}</span>
        </div>
        <div class="wh-right">
          <div class="wh-vol">${week.vol}</div>
          <div class="wh-status ${scls}">${stxt}</div>
          <div class="wh-chevron" id="chev-${week.week}">▼</div>
        </div>
      </div>
      <div class="week-body" id="wbody-${week.week}">
        ${week.workouts.map(w => buildRow(w)).join('')}
      </div>`;

    container.appendChild(block);
  });
}

function buildRow(w) {
  const log     = S[w.id] || {};
  const done    = !!log.done;
  const hasLog  = !!(log.dist || log.pace || log.dur || log.notes);
  const feedback = w.type === 'run' && hasLog ? analyzeWorkout(w, log) : [];
  const fb       = feedback.length ? feedback[0] : null;

  const chips = [
    log.dist  ? `<span class="wr-chip">${parseFloat(log.dist).toFixed(1)}km</span>` : '',
    log.pace  ? `<span class="wr-chip">${log.pace}/km</span>` : '',
    log.dur   ? `<span class="wr-chip">${log.dur}min</span>` : '',
    log.elev  ? `<span class="wr-chip">${log.elev}m</span>` : '',
  ].filter(Boolean).join('');

  return `
    <div class="wr ${done ? 'done-row' : ''}" id="wr-${w.id}">
      <div class="wr-date">${w.day} · ${w.date}</div>
      <div class="wr-badge ${badgeClass(w.type)}">${w.badge}</div>
      <div>
        <div class="wr-desc">${w.desc}</div>
        ${fb ? `<div class="wr-feedback ${fb.t}">${fb.msg}</div>` : ''}
        <div class="wr-chips">${chips}</div>
      </div>
      <div class="wr-actions">
        ${w.type !== 'rest'
          ? `<button class="log-toggle ${hasLog ? 'has' : ''}" onclick="toggleLog('${w.id}')">${hasLog ? 'ver log' : '+ log'}</button>`
          : ''}
        <button class="chk ${done ? 'on' : ''}" onclick="toggleDone('${w.id}')">${done ? '✓' : ''}</button>
      </div>
    </div>
    <div class="log-panel" id="lp-${w.id}">
      ${buildPanel(w, log)}
    </div>`;
}

function buildPanel(w, log) {
  const analysis  = w.type === 'run' ? analyzeWorkout(w, log) : [];
  const aHtml     = analysis.map(a => `<div class="la ${a.t}">${a.msg}</div>`).join('');
  const hasSaved  = !!(log.dist || log.pace);
  const ph = {
    dist: w.td   ? w.td + 'km meta'  : 'ex: 6.2',
    pace: w.tp   ? s2p(w.tp) + ' meta' : 'ex: 6:10',
  };

  return `
    <div class="log-grid">
      <div class="lf">
        <label>Distância (km)</label>
        <input type="number" step="0.01" id="dist-${w.id}" value="${log.dist || ''}" placeholder="${ph.dist}">
      </div>
      <div class="lf">
        <label>Pace (min:seg/km)</label>
        <input type="text" id="pace-${w.id}" value="${log.pace || ''}" placeholder="${ph.pace}">
      </div>
      <div class="lf">
        <label>Duração (min)</label>
        <input type="number" step="1" id="dur-${w.id}" value="${log.dur || ''}" placeholder="ex: 42">
      </div>
      <div class="lf">
        <label>Elevação (m)</label>
        <input type="number" step="1" id="elev-${w.id}" value="${log.elev || ''}" placeholder="ex: 45">
      </div>
      <div class="lf full">
        <label>Observações</label>
        <input type="text" id="notes-${w.id}" value="${log.notes || ''}" placeholder="Como foi? Sentiu bem? Dor? Clima?">
      </div>
    </div>
    <div class="log-analysis-area" id="la-${w.id}">${aHtml}</div>
    <div class="log-actions">
      ${hasSaved ? `<button class="btn-del" onclick="clearLog('${w.id}')">Apagar</button>` : ''}
      <button class="btn-ghost sm" onclick="toggleLog('${w.id}')">Fechar</button>
      <button class="btn sm" onclick="saveLog('${w.id}')">Salvar e analisar</button>
    </div>`;
}

// ── INTERACTIONS ──────────────────────────────────────────────────────
function toggleWeek(n) {
  document.getElementById('wbody-' + n)?.classList.toggle('open');
  document.getElementById('chev-' + n)?.classList.toggle('open');
}

function toggleAll() {
  allExpanded = !allExpanded;
  document.querySelectorAll('.week-body').forEach(el => el.classList.toggle('open', allExpanded));
  document.querySelectorAll('.wh-chevron').forEach(el => el.classList.toggle('open', allExpanded));
}

function toggleLog(id) {
  document.getElementById('lp-' + id)?.classList.toggle('open');
}

function toggleDone(id) {
  if (!S[id]) S[id] = {};
  S[id].done = !S[id].done;
  saveState();
  renderAll();
}

function saveLog(id) {
  if (!S[id]) S[id] = {};
  const get = k => document.getElementById(k + '-' + id)?.value || '';
  const dist  = get('dist');
  const pace  = get('pace');
  const dur   = get('dur');
  const elev  = get('elev');
  const notes = get('notes');

  if (dist)  S[id].dist  = parseFloat(dist).toFixed(2);
  if (pace)  S[id].pace  = pace.trim();
  if (dur)   S[id].dur   = parseInt(dur);
  if (elev)  S[id].elev  = parseInt(elev);
  if (notes) S[id].notes = notes;
  if (dist || pace) S[id].done = true;

  saveState();
  renderAll();
}

function clearLog(id) {
  const keepDone = (S[id] || {}).done;
  S[id] = { done: keepDone };
  saveState();
  renderAll();
}

// ── LIVE ANALYSIS ON INPUT ────────────────────────────────────────────
function onInput(e) {
  if (!e.target.id) return;
  const parts = e.target.id.split('-');
  if (parts.length < 2) return;
  const wid = parts.slice(1).join('-');
  const w   = PLAN.flatMap(x => x.workouts).find(x => x.id === wid);
  if (!w || w.type !== 'run') return;
  const tempLog = {
    dist: document.getElementById('dist-' + wid)?.value,
    pace: document.getElementById('pace-' + wid)?.value,
  };
  const analysis = analyzeWorkout(w, tempLog);
  const el       = document.getElementById('la-' + wid);
  if (el) el.innerHTML = analysis.map(a => `<div class="la ${a.t}">${a.msg}</div>`).join('');
}

// ── COUNTDOWN ─────────────────────────────────────────────────────────
function tick() {
  const diff = RACE_DATE - new Date();
  if (diff <= 0) {
    ['cd-d','cd-h','cd-m','cd-s'].forEach(id => setText(id, '00'));
    return;
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor(diff % 86400000 / 3600000);
  const m = Math.floor(diff % 3600000  / 60000);
  const s = Math.floor(diff % 60000    / 1000);
  setText('cd-d', String(d).padStart(2,'0'));
  setText('cd-h', String(h).padStart(2,'0'));
  setText('cd-m', String(m).padStart(2,'0'));
  setText('cd-s', String(s).padStart(2,'0'));
}

// ── RENDER ALL ────────────────────────────────────────────────────────
function renderAll() {
  renderPlan();
  updateStats();
  updateCharts();
}

// ── BOOT ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  renderAll();
  tick();
  setInterval(tick, 1000);
  document.addEventListener('input', onInput);
});
