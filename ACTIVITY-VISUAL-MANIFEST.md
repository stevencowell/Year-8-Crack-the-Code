# Crack the Code activity visual manifest

- Build ID: `crack-the-code-activity-visuals-v1-20260811`
- Release state: `Local-only`
- Source ledger digest: `3C1317E5541DA01CB3612F3328C07987B1B790583715CFD758098F2F35BFD65D`
- Diagram source: `activity-visuals.js`
- Diagram source digest: `91CE147E038D068B93BA5DD54C3C90BABB2E2F1442E393F7CE00BA2A141397F1`
- Full-resolution asset routes: `assets/activity-visuals/ctc-activity-01.svg` through `ctc-activity-20.svg`
- Full-resolution asset-set digest: `1237ECE44C9A776B25E93059F3AF77BFAB871D1742CDAAD1631603117B8582A1`
- Controlling technical boundary: button pin 7, LDR A4, potentiometer A5, LEDs pins 8–13 and buzzer pin 3
- Placements: two visuals in every Project Activity and one matched visual in every Busy Work activity
- Access: accurate alt text, a written diagram explanation and a visible `Open larger` link for every visual

## Approved diagram gaps and semantic purpose

| Gap ID | Activity visual | Encoded learning relationship |
|---|---|---|
| CTC-DG-01 | IPO signal path | LDR A4 data → threshold comparison → LEDs and buzzer |
| CTC-DG-02 | Fixed pin map | Exact authorised ThinkerShield component-to-pin relationships |
| CTC-DG-03 | Sketch execution | `setup()` once, then repeating `loop()` commands |
| CTC-DG-04 | LED timing | Complete cycle equals ON plus OFF duration |
| CTC-DG-05 | Algorithm dry run | Read → compare → select branch → record prediction |
| CTC-DG-06 | Decision flowchart | A4 input, decision diamond and labelled YES/NO outputs |
| CTC-DG-07 | Potentiometer graph | Sample A5 evidence trend, maximum and range |
| CTC-DG-08 | Mapping | Translate 0–1023 input data to 0–5 output level |
| CTC-DG-09 | Threshold boundary | Values below 400 alert; 400 and above normal |
| CTC-DG-10 | LDR calibration ranges | Compare bright, dim and covered sample ranges before testing |
| CTC-DG-11 | Button truth table | Reading → condition → branch → LED result |
| CTC-DG-12 | Toggle state | Recognised presses invert stored Boolean state |
| CTC-DG-13 | Frequency and pitch | 150, 550 and 1200 Hz as low, middle and high reference points |
| CTC-DG-14 | Tone sequence | Ordered low–high–low 300 ms note pattern |
| CTC-DG-15 | Array indexes | Four worked values occupy indexes 0–3; stop before 4 |
| CTC-DG-16 | Subsystem testing | Verify input, processing and outputs before recombination |
| CTC-DG-17 | Brief to test | Need → observable criterion → evidence-gathering test |
| CTC-DG-18 | Representation alignment | Pin map, IPO, pseudocode and code describe the same system |
| CTC-DG-19 | Debug cycle | Observed fault → likely cause → one change → same retest |
| CTC-DG-20 | Evaluation chain | Criterion → test evidence → judgement → feasible improvement |

## Orientation and data-status corrections

- CTC-DG-02 uses the approximate physical component layout shown in the MAAS ThinkerShield publication, while the course Drive masters remain authoritative for the current pin boundary: <https://maas-website-media.s3.amazonaws.com/maas.museum/uploads/2016/10/GetOnWithIt-v1-2-ONLINE.pdf>.
- CTC-DG-03 now includes an OFF delay as well as an ON delay so the repeated blink remains visible.
- CTC-DG-07 and CTC-DG-10 explicitly label their numbers as fictional worked examples, not measurements from a student's board.
- CTC-DG-11 explicitly states that pressed-is-HIGH is a conditional worked rule and directs students to observe the real pin 7 states first.

## Use and reuse decision

Each Project Activity uses the two diagrams for its matching module. Each of those diagrams is reused once in the corresponding Busy Work activity because the student action and taught relationship are identical. No diagram is reused across an unrelated module, and no decorative generic image is included.

## Producer inspection

- All 20 stable SVG assets render at 1200 × 640 with no broken image.
- Exact labels and values are sourced from the current course data and Busy Work tasks.
- Desktop Project Activities use a full-width diagram for readable labels.
- At 390 px, diagrams remain inside the page, provide a swipe instruction and expose `Open larger`.
- Project Activity print produced 31 A4 pages. SHA-256: `4F6D514AAE22D50162E89172FC2A1EB50C4AAA628DA70B2820EAEE5284FFD55C`.
- Busy Work print produced 41 A4 pages with activity headings, diagrams and evidence controls. SHA-256: `51636FD11980108DAEBD0BC76B2EA61B8142EAB3A468E6641E19EFBADC946F55`.
- Final route QA: 10 Project Activity routes, 20 Busy Work routes and 20 direct SVG routes passed at desktop and 390 px; `Open larger`, autosave/reload, accessible control names, precise theory-help links, linked module containment and both print paths passed.

Producer status: `Complete`  
Independent visual verdict: `PENDING RE-AUDIT OF FINAL FROZEN CANDIDATE`
