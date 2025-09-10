

/* Dynex Global i18n (AR/EN/RU/HE) — 4-langs build (keeps PAIRS intact) */
(function (window, document) {
  const STORAGE_KEY = 'lang';
  const DEFAULT = localStorage.getItem(STORAGE_KEY) || 'en';

  /* ===== DICTIONARY (يقبل التكرار؛ آخر تكرار هو المُعتمد) ===== */
 const PAIRS = [
  // ——— تسجيل الدخول ———
  ['Dynex – تسجيل دخول','Dynex – Sign in','Dynex – התחברות','Dynex – Вход'],
  ['تسجيل دخول','Sign in','התחברות','Войти'],
  ['اسم المستخدم','Username','שם משתמש','Имя пользователя'],
  ['كلمة السر','Password','סיסמה','Пароль'],
  ['مجموعة','Group','קבוצה','Группа'],
  ['انشاء حساب','Create account','יצירת חשבון','Создать аккаунт'],
  ['نسيت كلمة السر؟','Forgot password?','שכחת סיסמה?','Забыли пароль?'],
  ['الدعم','Support','תמיכה','Поддержка'],
  ['تغيير اللغة','Change language','שינוי שפה','Сменить язык'],
  ['اللغة','Language','שפה','Язык'],
  ['إظهار/إخفاء','Show/Hide','הצג/הסתר','Показать/Скрыть'],
  ['أدخل اسم المستخدم وكلمة السر','Enter username and password','הזן שם משתמש וסיסמה','Введите имя пользователя и пароль'],
  ['جاري التحقق...','Verifying...','מאמת...','Проверка...'],
  ['جاري التحقق…','Verifying...','מאמת...','Проверка...'],
  ['المستخدم غير موجود','User not found','המשתמש לא נמצא','Пользователь не найден'],
  ['كلمة المرور غير صحيحة','Incorrect password','סיסמה שגויה','Неверный пароль'],
  ['تم تسجيل الدخول','Signed in','נכנסת למערכת','Вход выполнен'],
  ['تعذّر الاتصال بالقاعدة','Database connection failed','החיבור למסד הנתונים נכשל','Сбой подключения к базе данных'],

  // ——— شيت رمز الدعوة ———
  ['أدخل رمز الدعوة','Enter invite code','הזן קוד הזמנה','Введите код приглашения'],
  ['مثال: L3KMPV أو 994151775','e.g., L3KMPV or 994151775','לדוגמה: L3KMPV או 994151775','например: L3KMPV или 994151775'],
  ['تخطي','Skip','דילוג','Пропустить'],
  ['تأكيد','Confirm','אישור','Подтвердить'],
  ['لا يمكنك استخدام رمزك الخاص','You cannot use your own code','אי אפשר להשתמש בקוד שלך','Нельзя использовать собственный код'],
  ['رمز الدعوة غير صحيح','Invalid invite code','קוד הזמנה שגוי','Неверный код приглашения'],
  ['تمت إضافة 1 USDT لصاحب رمز الدعوة','1 USDT has been added to the inviter','1‏ USDT נוסף לבעל הקוד','1 USDT зачислен пригласившему'],

  // ——— الرئيسية/الحساب ———
  ['Dynex – الرئيسية','Dynex – Home','Dynex – בית','Dynex – Домой'],
  ['خروج','Exit','יציאה','Выход'],
  ['خدمة العملاء','Support','תמיכת לקוחות','Поддержка'],
  ['الرصيد','Balance','יתרה','Баланс'],
  ['مبلغ العقد المقفل','Locked Contract Amount','סכום החוזה הנעול','Сумма заблокированного контракта'],
  ['نسخ','Copy','העתק','Копировать'],
  ['إظهار','Show','הצג','Показать'],
  ['إخفاء','Hide','הסתר','Скрыть'],
  ['إيداع','Deposit','הפקדה','Депозит'],
  ['سحب','Withdraw','משיכה','Вывод'],
  ['تحويل','Transfer','העברה','Перевести'],
  ['إيداع الى(ح)','Deposit to account','הפקדה לחשבון','Депозит на счёт'],
  ['التفاصيل','Details','פרטים','Подробности'],
  ['دعوة صديق','Invite a friend','הזמן חבר','Пригласить друга'],
  ['حسابي','Account','החשבון שלי','Аккаунт'],
  ['تداول','Trade','מסחר','Торговля'],
  ['الصفحه الرائسي','Home','דף הבית','Главная'],
  ['تغيير الصورة','Change picture','שנה תמונה','Изменить фото'],
  ['الموبايل','Mobile','נייד','Мобильный'],
  ['تغيير البيانات','Edit profile','עריכת פרופיל','Редактировать профиль'],
  ['اعتراض','Appeal','ערעור','Апелляция'],
  ['لغة التطبيق','App Language','שפת האפליקציה','Язык приложения'],
  ['حذف حسابي','Delete my account','מחיקת החשבון שלי','Удалить мой аккаунт'],
  ['تسجيل الخروج','Log out','התנתקות','Выйти'],
  ['تأكيد الخروج؟','Confirm logout?','לאשר יציאה?','Подтвердить выход?'],
  ['إلغاء','Cancel','ביטול','Отмена'],
  ['تم النسخ','Copied','הועתק','Скопировано'],
  ['لا توجد جلسة مستخدم','No user session','אין הפעלת משתמש','Сеанс пользователя отсутствует'],
  ['تعذّر جلب البيانات','Failed to fetch data','כשל בשליפת נתונים','Не удалось получить данные'],
  ['تم','Done','בוצע','Готово'],
  ['ID','ID','מזהה','ID'],

  // ——— الإيداعات ———
  ['Dynex – الإيداعات','Dynex – Deposits','Dynex – הפקדות','Dynex – Депозиты'],
  ['الإيداعات','Deposits','הפקדות','Депозиты'],
  ['اختر الشبكة:','Select network:','בחר רשת:','Выберите сеть:'],
  ['P2P','P2P','P2P','P2P'],
  ['إغلاق','Close','סגור','Закрыть'],
  ['نسخ الميمو','Copy memo','העתק מזכר','Копировать мемо'],
  ['إخفاء QR','Hide QR','הסתר QR','Скрыть QR'],
  ['إظهار QR','Show QR','הצג QR','Показать QR'],
  ['تعليمات','Guide','מדריך','Руководство'],
  ['تأكيد الإيداع','Confirm deposit','אשר הפקדה','Подтвердить депозит'],
  ['أرسل فقط على الشبكة الصحيحة. التحويل على شبكة خاطئة قد يؤدي لفقدان الرصيد.','Send only on the correct network. Transfers on the wrong network may result in loss of funds.','שלח רק ברשת הנכונה. העברה ברשת שגויה עלולה לגרום לאובדן כספים.','Отправляйте только в правильной сети. Перевод в неверной сети может привести к потере средств.'],
  ['اختر الشبكة أولاً','Select a network first','בחר תחילה רשת','Сначала выберите сеть'],
  ['جارٍ التأكيد','Confirming…','מאשר…','Подтверждение…'],
  ['تم إرسال تأكيد الإيداع','Deposit confirmation sent','אישור הפקדה נשלח','Подтверждение депозита отправлено'],
  ['تعذّر الحفظ، حاول مرة أخرى','Failed to save, please try again','לא ניתן לשמור, נסה שוב','Не удалось сохранить, попробуйте ещё раз'],
  ['ارفع صورة QR باسم: {FILE} في نفس المجلد','Upload a QR image named {FILE} in the same folder','העלה תמונת QR בשם: {FILE} באותה תיקייה','Загрузите изображение QR с именем: {FILE} в ту же папку'],

  // ——— تحويل الرصيد ———
  ['Dynex – تحويل الرصيد','Dynex – Balance Transfer','Dynex – העברת יתרה','Dynex – Перевод баланса'],
  ['تحويل الرصيد','Balance Transfer','העברת יתרה','Перевод баланса'],
  ['حساب الرصيد','Main balance','יתרה ראשית','Основной баланс'],
  ['حساب العقد المقفل','Locked contract','חוזה נעול','Заблокированный контракт'],
  ['الرصيد المتاح','Available balance','יתרה זמינה','Доступный баланс'],
  ['المبلغ','Amount','סכום','Сумма'],
  ['ملاحظة (اختياري)','Note (optional)','הערה (רשות)','Примечание (необязательно)'],
  ['مثال: تحويل إلى العقد','e.g., transfer to contract','לדוגמה: העברה לחוזה','например: перевод в контракт'],
  ['أقصى حد','Max','מקס','Макс'],
  ['تأكيد التحويل','Confirm transfer','אשר העברה','Подтвердить перевод'],
  ['الرجاء تسجيل الدخول','Please sign in','אנא התחבר','Пожалуйста, войдите'],
  ['حساب غير موجود','Account not found','חשבון לא נמצא','Аккаунт не найден'],
  ['تعذّر الاتصال','Connection failed','החיבור נכשל','Сбой подключения'],
  ['أدخل المبلغ','Enter amount','הזן סכום','Введите сумму'],
  ['تعذّر الإرسال','Send failed','השליחה נכשלה','Не удалось отправить'],
  ['الرصيد غير كافٍ','Insufficient balance','יתרה לא מספיקה','Недостаточно средств'],
  ['تم التحويل بنجاح','Transfer completed','העברה בוצעה','Перевод выполнен'],
  ['الرصيد المتاح:','Available balance:','יתרה זמינה:','Доступный баланс:'],
  ['الرصيد:','Balance:','יתרה:','Баланс:'],
  ['للرصيد','For the balance ','עבור الיתרה ','Для баланса '],

  // ——— إيداع إلى حساب ———
  ['Dynex – إيداع إلى حساب','Dynex – Deposit to Account','Dynex – הפקדה לחשבון','Dynex – Депозит на счёт'],
  ['إيداع إلى حساب','Deposit to Account','הפקדה לחשבון','Депозит на счёт'],
  ['الرصيد الحالي','Current balance','יתרה נוכחית','Текущий баланс'],
  ['متاح للإرسال الآن','Available to send','זמין לשליחה','Доступно для отправки'],
  ['معرف الحساب (ID)','Account ID','מזהה חשבון (ID)','Идентификатор аккаунта (ID)'],
  ['مثال: 994151775','e.g., 994151775','לדוגמה: 994151775','например: 994151775'],
  ['عرض','Preview','תצוגה מקדימה','Предпросмотр'],
  ['إرسال','Send','שלח','Отправить'],
  ['الاسم','Name','שם','Имя'],
  ['رقم الهاتف','Phone','טלפון','Телефон'],
  ['تاكد من ادخال البيانت بشكل صحيح او قد تخسر كل اموالك','Make sure to enter the data correctly or you may lose all your money','וודא שהנתונים מוזנים נכון אחרת עלול לאבד את كل כספך','Убедитесь, что данные введены правильно, иначе можете потерять все средства'],
  ['تعذّر الاتصال بقاعدة البيانات','Failed to connect to database','כשל בחיבור למסד הנתונים','Не удалось подключиться к базе данных'],
  ['صلاحيات القراءة غير كافية لمسار users','Insufficient read permissions for users path','הרשאות קריאה אינן מספקות לנתיב users','Недостаточно прав чтения для пути users'],
  ['أدخل معرف الحساب','Enter account ID','הזן מזהה חשבון','Введите ID аккаунта'],
  ['الحد الأدنى للإيداع هو 50','Minimum deposit is 50','הפקדה מינימלית היא 50','Минимальный депозит — 50'],
  ['اعرض البيانات أولًا','Preview data first','הצג נתונים תחילה','Сначала просмотрите данные'],
  ['فشل الإرسال','Send failed','שליחה נכשלה','Отправка не удалась'],

  // ——— التقارير ———
  ['Dynex – التقارير','Dynex – Reports','Dynex – דוחות','Dynex – Отчёты'],
  ['التقارير','Reports','דוחות','Отчёты'],
  ['من تاريخ','From date','מתאריך','С даты'],
  ['إلى تاريخ','To date','עד תאריך','По дату'],
  ['النطاق الزمني','Time range','טווח זמן','Диапазон дат'],
  ['الكل','All','הכול','Все'],
  ['اليوم','Today','היום','Сегодня'],
  ['هذا الأسبوع','This week','השבוע','Эта неделя'],
  ['هذا الشهر','This month','החודש','Этот месяц'],
  ['مخصص','Custom','מותאם אישית','Пользовательский'],
  ['عدد العمليات','Transactions count','מספר פעולות','Количество операций'],
  ['إجمالي الإيداعات','Total deposits','סה״כ הפקדות','Всего депозитов'],
  ['إجمالي السحوبات','Total withdrawals','סה״כ משיכות','Всего выводов'],
  ['إجمالي التحويلات','Total transfers','סה״כ העברות','Всего переводов'],
  ['إجمالي إيداع إلى حساب','Total deposit to account','סה״כ הפקדה לחשבון','Всего депозитов на счёт'],
  ['إجمالي P2P','Total P2P','סה״כ P2P','Всего P2P'],
  ['طرف آخر:','Counterparty:','צד נגדי:','Контрагент:'],
  ['طريقة:','Method:','שיטה:','Метод:'],
  ['ملاحظة:','Note:','הערה:','Примечание:'],
  ['لا توجد عمليات ضمن هذا النطاق.','No transactions in this range.','אין פעולות בטווח זה.','Нет операций в этом диапазоне.'],
  ['تعذّر جلب البيانات','Failed to fetch data','כשל בשליפת נתונים','Не удалось получить данные'],

  // حالات العملية
  ['مكتمل','done','הושלם','выполнено'],
  ['قيد المعالجة','pending','ממתין','в ожидании'],
  ['مرفوض','rejected','נדחה','отклонено'],

  // ——— تداول الذهب ———
  ['Dynex – تداول الذهب (XAU/USD)','Dynex – Gold Trading (XAU/USD)','Dynex – מסחר זהב (XAU/USD)','Dynex – Торговля золотом (XAU/USD)'],
  ['تداول الذهب','Gold Trading','מסחר זהב','Торговля золотом'],

  // الهيدر/الأزرار
  ['تحديث','Refresh','רענן','Обновить'],
  ['المؤشرات','Indicators','אינדיקטורים','Индикаторы'],
  ['ملء الشاشة','Fullscreen','מסך מלא','Во весь экран'],
  ['خدمة العملاء','Support','תמיכת לקוחות','Поддержка'],
  ['تغيير اللغة','Change language','שינוי שפה','Сменить язык'],

  // الإحصاءات
  ['الرصيد الحالي','Current balance','يتרה נוכחית','Текущий баланс'],
  ['الأرباح المتراكمة','Accumulated profit','רווח מצטבר','Накопленная прибыль'],

  // الملخّص/السعر
  ['XAU / USD','XAU / USD','XAU / USD','XAU / USD'],
  ['الرسم البياني (XAU/USD)','Chart (XAU/USD)','תרשים (XAU/USD)','График (XAU/USD)'],
  ['ذهب × دولار','Gold × Dollar','זהב × דולר','Золото × Доллар'],
  ['بدء التداول 24h','Start 24h trading','התחל מסחר 24ש','Начать 24ч торговлю'],
  ['جاري التداول…','Trading…','מתבצע מסחר…','Торговля…'],
  ['بانتظار انتهاء 24h','Waiting for 24h to finish','ממתין לסיום 24ש','Ожидание окончания 24ч'],
  ['إعادة الضبط','Reset','איפוס','Сброс'],
  ['تصغير','Zoom out','הקטן','Уменьшить'],
  ['تكبير','Zoom in','הגדל','Увеличить'],
  ['جلسة تداول مؤقتة تستمر 24 ساعة (تعمل حتى لو أغلقت الصفحة).','A temporary 24-hour trading session (runs even if you close the page).','סשן מסחר זמני ל-24 שעות (פועל גם אם סוגרים את הדף).','Временная 24-часовая сессия (работает даже при закрытой странице).'],

  // ملاحظات/توست
  ['جلسة قيد التشغيل','A session is already running','סשן כבר פועל','Сессия уже запущена'],
  ['الحد الأدنى للرصيد 50 USD','Minimum balance is 50 USD','יתרה מינימלית 50‏ USD','Минимальный баланс 50 USD'],
  ['تم بدء جلسة 24 ساعة','24-hour session started','סשן 24 שעות התחיל','24-часовая сессия запущена'],
  ['تم التحديث','Refreshed','עודכן','Обновлено'],
  ['لا توجد جلسة نشطة.','No active session.','אין سשן פעיל.','Активной сессии нет.'],
  ['جلسة نشطة – ينتهي بعد: ~{H}h','Active session – ends in: ~{H}h','סשן פעיל – מסתיים בעוד: ~{H}ש','Активная сессия — окончание через: ~{H}ч'],
  ['الجلسة اكتملت. ربح: {AMT} USD (مضاف إلى الرصيد)','Session completed. Profit: {AMT} USD (added to balance)','הסשן הושלם. רווח: {AMT}‏ USD (נוסף ליתרה)','Сессия завершена. Прибыль: {AMT} USD (добавлено к балансу)'],
  ['الجلسة اكتملت. ربح: {AMT} USD (بانتظار الإضافة)','Session completed. Profit: {AMT} USD (pending addition)','הסשן הושלם. רווח: {AMT}‏ USD (בהמתנה להוספה)','Сессия завершена. Прибыль: {AMT} USD (в ожидании зачисления)'],

  // لوحة المؤشرات
  ['الفترة','Period','תקופה','Период'],
  ['الانحراف','Deviation','סטייה','Отклонение'],
  ['عرض الشموع','Candle width','רוחב נרות','Ширина свечей'],
  ['تطبيق','Apply','החל','Применить'],

  ['اكتب التفاصيل هنا…','Write your details here...','כתוב את הפרטים כאן...','Напишите детали здесь...'],

  // شيت اللغة
  ['العربية','Arabic','ערבית','Арабский'],
  ['English','English','English','English'],

  // شيت سجل الأرباح السابقة
  ['الأرباح السابقة','Previous profits','רווחים קודמים','Предыдущая прибыль'],
  ['الإجمالي: 0.00 USD','Total: 0.00 USD','סה״כ: 0.00‏ USD','Итого: 0.00 USD'],
  ['لا توجد أرباح محفوظة بعد.','No saved profits yet.','אין רווחים שמורים עדיין.','Сохранённой прибыли пока нет.'],
  ['عرض الأرباح السابقة','Show previous profits','הצג רווחים קודמים','Показать предыдущую прибыль'],
  ['ربح جلسة','Session profit','רווח סשן','Прибыль сессии'],
  ['تعذّر تحميل السجل','Failed to load history','נכשל בטעינת ההיסטוריה','Не удалось загрузить историю'],

  // تسميات موجزة داخل الكروت/القيم
  ['السعر الآن','Price now','מחיר כעת','Текущая цена'],
  ['أعلى','High','גבוה','Макс.'],
  ['أدنى','Low','נמוך','Мин.'],
  ['التغيّر 24 ساعة','24h change','שינוי 24ש','Изменение за 24ч'],

  /* ===== Withdraw page (AR/EN) keys ===== */

  // العنوان والهيدر
  ['Dynex – السحب','Dynex – Withdraw','Dynex – משיכה','Dynex – Вывод'],
  ['سحب USDT','Withdraw USDT','משיכת USDT','Вывод USDT'],
  ['تحديث','Refresh','רענן','Обновить'],

  // الرصيد
  ['الرصيد الحالي','Current Balance','יתרה נוכחית','Текущий баланс'],

  // التحذير
  ['تنبيه مهم','Important Notice','התראה חשובה','Важное уведомление'],
  ['أرسل فقط على الشبكة الصحيحة. التحويل على شبكة خاطئة قد يؤدي لفقدان الرصيد.','Send only on the correct network. Transfers on the wrong network may lead to loss of funds.','שלח רק ברשת הנכונה. העברה ברשת שגויה עלולה להוביל לאובדן כספים.','Отправляйте только в правильной сети. Переводы в неверной сети могут привести к потере средств.'],

  // اختيار الشبكة
  ['اختر الشبكة:','Select network:','בחר רשת:','Выберите сеть:'],
  ['رسوم منخفضة، وصول سريع','Low fees, fast arrival','עמלות נמוכות, הגעה מהירה','Низкие комиссии, быстрое зачисление'],
  ['رسوم أعلى، ازدحام محتمل','Higher fees, possible congestion','עמלות גבוהות יותר, עומס אפשרי','Более высокие комиссии, возможна перегрузка'],
  ['TRC20 (TRON)','TRC20 (TRON)','TRC20 (TRON)','TRC20 (TRON)'],
  ['ERC20 (Ethereum)','ERC20 (Ethereum)','ERC20 (Ethereum)','ERC20 (Ethereum)'],
  ['BEP20 (BNB Smart Chain)','BEP20 (BNB Smart Chain)','BEP20 (BNB Smart Chain)','BEP20 (BNB Smart Chain)'],

  // الحقول/النموذج
  ['عنوان المحفظة','Wallet address','כתובת ארנק','Адрес кошелька'],
  ['المبلغ','Amount','סכום','Сумма'],
  ['الشبكة','Network','רשת','Сеть'],
  ['الرسوم','Fees','עמלות','Комиссии'],
  ['المبلغ الواصل','Net amount','סכום נטו','Итоговая сумма'],
  ['مسح','Clear','נקה','Очистить'],
  ['تأكيد السحب','Confirm withdrawal','אישור משיכה','Подтвердить вывод'],

  // التوست/التحقق
  ['تم إرسال طلب السحب','Withdrawal submitted','בקשת המשיכה נשלחה','Запрос на вывод отправлен'],
  ['أدخل العنوان','Enter address','הזן כתובת','Введите адрес'],
  ['شكل العنوان لا يطابق الشبكة المختارة','Address format does not match the selected network','מבנה الכתובת لا תואם את הרשת שנבחרה','Формат адреса не соответствует выбранной сети'],
  ['الحد الأدنى','Minimum','מינימום','Минимум'],
  ['المبلغ يجب أن يكون أكبر من الرسوم','Amount must be greater than the fee','הסכום חייב להיות גדול מהעמלה','Сумма должна быть больше комиссии'],
  ['الرصيد غير كافٍ','Insufficient balance','יתרה לא מספיקה','Недостаточно средств'],
  ['تعذّر التنفيذ','Action failed','הפעולה נכשלה','Действие не выполнено'],
  ['الحساب غير موجود','Account not found','חשבון לא נמצא','Аккаунт не найден'],
  ['كلمة المرور غير صحيحة','Incorrect password','סיסמה שגויה','Неверный пароль'],

  // شيت كلمة المرور
  ['تأكيد كلمة المرور','Confirm password','אשר סיסמה','Подтвердите пароль'],
  ['أدخل كلمة المرور','Enter your password','הזן את הסיסמה שלך','Введите пароль'],

  // حالة القفل
  ['طلب قيد المراجعة','Request under review','בקשה בבדיקה','Заявка на рассмотрении'],

  // ——— دعوة صديق ———
  ['دعوة صديق','Invite Friend','הזמן חבר','Пригласить друга'],
  ['شارك رمزك مع أصدقائك فقط. لا تشارك بيانات حسّاسة.','Share your code only with people you trust. Do not share sensitive info.','שתף את הקוד רק עם אנשים שאתה סומך עליהם. אל תשתף מידע רגיש.','Делитесь кодом только с доверенными людьми. Не делитесь конфиденциальной информацией.'],
  ['رمز الدعوة','Invite Code','קוד הזמנה','Код приглашения'],
  ['رابط الإحالة','Referral Link','קישור להפניה','Реферальная ссылка'],
  ['أرسل عبر','Share via','שתף דרך','Поделиться через'],
  ['مواقع التواصل','Social','רשתות חברתיות','Соцсети'],
  ['عدد المدعوين','Invited','מס׳ מוזמנים','Приглашено'],
  ['إجمالي الأرباح','Total Earnings','סה״כ רווחים','Общий доход'],
  ['البريد','Email','אימייל','Email'],
  ['مشاركة النظام','Native Share','שיתוף מקורי','Системный шэринг'],
  ['تم نسخ الرابط','Link copied','הקישור הועתק','Ссылка скопирована'],

  // ——— اعتراض (Appeal) ———
  ['Dynex – اعتراض','Dynex – Appeal','Dynex – ערעור','Dynex – Апелляция'],
  ['اعتراض','Appeal','ערעור','Апелляция'],

  // بيانات أساسية
  ['الاسم الكامل','Full name','שם מלא','Полное имя'],
  ['اسم المستخدم','Username','שם משתמש','Имя пользователя'],
  ['رقم الهاتف','Phone number','מספר טלפון','Номер телефона'],
  ['يتم جلب الاسم والرقم من حسابك تلقائياً.','Name and phone are fetched from your account automatically.','השם והטלפון נמשכים מחשבונך אוטומטית.','Имя и телефон подтягиваются из аккаунта автоматически.'],

  // نوع الاعتراض
  ['نوع الاعتراض','Appeal type','סוג הערעור','Тип апелляции'],
  ['مشكلة سحب','Withdrawal issue','בעיה במשיכה','Проблема с выводом'],
  ['مشكلة إيداع','Deposit issue','בעיה בהפקדה','Проблема с депозитом'],
  ['خطأ في الرصيد','Balance error','שגיאה ביתרה','Ошибка баланса'],
  ['النظام يعلق','App freezes','האפליקציה נתקעת','Приложение зависает'],
  ['طلب تغيير رقم','Phone number change request','בקשה לשינוי מספר טלפון','Запрос на смену номера телефона'],
  ['غير ذلك','Other','אחר','Другое'],
  ['يمكنك أيضاً استخدام الاختصارات أدناه.','You can also use the shortcuts below.','ניתן להשתמש גם בקיצורים למטה.','Также можно использовать ярлыки ниже.'],

  // شرائح/اختصارات
  ['تعليق النظام','System freeze','קפיאת מערכת','Зависание системы'],
  ['تغيير رقم','Change number','שינוי מספר','Сменить номер'],
  ['موضوع آخر','Other topic','נושא אחר','Другая тема'],

  // نص الاعتراض
  ['تفاصيل الاعتراض (اختياري)','Appeal details (optional)','פרטי הערעור (רשות)','Детали апелляции (необязательно)'],
  ['اكتب التفاصيل هنا…','Write details here…','כתוב את הפרטים כאן…','Напишите детали здесь…'],
  ['* إذا اخترت “غير ذلك” يجب كتابة التفاصيل.','* If you choose “Other”, you must write the details.','* אם בחרת ״אחר״ חובה לכתוב פרטים.','* Если выбран «Другое», необходимо описать детали.'],

  // الأزرار
  ['إرسال','Send','שלח','Отправить'],

  // تلميحات/عناصر واجهة
  ['الاسم','Name','שם','Имя'],
  ['رقم الهاتف','Phone','טלפון','Телефон'],
  ['+967 7XXXXXXXX','+967 7XXXXXXXX','+967 7XXXXXXXX','+967 7XXXXXXXX'],

  // رسائل التوست/التحقق
  ['أدخل الاسم','Enter name','הזן שם','Введите имя'],
  ['رقم هاتف غير صالح','Invalid phone number','מספר טלפון לא חוקי','Неверный номер телефона'],
  ['اكتب تفاصيل الاعتراض','Please write the appeal details','אנא כתוב את פרטי הערעור','Пожалуйста, укажите детали апелляции'],
  ['تم إرسال الاعتراض','Appeal submitted','הערעור נשלח','Апелляция отправлена'],
  ['تعذّر الاتصال بالقاعدة','Failed to connect to database','כשל בחיבור למסד הנתונים','Не удалось подключиться к базе данных'],

  // أخرى متداولة
  ['تحديث','Refresh','رענן','Обновить'],
  ['تم النسخ','Copied','הועתק','Скопировано'],

  // ——— حذف الحساب (Delete Account) ———
  ['Dynex – حذف الحساب','Dynex – Delete Account','Dynex – מחיקת חשבון','Dynex – Удаление аккаунта'],
  ['حذف الحساب','Delete Account','מחיקת חשבון','Удалить аккаунт'],

  // الهيدر/الأزرار
  ['حذف الحساب','Delete Account','מחיקת חשבון','Удалить аккаунт'],

  // تنبيهات وتحذيرات
  ['تحذير هام','Important Warning','אזהרה חשובה','Важное предупреждение'],
  ['سيتم حذف بيانات حسابك من القاعدة نهائيًا.','Your account data will be permanently removed from the database.','נתוני החשבון יימחקו לצמיתות ממסד הנתונים.','Данные аккаунта будут безвозвратно удалены из базы данных.'],
  ['لا يمكن التراجع بعد التنفيذ.','This action cannot be undone.','אי אפשר לבטל פעולה זו.','Действие необратимо.'],

  // تأكيد كلمة المرور
  ['أدخل كلمة المرور للتأكيد','Enter your password to confirm','הזן סיסמה לאישור','Введите пароль для подтверждения'],
  ['كلمة المرور','Password','סיסמה','Пароль'],
  ['إظهار','Show','הצג','Показать'],
  ['إخفاء','Hide','הסתר','Скрыть'],

  // إقرار المستخدم
  ['أفهم أن عملية الحذف نهائية.','I understand this deletion is final.','אני מבין שהמחיקה סופית.','Я понимаю, что удаление окончательное.'],

  // الأزرار الرئيسية
  ['حذف نهائي','Delete permanently','מחק לצמיתות','Удалить окончательно'],

  // شيت التأكيد
  ['تأكيد الحذف؟','Confirm deletion?','לאשר מחיקה?','Подтвердить удаление?'],
  ['لا','No','לא','Нет'],
  ['نعم، احذف','Yes, delete','כן, מחק','Да, удалить'],

  // رسائل التوست/الأخطاء
  ['رجاءً وافق على التحذير','Please acknowledge the warning','אנא אשר את האזהרה','Пожалуйста, подтвердите предупреждение'],
  ['أدخل كلمة المرور','Enter your password','הזן את הסיסמה שלך','Введите пароль'],
  ['تعذّر التحقق من القاعدة','Failed to verify with the database','כשל באימות מול המסד','Не удалось проверить в базе данных'],
  ['كلمة المرور غير صحيحة','Incorrect password','סיסמה שגויה','Неверный пароль'],
  ['تم الحذف','Deleted successfully','נמחק בהצלחה','Успешно удалено'],
  ['تعذّر الحذف من القاعدة','Failed to delete from database','כשל במחיקה מהמסד','Не удалось удалить из базы'],

  ['الرسائل','Messages','הודעות','Сообщения'],
  ['صندوق الرسائل','Inbox','תיבת دואר נכנס','Входящие'],
  ['زر الرسائل','Messages button','כפתור ההודעות','Кнопка сообщений'],
  ['إشعارات','Notifications','התראות','Уведомления'],
  ['لديك رسالة جديدة','You have a new message','יש לך הודעה חדשה','У вас новое сообщение'],
  ['لا توجد رسائل جديدة','No new messages','אין הודעות חדשות','Новых сообщений нет'],

  // نافذة الرسائل (الشيت)
  ['رسائل الشركة','Company messages','הודעות החברה','Сообщения компании'],
  ['رسائلي','My messages','ההודעות שלי','Мои сообщения'],
  ['إغلاق','Close','סגור','Закрыть'],
  ['عرض الكل','View all','הצג הכל','Показать всё'],
  ['جارٍ التحميل...','Loading...','טוען...','Загрузка...'],
  ['فشل التحميل','Failed to load','הטעינה נכשלה','Не удалось загрузить'],
  ['لا توجد رسائل','No messages','אין הודעות','Сообщений нет'],

  // بطاقة الرسالة
  ['بدون عنوان','No title','ללא כותרת','Без заголовка'],
  ['العنوان','Title','כותרת','Заголовок'],
  ['المحتوى','Content','תוכן','Содержимое'],
  ['اليوم','Today','היום','Сегодня'],
  ['أمس','Yesterday','אתמול','Вчера'],
  ['منذ دقيقة','a minute ago','לפני דקה','минуту назад'],
  ['منذ دقائق','minutes ago','לפני דקות','несколько минут назад'],
  ['منذ ساعة','an hour ago','לפני שעה','час назад'],
  ['منذ ساعات','hours ago','לפני ساعات','несколько часов назад'],

  // الحالة والقراءة
  ['مقروء','Read','נקרא','Прочитано'],
  ['غير مقروء','Unread','לא נקרא','Непрочитано'],
  ['تمت القراءة','Marked as read','סומן כנקרא','Отмечено как прочитано'],
  ['وضع قراءة','Reading mode','מצב קריאה','Режим чтения'],
  ['افتح لعرض الرسائل','Open to view messages','פתח להצגת הודעות','Откройте, чтобы посмотреть сообщения'],

  // إرسال الرسائل (نموذج الإدارة/الشركة)
  ['إرسال رسالة','Send message','שלח הודעה','Отправить сообщение'],
  ['الوضع','Mode','מצב','Режим'],
  ['جماعية للجميع','Broadcast to all','שידור לכולם','Рассылка всем'],
  ['מخصّصة لمستخدم','Direct to user','ישיר למשתמש','Лично пользователю'],
  ['المستلم','Recipient','נמען','Получатель'],
  ['المستلم (UID أو AccountID أو Username)','Recipient (UID, AccountID or Username)','נמען (UID, AccountID או Username)','Получатель (UID, AccountID или Username)'],
  ['أدخل الهوية','Enter identifier','הזן מזהה','Введите идентификатор'],
  ['تم الإرسال','Sent','נשלח','Отправлено'],
  ['تم الإرسال جماعيًا','Broadcast sent','שודר לכולם','Рассылка отправлена'],
  ['تم الإرسال للمستخدم','Sent to user','נשלח למשתמש','Отправлено пользователю'],
  ['فشل الإرسال','Failed to send','השליחה נכשלה','Не удалось отправить'],
  ['اكتب محتوى الرسالة','Write message body','כתוב את תוכן ההודעה','Напишите текст сообщения'],
  ['اكتب هوية المستلم','Enter recipient identifier','הזן מזהה נמען','Введите идентификатор получателя'],
  ['المستلم غير موجود','Recipient not found','הנמען לא נמצא','Получатель не найден'],
  ['مسح','Clear','נקה','Очистить'],
  ['إرسال','Send','שלח','Отправить'],
  ['جارٍ الإرسال...','Sending...','שולח...','Отправка...'],

  // التنبّه/الهزّة/النقطة
  ['تنبيه جديد','New alert','התראה חדשה','Новое уведомление'],
  ['نقطة جديدة','New dot','נקודה חדשה','Новая точка'],
  ['إيقاف الاهتزاز','Stop vibration','הפסק רטט','Остановить вибрацию'],
  ['تشغيل الاهتزاز','Enable vibration','הפעל רטט','Включить вибрацию'],

  // نسخ/مساعدة
  ['نسخ','Copy','העתك','Копировать'],
  ['تفاصيل','Details','פרטים','Подробности'],

  // أخطاء الشبكة/القاعدة
  ['تعذّر الاتصال بالقاعدة','Failed to connect to database','כשל בחיבור למסד הנתונים','Не удалось подключиться к базе данных'],
  ['وضع اتصال ضعيف','Poor connection','חיבור חלש','Плохое соединение'],
  ['حاول مرة أخرى','Try again','נסה שוב','Попробуйте ещё раз'],

  // ترميزات الوقت (إن احتجتها)
  ['דقيقة','minute','דקה','минута'],
  ['دقيقتين','2 minutes','שתי דקות','2 минуты'],
  ['دقائق','minutes','דקות','минуты'],
  ['ساعة','hour','שעה','час'],
  ['ساعتين','2 hours','שעתיים','2 часа'],
  ['ساعات','hours','שעות','часы'],
];

  /* ===== Multi-lang setup (AR/EN/RU/HE) — no deletion, auto-detect row languages ===== */
  const LANGS = ['ar','en','ru','he'];
  const RTL_LANGS = new Set(['ar','he']);

  const unifyDots  = s => String(s).replace(/\u2026/g,'...'); // … -> ...
  const rmTashkeel = s => String(s).replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g,'');
  const normAr = s => unifyDots(rmTashkeel(s))
    .replace(/[أإآ]/g,'ا').replace(/ى/g,'ي').replace(/ئ/g,'ي').replace(/ة/g,'ه')
    .replace(/\س+/g,' ').trim();
  const normEnLike = s => unifyDots(String(s)).replace(/\s+/g,' ').trim(); // en/ru/he basic trim

  const NORM = {
    ar: normAr,
    he: normEnLike,
    ru: normEnLike,
    en: normEnLike
  };

  // كشف اللغة حسب الحروف
  const detectLang = (s)=>{
    const str = String(s);
    if (/[؀-ۿ]/.test(str)) return 'ar';           // Arabic
    if (/[א-ת]/.test(str)) return 'he';           // Hebrew
    if (/[Ѐ-ӿ]/.test(str)) return 'ru';           // Cyrillic
    return 'en';                                  // default Latin
  };

  const pickLonger = (a, b) => (!a || (b && b.length > a.length)) ? b : a;

  // نحفظ كل سطر كعنصر واحد يضم صيغ متعددة بلغات مختلفة
  const ITEMS = [];
  PAIRS.forEach(row=>{
    const byLang = {};
    row.forEach(val=>{
      const L = detectLang(val);
      byLang[L] = pickLonger(byLang[L], String(val)); // خذ الأطول لكل لغة في السطر
    });
    const langsAvail = Object.keys(byLang);
    if (langsAvail.length >= 2){
      const maxLen = Math.max(...langsAvail.map(k=> byLang[k].length));
      ITEMS.push({ byLang, maxLen });
    }
  });
  // الأطول أولاً لمنع الاستبدال الجزئي
  ITEMS.sort((a,b)=> b.maxLen - a.maxLen);

  const ATTRS = ['placeholder','title','aria-label','value'];

  const isIconEl = (el)=>{
    if (!el) return false;
    if (el.classList && (el.classList.contains('ms') || el.classList.contains('mi'))) return true;
    const ff = (getComputedStyle(el).fontFamily||'').toLowerCase();
    return ff.includes('material symbols') || ff.includes('material icons');
  };

  /* ===== Arabic flexible matching helpers (ADDED) ===== */
  const escRe = s => String(s).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const arLoosePattern = raw => {
    let s = escRe(
      String(raw)
        .replace(/\u2026/g,'...') // … → ...
        .replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g,'') // إزالة التشكيل
    );
    s = s.replace(/[أإآا]/g, '[أإآا]');
    s = s.replace(/ة/g, '[هة]');
    s = s.replace(/ه/g, '[هة]');
    s = s.replace(/[ىيئ]/g, '[ىيئ]');
    s = s.replace(/\s+/g, '\\s+');
    return s;
  };
  const _arPatCache = new Map();
  const getArPat = raw => {
    if (!_arPatCache.has(raw)) _arPatCache.set(raw, new RegExp(arLoosePattern(raw), 'gu'));
    return _arPatCache.get(raw);
  };

  /* ===== Core translate (من أي لغة للهدف، إن وُجدت صيغة الهدف في نفس السطر) ===== */
  function translateSmart(text, targetLang){
    if (text == null) return text;
    const original = String(text);
    const canon = unifyDots(original);
    const trimmed = canon.replace(/\s+/g,' ').trim();
    if (!trimmed) return text;

    let out = canon;

    ITEMS.forEach(item=>{
      const to = item.byLang[targetLang];
      if (!to) return; // لا يوجد مقابل للغة الهدف في هذا السطر
      // استبدل كل الصيغ المتاحة (العربي/الإنجليزي/الروسي/العبري) إلى الهدف
      for (const [srcLang, fromRaw] of Object.entries(item.byLang)){
        if (!fromRaw) continue;
        if (srcLang === 'ar'){
          out = out.replace(getArPat(fromRaw), to); // مطابقة عربية مرنة
        } else {
          const pat = escRe(unifyDots(fromRaw));
          out = out.replace(new RegExp(pat,'g'), to);
        }
      }
    });

    return (out === canon) ? text : original.replace(canon, out);
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
    document.documentElement.dir  = RTL_LANGS.has(lang) ? 'rtl' : 'ltr';
  }

  function applyLang(lang){
    const L = LANGS.includes(lang) ? lang : 'en';
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
        // نضيف أسطر جديدة (أي لغة) — نفس منطق “الأطول يغلب”
        arr.forEach((row)=>{
          const byLang = {};
          row.forEach(val=>{
            const L = detectLang(val);
            byLang[L] = pickLonger(byLang[L], String(val));
          });
          const langsAvail = Object.keys(byLang);
          if (langsAvail.length>=2){
            const maxLen = Math.max(...langsAvail.map(k=> byLang[k].length));
            ITEMS.push({ byLang, maxLen });
          }
        });
        // إعادة ترتيب الأطول أولًا
        ITEMS.sort((a,b)=> b.maxLen - a.maxLen);
      }catch(e){}
    }
  };

  /* ===== First run ===== */
  const run = ()=>applyLang(DEFAULT);
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded', run, {once:true});
  else run();
  window.addEventListener('load', ()=>applyLang(localStorage.getItem(STORAGE_KEY)||DEFAULT));
  setTimeout(()=>applyLang(localStorage.getItem(STORAGE_KEY)||DEFAULT), 0);

  /* (اختياري) لو تبغى تُعرّب/تسمي اللغات نفسها:
     DynexI18N.addPairs([
       ['Русский','Russian','الروسية','עברית'], // سيكتشف اللغات تلقائيًا
       ['עברית','Hebrew','العبرية','Русский'],
     ]);
  */
})(window, document);
