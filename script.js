const searchInput = document.getElementById('searchInput');
const galleryItems = document.querySelectorAll('.gallery-item');
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const audio = document.getElementById('background-audio');
const videoButtons = document.querySelectorAll('.video-btn');

// Search functionality
searchInput.addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    galleryItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(searchTerm) ? 'block' : 'none';
    });
});

// Dark mode toggle
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    body.classList.toggle('bg-gray-900');
    body.classList.toggle('text-gray-100');
});

// Background audio autoplay
window.addEventListener('load', () => {
    audio.play().catch(() => {
        console.log("Autoplay prevented. User interaction required.");
    });
});

// Modal for videos
const modal = document.createElement('div');
modal.id = 'videoModal';
modal.className = 'fixed inset-0 bg-black bg-opacity-80 hidden flex items-center justify-center z-50';
modal.innerHTML = `
    <div class="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-4 relative">
        <button id="closeModal" class="absolute top-2 right-2">X</button>
        <div class="aspect-w-16 aspect-h-9">
            <iframe id="videoFrame" class="w-full h-96 rounded-lg" src="" frameborder="0" allowfullscreen></iframe>
        </div>
    </div>
`;
document.body.appendChild(modal);

const videoFrame = document.getElementById('videoFrame');
const closeModal = document.getElementById('closeModal');

videoButtons.forEach(button => {
    button.addEventListener('click', () => {
        const videoId = button.dataset.videoId;
        videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        modal.classList.remove('hidden');
    });
});

closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
    videoFrame.src = "";
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
        videoFrame.src = "";
    }
});
