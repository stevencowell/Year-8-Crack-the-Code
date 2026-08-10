(() => {
  const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const nameKey='crackthecode:student-name';
  const name=document.querySelector('[data-student-name]');
  name.value=localStorage.getItem(nameKey)||'';
  name.addEventListener('input',()=>localStorage.setItem(nameKey,name.value));

  const stages=[
    {id:'foundation',label:'Stage 1',title:'Understand and plan the system',modules:[1,2,3]},
    {id:'inputs',label:'Stage 2',title:'Read inputs and make decisions',modules:[4,5,6,7]},
    {id:'final',label:'Stage 3',title:'Combine, produce and evaluate',modules:[8,9,10]}
  ];
  const moduleRoot=document.querySelector('[data-module-evidence]');
  moduleRoot.innerHTML=stages.map(stage=>`<section class="folio-stage" id="folio-stage-${stage.id}"><header><p class="eyebrow">${stage.label}</p><h3>${stage.title}</h3><p>${stage.modules.length} modules · ${stage.modules.length*3} guided responses</p></header><div class="folio-stage-modules">${stage.modules.map(moduleId=>{
    const module=COURSE_MODULES.find(item=>item.id===moduleId);
    return `<article class="folio-module-panel"><div class="folio-module-heading"><span>${String(module.id).padStart(2,'0')}</span><div><p>Module ${module.id}</p><h4>${esc(module.title)}</h4></div><a href="modules/module-${String(module.id).padStart(2,'0')}.html">Open module →</a></div><div class="folio-response-grid">${module.sections.map((section,index)=>`<div class="folio-response-card"><p class="response-index">Response ${index+1}</p><label for="folio-${section.written.id}">${esc(section.written.label)}</label><textarea id="folio-${section.written.id}" data-key="crackthecode:${section.written.id}" placeholder="Open Module ${module.id} to use the response guide."></textarea><a href="modules/module-${String(module.id).padStart(2,'0')}.html#section-${index+1}">Return to precise theory →</a></div>`).join('')}</div></article>`;
  }).join('')}</div></section>`).join('');

  const activityRoot=document.querySelector('[data-activity-evidence]');
  activityRoot.innerHTML=COURSE_ACTIVITIES.map(activity=>`<article class="card activity-summary-card"><div class="summary-card-heading"><span>${String(activity.id).padStart(2,'0')}</span><div><p class="eyebrow">Project stage</p><h3>${esc(activity.title)}</h3></div></div><div class="activity-summary-fields">${activity.fields.map(([id,label])=>`<div class="activity-evidence"><strong>${esc(label)}</strong><p data-activity-value="crackthecode:activity:${activity.id}:${id}">No response saved yet.</p></div>`).join('')}</div><p><a href="activities.html#activity-${activity.id}">Open activity →</a></p></article>`).join('');

  const busyRoot=document.querySelector('[data-busy-evidence]');
  busyRoot.innerHTML=BUSY_WORK_ACTIVITIES.map(activity=>`<article class="busy-folio-card"><span class="busy-number">${String(activity.id).padStart(2,'0')}</span><div><p>Module ${activity.module}</p><h3>${esc(activity.title)}</h3><p data-busy-status="${activity.id}">Not complete</p><blockquote data-busy-reflection="${activity.id}">No reflection saved yet.</blockquote><a href="busy-work.html#busy-${String(activity.id).padStart(2,'0')}">Open Busy Work activity →</a></div></article>`).join('');

  const refresh=()=>{
    let responses=0;
    document.querySelectorAll('[data-key]').forEach(area=>{area.value=localStorage.getItem(area.dataset.key)||'';if(area.value.trim().length>=20)responses++;});
    const startedActivities=new Set();
    document.querySelectorAll('[data-activity-value]').forEach(node=>{const value=localStorage.getItem(node.dataset.activityValue)||'';node.textContent=value||'No response saved yet.';if(value.trim())startedActivities.add(node.dataset.activityValue.match(/activity:(\d+):/)?.[1]);});
    let busyComplete=0;
    BUSY_WORK_ACTIVITIES.forEach(activity=>{const complete=localStorage.getItem(`crackthecode:busy:completed:${activity.id}`)==='true';if(complete)busyComplete++;document.querySelector(`[data-busy-status="${activity.id}"]`).textContent=complete?'Complete':'Not complete';document.querySelector(`[data-busy-reflection="${activity.id}"]`).textContent=localStorage.getItem(`crackthecode:busy:${activity.id}:reflection`)||'No reflection saved yet.';});
    document.querySelector('[data-response-progress]').textContent=`${responses} / 30`;
    document.querySelector('[data-project-progress]').textContent=`${startedActivities.size} / 10`;
    document.querySelector('[data-busy-folio-progress]').textContent=`${busyComplete} / 20`;
  };
  document.querySelectorAll('[data-key]').forEach(area=>{let timer;area.addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(()=>{localStorage.setItem(area.dataset.key,area.value);refresh();},250);});});
  document.querySelector('[data-backup]').addEventListener('click',()=>{const data={version:2,course:'Crack the Code',exported:new Date().toISOString(),storage:{}};for(let i=0;i<localStorage.length;i++){const key=localStorage.key(i);if(key?.startsWith('crackthecode:'))data.storage[key]=localStorage.getItem(key);}const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download=`crack-the-code-folio-${new Date().toISOString().slice(0,10)}.json`;link.click();URL.revokeObjectURL(link.href);});
  document.querySelector('[data-restore]').addEventListener('change',async event=>{const file=event.target.files[0];if(!file)return;try{const data=JSON.parse(await file.text());if(data.course!=='Crack the Code'||!data.storage)throw new Error('wrong file');Object.entries(data.storage).forEach(([key,value])=>{if(key.startsWith('crackthecode:'))localStorage.setItem(key,String(value));});name.value=localStorage.getItem(nameKey)||'';refresh();alert('Crack the Code backup restored on this device.');}catch(_){alert('That file is not a valid Crack the Code backup.');}event.target.value='';});
  document.querySelector('[data-print]').addEventListener('click',()=>window.print());
  refresh();
})();
