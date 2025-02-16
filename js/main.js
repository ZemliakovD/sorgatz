document.addEventListener('DOMContentLoaded', (event) => {
    const counters = document.querySelectorAll('.counter-container');

    counters.forEach(counter => {
        const decrementButton = counter.querySelector('.decrement');
        const incrementButton = counter.querySelector('.increment');
        const guestCountInput = counter.querySelector('.guest-count');

        const updateStyles = () => {
            if (parseInt(guestCountInput.value) > 0) {
                guestCountInput.style.borderColor = '#0F9400';
                guestCountInput.style.backgroundColor = '#d9eef188';
            } else {
                guestCountInput.style.borderColor = '#DADDE1';
                guestCountInput.style.backgroundColor = 'transparent';
            }
        };

        decrementButton.addEventListener('click', () => {
            let currentValue = parseInt(guestCountInput.value);
            if (currentValue > 0) {
                guestCountInput.value = currentValue - 1;
                updateStyles();
            }
        });

        incrementButton.addEventListener('click', () => {
            let currentValue = parseInt(guestCountInput.value);
            if (currentValue < 9) {
                guestCountInput.value = currentValue + 1;
                updateStyles();
            }
        });
    });
});


// Функция для обновления счетчика количества блоков
function updateFlatCounter() {
    // Ищем родительский блок с классом "flats-items"
    const flatsItems = document.querySelector('.flats-items');
    if (!flatsItems) {
        console.warn('Блок с классом "flats-items" не найден!');
        return;
    }

    // Считаем количество элементов с классом "choosing-flat" внутри "flats-items"
    const flatCount = flatsItems.querySelectorAll('.choosing-flat').length;

    // Ищем span счетчика в кнопке с классом "flat-counter"
    const flatCounterSpan = document.querySelector('.flat-counter');
    if (flatCounterSpan) {
        // Обновляем текст счетчика
        flatCounterSpan.textContent = flatCount;
    } else {
        console.warn('Кнопка с классом "flat-counter" не найдена!');
    }
}

// Функция для обновления состояния интерфейса в зависимости от количества блоков
function updateInterface() {
    const flatsItems = document.querySelector('.flats-items');
    const flatNone = document.querySelector('.flats-none');
    const deleteButton = document.querySelector('.delete');
    const sendButton = document.querySelector('.auswahl-send');

    if (!flatsItems) {
        console.warn('Блок с классом "flats-items" не найден!');
        return;
    }

    // Считаем количество элементов с классом "choosing-flat" внутри "flats-items"
    const flatCount = flatsItems.querySelectorAll('.choosing-flat').length;

    // Ищем span счетчика с классом "flat-counter_item"
    const flatCounterSpan = document.querySelector('.flat-counter .flat-counter_item');
    if (flatCounterSpan) {
        flatCounterSpan.textContent = flatCount;
    } else {
        console.warn('Элемент с классом "flat-counter_item" не найден в кнопке!');
    }

    // Управление видимостью блока "flats-none" и классами кнопок
    if (flatCount === 0) {
        if (flatNone) flatNone.style.display = 'block'; // Показываем элемент
        if (deleteButton) {
            deleteButton.classList.add('all-button_disable');
            deleteButton.setAttribute('disabled', 'disabled');
        }
        if (sendButton) {
            sendButton.classList.add('all-button_disable');
            sendButton.setAttribute('disabled', 'disabled');
        }
    } else {
        if (flatNone) flatNone.style.display = 'none'; // Скрываем элемент
        if (deleteButton) {
            deleteButton.classList.remove('all-button_disable');
            deleteButton.removeAttribute('disabled');
        }
        if (sendButton) {
            sendButton.classList.remove('all-button_disable');
            sendButton.removeAttribute('disabled');
        }
    }
};

// Добавляем обработчик события "click" на кнопку с классом "delete"
document.querySelector('.delete').addEventListener('click', function () {
    const auswahlInner = document.querySelector('.auswahl-inner');
    if (!auswahlInner) {
        console.warn('Блок с классом "auswahl-inner" не найден!');
        return;
    }

    const choosingFlats = auswahlInner.querySelectorAll('.choosing-flat');

    for (const flat of choosingFlats) {
        const input = flat.querySelector('.form-check-input');
        if (input && input.checked) {
            flat.remove();
            console.log('Удалён блок:', flat);

            updateInterface(); // Обновляем интерфейс после удаления
            return;
        }
    }

    console.log('Активный input с классом "form-check-input" не найден.');
});

