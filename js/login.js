const elForm = document.querySelector('.js-form');
const elEmail = document.querySelector('.js-email');
const elPassword = document.querySelector('.js-password');

const elBtn = document.querySelector('.js-btn')

elForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    fetch('http://192.168.0.108:5000/user/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: elEmail.value,
            password: elPassword.value
        })
    })
        .then((res) => res.json())
        .then((data) =>{
            console.log(data)
            if (data.token){
                localStorage.setItem('token', data.token);
                location.replace('index.html');
            }
        })
        .catch((err) => console.log(err))
})



elBtn.addEventListener('click', () => {
    if (elPassword.type != 'text') {
        elPassword.type = 'text'
    } else {
        elPassword.type = 'password'
    }
});