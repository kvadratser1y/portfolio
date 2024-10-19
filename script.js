// Функция для плавного скролла
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const formMessages = document.getElementById('form-messages');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        
        fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Ошибка при отправке формы');
            }
        })
        .then(data => {
            formMessages.innerHTML = 'Спасибо! Ваше сообщение отправлено.';
            form.reset();
            
            // Сохранение данных в localStorage
            const submission = {
                name: formData.get('name'),
                email: formData.get('email'),
                package: formData.get('package'),
                message: formData.get('message'),
                date: new Date().toLocaleString()
            };
            
            let submissions = JSON.parse(localStorage.getItem('submissions')) || [];
            submissions.push(submission);
            localStorage.setItem('submissions', JSON.stringify(submissions));
            
            // Вывод данных в консоль (для отладки)
            console.log('Отправленные данные:', submission);
        })
        .catch(error => {
            formMessages.innerHTML = 'Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.';
            console.error('Error:', error);
        });
    });
});

// Функция для загрузки и отображения сохраненных отправок
function loadSubmissions() {
    let submissions = JSON.parse(localStorage.getItem('submissions')) || [];
    const submissionsList = document.getElementById('submissions-list');
    
    if (submissionsList) {
        if (submissions.length > 0) {
            submissions.forEach(submission => {
                const submissionDiv = document.createElement('div');
                submissionDiv.innerHTML = `
                    <p><strong>Имя:</strong> ${submission.name}</p>
                    <p><strong>Email:</strong> ${submission.email}</p>
                    <p><strong>Пакет:</strong> ${submission.package}</p>
                    <p><strong>Сообщение:</strong> ${submission.message}</p>
                    <p><strong>Дата:</strong> ${submission.date}</p>
                    <hr>
                `;
                submissionsList.appendChild(submissionDiv);
            });
        } else {
            submissionsList.innerHTML = '<p>Анкет нет.</p>';
            submissionsList.innerHTML = '<p>Анкет нет.</p>';
        }
    }
}
// Вызов функции загрузки отправок при загрузке страницы
document.addEventListener('DOMContentLoaded', loadSubmissions);

    // Скролл до секции при клике на кнопку
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}