// Скрипт для панели доступности
document.addEventListener('DOMContentLoaded', function() {
    console.log('Accessibility script loaded');
    
    const accessibilityToggle = document.getElementById('accessibilityToggle');
    const accessibilityPanel = document.getElementById('accessibilityPanel');
    const accessibilityHide = document.getElementById('accessibilityHide');
    const accessibilityShow = document.getElementById('accessibilityShow');
    const increaseFont = document.getElementById('increaseFont');
    const decreaseFont = document.getElementById('decreaseFont');
    const highContrast = document.getElementById('highContrast');
    const normalContrast = document.getElementById('normalContrast');
    const grayscale = document.getElementById('grayscale');
    
    // Проверяем существование элементов
    if (!accessibilityToggle || !accessibilityPanel) {
        console.error('Accessibility elements not found');
        return;
    }
    
    console.log('All accessibility elements found');
    
    // Переключение панели доступности
    accessibilityToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        accessibilityPanel.classList.toggle('open');
        console.log('Panel toggled, open:', accessibilityPanel.classList.contains('open'));
    });
    
    // Скрытие панели доступности
    if (accessibilityHide) {
        accessibilityHide.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Hiding accessibility panel');
            
            // Скрываем основную панель
            accessibilityPanel.classList.add('hidden');
            accessibilityPanel.classList.remove('open');
            
            // Показываем кнопку для восстановления
            setTimeout(() => {
                if (accessibilityShow) {
                    accessibilityShow.classList.add('show');
                }
            }, 300);
            
            // Сохраняем состояние
            updateAccessibilityState('panelHidden', true);
        });
    }
    
    // Показать панель доступности
    if (accessibilityShow) {
        accessibilityShow.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Showing accessibility panel');
            
            // Скрываем кнопку восстановления
            accessibilityShow.classList.remove('show');
            
            // Показываем основную панель
            setTimeout(() => {
                accessibilityPanel.classList.remove('hidden');
            }, 100);
            
            // Сохраняем состояние
            updateAccessibilityState('panelHidden', false);
        });
    }
    
    // Увеличение шрифта
    if (increaseFont) {
        increaseFont.addEventListener('click', function() {
            console.log('Increasing font size');
            
            if (document.body.classList.contains('large-font')) {
                document.body.classList.remove('large-font');
                document.body.classList.add('extra-large-font');
            } else if (document.body.classList.contains('extra-large-font')) {
                document.body.classList.remove('extra-large-font');
                document.body.classList.add('super-large-font');
            } else if (document.body.classList.contains('super-large-font')) {
                // Уже максимальный размер
                console.log('Already at maximum font size');
                showNotification('Достигнут максимальный размер шрифта', 'info');
            } else {
                document.body.classList.add('large-font');
            }
            
            updateAccessibilityState('fontSize', getCurrentFontSize());
        });
    }
    
    // Уменьшение шрифта
    if (decreaseFont) {
        decreaseFont.addEventListener('click', function() {
            console.log('Decreasing font size');
            
            if (document.body.classList.contains('super-large-font')) {
                document.body.classList.remove('super-large-font');
                document.body.classList.add('extra-large-font');
            } else if (document.body.classList.contains('extra-large-font')) {
                document.body.classList.remove('extra-large-font');
                document.body.classList.add('large-font');
            } else if (document.body.classList.contains('large-font')) {
                document.body.classList.remove('large-font');
            } else {
                console.log('Already at minimum font size');
                showNotification('Достигнут минимальный размер шрифта', 'info');
            }
            
            updateAccessibilityState('fontSize', getCurrentFontSize());
        });
    }
    
    // Высокая контрастность
    if (highContrast) {
        highContrast.addEventListener('click', function() {
            console.log('Enabling high contrast');
            document.body.classList.add('high-contrast');
            document.body.classList.remove('grayscale');
            updateAccessibilityState('contrast', 'high');
            showNotification('Включен режим высокой контрастности', 'info');
        });
    }
    
    // Обычная контрастность
    if (normalContrast) {
        normalContrast.addEventListener('click', function() {
            console.log('Enabling normal contrast');
            document.body.classList.remove('high-contrast', 'grayscale');
            updateAccessibilityState('contrast', 'normal');
            showNotification('Включен обычный режим', 'info');
        });
    }
    
    // Оттенки серого
    if (grayscale) {
        grayscale.addEventListener('click', function() {
            console.log('Enabling grayscale');
            document.body.classList.add('grayscale');
            document.body.classList.remove('high-contrast');
            updateAccessibilityState('contrast', 'grayscale');
            showNotification('Включен режим оттенков серого', 'info');
        });
    }
    
    // Получение текущего размера шрифта
    function getCurrentFontSize() {
        if (document.body.classList.contains('super-large-font')) return 'super-large';
        if (document.body.classList.contains('extra-large-font')) return 'extra-large';
        if (document.body.classList.contains('large-font')) return 'large';
        return 'normal';
    }
    
    // Сохранение состояния доступности
    function updateAccessibilityState(setting, value) {
        try {
            const accessibilityState = JSON.parse(localStorage.getItem('accessibilityState') || '{}');
            accessibilityState[setting] = value;
            localStorage.setItem('accessibilityState', JSON.stringify(accessibilityState));
            console.log('Accessibility state updated:', setting, value);
        } catch (error) {
            console.error('Error saving accessibility state:', error);
        }
    }
    
    // Восстановление состояния доступности при загрузке
    function restoreAccessibilityState() {
        try {
            const accessibilityState = JSON.parse(localStorage.getItem('accessibilityState') || '{}');
            console.log('Restoring accessibility state:', accessibilityState);
            
            // Восстанавливаем настройки шрифта
            if (accessibilityState.fontSize) {
                document.body.classList.remove('large-font', 'extra-large-font', 'super-large-font');
                if (accessibilityState.fontSize !== 'normal') {
                    const fontSizeClass = {
                        'large': 'large-font',
                        'extra-large': 'extra-large-font',
                        'super-large': 'super-large-font'
                    }[accessibilityState.fontSize];
                    
                    if (fontSizeClass) {
                        document.body.classList.add(fontSizeClass);
                    }
                }
            }
            
            // Восстанавливаем настройки контрастности
            if (accessibilityState.contrast) {
                document.body.classList.remove('high-contrast', 'grayscale');
                if (accessibilityState.contrast !== 'normal') {
                    document.body.classList.add(accessibilityState.contrast);
                }
            }
            
            // Восстанавливаем состояние панели
            if (accessibilityState.panelHidden) {
                if (accessibilityPanel) {
                    accessibilityPanel.classList.add('hidden');
                }
                if (accessibilityShow) {
                    accessibilityShow.classList.add('show');
                }
            } else {
                if (accessibilityPanel) {
                    accessibilityPanel.classList.remove('hidden');
                }
                if (accessibilityShow) {
                    accessibilityShow.classList.remove('show');
                }
            }
        } catch (error) {
            console.error('Error restoring accessibility state:', error);
        }
    }
    
    // Закрытие панели доступности при клике вне ее
    document.addEventListener('click', function(e) {
        if (accessibilityPanel && accessibilityPanel.classList.contains('open')) {
            if (!e.target.closest('.accessibility-panel') && 
                !e.target.closest('.accessibility-combined-btn') &&
                !e.target.closest('.accessibility-show-btn')) {
                accessibilityPanel.classList.remove('open');
                console.log('Panel closed by outside click');
            }
        }
    });
    
    // Восстановление настроек при загрузке
    restoreAccessibilityState();
});

// Функция показа уведомлений для accessibility.js
function showNotification(message, type = 'info') {
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
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    const autoHide = setTimeout(() => {
        hideNotification(notification);
    }, 3000);
    
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
