// feedback.js — UPAD Times Feedback Widget v1.1
// Requires window.UPAD_FEEDBACK = { edition, tab, scriptUrl } on each page

(function () {
  'use strict';

  var cfg        = window.UPAD_FEEDBACK || {};
  var EDITION    = cfg.edition   || '';
  var TAB        = cfg.tab       || '';
  var SCRIPT_URL = cfg.scriptUrl || '';

  // ── Engagement tracking ───────────────────────────────────
  var pageLoadedAt  = Date.now();
  var popupOpenedAt = null;
  var maxScroll     = 0;
  var submitted     = false;

  var scrollThrottle = null;
  window.addEventListener('scroll', function () {
    if (scrollThrottle) return;
    scrollThrottle = setTimeout(function () {
      var docH   = document.documentElement.scrollHeight - window.innerHeight;
      var depth  = docH > 0 ? Math.round(((window.scrollY || window.pageYOffset) / docH) * 100) : 0;
      if (depth > maxScroll) maxScroll = depth;
      scrollThrottle = null;
    }, 200);
  }, { passive: true });

  function deviceType() {
    var w = window.innerWidth;
    return w <= 580 ? 'mobile' : w <= 1024 ? 'tablet' : 'desktop';
  }

  function secsOnPage()    { return Math.round((Date.now() - pageLoadedAt)  / 1000); }
  function secsToSubmit()  { return popupOpenedAt ? Math.round((Date.now() - popupOpenedAt) / 1000) : null; }

  // ── Safe GA event ─────────────────────────────────────────
  function ga(name, params) {
    try { if (typeof gtag === 'function') gtag('event', name, params || {}); } catch (e) {}
  }

  // ── State ─────────────────────────────────────────────────
  var currentQuestion = '';
  var currentOptions  = [];

  // ── CSS ───────────────────────────────────────────────────
  var css = [
    '#upad-fb-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.52);z-index:9999;align-items:center;justify-content:center;padding:16px;}',
    '#upad-fb-overlay.open{display:flex;}',
    '#upad-fb-modal{background:#fff;border:1px solid #aaa;padding:14px 16px 16px;width:100%;max-width:318px;font-family:"Times New Roman",Times,serif;font-size:11px;color:#111;line-height:1.55;position:relative;box-shadow:0 6px 28px rgba(0,0,0,0.32);}',
    '#upad-fb-close{position:absolute;top:7px;right:10px;background:none;border:none;font-size:20px;cursor:pointer;color:#555;line-height:1;padding:0;}',
    '#upad-fb-title{font-size:12px;font-weight:bold;color:#000;margin-bottom:4px;padding-right:22px;}',
    '#upad-fb-edition{font-size:9px;color:#777;margin-bottom:10px;font-style:italic;border-bottom:1px solid #e5e5e5;padding-bottom:8px;}',
    '#upad-fb-q-loading{color:#888;font-style:italic;margin-bottom:10px;}',
    '#upad-fb-question-text{font-weight:bold;color:#000;margin-bottom:7px;}',
    '.upad-fb-option{display:flex;align-items:flex-start;gap:6px;margin-bottom:5px;cursor:pointer;}',
    '.upad-fb-option input{margin-top:2px;flex-shrink:0;accent-color:#FF6B00;}',
    '#upad-fb-answer-text,#upad-fb-comment{width:100%;box-sizing:border-box;font-family:"Times New Roman",Times,serif;font-size:11px;border:1px solid #bbb;padding:4px 6px;color:#111;resize:vertical;}',
    '#upad-fb-answer-text{min-height:50px;margin-bottom:4px;}',
    '#upad-fb-comment{min-height:44px;}',
    '.upad-fb-label{display:block;color:#333;margin-bottom:2px;margin-top:9px;}',
    '.upad-fb-opt{color:#999;font-size:9px;margin-left:2px;}',
    '.upad-fb-input{width:100%;box-sizing:border-box;font-family:"Times New Roman",Times,serif;font-size:11px;border:1px solid #bbb;padding:4px 6px;color:#111;background:#fff;}',
    '#upad-fb-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:4px;}',
    '#upad-fb-submit{margin-top:12px;width:100%;background:#FF6B00;color:#fff;font-family:"Times New Roman",Times,serif;font-size:11px;font-weight:bold;border:none;padding:8px;cursor:pointer;}',
    '#upad-fb-submit:hover{background:#d95e00;}',
    '#upad-fb-success{display:none;text-align:center;padding:28px 10px;color:#000;font-size:12px;line-height:1.9;}',
    '#upad-fb-success .fbchk{font-size:26px;color:#FF6B00;display:block;margin-bottom:6px;}'
  ].join('');

  // ── HTML ──────────────────────────────────────────────────
  var html = '<div id="upad-fb-overlay" role="dialog" aria-modal="true">'
    + '<div id="upad-fb-modal">'
    + '<button id="upad-fb-close" aria-label="Close">&times;</button>'
    + '<div id="upad-fb-form">'
    + '<div id="upad-fb-title">Share Your Thoughts</div>'
    + '<div id="upad-fb-edition"></div>'
    + '<div id="upad-fb-q-loading">Loading question&hellip;</div>'
    + '<div id="upad-fb-question-wrap" style="display:none;">'
    +   '<div id="upad-fb-question-text"></div>'
    +   '<div id="upad-fb-options-wrap"></div>'
    +   '<textarea id="upad-fb-answer-text" style="display:none;" placeholder="Your answer\u2026"></textarea>'
    + '</div>'
    + '<label class="upad-fb-label">Comment <span class="upad-fb-opt">(optional)</span></label>'
    + '<textarea id="upad-fb-comment" placeholder="Anything else you\u2019d like to share\u2026"></textarea>'
    + '<div id="upad-fb-grid">'
    +   '<div><label class="upad-fb-label">Name <span class="upad-fb-opt">(optional)</span></label>'
    +   '<input id="upad-fb-name" class="upad-fb-input" type="text" placeholder="Your name"></div>'
    +   '<div><label class="upad-fb-label">WhatsApp / Phone <span class="upad-fb-opt">(optional)</span></label>'
    +   '<input id="upad-fb-phone" class="upad-fb-input" type="tel" placeholder="Optional"></div>'
    + '</div>'
    + '<button id="upad-fb-submit">Submit &rarr;</button>'
    + '</div>'
    + '<div id="upad-fb-success">'
    +   '<span class="fbchk">&#10003;</span>'
    +   'Thank you &mdash; your feedback has been received.<br>'
    +   '<span style="font-size:9px;color:#888;">UPAD Times</span>'
    + '</div>'
    + '</div></div>';

  // ── Inject ────────────────────────────────────────────────
  var s = document.createElement('style');
  s.textContent = css;
  document.head.appendChild(s);
  document.body.insertAdjacentHTML('beforeend', html);

  // ── Helpers ───────────────────────────────────────────────
  function el(id) { return document.getElementById(id); }

  function resetForm() {
    el('upad-fb-form').style.display    = '';
    el('upad-fb-success').style.display = 'none';
    el('upad-fb-q-loading').style.display = '';
    el('upad-fb-question-wrap').style.display = 'none';
    el('upad-fb-options-wrap').innerHTML = '';
    el('upad-fb-answer-text').value = '';
    el('upad-fb-answer-text').style.display = 'none';
    el('upad-fb-comment').value = '';
    el('upad-fb-name').value    = '';
    el('upad-fb-phone').value   = '';
    currentQuestion = '';
    currentOptions  = [];
    submitted       = false;
  }

  // ── Close ─────────────────────────────────────────────────
  function closeFeedback() {
    if (!submitted) {
      ga('feedback_closed_without_submit', {
        tab:            TAB,
        edition:        EDITION,
        time_on_page_s: secsOnPage(),
        scroll_depth_pct: maxScroll
      });
    }
    el('upad-fb-overlay').classList.remove('open');
    setTimeout(resetForm, 350);
  }

  // ── Open ──────────────────────────────────────────────────
  function openFeedback() {
    popupOpenedAt = Date.now();
    resetForm();
    el('upad-fb-overlay').classList.add('open');
    el('upad-fb-edition').textContent =
      EDITION + ' \u2014 ' + TAB.charAt(0).toUpperCase() + TAB.slice(1);

    ga('feedback_popup_opened', {
      tab:              TAB,
      edition:          EDITION,
      time_on_page_s:   secsOnPage(),
      scroll_depth_pct: maxScroll,
      device:           deviceType()
    });

    if (!SCRIPT_URL) { showOpenField(); return; }

    fetch(SCRIPT_URL + '?action=getQuestion'
        + '&edition=' + encodeURIComponent(EDITION)
        + '&tab='     + encodeURIComponent(TAB))
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d && d.question) {
          currentQuestion = d.question;
          currentOptions  = d.options || [];
          showQuestion(d.question, d.options || []);
        } else { showOpenField(); }
      })
      .catch(showOpenField);
  }

  function showQuestion(question, options) {
    el('upad-fb-q-loading').style.display    = 'none';
    el('upad-fb-question-wrap').style.display = '';
    el('upad-fb-question-text').textContent   = question;
    var wrap = el('upad-fb-options-wrap');
    wrap.innerHTML = '';
    if (options && options.length) {
      options.forEach(function (opt) {
        var lbl = document.createElement('label');
        lbl.className = 'upad-fb-option';
        lbl.innerHTML = '<input type="radio" name="upad_ans" class="upad-fb-radio" value="'
          + opt.replace(/"/g, '&quot;') + '"> ' + opt;
        wrap.appendChild(lbl);
      });
    } else {
      showOpenField();
    }
  }

  function showOpenField() {
    el('upad-fb-q-loading').style.display     = 'none';
    el('upad-fb-question-wrap').style.display  = '';
    el('upad-fb-answer-text').style.display    = '';
  }

  // ── Submit ────────────────────────────────────────────────
  el('upad-fb-submit').addEventListener('click', function () {
    var radio   = document.querySelector('.upad-fb-radio:checked');
    var answer  = radio ? radio.value : el('upad-fb-answer-text').value.trim();
    var comment = el('upad-fb-comment').value.trim();
    var name    = el('upad-fb-name').value.trim();
    var phone   = el('upad-fb-phone').value.trim();
    var ttp     = secsToSubmit();

    ga('feedback_submitted', {
      tab:              TAB,
      edition:          EDITION,
      has_answer:       !!answer,
      has_comment:      !!comment,
      is_identified:    !!name,
      time_to_submit_s: ttp,
      device:           deviceType()
    });

    if (SCRIPT_URL) {
      fetch(SCRIPT_URL, {
        method:  'POST',
        mode:    'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          action:          'submitResponse',
          edition:         EDITION,
          tab:             TAB,
          question:        currentQuestion,
          answer:          answer,
          comment:         comment,
          name:            name,
          phone:           phone,
          timeOnPage:      secsOnPage(),
          scrollDepth:     maxScroll,
          deviceType:      deviceType(),
          timeToSubmit:    ttp,
          timestamp:       new Date().toISOString()
        })
      }).catch(function () {});
    }

    submitted = true;
    el('upad-fb-form').style.display    = 'none';
    el('upad-fb-success').style.display = '';
    setTimeout(closeFeedback, 3000);
  });

  // ── Wire close events ─────────────────────────────────────
  el('upad-fb-close').addEventListener('click', closeFeedback);
  el('upad-fb-overlay').addEventListener('click', function (e) {
    if (e.target === this) closeFeedback();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeFeedback();
  });

  // ── Expose ────────────────────────────────────────────────
  window.upadFeedback = { open: openFeedback, close: closeFeedback };

}());
