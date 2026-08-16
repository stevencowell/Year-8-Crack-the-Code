(() => {
  const moduleId = Number(document.body.dataset.module);
  const data = COURSE_MODULES.find(item => item.id === moduleId);
  if (!data) return;
  document.body.classList.add('module-standard-page');

  const cues = {
    '1.1':['INPUT','PROCESS','OUTPUT','Follow information through the complete control system.'], '1.2':['ARDUINO','SKETCH','BEHAVIOUR','The microcontroller runs the sketch that gives the shield behaviour.'], '1.3':['PIN MAP','CONSTRAINT','RELIABLE TEST','Fixed connections make code and evidence repeatable.'],
    '2.1':['SETUP ONCE','LOOP REPEATS','STRUCTURE','Sketch structure separates configuration from repeating behaviour.'], '2.2':['PIN','HIGH / LOW','LED STATE','A digital command targets one configured output state.'], '2.3':['ON','WAIT','OFF + WAIT','Timing turns state changes into a recognisable pattern.'],
    '3.1':['CLEAR STEPS','CORRECT ORDER','TESTABLE RESULT','An algorithm removes guessing before code is written.'], '3.2':['READ','IF / ELSE','REPEAT','Pseudocode keeps attention on logic rather than syntax.'], '3.3':['INPUT','DECISION','TWO PATHS','A decision creates labelled alternative branches.'],
    '4.1':['KNOB POSITION','A5 READING','DATA RANGE','Analogue input captures more than two possible states.'], '4.2':['INPUT RANGE','MAP','OUTPUT RANGE','Mapping converts measured data into useful control values.'], '4.3':['MEASURE','CHOOSE BOUNDARY','RETEST','Calibration grounds code choices in the actual component.'],
    '5.1':['LIGHT','A4 READING','OBSERVED CHANGE','The LDR supplies data; the program gives it meaning.'], '5.2':['READING','THRESHOLD','CATEGORY','A threshold separates measured conditions into program choices.'], '5.3':['READ','COMPARE','UPDATE + REPEAT','The sensor-response loop keeps the system responsive.'],
    '6.1':['BUTTON','PIN 7 VALUE','MEANING','Observe the real logic value before writing the condition.'], '6.2':['CONDITION','TRUE PATH','FALSE PATH','Only the branch selected by the condition runs.'], '6.3':['PREVIOUS STATE','PRESS EVENT','NEW STATE','A Boolean remembers what happened between loop cycles.'],
    '7.1':['PIN 3','FREQUENCY','PITCH','Tone turns a numeric frequency into audible output.'], '7.2':['A5 DATA','MAP','BUZZER PITCH','Mapped sensor data can drive a changing sound.'], '7.3':['NOTE ARRAY','LOOP','TONE SEQUENCE','Stored values and iteration organise a melody.'],
    '8.1':['INDEX 0','ARRAY VALUES','INDEX 5','Six LED pins occupy six valid positions from zero to five.'], '8.2':['COUNTER','SELECT PIN','REPEAT','A bounded loop applies one operation across the array.'], '8.3':['INPUT TEST','PROCESS TEST','OUTPUT TEST','Decomposition isolates faults before subsystems are recombined.'],
    '9.1':['NEED','CRITERIA','TEST METHOD','The brief becomes measurable development checkpoints.'], '9.2':['PIN MAP','ALGORITHM','MATCHING CODE','Every representation must describe the same system.'], '9.3':['CONDITION','EXPECTED / ACTUAL','RETEST','A test case turns behaviour into usable evidence.'],
    '10.1':['REPRODUCE','CHANGE ONE CAUSE','RETEST','Systematic debugging preserves the reason a fix worked.'], '10.2':['CRITERION','EVIDENCE','JUDGEMENT','Evaluation connects a claim to a result and improvement.'], '10.3':['NAMED VERSION','BACKUP','CONFIRMED HAND-IN','Device-local practice and formal submission are separate.']
  };
  const presentationFiles = [
    'Crack-the-Code-Module-01-systems.pptx','Crack-the-Code-Module-02-digital-output.pptx','Crack-the-Code-Module-03-algorithms.pptx','Crack-the-Code-Module-04-analogue-data.pptx','Crack-the-Code-Module-05-light-sensing.pptx','Crack-the-Code-Module-06-branching.pptx','Crack-the-Code-Module-07-sound.pptx','Crack-the-Code-Module-08-combined-systems.pptx','Crack-the-Code-Module-09-final-alarm.pptx','Crack-the-Code-Module-10-debug-evaluate.pptx'
  ];

  const readJSON = key => { try { return JSON.parse(localStorage.getItem(key) || '{}'); } catch (_) { return {}; } };
  const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const diagram = (key) => {
    const [a,b,c,caption] = cues[key];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="520" viewBox="0 0 1200 520"><rect width="1200" height="520" rx="34" fill="#071a2b"/><path d="M350 260H470M730 260H850" stroke="#38d9ff" stroke-width="12"/><path d="M455 238l28 22-28 22M835 238l28 22-28 22" fill="#38d9ff"/><g font-family="Arial,sans-serif" text-anchor="middle"><g><rect x="60" y="150" width="290" height="220" rx="28" fill="#102f48" stroke="#38d9ff" stroke-width="4"/><text x="205" y="250" fill="white" font-size="34" font-weight="700">${esc(a)}</text></g><g><rect x="470" y="115" width="260" height="290" rx="28" fill="#173d58" stroke="#ffb84d" stroke-width="5"/><text x="600" y="250" fill="white" font-size="34" font-weight="700">${esc(b)}</text></g><g><rect x="850" y="150" width="290" height="220" rx="28" fill="#102f48" stroke="#38d9ff" stroke-width="4"/><text x="995" y="250" fill="white" font-size="34" font-weight="700">${esc(c)}</text></g></g></svg>`;
    const src = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
    return `<figure class="teaching-visual"><a href="${src}" target="_blank" rel="noopener"><img src="${src}" alt="Learning diagram for ${key}: ${esc(a)}, ${esc(b)}, ${esc(c)}"></a><figcaption>${caption} <a href="${src}" target="_blank" rel="noopener">Open larger</a></figcaption></figure>`;
  };
  const video = (item, key) => `<aside class="video-learning" aria-labelledby="video-title-${key}"><div class="video-copy"><p class="eyebrow">Watch and notice</p><h3 id="video-title-${key}">${item.title}</h3><p>${item.purpose}</p><p class="watch-for"><strong>Watch for:</strong> ${item.watchFor}</p><p class="fine">${item.channel} · YouTube</p></div><div><div class="video-frame" data-video-frame><button type="button" class="video-launch" data-video-load="${item.id}" aria-label="Play ${item.title}"><img src="https://i.ytimg.com/vi/${item.id}/hqdefault.jpg" alt="" loading="lazy"><span class="video-play" aria-hidden="true">▶</span><span class="video-launch-label">Play video</span></button></div><p class="video-fallback"><a href="https://www.youtube.com/watch?v=${item.id}" target="_blank" rel="noopener">Open in YouTube ↗</a></p></div></aside>`;
  const question = (item, qi, section) => {
    const saved = readJSON(`crackthecode:check:${section.learningId}:${qi}`);
    return `<fieldset class="question" data-question="${qi}"><legend>${qi + 1}. ${item.q}</legend>${item.options.map((option, oi) => `<label class="option"><input type="radio" name="${section.learningId}-q${qi}" value="${oi}" ${saved.selected === oi ? 'checked' : ''}> <span>${option}</span></label>`).join('')}<button type="button" class="button secondary compact" data-check-one>Check answer</button><p class="feedback ${saved.checked ? (saved.correct ? 'good' : 'try') : ''}" aria-live="polite">${saved.checked ? (saved.correct ? 'Correct — keep going.' : `Not yet. Review ${section.title}, then try again.`) : ''}</p></fieldset>`;
  };
  const evidence = (section, index) => {
    const w = section.written;
    return `<section class="section-evidence" aria-labelledby="evidence-${section.learningId}"><p class="eyebrow">Written evidence ${moduleId}.${index + 1}</p><h3 id="evidence-${section.learningId}">${w.label}</h3><button type="button" class="button secondary response-help-toggle" data-response-help aria-expanded="false" aria-controls="guide-${w.id}">What is this asking?</button><div class="response-guide" id="guide-${w.id}" hidden><p><strong>In plain language:</strong> ${w.clarify}</p><ol>${w.steps.map(step => `<li>${step}</li>`).join('')}</ol><p><strong>Sentence starter:</strong> ${w.starter}</p><p><a href="#section-${index + 1}">Return to the precise relevant theory section: ${section.title}</a></p><details><summary>Appropriate response example</summary><p>${w.example}</p></details></div><label class="sr-only" for="${w.id}">${w.label}</label><textarea id="${w.id}" data-save-key="crackthecode:${w.id}" placeholder="Write your response here…"></textarea><p class="save-status" id="status-${w.id}" aria-live="polite"></p></section>`;
  };

  document.title = `Module ${data.id}: ${data.title} | Crack the Code`;
  document.querySelector('[data-module-header]').innerHTML = `<p class="eyebrow">Module ${data.id} of ${COURSE_MODULES.length}</p><h1>${data.title}</h1><p class="lede">${data.subtitle}</p>`;
  document.querySelector('[data-contents]').innerHTML = data.sections.map((s,i) => `<li><a href="#section-${i+1}">${s.title}</a></li>`).join('');
  const presentation = `<aside class="module-presentation module-overview"><div><p class="eyebrow">Module presentation</p><h2>Preview, learn and save evidence</h2><p>This eight-slide presentation teaches the three sections, includes retrieval practice and models the response process without revealing quiz answers.</p><p class="fine">PowerPoint file · 8 slides · student learning notes</p></div><a class="button tomato presentation-download" href="../resources/presentations/${presentationFiles[moduleId-1]}" download>Download Module ${moduleId} PowerPoint</a></aside>`;
  document.querySelector('[data-theory]').innerHTML = data.sections.map((section,i) => {
    const key = `${moduleId}.${i+1}`;
    return `<section class="theory-block" id="section-${i+1}"><h2>${section.title}</h2>${section.html}</section>${diagram(key)}${video(COURSE_VIDEOS[key], key.replace('.','-'))}<details class="section-learning" id="check-${section.learningId}"><summary><span>Learning activity ${key}</span><strong>10 questions + written response</strong></summary><div class="section-learning-body"><p>Answer all ten questions. Feedback returns you to this precise theory section when you need another look.</p><div data-section-check="${section.learningId}">${section.questions.map((q,qi) => question(q,qi,section)).join('')}</div>${evidence(section,i)}</div></details>`;
  }).join('');

  const layout = document.querySelector('.module-layout');
  const moduleMain = document.querySelector('.module-main');
  const aside = document.querySelector('.module-aside');
  aside.classList.add('student-evidence');
  aside.innerHTML = `<div><p class="eyebrow">Student evidence</p><h2>Your progress</h2><div class="progress-shell" aria-hidden="true"><div class="progress-bar" data-progress></div></div><p class="fine" data-progress-text></p><a href="../folio.html">Open My folio →</a></div><div><h3>Project activity</h3><p>${data.activity}</p><a class="button secondary compact" href="../activities.html#activity-${moduleId}">Open activity</a><button class="button secondary compact" type="button" data-print-module>Print / Save PDF</button></div>`;
  moduleMain.insertAdjacentHTML('beforebegin', presentation);
  layout.insertBefore(aside, moduleMain);
  document.querySelector('.module-main > .actions').classList.add('completion-panel', 'card');
  aside.querySelector('[data-print-module]').addEventListener('click', () => window.print());

  document.querySelectorAll('[data-check-one]').forEach(button => button.addEventListener('click', () => {
    const fieldset = button.closest('[data-question]');
    const box = button.closest('[data-section-check]');
    const section = data.sections.find(s => s.learningId === box.dataset.sectionCheck);
    const qi = Number(fieldset.dataset.question);
    const selected = fieldset.querySelector('input:checked');
    const feedback = fieldset.querySelector('.feedback');
    if (!selected) { feedback.className='feedback try'; feedback.textContent='Choose an answer, then check again.'; return; }
    const selectedIndex = Number(selected.value);
    const correct = selectedIndex === section.questions[qi].answer;
    localStorage.setItem(`crackthecode:check:${section.learningId}:${qi}`, JSON.stringify({selected:selectedIndex,checked:true,correct}));
    feedback.className = `feedback ${correct ? 'good' : 'try'}`;
    feedback.innerHTML = correct ? 'Correct — keep going.' : `Not yet. Review <a href="#section-${data.sections.indexOf(section)+1}">${section.title}</a>, then try again.`;
    updateProgress();
  }));
  document.querySelectorAll('[data-response-help]').forEach(button => button.addEventListener('click', () => {
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    const open = button.getAttribute('aria-expanded') === 'true'; button.setAttribute('aria-expanded', String(!open)); panel.hidden = open;
  }));
  document.querySelectorAll('[data-video-load]').forEach(button => button.addEventListener('click', () => {
    const frame = button.closest('[data-video-frame]'); const title = button.getAttribute('aria-label').replace(/^Play /,'');
    frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${button.dataset.videoLoad}?autoplay=1&rel=0" title="${title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
  }));
  document.querySelectorAll('[data-save-key]').forEach(area => {
    area.value = localStorage.getItem(area.dataset.saveKey) || '';
    let timer; area.addEventListener('input', () => { clearTimeout(timer); timer=setTimeout(() => { localStorage.setItem(area.dataset.saveKey, area.value); const status=document.getElementById(`status-${area.id}`); status.textContent='Saved on this device'; setTimeout(()=>status.textContent='',1800); updateProgress(); },250); });
  });

  const previous = document.querySelector('[data-previous]'); const next = document.querySelector('[data-next]');
  previous.href = moduleId===1 ? '../index.html' : `module-${String(moduleId-1).padStart(2,'0')}.html`; previous.textContent = moduleId===1 ? '← Course home' : `← Module ${moduleId-1}`;
  next.href = moduleId===10 ? '../folio.html' : `module-${String(moduleId+1).padStart(2,'0')}.html`; next.textContent = moduleId===10 ? 'Open My folio →' : `Module ${moduleId+1} →`;
  function updateProgress(){ const responses=data.sections.filter(s=>(localStorage.getItem(`crackthecode:${s.written.id}`)||'').trim().length>=20).length; const correct=data.sections.reduce((t,s)=>t+s.questions.filter((_,qi)=>readJSON(`crackthecode:check:${s.learningId}:${qi}`).correct).length,0); const pct=Math.round(((responses+correct)/33)*100); document.querySelector('[data-progress]').style.width=`${pct}%`; document.querySelector('[data-progress-text]').textContent=`${correct} of 30 questions correct and ${responses} of 3 written responses saved on this device`; }
  updateProgress();
})();
