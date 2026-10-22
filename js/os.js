(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const wins = $$('.win');
  const isDesktop = () => matchMedia('(min-width:800px)').matches;
  let z = 10;

  /*-- Herramientas --*/
  const D = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/';
  const skills = [
    ['html5/html5-original', 'HTML5'], ['css3/css3-original', 'CSS3'], ['php/php-original', 'PHP'],
    ['javascript/javascript-original', 'JavaScript'], ['java/java-original', 'Java'],
    ['angularjs/angularjs-original', 'Angular'], ['npm/npm-original-wordmark', 'NPM'],
    ['nodejs/nodejs-original', 'Node.js'], ['mysql/mysql-original', 'MySQL'],
    ['bootstrap/bootstrap-original', 'Bootstrap'], ['figma/figma-original', 'Figma'],
    ['git/git-original', 'Git'], ['github/github-original', 'GitHub'], ['vscode/vscode-original', 'VS Code'],
    ['https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg', 'Postman'], ['img/Canva.png', 'Canva'],
  ];
  $('#skills-grid').innerHTML = skills.map(([p, n]) =>
    `<div class="file"><img src="${/^(http|img)/.test(p) ? p : D + p + '.svg'}" alt="" loading="lazy"><span>${n}</span></div>`).join('');
  $('#skills-count').textContent = `${skills.length} objetos`;

  /*-- Avisos --*/
  const hintEl = $('#hint');
  let hintT;
  const hint = (t) => {
    hintEl.innerHTML = t; hintEl.classList.add('show');
    clearTimeout(hintT); hintT = setTimeout(() => hintEl.classList.remove('show'), 2800);
  };

  /*-- Ventanas --*/
  const tasks = $('#tasks'), menu = $('#menu');
  const front = (w) => { w.style.zIndex = ++z; };
  const sync = (w) => {
    w._t.classList.toggle('off', w.classList.contains('closed'));
    w._t.classList.toggle('min', w.classList.contains('min'));
  };
  const open = (w) => {
    const p = w.parentElement.closest('.win'); 
    if (p && (p.classList.contains('closed') || p.classList.contains('min'))) open(p);
    w.classList.remove('closed', 'min');
    w.classList.add('pop');
    front(w); sync(w); menu.hidden = true;
    w.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  wins.forEach((w, i) => {
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.innerHTML = `<i class="fa-regular fa-window-maximize" aria-hidden="true"></i><b>${w.dataset.name}</b>
      <span class="ctl">
        <button data-a="min" aria-label="Minimizar ventana"><i class="fa-solid fa-minus"></i></button>
        <button data-a="max" aria-label="Maximizar ventana"><i class="fa-regular fa-square"></i></button>
        <button data-a="close" aria-label="Cerrar ventana"><i class="fa-solid fa-xmark"></i></button>
      </span>`;
    w.prepend(bar);

    const b = document.createElement('button');
    b.textContent = w.dataset.name; b.onclick = () => open(w);
    if (!w.closest('.projects')) tasks.append(b);  
    w._t = b;
    const m = b.cloneNode(true); m.onclick = () => open(w);
    menu.append(m);

    w.addEventListener('pointerdown', () => front(w));
    w.addEventListener('animationend', () => w.classList.remove('pop'));

    bar.addEventListener('click', (e) => {
      const a = e.target.closest('[data-a]')?.dataset.a;
      if (!a) return;
      if (a === 'max' && w.closest('.projects')) return;
      if (a === 'min') w.classList.toggle('min');
      if (a === 'close') { w.classList.add('closed'); hint('<i class="fa-solid fa-circle-info"></i> Ventana cerrada. Ábrela de nuevo desde la barra de tareas'); }
      if (a === 'max') {
        if (w.classList.contains('max')) { w._ph.remove(); w.classList.remove('max'); }
        else {
          w._ph = document.createElement('div');
          w._ph.style.height = w.offsetHeight + 'px';
          w.before(w._ph); w.classList.add('max'); front(w);
        }
        document.body.classList.toggle('lock', !!$('.win.max'));
      }
      sync(w);
    });
    bar.addEventListener('dblclick', (e) => { if (!e.target.closest('button')) w.classList.toggle('min'), sync(w); });

    bar.addEventListener('pointerdown', (e) => {
      if (e.target.closest('button') || !isDesktop() || w.classList.contains('max')) return;
      const [x0, y0] = (w.style.translate || '0px 0px').split(' ').map(parseFloat);
      const sx = e.clientX, sy = e.clientY;
      bar.setPointerCapture(e.pointerId); bar.classList.add('grab');
      const move = (ev) => { w.style.translate = `${x0 + ev.clientX - sx}px ${y0 + ev.clientY - sy}px`; };
      const up = () => { bar.classList.remove('grab'); bar.removeEventListener('pointermove', move); bar.removeEventListener('pointerup', up); };
      bar.addEventListener('pointermove', move); bar.addEventListener('pointerup', up);
    });
  });

  $$('[data-go]').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault(); open($('#' + a.dataset.go));
  }));

  $('#start').onclick = (e) => { e.stopPropagation(); menu.hidden = !menu.hidden; };
  document.addEventListener('click', () => { menu.hidden = true; });

  const tick = () => { $('#clock').textContent = new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }); };
  tick(); setInterval(tick, 30000);

  const tg = $('#theme-toggle');
  const setTheme = (dark) => {
    document.body.classList.toggle('dark', dark);
    tg.innerHTML = dark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    try { localStorage.setItem('dark', dark ? '1' : '0'); } catch (_) {}
  };
  try { setTheme(localStorage.getItem('dark') === '1'); } catch (_) {}
  tg.onclick = () => setTheme(!document.body.classList.contains('dark'));

  window.addEventListener('load', () => setTimeout(() => {
    $('#boot').classList.add('off');
    wins.forEach((w, i) => setTimeout(() => w.classList.add('in', 'pop'), 150 + i * 130));
  }, 1500));

  
})();
