// Функции доступности
document.addEventListener('DOMContentLoaded', function() {
    const accessibilityToggle = document.getElementById('accessibilityToggle');
    const accessibilityPanel = document.getElementById('accessibilityPanel');
    const increaseFont = document.getElementById('increaseFont');
    const decreaseFont = document.getElementById('decreaseFont');
    const highContrast = document.getElementById('highContrast');
    const normalContrast = document.getElementById('normalContrast');
    const grayscale = document.getElementById('grayscale');
    
    // Переключение панели доступности
    accessibilityToggle.addEventListener('click', function() {
        accessibilityPanel.classList.toggle('open');
    });
    
    // Увеличение шрифта
    increaseFont.addEventListener('click', function() {
        document.body.classList.remove('large-font', 'extra-large-font');
        
        if (document.body.classList.contains('large-font')) {
            document.body.classList.remove('large-font');
            document.body.classList.add('extra-large-font');
        } else if (document.body.classList.contains('extra-large-font')) {
            // Уже максимальный размер
        } else {
            document.body.classList.add('large-font');
        }
        
        updateAccessibilityState('fontSize', document.body.className.match(/large-font|extra-large-font/)?.[0] || 'normal');
    });
    
    // Уменьшение шрифта
    decreaseFont.addEventListener('click', function() {
        document.body.classList.remove('large-font', 'extra-large-font');
        
        if (document.body.classList.contains('extra-large-font')) {
            document.body.classList.remove('extra-large-font');
            document.body.classList.add('large-font');
        } else if (document.body.classList.contains('large-font')) {
            document.body.classList.remove('large-font');
        }
        
        updateAccessibilityState('fontSize', document.body.className.match(/large-font|extra-large-font/)?.[0] || 'normal');
    });
    
    // Высокая контрастность
    highContrast.addEventListener('click', function() {
        document.body.classList.add('high-contrast');
        document.body.classList.remove('grayscale');
        updateAccessibilityState('contrast', 'high');
    });
    
    // Обычная контрастность
    normalContrast.addEventListener('click', function() {
        document.body.classList.remove('high-contrast', 'grayscale');
        updateAccessibilityState('contrast', 'normal');
    });
    
    // Оттенки серого
    grayscale.addEventListener('click', function() {
        document.body.classList.add('grayscale');
        document.body.classList.remove('high-contrast');
        updateAccessibilityState('contrast', 'grayscale');
    });
    
    // Сохранение состояния доступности
    function updateAccessibilityState(setting, value) {
        const accessibilityState = JSON.parse(localStorage.getItem('accessibilityState') || '{}');
        accessibilityState[setting] = value;
        localStorage.setItem('accessibilityState', JSON.stringify(accessibilityState));
    }
    
    // Восстановление состояния доступности при загрузке
    function restoreAccessibilityState() {
        const accessibilityState = JSON.parse(localStorage.getItem('accessibilityState') || '{}');
        
        if (accessibilityState.fontSize) {
            document.body.classList.remove('large-font', 'extra-large-font');
            if (accessibilityState.fontSize !== 'normal') {
                document.body.classList.add(accessibilityState.fontSize);
            }
        }
        
        if (accessibilityState.contrast) {
            document.body.classList.remove('high-contrast', 'grayscale');
            if (accessibilityState.contrast !== 'normal') {
                document.body.classList.add(accessibilityState.contrast);
            }
        }
    }
    
    // Закрытие панели доступности при клике вне ее
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.accessibility-panel') && !e.target.closest('.accessibility-btn')) {
            accessibilityPanel.classList.remove('open');
        }
    });
    
    // Восстановление настроек при загрузке
    restoreAccessibilityState();
});