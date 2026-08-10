const BUSY_WORK_ACTIVITIES = [
  {id:1,module:1,title:'Trace the signal path',topic:'Input-process-output systems',minutes:20,mechanics:['matching','classification'],intro:'Build a precise control-system vocabulary, then classify real ThinkerShield parts.',challenges:[
    {type:'match',title:'Match each system term to its job',items:[['Input','data entering the system'],['Process','the rule applied to the data'],['Output','the action produced by the system'],['Feedback','evidence used to improve the response']]},
    {type:'classify',title:'Classify each item',categories:['Input','Process','Output'],items:[['button on pin 7','Input'],['LDR on A4','Input'],['if/else decision','Process'],['map() calculation','Process'],['LED on pin 10','Output'],['buzzer on pin 3','Output']]}
  ],reflection:'Explain one complete input-process-output path for an alarm.'},
  {id:2,module:1,title:'Know the board',topic:'Microcontroller, shield and fixed pin map',minutes:20,mechanics:['pin-map','constraint check'],intro:'Connect every fixed component to its authorised pin and explain why the map is a design constraint.',challenges:[
    {type:'match',title:'Complete the fixed pin map',items:[['Button','digital pin 7'],['LDR','analogue input A4'],['Potentiometer','analogue input A5'],['Six LEDs','digital pins 8-13'],['Buzzer','digital pin 3']]},
    {type:'choice',title:'Select the reliable plan',prompt:'Which plan respects the supplied ThinkerShield?',options:['Move the button to pin 2 without changing the hardware','Keep the button on pin 7 and make the code match','Use any pin because code overrides wiring'],answer:1}
  ],reflection:'Why must the pin map, algorithm and code agree before testing?'},
  {id:3,module:2,title:'Put the sketch in order',topic:'setup(), loop() and digital output',minutes:20,mechanics:['sequencing','code completion'],intro:'Reconstruct the execution order of a simple two-LED sketch.',challenges:[
    {type:'order',title:'Order the sketch actions',items:['Set pin modes in setup()','Enter loop()','Turn LED 8 HIGH','Wait for the planned delay','Turn LED 8 LOW','Repeat loop()']},
    {type:'gap',title:'Complete the digital output statements',code:['pinMode(8, ___);','digitalWrite(8, ___);','delay(___);','digitalWrite(8, ___);'],answers:['OUTPUT','HIGH','500','LOW'],options:[['INPUT','OUTPUT','HIGH'],['LOW','HIGH','OUTPUT'],['100','500','A4'],['HIGH','LOW','INPUT']]}
  ],reflection:'Describe what a student should observe when this sequence runs repeatedly.'},
  {id:4,module:2,title:'Engineer a visible signal',topic:'Timing, delay and recognisable LED patterns',minutes:20,mechanics:['calculation','timing comparison'],intro:'Calculate complete cycle times and choose timing that makes a signal recognisable.',challenges:[
    {type:'numeric',title:'Calculate each complete cycle',items:[['300 ms ON + 700 ms OFF',1000,0],['250 ms ON + 250 ms OFF',500,0],['1.2 s ON + 0.8 s OFF',2,0.01]],unit:'ms for the first two; seconds for the third'},
    {type:'choice',title:'Choose the clearer warning pattern',prompt:'A pattern must be noticed but not look permanently ON. Which is the best starting test?',options:['1 ms ON, 1 ms OFF','400 ms ON, 400 ms OFF','30 000 ms ON, 30 000 ms OFF'],answer:1}
  ],reflection:'Justify a two-LED timing pattern that communicates a deliberate warning.'},
  {id:5,module:3,title:'Algorithm before upload',topic:'Algorithms, pseudocode and dry runs',minutes:20,mechanics:['sequencing','trace table'],intro:'Turn an alarm idea into an unambiguous sequence and dry-run it before coding.',challenges:[
    {type:'order',title:'Order the alarm algorithm',items:['Read the sensor value','Compare the value with the threshold','Choose alert or normal branch','Set LED and buzzer outputs','Record the expected result','Repeat the sensing loop']},
    {type:'trace',title:'Dry-run the threshold rule: alert when value is below 350',columns:['Reading','Expected branch'],rows:[['220','alert'],['349','alert'],['350','normal'],['720','normal']]}
  ],reflection:'Explain how a dry run can expose a logic error before hardware is connected.'},
  {id:6,module:3,title:'Follow the branch',topic:'Flowcharts and conditional decisions',minutes:20,mechanics:['decision route','symbol classification'],intro:'Read a decision route and identify the correct flowchart role for each step.',challenges:[
    {type:'route',title:'Route four sensor cases',rule:'If LDR < 350, turn the warning LED ON; otherwise turn it OFF.',items:[['120','ON'],['349','ON'],['350','OFF'],['810','OFF']]},
    {type:'classify',title:'Choose the flowchart role',categories:['Start/end','Process','Decision','Input/output'],items:[['Read LDR value','Input/output'],['Is value < 350?','Decision'],['Set warning LED HIGH','Process'],['Stop test','Start/end']]}
  ],reflection:'Why must a two-way decision show both the true and false paths?'},
  {id:7,module:4,title:'Read analogue evidence',topic:'Potentiometer readings and data patterns',minutes:20,mechanics:['graph interpretation','range analysis'],intro:'Interpret a real-looking A5 data set and identify range, trend and an unusual reading.',challenges:[
    {type:'graph',title:'Interpret the A5 test graph',values:[80,210,390,575,760,930],labels:['0','20','40','60','80','100'],questions:[['Which reading is the maximum?','930'],['What is the range?','850'],['Does the data rise as the knob turns clockwise?','yes']]},
    {type:'choice',title:'Judge the evidence',prompt:'One new reading is 315 after the 80% position. What should the student do first?',options:['Delete it immediately','Repeat the reading and inspect the connection','Change the project criterion'],answer:1}
  ],reflection:'Write a short evidence statement describing the relationship between knob position and A5 data.'},
  {id:8,module:4,title:'Map data to output',topic:'Mapping and proportional response',minutes:20,mechanics:['mapping calculation','optimisation'],intro:'Convert the 0-1023 analogue range into useful LED and timing outputs.',challenges:[
    {type:'numeric',title:'Use proportional mapping',items:[['Map 0-1023 to 0-5: input 0',0,0],['Map 0-1023 to 0-5: input 512',2.5,0.1],['Map 0-1023 to 0-5: input 1023',5,0],['Map 0-1023 to 100-1000 ms: input 1023',1000,1]],unit:'mapped output'},
    {type:'choice',title:'Choose the useful mapping',prompt:'A slow knob turn should progressively light more LEDs. Which output range is most useful?',options:['0-5 LEDs','0-1023 LEDs','100-1000 LEDs'],answer:0}
  ],reflection:'Explain why calibration and limiting values may still be needed after using map().' },
  {id:9,module:5,title:'Set a light threshold',topic:'LDR readings and threshold classification',minutes:20,mechanics:['threshold sorting','boundary testing'],intro:'Sort light readings and test the exact boundary where the alarm changes state.',challenges:[
    {type:'classify',title:'Classify the readings using alert when LDR < 400',categories:['Alert','Normal'],items:[['120','Alert'],['399','Alert'],['400','Normal'],['401','Normal'],['780','Normal']]},
    {type:'trace',title:'Plan three boundary tests',columns:['Reading','Expected result'],rows:[['399','alert'],['400','normal'],['401','normal']]}
  ],reflection:'Why are 399, 400 and 401 stronger tests than three widely separated values?'},
  {id:10,module:5,title:'Calibrate the night light',topic:'Sensor calibration and recovery behaviour',minutes:20,mechanics:['evidence table','criterion decision'],intro:'Use repeated observations to choose a defensible threshold and verify recovery.',challenges:[
    {type:'table',title:'Complete the calibration record',headers:['Condition','Observed range','Chosen representative'],rows:[['bright room','720-850',''],['dim room','390-520',''],['covered sensor','80-210','']],field:'representative'},
    {type:'choice',title:'Choose a starting threshold',prompt:'Which threshold best separates the dim-room and covered-sensor ranges?',options:['100','300','800'],answer:1}
  ],reflection:'Describe how you would test both triggering and recovery around the chosen threshold.'},
  {id:11,module:6,title:'Build a truth table',topic:'Button input and if/else output',minutes:20,mechanics:['truth table','logic selection'],intro:'Translate button states into expected LED behaviour and inspect the opposite branch.',challenges:[
    {type:'trace',title:'Complete the truth table: pressed means LED ON',columns:['Button state','LED state'],rows:[['pressed','ON'],['released','OFF'],['pressed','ON'],['released','OFF']]},
    {type:'choice',title:'Choose the matching condition',prompt:'Which condition matches the rule pressed means LED ON when pressed reads HIGH?',options:['if (button == HIGH)','if (button == LOW)','if (led == A4)'],answer:0}
  ],reflection:'Explain what the else branch guarantees when the button is released.'},
  {id:12,module:6,title:'Trace a toggle',topic:'Boolean state and edge-based change',minutes:20,mechanics:['toggle simulator','state trace'],intro:'Operate a simulated push button and trace how a stored Boolean state changes.',challenges:[
    {type:'toggle',title:'Create the target output pattern',target:['ON','OFF','ON','OFF'],instruction:'Press the simulated button four times. Each press must flip the stored output state.'},
    {type:'order',title:'Order a reliable toggle routine',items:['Detect a new button press','Invert the stored Boolean state','Write the stored state to the LED','Wait for release or debounce','Listen for the next press']}
  ],reflection:'Why does a toggle need stored state instead of only reading the current button level?'},
  {id:13,module:7,title:'Tune the buzzer',topic:'Frequency, pitch and safe test planning',minutes:20,mechanics:['frequency slider','matching'],intro:'Explore how frequency changes pitch and match code values to useful descriptions.',challenges:[
    {type:'slider',title:'Set a clear mid-range test tone',min:100,max:1500,step:10,targetMin:450,targetMax:650,unit:'Hz'},
    {type:'match',title:'Match frequency to description',items:[['150 Hz','low pitch'],['550 Hz','mid-range pitch'],['1200 Hz','high pitch'],['0 Hz / noTone()','sound stopped']]}
  ],reflection:'Describe a short, teacher-approved buzzer test that avoids unnecessary continuous sound.'},
  {id:14,module:7,title:'Compose a coded signal',topic:'Tone sequences, duration and recognisable patterns',minutes:20,mechanics:['pattern builder','sequencing'],intro:'Construct a three-tone warning pattern and plan how the code steps through it.',challenges:[
    {type:'builder',title:'Build the target pattern low-high-low',slots:[['Tone 1',['low','mid','high'],'low'],['Tone 2',['low','mid','high'],'high'],['Tone 3',['low','mid','high'],'low'],['Duration',['100 ms','300 ms','2 s'],'300 ms']]},
    {type:'order',title:'Order the melody loop',items:['Choose the current note frequency','Start the tone on pin 3','Hold it for the note duration','Stop the tone','Move to the next array index']}
  ],reflection:'Explain how frequency and duration work together to make the pattern recognisable.'},
  {id:15,module:8,title:'Trace an array loop',topic:'Arrays, indexes and bounded iteration',minutes:20,mechanics:['array trace','loop sequencing'],intro:'Follow a loop through an LED-pin array without stepping beyond the valid indexes.',challenges:[
    {type:'trace',title:'Trace pins = [8, 9, 10, 11]',columns:['Index','Pin used'],rows:[['0','8'],['1','9'],['2','10'],['3','11']]},
    {type:'choice',title:'Choose the safe loop limit',prompt:'Which condition visits all four valid indexes once?',options:['i <= 4','i < 4','i > 4'],answer:1}
  ],reflection:'What fault can occur if code tries to use index 4 in this four-item array?'},
  {id:16,module:8,title:'Combine and test subsystems',topic:'Functions, subsystem tests and combined behaviour',minutes:20,mechanics:['test sequencing','system matrix'],intro:'Plan an efficient test sequence before combining sensing, light and sound.',challenges:[
    {type:'order',title:'Order the subsystem test plan',items:['Verify the sensor reading alone','Verify LED outputs alone','Verify buzzer start and stop alone','Combine sensor and LED rule','Add buzzer behaviour','Run boundary and recovery tests']},
    {type:'table',title:'Record one expected check for each subsystem',headers:['Subsystem','Expected observable evidence'],rows:[['sensor input',''],['LED output',''],['buzzer output',''],['combined alarm','']],field:'evidence'}
  ],reflection:'Explain why testing every part at once makes debugging harder.'},
  {id:17,module:9,title:'Translate the brief',topic:'Needs, criteria and testable requirements',minutes:20,mechanics:['brief classification','criterion matching'],intro:'Separate the project need from criteria and tests so the final alarm can be judged fairly.',challenges:[
    {type:'classify',title:'Classify each statement',categories:['Need','Criterion','Test'],items:[['Protect something the student cares about','Need'],['Alert changes according to input data','Criterion'],['Record results at threshold -1, threshold and threshold +1','Test'],['Outputs recover when the input returns to normal','Criterion'],['Observe normal, trigger and recovery conditions','Test']]},
    {type:'match',title:'Match each criterion to evidence',items:[['Responds to sensor data','input readings and output states'],['Produces a recognisable alert','timed LED and buzzer observations'],['Recovers to normal','recovery test result'],['Uses the fixed board','pin map checked against code']]}
  ],reflection:'Write one additional criterion that is observable, realistic and testable.'},
  {id:18,module:9,title:'Align every representation',topic:'Pin map, IPO, pseudocode and code agreement',minutes:20,mechanics:['pin-map','signal-path sequencing'],intro:'Cross-check the final alarm plan so every representation describes the same system.',challenges:[
    {type:'match',title:'Match the final-alarm elements',items:[['Light sensor input','A4'],['Button input','pin 7'],['Potentiometer input','A5'],['Warning LEDs','pins 8-13'],['Audible warning','pin 3']]},
    {type:'order',title:'Order the complete evidence chain',items:['State the need','Draw the pin map','Describe the IPO path','Write pseudocode','Build matching code','Run aligned test cases']}
  ],reflection:'Identify one mismatch that could occur between a flowchart and the final code, and how to detect it.'},
  {id:19,module:10,title:'Debug from evidence',topic:'Systematic debugging and one-change retesting',minutes:20,mechanics:['diagnostic route','repair ranking'],intro:'Follow evidence to the smallest likely fault instead of changing several things at once.',challenges:[
    {type:'route',title:'Diagnose four observations',rule:'Choose the first evidence-based action.',items:[['No serial sensor values','check connection, port and input code'],['Sensor changes but LED never changes','trace the condition and LED pin'],['LED works but buzzer continues','inspect the stop-tone path'],['Fault appears only at the threshold','run boundary cases and compare operators']]},
    {type:'order',title:'Order the debugging cycle',items:['Describe the observed fault','Predict one likely cause','Change one thing','Retest the same case','Record the result','Keep or reverse the change']}
  ],reflection:'Write a concise debugging-log entry using observation, change, result and next action.'},
  {id:20,module:10,title:'Evaluate and improve',topic:'Criterion-based evaluation and backup readiness',minutes:20,mechanics:['evaluation matrix','priority decision'],intro:'Use test evidence to make a defensible judgement and choose a feasible improvement.',challenges:[
    {type:'matrix',title:'Complete the evaluation matrix',rows:['Responds to input data','Alert is recognisable','Returns to normal','Code and pin map agree']},
    {type:'choice',title:'Choose the strongest improvement',prompt:'Tests show the alarm works but flickers near the threshold. Which improvement is best supported?',options:['Change every output pin','Add a small trigger/recovery gap and retest boundaries','Remove the sensor'],answer:1}
  ],reflection:'Write a final judgement that names a criterion, cites evidence and recommends one next action.'}
];
