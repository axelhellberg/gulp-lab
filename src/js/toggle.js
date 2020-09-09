var toggleSwitch = function (e) {
    if (!e.target.classList.contains('toggle')) return; // return if not toggle is clicked       
    e.target.classList.toggle('on'); // toggle css class state
    document.querySelector('body').classList.toggle('orange'); // toggle background color
};

document.addEventListener('click', toggleSwitch, false); // click event listener activates toggleSwitch function

document.addEventListener('mousedown', function (e) {
    if (!e.target.classList.contains('toggle')) return;
    e.preventDefault(); // prevent browser highlight effect
}, false);

document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' || e.key === ' ') toggleSwitch(e); // allow enter and space for toggle
}, false);