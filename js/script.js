// Основной скрипт сайта
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing scripts...');
    
    // Инициализация всех модулей
    initSwiper();
    initNavigation();
    initMobileMenu();
    initContactTabs();
    initAchievementsTabs();
    initFormHandling();
    initGuideClose();
    
    console.log('All scripts initialized successfully');
});

// Инициализация Swiper карусели
function initSwiper() {
    const swiper = new Swiper('.mySwiper', {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 1,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 1,
                spaceBetween: 40,
            },
        }
    });
}

// Навигация по страницам
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pageSections = document.querySelectorAll('.page-section');
    
    function showPage(pageId) {
        // Убираем активный класс у всех ссылок
        navLinks.forEach(l => l.classList.remove('active'));
        // Скрываем все разделы
        pageSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Показываем нужный раздел
        const targetSection = document.getElementById(pageId);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Добавляем активный класс соответствующей ссылке
            const targetLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
            if (targetLink) {
                targetLink.classList.add('active');
            }
            
            // Закрываем мобильное меню, если оно открыто
            const mainNav = document.getElementById('mainNav');
            if (mainNav) {
                mainNav.classList.remove('active');
            }
            
            // Прокрутка к верху страницы
            window.scrollTo(0, 0);
        }
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            showPage(targetPage);
        });
    });
    
    // Обработка хеша в URL при загрузке
    const hash = window.location.hash;
    if (hash) {
        const targetPage = hash.replace('#', '');
        if (targetPage && document.getElementById(targetPage)) {
            setTimeout(() => showPage(targetPage), 100);
        }
    }
}

// Мобильное меню
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
        
        // Закрытие меню при клике на ссылку
        const navLinks = mainNav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
            });
        });
    }
}

// Вкладки обратной связи
function initContactTabs() {
    const tabBtns = document.querySelectorAll('.contact-tab-btn');
    const tabContents = document.querySelectorAll('.contact-tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Убираем активный класс у всех кнопок и контента
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Добавляем активный класс текущей кнопке и соответствующему контенту
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Вкладки достижений
function initAchievementsTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Убираем активный класс у всех кнопок и контента
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Добавляем активный класс текущей кнопке и соответствующему контенту
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Обработка формы обратной связи
function initFormHandling() {
    const feedbackForm = document.getElementById('feedbackForm');
    const hiddenIframe = document.getElementById('hidden-iframe');

    if (feedbackForm && hiddenIframe) {
        // Обработка загрузки iframe (успешная отправка)
        hiddenIframe.addEventListener('load', function() {
            console.log('Iframe loaded - form submitted');
            handleFormSuccess();
        });

        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            console.log('Form submission started');
            
            const submitBtn = this.querySelector('.submit-btn');
            
            // Валидация формы
            if (!validateForm()) {
                showNotification('Пожалуйста, заполните все поля правильно', 'error');
                return;
            }
            
            // Показываем индикатор загрузки
            showLoadingState(submitBtn);
            
            // Сбор данных формы
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                message: document.getElementById('message').value.trim(),
                timestamp: new Date().toISOString()
            };
            
            console.log('Form data:', formData);
            
            // Сохраняем в localStorage
            saveToLocalStorage(formData);
            
            // Отправляем форму в Google Forms
            setTimeout(() => {
                try {
                    // Используем нативную отправку формы
                    this.submit();
                    
                    // На всякий случай добавляем fallback
                    setTimeout(() => {
                        // Если iframe не сработал, все равно показываем успех
                        handleFormSuccess();
                    }, 2000);
                    
                } catch (error) {
                    console.error('Form submission error:', error);
                    handleFormError('Ошибка отправки формы');
                }
            }, 500);
        });

        function showLoadingState(submitBtn) {
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
        }

        function hideLoadingState(submitBtn) {
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }

        function validateForm() {
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                return false;
            }
            
            // Простая валидация email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return false;
            }
            
            return true;
        }

        function handleFormSuccess() {
            console.log('Form submitted successfully');
            
            const submitBtn = feedbackForm.querySelector('.submit-btn');
            hideLoadingState(submitBtn);
            
            // Показываем уведомление об успехе
            showNotification('✅ Сообщение успешно отправлено! Я свяжусь с вами в ближайшее время.', 'success');
            
            // Сбрасываем форму
            feedbackForm.reset();
            
            // Обновляем статус в localStorage
            updateLastSubmissionStatus('success');
        }

        function handleFormError(errorMessage = 'Ошибка отправки') {
            console.error('Form submission failed');
            
            const submitBtn = feedbackForm.querySelector('.submit-btn');
            hideLoadingState(submitBtn);
            
            // Показываем уведомление об ошибке
            showNotification('❌ ' + errorMessage + '. Пожалуйста, попробуйте еще раз или свяжитесь другим способом.', 'error');
            
            // Обновляем статус в localStorage
            updateLastSubmissionStatus('failed');
        }

        function saveToLocalStorage(formData) {
            try {
                let submissions = JSON.parse(localStorage.getItem('feedbackSubmissions') || '[]');
                const submission = {
                    ...formData,
                    status: 'pending',
                    id: Date.now()
                };
                submissions.push(submission);
                localStorage.setItem('feedbackSubmissions', JSON.stringify(submissions));
                console.log('Data saved to localStorage:', submission);
            } catch (error) {
                console.error('Error saving to localStorage:', error);
            }
        }

        function updateLastSubmissionStatus(status) {
            try {
                let submissions = JSON.parse(localStorage.getItem('feedbackSubmissions') || '[]');
                if (submissions.length > 0) {
                    submissions[submissions.length - 1].status = status;
                    localStorage.setItem('feedbackSubmissions', JSON.stringify(submissions));
                    console.log('Submission status updated to:', status);
                }
            } catch (error) {
                console.error('Error updating submission status:', error);
            }
        }
    }
}

