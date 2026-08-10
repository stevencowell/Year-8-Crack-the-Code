const COURSE_ACTIVITIES = [
  {
    id:1,title:'Control-system detective',source:'Prepare for the hardware and IPO work.',
    goal:'Identify one complete signal path, then connect the same thinking to the fixed ThinkerShield hardware.',
    guide:['Study the IPO and pin-map diagrams before writing.','Choose one everyday control system and name the real input, rule and output.','Use the fixed pin map to plan the final alarm and state one check you will make before connecting or uploading.'],
    fields:[['system','Choose an everyday control system.'],['input','What information enters it?'],['process','What rule or decision is applied?'],['output','What changes as a result?'],['hardware','Map the final alarm inputs and outputs to their fixed pins.'],['check','What will you check before connecting or uploading?']]
  },
  {
    id:2,title:'Getting Flashy laboratory',source:'Source pathway 1–2: Getting Flashy and Even Flashier.',
    goal:'Predict, build and explain a visible LED sequence using the correct sketch structure and deliberate timing.',
    guide:['Read the annotated sketch and compare the two timing diagrams.','Predict the first LED behaviour before uploading.','Under teacher direction, test the supplied task, change one delay only and compare the new cycle with your prediction.','Record the observed sequence and any verification or upload fault you corrected.'],
    fields:[['prediction','Predict the first LED behaviour before upload.'],['result','Record the actual result.'],['timing','Change one delay value. What changed?'],['two-led-plan','Plan a two-LED sequence with exact timing.'],['fault','Record one verification or upload fault and its correction.'],['evidence','What evidence proves the sequence repeated correctly?']]
  },
  {
    id:3,title:'Algorithm and flowchart studio',source:'Plan code before typing it.',
    goal:'Represent one alarm rule as an ordered algorithm, pseudocode and a two-path decision.',
    guide:['Use the dry-run diagram to follow a sample value through the rule.','Read the flowchart from START and follow both the YES and NO arrows.','Write your own repeating alert logic in three matching forms.','Dry-run one value for each path and correct any missing or ambiguous step.'],
    fields:[['algorithm','Write the ordered steps for a repeating alert.'],['pseudocode','Rewrite the same logic as pseudocode.'],['condition','State the exact decision question.'],['true-path','What happens when the condition is true?'],['false-path','What happens when it is false?'],['dry-run','Dry-run both paths and record any correction.']]
  },
  {
    id:4,title:'POT investigation laboratory',source:'Source pathway 3–5: POT Basics, A Light Dimmer and POT LED Bouncer.',
    goal:'Collect changing A5 data, describe its pattern and map the measured range to a useful output.',
    guide:['Read the sample A5 graph and mapping diagram before collecting data.','Under teacher direction, measure low, middle and high potentiometer positions.','Compare your range with the sample pattern; do not copy the sample as your measurement.','Predict three mapped outputs, test them and explain how calibration changed the code choice.'],
    fields:[['low','Lowest observed A5 reading and knob condition.'],['middle','Middle observed A5 reading and knob condition.'],['high','Highest observed A5 reading and knob condition.'],['map','State the measured input and intended output ranges.'],['prediction','Predict three mapped outputs.'],['bouncer','Explain how the LED Bouncer uses changing data.'],['calibration','What did calibration change in your code choice?']]
  },
  {
    id:5,title:'LDR night-light investigation',source:'Source pathway 6–7: LDR Basics and LDR Night Light.',
    goal:'Use repeated A4 evidence to choose, test and justify a light threshold.',
    guide:['Use the threshold and calibration diagrams to distinguish measured ranges from the decision boundary.','Collect repeated bright, normal and covered readings under teacher direction.','Describe whether A4 rises or falls as light decreases.','Choose a threshold from your evidence, then test immediately below, at and above it plus a recovery condition.'],
    fields:[['bright','Record repeated A4 readings in bright conditions.'],['normal','Record repeated A4 readings in normal conditions.'],['covered','Record repeated A4 readings when covered.'],['direction','Does the reading rise or fall as light decreases?'],['threshold','Choose and justify a threshold.'],['trigger','Record the alert test result.'],['recovery','Record what happened when light returned.']]
  },
  {
    id:6,title:'Button and toggle laboratory',source:'Source pathway 8–9: Push Button Basics and Get A Toggle On.',
    goal:'Observe the real pin 7 states, build a complete if/else rule and trace stored toggle state.',
    guide:['Read the truth table, then observe pin 7 when released and pressed instead of guessing.','Write the condition and define every output in both branches.','Use the state diagram to trace two recognised presses.','Record the teacher-directed press-recognition or bounce-control method separately from the core logic.'],
    fields:[['released','Value read from pin 7 when released.'],['pressed','Value read from pin 7 when pressed.'],['condition','Write the correct pressed-state condition.'],['true-output','List every output in the true branch.'],['false-output','List every output in the false branch.'],['state-trace','Trace the Boolean through two recognised presses.'],['bounce','Record the teacher-directed press-recognition method.']]
  },
  {
    id:7,title:'Buzzer and pitch laboratory',source:'Source pathway 10–12: Buzzer Basics, Pitch Changer and Play a Song.',
    goal:'Connect frequency, mapped sensor data and note duration to a controlled audible signal.',
    guide:['Read the frequency scale and low–high–low timeline before testing sound.','Follow current teacher directions for short buzzer tests and record one frequency with its perceived pitch.','Trace the signal from A5 through mapping to tone on pin 3.','Explain where noTone stops sound and how the array, loop and function create an ordered sequence.'],
    fields:[['tone','Record one tested frequency and perceived pitch.'],['silence','Where does the program call noTone?'],['input-range','State the calibrated A5 range.'],['frequency-range','State the tested mapped frequency range.'],['trace','Trace A5 data to buzzer pitch.'],['sequence','Explain the jobs of the note array, loop and function.'],['class-control','Current classroom sound-testing directions: Teacher to confirm.']]
  },
  {
    id:8,title:'Combined-system challenge lab',source:'Source pathway 13–15: Electronic Dice, Buzzing Light Meter and LED Magic Sign.',
    goal:'Decompose a combined challenge, trace its array correctly and test one subsystem at a time.',
    guide:['Use the array diagram to confirm valid indexes, then use the subsystem diagram to plan the test order.','Choose the combined challenge actually completed in class.','Identify its input, processing rules, outputs and any array used.','Test input, processing and outputs separately before recombining; record one interaction fault and correction.'],
    fields:[['challenge','Choose the combined challenge completed.'],['input','Identify its input subsystem.'],['processing','Identify its processing rules.'],['outputs','Identify every output.'],['array','Explain one array and its valid indexes.'],['iteration','Trace the first and final loop iteration.'],['test-order','Write the subsystem test order.'],['fault','Record one interaction fault and correction.']]
  },
  {
    id:9,title:'Final alarm design studio',source:'Source pathway 16: Final Alarm Code.',
    goal:'Turn the final alarm need into aligned criteria, representations, code evidence and test cases.',
    guide:['Use the need–criterion–test diagram to write a focused brief and at least five observable criteria.','Use the alignment diagram to cross-check the pin map, IPO description, pseudocode and code.','Plan normal, trigger, boundary and recovery tests before judging the design.','Record code location and feedback only through the current teacher-confirmed process.'],
    fields:[['brief','What will the alarm protect and for whom?'],['criteria','Write at least five testable criteria.'],['pin-map','Write the final pin map.'],['ipo','Describe the complete input–process–output flow.'],['pseudocode','Write complete normal and alert pseudocode.'],['code-record','Paste the important code or record the teacher-confirmed file location.'],['test-cases','Write five test cases including boundary and recovery.'],['feedback','Record teacher or peer feedback if authorised.']]
  },
  {
    id:10,title:'Testing and evaluation builder',source:'Use project evidence to debug, evaluate and back up.',
    goal:'Use one-change debugging and criterion evidence to evaluate the finished alarm honestly.',
    guide:['Follow the debugging cycle from observed fault to one likely cause, one change and a repeat of the same test.','Use the evaluation diagram to connect each criterion to actual test evidence and a defensible judgement.','Recommend precise improvements that respond to the recorded evidence.','Record the code version and folio backup; the formal submission route remains Teacher to confirm.'],
    fields:[['fault','Describe one reproducible fault.'],['hypothesis','State the likely cause.'],['change','Record the one change made.'],['retest','Record the retest result.'],['evaluation','Evaluate the alarm against at least five criteria.'],['improvement','Name three precise improvements.'],['learning','Explain the most useful coding idea learned.'],['backup','Record the code version and folio backup completed.'],['submission','Current submission route: Teacher to confirm.']]
  }
];
