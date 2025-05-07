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

window.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === '1') {
        const toast = document.getElementById('toast');
        const progress = document.getElementById('progress');
        const close = document.getElementById('close');

        const totalDuration = 3000;
        let startTimestamp = null;
        let elapsedBeforePause = 0;
        let animationFrame = null;
        let isPaused = false;

        function animateProgress(timestamp) {
            if (!startTimestamp) startTimestamp = timestamp;

            const elapsed = timestamp - startTimestamp + elapsedBeforePause;
            const progressRatio = Math.min(elapsed / totalDuration, 1);
            progress.style.transform = `scaleX(${progressRatio})`;

            if (progressRatio < 1 && !isPaused) {
                animationFrame = requestAnimationFrame(animateProgress);
            } else if (progressRatio >= 1) {
                hideToast();
            }
        }

        function pauseProgress() {
            isPaused = true;
            cancelAnimationFrame(animationFrame);
            elapsedBeforePause += performance.now() - startTimestamp;
        }

        function resumeProgress() {
            isPaused = false;
            startTimestamp = null;
            animationFrame = requestAnimationFrame(animateProgress);
        }

        function showToast() {
            toast.style.visibility = 'visible';
            toast.style.opacity = '1';
            progress.style.transform = 'scaleX(0)';
            startTimestamp = null;
            elapsedBeforePause = 0;
            animationFrame = requestAnimationFrame(animateProgress);
        }

        function hideToast() {
            toast.style.opacity = '0';
            toast.style.visibility = 'hidden';
            cancelAnimationFrame(animationFrame);
            progress.style.transform = 'scaleX(0)';
        }

        toast.addEventListener('mouseenter', pauseProgress);
        toast.addEventListener('mouseleave', resumeProgress);
        close.addEventListener('click', hideToast);

        showToast();

        const newURL = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, newURL);
    }
});
