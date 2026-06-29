(function () {
  ['bb-chatbot-toggle', 'bb-chatbot-window', 'bb-chatbot-style'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.remove();
  });

  // ── State ─────────────────────────────────────────────────────────────────
  let lang = 'bn';
  let activeCategory = 'all';
  let sugIdx = 0;

  // ── UI Text ───────────────────────────────────────────────────────────────
  const UI = {
    bn: {
      toggleTitle: 'বাংলাদেশ ব্যাংক চ্যাটবট',
      title: 'বাংলাদেশ ব্যাংক সহায়তা',
      online: 'অনলাইনে আছি',
      placeholder: 'বাংলায় প্রশ্ন লিখুন...',
      welcomeTitle: '🙏 স্বাগতম!',
      welcomeText: 'আমি বাংলাদেশ ব্যাংকের ডিজিটাল সহায়তাকারী।<br/>ব্যাংকিং, বিনিয়োগ ও সেবা বিষয়ে জিজ্ঞেস করুন।',
      footer: 'বাংলাদেশ ব্যাংক © ২০২৬ — কেন্দ্রীয় ব্যাংক',
      noAnswer: `<p>❓ দুঃখিত, এই প্রশ্নের উত্তর এখনো আমার কাছে নেই।</p><p>সরাসরি যোগাযোগ করুন: ☎️ <strong>16236</strong></p><p>🔗 <a href="https://www.bb.org.bd/en/index.php" target="_blank" style="color:#006A4E;font-weight:bold;">বাংলাদেশ ব্যাংক ওয়েবসাইট →</a></p>`,
      langLabel: 'EN',
      cats: { all: 'সব বিষয়', customer: '👤 গ্রাহক', business: '🏢 ব্যবসা', investor: '💼 বিনিয়োগ' },
      quickActions: [
        { label: '💱 বিনিময় হার', url: 'https://www.bb.org.bd/en/index.php/econdata/exchangerate' },
        { label: '📝 অভিযোগ', url: 'https://www.bb.org.bd/en/index.php/customerservice/cipc' },
        { label: '🏦 লাইসেন্সড ব্যাংক', url: 'https://www.bb.org.bd/en/index.php/abroadcorr/banklistdetails' },
        { label: '📞 যোগাযোগ', url: 'https://www.bb.org.bd/en/index.php/aboutus/contactdetail' }
      ],
      thinking: [
        '🔍 তথ্য অনুসন্ধান করা হচ্ছে...',
        '⚙️ প্রশ্নটি বিশ্লেষণ করা হচ্ছে...',
        '📚 ডেটাবেজ যাচাই করা হচ্ছে...',
        '🧠 উত্তর প্রস্তুত করা হচ্ছে...',
        '✅ তথ্য যাচাই সম্পন্ন হচ্ছে...'
      ]
    },
    en: {
      toggleTitle: 'Bangladesh Bank Chatbot',
      title: 'Bangladesh Bank Assistant',
      online: 'Online',
      placeholder: 'Ask a question in English...',
      welcomeTitle: '🙏 Welcome!',
      welcomeText: "I'm Bangladesh Bank's digital assistant.<br/>Ask me about banking, investment & services.",
      footer: 'Bangladesh Bank © 2026 — Central Bank of Bangladesh',
      noAnswer: `<p>❓ Sorry, I don't have an answer for that yet.</p><p>Contact us directly: ☎️ <strong>16236</strong></p><p>🔗 <a href="https://www.bb.org.bd/en/index.php" target="_blank" style="color:#006A4E;font-weight:bold;">Bangladesh Bank Website →</a></p>`,
      langLabel: 'বাং',
      cats: { all: 'All Topics', customer: '👤 Customer', business: '🏢 Business', investor: '💼 Investor' },
      quickActions: [
        { label: '💱 Exchange Rate', url: 'https://www.bb.org.bd/en/index.php/econdata/exchangerate' },
        { label: '📝 File Complaint', url: 'https://www.bb.org.bd/en/index.php/customerservice/cipc' },
        { label: '🏦 Licensed Banks', url: 'https://www.bb.org.bd/en/index.php/abroadcorr/banklistdetails' },
        { label: '📞 Contact BB', url: 'https://www.bb.org.bd/en/index.php/aboutus/contactdetail' }
      ],
      thinking: [
        '🔍 Searching for information...',
        '⚙️ Analyzing your question...',
        '📚 Checking our database...',
        '🧠 Preparing the answer...',
        '✅ Verifying information...'
      ]
    }
  };

  // ── Q&A Data ───────────────────────────────────────────────────────────────
  const QA = {
    bn: [
      // ── general
      {
        q: 'বাংলাদেশ ব্যাংক কী?',
        tags: ['বাংলাদেশ ব্যাংক', 'কেন্দ্রীয় ব্যাংক', 'পরিচয়', 'ইতিহাস', 'প্রতিষ্ঠা'],
        category: 'general',
        a: `<p>🏛️ <strong>বাংলাদেশ ব্যাংক</strong> বাংলাদেশের কেন্দ্রীয় ব্যাংক — ১৯৭২ সালে প্রতিষ্ঠিত।</p>
            <ul>
              <li>💰 মুদ্রানীতি প্রণয়ন ও বাস্তবায়ন</li>
              <li>🏦 সকল ব্যাংক ও আর্থিক প্রতিষ্ঠান নিয়ন্ত্রণ</li>
              <li>📊 বৈদেশিক মুদ্রার রিজার্ভ ব্যবস্থাপনা</li>
              <li>💵 নোট ও মুদ্রা ইস্যু</li>
              <li>🌐 সরকারের ব্যাংকার হিসেবে কাজ</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/aboutus/history" target="_blank" style="color:#006A4E;font-weight:bold;">ইতিহাস জানুন →</a></p>`
      },
      {
        q: 'বাংলাদেশ ব্যাংকের গভর্নর কে?',
        tags: ['গভর্নর', 'প্রধান', 'নেতৃত্ব', 'governor', 'মোস্তাকুর'],
        category: 'general',
        a: `<p>👤 বর্তমান গভর্নর: <strong>ড. মোস্তাকুর রহমান FCMA</strong></p>
            <ul>
              <li>🏛️ কেন্দ্রীয় ব্যাংকের সর্বোচ্চ নির্বাহী</li>
              <li>📋 মুদ্রানীতি ও ব্যাংক নিয়ন্ত্রণে নেতৃত্ব দেন</li>
              <li>🌐 আন্তর্জাতিক ফোরামে বাংলাদেশের প্রতিনিধি</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/aboutus/governor" target="_blank" style="color:#006A4E;font-weight:bold;">গভর্নর সম্পর্কে →</a></p>`
      },
      {
        q: 'মুদ্রানীতি কী?',
        tags: ['মুদ্রানীতি', 'নীতি', 'MPS', 'monetary', 'মুদ্রাস্ফীতি'],
        category: 'general',
        a: `<p>📈 <strong>মুদ্রানীতি</strong> মুদ্রাস্ফীতি নিয়ন্ত্রণ ও অর্থনৈতিক প্রবৃদ্ধি নিশ্চিত করে।</p>
            <ul>
              <li>📅 বর্তমান MPS: জানুয়ারি–জুন ২০২৬</li>
              <li>🎯 লক্ষ্য: মুদ্রাস্ফীতি একক অঙ্কে রাখা</li>
              <li>📊 প্রতি ৬ মাসে পর্যালোচনা করা হয়</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/monetarypolicy/mpsdetail" target="_blank" style="color:#006A4E;font-weight:bold;">মুদ্রানীতি বিস্তারিত →</a></p>`
      },
      {
        q: 'রেপো রেট ও সুদের হার কত?',
        tags: ['রেপো', 'সুদ', 'সুদের হার', 'repo', 'interest rate', 'ব্যাংক রেট'],
        category: 'general',
        a: `<p>💹 <strong>নীতি সুদের হার</strong> বাজারের মুদ্রা সরবরাহ নিয়ন্ত্রণ করে।</p>
            <ul>
              <li>🔢 সর্বশেষ রেপো রেট বাংলাদেশ ব্যাংকের ওয়েবসাইটে আপডেট থাকে</li>
              <li>📅 প্রতিটি MPS ঘোষণায় রেট পরিবর্তিত হতে পারে</li>
              <li>🎯 লক্ষ্য: মুদ্রাস্ফীতি কমানো ও বিনিয়োগ উৎসাহিত করা</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/monetarypolicy/repoinformation" target="_blank" style="color:#006A4E;font-weight:bold;">রেপো তথ্য →</a></p>`
      },
      {
        q: 'বৈদেশিক মুদ্রার রিজার্ভ কত?',
        tags: ['রিজার্ভ', 'বৈদেশিক মুদ্রা', 'ডলার', 'ফরেক্স', 'fx', 'forex'],
        category: 'general',
        a: `<p>💵 <strong>বৈদেশিক মুদ্রার রিজার্ভ</strong> অর্থনৈতিক স্থিতিশীলতার সূচক।</p>
            <ul>
              <li>📊 সর্বশেষ তথ্যের জন্য ওয়েবসাইট দেখুন</li>
              <li>🌐 BOP রিপোর্টে বিস্তারিত পাওয়া যায়</li>
              <li>📅 প্রতিসপ্তাহে আপডেট হয়</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/econdata/bopexpimp" target="_blank" style="color:#006A4E;font-weight:bold;">BOP তথ্য →</a> | <a href="https://www.bb.org.bd/en/index.php/econdata/wagermitinflow" target="_blank" style="color:#006A4E;font-weight:bold;">রেমিট্যান্স তথ্য →</a></p>`
      },
      {
        q: 'বাংলাদেশ ব্যাংকের যোগাযোগ ও শাখা',
        tags: ['যোগাযোগ', 'ঠিকানা', 'ফোন', 'শাখা', 'contact', 'মতিঝিল', 'হেড অফিস'],
        category: 'general',
        a: `<p>📍 <strong>প্রধান কার্যালয়:</strong> মতিঝিল বাণিজ্যিক এলাকা, ঢাকা-১০০০</p>
            <ul>
              <li>☎️ সুইচবোর্ড: +৮৮০-২-৯৫৩০২২৪</li>
              <li>📧 governor@bb.org.bd</li>
              <li>🏛️ সারাদেশে ১০টি শাখা কার্যালয়</li>
              <li>📞 গ্রাহক হেল্পলাইন: <strong>16236</strong></li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/aboutus/contactdetail" target="_blank" style="color:#006A4E;font-weight:bold;">যোগাযোগ বিস্তারিত →</a></p>`
      },

      // ── customer
      {
        q: 'আজকের বিনিময় হার কত?',
        tags: ['বিনিময় হার', 'ডলার', 'টাকা', 'exchange rate', 'USD', 'EUR', 'GBP', 'রেট', 'মুদ্রা'],
        category: 'customer',
        a: `<p>💱 <strong>বিনিময় হার</strong> প্রতিদিন আপডেট হয়।</p>
            <ul>
              <li>🇺🇸 USD (মার্কিন ডলার)</li>
              <li>🇪🇺 EUR (ইউরো)</li>
              <li>🇬🇧 GBP (ব্রিটিশ পাউন্ড)</li>
              <li>📅 প্রতিদিন সকালে বাংলাদেশ ব্যাংক অফিসিয়াল রেট নির্ধারণ করে</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/econdata/exchangerate" target="_blank" style="color:#006A4E;font-weight:bold;">আজকের বিনিময় হার দেখুন →</a></p>`
      },
      {
        q: 'রেমিট্যান্স কীভাবে পাঠাবো বা পাবো?',
        tags: ['রেমিট্যান্স', 'প্রবাসী', 'পাঠানো', 'ইনওয়ার্ড', 'টাকা পাঠানো', 'বিদেশ থেকে'],
        category: 'customer',
        a: `<p>✈️ <strong>রেমিট্যান্স</strong> পাঠানো ও গ্রহণের সহজ উপায়:</p>
            <ul>
              <li>🏦 যেকোনো অনুমোদিত ব্যাংকের মাধ্যমে</li>
              <li>📱 মোবাইল ব্যাংকিং: bKash, Nagad, Rocket গ্রহণযোগ্য</li>
              <li>⚡ SWIFT, Wise, Western Union সহ বিভিন্ন মাধ্যমে</li>
              <li>🧾 বৈধ চ্যানেলে পাঠালে ২.৫% সরকারি প্রণোদনা পাওয়া যায়</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/investfacility/inwardremit" target="_blank" style="color:#006A4E;font-weight:bold;">রেমিট্যান্স সুবিধা →</a></p>`
      },
      {
        q: 'রেমিট্যান্সে ২.৫% প্রণোদনা কীভাবে পাবো?',
        tags: ['প্রণোদনা', '২.৫', 'রেমিট্যান্স বোনাস', 'incentive', 'সরকারি প্রণোদনা'],
        category: 'customer',
        a: `<p>🎁 <strong>২.৫% রেমিট্যান্স প্রণোদনা</strong> সরকার প্রদান করে।</p>
            <ul>
              <li>✅ অনুমোদিত ব্যাংক বা MFS-এর মাধ্যমে পাঠালে প্রযোজ্য</li>
              <li>💵 হুন্ডি বা অবৈধ পথে পাঠালে প্রণোদনা পাওয়া যায় না</li>
              <li>🏦 প্রণোদনা সরাসরি ব্যাংক হিসাবে জমা হয়</li>
              <li>📋 NID বা পাসপোর্ট দিয়ে হিসাব খুলতে হবে</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/investfacility/inwardremit" target="_blank" style="color:#006A4E;font-weight:bold;">রেমিট্যান্স তথ্য →</a></p>`
      },
      {
        q: 'ব্যাংকিং অভিযোগ কোথায় করব?',
        tags: ['অভিযোগ', 'সমস্যা', 'CIPC', 'হেল্পলাইন', 'কমপ্লেইন', 'cipc', '16236'],
        category: 'customer',
        a: `<p>📞 <strong>CIPC</strong> – গ্রাহক স্বার্থ সংরক্ষণ কেন্দ্রে যোগাযোগ করুন।</p>
            <ul>
              <li>☎️ হটলাইন: <strong>16236</strong> (সকাল ৯টা – বিকাল ৫টা)</li>
              <li>📧 ইমেইল: <strong>cipc@bb.org.bd</strong></li>
              <li>🌐 অনলাইনে সরাসরি অভিযোগ দাখিল করা যায়</li>
              <li>📱 বাংলাদেশ ব্যাংক মোবাইল অ্যাপে অভিযোগ</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/customerservice/cipc" target="_blank" style="color:#006A4E;font-weight:bold;">CIPC পোর্টাল →</a></p>`
      },
      {
        q: 'লাইসেন্সপ্রাপ্ত ব্যাংকের তালিকা কোথায় পাবো?',
        tags: ['লাইসেন্স', 'ব্যাংক তালিকা', 'অনুমোদিত ব্যাংক', 'licensed bank', 'তফসিলি ব্যাংক'],
        category: 'customer',
        a: `<p>🏦 বাংলাদেশে <strong>৬০+ তফসিলি ব্যাংক</strong> রয়েছে।</p>
            <ul>
              <li>🏛️ রাষ্ট্রীয় মালিকানাধীন ব্যাংক</li>
              <li>🏢 বেসরকারি বাণিজ্যিক ব্যাংক</li>
              <li>🌍 বিদেশি ব্যাংকের শাখা</li>
              <li>🕌 ইসলামী ব্যাংকিং প্রতিষ্ঠান</li>
              <li>🌿 বিশেষায়িত ব্যাংক (কৃষি, শিল্প)</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/abroadcorr/banklistdetails" target="_blank" style="color:#006A4E;font-weight:bold;">ব্যাংক তালিকা দেখুন →</a></p>`
      },
      {
        q: 'মোবাইল ব্যাংকিং ও MFS সম্পর্কে জানতে চাই',
        tags: ['মোবাইল ব্যাংকিং', 'MFS', 'bkash', 'বিকাশ', 'nagad', 'নগদ', 'rocket', 'রকেট'],
        category: 'customer',
        a: `<p>📱 <strong>মোবাইল ফিনান্সিয়াল সার্ভিস (MFS)</strong> আর্থিক অন্তর্ভুক্তির মূল চালিকাশক্তি।</p>
            <ul>
              <li>📲 বিকাশ, নগদ, রকেট — অনুমোদিত MFS প্রদানকারী</li>
              <li>💸 দৈনিক লেনদেনের সীমা বাংলাদেশ ব্যাংক নির্ধারণ করে</li>
              <li>🔒 প্রতিটি MFS প্রদানকারী BB-এর অনুমতিপ্রাপ্ত</li>
              <li>📊 MFS তথ্য ও পরিসংখ্যান নিয়মিত প্রকাশিত হয়</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/paymentsys/mfsdata" target="_blank" style="color:#006A4E;font-weight:bold;">MFS তথ্য →</a></p>`
      },
      {
        q: 'স্কুল ব্যাংকিং ও আর্থিক অন্তর্ভুক্তি কী?',
        tags: ['স্কুল ব্যাংকিং', 'আর্থিক অন্তর্ভুক্তি', 'ছাত্র', 'শিক্ষার্থী', 'financial inclusion'],
        category: 'customer',
        a: `<p>🎓 <strong>স্কুল ব্যাংকিং</strong> শিক্ষার্থীদের সঞ্চয় অভ্যাস গড়ে তোলার উদ্যোগ।</p>
            <ul>
              <li>🏫 মাত্র ১০ টাকায় হিসাব খুলতে পারে</li>
              <li>💰 অভিভাবকের মাধ্যমে পরিচালিত</li>
              <li>🌾 এজেন্ট ব্যাংকিংয়ের মাধ্যমে প্রত্যন্ত অঞ্চলে সেবা</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/financialinclusion/schbank" target="_blank" style="color:#006A4E;font-weight:bold;">স্কুল ব্যাংকিং →</a></p>`
      },
      {
        q: 'ডিজিটাল ও ইন্টারনেট ব্যাংকিং নিয়ম',
        tags: ['ডিজিটাল ব্যাংকিং', 'ইন্টারনেট ব্যাংকিং', 'অনলাইন ব্যাংকিং', 'digital', 'internet banking'],
        category: 'customer',
        a: `<p>💻 <strong>ডিজিটাল ব্যাংকিং</strong> নিরাপদ ও সুবিধাজনক।</p>
            <ul>
              <li>🔐 সকল ব্যাংকের ইন্টারনেট ব্যাংকিং BB-এর অনুমোদিত</li>
              <li>🛡️ ২-ধাপ যাচাইকরণ (OTP) বাধ্যতামূলক</li>
              <li>⚠️ প্রতারণা হলে সাথে সাথে ব্যাংক ও BB-কে জানান</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/paymentsys/bpsreport" target="_blank" style="color:#006A4E;font-weight:bold;">পেমেন্ট সিস্টেম →</a></p>`
      },

      // ── business
      {
        q: 'SME ঋণ নীতি কী?',
        tags: ['SME', 'ক্ষুদ্র', 'মাঝারি', 'উদ্যোক্তা', 'ঋণ', 'sme loan'],
        category: 'business',
        a: `<p>🏭 <strong>SME ঋণ</strong> ক্ষুদ্র ও মাঝারি উদ্যোক্তাদের জন্য বিশেষ সুবিধা।</p>
            <ul>
              <li>💰 ক্লাস্টার ভিত্তিক SME ঋণ বিতরণ</li>
              <li>👩 নারী উদ্যোক্তাদের জন্য বিশেষ সুদের হার</li>
              <li>🎯 বার্ষিক SME ঋণ লক্ষ্যমাত্রা নির্ধারিত</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/smesupport/smepolicies" target="_blank" style="color:#006A4E;font-weight:bold;">SME নীতি →</a></p>`
      },
      {
        q: 'কৃষি ও গ্রামীণ ঋণ সম্পর্কে জানতে চাই',
        tags: ['কৃষি', 'গ্রামীণ ঋণ', 'কৃষক', 'agriculture', 'rural credit', 'ফসল ঋণ'],
        category: 'business',
        a: `<p>🌾 <strong>কৃষি ঋণ</strong> খাদ্য নিরাপত্তায় বাংলাদেশ ব্যাংকের অঙ্গীকার।</p>
            <ul>
              <li>📅 বার্ষিক কৃষি ঋণ বিতরণের লক্ষ্যমাত্রা নির্ধারিত</li>
              <li>💸 সুদ ভর্তুকি প্রকল্পে ঋণ পাওয়া যায়</li>
              <li>🌿 সবুজ অর্থায়নে কৃষি খাতে বিশেষ মনোযোগ</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/ruralmicrocredit/agrocreditpolicies" target="_blank" style="color:#006A4E;font-weight:bold;">কৃষি ঋণ নীতি →</a></p>`
      },
      {
        q: 'এজেন্ট ব্যাংকিং কী?',
        tags: ['এজেন্ট ব্যাংকিং', 'agent banking', 'গ্রামীণ', 'শাখাবিহীন'],
        category: 'business',
        a: `<p>🤝 <strong>এজেন্ট ব্যাংকিং</strong> প্রত্যন্ত অঞ্চলে ব্যাংকিং সেবা পৌঁছে দেয়।</p>
            <ul>
              <li>🏘️ শাখাবিহীন এলাকায় এজেন্টের মাধ্যমে সেবা</li>
              <li>💳 হিসাব খোলা, আমানত, উত্তোলন ও ট্রান্সফার</li>
              <li>📱 বায়োমেট্রিক পদ্ধতিতে সুরক্ষিত</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/financialinclusion/agentbankinginfo" target="_blank" style="color:#006A4E;font-weight:bold;">এজেন্ট ব্যাংকিং →</a></p>`
      },
      {
        q: 'গ্রিন ব্যাংকিং ও টেকসই অর্থায়ন কী?',
        tags: ['গ্রিন ব্যাংকিং', 'সবুজ', 'পরিবেশ', 'green banking', 'sustainable finance', 'টেকসই'],
        category: 'business',
        a: `<p>🌿 <strong>গ্রিন ব্যাংকিং</strong> পরিবেশবান্ধব অর্থায়নের উদ্যোগ।</p>
            <ul>
              <li>☀️ নবায়নযোগ্য শক্তি প্রকল্পে বিশেষ ঋণ সুবিধা</li>
              <li>🏭 পরিবেশ দূষণকারী প্রতিষ্ঠানকে ঋণ সীমিত</li>
              <li>🌱 ESG নীতিমালা অনুসরণ করতে হয়</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/sustainablefinance/greenfinanceall" target="_blank" style="color:#006A4E;font-weight:bold;">গ্রিন ফাইন্যান্স →</a></p>`
      },
      {
        q: 'ট্রেড ফাইন্যান্স ও এলসি (LC) সম্পর্কে জানতে চাই',
        tags: ['ট্রেড ফাইন্যান্স', 'এলসি', 'LC', 'আমদানি', 'রপ্তানি', 'letter of credit'],
        category: 'business',
        a: `<p>🚢 <strong>ট্রেড ফাইন্যান্স</strong> আমদানি-রপ্তানি বাণিজ্যের মেরুদণ্ড।</p>
            <ul>
              <li>📜 LC (Letter of Credit) খোলার নিয়ম BB নির্ধারণ করে</li>
              <li>💵 Back-to-Back LC রপ্তানিকারকদের জন্য বিশেষ সুবিধা</li>
              <li>🔐 AD (Authorized Dealer) ব্যাংকের মাধ্যমে পরিচালিত</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/fxmonitor/importinfo" target="_blank" style="color:#006A4E;font-weight:bold;">আমদানি তথ্য →</a> | <a href="https://www.bb.org.bd/en/index.php/fxmonitor/exportinfo" target="_blank" style="color:#006A4E;font-weight:bold;">রপ্তানি তথ্য →</a></p>`
      },
      {
        q: 'RTGS ও BEFTN পেমেন্ট সিস্টেম কীভাবে কাজ করে?',
        tags: ['RTGS', 'BEFTN', 'পেমেন্ট', 'ট্রান্সফার', 'payment system', 'NPSB'],
        category: 'business',
        a: `<p>💳 <strong>পেমেন্ট সিস্টেম</strong> দ্রুত ও নিরাপদ লেনদেনের সুবিধা দেয়।</p>
            <ul>
              <li>⚡ RTGS: বড় অংকের (১ লক্ষ+) তাৎক্ষণিক ট্রান্সফার</li>
              <li>🔄 BEFTN: ব্যাচ ইলেকট্রনিক ফান্ড ট্রান্সফার (ছোট অঙ্ক)</li>
              <li>💳 NPSB: ন্যাশনাল পেমেন্ট সুইচ (ATM ও POS)</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/paymentsys/bpsreport" target="_blank" style="color:#006A4E;font-weight:bold;">পেমেন্ট রিপোর্ট →</a></p>`
      },
      {
        q: 'ব্যাংকিং লাইসেন্স কীভাবে পাবো?',
        tags: ['ব্যাংকিং লাইসেন্স', 'নতুন ব্যাংক', 'লাইসেন্স আবেদন', 'NBFI'],
        category: 'business',
        a: `<p>🏦 <strong>ব্যাংকিং লাইসেন্স</strong> বাংলাদেশ ব্যাংক প্রদান করে।</p>
            <ul>
              <li>📋 ব্যাংক কোম্পানি আইন, ১৯৯১ অনুযায়ী আবেদন</li>
              <li>💰 ন্যূনতম পেইড-আপ মূলধন প্রয়োজন</li>
              <li>🔍 BB কঠোর যাচাই-বাছাই করে লাইসেন্স দেয়</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/regulationguideline/brpd" target="_blank" style="color:#006A4E;font-weight:bold;">BRPD সার্কুলার →</a></p>`
      },
      {
        q: 'সুদের হার ক্যাপ নীতি কী?',
        tags: ['সুদের হার ক্যাপ', 'সুদ সীমা', 'interest rate cap', 'lending rate', 'ঋণের সুদ'],
        category: 'business',
        a: `<p>📊 <strong>সুদের হার নীতি</strong> ঋণের ব্যয় নিয়ন্ত্রণ করে।</p>
            <ul>
              <li>🔢 BB সময়ে সময়ে সর্বোচ্চ ঋণের সুদের হার নির্ধারণ করে</li>
              <li>📅 বর্তমান নীতি MPS-এ বিস্তারিত উল্লেখ থাকে</li>
              <li>🏭 SME ও কৃষি খাতে বিশেষ সুদের হার প্রযোজ্য</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/monetarypolicy/mpsdetail" target="_blank" style="color:#006A4E;font-weight:bold;">মুদ্রানীতি বিবৃতি →</a></p>`
      },
      {
        q: 'অর্থ পাচার প্রতিরোধ (AML/CFT)',
        tags: ['অর্থ পাচার', 'AML', 'CFT', 'মানি লন্ডারিং', 'money laundering', 'BFIU'],
        category: 'business',
        a: `<p>🛡️ <strong>AML/CFT</strong> — অর্থ পাচার ও সন্ত্রাসে অর্থায়ন প্রতিরোধ।</p>
            <ul>
              <li>⚖️ মানি লন্ডারিং প্রতিরোধ আইন, ২০১২ অনুযায়ী</li>
              <li>🔍 BB-এর BFIU দায়িত্বপ্রাপ্ত</li>
              <li>📋 সন্দেহজনক লেনদেন রিপোর্ট (STR) করা বাধ্যতামূলক</li>
              <li>🌐 FATF-এর নির্দেশিকা অনুসরণ করা হয়</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/financialintelligence/aboutbfiu" target="_blank" style="color:#006A4E;font-weight:bold;">BFIU →</a></p>`
      },

      // ── investor
      {
        q: 'NRB বন্ড কী?',
        tags: ['NRB', 'বন্ড', 'প্রবাসী বন্ড', 'নন-রেসিডেন্ট', 'NRB bond'],
        category: 'investor',
        a: `<p>📜 <strong>NRB বন্ড</strong> প্রবাসী বাংলাদেশিদের বিশেষ বিনিয়োগ সুযোগ।</p>
            <ul>
              <li>💹 আকর্ষণীয় সুদের হার</li>
              <li>🔒 সরকারি গ্যারান্টি</li>
              <li>💵 বৈদেশিক মুদ্রায় বিনিয়োগ ও মুনাফা উত্তোলন সম্ভব</li>
              <li>🏦 যেকোনো অনুমোদিত ব্যাংকে পাওয়া যায়</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/investfacility/nrbbond" target="_blank" style="color:#006A4E;font-weight:bold;">NRB বন্ড বিস্তারিত →</a></p>`
      },
      {
        q: 'NFCD ও RFC বৈদেশিক মুদ্রা অ্যাকাউন্ট কী?',
        tags: ['NFCD', 'RFC', 'বৈদেশিক মুদ্রা অ্যাকাউন্ট', 'foreign currency account', 'ডলার অ্যাকাউন্ট'],
        category: 'investor',
        a: `<p>💵 <strong>NFCD/RFC অ্যাকাউন্ট</strong> বৈদেশিক মুদ্রায় সঞ্চয়ের সুযোগ।</p>
            <ul>
              <li>🏦 NFCD: Non-Resident Foreign Currency Deposit</li>
              <li>🌍 RFC: Resident Foreign Currency Account (প্রত্যাবাসী)</li>
              <li>💹 বৈদেশিক মুদ্রায় সুদ প্রযোজ্য</li>
              <li>✈️ বিদেশ ভ্রমণে ব্যবহার করা যায়</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/investfacility/nrbbond" target="_blank" style="color:#006A4E;font-weight:bold;">বিনিয়োগ সুবিধা →</a></p>`
      },
      {
        q: 'ওয়েজ আর্নার ডেভেলপমেন্ট বন্ড কী?',
        tags: ['ওয়েজ আর্নার', 'wage earner', 'ডেভেলপমেন্ট বন্ড', 'প্রবাসী শ্রমিক বন্ড'],
        category: 'investor',
        a: `<p>💰 <strong>ওয়েজ আর্নার ডেভেলপমেন্ট বন্ড</strong> প্রবাসী শ্রমিকদের জন্য।</p>
            <ul>
              <li>🎯 মেয়াদ: ৩ বছর ও ৫ বছর</li>
              <li>💹 আকর্ষণীয় মুনাফার হার</li>
              <li>🔒 সরকারি নিরাপত্তা</li>
              <li>🏦 যেকোনো অনুমোদিত ব্যাংকে কেনা যায়</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/investfacility/nrbbond" target="_blank" style="color:#006A4E;font-weight:bold;">বন্ড তথ্য →</a></p>`
      },
      {
        q: 'ইউএস ডলার প্রিমিয়াম ও ইনভেস্টমেন্ট বন্ড',
        tags: ['ডলার বন্ড', 'USD bond', 'ইউএস ডলার প্রিমিয়াম', 'investment bond', 'বিনিয়োগ বন্ড'],
        category: 'investor',
        a: `<p>🇺🇸 <strong>US Dollar Premium Bond</strong> ও <strong>US Dollar Investment Bond</strong></p>
            <ul>
              <li>💵 মার্কিন ডলারে বিনিয়োগ ও মুনাফা</li>
              <li>🎯 মেয়াদ: ৩ বছর</li>
              <li>✅ প্রবাসী বাংলাদেশিরা কিনতে পারবেন</li>
              <li>🏦 অনুমোদিত ব্যাংক ও বাংলাদেশ ব্যাংকে পাওয়া যায়</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/investfacility/nrbbond" target="_blank" style="color:#006A4E;font-weight:bold;">বিনিয়োগ বন্ড →</a></p>`
      },
      {
        q: 'সঞ্চয়পত্র সম্পর্কে জানতে চাই',
        tags: ['সঞ্চয়পত্র', 'sanchayapatra', 'জাতীয় সঞ্চয়', 'national savings', 'সঞ্চয় স্কিম'],
        category: 'investor',
        a: `<p>📋 <strong>সঞ্চয়পত্র</strong> সরকারের জাতীয় সঞ্চয় স্কিম।</p>
            <ul>
              <li>📜 পরিবার সঞ্চয়পত্র, পেনশনার, ৩ মাস অন্তর মুনাফা ভিত্তিক</li>
              <li>💰 আকর্ষণীয় মুনাফার হার</li>
              <li>🏦 ব্যাংক ও জাতীয় সঞ্চয় কেন্দ্রে পাওয়া যায়</li>
              <li>⚠️ ক্রয় সীমা ও কর নিয়ম প্রযোজ্য</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/investfacility/nrbbond" target="_blank" style="color:#006A4E;font-weight:bold;">বিনিয়োগ সুবিধা →</a></p>`
      },
      {
        q: 'পুঁজিবাজার ও বাংলাদেশ ব্যাংকের ভূমিকা',
        tags: ['পুঁজিবাজার', 'শেয়ার বাজার', 'BSEC', 'capital market', 'stock market', 'শেয়ার'],
        category: 'investor',
        a: `<p>📈 <strong>পুঁজিবাজার</strong> ও বাংলাদেশ ব্যাংকের সম্পর্ক।</p>
            <ul>
              <li>🔗 BSEC পুঁজিবাজার নিয়ন্ত্রণ করে</li>
              <li>🏦 BB ব্যাংকগুলোর পুঁজিবাজার বিনিয়োগ নজরদারি করে</li>
              <li>💹 ব্যাংকের Exposure Limit BB নির্ধারণ করে</li>
              <li>📊 DSE ও CSE — দুটি স্টক এক্সচেঞ্জ</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/regulationguideline/brpd" target="_blank" style="color:#006A4E;font-weight:bold;">নিয়ন্ত্রণ নির্দেশিকা →</a></p>`
      }
    ],

    en: [
      // ── general
      {
        q: 'What is Bangladesh Bank?',
        tags: ['bangladesh bank', 'central bank', 'history', 'established', 'about'],
        category: 'general',
        a: `<p>🏛️ <strong>Bangladesh Bank</strong> is the central bank of Bangladesh, established in 1972.</p>
            <ul>
              <li>💰 Formulates and implements monetary policy</li>
              <li>🏦 Regulates all banks and financial institutions</li>
              <li>📊 Manages foreign exchange reserves</li>
              <li>💵 Issues banknotes and coins</li>
              <li>🌐 Acts as the government's banker</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/aboutus/history" target="_blank" style="color:#006A4E;font-weight:bold;">Learn about history →</a></p>`
      },
      {
        q: 'Who is the Governor of Bangladesh Bank?',
        tags: ['governor', 'head', 'leadership', 'chief', 'mostakur'],
        category: 'general',
        a: `<p>👤 Current Governor: <strong>Dr. Mostakur Rahman FCMA</strong></p>
            <ul>
              <li>🏛️ Chief executive of the central bank</li>
              <li>📋 Leads monetary policy and banking regulation</li>
              <li>🌐 Represents Bangladesh in international forums</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/aboutus/governor" target="_blank" style="color:#006A4E;font-weight:bold;">About the Governor →</a></p>`
      },
      {
        q: 'What is monetary policy?',
        tags: ['monetary policy', 'mps', 'policy statement', 'inflation', 'money supply'],
        category: 'general',
        a: `<p>📈 <strong>Monetary Policy</strong> controls inflation and ensures economic growth.</p>
            <ul>
              <li>📅 Current MPS: January–June 2026</li>
              <li>🎯 Target: Bring inflation to single digits</li>
              <li>📊 Reviewed every 6 months</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/monetarypolicy/mpsdetail" target="_blank" style="color:#006A4E;font-weight:bold;">Monetary Policy Details →</a></p>`
      },
      {
        q: 'What is the repo rate and current interest rate?',
        tags: ['repo rate', 'interest rate', 'policy rate', 'bank rate', 'lending rate'],
        category: 'general',
        a: `<p>💹 <strong>Policy Interest Rate</strong> controls money supply in the economy.</p>
            <ul>
              <li>🔢 Latest repo rate: check bb.org.bd for current rate</li>
              <li>📅 Rate may change with each MPS announcement</li>
              <li>🎯 Goal: Control inflation and encourage investment</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/monetarypolicy/repoinformation" target="_blank" style="color:#006A4E;font-weight:bold;">Repo Rate Info →</a></p>`
      },
      {
        q: 'What are the foreign exchange reserves?',
        tags: ['forex', 'foreign exchange', 'reserve', 'dollar reserve', 'fx reserve'],
        category: 'general',
        a: `<p>💵 <strong>Foreign Exchange Reserves</strong> are a key indicator of economic stability.</p>
            <ul>
              <li>📊 Latest figures available on the BB website</li>
              <li>🌐 Detailed data in BOP reports</li>
              <li>📅 Updated weekly</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/econdata/bopexpimp" target="_blank" style="color:#006A4E;font-weight:bold;">BOP Data →</a> | <a href="https://www.bb.org.bd/en/index.php/econdata/wagermitinflow" target="_blank" style="color:#006A4E;font-weight:bold;">Remittance Data →</a></p>`
      },
      {
        q: 'How to contact Bangladesh Bank?',
        tags: ['contact', 'address', 'phone', 'branch', 'office', 'headquarters', 'motijheel'],
        category: 'general',
        a: `<p>📍 <strong>Head Office:</strong> Motijheel Commercial Area, Dhaka-1000</p>
            <ul>
              <li>☎️ Switchboard: +880-2-9530224</li>
              <li>📧 governor@bb.org.bd</li>
              <li>🏛️ 10 branch offices nationwide</li>
              <li>📞 Customer Helpline: <strong>16236</strong></li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/aboutus/contactdetail" target="_blank" style="color:#006A4E;font-weight:bold;">Contact Details →</a></p>`
      },

      // ── customer
      {
        q: "What is today's exchange rate?",
        tags: ['exchange rate', 'dollar', 'taka', 'usd', 'eur', 'gbp', 'currency rate', 'forex rate'],
        category: 'customer',
        a: `<p>💱 <strong>Exchange rates</strong> are updated daily by Bangladesh Bank.</p>
            <ul>
              <li>🇺🇸 USD (US Dollar)</li>
              <li>🇪🇺 EUR (Euro)</li>
              <li>🇬🇧 GBP (British Pound)</li>
              <li>📅 Official rates are set each morning</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/econdata/exchangerate" target="_blank" style="color:#006A4E;font-weight:bold;">View Today's Rate →</a></p>`
      },
      {
        q: 'How to send or receive remittance?',
        tags: ['remittance', 'send money', 'receive money', 'inward remittance', 'transfer', 'overseas'],
        category: 'customer',
        a: `<p>✈️ Easy ways to send and receive <strong>remittance</strong>:</p>
            <ul>
              <li>🏦 Through any authorized bank</li>
              <li>📱 Mobile banking: bKash, Nagad, Rocket accepted</li>
              <li>⚡ Via SWIFT, Wise, Western Union and more</li>
              <li>🧾 2.5% government incentive for legal channels</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/investfacility/inwardremit" target="_blank" style="color:#006A4E;font-weight:bold;">Remittance Facilities →</a></p>`
      },
      {
        q: 'How to get the 2.5% remittance incentive?',
        tags: ['2.5', 'incentive', 'remittance incentive', 'bonus', 'government incentive', 'cashback'],
        category: 'customer',
        a: `<p>🎁 <strong>2.5% Remittance Incentive</strong> provided by the government.</p>
            <ul>
              <li>✅ Applicable when sent through authorized banks or MFS</li>
              <li>💵 Hundi/illegal channels are not eligible</li>
              <li>🏦 Incentive credited directly to the bank account</li>
              <li>📋 NID or passport required to open account</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/investfacility/inwardremit" target="_blank" style="color:#006A4E;font-weight:bold;">Remittance Info →</a></p>`
      },
      {
        q: 'Where to file a banking complaint?',
        tags: ['complaint', 'grievance', 'cipc', 'helpline', 'problem', 'banking issue', '16236'],
        category: 'customer',
        a: `<p>📞 Contact <strong>CIPC</strong> — Customer Interest Protection Centre.</p>
            <ul>
              <li>☎️ Hotline: <strong>16236</strong> (9am – 5pm)</li>
              <li>📧 Email: <strong>cipc@bb.org.bd</strong></li>
              <li>🌐 File online on the BB website</li>
              <li>📱 Via Bangladesh Bank mobile app</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/customerservice/cipc" target="_blank" style="color:#006A4E;font-weight:bold;">CIPC Portal →</a></p>`
      },
      {
        q: 'Where to find the list of licensed banks?',
        tags: ['licensed bank', 'bank list', 'scheduled bank', 'authorized bank', 'approved bank'],
        category: 'customer',
        a: `<p>🏦 Bangladesh has <strong>60+ scheduled banks</strong> regulated by Bangladesh Bank.</p>
            <ul>
              <li>🏛️ State-owned commercial banks</li>
              <li>🏢 Private commercial banks</li>
              <li>🌍 Foreign bank branches</li>
              <li>🕌 Islamic banking institutions</li>
              <li>🌿 Specialized banks (agriculture, industry)</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/abroadcorr/banklistdetails" target="_blank" style="color:#006A4E;font-weight:bold;">View Bank List →</a></p>`
      },
      {
        q: 'What is mobile banking / MFS?',
        tags: ['mobile banking', 'mfs', 'bkash', 'nagad', 'rocket', 'mobile financial service'],
        category: 'customer',
        a: `<p>📱 <strong>Mobile Financial Services (MFS)</strong> drive financial inclusion in Bangladesh.</p>
            <ul>
              <li>📲 bKash, Nagad, Rocket — licensed MFS providers</li>
              <li>💸 Daily transaction limits set by Bangladesh Bank</li>
              <li>🔒 All MFS providers are BB-licensed</li>
              <li>📊 MFS statistics regularly published</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/paymentsys/mfsdata" target="_blank" style="color:#006A4E;font-weight:bold;">MFS Data →</a></p>`
      },
      {
        q: 'What is school banking and financial inclusion?',
        tags: ['school banking', 'financial inclusion', 'student account', 'youth banking'],
        category: 'customer',
        a: `<p>🎓 <strong>School Banking</strong> builds savings habits among students.</p>
            <ul>
              <li>🏫 Students can open accounts with as little as BDT 10</li>
              <li>💰 Managed through guardians</li>
              <li>🌾 Agent banking reaches remote areas</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/financialinclusion/schbank" target="_blank" style="color:#006A4E;font-weight:bold;">School Banking →</a></p>`
      },
      {
        q: 'Digital and internet banking rules',
        tags: ['digital banking', 'internet banking', 'online banking', 'e-banking', 'cyber security'],
        category: 'customer',
        a: `<p>💻 <strong>Digital banking</strong> is safe and convenient.</p>
            <ul>
              <li>🔐 All internet banking must be BB-approved</li>
              <li>🛡️ 2-factor authentication (OTP) is mandatory</li>
              <li>⚠️ Report fraud immediately to your bank and BB</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/paymentsys/bpsreport" target="_blank" style="color:#006A4E;font-weight:bold;">Payment Systems →</a></p>`
      },

      // ── business
      {
        q: 'What is the SME loan policy?',
        tags: ['sme', 'small business', 'medium enterprise', 'entrepreneur', 'sme loan', 'business loan'],
        category: 'business',
        a: `<p>🏭 <strong>SME Loans</strong> offer special benefits for small and medium enterprises.</p>
            <ul>
              <li>💰 Cluster-based SME loan disbursement</li>
              <li>👩 Special interest rates for women entrepreneurs</li>
              <li>🎯 Annual SME lending targets set by BB</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/smesupport/smepolicies" target="_blank" style="color:#006A4E;font-weight:bold;">SME Policies →</a></p>`
      },
      {
        q: 'Agricultural and rural credit information',
        tags: ['agriculture', 'rural credit', 'farmer loan', 'crop loan', 'agri loan'],
        category: 'business',
        a: `<p>🌾 <strong>Agricultural Credit</strong> is Bangladesh Bank's commitment to food security.</p>
            <ul>
              <li>📅 Annual agri credit targets set by BB</li>
              <li>💸 Subsidized interest rate schemes available</li>
              <li>🌿 Green finance focus in agriculture</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/ruralmicrocredit/agrocreditpolicies" target="_blank" style="color:#006A4E;font-weight:bold;">Agri Credit Policies →</a></p>`
      },
      {
        q: 'What is agent banking?',
        tags: ['agent banking', 'branchless banking', 'rural banking', 'agent'],
        category: 'business',
        a: `<p>🤝 <strong>Agent Banking</strong> brings banking services to remote areas.</p>
            <ul>
              <li>🏘️ Services through agents in branch-free areas</li>
              <li>💳 Account opening, deposits, withdrawals, transfers</li>
              <li>📱 Secured with biometric verification</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/financialinclusion/agentbankinginfo" target="_blank" style="color:#006A4E;font-weight:bold;">Agent Banking →</a></p>`
      },
      {
        q: 'What is green banking and sustainable finance?',
        tags: ['green banking', 'sustainable finance', 'esg', 'environment', 'green loan', 'climate'],
        category: 'business',
        a: `<p>🌿 <strong>Green Banking</strong> promotes environmentally responsible financing.</p>
            <ul>
              <li>☀️ Special loans for renewable energy projects</li>
              <li>🏭 Credit restricted for polluting industries</li>
              <li>🌱 ESG guidelines must be followed by all banks</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/sustainablefinance/greenfinanceall" target="_blank" style="color:#006A4E;font-weight:bold;">Green Finance →</a></p>`
      },
      {
        q: 'Trade finance and Letter of Credit (LC)',
        tags: ['trade finance', 'lc', 'letter of credit', 'import', 'export', 'back to back lc'],
        category: 'business',
        a: `<p>🚢 <strong>Trade Finance</strong> is the backbone of import-export commerce.</p>
            <ul>
              <li>📜 LC (Letter of Credit) rules set by Bangladesh Bank</li>
              <li>💵 Back-to-Back LC special facility for exporters</li>
              <li>🔐 Handled through Authorized Dealer (AD) banks</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/fxmonitor/importinfo" target="_blank" style="color:#006A4E;font-weight:bold;">Import Info →</a> | <a href="https://www.bb.org.bd/en/index.php/fxmonitor/exportinfo" target="_blank" style="color:#006A4E;font-weight:bold;">Export Info →</a></p>`
      },
      {
        q: 'How do RTGS and BEFTN payment systems work?',
        tags: ['rtgs', 'beftn', 'payment system', 'fund transfer', 'npsb', 'electronic transfer'],
        category: 'business',
        a: `<p>💳 <strong>Payment Systems</strong> enable fast and secure transactions.</p>
            <ul>
              <li>⚡ RTGS: Instant transfer for large amounts (BDT 1 lakh+)</li>
              <li>🔄 BEFTN: Batch Electronic Fund Transfer for smaller amounts</li>
              <li>💳 NPSB: National Payment Switch (ATM & POS)</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/paymentsys/bpsreport" target="_blank" style="color:#006A4E;font-weight:bold;">Payment Report →</a></p>`
      },
      {
        q: 'How to get a banking license?',
        tags: ['banking license', 'new bank', 'license application', 'nbfi', 'scheduled bank license'],
        category: 'business',
        a: `<p>🏦 <strong>Banking Licenses</strong> are granted by Bangladesh Bank.</p>
            <ul>
              <li>📋 Apply under the Bank Companies Act, 1991</li>
              <li>💰 Minimum paid-up capital required</li>
              <li>🔍 BB conducts rigorous due diligence before granting</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/regulationguideline/brpd" target="_blank" style="color:#006A4E;font-weight:bold;">BRPD Circulars →</a></p>`
      },
      {
        q: 'What is the interest rate cap policy?',
        tags: ['interest rate cap', 'lending rate', 'deposit rate', 'rate ceiling', 'spread'],
        category: 'business',
        a: `<p>📊 <strong>Interest Rate Policy</strong> controls the cost of borrowing.</p>
            <ul>
              <li>🔢 BB periodically sets maximum lending rates</li>
              <li>📅 Current policy detailed in MPS statements</li>
              <li>🏭 Special rates apply for SME and agriculture sectors</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/monetarypolicy/mpsdetail" target="_blank" style="color:#006A4E;font-weight:bold;">Monetary Policy Statement →</a></p>`
      },
      {
        q: 'Anti-money laundering (AML/CFT)',
        tags: ['aml', 'cft', 'money laundering', 'anti money laundering', 'bfiu', 'financial crime'],
        category: 'business',
        a: `<p>🛡️ <strong>AML/CFT</strong> — Prevention of money laundering and terrorist financing.</p>
            <ul>
              <li>⚖️ Governed by Money Laundering Prevention Act, 2012</li>
              <li>🔍 BB's BFIU (Bangladesh Financial Intelligence Unit) is responsible</li>
              <li>📋 Suspicious Transaction Reports (STR) are mandatory</li>
              <li>🌐 FATF guidelines are followed</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/financialintelligence/aboutbfiu" target="_blank" style="color:#006A4E;font-weight:bold;">BFIU →</a></p>`
      },

      // ── investor
      {
        q: 'What is the NRB Bond?',
        tags: ['nrb bond', 'non-resident bond', 'expatriate bond', 'nrb investment'],
        category: 'investor',
        a: `<p>📜 <strong>NRB Bond</strong> is a special investment for expatriate Bangladeshis.</p>
            <ul>
              <li>💹 Attractive interest rates</li>
              <li>🔒 Government guarantee</li>
              <li>💵 Invest and earn profit in foreign currency</li>
              <li>🏦 Available at any authorized bank</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/investfacility/nrbbond" target="_blank" style="color:#006A4E;font-weight:bold;">NRB Bond Details →</a></p>`
      },
      {
        q: 'What is an NFCD or RFC foreign currency account?',
        tags: ['nfcd', 'rfc', 'foreign currency account', 'dollar account', 'fc account'],
        category: 'investor',
        a: `<p>💵 <strong>NFCD/RFC Accounts</strong> allow savings in foreign currency.</p>
            <ul>
              <li>🏦 NFCD: Non-Resident Foreign Currency Deposit</li>
              <li>🌍 RFC: Resident Foreign Currency Account (returnees)</li>
              <li>💹 Interest earned in foreign currency</li>
              <li>✈️ Can be used for foreign travel expenses</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/investfacility/nrbbond" target="_blank" style="color:#006A4E;font-weight:bold;">Investment Facilities →</a></p>`
      },
      {
        q: 'What is the Wage Earner Development Bond?',
        tags: ['wage earner bond', 'wage earner development bond', 'expatriate worker bond'],
        category: 'investor',
        a: `<p>💰 <strong>Wage Earner Development Bond</strong> for overseas workers.</p>
            <ul>
              <li>🎯 Tenure: 3 years and 5 years</li>
              <li>💹 Attractive profit rate</li>
              <li>🔒 Government security</li>
              <li>🏦 Available at any authorized bank</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/investfacility/nrbbond" target="_blank" style="color:#006A4E;font-weight:bold;">Bond Info →</a></p>`
      },
      {
        q: 'US Dollar Premium Bond and Investment Bond',
        tags: ['us dollar bond', 'dollar premium bond', 'usd bond', 'dollar investment bond'],
        category: 'investor',
        a: `<p>🇺🇸 <strong>US Dollar Premium Bond</strong> & <strong>US Dollar Investment Bond</strong></p>
            <ul>
              <li>💵 Invest and earn profit in US Dollars</li>
              <li>🎯 Tenure: 3 years</li>
              <li>✅ Available for expatriate Bangladeshis</li>
              <li>🏦 Available at authorized banks and Bangladesh Bank</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/investfacility/nrbbond" target="_blank" style="color:#006A4E;font-weight:bold;">Investment Bonds →</a></p>`
      },
      {
        q: 'What is Sanchayapatra (savings certificate)?',
        tags: ['sanchayapatra', 'savings certificate', 'national savings', 'savings scheme'],
        category: 'investor',
        a: `<p>📋 <strong>Sanchayapatra</strong> is the government's national savings scheme.</p>
            <ul>
              <li>📜 Types: Family, Pensioner, Quarterly profit-based</li>
              <li>💰 Attractive profit rates</li>
              <li>🏦 Available at banks and National Savings Bureau</li>
              <li>⚠️ Purchase limits and tax rules apply</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/investfacility/nrbbond" target="_blank" style="color:#006A4E;font-weight:bold;">Investment Facilities →</a></p>`
      },
      {
        q: "Capital market and Bangladesh Bank's role",
        tags: ['capital market', 'stock market', 'bsec', 'share market', 'stock exchange', 'dse', 'cse'],
        category: 'investor',
        a: `<p>📈 <strong>Capital Market</strong> and Bangladesh Bank's relationship.</p>
            <ul>
              <li>🔗 BSEC regulates the capital market</li>
              <li>🏦 BB monitors banks' capital market investments</li>
              <li>💹 Bank exposure limits set by BB</li>
              <li>📊 DSE and CSE are the two stock exchanges</li>
            </ul>
            <p>🔗 <a href="https://www.bb.org.bd/en/index.php/regulationguideline/brpd" target="_blank" style="color:#006A4E;font-weight:bold;">Regulatory Guidelines →</a></p>`
      }
    ]
  };

  // ── Suggested chips per category ─────────────────────────────────────────
  const SUGGESTED = {
    bn: {
      all:      ['বাংলাদেশ ব্যাংক কী?', 'বিনিময় হার কত?', 'রেমিট্যান্স কীভাবে পাবো?', 'অভিযোগ কোথায় করব?', 'NRB বন্ড কী?', 'SME ঋণ নীতি কী?', 'গভর্নর কে?', 'মুদ্রানীতি কী?'],
      customer: ['বিনিময় হার কত?', 'রেমিট্যান্স কীভাবে পাবো?', '২.৫% প্রণোদনা কীভাবে পাবো?', 'অভিযোগ কোথায় করব?', 'লাইসেন্সড ব্যাংক তালিকা', 'মোবাইল ব্যাংকিং কী?'],
      business: ['SME ঋণ নীতি কী?', 'কৃষি ঋণ সম্পর্কে জানতে চাই', 'এজেন্ট ব্যাংকিং কী?', 'ট্রেড ফাইন্যান্স ও এলসি', 'RTGS ও BEFTN কী?', 'ব্যাংকিং লাইসেন্স কীভাবে পাবো?'],
      investor: ['NRB বন্ড কী?', 'ওয়েজ আর্নার বন্ড কী?', 'NFCD অ্যাকাউন্ট কী?', 'ডলার বন্ড সম্পর্কে জানতে চাই', 'সঞ্চয়পত্র সম্পর্কে জানতে চাই', 'পুঁজিবাজারে BB-র ভূমিকা']
    },
    en: {
      all:      ['What is Bangladesh Bank?', "Today's exchange rate?", 'How to receive remittance?', 'Where to file a complaint?', 'What is NRB Bond?', 'What is SME loan policy?', 'Who is the Governor?', 'What is monetary policy?'],
      customer: ["Today's exchange rate?", 'How to receive remittance?', 'How to get 2.5% incentive?', 'Where to file a complaint?', 'List of licensed banks?', 'What is mobile banking?'],
      business: ['What is SME loan policy?', 'Agricultural credit info', 'What is agent banking?', 'Trade finance and LC', 'How do RTGS and BEFTN work?', 'How to get a banking license?'],
      investor: ['What is NRB Bond?', 'What is Wage Earner Bond?', 'What is NFCD account?', 'What is US Dollar Bond?', 'What is Sanchayapatra?', "Capital market and BB's role"]
    }
  };

  // ── Answer matcher (enhanced scoring) ────────────────────────────────────
  function findAnswer(input) {
    const lower = input.toLowerCase();
    const words = lower.split(/\s+/).filter(w => w.length > 1);

    function score(items) {
      let best = null, bestScore = 0;
      for (const item of items) {
        let s = 0;
        for (const tag of item.tags) {
          const t = tag.toLowerCase();
          if (lower.includes(t)) s += 2;
          for (const w of words) {
            if (t.includes(w) || w.includes(t)) s += 0.5;
          }
        }
        if (lower.includes(item.q.toLowerCase())) s += 10;
        if (s > bestScore) { bestScore = s; best = item; }
      }
      return { best, bestScore };
    }

    const pool = QA[lang];
    const catPool = activeCategory === 'all' ? pool : pool.filter(i => i.category === activeCategory);
    let { best, bestScore } = score(catPool);

    // fallback: search all categories if no match in active one
    if (bestScore < 1 && activeCategory !== 'all') {
      ({ best, bestScore } = score(pool));
    }

    return bestScore < 1 ? UI[lang].noAnswer : best.a;
  }

  // ── CSS ───────────────────────────────────────────────────────────────────
  const css = `
    #bb-chatbot-toggle, #bb-chatbot-window {
      font-family: 'Noto Sans Bengali', Arial, sans-serif;
    }
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
    #bb-chatbot-window {
      position: fixed; bottom: 102px; right: 24px; z-index: 2147483646;
      width: 390px; max-height: 610px; border-radius: 18px;
      background: #fff; box-shadow: 0 8px 40px rgba(0,0,0,0.18);
      display: flex; flex-direction: column; overflow: hidden;
      transform: scale(0.85) translateY(30px); opacity: 0;
      transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
      pointer-events: none;
    }
    #bb-chatbot-window.bbopen {
      transform: scale(1) translateY(0); opacity: 1; pointer-events: all;
    }
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
    .bbhdr-info { flex: 1; min-width: 0; }
    .bbhdr-title { color: #fff; font-size: 13.5px; font-weight: 700; margin: 0; line-height: 1.2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .bbhdr-sub { color: rgba(255,255,255,0.8); font-size: 11px; margin: 3px 0 0; }
    .bbdot {
      width: 7px; height: 7px; border-radius: 50%; background: #4ade80;
      display: inline-block; margin-right: 4px; animation: bbpulse 2s infinite;
    }
    @keyframes bbpulse { 0%,100%{opacity:1} 50%{opacity:0.35} }
    .bbhdr-actions { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
    .bblang {
      background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.35);
      cursor: pointer; color: #fff; height: 26px; border-radius: 13px;
      padding: 0 9px; font-size: 11px; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.2s; font-family: inherit;
    }
    .bblang:hover { background: rgba(255,255,255,0.3); }
    .bbclosebtn {
      background: rgba(255,255,255,0.15); border: none; cursor: pointer;
      color: #fff; width: 28px; height: 28px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 15px; transition: background 0.2s; flex-shrink: 0;
    }
    .bbclosebtn:hover { background: rgba(255,255,255,0.3); }
    .bbcats {
      display: flex; background: #fff; border-bottom: 1px solid #e0f0e8;
      flex-shrink: 0; overflow-x: auto; padding: 0 4px;
    }
    .bbcats::-webkit-scrollbar { display: none; }
    .bbcat {
      padding: 8px 11px; font-size: 11.5px; border: none; background: none;
      cursor: pointer; color: #888; font-family: inherit; white-space: nowrap;
      border-bottom: 2px solid transparent; transition: all 0.2s; font-weight: 500;
    }
    .bbcat:hover { color: #006A4E; }
    .bbcat.active { color: #006A4E; border-bottom-color: #006A4E; font-weight: 700; }
    .bbquick {
      display: flex; gap: 6px; padding: 8px 13px;
      background: #f5faf7; border-bottom: 1px solid #e0f0e8;
      overflow-x: auto; flex-shrink: 0;
    }
    .bbquick::-webkit-scrollbar { display: none; }
    .bbquick-btn {
      background: #fff; border: 1.5px solid #b5ddc8; color: #006A4E;
      border-radius: 20px; padding: 5px 12px; font-size: 11px;
      cursor: pointer; white-space: nowrap; font-family: inherit;
      font-weight: 600; transition: all 0.2s; text-decoration: none;
      display: inline-flex; align-items: center;
    }
    .bbquick-btn:hover { background: #006A4E; color: #fff; border-color: #006A4E; }
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
    .bbsugs {
      padding: 8px 13px; background: #fff; border-top: 1px solid #e0f0e8;
      display: flex; gap: 5px; flex-wrap: wrap; flex-shrink: 0;
    }
    .bbsugbtn {
      background: #eaf5ef; border: 1px solid #b5ddc8; color: #006A4E;
      border-radius: 20px; padding: 4px 11px; font-size: 11px;
      cursor: pointer; transition: all 0.2s; font-family: inherit; white-space: nowrap;
    }
    .bbsugbtn:hover { background: #006A4E; color: #fff; border-color: #006A4E; }
    .bbinp-area {
      padding: 10px 13px; background: #fff; border-top: 1px solid #e0f0e8;
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
    .bbfoot {
      text-align: center; padding: 5px; background: #006A4E;
      font-size: 10px; color: rgba(255,255,255,0.7); flex-shrink: 0;
    }
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

  // ── Toggle button ──────────────────────────────────────────────────────────
  const toggle = document.createElement('button');
  toggle.id = 'bb-chatbot-toggle';
  toggle.setAttribute('title', UI[lang].toggleTitle);
  toggle.innerHTML = '<div class="t-inner">🏦</div>';

  // ── Chat window ────────────────────────────────────────────────────────────
  const win = document.createElement('div');
  win.id = 'bb-chatbot-window';

  function buildWindow() {
    const u = UI[lang];
    win.innerHTML = `
      <div class="bbhdr">
        <div class="bbhdr-icon">🏛️</div>
        <div class="bbhdr-info">
          <p class="bbhdr-title" id="bb-title">${u.title}</p>
          <p class="bbhdr-sub"><span class="bbdot"></span><span id="bb-online">${u.online}</span></p>
        </div>
        <div class="bbhdr-actions">
          <button class="bblang" id="bb-lang">${u.langLabel}</button>
          <button class="bbclosebtn" id="bb-close-btn">✕</button>
        </div>
      </div>

      <div class="bbcats" id="bb-cats"></div>
      <div class="bbquick" id="bb-quick"></div>

      <div class="bbmsgs" id="bb-messages">
        <div class="bbmsg bot">
          <div class="bbbub">
            <div class="bbwelcome">
              <div class="bbwelcome-flag"><div class="rc"></div></div>
              <h3 id="bb-welcome-title">${u.welcomeTitle}</h3>
              <p id="bb-welcome-text">${u.welcomeText}</p>
            </div>
          </div>
          <span class="bbt">${getTime()}</span>
        </div>
      </div>

      <div class="bbsugs" id="bb-sugs"></div>

      <div class="bbinp-area">
        <input class="bbinp" id="bb-input" type="text"
          placeholder="${u.placeholder}" autocomplete="off"/>
        <button class="bbsendbtn" id="bb-send" title="Send">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>

      <div class="bbfoot" id="bb-foot">${u.footer}</div>
    `;
    renderCats();
    renderQuick();
    wireEvents();
  }

  function renderCats() {
    const u = UI[lang];
    const el = document.getElementById('bb-cats');
    if (!el) return;
    el.innerHTML = Object.entries(u.cats).map(([k, v]) =>
      `<button class="bbcat${activeCategory === k ? ' active' : ''}" data-cat="${k}">${v}</button>`
    ).join('');
    el.querySelectorAll('.bbcat').forEach(b => {
      b.onclick = () => {
        activeCategory = b.dataset.cat;
        renderCats();
        renderSugs('');
      };
    });
  }

  function renderQuick() {
    const el = document.getElementById('bb-quick');
    if (!el) return;
    el.innerHTML = UI[lang].quickActions.map(a =>
      `<a class="bbquick-btn" href="${a.url}" target="_blank" rel="noopener">${a.label}</a>`
    ).join('');
  }

  function renderSugs(exclude) {
    const el = document.getElementById('bb-sugs');
    if (!el) return;
    const pool = SUGGESTED[lang][activeCategory] || SUGGESTED[lang].all;
    const filtered = pool.filter(s => s !== exclude);
    const start = sugIdx % filtered.length;
    const show = [...filtered.slice(start, start + 4), ...filtered.slice(0, Math.max(0, 4 - (filtered.length - start)))].slice(0, 4);
    sugIdx += 4;
    el.innerHTML = show.map(s => `<button class="bbsugbtn" data-q="${s}">${s}</button>`).join('');
    el.querySelectorAll('.bbsugbtn').forEach(b => b.onclick = () => sendMsg(b.dataset.q));
  }

  function getTime() {
    return new Date().toLocaleTimeString(lang === 'bn' ? 'bn-BD' : 'en-US', { hour: '2-digit', minute: '2-digit' });
  }

  function appendMsg(html, role) {
    const msgs = document.getElementById('bb-messages');
    if (!msgs) return;
    const d = document.createElement('div');
    d.className = 'bbmsg ' + role;
    d.innerHTML = '<div class="bbbub">' + html + '</div><span class="bbt">' + getTime() + '</span>';
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function showThinking(cb) {
    const msgs = document.getElementById('bb-messages');
    if (!msgs) return;
    const phrases = UI[lang].thinking;
    const d = document.createElement('div');
    d.className = 'bbmsg bot';
    d.id = 'bb-thinking-msg';
    d.innerHTML = `<div class="bbbub"><div class="bbthink">
      <div class="bbdots"><span></span><span></span><span></span></div>
      <span class="bbthinktxt" id="bb-thinktxt">${phrases[0]}</span>
    </div></div>`;
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
    let i = 0;
    const iv = setInterval(() => {
      i++;
      const el = document.getElementById('bb-thinktxt');
      if (el && i < phrases.length) el.textContent = phrases[i];
    }, 600);
    setTimeout(() => {
      clearInterval(iv);
      const el = document.getElementById('bb-thinking-msg');
      if (el) el.remove();
      cb();
    }, phrases.length * 640 + 150);
  }

  function sendMsg(text) {
    if (!text.trim()) return;
    const inp = document.getElementById('bb-input');
    if (inp) inp.value = '';
    appendMsg(text, 'user');
    renderSugs(text);
    showThinking(() => appendMsg(findAnswer(text), 'bot'));
  }

  function wireEvents() {
    document.getElementById('bb-close-btn').onclick = e => {
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
    document.getElementById('bb-lang').onclick = () => {
      lang = lang === 'bn' ? 'en' : 'bn';
      sugIdx = 0;
      buildWindow();
      renderSugs('');
    };
  }

  document.body.appendChild(toggle);
  document.body.appendChild(win);
  buildWindow();

  // ── Toggle open/close ──────────────────────────────────────────────────────
  let isOpen = false;
  toggle.onclick = () => {
    isOpen = !isOpen;
    win.classList.toggle('bbopen', isOpen);
    if (isOpen) {
      renderSugs('');
      setTimeout(() => { const inp = document.getElementById('bb-input'); if (inp) inp.focus(); }, 350);
    }
  };

  console.log('[BB Chatbot] ✅ Bangladesh Bank Chatbot loaded successfully!');
})();
