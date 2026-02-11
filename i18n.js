/* Dynex Global i18n (AR/EN) — clean build (dedupe-friendly) */
(function (window, document) {
  const STORAGE_KEY = 'lang';
  const DEFAULT = localStorage.getItem(STORAGE_KEY) || 'en';

  /* ===== DICTIONARY (يقبل التكرار؛ آخر تكرار هو المُعتمد) ===== */
  const PAIRS = [
  // ——— تسجيل الدخول ———
  ['Dynex – تسجيل دخول','Dynex – Sign in'],
  ['تسجيل دخول','Sign in'],
  ['اسم المستخدم','Username'],
  ['كلمة السر','Password'],
  ['مجموعة','Group'],
  ['انشاء حساب','Create account'],
  ['نسيت كلمة السر؟','Forgot password?'],
  ['الدعم','Support'],
  ['تغيير اللغة','Change language'],
  ['اللغة','Language'],
  ['إظهار/إخفاء','Show/Hide'],
  ['أدخل اسم المستخدم وكلمة السر','Enter username and password'],
  ['جاري التحقق...','Verifying...'],
  ['جاري التحقق…','Verifying...'],
  ['المستخدم غير موجود','User not found'],
  ['كلمة المرور غير صحيحة','Incorrect password'],
  ['تم تسجيل الدخول','Signed in'],
  ['تعذّر الاتصال بالقاعدة','Database connection failed'],

  // ——— شيت رمز الدعوة ———
  ['أدخل رمز الدعوة','Enter invite code'],
  ['مثال: L3KMPV أو 994151775','e.g., L3KMPV or 994151775'],
  ['تخطي','Skip'],
  ['تأكيد','Confirm'],
  ['لا يمكنك استخدام رمزك الخاص','You cannot use your own code'],
  ['رمز الدعوة غير صحيح','Invalid invite code'],
  ['تمت إضافة 1 USDT لصاحب رمز الدعوة','1 USDT has been added to the inviter'],

  // ——— الرئيسية/الحساب ———
  ['Dynex – الرئيسية','Dynex – Home'],
  ['خروج','Exit'],
  ['خدمة العملاء','Support'],
  ['الرصيد','Balance'],
  ['مبلغ العقد المقفل','Locked Contract Amount'],
  ['نسخ','Copy'],
  ['إظهار','Show'],
  ['إخفاء','Hide'],
  ['إيداع','Deposit'],
  ['سحب','Withdraw'],
  ['تحويل','Transfer'],
  ['إيداع الى(ح)','Deposit to account'],
  ['التفاصيل','Details'],
  ['دعوة صديق','Invite a friend'],
  ['حسابي','Account'],
  ['تداول','Trade'],
  ['الصفحه الرائسي','Home'],
  ['تغيير الصورة','Change picture'],
  ['الموبايل','Mobile'],
  ['تغيير البيانات','Edit profile'],
  ['اعتراض','Appeal'],
  ['لغة التطبيق','App Language'],
  ['حذف حسابي','Delete my account'],
  ['تسجيل الخروج','Log out'],
  ['تأكيد الخروج؟','Confirm logout?'],
  ['إلغاء','Cancel'],
  ['تم النسخ','Copied'],
  ['لا توجد جلسة مستخدم','No user session'],
  ['تعذّر جلب البيانات','Failed to fetch data'],
  ['تم','Done'],
  ['ID','ID'],

  // ——— الإيداعات ———
  ['Dynex – الإيداعات','Dynex – Deposits'],
  ['الإيداعات','Deposits'],
  ['اختر الشبكة:','Select network:'],
  ['P2P','P2P'],
  ['إغلاق','Close'],
  ['نسخ الميمو','Copy memo'],
  ['إخفاء QR','Hide QR'],
  ['إظهار QR','Show QR'],
  ['تعليمات','Guide'],
  ['تأكيد الإيداع','Confirm deposit'],
  ['أرسل فقط على الشبكة الصحيحة. التحويل على شبكة خاطئة قد يؤدي لفقدان الرصيد.','Send only on the correct network. Transfers on the wrong network may result in loss of funds.'],
  ['اختر الشبكة أولاً','Select a network first'],
  ['جارٍ التأكيد','Confirming…'],
  ['تم إرسال تأكيد الإيداع','Deposit confirmation sent'],
  ['تعذّر الحفظ، حاول مرة أخرى','Failed to save, please try again'],
  ['ارفع صورة QR باسم: {FILE} في نفس المجلد','Upload a QR image named {FILE} in the same folder'],

  // ——— تحويل الرصيد ———
  ['Dynex – تحويل الرصيد','Dynex – Balance Transfer'],
  ['تحويل الرصيد','Balance Transfer'],
  ['حساب الرصيد','Main balance'],
  ['حساب العقد المقفل','Locked contract'],
  ['الرصيد المتاح','Available balance'],
  ['المبلغ','Amount'],
  ['ملاحظة (اختياري)','Note (optional)'],
  ['مثال: تحويل إلى العقد','e.g., transfer to contract'],
  ['أقصى حد','Max'],
  ['تأكيد التحويل','Confirm transfer'],
  ['الرجاء تسجيل الدخول','Please sign in'],
  ['حساب غير موجود','Account not found'],
  ['تعذّر الاتصال','Connection failed'],
  ['أدخل المبلغ','Enter amount'],
  ['تعذّر الإرسال','Send failed'],
  ['الرصيد غير كافٍ','Insufficient balance'],
  ['تم التحويل بنجاح','Transfer completed'],
  ['الرصيد المتاح:','Available balance:'],
  ['الرصيد:','Balance:'],
['للرصيد','For the balance '],
  // ——— إيداع إلى حساب ———
  ['Dynex – إيداع إلى حساب','Dynex – Deposit to Account'],
  ['إيداع إلى حساب','Deposit to Account'],
  ['الرصيد الحالي','Current balance'],
  ['متاح للإرسال الآن','Available to send'],
  ['معرف الحساب (ID)','Account ID'],
  ['مثال: 994151775','e.g., 994151775'],
  ['عرض','Preview'],
  ['إرسال','Send'],
  ['الاسم','Name'],
  ['رقم الهاتف','Phone'],
  ['تاكد من ادخال البيانت بشكل صحيح او قد تخسر كل اموالك','Make sure to enter the data correctly or you may lose all your money'],
  ['تعذّر الاتصال بقاعدة البيانات','Failed to connect to database'],
  ['صلاحيات القراءة غير كافية لمسار users','Insufficient read permissions for users path'],
  ['أدخل معرف الحساب','Enter account ID'],
  ['الحد الأدنى للإيداع هو 50','Minimum deposit is 50'],
  ['اعرض البيانات أولًا','Preview data first'],
  ['فشل الإرسال','Send failed'],

  // ——— التقارير ———
  ['Dynex – التقارير','Dynex – Reports'],
  ['التقارير','Reports'],
  ['من تاريخ','From date'],
  ['إلى تاريخ','To date'],
  ['النطاق الزمني','Time range'],
  ['الكل','All'],
  ['اليوم','Today'],
  ['هذا الأسبوع','This week'],
  ['هذا الشهر','This month'],
  ['مخصص','Custom'],
  ['عدد العمليات','Transactions count'],
  ['إجمالي الإيداعات','Total deposits'],
  ['إجمالي السحوبات','Total withdrawals'],
  ['إجمالي التحويلات','Total transfers'],
  ['إجمالي إيداع إلى حساب','Total deposit to account'],
  ['إجمالي P2P','Total P2P'],
  ['طرف آخر:','Counterparty:'],
  ['طريقة:','Method:'],
  ['ملاحظة:','Note:'],
  ['لا توجد عمليات ضمن هذا النطاق.','No transactions in this range.'],
  ['تعذّر جلب البيانات','Failed to fetch data'],

  // حالات العملية (صح: عربي -> إنجليزي)
  ['مكتمل','done'],
  ['قيد المعالجة','pending'],
  ['مرفوض','rejected'],  // << تمت إضافة الفاصلة هنا

  // ——— تداول الذهب ———
  ['Dynex – تداول الذهب (XAU/USD)','Dynex – Gold Trading (XAU/USD)'],
  ['تداول الذهب','Gold Trading'],

  // الهيدر/الأزرار
  ['خروج','Exit'],
  ['تحديث','Refresh'],
  ['المؤشرات','Indicators'],
  ['ملء الشاشة','Fullscreen'],
  ['خدمة العملاء','Support'],
  ['تغيير اللغة','Change language'],

  // الإحصاءات
  ['الرصيد الحالي','Current balance'],
  ['الأرباح المتراكمة','Accumulated profit'],

  // الملخّص/السعر
  ['XAU / USD','XAU / USD'],
  ['الرسم البياني (XAU/USD)','Chart (XAU/USD)'],
  ['ذهب × دولار','Gold × Dollar'],
  ['بدء التداول 24h','Start 24h trading'],
  ['جاري التداول…','Trading…'],
  ['بانتظار انتهاء 24h','Waiting for 24h to finish'],
  ['إعادة الضبط','Reset'],
  ['تصغير','Zoom out'],
  ['تكبير','Zoom in'],
  ['جلسة تداول مؤقتة تستمر 24 ساعة (تعمل حتى لو أغلقت الصفحة).','A temporary 24-hour trading session (runs even if you close the page).'],

  // ملاحظات/توست
  ['الرجاء تسجيل الدخول','Please sign in'],
  ['تعذّر جلب الرصيد','Failed to fetch balance'],
  ['جلسة قيد التشغيل','A session is already running'],
  ['الحد الأدنى للرصيد 50 USD','Minimum balance is 50 USD'],
  ['تم بدء جلسة 24 ساعة','24-hour session started'],
  ['تم التحديث','Refreshed'],
  ['لا توجد جلسة نشطة.','No active session.'],
  ['جلسة نشطة – ينتهي بعد: ~{H}h','Active session – ends in: ~{H}h'],
  ['الجلسة اكتملت. ربح: {AMT} USD (مضاف إلى الرصيد)','Session completed. Profit: {AMT} USD (added to balance)'],
  ['الجلسة اكتملت. ربح: {AMT} USD (بانتظار الإضافة)','Session completed. Profit: {AMT} USD (pending addition)'],

  // لوحة المؤشرات
  ['المؤشرات','Indicators'],
  ['الفترة','Period'],
  ['الانحراف','Deviation'],
  ['عرض الشموع','Candle width'],
  ['إغلاق','Close'],
  ['تطبيق','Apply'],

 ['اكتب التفاصيل هنا…','Write your details here...'],


  // شيت اللغة
  ['العربية','Arabic'],
  ['English','English'],

  // شيت سجل الأرباح السابقة
  ['الأرباح السابقة','Previous profits'],
  ['الإجمالي: 0.00 USD','Total: 0.00 USD'],
  ['لا توجد أرباح محفوظة بعد.','No saved profits yet.'],
  ['عرض الأرباح السابقة','Show previous profits'],
  ['ربح جلسة','Session profit'],
  ['تعذّر تحميل السجل','Failed to load history'],

  // تسميات موجزة داخل الكروت/القيم
  ['السعر الآن','Price now'],
  ['أعلى','High'],
  ['أدنى','Low'],
  ['التغيّر 24 ساعة','24h change'], 
  

  /* ===== Withdraw page (AR/EN) keys ===== */

  // العنوان والهيدر
  ['Dynex – السحب','Dynex – Withdraw'],
  ['سحب USDT','Withdraw USDT'],
  ['خروج','Exit'],
  ['خدمة العملاء','Support'],
  ['تغيير اللغة','Change language'],
  ['تحديث','Refresh'],

  // الرصيد
  ['الرصيد الحالي','Current Balance'],

  // التحذير
  ['تنبيه مهم','Important Notice'],
  ['أرسل فقط على الشبكة الصحيحة. التحويل على شبكة خاطئة قد يؤدي لفقدان الرصيد.','Send only on the correct network. Transfers on the wrong network may lead to loss of funds.'],

  // اختيار الشبكة
  ['اختر الشبكة:','Select network:'],
  ['رسوم منخفضة، وصول سريع','Low fees, fast arrival'],
  ['رسوم أعلى، ازدحام محتمل','Higher fees, possible congestion'],
  ['TRC20 (TRON)','TRC20 (TRON)'],
  ['ERC20 (Ethereum)','ERC20 (Ethereum)'],
  ['BEP20 (BNB Smart Chain)','BEP20 (BNB Smart Chain)'],

  // الحقول/النموذج
  ['عنوان المحفظة','Wallet address'],
  ['المبلغ','Amount'],
  ['الشبكة','Network'],
  ['الرسوم','Fees'],
  ['المبلغ الواصل','Net amount'],
  ['مسح','Clear'],
  ['تأكيد السحب','Confirm withdrawal'],

  // التوست/التحقق
  ['تم إرسال طلب السحب','Withdrawal submitted'],
  ['أدخل العنوان','Enter address'],
  ['شكل العنوان لا يطابق الشبكة المختارة','Address format does not match the selected network'],
  ['الحد الأدنى','Minimum'],
  ['المبلغ يجب أن يكون أكبر من الرسوم','Amount must be greater than the fee'],
  ['الرصيد غير كافٍ','Insufficient balance'],
  ['الرجاء تسجيل الدخول','Please sign in'],
  ['تعذّر جلب الرصيد','Failed to fetch balance'],
  ['تعذّر التنفيذ','Action failed'],
  ['الحساب غير موجود','Account not found'],
  ['كلمة المرور غير صحيحة','Incorrect password'],

  // شيت كلمة المرور
  ['تأكيد كلمة المرور','Confirm password'],
  ['إلغاء','Cancel'],
  ['تأكيد','Confirm'],
  ['أدخل كلمة المرور','Enter your password'],

  // حالة القفل
  ['طلب قيد المراجعة','Request under review'], 

  // ——— دعوة صديق ———
  ['دعوة صديق','Invite Friend'],
  ['شارك رمزك مع أصدقائك فقط. لا تشارك بيانات حسّاسة.','Share your code only with people you trust. Do not share sensitive info.'],
  ['رمز الدعوة','Invite Code'],
  ['رابط الإحالة','Referral Link'],
  ['أرسل عبر','Share via'],
  ['مواقع التواصل','Social'],
  ['عدد المدعوين','Invited'],
  ['إجمالي الأرباح','Total Earnings'],
  ['البريد','Email'],
  ['مشاركة النظام','Native Share'],
  ['تم النسخ','Copied'],
  ['تم نسخ الرابط','Link copied'],

  // ——— اعتراض (Appeal) ———
  ['Dynex – اعتراض','Dynex – Appeal'],
  ['اعتراض','Appeal'],

  // الهيدر
  ['خروج','Exit'],
  ['خدمة العملاء','Support'],
  ['تغيير اللغة','Change language'],

  // بيانات أساسية
  ['الاسم الكامل','Full name'],
  ['اسم المستخدم','Username'],
  ['رقم الهاتف','Phone number'],
  ['يتم جلب الاسم والرقم من حسابك تلقائياً.','Name and phone are fetched from your account automatically.'],

  // نوع الاعتراض
  ['نوع الاعتراض','Appeal type'],
  ['مشكلة سحب','Withdrawal issue'],
  ['مشكلة إيداع','Deposit issue'],
  ['خطأ في الرصيد','Balance error'],
  ['النظام يعلق','App freezes'],
  ['طلب تغيير رقم','Phone number change request'],
  ['غير ذلك','Other'],
  ['يمكنك أيضاً استخدام الاختصارات أدناه.','You can also use the shortcuts below.'],

  // شرائح/اختصارات
  ['تعليق النظام','System freeze'],
  ['تغيير رقم','Change number'],
  ['موضوع آخر','Other topic'],

  // نص الاعتراض
  ['تفاصيل الاعتراض (اختياري)','Appeal details (optional)'],
  ['اكتب التفاصيل هنا…','Write details here…'],
  ['* إذا اخترت “غير ذلك” يجب كتابة التفاصيل.','* If you choose “Other”, you must write the details.'],

['تم التحديث','Updated'],

['تعذّر جلب البيانات','Failed to retrieve data '],
['فشل التحديث','Update failed '],
  // الأزرار
  ['إلغاء','Cancel'],
  ['دولار','USDT'],
  
    ['سحب','to withdraw '],
  ['إرسال','Send'],

  // تلميحات/عناصر واجهة
  ['الاسم','Name'],
  ['رقم الهاتف','Phone'],
  ['+967 7XXXXXXXX','+967 7XXXXXXXX'],

  // رسائل التوست/التحقق
  ['الرجاء تسجيل الدخول','Please sign in'],
  ['أدخل الاسم','Enter name'],
  ['رقم هاتف غير صالح','Invalid phone number'],
  ['اكتب تفاصيل الاعتراض','Please write the appeal details'],
  ['تم إرسال الاعتراض','Appeal submitted'],
  ['تعذّر الاتصال بالقاعدة','Failed to connect to database'],

  // أخرى متداولة
  ['تحديث','Refresh'],
  ['تم النسخ','Copied'],
  
  
  
  // ——— حذف الحساب (Delete Account) ———
['Dynex – حذف الحساب','Dynex – Delete Account'],
['حذف الحساب','Delete Account'],

// الهيدر/الأزرار
['خروج','Exit'],
['خدمة العملاء','Support'],
['حذف الحساب','Delete Account'],

// تنبيهات وتحذيرات
['تحذير هام','Important Warning'],
['سيتم حذف بيانات حسابك من القاعدة نهائيًا.','Your account data will be permanently removed from the database.'],
['لا يمكن التراجع بعد التنفيذ.','This action cannot be undone.'],

// تأكيد كلمة المرور
['أدخل كلمة المرور للتأكيد','Enter your password to confirm'],
['كلمة المرور','Password'],
['إظهار','Show'],
['إخفاء','Hide'],

// إقرار المستخدم
['أفهم أن عملية الحذف نهائية.','I understand this deletion is final.'],

// الأزرار الرئيسية
['إلغاء','Cancel'],
['حذف نهائي','Delete permanently'],

// شيت التأكيد
['تأكيد الحذف؟','Confirm deletion?'],
['لا','No'],
['نعم، احذف','Yes, delete'], 

// رسائل التوست/الأخطاء
['الرجاء تسجيل الدخول','Please sign in'],
['رجاءً وافق على التحذير','Please acknowledge the warning'],
['أدخل كلمة المرور','Enter your password'],
['تعذّر التحقق من القاعدة','Failed to verify with the database'],
['كلمة المرور غير صحيحة','Incorrect password'],
['تم الحذف','Deleted successfully'],
['تعذّر الحذف من القاعدة','Failed to delete from database'],
  
  
  
   ['تم التثبيت على الشاشة الرئيسية','Pinned to home screen'],
  
 
 
 ['غير متاح للتثبيت الآن','Not available for installation now'],


 
  ['...جارٍ التثبيت','Installing...'],

  
   ['تم الإلغاء','Cancelled'],
 
  
 ['الشركات الداعمة','Supporting companies'],
  ['هذه الشركات العالمية التي تدعم منصتنا الاستثمارية','These are the global companies that support our investment platform.'],
 ['الإجمالي','Total'],
  ['الرسائل','Messages'],
  ['صندوق الرسائل','Inbox'],
  ['زر الرسائل','Messages button'],
  ['إشعارات','Notifications'],
  ['لديك رسالة جديدة','You have a new message'],
  ['لا توجد رسائل جديدة','No new messages'],

  // نافذة الرسائل (الشيت)
  ['رسائل الشركة','Company messages'],
  ['رسائلي','My messages'],
  ['إغلاق','Close'],
  ['عرض الكل','View all'],
  ['تحديث','Refresh'],
  ['جارٍ التحميل...','Loading...'],
  ['فشل التحميل','Failed to load'],
  ['لا توجد رسائل','No messages'],

  // بطاقة الرسالة
  ['بدون عنوان','No title'],
  ['العنوان','Title'],
  ['المحتوى','Content'],
  ['اليوم','Today'],
  ['أمس','Yesterday'],
  ['منذ دقيقة','a minute ago'],
  ['منذ دقائق','minutes ago'],
  ['منذ ساعة','an hour ago'],
  ['منذ ساعات','hours ago'],

  // الحالة والقراءة
  ['مقروء','Read'],
  ['غير مقروء','Unread'],
  ['تمت القراءة','Marked as read'],
  ['وضع قراءة','Reading mode'],
  ['افتح لعرض الرسائل','Open to view messages'],

  // إرسال الرسائل (نموذج الإدارة/الشركة)
  ['إرسال رسالة','Send message'],
  ['الوضع','Mode'],
  ['جماعية للجميع','Broadcast to all'],
  ['مخصّصة لمستخدم','Direct to user'],
  ['المستلم','Recipient'],
  ['المستلم (UID أو AccountID أو Username)','Recipient (UID, AccountID or Username)'],
  ['أدخل الهوية','Enter identifier'],
  ['تم الإرسال','Sent'],
  ['تم الإرسال جماعيًا','Broadcast sent'],
  ['تم الإرسال للمستخدم','Sent to user'],
  ['فشل الإرسال','Failed to send'],
  ['اكتب محتوى الرسالة','Write message body'],
  ['اكتب هوية المستلم','Enter recipient identifier'],
  ['المستلم غير موجود','Recipient not found'],
  ['مسح','Clear'],
  ['إرسال','Send'],
  ['جارٍ الإرسال...','Sending...'],

  // التنبّه/الهزّة/النقطة
  ['تنبيه جديد','New alert'],
  ['نقطة جديدة','New dot'],
  ['إيقاف الاهتزاز','Stop vibration'],
  ['تشغيل الاهتزاز','Enable vibration'],

  // نسخ/مساعدة
  ['نسخ','Copy'],
  ['تم النسخ','Copied'],
  ['تفاصيل','Details'],

  // أخطاء الشبكة/القاعدة
  ['تعذّر الاتصال بالقاعدة','Failed to connect to database'],
  ['وضع اتصال ضعيف','Poor connection'],
  ['حاول مرة أخرى','Try again'],

  // ترميزات الوقت (إن احتجتها)
  ['دقيقة','minute'],
  ['دقيقتين','2 minutes'],
  ['دقائق','minutes'],
  ['ساعة','hour'],
  ['ساعتين','2 hours'],
  ['ساعات','hours'],

  ['عدم الضهور مجدد','Not showing up again '],
  
   ['فتح','to open'],
  
    ['عرض خاص','Special offer'],
  
     ['إغلاق','closing'],
   ['إعلان','advertisement'],
  
  
  
  



  // ===== Page / Titles =====
  ['إنشاء إعلان P2P','Create P2P Ad'],
  ['أنشئ إعلان بيع/شراء ـــــــــــــــــ','Create a Sell/Buy ad'],
  ['نوع الإعلان','Ad type'],
  ['بيع','Sell'],
  ['شراء','Buy'],
  ['الدولة','Country'],
  ['المبلغ (USD) مثل: 500','Amount (USD) e.g. 500'],
  ['رقم الهاتف للتواصل (مثال: 9677xxxxxxx)','Contact phone (e.g. 9677xxxxxxx)'],
  ['تفريغ','Clear'],
  ['نشر الإعلان','Publish ad'],
  ['إعلاناتي','My ads'],

  // ===== Note / Info =====
  ['سيتم انشاء اعلان وعرضه على جميع الدول','Your ad will be created and shown to all countries'],
  ['جاري التحقق من الجلسة…','Checking session…'],
  ['حساب:','Account:'],
  ['لا توجد جلسة تاجر — سجّل دخول أولاً','No trader session — please log in first'],

  // ===== Buttons / Actions =====
  ['رجوع','Back'],
  ['خدمة العملاء','Support'],
  ['تغيير اللغة','Change language'],
  ['العربية','Arabic'],
  ['English','English'],
  ['حذف الإعلان','Delete ad'],

  // ===== Ad Card Labels =====
  ['رقم الإعلان','Ad phone'],
  ['صاحب الحساب','Account owner'],
  ['رقم صاحب الحساب','Owner phone'],
  ['الوقت','Time'],

  // ===== Toast / Messages =====
  ['تم التفريغ','Cleared'],
  ['سجّل دخول كتاجر أولاً','Please log in as a trader first'],
  ['سجّل دخول كتاجر أولاً من صفحة العرض','Please log in as a trader first from the listing page'],
  ['اختر الدولة','Choose a country'],
  ['أدخل مبلغ صحيح','Enter a valid amount'],
  ['أدخل رقم هاتف صحيح','Enter a valid phone number'],
  ['جارٍ النشر...','Publishing...'],
  ['تم نشر الإعلان ✅','Ad published ✅'],
  ['تعذّر النشر (تأكد من صلاحيات القاعدة)','Publish failed (check database rules/permissions)'],
  ['تم حذف الإعلان ✅','Ad deleted ✅'],
  ['تعذّر الحذف (تأكد من صلاحيات القاعدة)','Delete failed (check database rules/permissions)'],
  ['لا يوجد لديك إعلانات حالياً','You have no ads yet'],
  ['سجّل دخول كتاجر ليظهر قسم (إعلاناتي)','Log in as a trader to show (My ads)'],

  // ===== Generic / Common =====
  ['إغلاق','Close'],
  ['تم','Done'], 
  
  
 ['جاري التحقق من الجلسة','Session verification in progress '],

 



  
  
  
  
  
  

  
  
  // === Receipt / إيصال العملية ===
['إيصال العملية','Transaction Receipt'],
['المبلغ','Amount'],
['دولار',' USDT'],
['دولار ','USD'],
['رقم مرجع العملية','Reference Number'],
['العملية','Operation'],
['تاريخ العملية','Transaction Date'],
['المستفيد','Beneficiary'],
['المودِع','Payer'],
['مشترك','subscriber '],
// === Receipt actions / أزرار الإيصال ===
['نسخ المرجع','Copy Reference'],
['حسناً','OK'],
['تحميل كصورة','Save as Image'],
['مشاركة','Share'],
['تفاصيل الإيصال','Receipt Details'],
['✔ تم النسخ','Copied ✔'],

// === Deposit screen / شاشة الإيداع (جديد فقط) ===
['لا يمكنك الإيداع إلى حسابك نفسه','You cannot deposit to your own account'],
['الحد الأدنى للإيداع هو 50','Minimum deposit is 50'],
['تاكد من ادخال البيانت بشكل صحيح او قد تخسر كل اموالك','Make sure data is correct or you may lose your funds'],

// === Status & errors / حالات وأخطاء (جديد فقط) ===
['الرجاء تسجيل الدخول','Please sign in'],
['تعذّر الاتصال','Connection failed'],
['فشل الإرسال','Send failed'],
['صلاحيات القراءة غير كافية لمسار users','Insufficient read permissions for users path'],

// === Common toasts / توستات سريعة (لو استخدمتها) ===
['تم الإرسال بنجاح','Sent successfully'],
['المستخدم غير موجود','User not found'],
['أدخل معرف الحساب','Enter account ID'],
['أدخل المبلغ','Enter amount'],
['الرصيد غير كافٍ','Insufficient balance'],

// === Header buttons / أزرار الهيدر (لو احتجتها مع الإيصال) ===
['خدمة العملاء','Support'],
['تغيير اللغة','Change language'],
  
  
  // ——— الصفحة الرئيسية ———
  ['إنشاء حساب','Create Account'],
  ['أدخل بيانات الحساب','Enter account details'],
  ['الاسم الكامل','Full name'],
  ['اسم المستخدم','Username'],
  ['رقم الهاتف','Phone number'],
  ['اسم المستخدم (تلقائي)','Auto username'],
  ['سيُولَّد تلقائيًا','Will be generated automatically'],
  ['7 أحرف إنجليزية (كبيرة وصغيرة).','7 English letters (upper and lower case).'],
  ['تجديد','Regenerate'],
  ['كلمة المرور','Password'],
  ['تأكيد كلمة المرور','Confirm password'],
  ['إلغاء','Cancel'],
  ['إنشاء الحساب','Create account'],

 ['عذرًا، هذا الحساب موقّف','Sorry, this account is suspended. '],


  // ——— نافذة الحساب المنشأ ———
  ['تم إنشاء الحساب بنجاح','Account created successfully'],
  ['الاسم','Name'],
  ['اسم المستخدم','Username'],
  ['رقم الهاتف','Phone number'],
  ['رقم الحساب','Account ID'],
  ['رمز الدعوة','Invite code'],
  ['كلمة المرور','Password'],
  ['نسخ','Copy'],
  ['تحميل صورة','Download Image'],
  ['واتساب','WhatsApp'],
  ['تيليجرام','Telegram'],
  ['⚠️ يُرجى نسخ أو تحميل هذه البيانات الآن — ستحتاجها لاحقًا.','⚠️ Please copy or save this information now — you will need it later.'],
  ['إغلاق','Close'],
  ['الرجوع لتسجيل الدخول','Back to login'],

  // ——— تنبيهات / توست ———
  ['تم','Done'],
  ['تم توليد اسم جديد','New username generated'],
  ['تم إلغاء الإدخال','Entry cancelled'],
  ['أدخل الاسم','Enter name'],
  ['رقم هاتف غير صالح','Invalid phone number'],
  ['كلمة المرور قصيرة (6+)','Password too short (6+)'],
  ['كلمتا المرور غير متطابقتين','Passwords do not match'],
  ['جارٍ الحفظ...','Saving...'],
  ['تم إنشاء الحساب','Account created'],
  ['تعذّر الحفظ، حاول لاحقًا','Failed to save, try later'],
  ['تم النسخ','Copied'],
  ['تعذّر النسخ','Failed to copy'],
  ['تعذّر حفظ الصورة','Failed to save image'],

  
  
  ['سانت كيتس ونيفيس','Saint Kitts and Nevis'],
  ['سانت لوسيا','Saint Lucia'],
  ['سانت فنسنت والغرينادين','Saint Vincent and the Grenadines'],
  ['ساموا','Samoa'],
  ['سان مارينو','San Marino'],
  ['ساو تومي وبرينسيب','Sao Tome and Principe'], 
  
  

  ['أفغانستان','Afghanistan'],
  ['ألبانيا','Albania'],
  ['الجزائر','Algeria'],
  ['أندورا','Andorra'],
  ['أنغولا','Angola'],
  ['أنتيغوا وبربودا','Antigua and Barbuda'],
  ['الأرجنتين','Argentina'],
  ['أرمينيا','Armenia'],
  ['أستراليا','Australia'],
  ['النمسا','Austria'],
  ['أذربيجان','Azerbaijan'],

  ['البهاما','Bahamas'],
  ['البحرين','Bahrain'],
  ['بنغلاديش','Bangladesh'],
  ['بربادوس','Barbados'],
  ['بيلاروس','Belarus'],
  ['بلجيكا','Belgium'],
  ['بليز','Belize'],
  ['بنين','Benin'],
  ['بوتان','Bhutan'],
  ['بوليفيا','Bolivia'],
  ['البوسنة والهرسك','Bosnia and Herzegovina'],
  ['بوتسوانا','Botswana'],
  ['البرازيل','Brazil'],
  ['بروناي','Brunei'],
  ['بلغاريا','Bulgaria'],
  ['بوركينا فاسو','Burkina Faso'],
  ['بوروندي','Burundi'],

  ['كمبوديا','Cambodia'],
  ['الكاميرون','Cameroon'],
  ['كندا','Canada'],
  ['الرأس الأخضر','Cape Verde'],
  ['جمهورية أفريقيا الوسطى','Central African Republic'],
  ['تشاد','Chad'],
  ['تشيلي','Chile'],
  ['الصين','China'],
  ['كولومبيا','Colombia'],
  ['جزر القمر','Comoros'],
  ['الكونغو','Congo'],
  ['كوستاريكا','Costa Rica'],
  ['ساحل العاج','Ivory Coast'],
  ['كرواتيا','Croatia'],
  ['كوبا','Cuba'],
  ['قبرص','Cyprus'],
  ['التشيك','Czech Republic'],

  ['الدنمارك','Denmark'],
  ['جيبوتي','Djibouti'],
  ['دومينيكا','Dominica'],
  ['جمهورية الدومينيكان','Dominican Republic'],

  ['الإكوادور','Ecuador'],
  ['مصر','Egypt'],
  ['السلفادور','El Salvador'],
  ['غينيا الاستوائية','Equatorial Guinea'],
  ['إريتريا','Eritrea'],
  ['إستونيا','Estonia'],
  ['إسواتيني','Eswatini'],
  ['إثيوبيا','Ethiopia'],

  ['فيجي','Fiji'],
  ['فنلندا','Finland'],
  ['فرنسا','France'],

  ['الغابون','Gabon'],
  ['غامبيا','Gambia'],
  ['جورجيا','Georgia'],
  ['ألمانيا','Germany'],
  ['غانا','Ghana'],
  ['اليونان','Greece'],
  ['غرينادا','Grenada'],
  ['غواتيمالا','Guatemala'],
  ['غينيا','Guinea'],
  ['غينيا بيساو','Guinea-Bissau'],
  ['غيانا','Guyana'],

  ['هايتي','Haiti'],
  ['هندوراس','Honduras'],
  ['المجر','Hungary'],

  ['آيسلندا','Iceland'],
  ['الهند','India'],
  ['إندونيسيا','Indonesia'],
  ['إيران','Iran'],
  ['العراق','Iraq'],
  ['أيرلندا','Ireland'],
  ['إيطاليا','Italy'],

  ['جامايكا','Jamaica'],
  ['اليابان','Japan'],
  ['الأردن','Jordan'],

  ['كازاخستان','Kazakhstan'],
  ['كينيا','Kenya'],
  ['كيريباتي','Kiribati'],
  ['الكويت','Kuwait'],
  ['قيرغيزستان','Kyrgyzstan'],

  ['لاوس','Laos'],
  ['لاتفيا','Latvia'],
  ['لبنان','Lebanon'],
  ['ليسوتو','Lesotho'],
  ['ليبيريا','Liberia'],
  ['ليبيا','Libya'],
  ['ليختنشتاين','Liechtenstein'],
  ['ليتوانيا','Lithuania'],
  ['لوكسمبورغ','Luxembourg'],

  ['مدغشقر','Madagascar'],
  ['مالاوي','Malawi'],
  ['ماليزيا','Malaysia'],
  ['جزر المالديف','Maldives'],
  ['مالي','Mali'],
  ['مالطا','Malta'],
  ['جزر مارشال','Marshall Islands'],
  ['موريتانيا','Mauritania'],
  ['موريشيوس','Mauritius'],
  ['المكسيك','Mexico'],
  ['ميكرونيزيا','Micronesia'],
  ['مولدوفا','Moldova'],
  ['موناكو','Monaco'],
  ['منغوليا','Mongolia'],
  ['الجبل الأسود','Montenegro'],
  ['المغرب','Morocco'],
  ['موزمبيق','Mozambique'],
  ['ميانمار','Myanmar'],

  ['ناميبيا','Namibia'],
  ['ناورو','Nauru'],
  ['نيبال','Nepal'],
  ['هولندا','Netherlands'],
  ['نيوزيلندا','New Zealand'],
  ['نيكاراغوا','Nicaragua'],
  ['النيجر','Niger'],
  ['نيجيريا','Nigeria'],
  ['كوريا الشمالية','North Korea'],
  ['مقدونيا الشمالية','North Macedonia'],
  ['النرويج','Norway'],

  ['عُمان','Oman'],

  ['باكستان','Pakistan'],
  ['بالاو','Palau'],
  ['بنما','Panama'],
  ['بابوا غينيا الجديدة','Papua New Guinea'],
  ['باراغواي','Paraguay'],
  ['بيرو','Peru'],
  ['الفلبين','Philippines'],
  ['بولندا','Poland'],
  ['البرتغال','Portugal'],

  ['قطر','Qatar'],

  ['رومانيا','Romania'],
  ['روسيا','Russia'],
  ['رواندا','Rwanda'],

  ['السعودية','Saudi Arabia'],
  ['السنغال','Senegal'],
  ['صربيا','Serbia'],
  ['سيشل','Seychelles'],
  ['سيراليون','Sierra Leone'],
  ['سنغافورة','Singapore'],
  ['سلوفاكيا','Slovakia'],
  ['سلوفينيا','Slovenia'],
  ['جزر سليمان','Solomon Islands'],
  ['الصومال','Somalia'],
  ['جنوب أفريقيا','South Africa'],
  ['كوريا الجنوبية','South Korea'],
  ['جنوب السودان','South Sudan'],
  ['إسبانيا','Spain'],
  ['سريلانكا','Sri Lanka'],
  ['السودان','Sudan'],
  ['سورينام','Suriname'],
  ['السويد','Sweden'],
  ['سويسرا','Switzerland'],
  ['سوريا','Syria'],

  ['طاجيكستان','Tajikistan'],
  ['تنزانيا','Tanzania'],
  ['تايلاند','Thailand'],
  ['تيمور الشرقية','Timor-Leste'],
  ['توغو','Togo'],
  ['تونغا','Tonga'],
  ['ترينيداد وتوباغو','Trinidad and Tobago'],
  ['تونس','Tunisia'],
  ['تركيا','Turkey'],
  ['تركمانستان','Turkmenistan'],
  ['توفالو','Tuvalu'],

  ['أوغندا','Uganda'],
  ['أوكرانيا','Ukraine'],
  ['الإمارات','United Arab Emirates'],
  ['المملكة المتحدة','United Kingdom'],
  ['الولايات المتحدة','United States'],
  ['الأوروغواي','Uruguay'],
  ['أوزبستان','Uzbekistan'],

  ['فانواتو','Vanuatu'],
  ['الفاتيكان','Vatican City'],
  ['فنزويلا','Venezuela'],
  ['فيتنام','Vietnam'],

  ['اليمن','Yemen'],
  ['زامبيا','Zambia'],
  ['زيمبابوي','Zimbabwe'], 
  
  
  
  
  
  // عامة / عناوين
  ['Dynex P2P','Dynex P2P'],
  ['خروج','Exit'],
  ['خدمة العملاء','Customer Support'],
  ['تغيير اللغة','Change Language'],
  ['تسجيل دخول كتاجر','Trader Login'],

  // الصفحة الرئيسية
  ['تداول P2P','P2P Trading'],
  ['اختر الدولة ونوع العملية','Choose country and transaction type'],

  // اختيار الدولة
  ['الدولة','Country'],
  ['جاري التحديد…','Detecting…'],
  ['اختر الدولة','Select country'],

  // نوع العملية (التبويب)
  ['نوع العملية','Transaction type'],
  ['بيع','Sell'],
  ['شراء','Buy'],
  ['الكل','All'],

  // زر عرض الجميع
  ['عرض جميع تجار العالم','Show all world traders'],
  ['عرض','Show'],
  ['جميع التجّار (العالم)','All traders (World)'],
  ['تم عرض جميع التجّار (العالم)','Showing all traders (World)'],

  // ملاحظة السعر
  ['السعر موحّد — (لجميع التجار)','Fixed price — (for all traders)'],
  ['سعر موحّد','Fixed price'],

  // حالة لا يوجد بيانات
  ['لا يوجد تجّار متاحين حالياً لهذه الدولة/النوع','No traders available for this country/type right now'],

  // شيت اللغة
  ['العربية','Arabic'],
  ['English','English'],

  // شيت تفاصيل التاجر
  ['بيانات التاجر','Trader details'],
  ['إغلاق','Close'],
  ['الاسم','Name'],
  ['نوع الإعلان','Ad type'],
  ['السعر','Price'],
  ['المتاح (USD)','Available (USD)'],
  ['رقم الهاتف','Phone number'],
  ['وقت إنشاء الإعلان','Ad created time'],
  ['اتصال','Call'],
  ['لا يوجد رقم','No number'],

  // شيت تسجيل دخول كتاجر
  ['تسجيل دخول كتاجر','Trader login'],
  ['اسم المستخدم','Username'],
  ['كلمة المرور','Password'],
  ['إلغاء','Cancel'],
  ['دخول','Login'],

  // نص إرشادي داخل شيت الدخول
  ['لإنشاء حساب تاجر اضغط على أيقونة خدمة العملاء وسيتم تنفيذ إجراءات فتح الحساب','To create a trader account, tap Customer Support and the account will be opened for you'],

  // رسائل التوست/التحقق
  ['أدخل اسم المستخدم وكلمة المرور','Enter username and password'],
  ['جارٍ التحقق...','Checking...'],
  ['اسم المستخدم غير صحيح','Invalid username'],
  ['كلمة المرور غير صحيحة','Incorrect password'],
  ['تم تسجيل الدخول ✅','Logged in ✅'],
  ['تعذّر الاتصال بالقاعدة','Failed to connect to database'], 

  
  
  
  
  // ===== Dynex Privacy Page (AR/EN) =====

  // Header
  ['Dynex • سياسة الخصوصية','Dynex • Privacy Policy'],                 // privacy_header
  ['شفافية، خصوصية، وأمان — بشكل واضح وسهل','Transparency, privacy, and security — clearly and simply'], // privacy_sub
  ['آخر تحديث:','Last update:'],                                       // last_update
  ['اللغة','Language'],                                                // lang_btn
  ['رجوع','Back'],                                                     // back_btn
  ['نسخ الرابط','Copy link'],                                          // copy_link
  ['تم النسخ ✓','Copied ✓'],                                           // copied_ok (للزر بعد النسخ)
  ['انسخ الرابط يدويًا من شريط العنوان','Copy the link manually from the address bar'], // copy_fail

  // TOC
  ['فهرس سريع','Quick index'],                                         // toc_title
  ['اضغط وانتقل للقسم','Tap to jump to a section'],                    // toc_sub
  ['مقدمة','Intro'],                                                   // toc_0
  ['كيف ننظر لخصوصيتك','How we approach your privacy'],                // toc_0_sub
  ['البيانات التي نجمعها','Data we collect'],                           // toc_1
  ['ما الذي يتم جمعه ولماذا','What we collect and why'],               // toc_1_sub
  ['استخدام البيانات','How we use data'],                              // toc_2
  ['كيف نستفيد لتحسين الخدمة','How we improve the service'],           // toc_2_sub
  ['التخزين والأمان','Storage & security'],                            // toc_3
  ['التخزين محليًا وFirebase','Local storage & Firebase'],             // toc_3_sub (اختياري لو تبغاه)
  ['المشاركة مع أطراف ثالثة','Third-party sharing'],                   // toc_4
  ['متى ولماذا','When and why'],                                       // toc_4_sub
  ['حقوقك وخياراتك','Your rights & choices'],                          // toc_5
  ['تحكمك ببياناتك','Control your data'],                              // toc_5_sub
  ['التواصل','Contact'],                                               // toc_6
  ['طرق تواصل واضحة','Clear ways to reach us'],                        // toc_6_sub

  // Main content
  ['سياسة الخصوصية','Privacy Policy'],                                 // privacy_title
  ['هذه الصفحة تشرح بشكل واضح كيف تتعامل منصة Dynex مع البيانات. هدفنا: أقل بيانات ممكنة، استخدام واضح، وحماية أعلى.',
   'This page explains clearly how Dynex handles data. Our goal: minimal data, clear usage, and strong protection.'], // privacy_intro
  ['معلومة مهمة:','Important:'],                                       // privacy_note
  ['لا نطلب منك معلومات حساسة غير ضرورية لتشغيل الخدمة.',
   'We don’t ask for sensitive information that isn’t necessary to run the service.'], // privacy_note_text

  // Section 1
  ['البيانات التي نجمعها','Data we collect'],                           // sec1_title
  ['بيانات إدخال تسجيل الدخول (مثل اسم المستخدم).',
   'Login input data (such as username).'],                             // sec1_1
  ['بيانات تقنية أساسية لتحسين التجربة (مثل اللغة المختارة).',
   'Basic technical data to improve the experience (such as selected language).'], // sec1_2
  ['قد يتم حفظ بعض القيم محليًا داخل المتصفح عبر LocalStorage (مثل الجلسة، وآخر اسم مستخدم).',
   'Some values may be stored locally in your browser via LocalStorage (such as session and last username).'], // sec1_3

  // Section 2
  ['كيف نستخدم البيانات','How we use data'],                           // sec2_title
  ['لتمكين تسجيل الدخول وتشغيل وظائف المنصة.',
   'To enable login and run platform features.'],                       // sec2_1
  ['لحفظ تفضيلاتك (مثل اللغة) لتجربة أسهل.',
   'To save your preferences (such as language) for an easier experience.'], // sec2_2
  ['لتحسين الاستقرار وتجربة المستخدم بشكل عام.',
   'To improve stability and the overall user experience.'],            // sec2_3

  // Section 3
  ['التخزين والأمان','Storage & security'],                             // sec3_title
  ['تستخدم Dynex تخزينين أساسيين:','Dynex uses two main storage methods:'], // sec3_p
  ['LocalStorage: لتخزين بعض بيانات الجلسة والتفضيلات على جهازك.',
   'LocalStorage: to store some session data and preferences on your device.'], // sec3_1
  ['Firebase: لتخزين بيانات المستخدمين وتشغيل أجزاء من النظام.',
   'Firebase: to store user data and run parts of the system.'],        // sec3_2
  ['ننصحك دائمًا: لا تشارك كلمة المرور، واستخدم جهازك الشخصي، وسجّل خروجك عند الانتهاء.',
   'We always recommend: do not share your password, use your personal device, and log out when finished.'], // sec3_tip

  // Section 4
  ['مشاركة البيانات مع أطراف ثالثة','Third-party sharing'],             // sec4_title
  ['لا نقوم ببيع بياناتك. قد يتم التعامل مع بيانات محدودة فقط عبر مزودات الخدمة اللازمة لتشغيل المنصة (مثل الاستضافة/قواعد البيانات).',
   'We do not sell your data. Limited data may be handled only by service providers needed to operate the platform (such as hosting/databases).'], // sec4_p

  // Section 5
  ['حقوقك وخياراتك','Your rights & choices'],                           // sec5_title
  ['يمكنك مسح بيانات المتصفح (Cache/Storage) لإزالة بيانات الجلسة.',
   'You can clear browser data (Cache/Storage) to remove session data.'], // sec5_1
  ['يمكنك طلب تحديث/حذف بياناتك — عبر التواصل مع الدعم.',
   'You can request updating/deleting your data — by contacting support.'], // sec5_2
  ['يمكنك اختيار عدم حفظ بعض التفضيلات (حسب إعدادات المتصفح).',
   'You may choose not to save some preferences (depending on browser settings).'], // sec5_3

  // Section 6
  ['تواصل معنا','Contact us'],                                          // sec6_title
  ['لأي استفسار متعلق بالخصوصية، تواصل معنا عبر صفحة الدعم داخل المنصة.',
   'For any privacy-related question, contact us via the Support page inside the platform.'], // sec6_p

  // Footer
  ['هذه السياسة قد تتغير عند إضافة مزايا جديدة',
   'This policy may change when new features are added'], 
  
  
  
  
  
  
  
  
  ];

  /* ===== Normalization ===== */
  const rmTashkeel = s => String(s).replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g,'');
  const unifyDots  = s => String(s).replace(/\u2026/g,'...'); // … -> ...
  const normAr = s => unifyDots(rmTashkeel(s))
    .replace(/[أإآ]/g,'ا').replace(/ى/g,'ي').replace(/ئ/g,'ي').replace(/ة/g,'ه')
    .replace(/\s+/g,' ').trim(); // ✅ هنا كانت الغلطة: \s وليس \س
  const normEn = s => unifyDots(s).replace(/\s+/g,' ').trim();

  /* ===== Build maps (تكرارات مسموحة) ===== */
  const ar2en = new Map(), en2ar = new Map();
  const arRaw = new Map(), enRaw = new Map();
  const pickLonger = (a, b) => (!a || (b && b.length > a.length)) ? b : a;

  PAIRS.forEach(([ar,en])=>{
    const kAr = normAr(ar), kEn = normEn(en);
    ar2en.set(kAr, en);     // آخر تكرار يغلب
    en2ar.set(kEn, ar);
    arRaw.set(kAr, pickLonger(arRaw.get(kAr), String(ar))); // أطول raw
    enRaw.set(kEn, pickLonger(enRaw.get(kEn), String(en)));
  });

  // قوائم مرتبة بالأطول أولاً (لمنع استبدال جزئي)
  const AR_LIST = Array.from(ar2en.entries())
    .map(([k,to]) => ({ from:k, to, raw: arRaw.get(k) || k }))
    .sort((a,b)=> b.raw.length - a.raw.length);

  const EN_LIST = Array.from(en2ar.entries())
    .map(([k,to]) => ({ from:k, to, raw: enRaw.get(k) || k }))
    .sort((a,b)=> b.raw.length - a.raw.length);

  const ATTRS = ['placeholder','title','aria-label','value'];

  const isIconEl = (el)=>{
    if (!el) return false;
    if (el.classList && (el.classList.contains('ms') || el.classList.contains('mi'))) return true;
    const ff = (getComputedStyle(el).fontFamily||'').toLowerCase();
    return ff.includes('material symbols') || ff.includes('material icons');
  };

  /* ===== Core translate ===== */
  function translateSmart(text, lang){
    if (text == null) return text;
    const original = String(text);
    const canon = unifyDots(original);
    const trimmed = canon.replace(/\s+/g,' ').trim();
    if (!trimmed) return text;

    if (lang === 'en') {
      const hit = ar2en.get(normAr(trimmed));
      if (hit != null) return original.replace(canon, hit);
      let out = canon;
      AR_LIST.forEach(({raw,to})=>{
        const pat = unifyDots(raw).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
        out = out.replace(new RegExp(pat,'g'), to);
      });
      return original.replace(canon, out);
    } else {
      const hit = en2ar.get(normEn(trimmed));
      if (hit != null) return original.replace(canon, hit);
      let out = canon;
      EN_LIST.forEach(({raw,to})=>{
        const pat = unifyDots(raw).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
        out = out.replace(new RegExp(pat,'gi'), to);
      });
      return original.replace(canon, out);
    }
  }

  function translateTextNode(node, lang){
    if (!node || node.nodeType !== 3) return;
    const p = node.parentElement;
    if (!p) return;
    if (p.closest('script,style,code,pre,[data-i18n-skip]')) return;
    if (isIconEl(p)) return;
    const v = (node.nodeValue||'').trim();
    if (!v) return;
    if (/^[\d\s\.\,\:\-\+\(\)\/\\\%\$]+$/.test(v)) return; // أرقام/رموز فقط
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
    const L = (lang==='ar'||lang==='en') ? lang : 'en';
    localStorage.setItem(STORAGE_KEY, L);
    setDir(L);
    translateTitle(L);
    translateAttrs(L);
    translateTextNodes(document.body, L);
    document.dispatchEvent(new CustomEvent('i18n:change',{detail:{lang:L}}));
  }

  /* ===== Observer ===== */
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
  mo.observe(document.documentElement,{
    childList:true, subtree:true, characterData:true,
    attributes:true, attributeFilter:ATTRS
  });

  /* ===== Wrap toast ===== */
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

  /* ===== Public API ===== */
  window.applyLang = applyLang;
  window.DynexI18N = {
    apply: applyLang,
    current: ()=> localStorage.getItem(STORAGE_KEY)||'en',
    addPairs: (arr)=>{
      try{
        // نفس منطق التكرارات: آخر قيمة تغلب + نحافظ على "الأطول أولاً"
        arr.forEach(([ar,en])=>{
          const kAr = normAr(ar), kEn = normEn(en);
          ar2en.set(kAr, en);
          en2ar.set(kEn, ar);
          arRaw.set(kAr, pickLonger(arRaw.get(kAr), String(ar)));
          enRaw.set(kEn, pickLonger(enRaw.get(kEn), String(en)));
        });
        // إعادة بناء القوائم (الأطول أولًا)
        AR_LIST.length = 0;
        EN_LIST.length = 0;
        Array.from(ar2en.entries())
          .map(([k,to])=>({from:k,to,raw:arRaw.get(k)||k}))
          .sort((a,b)=>b.raw.length-a.raw.length)
          .forEach(o=>AR_LIST.push(o));
        Array.from(en2ar.entries())
          .map(([k,to])=>({from:k,to,raw:enRaw.get(k)||k}))
          .sort((a,b)=>b.raw.length-a.raw.length)
          .forEach(o=>EN_LIST.push(o));
      }catch(e){}
    }
  };

  /* ===== First run ===== */
  const run = ()=>applyLang(DEFAULT);
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded', run, {once:true});
  else run();
  window.addEventListener('load', ()=>applyLang(localStorage.getItem(STORAGE_KEY)||DEFAULT));
  setTimeout(()=>applyLang(localStorage.getItem(STORAGE_KEY)||DEFAULT), 0);
})(window, document);