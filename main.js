// Speak — Purchase BE page interactions: logo marquee, persona / tutor pop-ups, FAQ accordion.
(function () {
  'use strict';

  // ---------- Pop-up content ----------
  // Each entry fills the shared #modal. `demoUrl` embeds the live Speak demo;
  // without it the pop-up falls back to the sample roleplay (`ai` / `you`).
  const MODALS = {
    'persona-0': {
      who: 'Aiming for a global company',
      title: '“I want that offer!”',
      demoUrl: 'https://www.musubime.app/speak-demo/?v=14rzjc3kfo',
      steps: [
        { t: 'Interview roleplay', d: 'Practice “Tell me about yourself” and behavioral questions with an AI interviewer that pushes back like a real one.' },
        { t: 'Instant corrections', d: 'Turn short, flat answers into structured, confident stories with sentence-by-sentence feedback.' },
        { t: 'Negotiation scenarios', d: 'Rehearse salary talks until asking for what you’re worth feels natural.' }
      ],
      ai: 'Tell me about a time you handled a difficult deadline.',
      you: 'Sure — last quarter, our launch date moved up two weeks, so I…'
    },
    'persona-1': {
      who: 'Already at a global company',
      title: '“I want to be heard in English meetings!”',
      demoUrl: 'https://www.musubime.app/speak-demo/?v=ecv8omf1e',
      steps: [
        { t: 'Meeting simulations', d: 'Practice thinking in English at real meeting speed — no more translating in your head.' },
        { t: 'Standup & update drills', d: 'Build go-to structures for clear 60-second updates without the “uhh…”.' },
        { t: 'Clarifying-question practice', d: 'Learn natural phrases to ask, confirm and push back with confidence.' }
      ],
      ai: 'Can you give us a quick update on the project?',
      you: 'Absolutely. We’re on track — two blockers, and here’s my plan for each.'
    },
    'persona-2': {
      who: 'Working with international clients',
      title: '“I want to close that deal!”',
      demoUrl: 'https://www.musubime.app/speak-demo/?v=e1fpqkzo1p',
      steps: [
        { t: 'Client call roleplay', d: 'Train your ear on fast, natural speech in pitches, check-ins and negotiations.' },
        { t: 'Ready-to-use sales phrases', d: 'Have the next line ready instead of waiting on a lagging translator.' },
        { t: 'Clarity feedback', d: 'Get instant feedback on whether your message lands — before the real call.' }
      ],
      ai: 'Your pricing is higher than your competitor’s. Why should we choose you?',
      you: 'Great question. Let me walk you through the total cost over a year…'
    },
    'tutor-0': {
      who: 'How it works',
      title: 'AI workplace roleplay',
      demoUrl: 'https://www.musubime.app/speak-demo/?v=e1e7jdbr1b',
      steps: [
        { t: 'Pick a scenario', d: 'Choose an interview, meeting, client pitch or small talk — or describe your own situation.' },
        { t: 'Talk it through', d: 'The AI plays your interviewer, manager or client and responds naturally to what you say.' },
        { t: 'Rehearse until ready', d: 'Replay the conversation with new twists until you can walk in confident.' }
      ],
      ai: 'Welcome! Shall we start with a quick introduction?',
      you: 'Sure. I’m a product manager with five years in fintech…'
    },
    'tutor-1': {
      who: 'How it works',
      title: 'Real-time AI corrections',
      demoUrl: 'https://www.musubime.app/speak-demo/?v=npb6v11qsx',
      steps: [
        { t: 'Speak naturally', d: 'Just say what you want to say — no need to be perfect.' },
        { t: 'Get sentence-level feedback', d: 'Speak flags grammar, word choice and tone, and shows a more natural way to say it.' },
        { t: 'Say it again, better', d: 'Repeat the improved version right away to lock it in.' }
      ],
      ai: 'Try this: “Could we push the deadline to Friday?”',
      you: 'Could we push the deadline to Friday?'
    },
    'tutor-2': {
      who: 'How it works',
      title: 'Progress tracking & weak-spot review',
      demoUrl: 'https://www.musubime.app/speak-demo/?v=2cx8g8f7z7',
      steps: [
        { t: 'Every session is tracked', d: 'Speak records the words, phrases and mistakes from each lesson and conversation.' },
        { t: 'Weak spots surface', d: 'Your recurring errors are grouped into clear areas to improve.' },
        { t: 'Personalized review', d: 'Short review sessions are scheduled automatically so what you learn sticks.' }
      ],
      ai: 'Today’s review: 6 phrases you missed last week.',
      you: 'Let’s do it!'
    }
  };

  const CLOSE_MS = 300;

  // ---------- Logo marquee ----------
  // The track animates to -50%, so it needs two identical copies of the logos.
  document.querySelectorAll('[data-marquee]').forEach(function (track) {
    Array.from(track.children).forEach(function (img) {
      const copy = img.cloneNode(true);
      copy.setAttribute('aria-hidden', 'true');
      track.appendChild(copy);
    });
  });

  // ---------- Pop-up ----------
  const modal = document.getElementById('modal');
  const panel = modal.querySelector('.modal__panel');
  const slot = function (name) { return modal.querySelector('[data-slot="' + name + '"]'); };
  let closeTimer = null;
  let lastFocus = null;

  function fillModal(data) {
    slot('who').textContent = data.who;
    slot('title').textContent = data.title;

    const steps = slot('steps');
    steps.replaceChildren();
    data.steps.forEach(function (s, i) {
      const card = document.createElement('div');
      card.className = 'modal__step';
      const n = document.createElement('span');
      n.className = 'modal__step-n';
      n.textContent = i + 1;
      const t = document.createElement('b');
      t.textContent = s.t;
      const d = document.createElement('span');
      d.textContent = s.d;
      card.append(n, t, d);
      steps.appendChild(card);
    });

    const demo = slot('demo');
    const sample = slot('sample');
    demo.querySelectorAll('iframe').forEach(function (f) { f.remove(); });
    panel.classList.toggle('modal__panel--demo', !!data.demoUrl);
    if (data.demoUrl) {
      const frame = document.createElement('iframe');
      frame.src = data.demoUrl;
      frame.title = 'Speak';
      frame.allow = 'microphone; autoplay; clipboard-write';
      frame.setAttribute('allowtransparency', 'true');
      demo.appendChild(frame);
      demo.hidden = false;
      sample.hidden = true;
    } else {
      slot('ai').textContent = data.ai;
      slot('you').textContent = data.you;
      demo.hidden = true;
      sample.hidden = false;
    }
  }

  function openModal(key) {
    const data = MODALS[key];
    if (!data) return;
    clearTimeout(closeTimer);
    lastFocus = document.activeElement;
    fillModal(data);
    modal.classList.remove('is-shown');
    modal.hidden = false;
    panel.scrollTop = 0;
    document.body.classList.add('modal-open');
    // Two frames so the browser paints the hidden state before transitioning in.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { modal.classList.add('is-shown'); });
    });
    modal.querySelector('[data-close]').focus({ preventScroll: true });
  }

  function closeModal() {
    if (modal.hidden) return;
    modal.classList.remove('is-shown');
    clearTimeout(closeTimer);
    closeTimer = setTimeout(function () {
      modal.hidden = true;
      // Drop the demo so its audio / mic stops once the pop-up is gone.
      slot('demo').querySelectorAll('iframe').forEach(function (f) { f.remove(); });
      document.body.classList.remove('modal-open');
      if (lastFocus) lastFocus.focus({ preventScroll: true });
    }, CLOSE_MS);
  }

  document.querySelectorAll('[data-modal]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.stopPropagation();
      openModal(el.getAttribute('data-modal'));
    });
  });

  modal.addEventListener('click', function (e) {
    if (e.target === modal || e.target.closest('[data-close]')) closeModal();
  });

  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  // ---------- FAQ accordion ----------
  // One item open at a time; clicking the open item closes it.
  document.querySelectorAll('[data-faq]').forEach(function (list) {
    const items = Array.from(list.querySelectorAll('.faq'));

    function setOpen(index) {
      items.forEach(function (item, i) {
        const open = i === index;
        const btn = item.querySelector('.faq__q');
        item.querySelector('.faq__a').hidden = !open;
        item.querySelector('.faq__icon').textContent = open ? '−' : '+';
        btn.setAttribute('aria-expanded', String(open));
      });
    }

    items.forEach(function (item, i) {
      item.querySelector('.faq__q').addEventListener('click', function () {
        const isOpen = !item.querySelector('.faq__a').hidden;
        setOpen(isOpen ? -1 : i);
      });
    });

    setOpen(0);
  });
})();
