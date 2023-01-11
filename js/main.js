const localData = localStorage.getItem('token');
const logOutBtn = document.querySelector('.js-logout');

if (!localData) {
    location.replace('register.html');
}

logOutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    location.reload();
})

