# Crack the Code Busy Work manifest

- Build ID: `crack-the-code-busy-work-v1-20260811`
- Scope: 20 course-specific activities, two for each of the ten taught modules
- Intended duration: about 20 minutes per activity
- Evidence model: immediate checks plus a saved student reflection; device-local autosave only
- Fixed hardware boundary: button pin 7, LDR A4, potentiometer A5, LEDs pins 8–13 and buzzer pin 3

| ID | Module | Activity | Primary mechanics |
|---|---:|---|---|
| busy-01 | 1 | Trace the signal path | matching, classification |
| busy-02 | 1 | Know the board | pin-map matching, constraint decision |
| busy-03 | 2 | Put the sketch in order | sequencing, code completion |
| busy-04 | 2 | Engineer a visible signal | calculation, timing comparison |
| busy-05 | 3 | Algorithm before upload | sequencing, trace table |
| busy-06 | 3 | Follow the branch | decision route, symbol classification |
| busy-07 | 4 | Read analogue evidence | graph interpretation, range analysis |
| busy-08 | 4 | Map data to output | mapping calculation, optimisation |
| busy-09 | 5 | Set a light threshold | threshold sorting, boundary testing |
| busy-10 | 5 | Calibrate the night light | evidence table, criterion decision |
| busy-11 | 6 | Build a truth table | truth table, logic selection |
| busy-12 | 6 | Trace a toggle | toggle simulator, state sequencing |
| busy-13 | 7 | Tune the buzzer | frequency slider, matching |
| busy-14 | 7 | Compose a coded signal | pattern builder, sequencing |
| busy-15 | 8 | Trace an array loop | array trace, loop-limit decision |
| busy-16 | 8 | Combine and test subsystems | test sequencing, system matrix |
| busy-17 | 9 | Translate the brief | brief classification, criterion matching |
| busy-18 | 9 | Align every representation | pin-map matching, evidence-chain sequencing |
| busy-19 | 10 | Debug from evidence | diagnostic route, repair sequencing |
| busy-20 | 10 | Evaluate and improve | evaluation matrix, priority decision |

## Integration contract

- Landing page: `busy-work.html`
- Direct routes: `busy-work.html#busy-01` through `busy-work.html#busy-20`
- Navigation: Busy Work appears in the shared student menu and beside Project Activities on the home page.
- Folio: completion and reflections appear in the student folio without changing existing theory or project-activity storage keys.
- Printing: the landing page prints the full evidence set; individual activities include a Print evidence action.

## QA verdict

PASS — all 20 activities render from direct routes, preserve answers after reload, give immediate feedback, expose meaningful written evidence, and reflow without horizontal overflow at 390 px.
