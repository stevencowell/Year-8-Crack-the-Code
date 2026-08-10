(() => {
  function rotate(correct, wrongA, wrongB, index) {
    const sets = [[correct, wrongA, wrongB], [wrongA, correct, wrongB], [wrongA, wrongB, correct]];
    const options = sets[index % 3];
    return { options, answer: options.indexOf(correct) };
  }

  function buildQuestions(s, review) {
    const records = [
      [`Which statement best defines ${s.term}?`, s.definition, 'a decorative feature that has no effect on the system', 'a task completed only after the final project'],
      [`What is the main purpose of ${s.term} here?`, s.purpose, 'to remove the need for testing', 'to replace the teacher’s current directions'],
      ['Which action best applies the theory?', s.action, s.badAction, 'change several unrelated parts and hope'],
      ['Which action is least consistent with the theory?', s.badAction, s.action, s.control],
      ['What is the strongest likely benefit?', s.benefit, 'every constraint disappears', 'the first idea becomes automatically correct'],
      ['Which risk should the designer recognise?', s.risk, 'the website heading changing colour', 'having to explain a justified decision'],
      ['Which response provides the best control?', s.control, s.badAction, 'continue without checking because time is limited'],
      ['Which evidence would best demonstrate understanding?', s.evidence, 'the word “done” with no explanation', 'an unrelated screenshot with no caption'],
      [`Which correction best addresses the misconception “${s.misconception}”?`, s.correction, 'the misconception is always correct', 'evidence and definitions are unnecessary'],
      [`${s.scenario} What should happen next?`, s.response, s.badAction, 'hide the result and remove it from the record']
    ];
    return records.map((record, index) => ({ q: record[0], ...rotate(record[1], record[2], record[3], index), review }));
  }

  COURSE_MODULES.forEach(module => {
    module.sections.forEach((section, index) => {
      section.learningId = `m${module.id}s${index + 1}`;
      section.questions = buildQuestions(section.learning, section.title);
      section.written = {
        id: `m${module.id}-response-${index + 1}`,
        label: section.written.prompt,
        clarify: section.written.clarify,
        steps: [
          'Read the question and return to the precise theory section if a term is unclear.',
          'Select the most relevant evidence, code, data or system detail.',
          'Explain the connection using because, so or therefore.',
          'Check that every part of the prompt is answered specifically.'
        ],
        starter: section.written.starter,
        example: section.written.example
      };
    });
    module.prompts = module.sections.map(section => ({ id: section.written.id, label: section.written.label }));
  });
})();
