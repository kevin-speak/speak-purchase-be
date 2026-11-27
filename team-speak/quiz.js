// Team Speak — character questionnaire pages.
// Each page sets <body data-hero="catcher|planner|trainer|leader">; this script
// renders intro → pick-your-situation list → result into #quiz.
// The flow mirrors the "English Pharmacy" event page (symptom → cause →
// prescription → statistic). Mock only: nothing is sent anywhere.
(function () {
  'use strict';

  const TRY_URL = 'https://app.speak.com/tw-zh/try?sale=tw-2026-299discount';

  // Per hero: intro copy plus a list of situations. Each situation is
  //   e: emoji, s: the situation (shown as the option and under "Your situation"),
  //   c: why it happens, m: the hero's move (the "prescription" name),
  //   d: what Speak does, q: the hero's one-liner, p: PLACEHOLDER percentage.
  const HEROES = {
    catcher: {
      name: 'The Catcher',
      icon: '🧤',
      title: 'Mistakes keep slipping out?',
      sub: 'Pick your situation and the Catcher will plan the save.',
      chips: ['Instant Replay', 'Tone Check'],
      feature: 'Real-time AI corrections',
      list: [
        { e: '😳', s: 'I know it’s wrong the second it leaves my mouth.', c: 'The only feedback you get is your own, after the moment has passed. With nothing to confirm the right version, the same slip comes back next time.', m: 'Instant Replay', d: 'Every sentence is checked as you speak. You see the fixed version right away and say it again while it’s fresh.', q: 'Catch it once, out loud, and it stops coming back.', p: 31 },
        { e: '🤐', s: 'Nobody corrects me, so I never find out what I get wrong.', c: 'Colleagues understand you well enough and are too polite to correct you. Years can pass with the same habits in place.', m: 'Honest Mirror', d: 'After each conversation you get a clear list of what to fix, with no judgment and no awkwardness.', q: 'I’ll tell you what your colleagues won’t.', p: 27 },
        { e: '😬', s: 'I worry about making a mistake and miss my moment to speak.', c: 'At work every sentence feels like it counts, so you check it twice in your head. By then the conversation has moved on.', m: 'Safety Net', d: 'Practice the same conversations with an AI where mistakes cost nothing, until speaking first feels safe.', q: 'Make the mistakes here. Nothing gets held against you.', p: 38 },
        { e: '✍️', s: 'My emails are fine, but my grammar falls apart out loud.', c: 'Writing gives you time to edit. Speaking doesn’t, and grammar you know on paper hasn’t become automatic yet.', m: 'Live Edit', d: 'Spoken drills with sentence-by-sentence corrections move grammar from “I know it” to “I say it”.', q: 'You already know the rule. Let’s make your mouth know it.', p: 24 },
        { e: '🧊', s: 'People say I sound blunt, and I’m not sure why.', c: 'Directly translated sentences are often correct but miss the softeners that English uses for requests and disagreement.', m: 'Tone Check', d: 'Speak flags lines that land too hard or too soft and shows the phrasing a native-level colleague would use.', q: 'Same message, better landing.', p: 19 },
        { e: '👂', s: 'I get asked to repeat myself a lot.', c: 'A few sounds or stress patterns are getting misheard, and no one has told you which ones.', m: 'Sound Check', d: 'Speech recognition pinpoints the words that don’t land so you can repeat them until they do.', q: 'Let’s find the three words causing all the trouble.', p: 22 }
      ]
    },
    planner: {
      name: 'The Planner',
      icon: '🧭',
      title: 'Studying without a plan?',
      sub: 'Pick your situation and the Planner will map the route.',
      chips: ['Level Map', 'Memory Loop'],
      feature: 'Progress tracking & weak-spot review',
      list: [
        { e: '🤷', s: 'I don’t know what I should study at my level.', c: 'Most material isn’t sorted by level, so you bounce between lessons that are too easy and too hard.', m: 'Level Map', d: 'A structured course path by level, so the next lesson is always chosen for you.', q: 'Follow the map. I’ve already picked the next step.', p: 32 },
        { e: '🫥', s: 'I learn something, then forget it within a week.', c: 'Without review at the right moment, new phrases fade before you ever get to use them at work.', m: 'Memory Loop', d: 'Speak tracks what you missed and schedules short reviews just before you’d forget.', q: 'You don’t have a bad memory. You have no review schedule.', p: 35 },
        { e: '😮‍💨', s: 'I start strong, then stop after two weeks.', c: 'The plan depended on motivation and long sessions. The first busy week broke it.', m: 'Streak Plan', d: 'Short daily sessions and a visible streak make the habit easy to keep on your worst days.', q: 'Small and daily beats big and never.', p: 41 },
        { e: '📉', s: 'I study, but I can’t tell if I’m improving.', c: 'Speaking progress is slow and hard to feel from the inside, so it looks like nothing is happening.', m: 'Progress Radar', d: 'Spoken-sentence counts and a shrinking weak-spot list show the progress you can’t hear yourself.', q: 'You’re improving. Let me show you the numbers.', p: 26 },
        { e: '⏰', s: 'I never have time to study.', c: 'Most courses assume a free hour. Your day comes in ten-minute gaps.', m: 'Pocket Sessions', d: 'Lessons are split into pieces you can finish in a coffee break, and they pick up where you stopped.', q: 'Give me ten minutes. I’ll make them count.', p: 44 },
        { e: '🎯', s: 'I have a deadline coming and no plan to hit it.', c: 'With an interview or a trip on the calendar, general study spreads your effort too thin.', m: 'Countdown Route', d: 'Focus only on the scenarios you’ll face and rehearse them until they’re automatic.', q: 'Tell me the date. We’ll work backwards.', p: 17 }
      ]
    },
    trainer: {
      name: 'The Trainer',
      icon: '⚡',
      title: 'Freeze when it’s your turn?',
      sub: 'Pick your situation and the Trainer will set your drills.',
      chips: ['Speed Rounds', 'Pressure Test'],
      feature: 'AI workplace roleplay',
      list: [
        { e: '🥶', s: 'I freeze when it’s my turn to speak.', c: 'You’ve studied English far more than you’ve spoken it. The words are there, but your mouth hasn’t had the reps.', m: 'Warm-up Rounds', d: 'Start with short guided exchanges so your first sentence comes out without thinking.', q: 'Nobody freezes on rep one hundred.', p: 36 },
        { e: '💭', s: 'I translate in my head and the topic moves on.', c: 'Building the sentence in your own language first takes a few seconds, and meetings don’t wait.', m: 'Speed Rounds', d: 'Quick back-and-forth roleplays train you to answer in English directly, at real conversation speed.', q: 'Faster. Again. You’ll thank me in the meeting.', p: 39 },
        { e: '🤏', s: 'I answer in one sentence and then stop.', c: 'Short answers feel safe, but they make you sound less capable than you are.', m: 'Stretch Reps', d: 'The AI follows up on what you say, so you practice adding a reason and an example every time.', q: 'Good. Now tell me why.', p: 23 },
        { e: '🌀', s: 'I can talk, but I ramble and lose my point.', c: 'Without a go-to structure, you think out loud and the point arrives late, or never.', m: 'Point-First Drill', d: 'Rehearse updates and answers that lead with the conclusion and finish in thirty seconds.', q: 'Point first. Details second. Stop.', p: 18 },
        { e: '😰', s: 'I’m fine in practice, then panic in the real thing.', c: 'Your practice is calm and predictable. Real interviews and client calls are neither.', m: 'Pressure Test', d: 'An AI interviewer or client that interrupts and pushes back, so the real conversation feels easy.', q: 'I’ll be tougher than they are. That’s the idea.', p: 29 },
        { e: '🙋', s: 'I have nobody to practice speaking with.', c: 'Speaking needs a partner, and tutors are expensive and only free once or twice a week.', m: 'Sparring Partner', d: 'An AI partner that plays your interviewer, manager or client whenever you have ten minutes.', q: 'I’m free now. And at 2 a.m.', p: 33 }
      ]
    },
    leader: {
      name: 'The Leader',
      icon: '⭐',
      title: 'Ready to lead in English?',
      sub: 'Pick your situation and the Leader will hand you the playbook.',
      chips: ['Take the Chair', 'Hold the Line'],
      feature: '100+ workplace scenarios & business courses',
      list: [
        { e: '🪑', s: 'In English meetings I attend, but I never lead.', c: 'Running a meeting uses a set of phrases nobody teaches: opening, bringing people in, parking tangents, closing.', m: 'Take the Chair', d: 'Learn the meeting playbook, then run the whole meeting with the AI from agenda to action items.', q: 'Don’t just join the meeting. Run it.', p: 34 },
        { e: '💬', s: 'My feedback in English comes out too harsh or too vague.', c: 'Feedback depends on nuance. In a second language you either soften it until it disappears or lose the cushioning.', m: 'Straight Talk', d: 'Practice saying the hard thing clearly and respectfully, and agreeing on what changes next.', q: 'Clear is kind. Let’s practice clear.', p: 21 },
        { e: '📊', s: 'When I present to leadership, I lose my authority.', c: 'Hedging words and long wind-ups creep in under pressure, and the ask gets buried.', m: 'Boardroom Voice', d: 'Rehearse leading with the ask, backing it with numbers and handling the tough question.', q: 'Say the ask in the first ten seconds.', p: 28 },
        { e: '🤝', s: 'In negotiations I give in too fast.', c: 'Holding a position takes specific language. Without it, agreeing is the easiest sentence to say.', m: 'Hold the Line', d: 'Negotiation scenarios where the AI pushes on price and terms while you practice anchoring and trading.', q: '“Let me think about that” is a full sentence.', p: 25 },
        { e: '🎭', s: 'I’m less myself in English. No humor, no warmth.', c: 'Work English is learned as formulas, so your personality gets left in your first language.', m: 'Own Voice', d: 'Small talk and free-talk roleplays build the casual, human English that makes people follow you.', q: 'People follow people, so bring yours.', p: 30 },
        { e: '🌏', s: 'My cross-border team doesn’t quite follow what I mean.', c: 'Instructions that feel clear to you carry assumptions that don’t survive across cultures and accents.', m: 'Clear Signal', d: 'Practice briefing, confirming understanding and aligning on owners and dates, in plain English.', q: 'If they can’t repeat it back, say it again, shorter.', p: 16 }
      ]
    }
  };

  const ORDER = ['catcher', 'planner', 'trainer', 'leader'];
  const heroId = document.body.getAttribute('data-hero');
  const hero = HEROES[heroId];
  const root = document.getElementById('quiz');
  if (!hero || !root) return;

  const art = 'assets/hero-' + heroId + '.svg';
  let picked = -1;

  // Tiny DOM helper: el('div', {class: 'x'}, child, 'text', ...)
  function el(tag, attrs) {
    const node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'onclick') node.addEventListener('click', attrs[k]);
      else node.setAttribute(k, attrs[k]);
    });
    for (let i = 2; i < arguments.length; i++) {
      if (arguments[i] != null) node.append(arguments[i]);
    }
    return node;
  }

  function show(screen, focusEl) {
    screen.classList.add('quiz__fade');
    root.replaceChildren(screen);
    window.scrollTo({ top: 0 });
    if (focusEl) focusEl.focus({ preventScroll: true });
  }

  // The pill at the top of every screen doubles as the link back to the landing page.
  function pill() {
    return el('a', { class: 'quiz__pill', href: 'index.html#team' },
      el('img', { src: art, alt: '' }), 'Team Speak · ' + hero.name);
  }

  function intro() {
    show(el('section', { class: 'quiz__screen' },
      pill(),
      el('h1', { class: 'quiz__title' }, hero.title),
      el('p', { class: 'quiz__sub' }, hero.sub),
      el('div', { class: 'quiz__stage' },
        el('span', { class: 'quiz__chip quiz__chip--l' }, hero.chips[0]),
        el('span', { class: 'quiz__chip quiz__chip--r' }, hero.chips[1]),
        el('img', { src: art, alt: hero.name + ', a caped Speak mascot' })),
      el('div', { class: 'quiz__start' },
        el('span', { class: 'quiz__tip' }, '🔥 Done in 30 seconds'),
        el('button', { class: 'btn btn--cta', type: 'button', onclick: list }, 'Find my fix'))));
  }

  function list() {
    const heading = el('h2', { class: 'quiz__q', tabindex: '-1' }, 'Which one sounds like you?');
    const opts = el('div', { class: 'quiz__opts' });
    hero.list.forEach(function (item, n) {
      const btn = el('button', {
        class: 'quiz__opt' + (picked === n ? ' is-picked' : ''),
        type: 'button',
        onclick: function () {
          picked = n;
          opts.querySelectorAll('.quiz__opt').forEach(function (b) { b.classList.toggle('is-picked', b === btn); });
          setTimeout(result, 220);
        }
      }, el('span', { class: 'quiz__emoji', 'aria-hidden': 'true' }, item.e), el('span', {}, item.s));
      opts.appendChild(btn);
    });
    show(el('section', { class: 'quiz__screen quiz__screen--list' },
      pill(),
      heading,
      el('p', { class: 'quiz__hint' }, 'Pick the one closest to your situation.'),
      opts,
      el('button', { class: 'quiz__backbtn', type: 'button', onclick: intro }, '← Back')), heading);
  }

  function box(title) {
    const node = el('div', { class: 'quiz__box' }, el('h3', {}, title));
    for (let i = 1; i < arguments.length; i++) node.append(arguments[i]);
    return node;
  }

  function donut(pct) {
    const R = 52, C = 2 * Math.PI * R, NS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 120 120');
    svg.setAttribute('aria-hidden', 'true');
    ['track', 'value'].forEach(function (cls) {
      const c = document.createElementNS(NS, 'circle');
      c.setAttribute('class', cls);
      c.setAttribute('cx', 60); c.setAttribute('cy', 60); c.setAttribute('r', R);
      if (cls === 'value') {
        c.setAttribute('stroke-dasharray', C);
        c.setAttribute('stroke-dashoffset', C);
        requestAnimationFrame(function () { requestAnimationFrame(function () { c.setAttribute('stroke-dashoffset', C * (1 - pct / 100)); }); });
      }
      svg.appendChild(c);
    });
    return el('div', { class: 'quiz__donut' }, svg, el('div', {}, el('b', {}, pct + '%'), el('small', {}, 'chose this')));
  }

  function result() {
    const item = hero.list[picked];
    const heading = el('h1', { class: 'quiz__title quiz__title--result', tabindex: '-1' }, 'Your mission brief');
    const row = el('div', { class: 'quiz__others-row' });
    ORDER.filter(function (id) { return id !== heroId; }).forEach(function (id) {
      row.appendChild(el('a', { class: 'quiz__other', href: id + '.html' },
        el('img', { src: 'assets/hero-' + id + '.svg', alt: '' }), HEROES[id].name));
    });
    show(el('section', { class: 'quiz__screen quiz__screen--result' },
      pill(),
      heading,
      el('div', { class: 'quiz__move' }, item.m),
      el('div', { class: 'quiz__portrait' },
        el('img', { src: art, alt: '' }),
        el('span', { 'aria-hidden': 'true' }, hero.icon)),
      el('p', { class: 'quiz__quote' }, '“' + item.q + '”'),
      el('p', { class: 'quiz__quote-sub' }, '— ' + hero.name),
      box('Your situation', el('p', {}, item.s)),
      box('Why it happens', el('p', {}, item.c)),
      box(hero.name + '’s move',
        el('span', { class: 'quiz__rx' }, item.m),
        el('p', {}, hero.feature),
        el('p', { class: 'small' }, item.d)),
      box('You’re not alone',
        el('p', {}, item.p + '% of learners who took this questionnaire picked the same situation.'),
        el('div', { class: 'quiz__stat' },
          el('div', { class: 'quiz__stat-label' }, item.s),
          donut(item.p)),
        el('p', { class: 'quiz__foot' }, '(Placeholder figure for this mock-up. Replace with real survey data.)')),
      el('a', { class: 'btn btn--rx', href: TRY_URL }, 'Start this plan'),
      el('span', { class: 'quiz__note' }, 'Up to NT$299 off + 7-day free trial for new users'),
      el('button', { class: 'quiz__backbtn', type: 'button', onclick: list }, 'Pick a different situation'),
      el('div', { class: 'quiz__others' }, el('b', {}, 'Meet the rest of Team Speak'), row)), heading);
  }

  intro();
})();
