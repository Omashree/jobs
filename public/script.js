const form = document.getElementById('filter-form');
const inputs = form.querySelectorAll('input, select');

inputs.forEach(input => {
    input.addEventListener('change', () => {
    form.submit();
    });
});

const modal = document.getElementById('jobModal');
const openBtn = document.getElementById('openModalBtn');
const closeBtn = document.getElementById('closeModalBtn');

function openModal() {
    modal.classList.add('show');
}

function closeModal() {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
}

document.getElementById('openModalBtn')?.addEventListener('click', () => {
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
});

closeBtn.addEventListener('click', closeModal);

window.onclick = (e) => {
if (e.target === modal) modal.style.display = 'none';
};

