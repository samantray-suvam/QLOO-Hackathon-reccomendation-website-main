document.addEventListener('DOMContentLoaded', function() {
    const videos = [
        'https://cdn.pixabay.com/video/2022/02/08/107142-675298847_tiny.mp4',
        'https://cdn.pixabay.com/video/2020/01/21/31475-386957680_tiny.mp4',
        'https://cdn.pixabay.com/video/2024/06/28/218535_tiny.mp4',
        'https://cdn.pixabay.com/video/2025/03/29/268558_tiny.mp4',
        'https://cdn.pixabay.com/video/2021/02/16/65390-514139029_tiny.mp4'
    ];
    
    let currentVideoIndex = 0;
    const videoElement = document.createElement('video');
    videoElement.className = 'retro-animation';
    videoElement.autoplay = true;
    videoElement.muted = true;
    videoElement.playsInline = true;

    const retroGameBox = document.querySelector('.retro-game-box');
    retroGameBox.innerHTML = '';
    retroGameBox.appendChild(videoElement);

    function playNextVideo() {
        videoElement.src = videos[currentVideoIndex];
        videoElement.play();
        currentVideoIndex = (currentVideoIndex + 1) % videos.length;
    }

    // Switch videos every 6 seconds
    playNextVideo();
    setInterval(playNextVideo, 6000);

    // Handle video end (backup for seamless playback)
    videoElement.addEventListener('ended', playNextVideo);
});