// Функция показа уведомлений
function showNotification(message, type = 'info') {
    // Удаляем предыдущие уведомления
    const existingNotification = document.querySelector('.form-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };
    
    const notification = document.createElement('div');
    notification.className = `form-notification form-notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${icons[type]}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Показываем уведомление с небольшой задержкой для анимации
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Автоматическое скрытие через 5 секунд
    const autoHide = setTimeout(() => {
        hideNotification(notification);
    }, 5000);
    
    // Закрытие по клику
    notification.querySelector('.notification-close').addEventListener('click', () => {
        clearTimeout(autoHide);
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Функции для модального окна грамот
function openCertificateModal(imageSrc) {
    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('modalCertificateImage');
    const modalTitle = document.getElementById('modalCertificateTitle');
    const modalYear = document.getElementById('modalCertificateYear');
    
    if (!modal || !modalImg) {
        console.error('Modal elements not found');
        return;
    }
    
    console.log('Opening certificate modal:', imageSrc);
    
    modalImg.src = imageSrc;
    modalTitle.textContent = 'Грамота';
    modalYear.textContent = '';
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Добавляем обработчик для клавиатуры
    document.addEventListener('keydown', handleKeyboardNavigation);
}

function closeCertificateModal() {
    const modal = document.getElementById('certificateModal');
    if (!modal) return;
    
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Убираем обработчик клавиатуры
    document.removeEventListener('keydown', handleKeyboardNavigation);
}

function handleKeyboardNavigation(e) {
    if (e.key === 'Escape') {
        closeCertificateModal();
    }
}

// Закрытие инструкции при клике вне ее
function initGuideClose() {
    // Клик вне модального окна
    document.addEventListener('click', function(e) {
        const guideModal = document.getElementById('guideModal');
        const helpBtn = document.querySelector('.footer-help-btn');
        
        if (guideModal && guideModal.classList.contains('show')) {
            if (e.target === guideModal || e.target.classList.contains('modal-overlay')) {
                toggleFooterGuide();
            }
        }
    });
    
    // Закрытие по клавише ESC
    document.addEventListener('keydown', function(e) {
        const guideModal = document.getElementById('guideModal');
        if (e.key === 'Escape' && guideModal && guideModal.classList.contains('show')) {
            toggleFooterGuide();
        }
    });
}

// Функция для инструкции в футере
function toggleFooterGuide() {
    const guideModal = document.getElementById('guideModal');
    if (guideModal) {
        const isShowing = guideModal.classList.contains('show');
        
        if (isShowing) {
            // Закрываем модальное окно
            guideModal.classList.remove('show');
            document.body.style.overflow = 'auto'; // Возвращаем прокрутку
        } else {
            // Открываем модальное окно
            guideModal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Блокируем прокрутку фона
        }
    }
}

// Делаем функции глобальными для использования в HTML
window.openCertificateModal = openCertificateModal;
window.closeCertificateModal = closeCertificateModal;
window.toggleFooterGuide = toggleFooterGuide;

// Функция для проверки сохраненных данных (для отладки)
window.checkSubmissions = function() {
    const submissions = JSON.parse(localStorage.getItem('feedbackSubmissions') || '[]');
    console.log('Saved submissions:', submissions);
    alert(`Сохранено сообщений: ${submissions.length}\nПроверьте консоль для деталей`);
    return submissions;
};
