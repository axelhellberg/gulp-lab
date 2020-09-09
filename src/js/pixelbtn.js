var pixelBtn = function(e) {
    if (!e.target.classList.contains('pixel-btn')) return;

    var btn = e.target;
    
    document.getElementById('main-menu').classList.toggle('visible');
    
    if (btn.classList.contains('opened')) {
        btn.classList.toggle('opened');
        void btn.offsetWidth;
        btn.classList.toggle('closed');
    } else {
        btn.classList.toggle('closed');
        void btn.offsetWidth;
        btn.classList.toggle('opened');
    }
};

document.addEventListener('click', pixelBtn, false);

document.addEventListener('mousedown', function (e) {
    if (!e.target.classList.contains('pixel-btn')) return;
    e.preventDefault();
}, false);

document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' || e.key === ' ') pixelBtn(e);
}, false);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') e.target.blur();
}, false);