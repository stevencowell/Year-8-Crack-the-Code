(() => {
  const list = document.querySelector('[data-activity-list]');
  const key = (activity, field) => `crackthecode:activity:${activity}:${field}`;
  list.innerHTML = COURSE_ACTIVITIES.map(activity => {
    const visualIds=[activity.id*2-1,activity.id*2];
    return `<details class="card activity-card" id="activity-${activity.id}"><summary><span class="number">${activity.id}</span>${activity.title}</summary><div class="activity-body"><div class="activity-launch"><p class="activity-source">${activity.source}</p><h3>Your goal</h3><p>${activity.goal}</p><h3>Work through this sequence</h3><ol>${activity.guide.map(step=>`<li>${step}</li>`).join('')}</ol></div><div class="activity-visual-grid">${visualIds.map(id=>window.renderCourseActivityVisual?.(id)||'').join('')}</div><div class="activity-record"><p class="eyebrow">Save your evidence</p><h3>Record what you actually planned, observed or tested</h3><p class="fine">The diagrams are worked references. Where the task asks for measurements or results, enter your own classroom evidence rather than copying the example.</p></div><div class="field-grid">${activity.fields.map(([id,label]) => `<div><label for="a${activity.id}-${id}">${label}</label><textarea id="a${activity.id}-${id}" data-activity="${activity.id}" data-field="${id}" placeholder="Record specific evidence…"></textarea><p class="save-status" id="status-a${activity.id}-${id}" aria-live="polite"></p></div>`).join('')}</div><p><a href="modules/module-${String(activity.id).padStart(2,'0')}.html">Return to Module ${activity.id} →</a></p></div></details>`;
  }).join('');
  const update = () => { const started=COURSE_ACTIVITIES.filter(a=>a.fields.some(([id])=>(localStorage.getItem(key(a.id,id))||'').trim().length>=20)).length; document.querySelector('[data-activity-progress]').textContent=`${started}/10`; };
  document.querySelectorAll('[data-activity][data-field]').forEach(area => { area.value=localStorage.getItem(key(area.dataset.activity,area.dataset.field))||''; let timer; area.addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(()=>{localStorage.setItem(key(area.dataset.activity,area.dataset.field),area.value);const status=document.getElementById(`status-${area.id}`);status.textContent='Saved on this device';setTimeout(()=>status.textContent='',1600);update();},250);}); });
  const openHash=()=>{if(location.hash)document.querySelector(location.hash)?.setAttribute('open','');};
  addEventListener('hashchange',openHash); openHash();
  let closedBeforePrint=[];
  addEventListener('beforeprint',()=>{
    closedBeforePrint=[...document.querySelectorAll('details.activity-card:not([open])')];
    document.querySelectorAll('details.activity-card').forEach(details=>details.setAttribute('open',''));
  });
  addEventListener('afterprint',()=>{
    closedBeforePrint.forEach(details=>details.removeAttribute('open'));
    closedBeforePrint=[]; openHash();
  });
  document.querySelector('[data-print]').addEventListener('click',()=>{
    document.querySelectorAll('details.activity-card').forEach(details=>details.setAttribute('open',''));
    setTimeout(()=>window.print(),50);
  }); update();
})();
