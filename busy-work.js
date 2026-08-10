(() => {
  const root = document.querySelector('[data-busy-list]');
  const hub = document.querySelector('[data-busy-hub]');
  const progressText = document.querySelector('[data-busy-progress]');
  const progressBar = document.querySelector('[data-busy-progress-bar]');
  const prefix = 'crackthecode:busy:';
  const printAllMode = new URLSearchParams(location.search).get('print') === 'all';
  const THEORY_HELP = {
    1:[1,'1.1 Input → process → output'],2:[3,'1.3 Work within the real system'],
    3:[1,'2.1 A sketch has a working structure'],4:[3,'2.3 Timing makes a sequence visible'],
    5:[1,'3.1 Algorithms are ordered solutions'],6:[3,'3.3 Flowcharts show paths and decisions'],
    7:[1,'4.1 Analogue readings show a range'],8:[2,'4.2 Mapping converts one range to another'],
    9:[2,'5.2 Thresholds create categories'],10:[3,'5.3 A night light is a feedback rule'],
    11:[2,'6.2 If/else creates two paths'],12:[3,'6.3 A variable can remember state'],
    13:[1,'7.1 Tone controls frequency'],14:[3,'7.3 Sequences can create a melody'],
    15:[1,'8.1 Arrays organise related values'],16:[3,'8.3 Combined challenges expose interactions'],
    17:[1,'9.1 Translate the brief into criteria'],18:[2,'9.2 Plan the complete signal path'],
    19:[1,'10.1 Debug one cause at a time'],20:[2,'10.2 Evaluation uses criteria and evidence']
  };
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const slug = (activity, part, index = '') => `${prefix}${activity.id}:${part}${index}`;
  const unique = values => [...new Set(values)];
  const optionMarkup = (options, placeholder = 'Choose...') => `<option value="">${placeholder}</option>${options.map(v=>`<option value="${esc(v)}">${esc(v)}</option>`).join('')}`;

  function renderChallenge(activity, challenge, challengeIndex) {
    const base = `bw-${activity.id}-${challengeIndex}`;
    if (challenge.type === 'match' || challenge.type === 'classify') {
      const options = challenge.type === 'match' ? challenge.items.map(item=>item[1]) : challenge.categories;
      return `<div class="busy-challenge busy-${challenge.type}"><h4>${esc(challenge.title)}</h4><div class="busy-match-grid">${challenge.items.map((item,i)=>`<label>${esc(item[0])}<select data-save="${esc(slug(activity,`c${challengeIndex}-`,i))}" data-answer="${esc(item[1])}">${optionMarkup(options)}</select></label>`).join('')}</div></div>`;
    }
    if (challenge.type === 'order') {
      const scrambled = [...challenge.items].reverse();
      return `<div class="busy-challenge busy-order"><h4>${esc(challenge.title)}</h4><p class="fine">Use the arrow buttons until the sequence is correct.</p><ol class="sequence-list" data-sequence data-save="${esc(slug(activity,`c${challengeIndex}-order`))}" data-answer-sequence="${esc(JSON.stringify(challenge.items))}">${scrambled.map(item=>`<li data-value="${esc(item)}"><span>${esc(item)}</span><span class="sequence-actions"><button type="button" data-move="up" aria-label="Move ${esc(item)} up">↑</button><button type="button" data-move="down" aria-label="Move ${esc(item)} down">↓</button></span></li>`).join('')}</ol></div>`;
    }
    if (challenge.type === 'gap') {
      return `<div class="busy-challenge busy-code"><h4>${esc(challenge.title)}</h4><div class="code-gap">${challenge.code.map((line,i)=>`<label><span>${esc(line.replace('___',''))}</span><select data-save="${esc(slug(activity,`c${challengeIndex}-gap`,i))}" data-answer="${esc(challenge.answers[i])}">${optionMarkup(challenge.options[i])}</select></label>`).join('')}</div></div>`;
    }
    if (challenge.type === 'numeric') {
      return `<div class="busy-challenge"><h4>${esc(challenge.title)}</h4><div class="numeric-grid">${challenge.items.map((item,i)=>`<label>${esc(item[0])}<input type="number" step="any" data-save="${esc(slug(activity,`c${challengeIndex}-number`,i))}" data-answer="${esc(item[1])}" data-tolerance="${esc(item[2])}"></label>`).join('')}</div><p class="fine">Unit: ${esc(challenge.unit)}</p></div>`;
    }
    if (challenge.type === 'choice') {
      const name = `${base}-choice`;
      return `<fieldset class="busy-challenge busy-choice"><legend>${esc(challenge.title)}</legend><p>${esc(challenge.prompt)}</p>${challenge.options.map((option,i)=>`<label class="option"><input type="radio" name="${name}" value="${i}" data-save="${esc(slug(activity,`c${challengeIndex}-choice`))}" data-answer="${challenge.answer}"><span>${esc(option)}</span></label>`).join('')}</fieldset>`;
    }
    if (challenge.type === 'trace' || challenge.type === 'route') {
      const answers = unique(challenge.items ? challenge.items.map(row=>row[1]) : challenge.rows.map(row=>row[1]));
      const rows = challenge.items || challenge.rows;
      return `<div class="busy-challenge"><h4>${esc(challenge.title)}</h4>${challenge.rule?`<p class="callout">${esc(challenge.rule)}</p>`:''}<div class="busy-table-wrap"><table class="busy-table"><thead><tr><th>${esc(challenge.type === 'route' ? 'Case' : challenge.columns[0])}</th><th>${esc(challenge.type === 'route' ? 'Expected action' : challenge.columns[1])}</th></tr></thead><tbody>${rows.map((row,i)=>`<tr><td>${esc(row[0])}</td><td><select aria-label="${esc(`${challenge.type === 'route' ? 'Expected action' : challenge.columns[1]} for ${row[0]}`)}" data-save="${esc(slug(activity,`c${challengeIndex}-trace`,i))}" data-answer="${esc(row[1])}">${optionMarkup(answers)}</select></td></tr>`).join('')}</tbody></table></div></div>`;
    }
    if (challenge.type === 'graph') {
      const width=620,height=220,pad=35,max=Math.max(...challenge.values),min=Math.min(...challenge.values);
      const points=challenge.values.map((v,i)=>`${pad+i*((width-pad*2)/(challenge.values.length-1))},${height-pad-((v-min)/(max-min||1))*(height-pad*2)}`).join(' ');
      return `<div class="busy-challenge busy-graph"><h4>${esc(challenge.title)}</h4><svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Line graph of A5 readings rising from ${min} to ${max}"><line x1="${pad}" y1="${height-pad}" x2="${width-pad}" y2="${height-pad}"/><line x1="${pad}" y1="${pad}" x2="${pad}" y2="${height-pad}"/><polyline points="${points}"/><g>${challenge.values.map((v,i)=>`<circle cx="${pad+i*((width-pad*2)/(challenge.values.length-1))}" cy="${height-pad-((v-min)/(max-min||1))*(height-pad*2)}" r="6"><title>${esc(challenge.labels[i])}%: ${v}</title></circle><text x="${pad+i*((width-pad*2)/(challenge.values.length-1))}" y="${height-8}" text-anchor="middle">${esc(challenge.labels[i])}%</text>`).join('')}</g></svg><div class="field-grid">${challenge.questions.map((q,i)=>`<label>${esc(q[0])}<input type="text" data-save="${esc(slug(activity,`c${challengeIndex}-graph`,i))}" data-answer="${esc(q[1])}"></label>`).join('')}</div></div>`;
    }
    if (challenge.type === 'table') {
      return `<div class="busy-challenge"><h4>${esc(challenge.title)}</h4><div class="busy-table-wrap"><table class="busy-table"><thead><tr>${challenge.headers.map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${challenge.rows.map((row,i)=>`<tr>${row.slice(0,-1).map(value=>`<td>${esc(value)}</td>`).join('')}<td><input type="text" aria-label="${esc(`${challenge.headers.at(-1)} for ${row[0]}`)}" data-required data-save="${esc(slug(activity,`c${challengeIndex}-${challenge.field}`,i))}"></td></tr>`).join('')}</tbody></table></div></div>`;
    }
    if (challenge.type === 'toggle') {
      return `<div class="busy-challenge busy-toggle"><h4>${esc(challenge.title)}</h4><p>${esc(challenge.instruction)}</p><button type="button" data-toggle-button>Press simulated button</button><p class="toggle-state">Current output: <strong data-toggle-state>OFF</strong></p><ol class="toggle-history" data-toggle-history data-save="${esc(slug(activity,`c${challengeIndex}-toggle`))}" data-answer-sequence="${esc(JSON.stringify(challenge.target))}"></ol><button type="button" class="button secondary compact" data-toggle-reset>Reset simulation</button></div>`;
    }
    if (challenge.type === 'slider') {
      return `<div class="busy-challenge busy-slider"><h4>${esc(challenge.title)}</h4><label>Frequency: <output data-slider-output>${challenge.min}</output> ${esc(challenge.unit)}<input type="range" aria-label="Test tone frequency in ${esc(challenge.unit)}" min="${challenge.min}" max="${challenge.max}" step="${challenge.step}" value="${challenge.min}" data-save="${esc(slug(activity,`c${challengeIndex}-slider`))}" data-target-min="${challenge.targetMin}" data-target-max="${challenge.targetMax}"></label><p class="fine">Target: a clear mid-range tone between ${challenge.targetMin} and ${challenge.targetMax} ${esc(challenge.unit)}.</p></div>`;
    }
    if (challenge.type === 'builder') {
      return `<div class="busy-challenge"><h4>${esc(challenge.title)}</h4><div class="builder-grid">${challenge.slots.map((slot,i)=>`<label>${esc(slot[0])}<select data-save="${esc(slug(activity,`c${challengeIndex}-builder`,i))}" data-answer="${esc(slot[2])}">${optionMarkup(slot[1])}</select></label>`).join('')}</div></div>`;
    }
    if (challenge.type === 'matrix') {
      return `<div class="busy-challenge"><h4>${esc(challenge.title)}</h4><div class="busy-table-wrap"><table class="busy-table"><thead><tr><th>Criterion</th><th>Judgement</th><th>Evidence or improvement</th></tr></thead><tbody>${challenge.rows.map((row,i)=>`<tr><td>${esc(row)}</td><td><select aria-label="Judgement for ${esc(row)}" data-required data-save="${esc(slug(activity,`c${challengeIndex}-judgement`,i))}">${optionMarkup(['Met','Partly met','Not yet met'])}</select></td><td><textarea aria-label="Evidence or improvement for ${esc(row)}" data-required data-save="${esc(slug(activity,`c${challengeIndex}-evidence`,i))}"></textarea></td></tr>`).join('')}</tbody></table></div></div>`;
    }
    return '';
  }

  hub.innerHTML = BUSY_WORK_ACTIVITIES.map(activity=>`<a class="busy-hub-card" href="#busy-${String(activity.id).padStart(2,'0')}"><span class="busy-number">${String(activity.id).padStart(2,'0')}</span><span><small>Module ${activity.module} · ${activity.minutes} min</small><strong>${esc(activity.title)}</strong><em>${esc(activity.mechanics.join(' + '))}</em></span><b data-hub-status="${activity.id}">Not started</b></a>`).join('');
  root.innerHTML = BUSY_WORK_ACTIVITIES.map((activity,index)=>{const help=THEORY_HELP[activity.id];return `<details class="busy-activity" id="busy-${String(activity.id).padStart(2,'0')}" data-activity-id="${activity.id}"><summary><span class="busy-number">${String(activity.id).padStart(2,'0')}</span><span><small>Module ${activity.module} · about ${activity.minutes} minutes</small><strong>${esc(activity.title)}</strong><em>${esc(activity.topic)}</em></span><b data-activity-status>Not started</b></summary><div class="busy-activity-body"><p class="lede">${esc(activity.intro)}</p><div class="visual-reading-note"><strong>Look first:</strong> study the diagram and its caption before completing the interactive evidence.</div><p class="busy-theory-link"><strong>Need help?</strong> Review the precise theory section: <a data-theory-help href="modules/module-${String(activity.module).padStart(2,'0')}.html?v=20260811b#section-${help[0]}">${esc(help[1])}</a>.</p>${window.renderCourseActivityVisual?.(activity.id)||''}${activity.challenges.map((challenge,i)=>renderChallenge(activity,challenge,i)).join('')}<div class="busy-reflection"><label for="busy-reflection-${activity.id}">${esc(activity.reflection)}</label><textarea id="busy-reflection-${activity.id}" data-required data-save="${esc(slug(activity,'reflection'))}" placeholder="Write a specific evidence-based response."></textarea></div><div class="busy-actions"><button type="button" data-check-activity>Check and save activity</button><p class="feedback" data-activity-feedback aria-live="polite"></p></div><nav class="busy-pager" aria-label="Busy Work activity navigation">${index?`<a href="#busy-${String(activity.id-1).padStart(2,'0')}">← Previous</a>`:'<span></span>'}<a href="#busy-hub">Back to hub</a>${index<BUSY_WORK_ACTIVITIES.length-1?`<a href="#busy-${String(activity.id+1).padStart(2,'0')}">Next →</a>`:'<span></span>'}</nav></div></details>`;}).join('');

  if(document.URL.includes('print=all')){
    document.querySelectorAll('details.busy-activity').forEach(details=>details.setAttribute('open',''));
  }

  function saveControl(control) {
    if (!control.dataset.save) return;
    if (control.type === 'radio') {
      if (control.checked) localStorage.setItem(control.dataset.save,control.value);
    } else localStorage.setItem(control.dataset.save,control.value);
  }
  document.querySelectorAll('[data-save]:not([data-sequence]):not([data-toggle-history])').forEach(control=>{
    const saved=localStorage.getItem(control.dataset.save);
    if(saved!==null){ if(control.type==='radio')control.checked=control.value===saved; else control.value=saved; }
    control.addEventListener('input',()=>{saveControl(control);updateProgress();});
    control.addEventListener('change',()=>{saveControl(control);updateProgress();});
  });
  document.querySelectorAll('[data-slider-output]').forEach(output=>{const input=output.closest('label').querySelector('input[type=range]');const sync=()=>output.value=input.value;input.addEventListener('input',sync);sync();});
  document.querySelectorAll('[data-sequence]').forEach(list=>{
    const saved=JSON.parse(localStorage.getItem(list.dataset.save)||'null');
    if(Array.isArray(saved)){const map=new Map([...list.children].map(li=>[li.dataset.value,li]));saved.forEach(value=>map.get(value)&&list.append(map.get(value)));}
    list.addEventListener('click',event=>{const button=event.target.closest('[data-move]');if(!button)return;const item=button.closest('li');if(button.dataset.move==='up'&&item.previousElementSibling)list.insertBefore(item,item.previousElementSibling);if(button.dataset.move==='down'&&item.nextElementSibling)list.insertBefore(item.nextElementSibling,item);localStorage.setItem(list.dataset.save,JSON.stringify([...list.children].map(li=>li.dataset.value)));updateProgress();});
  });
  document.querySelectorAll('.busy-toggle').forEach(box=>{
    const historyNode=box.querySelector('[data-toggle-history]');let history=JSON.parse(localStorage.getItem(historyNode.dataset.save)||'[]');
    const paint=()=>{box.querySelector('[data-toggle-state]').textContent=history.at(-1)||'OFF';historyNode.innerHTML=history.map((state,i)=>`<li>Press ${i+1}: ${state}</li>`).join('');localStorage.setItem(historyNode.dataset.save,JSON.stringify(history));};
    box.querySelector('[data-toggle-button]').addEventListener('click',()=>{history.push((history.at(-1)||'OFF')==='OFF'?'ON':'OFF');paint();updateProgress();});
    box.querySelector('[data-toggle-reset]').addEventListener('click',()=>{history=[];paint();updateProgress();});paint();
  });

  function activityResult(details) {
    let correct=true,attempted=true;
    const radios=new Map();
    details.querySelectorAll('input[type=radio][data-answer]').forEach(input=>{if(!radios.has(input.name))radios.set(input.name,[]);radios.get(input.name).push(input);});
    details.querySelectorAll('[data-answer]:not(input[type=radio])').forEach(control=>{const value=control.value.trim().toLowerCase();if(!value)attempted=false;if(control.type==='number'){const tolerance=Number(control.dataset.tolerance||0);if(Math.abs(Number(value)-Number(control.dataset.answer))>tolerance)correct=false;}else if(value!==control.dataset.answer.trim().toLowerCase())correct=false;});
    radios.forEach(inputs=>{const selected=inputs.find(x=>x.checked);if(!selected)attempted=false;else if(selected.value!==selected.dataset.answer)correct=false;});
    details.querySelectorAll('[data-sequence]').forEach(list=>{const current=[...list.children].map(li=>li.dataset.value);if(JSON.stringify(current)!==list.dataset.answerSequence)correct=false;});
    details.querySelectorAll('[data-toggle-history]').forEach(node=>{const history=JSON.parse(localStorage.getItem(node.dataset.save)||'[]');if(!history.length)attempted=false;if(JSON.stringify(history)!==node.dataset.answerSequence)correct=false;});
    details.querySelectorAll('[data-target-min]').forEach(input=>{if(Number(input.value)<Number(input.dataset.targetMin)||Number(input.value)>Number(input.dataset.targetMax))correct=false;});
    details.querySelectorAll('[data-required]').forEach(control=>{if(control.value.trim().length<3)attempted=false;});
    const reflection=details.querySelector('[id^=busy-reflection]');if(reflection.value.trim().length<20)attempted=false;
    return {correct,attempted};
  }
  document.querySelectorAll('[data-check-activity]').forEach(button=>button.addEventListener('click',()=>{
    const details=button.closest('.busy-activity');const result=activityResult(details);const feedback=details.querySelector('[data-activity-feedback]');
    if(!result.attempted){feedback.className='feedback try';feedback.textContent='Complete every interactive part and write a specific reflection before checking.';}
    else if(!result.correct){const help=details.querySelector('[data-theory-help]');feedback.className='feedback try';feedback.innerHTML=`Not yet. Review <a data-theory-help href="${help.getAttribute('href')}">${help.textContent}</a>, then revise your evidence and check again.`;}
    else{localStorage.setItem(`${prefix}completed:${details.dataset.activityId}`,'true');feedback.className='feedback good';feedback.textContent='Activity complete. Your evidence is saved on this device.';}
    updateProgress();
  }));
  root.addEventListener('click',event=>{const link=event.target.closest('.feedback [data-theory-help]');if(!link)return;event.preventDefault();location.assign(link.href);});
  function updateProgress(){
    let complete=0;
    BUSY_WORK_ACTIVITIES.forEach(activity=>{const done=localStorage.getItem(`${prefix}completed:${activity.id}`)==='true';if(done)complete++;const status=done?'Complete':'Not complete';document.querySelector(`[data-hub-status="${activity.id}"]`).textContent=status;document.querySelector(`[data-activity-id="${activity.id}"] [data-activity-status]`).textContent=status;});
    progressText.textContent=`${complete} of ${BUSY_WORK_ACTIVITIES.length} complete`;progressBar.style.width=`${complete/BUSY_WORK_ACTIVITIES.length*100}%`;
  }
  function openHash(){const target=document.querySelector(location.hash);if(target?.matches('details'))target.setAttribute('open','');}
  addEventListener('hashchange',openHash);openHash();updateProgress();
  let closedBeforePrint=[];
  addEventListener('beforeprint',()=>{
    closedBeforePrint=[...document.querySelectorAll('details.busy-activity:not([open])')];
    document.querySelectorAll('details.busy-activity').forEach(details=>details.setAttribute('open',''));
  });
  addEventListener('afterprint',()=>{
    closedBeforePrint.forEach(details=>details.removeAttribute('open'));
    closedBeforePrint=[];
    openHash();
  });
  const printAllEvidence=()=>{
    document.querySelectorAll('details.busy-activity').forEach(details=>details.setAttribute('open',''));
    setTimeout(()=>window.print(),50);
  };
  document.querySelector('[data-print-busy]').addEventListener('click',printAllEvidence);
  if(printAllMode){
    document.body.classList.add('busy-print-all');
    setTimeout(()=>document.querySelectorAll('details.busy-activity').forEach(details=>details.setAttribute('open','')),100);
  }
})();
