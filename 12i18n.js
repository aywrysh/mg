// ===== Dynex Maintenance (Thu+Fri OFF) — Global Guard (Aden TZ) =====
(function (window, document) {
  'use strict';

  /* ✅ وضع تجربة: عطّلناه */
  const TEST_MODE = false; // ← خليها false بالإنتاج

  /* صفحات/أهداف ممنوعة (إيداع/سحب/تحويل/تداول) */
  const BLOCKED_PATH_RE = /(index2\.html|index4\.html|index5\.html|index8\.html|index3\.html|index7\.html)/i;

  /* سلكتورات عامة للأزرار لو كانت Buttons أو عناصر عليها داتا-أكشن */
  const BLOCK_SELECTORS = [
    '[data-action="deposit"]','[data-action="withdraw"]','[data-action="transfer"]','[data-action="trade"]',
    '.btn-deposit','.btn-withdraw','.btn-transfer','.btn-trade',
    '#depositBtn','#withdrawBtn','#transferBtn','#tradeBtn',
    // روابطك الحالية:
    'a[href*="index2.html"]', // إيداع
    'a[href*="index8.html"]', // سحب
    'a[href*="index4.html"]', // تحويل
    'a[href*="index5.html"]', // إيداع إلى حساب
    'a[href*="index3.html"]', // تداول (بعض الصفحات)
    'a[href*="index7.html"]'  // تداول (صفحتك الحالية)
  ];

  /* نص الأوفرلاي */
  const TEXT = {
    ar: { title: '؟', line1: 'الخدمة المالية والتداول متوقفة حاليًا.', line2: 'الخميس والجمعة عطلة — حاول لاحقًا.' },
    en: { title: '?', line1: 'Financial actions and trading are paused.', line2: 'Thursday & Friday: off — try later.' }
  };

  const TZ = 'Asia/Aden';
  const AUTOHIDE_MS = 2600;
  const HOME_CANDIDATES = ['index1.html','index.html','./'];

  // ===== Helpers =====
  function getLang() {
    try { return (localStorage.getItem('lang') || document.documentElement.lang || 'ar').slice(0,2); }
    catch { return 'ar'; }
  }

  function dayInTZ(tz) {
    try {
      const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: tz, weekday: 'short' });
      const map = { Sun:0, Mon:1, Tue:2, Wed:3, Thu:4, Fri:5, Sat:6 };
      return map[fmt.format(new Date())];
    } catch { return new Date().getDay(); }
  }

  // ✅ عطلة: الخميس (4) والجمعة (5) بتوقيت عدن — يومان كاملان من 00:00 الخميس حتى 00:00 السبت
  function maintenanceActive() {
    if (TEST_MODE) return true;
    const d = dayInTZ(TZ);
    return d === 4 || d === 5;
  }

  function isBlockedHref(href) {
    try { return BLOCKED_PATH_RE.test(href || ''); } catch { return false; }
  }

  // اوفرلاي
  let overlayEl = null, hideTimer;
  function ensureOverlay() {
    if (overlayEl) return overlayEl;
    const t = TEXT[getLang()] || TEXT.ar;

    const wrap = document.createElement('div');
    wrap.setAttribute('data-maint-overlay','');
    wrap.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,.55);opacity:0;pointer-events:none;transition:.2s';

    const card = document.createElement('div');
    card.style.cssText = 'background:rgba(255,255,255,.95);color:#0f172a;border:1px solid #e5e7eb;border-radius:18px;box-shadow:0 10px 28px rgba(0,0,0,.20);padding:18px 16px;width:min(540px,92vw);text-align:center';

    const big = document.createElement('div');
    big.textContent = t.title; big.style.cssText='font-size:84px;line-height:1;margin-bottom:8px;font-weight:900;opacity:.95';

    const p1 = document.createElement('div');
    p1.textContent = t.line1; p1.style.cssText='font-weight:800;margin-bottom:6px';

    const p2 = document.createElement('div');
    p2.textContent = t.line2; p2.style.cssText='color:#6b7280;font-size:14px';

    card.appendChild(big); card.appendChild(p1); card.appendChild(p2);
    wrap.appendChild(card);
    document.body.appendChild(wrap);
    overlayEl = wrap;
    return wrap;
  }

  function showOverlayAutoHide() {
    const el = ensureOverlay();
    el.style.opacity = '1';
    el.style.pointerEvents = 'auto';
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hideOverlay, AUTOHIDE_MS);
  }
  function hideOverlay() {
    if (!overlayEl) return;
    overlayEl.style.opacity = '0';
    overlayEl.style.pointerEvents = 'none';
  }

  function safeRedirectHome() {
    const here = (location.pathname || '').split('/').pop() || '';
    for (const h of HOME_CANDIDATES) {
      if (here.toLowerCase() !== h.toLowerCase()) { location.replace(h); return; }
    }
    showOverlayAutoHide();
  }

  function softDisableAll() {
    try {
      document.querySelectorAll(BLOCK_SELECTORS.join(',')).forEach(el=>{
        el.setAttribute('aria-disabled','true');
        if ('disabled' in el) el.disabled = true;
        el.style.pointerEvents = 'auto'; // نسمح بالضغط لعرض الأوفرلاي
      });
    } catch {}
  }

  // ===== Hooks =====
  function onClickCapture(ev) {
    if (!maintenanceActive()) return;

    try {
      const hit = ev.target.closest(BLOCK_SELECTORS.join(','));
      if (hit) { ev.preventDefault(); ev.stopPropagation(); showOverlayAutoHide(); return; }
    } catch {}

    const a = ev.target.closest('a[href]');
    if (a && isBlockedHref(a.getAttribute('href'))) {
      ev.preventDefault(); ev.stopPropagation();
      showOverlayAutoHide();
      return;
    }
  }

  function onSubmitCapture(ev) {
    if (!maintenanceActive()) return;
    const f = ev.target;
    if (!f) return;

    const bySelector = f.matches('[data-blockable]') || f.closest('[data-blockable]');
    const byAction = isBlockedHref((f.getAttribute('action') || ''));
    if (bySelector || byAction) {
      ev.preventDefault(); ev.stopPropagation();
      showOverlayAutoHide();
    }
  }

  function guardIfPageBlocked() {
    if (!maintenanceActive()) return;
    const path = (location.pathname || '') + (location.search || '') + (location.hash || '');
    if (isBlockedHref(path)) {
      showOverlayAutoHide();
      setTimeout(safeRedirectHome, 600);
    }
  }

  function init() {
    document.addEventListener('click', onClickCapture, true);
    document.addEventListener('submit', onSubmitCapture, true);
    if (maintenanceActive()) softDisableAll();
    guardIfPageBlocked();

    const mo = new MutationObserver(()=>{
      if (overlayEl) { overlayEl.remove(); overlayEl = null; }
    });
    mo.observe(document.documentElement, { attributes:true, attributeFilter:['lang'] });

    window.MaintenanceLocal = { active: maintenanceActive, show: showOverlayAutoHide, hide: hideOverlay };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once:true });
  } else {
    init();
  }
})(window, document);