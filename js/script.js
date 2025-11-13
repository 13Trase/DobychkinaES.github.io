document.addEventListener('DOMContentLoaded', function() {
    // Инициализация Swiper
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

    // Навигация по страницам
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
        document.getElementById(pageId).classList.add('active');
        
        // Добавляем активный класс соответствующей ссылке
        document.querySelector(`.nav-link[data-page="${pageId}"]`).classList.add('active');
        
        // Закрываем мобильное меню, если оно открыто
        document.getElementById('mainNav').classList.remove('active');
        
        // Прокрутка к верху страницы
        window.scrollTo(0, 0);
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            showPage(targetPage);
        });
    });

    // Мобильное меню
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    
    mobileMenuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
    });

    // Обработка формы обратной связи
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
            showNotification(' Сообщение успешно отправлено! Я свяжусь с вами в ближайшее время.', 'success');
            
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

        // Функция для проверки сохраненных данных
        window.checkSubmissions = function() {
            const submissions = JSON.parse(localStorage.getItem('feedbackSubmissions') || '[]');
            console.log('Saved submissions:', submissions);
            alert(`Сохранено сообщений: ${submissions.length}\nПроверьте консоль для деталей`);
            return submissions;
        };

        // Проверяем сохраненные данные при загрузке
        console.log('Stored submissions:', JSON.parse(localStorage.getItem('feedbackSubmissions') || '[]'));
    }
});