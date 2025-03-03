document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentArea = document.getElementById('content-area');

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            fetch(link.getAttribute('data-page-url'))
                .then(response => response.text())
                .then(html => {
                    contentArea.innerHTML = html;
                    attachHandlers();
                })
                .catch(error => {
                    console.error('Error loading page:', error);
                    contentArea.innerHTML = '<p>Erro ao carregar a página.</p>';
                });
        });
    });

    function attachHandlers() {
        attachFormSubmitHandler();
        attachEditDeleteHandlers();
        attachFilterFormHandler();
        if (document.getElementById('add-goal-form')) {
            attachGoalHandlers();
        }
    }

    function attachFormSubmitHandler() {
        contentArea.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                fetch(form.getAttribute('action'), {
                    method: 'POST',
                    body: new FormData(form)
                })
                .then(response => response.json())
                .then(data => {
                    alert(data.success ? data.message : 'Erro: ' + data.message);
                    if (data.success) location.reload();
                })
                .catch(error => {
                    console.error('Error submitting form:', error);
                    alert('Erro ao enviar o formulário.');
                });
            });
        });
    }

    function attachEditDeleteHandlers() {
        contentArea.querySelectorAll('.edit-btn, .delete-btn, .add-contribution-btn').forEach(button => {
            button.addEventListener('click', () => handleButtonClick(button));
        });
    }

    function handleButtonClick(button) {
        const id = button.getAttribute('data-id');
        if (button.classList.contains('edit-btn')) {
            handleEdit(id);
        } else if (button.classList.contains('delete-btn')) {
            handleDelete(id, button.classList.contains('delete-goal-btn') ? '/delete_goal' : '/delete_income');
        } else if (button.classList.contains('add-contribution-btn')) {
            document.getElementById('goal-id').setAttribute('value', id);
            document.getElementById('add-contribution-modal').style.display = 'block';
        }
    }

    function handleEdit(id) {
        const editGoalModal = document.getElementById('edit-goal-modal');
        if (editGoalModal) {
            document.getElementById('edit-goal-id').value = id;
            editGoalModal.style.display = 'block';
        }
    }

    function handleDelete(id, url) {
        if (confirm('Tem certeza que deseja excluir este item?')) {
            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ id })
            })
            .then(response => response.json())
            .then(data => {
                alert(data.success ? data.message : 'Erro: ' + data.message);
                if (data.success) location.reload();
            })
            .catch(error => {
                console.error('Error deleting item:', error);
                alert('Erro ao excluir o item.');
            });
        }
    }

    function attachFilterFormHandler() {
        const filterForm = contentArea.querySelector('#filter-form');
        if (filterForm) {
            filterForm.addEventListener('submit', (event) => {
                event.preventDefault();
                fetch(filterForm.getAttribute('action'), {
                    method: 'POST',
                    body: new FormData(filterForm)
                })
                .then(response => response.text())
                .then(html => {
                    contentArea.innerHTML = html;
                    attachHandlers();
                })
                .catch(error => {
                    console.error('Error submitting filter form:', error);
                    alert('Erro ao aplicar o filtro.');
                });
            });
        }
    }

    function attachGoalHandlers() {
        const addGoalForm = document.getElementById('add-goal-form');
        const goalsList = document.getElementById('goals-list');

        addGoalForm.addEventListener('submit', (event) => {
            event.preventDefault();
            fetch('/add_goal', {
                method: 'POST',
                body: new FormData(addGoalForm)
            })
            .then(response => response.json())
            .then(data => {
                alert(data.success ? data.message : 'Erro: ' + data.message);
                if (data.success) loadGoals();
            })
            .catch(error => {
                console.error('Error adding goal:', error);
                alert('Erro ao adicionar a meta.');
            });
        });

        function loadGoals() {
            fetch('/view_goals_content')
                .then(response => response.text())
                .then(html => {
                    goalsList.innerHTML = html;
                    attachGoalActions();
                })
                .catch(error => {
                    console.error('Error loading goals:', error);
                    goalsList.innerHTML = '<p>Erro ao carregar as metas.</p>';
                });
        }

        function attachGoalActions() {
            goalsList.querySelectorAll('.edit-goal-btn, .delete-goal-btn, .add-contribution-btn').forEach(button => {
                button.addEventListener('click', () => handleButtonClick(button));
            });
        }

        loadGoals();
    }
});

