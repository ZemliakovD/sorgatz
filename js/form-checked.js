// Найти элементы на странице по id и классу
const checkbox = document.getElementById('gridCheck');
const button = document.querySelector('.reg-button');

// Функция для обновления состояния кнопки
function updateButtonState() {
  if (!checkbox.checked) {
    button.classList.add('all-button_disable');
    button.disabled = true; // Делаем кнопку неактивной
  } else {
    button.classList.remove('all-button_disable');
    button.disabled = false; // Делаем кнопку активной
  }
}

// Инициализация состояния кнопки при загрузке страницы
updateButtonState();

// Отслеживаем изменения состояния input
checkbox.addEventListener('change', updateButtonState);
