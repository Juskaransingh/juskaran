document.addEventListener('DOMContentLoaded',function(){
  var toggle=document.querySelector('.nav-toggle');
  var menu=document.querySelector('.menu');
  if(toggle){toggle.addEventListener('click',function(){menu.classList.toggle('open')})}
  var links=document.querySelectorAll('.menu a');
  links.forEach(function(l){l.addEventListener('click',function(){menu.classList.remove('open')})});
  var observer=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('active')}})},{threshold:.15});
  document.querySelectorAll('.reveal').forEach(function(el){observer.observe(el)});
  var dietType=document.getElementById('diet-type');
  var dietCards=document.getElementById('diet-cards');
  if(dietType&&dietCards){var presets={veg:[{t:'Breakfast',d:'Oats, banana, peanut butter'},{t:'Lunch',d:'Dal, rice, salad'},{t:'Dinner',d:'Veg stir-fry, tofu'}],nonveg:[{t:'Breakfast',d:'Eggs, toast, fruit'},{t:'Lunch',d:'Chicken wrap, greens'},{t:'Dinner',d:'Grilled fish, veggies'}],highprotein:[{t:'Breakfast',d:'Greek yogurt, nuts'},{t:'Lunch',d:'Quinoa, beans, chicken'},{t:'Dinner',d:'Paneer or turkey, salad'}]};
    var render=function(k){dietCards.innerHTML='';presets[k].forEach(function(x){var c=document.createElement('div');c.className='card';var h=document.createElement('h3');h.textContent=x.t;var p=document.createElement('p');p.textContent=x.d;var a=document.createElement('a');a.className='btn btn-outline';a.href='dashboard.html';a.textContent='Add to Plan';c.appendChild(h);c.appendChild(p);c.appendChild(a);dietCards.appendChild(c)})};
    render('veg');
    dietType.addEventListener('change',function(){render(dietType.value)})}
  var weekSelect=document.getElementById('week-select');
  var workoutsCount=document.getElementById('workouts-count');
  var mealsCount=document.getElementById('meals-count');
  var saveWeek=document.getElementById('save-week');
  var progressFill=document.getElementById('progress-fill');
  if(saveWeek&&progressFill){var save=function(){var w=parseInt(workoutsCount.value||'0',10);var m=parseInt(mealsCount.value||'0',10);var score=Math.min(1,(w/5*.5+m/21*.5));progressFill.style.width=(score*100)+'%';localStorage.setItem('fitlife_week_'+weekSelect.value,JSON.stringify({w:w,m:m}))};
    saveWeek.addEventListener('click',function(){save()});
    var data=localStorage.getItem('fitlife_week_'+weekSelect.value);if(data){var obj=JSON.parse(data);workoutsCount.value=obj.w;mealsCount.value=obj.m;progressFill.style.width=(Math.min(1,(obj.w/5*.5+obj.m/21*.5))*100)+'%'}
    weekSelect.addEventListener('change',function(){var data=localStorage.getItem('fitlife_week_'+weekSelect.value);if(data){var obj=JSON.parse(data);workoutsCount.value=obj.w;mealsCount.value=obj.m;progressFill.style.width=(Math.min(1,(obj.w/5*.5+obj.m/21*.5))*100)+'%'}else{workoutsCount.value='3';mealsCount.value='12';progressFill.style.width='0%'}})}
  var bmiForm=document.getElementById('bmi-form');
  var bmiRes=document.getElementById('bmi-result');
  if(bmiForm){bmiForm.addEventListener('submit',function(e){e.preventDefault();var h=parseFloat(document.getElementById('bmi-height').value)/100;var w=parseFloat(document.getElementById('bmi-weight').value);if(!(h>0&&w>0))return;bmiRes.textContent='BMI '+(w/(h*h)).toFixed(1)+' • '+(['Underweight','Normal','Overweight','Obese'][function(v){return v<18.5?0:v<24.9?1:v<29.9?2:3}(w/(h*h))])})}
  var calForm=document.getElementById('calorie-form');
  var calRes=document.getElementById('calorie-result');
  if(calForm){calForm.addEventListener('submit',function(e){e.preventDefault();var age=parseInt(document.getElementById('cal-age').value,10);var g=document.getElementById('cal-gender').value;var h=parseFloat(document.getElementById('cal-height').value);var w=parseFloat(document.getElementById('cal-weight').value);var a=parseFloat(document.getElementById('cal-activity').value);var bmr=g==='male'?10*w+6.25*h-5*age+5:10*w+6.25*h-5*age-161;var tdee=Math.round(bmr*a);calRes.textContent='Maintenance '+tdee+' kcal • Cut '+(tdee-300)+' • Bulk '+(tdee+300)})}
  var waterForm=document.getElementById('water-form');
  var waterFill=document.getElementById('water-fill');
  var waterStatus=document.getElementById('water-status');
  var waterPlus=document.getElementById('water-plus');
  var waterMinus=document.getElementById('water-minus');
  var stepBtn=document.getElementById('step-placeholder');
  var stepStatus=document.getElementById('step-status');
  var waterGoalMl=2000;var glassMl=250;var glasses=0;var setUI=function(){var consumed=glasses*glassMl;var pct=Math.min(1,consumed/Math.max(1,waterGoalMl));waterFill.style.width=(pct*100)+'%';waterStatus.textContent=Math.round(consumed/100)/10+' L / '+Math.round(waterGoalMl/100)/10+' L'};
  if(waterForm){waterForm.addEventListener('submit',function(e){e.preventDefault();waterGoalMl=Math.round(parseFloat(document.getElementById('water-weight').value)*35);glassMl=Math.round(parseFloat(document.getElementById('glass-size').value));glasses=0;setUI();localStorage.setItem('fitlife_water_goal',JSON.stringify({goal:waterGoalMl,glass:glassMl}))})}
  if(waterPlus){waterPlus.addEventListener('click',function(){glasses++;setUI();localStorage.setItem('fitlife_water_glasses',glasses)})}
  if(waterMinus){waterMinus.addEventListener('click',function(){glasses=Math.max(0,glasses-1);setUI();localStorage.setItem('fitlife_water_glasses',glasses)})}
  var savedWater=localStorage.getItem('fitlife_water_goal');if(savedWater){var obj=JSON.parse(savedWater);waterGoalMl=obj.goal;glassMl=obj.glass}
  var savedGlasses=localStorage.getItem('fitlife_water_glasses');if(savedGlasses){glasses=parseInt(savedGlasses,10)||0}
  if(waterFill&&waterStatus){setUI()}
  if(stepBtn&&stepStatus){stepBtn.addEventListener('click',function(){stepStatus.textContent='Step counter is coming soon'})}
  var pForm=document.getElementById('profile-form');
  var pStatus=document.getElementById('prof-status');
  if(pForm){pForm.addEventListener('submit',function(e){e.preventDefault();var data={name:document.getElementById('prof-name').value,major:document.getElementById('prof-major').value,year:document.getElementById('prof-year').value,height:document.getElementById('prof-height').value,weight:document.getElementById('prof-weight').value};localStorage.setItem('fitlife_profile',JSON.stringify(data));pStatus.textContent='Saved'})
    var saved=localStorage.getItem('fitlife_profile');if(saved){var obj=JSON.parse(saved);document.getElementById('prof-name').value=obj.name||'';document.getElementById('prof-major').value=obj.major||'';document.getElementById('prof-year').value=obj.year||'Freshman';document.getElementById('prof-height').value=obj.height||170;document.getElementById('prof-weight').value=obj.weight||65}}
  var mealTable=document.getElementById('meal-table');
  var mealSave=document.getElementById('meal-save');
  var mealLoad=document.getElementById('meal-load');
  if(mealSave&&mealTable){mealSave.addEventListener('click',function(){var rows=mealTable.querySelectorAll('tbody tr');var plan=[];rows.forEach(function(r){var t=r.querySelectorAll('td');plan.push({day:t[0].textContent,breakfast:t[1].textContent,lunch:t[2].textContent,dinner:t[3].textContent})});localStorage.setItem('fitlife_meal_plan',JSON.stringify(plan))})}
  if(mealLoad&&mealTable){mealLoad.addEventListener('click',function(){var suggestions=[['Mon','Yogurt, berries','Grain bowl','Veg curry'],['Tue','Omelet','Chicken salad','Rice, beans'],['Wed','Oats','Wrap','Stir-fry'],['Thu','Smoothie','Pasta + greens','Soup'],['Fri','Toast + eggs','Burrito bowl','Fish + salad'],['Sat','Pancakes','Sushi','Pizza + salad'],['Sun','Bagel + cream cheese','Couscous','Roast veggies']];var rows=mealTable.querySelectorAll('tbody tr');rows.forEach(function(r,i){var t=r.querySelectorAll('td');t[1].textContent=suggestions[i][1];t[2].textContent=suggestions[i][2];t[3].textContent=suggestions[i][3]})})}
  var canvas=document.getElementById('progress-canvas');
  var progForm=document.getElementById('progress-form');
  var progDay=document.getElementById('prog-day');
  var progWeight=document.getElementById('prog-weight');
  var progCal=document.getElementById('prog-cal');
  var progWork=document.getElementById('prog-workouts');
  var progAction=document.getElementById('prog-action');
  var series=JSON.parse(localStorage.getItem('fitlife_progress_series')||'null')||{days:[1,2,3,4,5,6,7],weight:[65,65,65,65,65,65,65],calories:[2200,2200,2200,2200,2200,2200,2200],workouts:[1,1,1,1,1,1,1]};
  var draw=function(){if(!canvas)return;var ctx=canvas.getContext('2d');ctx.clearRect(0,0,canvas.width,canvas.height);var w=canvas.width;var h=canvas.height;var pad=50;var gw=w-pad*2;var gh=h-pad*2;ctx.strokeStyle='#e2e8f0';ctx.lineWidth=1;ctx.strokeRect(pad,pad,gw,gh);var maxW=Math.max.apply(null,series.weight);var minW=Math.min.apply(null,series.weight);var maxC=Math.max.apply(null,series.calories);var maxWo=Math.max.apply(null,series.workouts);var x=function(i){return pad+(gw/6)*i};
    var yWeight=function(v){var range=Math.max(1,maxW-minW);return pad+gh-(v-minW)/range*gh};
    var yCal=function(v){return pad+gh-(v)/maxC*gh};
    var yWo=function(v){return pad+gh-(v)/Math.max(1,maxWo)*gh};
    ctx.fillStyle='#64748b';for(var i=0;i<7;i++){ctx.fillText('D'+(i+1),x(i),h-pad+16)}
    ctx.strokeStyle='#22c55e';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x(0),yWeight(series.weight[0]));for(var i=1;i<7;i++){ctx.lineTo(x(i),yWeight(series.weight[i]))}ctx.stroke();
    ctx.strokeStyle='#3b82f6';ctx.beginPath();ctx.moveTo(x(0),yCal(series.calories[0]));for(var j=1;j<7;j++){ctx.lineTo(x(j),yCal(series.calories[j]))}ctx.stroke();
    ctx.strokeStyle='#9333ea';ctx.beginPath();ctx.moveTo(x(0),yWo(series.workouts[0]));for(var k=1;k<7;k++){ctx.lineTo(x(k),yWo(series.workouts[k]))}ctx.stroke();
    ctx.fillStyle='#22c55e';ctx.fillRect(w-pad-180,pad-30,14,14);ctx.fillStyle='#0f172a';ctx.fillText('Weight',w-pad-160,pad-18);
    ctx.fillStyle='#3b82f6';ctx.fillRect(w-pad-110,pad-30,14,14);ctx.fillStyle='#0f172a';ctx.fillText('Calories',w-pad-90,pad-18);
    ctx.fillStyle='#9333ea';ctx.fillRect(w-pad-40,pad-30,14,14);ctx.fillStyle='#0f172a';ctx.fillText('Workouts',w-pad-20,pad-18)};
  draw();
  if(progForm){progForm.addEventListener('submit',function(e){e.preventDefault();var i=(parseInt(progDay.value,10)-1);if(progAction.value==='reset'){series={days:[1,2,3,4,5,6,7],weight:[65,65,65,65,65,65,65],calories:[2200,2200,2200,2200,2200,2200,2200],workouts:[1,1,1,1,1,1,1]};localStorage.setItem('fitlife_progress_series',JSON.stringify(series));draw();return}series.weight[i]=parseFloat(progWeight.value);series.calories[i]=parseFloat(progCal.value);series.workouts[i]=parseInt(progWork.value,10);localStorage.setItem('fitlife_progress_series',JSON.stringify(series));draw()})}
  var cForm=document.getElementById('contact-form');
  var cStatus=document.getElementById('contact-status');
  if(cForm){cForm.addEventListener('submit',function(e){e.preventDefault();var n=document.getElementById('contact-name').value.trim();var m=document.getElementById('contact-email').value.trim();var msg=document.getElementById('contact-message').value.trim();if(!n||!m||!msg){cStatus.textContent='Please complete all fields';return}cStatus.textContent='Message sent. We will reply soon'})}
});