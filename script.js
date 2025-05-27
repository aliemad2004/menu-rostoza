document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;
    const langButtons = document.querySelectorAll('.lang-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const navToggler = document.querySelector('.nav-toggler');
    const navOverlay = document.querySelector('.nav-overlay');
    const navOverlayClose = document.querySelector('.nav-overlay-close');
    const navOverlayLinks = document.querySelectorAll('.nav-overlay .nav-links a');

    // --- 1. وظيفة تبديل اللغة (كما هي) ---
    function setLanguage(lang) {
        html.lang = lang;
        html.dir = lang === 'ar' ? 'rtl' : 'ltr';

        document.querySelectorAll('[data-en]').forEach(element => {
            if (lang === 'en') {
                element.textContent = element.dataset.en;
            } else {
                element.textContent = element.dataset.ar;
            }
        });

        document.querySelectorAll('[data-en-placeholder]').forEach(element => {
            if (lang === 'en') {
                element.placeholder = element.dataset.enPlaceholder;
            } else {
                element.placeholder = element.dataset.arPlaceholder;
            }
        });

        langButtons.forEach(btn => btn.classList.remove('active-lang'));
        document.querySelector(`.lang-btn[data-lang="${lang}"]`).classList.add('active-lang');
    }

    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            setLanguage(button.dataset.lang);
        });
    });

    setLanguage(html.lang || 'ar'); // تعيين اللغة الأولية عند تحميل الصفحة

    // --- 2. وظيفة تبديل الثيم (مع تحسين الأيقونات) ---
    // دالة لتطبيق الثيم وحفظه وتحديث الأيقونات
    function applyTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // هنا لا تحتاج لتغيير `display` للأيقونات يدوياً بالـ JS
        // لأننا نستخدم CSS لإظهار/إخفاء الأيقونات بناءً على `data-theme`
        // وهذا يجعل الكود أكثر نظافة وأسهل في الصيانة.
    }

    // فحص الثيم المحفوظ عند تحميل الصفحة
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        applyTheme(currentTheme); // تطبيق الثيم المحفوظ
    } else {
        // إذا لم يكن هناك ثيم محفوظ، يمكن تعيين وضع افتراضي
        // مثلاً، استخدام تفضيل نظام التشغيل للمستخدم
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            applyTheme('dark');
        } else {
            applyTheme('light');
        }
    }

    // الاستماع لحدث النقر على زر تبديل الثيم
    themeToggle.addEventListener('click', () => {
        let theme = html.getAttribute('data-theme');
        if (theme === 'dark') {
            applyTheme('light'); // التبديل إلى الوضع الفاتح
        } else {
            applyTheme('dark'); // التبديل إلى الوضع الداكن
        }
    });

    // --- 3. وظائف قائمة التجولر (النافبار) (كما هي) ---
    function openNavOverlay() {
        navOverlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeNavOverlay() {
        navOverlay.classList.remove('show');
        document.body.style.overflow = '';
    }

    navToggler.addEventListener('click', openNavOverlay);
    navOverlayClose.addEventListener('click', closeNavOverlay);
    navOverlayLinks.forEach(link => {
        link.addEventListener('click', closeNavOverlay);
    });
});