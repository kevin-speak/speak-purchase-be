// Team Speak — character questionnaire pages.
// Each page sets <body data-hero="catcher|planner|trainer|leader">; this script
// renders intro → questions → result into #quiz. Mock only: nothing is sent anywhere.
(function () {
  'use strict';

  const TRY_URL = 'https://app.speak.com/tw-zh/try?sale=tw-2026-299discount';

  // Shared last question: how much time the learner has per day.
  const TIME_Q = {
    q: 'How much time can you give it each day?',
    opts: [
      { a: '5 minutes', t: '5 minutes a day', d: 'One quick session on your commute. Small, but it adds up when you never skip.' },
      { a: '10 minutes', t: '10 minutes a day', d: 'One lesson plus a short review: enough to feel a difference within two weeks.' },
      { a: '20 minutes', t: '20 minutes a day', d: 'A lesson, a roleplay and a review. This is the pace most learners keep long term.' },
      { a: '30 minutes or more', t: '30+ minutes a day', d: 'Intensive mode: lessons, free-talk roleplays and a full review every day.' }
    ]
  };

  // Each answer carries the line it adds to the result ("t" title, "d" detail).
  const HEROES = {
    catcher: {
      name: 'The Catcher',
      tagline: 'Catches every slip',
      lead: 'Tell the Catcher where your English slips at work. You’ll get a plan to catch those mistakes while you speak, so they stop following you into meetings.',
      resultTitle: 'Your catch list is ready.',
      feature: { t: 'Real-time AI corrections', d: 'Sentence-by-sentence feedback on grammar, word choice and tone, with a more natural version you repeat on the spot.' },
      questions: [
        { q: 'When you speak English at work, what trips you up most?', opts: [
          { a: 'Grammar slips out wrong', t: 'Catch grammar slips first', d: 'Tenses, articles and prepositions get flagged the moment you say them, with the fixed sentence right beside.' },
          { a: 'My word choice sounds a little off', t: 'Swap “off” words for natural ones', d: 'You’ll see the phrase a native colleague would use in place of the textbook one.' },
          { a: 'My pronunciation gets misheard', t: 'Tune the sounds people mishear', d: 'Speech recognition pinpoints the words that don’t land so you can repeat them until they do.' },
          { a: 'My tone comes out too blunt or too soft', t: 'Adjust your tone for work', d: 'Learn the softeners and the firm phrasing that make requests and pushback sound professional.' }
        ] },
        { q: 'When do you usually notice a mistake?', opts: [
          { a: 'Right as I’m saying it', t: 'Turn self-correcting into a reflex', d: 'You already hear it. Instant feedback confirms the fix so you stop second-guessing mid-sentence.' },
          { a: 'After the meeting, replaying it in my head', t: 'Move the replay into practice', d: 'Rehearse the conversation beforehand and get the corrections before it counts.' },
          { a: 'Only when someone points it out', t: 'Get the feedback nobody gives you', d: 'Colleagues are too polite to correct you. The Catcher isn’t, and it never judges.' },
          { a: 'Honestly, I never find out', t: 'Find the mistakes you can’t see', d: 'A first week of corrected conversations will surface the habits you didn’t know you had.' }
        ] },
        { q: 'Where do mistakes cost you the most?', opts: [
          { a: 'Team meetings', t: 'Practice ground: meetings', d: 'Corrections happen inside meeting roleplays, in the exact sentences you’ll need.' },
          { a: 'Client calls', t: 'Practice ground: client calls', d: 'Polish the lines clients actually hear: updates, pricing and follow-ups.' },
          { a: 'Job interviews', t: 'Practice ground: interviews', d: 'Clean up your self-introduction and behavioral answers before the real interviewer hears them.' },
          { a: 'Presentations', t: 'Practice ground: presentations', d: 'Run your opening, transitions and Q&A until every line comes out clean.' }
        ] },
        TIME_Q
      ]
    },
    planner: {
      name: 'The Planner',
      tagline: 'Maps your route',
      lead: 'Tell the Planner where you want your English to take you and by when. You’ll get a route with clear steps instead of another vague resolution.',
      resultTitle: 'Your route is mapped.',
      feature: { t: 'Progress tracking & weak-spot review', d: 'Speak records what you practice, groups your recurring errors and schedules short reviews so what you learn sticks.' },
      questions: [
        { q: 'Where do you want your English to take you?', opts: [
          { a: 'Into a global company', t: 'Destination: the offer', d: 'Your path starts with interview English: self-introductions, behavioral questions and salary talks.' },
          { a: 'To speaking up in meetings', t: 'Destination: a voice in the room', d: 'Your path is built around updates, opinions and clarifying questions at real meeting speed.' },
          { a: 'To handling international clients', t: 'Destination: clients who trust you', d: 'Your path covers calls, pitches and negotiation, the conversations that close deals.' },
          { a: 'To feeling confident in general', t: 'Destination: everyday confidence', d: 'Your path mixes small talk, opinions and work basics so no situation catches you off guard.' }
        ] },
        { q: 'How soon do you need to get there?', opts: [
          { a: 'Within a month', t: 'A 4-week sprint', d: 'Short and focused: only the scenarios you’ll face, practiced until they’re automatic.' },
          { a: 'In about three months', t: 'A 12-week plan', d: 'Enough time to rebuild the foundation and rehearse your key scenarios.' },
          { a: 'Sometime this year', t: 'A steady long-term plan', d: 'A full course path, with reviews spaced out so progress holds.' },
          { a: 'No deadline, I just want to keep improving', t: 'An open-ended habit', d: 'No pressure, just a daily streak and a clear next lesson every time you open the app.' }
        ] },
        { q: 'What got in the way last time you tried?', opts: [
          { a: 'I never had time', t: 'Fix: sessions that fit your day', d: 'Lessons are split into pieces you can finish in a coffee break.' },
          { a: 'I didn’t know what to study', t: 'Fix: a path that decides for you', d: 'A structured course by level means the next step is always chosen for you.' },
          { a: 'I got bored', t: 'Fix: conversations over drills', d: 'Roleplays about your own job keep it interesting enough to come back to.' },
          { a: 'I couldn’t see any progress', t: 'Fix: progress you can see', d: 'Streaks, spoken-sentence counts and a shrinking weak-spot list show it’s working.' }
        ] },
        TIME_Q
      ]
    },
    trainer: {
      name: 'The Trainer',
      tagline: 'Runs the reps',
      lead: 'Tell the Trainer which conversation makes you sweat. You’ll get a drill routine that puts you through it, safely, until it stops being scary.',
      resultTitle: 'Your training routine is set.',
      feature: { t: 'AI workplace roleplay', d: 'The AI plays your interviewer, manager or client and answers what you actually say, so every rep is different.' },
      questions: [
        { q: 'Which scene do you want to rehearse first?', opts: [
          { a: 'A job interview', t: 'Main drill: the interview', d: 'An AI interviewer asks, follows up and pushes back like a real one.' },
          { a: 'A team meeting', t: 'Main drill: the meeting', d: 'Give updates, jump in with an opinion and handle questions at real speed.' },
          { a: 'A client pitch', t: 'Main drill: the pitch', d: 'Present, take objections on price and steer the call to a next step.' },
          { a: 'Small talk with colleagues', t: 'Main drill: small talk', d: 'Elevator chats, lunch conversation and the first two minutes of every call.' }
        ] },
        { q: 'What happens when it’s your turn to speak?', opts: [
          { a: 'I freeze', t: 'Warm-up: low-stakes reps', d: 'Start with short guided exchanges so your first sentence comes out without thinking.' },
          { a: 'I translate in my head and miss the moment', t: 'Warm-up: speed rounds', d: 'Quick back-and-forth drills train you to answer in English directly.' },
          { a: 'I give a short answer and stop', t: 'Warm-up: answer extensions', d: 'Practice adding a reason and an example to every answer until it’s a habit.' },
          { a: 'I talk, but I ramble', t: 'Warm-up: structure drills', d: 'Rehearse point-first answers so you finish in 30 seconds with the message intact.' }
        ] },
        { q: 'How tough should your sparring partner be?', opts: [
          { a: 'Gentle, I’m building confidence', t: 'Intensity: gentle', d: 'A patient partner who waits, encourages and keeps the pace comfortable.' },
          { a: 'Realistic, like my actual colleagues', t: 'Intensity: realistic', d: 'Natural speed and natural follow-ups, the way your real meetings go.' },
          { a: 'Tough, give me the hard questions', t: 'Intensity: tough', d: 'Objections, interruptions and curveballs, so the real thing feels easy.' },
          { a: 'Mix it up and surprise me', t: 'Intensity: mixed', d: 'A new twist each round so you learn to adapt, whatever comes.' }
        ] },
        TIME_Q
      ]
    },
    leader: {
      name: 'The Leader',
      tagline: 'Shows you how to lead',
      lead: 'Tell the Leader about the moments where you need to take charge in English. You’ll get a playbook for running the room, not just surviving it.',
      resultTitle: 'Your leadership playbook is ready.',
      feature: { t: '100+ workplace scenarios & business courses', d: 'Structured business English courses for the moments that define a career: meetings, feedback, presentations and negotiation.' },
      questions: [
        { q: 'Where are you in your career right now?', opts: [
          { a: 'A team member ready to step up', t: 'Stage: stepping up', d: 'Start with visibility: sharing opinions, owning updates and volunteering to present.' },
          { a: 'A new manager', t: 'Stage: new manager', d: 'Focus on 1:1s, delegating clearly and giving feedback that lands well.' },
          { a: 'Leading a cross-border team', t: 'Stage: cross-border lead', d: 'Focus on aligning people across cultures and keeping remote meetings moving.' },
          { a: 'A founder or executive', t: 'Stage: executive', d: 'Focus on high-stakes rooms: investors, partners and all-hands.' }
        ] },
        { q: 'Which moment is hardest to lead in English?', opts: [
          { a: 'Running a meeting', t: 'Play 1: run the meeting', d: 'Open with the agenda, bring people in, park tangents and close with owners and dates.' },
          { a: 'Giving difficult feedback', t: 'Play 1: give the feedback', d: 'Say the hard thing clearly and respectfully, and agree on what changes.' },
          { a: 'Presenting to senior leadership', t: 'Play 1: present upward', d: 'Lead with the ask, back it with numbers and handle the tough question.' },
          { a: 'Negotiating', t: 'Play 1: negotiate', d: 'Anchor, trade and hold your position without sounding aggressive.' }
        ] },
        { q: 'Compared with your first language, how do you come across in English?', opts: [
          { a: 'Less confident', t: 'Edge to build: presence', d: 'Drill openings and decisive phrasing so you sound as sure as you are.' },
          { a: 'Less persuasive', t: 'Edge to build: persuasion', d: 'Practice structuring an argument and landing the one line people remember.' },
          { a: 'More blunt than I mean to be', t: 'Edge to build: diplomacy', d: 'Learn the softeners and framing that keep directness from reading as rude.' },
          { a: 'Less like myself', t: 'Edge to build: your own voice', d: 'Work on humor, warmth and small talk so your personality comes through.' }
        ] },
        TIME_Q
      ]
    }
  };

  const ORDER = ['catcher', 'planner', 'trainer', 'leader'];
  const heroId = document.body.getAttribute('data-hero');
  const hero = HEROES[heroId];
  const root = document.getElementById('quiz');
  if (!hero || !root) return;

  const answers = [];
  const art = 'assets/hero-' + heroId + '.svg';

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

  function show(banner, body) {
    const card = el('div', { class: 'quiz__card quiz__fade' }, banner, body);
    root.replaceChildren(card, others());
    window.scrollTo({ top: 0 });
  }

  function smallBanner() {
    return el('div', { class: 'quiz__banner quiz__banner--small' },
      el('img', { src: art, alt: '' }),
      el('b', {}, hero.name + '’s questionnaire'));
  }

  function intro() {
    const banner = el('div', { class: 'quiz__banner' },
      el('span', { class: 'ts-badge' }, 'Team Speak'),
      el('h1', {}, hero.name),
      el('p', {}, hero.tagline),
      el('img', { src: art, alt: hero.name + ', a caped Speak mascot' }));
    const body = el('div', { class: 'quiz__body' },
      el('p', { class: 'quiz__lead' }, hero.lead),
      el('div', { class: 'quiz__meta' },
        el('span', {}, hero.questions.length + ' questions'),
        el('span', {}, 'About 1 minute'),
        el('span', {}, 'No sign-up needed')),
      el('button', { class: 'btn btn--block', type: 'button', onclick: function () { question(0); } }, 'Start the questionnaire →'));
    show(banner, body);
  }

  function question(i) {
    const item = hero.questions[i];
    const total = hero.questions.length;
    const bar = el('i');
    bar.style.width = (i / total * 100) + '%';
    const heading = el('h2', { class: 'quiz__q', tabindex: '-1' }, item.q);
    const opts = el('div', { class: 'quiz__opts' });
    item.opts.forEach(function (opt, n) {
      const btn = el('button', {
        class: 'quiz__opt' + (answers[i] === n ? ' is-picked' : ''),
        type: 'button',
        onclick: function () {
          answers[i] = n;
          opts.querySelectorAll('.quiz__opt').forEach(function (b) { b.classList.toggle('is-picked', b === btn); });
          setTimeout(function () { i + 1 < total ? question(i + 1) : result(); }, 220);
        }
      }, el('span', { class: 'quiz__opt-key' }, 'ABCD'[n]), el('span', {}, opt.a));
      opts.appendChild(btn);
    });
    const body = el('div', { class: 'quiz__body' },
      el('div', { class: 'quiz__progress' },
        el('span', {}, 'Question ' + (i + 1) + ' of ' + total),
        el('div', { class: 'quiz__bar' }, bar)),
      heading,
      opts,
      el('button', { class: 'quiz__backbtn', type: 'button', onclick: function () { i === 0 ? intro() : question(i - 1); } }, '← Back'));
    show(smallBanner(), body);
    heading.focus({ preventScroll: true });
    requestAnimationFrame(function () { bar.style.width = ((i + 1) / total * 100) + '%'; });
  }

  function result() {
    const brief = el('ol', { class: 'quiz__brief' });
    hero.questions.forEach(function (item, i) {
      const pick = item.opts[answers[i]];
      brief.appendChild(el('li', {},
        el('span', { class: 'quiz__brief-n' }, String(i + 1)),
        el('div', {}, el('b', {}, pick.t), el('span', {}, pick.d))));
    });
    const banner = el('div', { class: 'quiz__banner' },
      el('span', { class: 'ts-badge' }, 'Mission brief'),
      el('img', { src: art, alt: '' }));
    const heading = el('h2', { class: 'quiz__result-title', tabindex: '-1' }, hero.resultTitle);
    const body = el('div', { class: 'quiz__body' },
      el('span', { class: 'quiz__result-kicker' }, 'From ' + hero.name),
      heading,
      brief,
      el('div', { class: 'quiz__feature' },
        el('span', { class: 'quiz__result-kicker' }, 'Powered by this Speak feature'),
        el('b', {}, hero.feature.t),
        el('span', {}, hero.feature.d)),
      el('div', { class: 'quiz__cta' },
        el('a', { class: 'btn btn--block', href: TRY_URL }, 'Start my 7-day free trial →'),
        el('span', {}, 'Up to NT$299 off + 7-day free trial for new users')),
      el('button', { class: 'quiz__backbtn quiz__again', type: 'button', onclick: function () { answers.length = 0; intro(); } }, 'Retake the questionnaire'));
    show(banner, body);
    heading.focus({ preventScroll: true });
  }

  function others() {
    const row = el('div', { class: 'quiz__others-row' });
    ORDER.filter(function (id) { return id !== heroId; }).forEach(function (id) {
      row.appendChild(el('a', { class: 'quiz__other', href: id + '.html' },
        el('img', { src: 'assets/hero-' + id + '.svg', alt: '' }),
        HEROES[id].name));
    });
    return el('div', { class: 'quiz__others' }, el('b', {}, 'Meet the rest of Team Speak'), row);
  }

  intro();
})();
