document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentArea = document.getElementById('content-area');

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const pageUrl = link.getAttribute('data-page-url');
            fetch(pageUrl)
                .then(response => response.text())
                .then(html => {
                    contentArea.innerHTML = html;
                    attachFormSubmitHandler();
                    attachEditDeleteHandlers();
                    attachFilterFormHandler();
                })
                .catch(error => {
                    console.error('Error loading page:', error);
                    contentArea.innerHTML = '<p>Erro ao carregar a página.</p>';
                });
        });
    });

    function attachFormSubmitHandler() {
        const forms = contentArea.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                const formData = new FormData(form);
                const actionUrl = form.getAttribute('action');

                fetch(actionUrl, {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert(data.message);
                        location.reload();
                    } else {
                        alert('Erro: ' + data.message);
                    }
                })
                .catch(error => {
                    console.error('Error submitting form:', error);
                    alert('Erro ao enviar o formulário.');
                });
            });
        });
    }

    function attachEditDeleteHandlers() {
        const editButtons = contentArea.querySelectorAll('.edit-btn');
        const deleteButtons = contentArea.querySelectorAll('.delete-btn');
        const addContributionButtons = contentArea.querySelectorAll('.add-contribution-btn');
        const editGoalModal = document.getElementById('edit-goal-modal');
        const addContributionModal = document.getElementById('add-contribution-modal');
        const closeModalBtn = editGoalModal ? editGoalModal.querySelector('.close-btn') : null;
        const closeContributionModalBtn = addContributionModal ? addContributionModal.querySelector('.close-btn') : null;

        editButtons.forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                if (editGoalModal) {
                    document.getElementById('edit-goal-id').setAttribute('value', id);
                    editGoalModal.style.display = 'block';
                } else {
                    const editIncomeIdElement = document.getElementById('edit-income-id');
                    const editExpenseIdElement = document.getElementById('edit-expense-id');
                    if (editIncomeIdElement) {
                        editIncomeIdElement.setAttribute('value', id);
                    }
                    if (editExpenseIdElement) {
                        editExpenseIdElement.setAttribute('value', id);
                    }
                    editModal.style.display = 'block';
                }
            });
        });

        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (confirm('Tem certeza que deseja excluir este item?')) {
                    const id = button.getAttribute('data-id');
                    let deleteUrl = '/delete_income';
                    if (button.classList.contains('delete-goal-btn')) {
                        deleteUrl = '/delete_goal';
                    }
                    fetch(deleteUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: new URLSearchParams({ id })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            alert(data.message);
                            location.reload();
                        } else {
                            alert('Erro: ' + data.message);
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting item:', error);
                        alert('Erro ao excluir o item.');
                    });
                }
            });
        });

        addContributionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                document.getElementById('goal-id').setAttribute('value', id);
                addContributionModal.style.display = 'block';
            });
        });

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                editGoalModal.style.display = 'none';
            });

            window.addEventListener('click', (event) => {
                if (event.target == editGoalModal) {
                    editGoalModal.style.display = 'none';
                }
            });
        }

        if (closeContributionModalBtn) {
            closeContributionModalBtn.addEventListener('click', () => {
                addContributionModal.style.display = 'none';
            });

            window.addEventListener('click', (event) => {
                if (event.target == addContributionModal) {
                    addContributionModal.style.display = 'none';
                }
            });
        }
    }

    function attachFilterFormHandler() {
        const filterForm = contentArea.querySelector('#filter-form');
        if (filterForm) {
            filterForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const formData = new FormData(filterForm);
                const actionUrl = filterForm.getAttribute('action');

                fetch(actionUrl, {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.text())
                .then(html => {
                    contentArea.innerHTML = html;
                    attachFormSubmitHandler();
                    attachEditDeleteHandlers();
                    attachFilterFormHandler();
                })
                .catch(error => {
                    console.error('Error submitting filter form:', error);
                    alert('Erro ao aplicar o filtro.');
                });
            });
        }
    }
});
