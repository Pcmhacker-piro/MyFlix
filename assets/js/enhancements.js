/* Enhancements: save video progress (resume) and keyboard shortcuts */
document.addEventListener('DOMContentLoaded', function(){
    // Restore video progress and add resume overlay
    document.querySelectorAll('video').forEach(function(video, idx){
        try{
            const src = video.querySelector('source') ? video.querySelector('source').getAttribute('src') : video.getAttribute('src') || ('video-' + idx);
            const key = 'video_progress_' + src;
            const saved = localStorage.getItem(key);
            if(saved){
                const time = parseFloat(saved);
                if(!isNaN(time) && time > 5){
                    const btn = document.createElement('div');
                    btn.className = 'resume-overlay';
                    btn.textContent = 'Resume from ' + Math.floor(time) + 's';
                    btn.addEventListener('click', function(e){ e.stopPropagation(); video.currentTime = time; video.play(); btn.remove(); });
                    video.parentElement.style.position = 'relative';
                    video.parentElement.appendChild(btn);
                }
                video.currentTime = Math.max(0, parseFloat(saved));
            }

            // Save progress every 5s
            let lastSaved = 0;
            video.addEventListener('timeupdate', function(){
                if(video.currentTime - lastSaved > 5){
                    lastSaved = video.currentTime;
                    localStorage.setItem(key, video.currentTime);
                }
            });

            // Remove resume overlay when user plays
            video.addEventListener('play', function(){
                const overlay = video.parentElement.querySelector('.resume-overlay');
                if(overlay) overlay.remove();
            });
        }catch(e){console.error(e)}
    });

    // Keyboard shortcuts: Space = play/pause, Left/Right = seek
    document.body.addEventListener('keydown', function(e){
        const activeVideo = document.querySelector('video');
        if(!activeVideo) return;
        if(e.code === 'Space'){
            e.preventDefault();
            if(activeVideo.paused) activeVideo.play(); else activeVideo.pause();
        }else if(e.code === 'ArrowRight'){
            activeVideo.currentTime = Math.min(activeVideo.duration || 0, activeVideo.currentTime + 10);
        }else if(e.code === 'ArrowLeft'){
            activeVideo.currentTime = Math.max(0, activeVideo.currentTime - 10);
        }
    });

    // Reload page when site logo is clicked
    try{
        var logo = document.getElementById('site-logo');
        if(logo){
            logo.addEventListener('click', function(e){
                e.preventDefault && e.preventDefault();
                location.reload();
            });
        }
    }catch(err){console.error(err)}
});
