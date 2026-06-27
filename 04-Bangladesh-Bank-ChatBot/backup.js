(function () {
  // ── Remove any existing instance ──────────────────────────────────────────────
  ['bb-chatbot-toggle', 'bb-chatbot-window', 'bb-chatbot-style'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.remove();
  });

  // ── Predefined Q&A in Bengali ─────────────────────────────────────────────────
  const QA = [
    {
      q: "বাংলাদেশ ব্যাংক কী?",
      tags: ["বাংলাদেশ ব্যাংক", "কেন্দ্রীয় ব্যাংক", "কী", "পরিচয়"],
      a: `<p>🏛️ <strong>বাংলাদেশ ব্যাংক</strong> হলো বাংলাদেশের কেন্দ্রীয় ব্যাংক। ১৯৭২ সালে প্রতিষ্ঠিত।</p>
          <ul>
            <li>💰 মুদ্রানীতি প্রণয়ন ও বাস্তবায়ন</li>
            <li>🏦 ব্যাংকিং খাত নিয়ন্ত্রণ</li>
            <li>📊 বৈদেশিক মুদ্রার রিজার্ভ ব্যবস্থাপনা</li>
            <li>💵 নোট ও মুদ্রা ইস্যু</li>
          </ul>
          <p>🔗 <a href="https://www.bb.org.bd/en/index.php/aboutus/history" target="_blank" style="color:#006A4E;font-weight:bold;">ইতিহাস জানুন →</a></p>`
    },
    {
      q: "মুদ্রানীতি কী এবং বর্তমান মুদ্রানীতি কেমন?",
      tags: ["মুদ্রানীতি", "নীতি", "সুদ", "রেপো", "মুদ্রা"],
      a: `<p>📈 <strong>মুদ্রানীতি</strong> মুদ্রাস্ফীতি নিয়ন্ত্রণ ও প্রবৃদ্ধি নিশ্চিত করে।</p>
          <ul>
            <li>📅 বর্তমান MPS: জানুয়ারি–জুন ২০২৬</li>
            <li>🔢 রেপো রেট বাজারের চাহিদা অনুযায়ী</li>
            <li>🎯 লক্ষ্য: মুদ্রাস্ফীতি একক অঙ্কে রাখা</li>
          </ul>
          <p>🔗 <a href="https://www.bb.org.bd/en/index.php/monetarypolicy/mpsdetail" target="_blank" style="color:#006A4E;font-weight:bold;">মুদ্রানীতি বিস্তারিত →</a> | <a href="https://www.bb.org.bd/en/index.php/monetarypolicy/repoinformation" target="_blank" style="color:#006A4E;font-weight:bold;">রেপো তথ্য →</a></p>`
    },
    {
      q: "বৈদেশিক মুদ্রার রিজার্ভ কত?",
      tags: ["রিজার্ভ", "বৈদেশিক মুদ্রা", "ডলার", "ফরেক্স", "fx"],
      a: `<p>💵 <strong>বৈদেশিক মুদ্রার রিজার্ভ</strong> অর্থনৈতিক স্থিতিশীলতার সূচক।</p>
          <ul>
            <li>📊 সর্বশেষ তথ্যের জন্য ওয়েবসাইট দেখুন</li>
            <li>🌐 BOP রিপোর্টে বিস্তারিত পাওয়া যায়</li>
            <li>📅 প্রতিদিন FX মার্কেট তথ্য আপডেট হয়</li>
          </ul>
          <p>🔗 <a href="https://www.bb.org.bd/en/index.php/econdata/wagermitinflow" target="_blank" style="color:#006A4E;font-weight:bold;">রেমিট্যান্স তথ্য →</a> | <a href="https://www.bb.org.bd/en/index.php/econdata/bopexpimp" target="_blank" style="color:#006A4E;font-weight:bold;">BOP তথ্য →</a></p>`
    },
    {
      q: "রেমিট্যান্স পাঠানোর নিয়ম কী?",
      tags: ["রেমিট্যান্স", "প্রবাসী", "পাঠানো", "ইনওয়ার্ড", "টাকা পাঠানো"],
      a: `<p>✈️ <strong>রেমিট্যান্স</strong> প্রবাসী বাংলাদেশিদের দেশে পাঠানো অর্থ।</p>
          <ul>
            <li>🏦 যেকোনো অনুমোদিত ব্যাংকের মাধ্যমে</li>
            <li>📱 মোবাইল ব্যাংকিং (bKash, Nagad) গ্রহণযোগ্য</li>
            <li>🎁 ২.৫% সরকারি প্রণোদনা পাওয়া যায়</li>
            <li>⚡ দ্রুততম উপায়: SWIFT ও Wise</li>
          </ul>
          <p>🔗 <a href="https://www.bb.org.bd/en/index.php/investfacility/inwardremit" target="_blank" style="color:#006A4E;font-weight:bold;">ইনওয়ার্ড রেমিট্যান্স সুবিধা →</a></p>`
    },
    {
      q: "NRB বন্ড কী?",
      tags: ["NRB", "বন্ড", "প্রবাসী বন্ড", "বিনিয়োগ", "nrb"],
      a: `<p>📜 <strong>NRB বন্ড</strong> প্রবাসী বাংলাদেশিদের বিশেষ বিনিয়োগ সুযোগ।</p>
          <ul>
            <li>💹 আকর্ষণীয় সুদের হার</li>
            <li>🔒 নিরাপদ সরকারি গ্যারান্টি</li>
            <li>💵 বৈদেশিক মুদ্রায় বিনিয়োগ ও মুনাফা</li>
            <li>🏦 যেকোনো অনুমোদিত ব্যাংকে পাওয়া যায়</li>
          </ul>
          <p>🔗 <a href="https://www.bb.org.bd/en/index.php/investfacility/nrbbond" target="_blank" style="color:#006A4E;font-weight:bold;">NRB বন্ড বিস্তারিত →</a></p>`
    },
    {
      q: "ব্যাংকিং অভিযোগ কোথায় করব?",
      tags: ["অভিযোগ", "সমস্যা", "CIPC", "হেল্পলাইন", "কমপ্লেইন", "cipc"],
      a: `<p>📞 <strong>CIPC</strong> – গ্রাহক স্বার্থ সংরক্ষণ কেন্দ্রে যোগাযোগ করুন।</p>
          <ul>
            <li>☎️ হটলাইন: <strong>16236</strong></li>
            <li>📧 ইমেইল: <strong>bb.cipc@bb.org.bd</strong></li>
            <li>📱 মোবাইল অ্যাপে অনলাইন অভিযোগ</li>
            <li>🌐 ওয়েবসাইটে সরাসরি সাবমিট</li>
          </ul>
          <p>🔗 <a href="https://www.bb.org.bd/en/index.php/customerservice/cipc" target="_blank" style="color:#006A4E;font-weight:bold;">CIPC পোর্টাল →</a></p>`
    },
    {
      q: "বাংলাদেশ ব্যাংকের গভর্নর কে?",
      tags: ["গভর্নর", "প্রধান", "নেতৃত্ব", "governor"],
      a: `<p>👤 বর্তমান গভর্নর: <strong>ড. মোস্তাকুর রহমান FCMA</strong></p>
          <ul>
            <li>🏛️ কেন্দ্রীয় ব্যাংকের সর্বোচ্চ নির্বাহী</li>
            <li>📋 মুদ্রানীতি ও ব্যাংক নিয়ন্ত্রণে নেতৃত্ব দেন</li>
            <li>🌐 আন্তর্জাতিক ফোরামে বাংলাদেশের প্রতিনিধি</li>
          </ul>
          <p>🔗 <a href="https://www.bb.org.bd/en/index.php/aboutus/governor" target="_blank" style="color:#006A4E;font-weight:bold;">গভর্নর সম্পর্কে →</a></p>`
    },
    {
      q: "পেমেন্ট সিস্টেম কীভাবে কাজ করে?",
      tags: ["পেমেন্ট", "BEFTN", "RTGS", "মোবাইল ব্যাংকিং", "লেনদেন"],
      a: `<p>💳 <strong>পেমেন্ট সিস্টেম</strong> দ্রুত ও নিরাপদ লেনদেনের সুবিধা দেয়।</p>
          <ul>
            <li>⚡ RTGS: বড় অংকের তাৎক্ষণিক ট্রান্সফার</li>
            <li>🔄 BEFTN: ব্যাচ ইলেকট্রনিক ফান্ড ট্রান্সফার</li>
            <li>📱 MFS: বিকাশ, নগদ, রকেট</li>
            <li>💳 NPSB: ন্যাশনাল পেমেন্ট সুইচ</li>
          </ul>
          <p>🔗 <a href="https://www.bb.org.bd/en/index.php/paymentsys/bpsreport" target="_blank" style="color:#006A4E;font-weight:bold;">পেমেন্ট রিপোর্ট →</a></p>`
    }
  ];

  // ── Suggested quick-question labels ──────────────────────────────────────────
  const SUGGESTED = [
    "বাংলাদেশ ব্যাংক কী?",
    "মুদ্রানীতি কী?",
    "রিজার্ভ কত?",
    "রেমিট্যান্স পাঠানোর নিয়ম কী?",
    "NRB বন্ড কী?",
    "অভিযোগ কোথায় করব?",
    "গভর্নর কে?",
    "পেমেন্ট সিস্টেম কীভাবে কাজ করে?"
  ];

  // ── Animated thinking phrases ──────────────────────────────────────────────
  const THINKING = [
    "🔍 তথ্য অনুসন্ধান করা হচ্ছে...",
    "⚙️ প্রশ্নটি বিশ্লেষণ করা হচ্ছে...",
    "📚 ডেটাবেজ যাচাই করা হচ্ছে...",
    "🧠 উত্তর প্রস্তুত করা হচ্ছে...",
    "✅ তথ্য যাচাই সম্পন্ন হচ্ছে..."
  ];

  // ── Answer matcher ──────────────────────────────────────────────────────────
  function findAnswer(input) {
    const lower = input.toLowerCase();
    let best = null, bestScore = 0;
    for (const item of QA) {
      let score = 0;
      for (const tag of item.tags) {
        if (lower.includes(tag.toLowerCase())) score++;
      }
      if (lower.includes(item.q.toLowerCase())) score += 10;
      if (score > bestScore) { bestScore = score; best = item; }
    }
    if (bestScore === 0) {
      return `<p>❓ দুঃখিত, এই প্রশ্নের উত্তর এখনো জানি না।</p>
              <p>সরাসরি যোগাযোগ করুন: ☎️ <strong>16236</strong></p>
              <p>🔗 <a href="https://www.bb.org.bd/en/index.php" target="_blank" style="color:#006A4E;font-weight:bold;">বাংলাদেশ ব্যাংক ওয়েবসাইট →</a></p>`;
    }
    return best.a;
  }

  // ── CSS (Bangladesh flag theme: #006A4E green + #F42A41 red) ───────────────
  const css = `
    #bb-chatbot-toggle, #bb-chatbot-window {
      font-family: 'Noto Sans Bengali', Arial, sans-serif;
    }
    /* ── Toggle Button ── */
    #bb-chatbot-toggle {
      position: fixed; bottom: 24px; right: 24px; z-index: 2147483647;
      width: 62px; height: 62px; border-radius: 50%;
      background: #006A4E; border: none; cursor: pointer;
      box-shadow: 0 4px 18px rgba(0,106,78,0.55);
      display: flex; align-items: center; justify-content: center;
      transition: all 0.3s;
    }
    #bb-chatbot-toggle:hover { transform: scale(1.1); box-shadow: 0 6px 26px rgba(0,106,78,0.7); }
    #bb-chatbot-toggle .t-inner {
      width: 34px; height: 34px; border-radius: 50%;
      background: #F42A41; display: flex; align-items: center;
      justify-content: center; font-size: 18px;
    }
    /* ── Chat Window ── */
    #bb-chatbot-window {
      position: fixed; bottom: 102px; right: 24px; z-index: 2147483646;
      width: 370px; max-height: 560px; border-radius: 18px;
      background: #fff; box-shadow: 0 8px 40px rgba(0,0,0,0.18);
      display: flex; flex-direction: column; overflow: hidden;
      transform: scale(0.85) translateY(30px); opacity: 0;
      transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
      pointer-events: none;
    }
    #bb-chatbot-window.bbopen {
      transform: scale(1) translateY(0); opacity: 1; pointer-events: all;
    }
    /* ── Header ── */
    .bbhdr {
      background: linear-gradient(135deg, #006A4E 0%, #009966 100%);
      padding: 13px 15px; display: flex; align-items: center;
      gap: 11px; flex-shrink: 0;
    }
    .bbhdr-icon {
      width: 42px; height: 42px; border-radius: 50%;
      background: #F42A41; display: flex; align-items: center;
      justify-content: center; font-size: 20px;
      border: 2px solid rgba(255,255,255,0.25); flex-shrink: 0;
    }
    .bbhdr-info { flex: 1; }
    .bbhdr-title { color: #fff; font-size: 14px; font-weight: 700; margin: 0; line-height: 1.2; }
    .bbhdr-sub { color: rgba(255,255,255,0.8); font-size: 11px; margin: 3px 0 0; }
    .bbdot {
      width: 7px; height: 7px; border-radius: 50%; background: #4ade80;
      display: inline-block; margin-right: 4px;
      animation: bbpulse 2s infinite;
    }
    @keyframes bbpulse { 0%,100%{opacity:1} 50%{opacity:0.35} }
    .bbclosebtn {
      background: rgba(255,255,255,0.15); border: none; cursor: pointer;
      color: #fff; width: 28px; height: 28px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 15px; transition: background 0.2s; flex-shrink: 0;
    }
    .bbclosebtn:hover { background: rgba(255,255,255,0.3); }
    /* ── Messages area ── */
    .bbmsgs {
      flex: 1; overflow-y: auto; padding: 14px;
      display: flex; flex-direction: column; gap: 10px; background: #f5faf7;
    }
    .bbmsgs::-webkit-scrollbar { width: 4px; }
    .bbmsgs::-webkit-scrollbar-thumb { background: #006A4E33; border-radius: 2px; }
    .bbmsg {
      display: flex; flex-direction: column; max-width: 88%;
      animation: bbfade 0.3s ease;
    }
    @keyframes bbfade { from{opacity:0;transform:translateY(7px)} to{opacity:1;transform:translateY(0)} }
    .bbmsg.bot { align-self: flex-start; }
    .bbmsg.user { align-self: flex-end; }
    .bbbub { padding: 9px 13px; border-radius: 15px; font-size: 12.5px; line-height: 1.65; }
    .bbmsg.bot .bbbub {
      background: #fff; color: #1a1a1a;
      border-radius: 4px 15px 15px 15px;
      box-shadow: 0 2px 7px rgba(0,0,0,0.07);
      border-left: 3px solid #006A4E;
    }
    .bbmsg.bot .bbbub ul { margin: 5px 0; padding-left: 18px; }
    .bbmsg.bot .bbbub li { margin: 3px 0; }
    .bbmsg.bot .bbbub a { color: #006A4E; }
    .bbmsg.user .bbbub {
      background: linear-gradient(135deg, #006A4E, #009966);
      color: #fff; border-radius: 15px 4px 15px 15px;
    }
    .bbt { font-size: 10px; color: #aaa; margin-top: 3px; padding: 0 2px; }
    .bbmsg.user .bbt { text-align: right; }
    /* ── Thinking animation ── */
    .bbthink { display: flex; align-items: center; gap: 7px; padding: 9px 13px; }
    .bbdots { display: flex; gap: 3px; }
    .bbdots span {
      width: 6px; height: 6px; border-radius: 50%; background: #006A4E;
      animation: bbdb 1.2s infinite;
    }
    .bbdots span:nth-child(2) { animation-delay: 0.2s; }
    .bbdots span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes bbdb { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-5px)} }
    .bbthinktxt { font-size: 11.5px; color: #006A4E; font-style: italic; }
    /* ── Suggested questions ── */
    .bbsugs {
      padding: 9px 13px; background: #fff;
      border-top: 1px solid #e0f0e8;
      display: flex; gap: 5px; flex-wrap: wrap; flex-shrink: 0;
    }
    .bbsugbtn {
      background: #eaf5ef; border: 1px solid #b5ddc8; color: #006A4E;
      border-radius: 20px; padding: 4px 11px; font-size: 11px;
      cursor: pointer; transition: all 0.2s; font-family: inherit; white-space: nowrap;
    }
    .bbsugbtn:hover { background: #006A4E; color: #fff; border-color: #006A4E; }
    /* ── Input area ── */
    .bbinp-area {
      padding: 11px 13px; background: #fff;
      border-top: 1px solid #e0f0e8;
      display: flex; gap: 7px; align-items: center; flex-shrink: 0;
    }
    .bbinp {
      flex: 1; border: 1.5px solid #c8e8d8; border-radius: 22px;
      padding: 8px 14px; font-size: 12.5px; outline: none;
      font-family: inherit; color: #1a1a1a; background: #f5faf7;
      transition: border-color 0.2s;
    }
    .bbinp:focus { border-color: #006A4E; background: #fff; }
    .bbinp::placeholder { color: #aaa; }
    .bbsendbtn {
      width: 38px; height: 38px; border-radius: 50%;
      background: linear-gradient(135deg, #006A4E, #009966);
      border: none; cursor: pointer; display: flex;
      align-items: center; justify-content: center;
      transition: all 0.2s; flex-shrink: 0;
    }
    .bbsendbtn:hover { transform: scale(1.1); box-shadow: 0 4px 10px rgba(0,106,78,0.4); }
    /* ── Footer ── */
    .bbfoot {
      text-align: center; padding: 5px; background: #006A4E;
      font-size: 10px; color: rgba(255,255,255,0.7); flex-shrink: 0;
    }
    /* ── Welcome card ── */
    .bbwelcome {
      background: linear-gradient(135deg, #eaf5ef, #f2faf6);
      border-radius: 11px; padding: 13px; text-align: center;
      border: 1px solid #c5e5d3;
    }
    .bbwelcome-flag {
      display: inline-flex; width: 46px; height: 30px;
      background: #006A4E; border-radius: 4px;
      align-items: center; justify-content: center; margin-bottom: 7px;
    }
    .bbwelcome-flag .rc { width: 16px; height: 16px; border-radius: 50%; background: #F42A41; }
    .bbwelcome h3 { color: #006A4E; font-size: 13px; margin: 0 0 5px; font-weight: 700; }
    .bbwelcome p { color: #555; font-size: 11.5px; margin: 0; line-height: 1.5; }
  `;

  // ── Inject styles ──────────────────────────────────────────────────────────
  const styleEl = document.createElement('style');
  styleEl.id = 'bb-chatbot-style';
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ── Build toggle button ────────────────────────────────────────────────────
  const toggle = document.createElement('button');
  toggle.id = 'bb-chatbot-toggle';
  toggle.setAttribute('title', 'বাংলাদেশ ব্যাংক চ্যাটবট');
  toggle.innerHTML = '<div class="t-inner">🏦</div>';

  // ── Build chat window ──────────────────────────────────────────────────────
  const win = document.createElement('div');
  win.id = 'bb-chatbot-window';
  win.innerHTML = `
    <div class="bbhdr">
      <div class="bbhdr-icon">🏛️</div>
      <div class="bbhdr-info">
        <p class="bbhdr-title">বাংলাদেশ ব্যাংক সহায়তা</p>
        <p class="bbhdr-sub"><span class="bbdot"></span>অনলাইনে আছি</p>
      </div>
      <button class="bbclosebtn" id="bb-close-btn">✕</button>
    </div>

    <div class="bbmsgs" id="bb-messages">
      <div class="bbmsg bot">
        <div class="bbbub">
          <div class="bbwelcome">
            <div class="bbwelcome-flag"><div class="rc"></div></div>
            <h3>🙏 স্বাগতম!</h3>
            <p>আমি বাংলাদেশ ব্যাংকের ডিজিটাল সহায়তাকারী।<br/>নিচের বিষয়ে প্রশ্ন করতে পারেন।</p>
          </div>
        </div>
        <span class="bbt">এইমাত্র</span>
      </div>
    </div>

    <div class="bbsugs" id="bb-sugs"></div>

    <div class="bbinp-area">
      <input class="bbinp" id="bb-input" type="text"
        placeholder="বাংলায় প্রশ্ন লিখুন..." autocomplete="off"/>
      <button class="bbsendbtn" id="bb-send" title="পাঠান">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
        </svg>
      </button>
    </div>

    <div class="bbfoot">বাংলাদেশ ব্যাংক © ২০২৬ — কেন্দ্রীয় ব্যাংক</div>
  `;

  document.body.appendChild(toggle);
  document.body.appendChild(win);

  // ── Helper: current time in Bengali ───────────────────────────────────────
  function getTime() {
    return new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' });
  }

  // ── Append a chat bubble ──────────────────────────────────────────────────
  function appendMsg(html, role) {
    const msgs = document.getElementById('bb-messages');
    const d = document.createElement('div');
    d.className = 'bbmsg ' + role;
    d.innerHTML = '<div class="bbbub">' + html + '</div>'
      + '<span class="bbt">' + getTime() + '</span>';
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
  }

  // ── Animated thinking sequence, then callback ─────────────────────────────
  function showThinking(cb) {
    const msgs = document.getElementById('bb-messages');
    const d = document.createElement('div');
    d.className = 'bbmsg bot';
    d.id = 'bb-thinking-msg';
    d.innerHTML = `<div class="bbbub"><div class="bbthink">
      <div class="bbdots"><span></span><span></span><span></span></div>
      <span class="bbthinktxt" id="bb-thinktxt">${THINKING[0]}</span>
    </div></div>`;
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;

    let i = 0;
    const iv = setInterval(() => {
      i++;
      const el = document.getElementById('bb-thinktxt');
      if (el && i < THINKING.length) el.textContent = THINKING[i];
    }, 600);

    setTimeout(() => {
      clearInterval(iv);
      const el = document.getElementById('bb-thinking-msg');
      if (el) el.remove();
      cb();
    }, THINKING.length * 640 + 150);
  }

  // ── Render suggested question chips ───────────────────────────────────────
  let sugIdx = 0;
  function renderSugs(exclude) {
    const sugsEl = document.getElementById('bb-sugs');
    const pool = SUGGESTED.filter(s => s !== exclude);
    const show = pool.slice(sugIdx % pool.length, (sugIdx % pool.length) + 4);
    sugIdx += 4;
    sugsEl.innerHTML = show
      .map(s => `<button class="bbsugbtn" data-q="${s}">${s}</button>`)
      .join('');
    sugsEl.querySelectorAll('.bbsugbtn').forEach(b => {
      b.onclick = () => sendMsg(b.dataset.q);
    });
  }

  // ── Send a message ────────────────────────────────────────────────────────
  function sendMsg(text) {
    if (!text.trim()) return;
    const inp = document.getElementById('bb-input');
    if (inp) inp.value = '';
    appendMsg(text, 'user');
    renderSugs(text);
    showThinking(() => appendMsg(findAnswer(text), 'bot'));
  }

  // ── Wire up events ────────────────────────────────────────────────────────
  let isOpen = false;

  toggle.onclick = () => {
    isOpen = !isOpen;
    win.classList.toggle('bbopen', isOpen);
    if (isOpen) {
      renderSugs('');
      setTimeout(() => {
        const inp = document.getElementById('bb-input');
        if (inp) inp.focus();
      }, 350);
    }
  };

  document.getElementById('bb-close-btn').onclick = (e) => {
    e.stopPropagation();
    isOpen = false;
    win.classList.remove('bbopen');
  };

  document.getElementById('bb-send').onclick = () => {
    const v = document.getElementById('bb-input').value;
    if (v.trim()) sendMsg(v);
  };

  document.getElementById('bb-input').addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.target.value.trim()) sendMsg(e.target.value);
  });

  console.log('[BB Chatbot] ✅ বাংলাদেশ ব্যাংক চ্যাটবট সফলভাবে লোড হয়েছে!');
})();