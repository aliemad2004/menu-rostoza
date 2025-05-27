document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav .nav-links a');

    // تفعيل رابط "القائمة" عندما تكون على صفحة المنيو
    if (currentPath.includes('/menu.html')) {
        navLinks.forEach(link => {
            link.classList.remove('active'); // إزالة التفعيل من جميع الروابط أولاً
            if (link.getAttribute('href').includes('menu.html')) {
                link.classList.add('active'); // تفعيل رابط المنيو
            }
        });
    }

    // إذا كانت هناك حاجة لتحديث زر "عرض القائمة كاملة" في الصفحة الرئيسية
    // بحيث يوجه لـ menu.html، فهذا الكود يجب أن يكون في script.js الرئيسي،
    // أو يمكنك تكراره هنا إذا كنت متأكدًا من أن menu-script.js سيتم تحميله دائمًا بعد script.js
    const viewFullMenuButton = document.querySelector('#menu .btn-primary');
    if (viewFullMenuButton && !currentPath.includes('/menu.html')) {
        viewFullMenuButton.setAttribute('href', 'menu.html');
    }
});