/**
 * main.js
 * NextRole Common JavaScript Logic
 */

// Theme Management
const initTheme = () => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
};

const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
    } else {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
    }
};

// Scroll Reveal Animations
const initScrollReveal = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
};

// Language Management
let currentLang = localStorage.getItem('language') || 'en';

const setLanguage = (lang) => {
    currentLang = lang;
    localStorage.setItem('language', lang);
    updateContent();
};

const updateContent = () => {
    const langData = window.translations[currentLang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (langData[key]) {
            if (el.tagName === 'INPUT' && el.type === 'text') {
                el.placeholder = langData[key];
            } else {
                el.innerHTML = langData[key];
            }
        }
    });
    // Update button visibility or style if needed
    document.documentElement.lang = currentLang;
};

// Initialize everything on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initScrollReveal();
    updateContent();
});

// Export functions to window for onclick handlers
window.toggleTheme = toggleTheme;
window.setLanguage = setLanguage;
window.getCurrentLang = () => currentLang;
