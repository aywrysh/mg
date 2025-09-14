
/* Dynex Global i18n — AR/EN base + multi-language expansion */
(function (window, document) {
  const STORAGE_KEY = 'lang';
  const DEFAULT = localStorage.getItem(STORAGE_KEY) || 'en';




// أضف اللغات بعد تهيئة DynexI18N
window.addEventListener('DOMContentLoaded', function () {
  DynexI18N.addLangPairs('tr', [
    ['تسجيل دخول','Giriş yap'],
    ['خدمة العملاء','Müşteri hizmetleri'],
    ['إلغاء','İptal'],
    ['حفظ','Kaydet'],
    ['تسجيل الخروج','Çıkış']
  ]);

  DynexI18N.addLangPairs('fr', [
    ['تسجيل دخول','Connexion'],
    ['خدمة العملاء','Service client'],
    ['إلغاء','Annuler'],
    ['حفظ','Enregistrer'],
    ['تسجيل الخروج','Déconnexion']
  ]);

  DynexI18N.addLangPairs('fa', [
    ['تسجيل دخول','ورود'],
    ['خدمة العملاء','پشتیبانی'],
    ['إلغاء','لغو'],
    ['حفظ','ذخیره'],
    ['تسجيل الخروج','خروج']
  ]);

  DynexI18N.addLangPairs('ur', [
    ['تسجيل دخول','لاگ ان'],
    ['خدمة العملاء','کسٹمر سروس'],
    ['إلغاء','منسوخ'],
    ['حفظ','محفوظ کریں'],
    ['تسجيل الخروج','لاگ آؤٹ']
  ]);

  DynexI18N.addLangPairs('id', [
    ['تسجيل دخول','Masuk'],
    ['خدمة العملاء','Dukungan'],
    ['إلغاء','Batal'],
    ['حفظ','Simpan'],
    ['تسجيل الخروج','Keluar']
  ]);

  // اجعل اللغة المختارة فعّالة
  // إمّا ضبط افتراضي:
  // localStorage.setItem('lang','tr');
  // أو تطبيقها مباشرة:
  applyLang(localStorage.getItem('lang') || 'tr');
});



  /* ====== الأدوات المساعدة ====== */
  const unifyDots = s => String(s).replace(/\u2026/g,'...'); // … -> ...
  const rmTashkeel = s => String(s).replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g,'');
  const normAr = s => unifyDots(rmTashkeel(String(s)))
    .replace(/[أإآ]/g,'ا').replace(/ى/g,'ي').replace(/ئ/g,'ي').replace(/ة/g,'ه')
    .replace(/\s+/g,' ').trim();
  const normAny = s => unifyDots(String(s)).replace(/\s+/g,' ').trim();
  const isIconEl = (el)=>{
    if (!el) return false;
    if (el.classList && (el.classList.contains('ms') || el.classList.contains('mi'))) return true;
    const ff = (getComputedStyle(el).fontFamily||'').toLowerCase();
    return ff.includes('material symbols') || ff.includes('material icons');
  };
  const ATTRS = ['placeholder','title','aria-label','value'];

  /* ====== خرائط AR↔EN القديمة (متوافقة مع كودك الأصلي) ====== */
  const PAIRS = []; // سنملأها لاحقًا إذا كنت تحمّلها من ملفك الأصلي

  // هذه الخرائط كانت في نسختك الأصلية
  const ar2en = new Map(), en2ar = new Map();
  const arRaw = new Map(), enRaw = new Map();
  const pickLonger = (a, b) => (!a || (b && b.length > a.length)) ? b : a;

  function ingestArEnPairs(pairs){
    pairs.forEach(([ar,en])=>{
      const kAr = normAr(ar), kEn = normAny(en);
      ar2en.set(kAr, en);
      en2ar.set(kEn, ar);
      arRaw.set(kAr, pickLonger(arRaw.get(kAr), String(ar)));
      enRaw.set(kEn, pickLonger(enRaw.get(kEn), String(en)));
    });
  }

  /* ====== توسعة: لغات إضافية (Pivot = Arabic) ====== */
  // مثال: maps.ar2['tr'] = Map(normAr(ar) -> trText)
  //       maps.toAr['tr'] = Map(normAny(tr) -> arText)
  const maps = { ar2:Object.create(null), toAr:Object.create(null) };
  const lists = { ar2:Object.create(null), toAr:Object.create(null) }; // مصفوفات مرتبة للأطول أولًا للاستبدال الجزئي

  function rebuildListsFor(lang){
    // ar->lang
    const m1 = maps.ar2[lang] || new Map();
    lists.ar2[lang] = Array.from(m1.entries())
      .map(([k,to]) => ({ from:k, to, raw: arRaw.get(k) || k }))
      .sort((a,b)=> (b.raw||'').length - (a.raw||'').length);

    // lang->ar
    const m2 = maps.toAr[lang] || new Map();
    lists.toAr[lang] = Array.from(m2.entries())
      .map(([k,to]) => ({ from:k, to, raw: k }))
      .sort((a,b)=> (b.raw||'').length - (a.raw||'').length);
  }

  function addLangPairs(lang, pairs){
    if (!lang || !Array.isArray(pairs)) return;
    if (!maps.ar2[lang]) maps.ar2[lang] = new Map();
    if (!maps.toAr[lang]) maps.toAr[lang] = new Map();

    pairs.forEach(([ar, lx])=>{
      const kAr = normAr(ar);
      const kLx = normAny(lx);
      maps.ar2[lang].set(kAr, lx);
      maps.toAr[lang].set(kLx, ar);
      // نستفيد من arRaw للأطول أولًا
      arRaw.set(kAr, pickLonger(arRaw.get(kAr), String(ar)));
    });

    rebuildListsFor(lang);
  }

  /* ====== القوائم النهائية للـ AR/EN القديمة ====== */
  let AR_LIST = [], EN_LIST = [];
  function rebuildArEnLists(){
    AR_LIST = Array.from(ar2en.entries())
      .map(([k,to]) => ({ from:k, to, raw: arRaw.get(k) || k }))
      .sort((a,b)=> b.raw.length - a.raw.length);

    EN_LIST = Array.from(en2ar.entries())
      .map(([k,to]) => ({ from:k, to, raw: enRaw.get(k) || k }))
      .sort((a,b)=> b.raw.length - a.raw.length);
  }

  /* ====== الترجمة الذكية (تدعم أي لغة مضافة) ====== */
  function translateSmart(text, target){
    if (text == null) return text;
    const original = String(text);
    const canon = unifyDots(original);
    const trimmed = canon.replace(/\s+/g,' ').trim();
    if (!trimmed) return text;

    // أرقام/رموز فقط؟ تجاهل
    if (/^[\d\s\.\,\:\-\+\(\)\/\\\%\$]+$/.test(trimmed)) return text;

    // العربية كهدف: حوّل من أي لغة مضافة (ومن EN أيضًا) إلى AR
    if (target === 'ar'){
      // 1) exact EN->AR
      const hitEn = en2ar.get(normAny(trimmed));
      if (hitEn != null) return original.replace(canon, hitEn);

      // 2) exact anyLang->AR
      for (const lang in maps.toAr){
        const hit = maps.toAr[lang].get(normAny(trimmed));
        if (hit != null) return original.replace(canon, hit);
      }

      // 3) substring replace (EN)
      let out = canon;
      EN_LIST.forEach(({raw,to})=>{
        const pat = unifyDots(raw).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
        out = out.replace(new RegExp(pat,'gi'), to);
      });
      // 4) substring replace (any lang -> AR)
      for (const lang in lists.toAr){
        lists.toAr[lang].forEach(({raw,to})=>{
          const pat = unifyDots(raw).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
          out = out.replace(new RegExp(pat,'gi'), to);
        });
      }
      return original.replace(canon, out);
    }

    // هدف غير العربي: نترجم من العربي إلى تلك اللغة
    // 1) AR->EN إذا target=en (للتوافق)
    if (target === 'en'){
      const hit = ar2en.get(normAr(trimmed));
      if (hit != null) return original.replace(canon, hit);

      let out = canon;
      AR_LIST.forEach(({raw,to})=>{
        const pat = unifyDots(raw).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
        out = out.replace(new RegExp(pat,'g'), to);
      });
      return original.replace(canon, out);
    }

    // 2) AR->LANG (أي لغة مضافة)
    if (maps.ar2[target]){
      const hit = maps.ar2[target].get(normAr(trimmed));
      if (hit != null) return original.replace(canon, hit);

      let out = canon;
      (lists.ar2[target] || []).forEach(({raw,to})=>{
        const pat = unifyDots(raw).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
        out = out.replace(new RegExp(pat,'g'), to);
      });
      return original.replace(canon, out);
    }

    // إن كانت لغة غير معرّفة، نعيد النص كما هو
    return text;
  }

  function translateTextNode(node, lang){
    if (!node || node.nodeType !== 3) return;
    const p = node.parentElement;
    if (!p) return;
    if (p.closest('script,style,code,pre,[data-i18n-skip]')) return;
    if (isIconEl(p)) return;
    const v = (node.nodeValue||'').trim();
    if (!v) return;
    if (/^[\d\s\.\,\:\-\+\(\)\/\\\%\$]+$/.test(v)) return;
    const repl = translateSmart(node.nodeValue, lang);
    if (repl !== node.nodeValue) node.nodeValue = repl;
  }

  function translateTextNodes(root, lang){
    const walker = document.createTreeWalker(root||document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(n){
        const p=n.parentElement; if(!p) return NodeFilter.FILTER_REJECT;
        if (p.closest('script,style,code,pre,[data-i18n-skip]')) return NodeFilter.FILTER_REJECT;
        if (isIconEl(p)) return NodeFilter.FILTER_REJECT;
        const v=(n.nodeValue||'').trim(); if(!v) return NodeFilter.FILTER_REJECT;
        if (/^[\d\s\.\,\:\-\+\(\)\/\\\%\$]+$/.test(v)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes=[]; while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n=> translateTextNode(n, lang));
  }

  function translateAttrs(lang){
    const shouldTranslateValue = (el)=>{
      if (el.tagName === 'BUTTON') return true;
      if (el.tagName === 'INPUT') {
        const tp=(el.type||'').toLowerCase();
        return tp==='button'||tp==='submit'||tp==='reset';
      }
      return false;
    };
    document.querySelectorAll('[placeholder],[title],[aria-label],[value]').forEach(el=>{
      if (el.closest('[data-i18n-skip]')) return;
      if (isIconEl(el)) return;
      if (el.tagName==='INPUT' && el.type==='hidden') return;
      ATTRS.forEach(a=>{
        if (a==='value' && !shouldTranslateValue(el)) return;
        const v = el.getAttribute(a);
        if (!v) return;
        const r = translateSmart(v, lang);
        if (r !== v) el.setAttribute(a, r);
      });
    });
  }

  function translateTitle(lang){
    const t = translateSmart(document.title, lang);
    if (t) document.title = t;
  }

  function setDir(lang){
    document.documentElement.lang = lang;
    document.documentElement.dir  = (lang==='ar') ? 'rtl' : 'ltr';
  }

  function applyLang(lang){
    const L = (lang || 'en').toLowerCase();
    localStorage.setItem(STORAGE_KEY, L);
    setDir(L);
    translateTitle(L);
    translateAttrs(L);
    translateTextNodes(document.body, L);
    document.dispatchEvent(new CustomEvent('i18n:change',{detail:{lang:L}}));
  }

  /* ====== MutationObserver ====== */
  const mo = new MutationObserver(muts=>{
    const lang = localStorage.getItem(STORAGE_KEY) || 'en';
    muts.forEach(m=>{
      if (m.type==='characterData' && m.target && m.target.nodeType===3){
        translateTextNode(m.target, lang);
        return;
      }
      if (m.type==='attributes'){
        if (ATTRS.includes(m.attributeName)) translateAttrs(lang);
        return;
      }
      if (m.type==='childList'){
        m.addedNodes.forEach(node=>{
          if (!node) return;
          if (node.nodeType===3) translateTextNode(node, lang);
          else if (node.nodeType===1){ translateAttrs(lang); translateTextNodes(node, lang); }
        });
      }
    });
  });
  mo.observe(document.documentElement,{childList:true, subtree:true, characterData:true, attributes:true, attributeFilter:ATTRS});

  /* ====== تغليف toast ====== */
  try{
    let _toast=null;
    Object.defineProperty(window,'toast',{
      configurable:true,
      get(){ return _toast; },
      set(fn){
        if (typeof fn!=='function'){ _toast = fn; return; }
        _toast = function(msg){
          const lang = localStorage.getItem(STORAGE_KEY) || 'en';
          return fn.call(window, translateSmart(msg, lang));
        };
      }
    });
  }catch(_){}

  /* ====== API عام ====== */
  window.applyLang = applyLang;
  window.DynexI18N = {
    apply: applyLang,
    current: ()=> localStorage.getItem(STORAGE_KEY)||'en',
    addPairs: (arr)=>{            // توافق مع سكربتك القديم (AR <-> EN)
      ingestArEnPairs(arr||[]);
      rebuildArEnLists();
    },
    addLangPairs: addLangPairs    // الجديد: أضف لغة جديدة كأزواج (عربي, لغة)
  };

  /* ====== تشغيل أولي ====== */
  // حمّل أزواج AR/EN القديمة إن كانت لديك في متغيّر PAIRS خارجي
  try{ if (Array.isArray(PAIRS) && PAIRS.length) { ingestArEnPairs(PAIRS); rebuildArEnLists(); } }catch(_){}
  const run = ()=>applyLang(DEFAULT);
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded', run, {once:true});
  else run();
  window.addEventListener('load', ()=>applyLang(localStorage.getItem(STORAGE_KEY)||DEFAULT));
  setTimeout(()=>applyLang(localStorage.getItem(STORAGE_KEY)||DEFAULT), 0);
})(window, document);
