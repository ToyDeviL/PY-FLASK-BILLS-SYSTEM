document.addEventListener('DOMContentLoaded', function () {
    const modal = document.querySelector('.modal');
    const closeButton = document.querySelector('.modal-close');

    if (modal) {
        modal.style.display = 'block';
        
        closeButton.addEventListener('click', function () {
            closeModal();
        });

        window.addEventListener('click', function (event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }
});

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

