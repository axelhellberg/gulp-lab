var pixelBtn = function(e) {
    if (!e.target.classList.contains('pixel-btn')) return;

    var btn = e.target;
    
    document.getElementById('main-menu').classList.toggle('visible'); // toggle menu visibility
    
    if (btn.classList.contains('opened')) { // toggle button classes
        btn.classList.toggle('opened');
        void btn.offsetWidth; // required for replaying CSS animation
        btn.classList.toggle('closed');
    } else {
        btn.classList.toggle('closed');
        void btn.offsetWidth;
        btn.classList.toggle('opened');
    }
};

document.addEventListener('click', pixelBtn, false); // click event listener for button

document.addEventListener('mousedown', function (e) {
    if (!e.target.classList.contains('pixel-btn')) return;
    e.preventDefault(); // prevent browser highlight effect
}, false);

document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' || e.key === ' ') pixelBtn(e); // allow enter and space for toggle
}, false);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') e.target.blur(); // remove focus with escape key
}, false);