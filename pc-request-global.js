// pc-request-global.js
(function(){
  function readSession(){
    try{ return JSON.parse(localStorage.getItem('dynex_session')||'null'); }
    catch(_){ return null; }
  }

  // لازم يكون المستخدم مسجل دخول
  const SESSION = readSession();
  if(!SESSION || !SESSION.uid) return;

  const UID = String(SESSION.uid);

  // Firebase لازم يكون متهيأ قبل هذا الملف
  if(typeof firebase === "undefined" || !firebase.apps || !firebase.apps.length) return;

  const db = firebase.database();

  const REQ_PATH_ROOT = "pc_link_requests";

  // عشان ما يعيد يفتح الصفحة أكثر من مرة لنفس الطلب
  const LAST_KEY = "dynex_last_pc_req_id";

  db.ref(`${REQ_PATH_ROOT}/${UID}`)
    .orderByChild('createdAt')
    .limitToLast(1)
    .on('value', (snap)=>{
      if(!snap.exists()) return;

      let reqId=null, v=null;
      snap.forEach(ch=>{ reqId=ch.key; v=ch.val()||{}; });

      if(!reqId || !v) return;

      const st = String(v.status||'pending').toLowerCase();
      if(st !== 'pending') return;

      // إذا فتحناه قبل لا تكرر
      const last = localStorage.getItem(LAST_KEY);
      if(last === reqId) return;

      // خزّن ID عشان ما يكرر
      localStorage.setItem(LAST_KEY, reqId);

      // خزّن بيانات الطلب عشان صفحة التأكيد تقراها بسرعة
      localStorage.setItem("dynex_pending_pc_request", JSON.stringify({
        reqId,
        code: v.code || "",
        createdAt: v.createdAt || Date.now(),
        device: v.device || {}
      }));

      // افتح صفحة التأكيد
      window.location.href = "pc-approve.html";
    });

})();