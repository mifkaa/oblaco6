const body = document.querySelector('body')
// const onPage = document.querySelector('#onPage')
// const nextPageGood = document.querySelector('#nextPageGood');

// onPage.style.display = 'block'
// setTimeout(() => {
//     onPage.style.display = 'none'
// }, 500)


function pageHidden() {
    // body.style.visibility = 'hidden';
    body.style.opacity = '0';
}

function pageVisibility() {
    // body.style.visibility = 'visible';
    body.style.opacity = '1';
}

pageHidden();

setTimeout(() => {
    pageVisibility();
}, 1100);


// function onPageF() {
//   setTimeout(() => {
//     nextPageOn.style.display = 'none';
//   }, 500)
// }

// fNextPageOn();




const header = document.querySelector('header');

const labelSvg = document.querySelector('.label svg');
labelSvg.addEventListener('click', function () {
    location.reload()
})






const menuA = document.querySelectorAll('.menu a');
menuA.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        pageHidden();

        setTimeout(() => {
            window.location.href = link.dataset.href;
            setTimeout(() => {
                pageVisibility();
            }, 1000)
        }, 1100)
    })
})













const formCreate = document.querySelector('.formCreate form');
const nameCreate = document.getElementById('nameCreate');
const emailCreate = document.getElementById('emailCreate');
const passwordCreate = document.getElementById('passwordCreate');

formCreate.addEventListener('submit', function (e) {
    e.preventDefault();
    resetErrors();
    // formName.classList.remove('error');
    // formEmail.classList.remove('error');
    // formPassword.classList.remove('error');

    let isValid = true;

    // Валидация имени
    if (!nameCreate.value.trim()) {
        showError(nameCreate, 'nameCreate-error', 'Введите имя');
        isValid = false;
    } else if (!/^[A-Za-zА-Яа-яЁё\s\-]+$/.test(nameCreate.value)) {
        showError(nameCreate, 'nameCreate-error', 'Только буквы, пробелы и дефисы');
        isValid = false;
    }

    // Валидация email
    if (!emailCreate.value.trim()) {
        showError(emailCreate, 'emailCreate-error', 'Email не должен быть пустым');
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailCreate.value)) {
        showError(emailCreate, 'emailCreate-error', 'Используйте формат example@name.com');
        isValid = false;
    }

    // Валидация пароля
    if (!passwordCreate.value) {
        showError(passwordCreate, 'passwordCreate-error', 'Введите пароль');
        isValid = false;
    } else if (!/^[\w.\-!@#$%^&*()]+$/.test(passwordCreate.value)) {
        showError(passwordCreate, 'passwordCreate-error', 'Латинские буквы, цифры и ^.-_!@#$%&*()');
        isValid = false;
    } else if (passwordCreate.value.length < 8) {
        showError(passwordCreate, 'passwordCreate-error', 'Минимум 8 символов');
        isValid = false;
    } else if (!/^(?=.*[A-Za-z])(?=.*\d).+$/.test(passwordCreate.value)) {
        showError(passwordCreate, 'passwordCreate-error', 'Используйте комбинацию буквы + цифры');
        isValid = false;
    }

    // ✖ 

    if (isValid) {
        alert('Форма успешно отправлена!');
        this.submit();
    }
});

// Показать/скрыть пароль
const passwordCreateEyes = document.querySelector('#passwordCreateEyes');
passwordCreateEyes.addEventListener('click', function () {

    const password = document.getElementById('passwordCreate');
    const type = password.type === 'password' ? 'text' : 'password';
    password.type = type;

    const eyesYes = document.querySelector('#passwordCreateEyes .eyesYes');
    const eyesNo = document.querySelector('#passwordCreateEyes .eyesNo');

    eyesYes.classList.toggle('notShow')
    eyesNo.classList.toggle('notShow')
});








// Сброс ошибок
function resetErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.style.display = 'none';
    });
    document.querySelectorAll('input').forEach(input => {
        input.classList.remove('error');
    });
}

// Показать ошибку
function showError(input, errorId, message) {
    const errorElement = document.getElementById(errorId);
    input.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';

    input.style.animation = 'none';
    void input.offsetWidth;
    input.style.animation = 'shake 0.5s';
}

function hideError(input, errorId) {
    const errorElement = document.getElementById(errorId);
    input.classList.remove('error');
    errorElement.style.display = 'none';
}


function showCorrect(input) {
    input.classList.add('correct');
}
function hideCorrect(input) {
    input.classList.remove('correct');
}

function showDelete(deleteId) {
    const deleteElement = document.getElementById(deleteId);

    deleteElement.style.opacity = 1;
    deleteElement.style.pointerEvents = 'auto';

}
function hideDelete(deleteId) {
    const deleteElement = document.getElementById(deleteId);

    deleteElement.style.opacity = 0;
    deleteElement.style.pointerEvents = 'none';
}





const deleteMessage = document.querySelectorAll('.delete-message');
deleteMessage.forEach(deleeteElement => {
    deleeteElement.addEventListener('click', () => {
        const input = deleeteElement.closest('.inputBox').querySelector('input');
        const error = deleeteElement.closest('.inputBox').querySelector('.error-message');

        input.style.opacity = '0';
        error.style.opacity = '0';

        deleeteElement.style.opacity = '0';
        // deleeteElement.style.pointerEvents = 'none';

        setTimeout(() => {
            input.value = '';
            input.style.opacity = '1';

            hideError(input, error.id);
            error.style.opacity = '1';

            hideDelete(deleeteElement.id)
            // deleeteElement.style.pointerEvents = 'auto';

            input.focus();
        }, 300);

    })

});



nameCreate.addEventListener('input', function () {

    const nameRegex = /^[A-Za-zА-Яа-яЁё\s\-]+$/;
    hideCorrect(this);
    showDelete('nameCreate-delete');

    if (this.value.trim() == '') {
        hideError(this, 'nameCreate-error');
        hideDelete('nameCreate-delete');
    }
    else if (!nameRegex.test(this.value.trim())) {
        showError(this, 'nameCreate-error', 'Только буквы, пробелы и дефисы');
    }
    else {
        hideError(this, 'nameCreate-error');
        showCorrect(this);
    }
});
nameCreate.addEventListener('blur', function () {
    const nameRegex = /^[A-Za-zА-Яа-яЁё\s\-]+$/;
    hideCorrect(this);
    // showDelete('nameCreate-delete');

    if (this.value.trim() == '') {
        hideError(this, 'nameCreate-error');
    }
    else if (!nameRegex.test(this.value.trim())) {
        showError(this, 'nameCreate-error', 'Только буквы, пробелы и дефисы');
    }
    else {
        hideError(this, 'nameCreate-error');
        showCorrect(this);
    }
});



emailCreate.addEventListener('input', function () {
    // const nameRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    hideCorrect(this);
    showDelete('emailCreate-delete');

    if (this.value.trim() == '') {
        hideError(this, 'emailCreate-error');
        hideDelete('emailCreate-delete');
    }
    // else if (!nameRegex.test(this.value.trim())) {
    //   showError(this, 'email-error', 'Введите почту в формате example@name.com');
    // }
    else {
        hideError(this, 'emailCreate-error');
        showCorrect(this);

    }
});
emailCreate.addEventListener('blur', function () {
    const nameRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    hideCorrect(this);

    if (this.value.trim() == '') {
        hideError(this, 'emailCreate-error');
    }
    else if (!nameRegex.test(this.value.trim())) {
        // showError(this, 'email-error', 'Введите почту в формате example@name.com');
        showError(this, 'emailCreate-error', 'Используйте формат example@name.com');
    }
    else {
        hideError(this, 'emailCreate-error');
        showCorrect(this);
    }
});




passwordCreate.addEventListener('input', function () {
    const nameRegex = /^[\w.\-!@#$%^&*()]+$/;
    hideCorrect(this);
    showDelete('passwordCreate-delete');

    if (this.value.trim() == '') {
        hideError(this, 'passwordCreate-error');
        hideDelete('passwordCreate-delete');
    }
    else if (!nameRegex.test(this.value.trim())) {
        showError(this, 'passwordCreate-error', 'Латинские буквы, цифры и ^.-_!@#$%&*()');
    }
    else {
        hideError(this, 'passwordCreate-error');
        showCorrect(this);
    }
});

passwordCreate.addEventListener('blur', function () {
    const nameRegex = /^[\w.\-!@#$%^&*()]+$/;
    hideCorrect(this);

    if (this.value.trim() == '') {
        hideError(this, 'passwordCreate-error');
    }
    else if (!nameRegex.test(this.value.trim())) {
        showError(this, 'passwordCreate-error', 'Латинские буквы, цифры и ^.-_!@#$%&*()');
    }
    else if (passwordCreate.value.length < 8) {
        showError(passwordCreate, 'passwordCreate-error', 'Минимум 8 символов');
    }
    else if (!/^(?=.*[A-Za-z])(?=.*\d).+$/.test(passwordCreate.value)) {
        showError(passwordCreate, 'passwordCreate-error', 'Используйте комбинацию буквы + цифры');
        isValid = false;
    }
    else {
        hideError(this, 'passwordCreate-error');
        showCorrect(this);
    }
});


// const deleteMessage = document.querySelectorAll('.delete-message');
// deleteMessage.forEach(deleeteElement => {
//   deleeteElement.addEventListener('click', () => {
//     const input = deleeteElement.closest('.inputBox').querySelector('input');
//     const error = deleeteElement.closest('.inputBox').querySelector('.error-message');

//     input.style.opacity = '0';
//     error.style.opacity = '0';

//     setTimeout(() => {
//       input.value = '';
//       input.style.opacity = '1';

//       hideError(input, error.id);
//       error.style.opacity = '1';

//       hideDelete(deleeteElement.id)
//       input.focus();
//     }, 300);

//   })

// });


















const formSign = document.querySelector('.formSignIn form');
const emailSignIn = document.getElementById('emailSignIn');
const passwordSignIn = document.getElementById('passwordSignIn');

formSign.addEventListener('submit', function (e) {
    e.preventDefault();
    resetErrors();
    // formName.classList.remove('error');
    // formEmail.classList.remove('error');
    // formPassword.classList.remove('error');

    let isValid = true;

    // Валидация email
    if (!emailSignIn.value.trim()) {
        showError(emailSignIn, 'emailSignIn-error', 'Email не должен быть пустым');
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailSignIn.value)) {
        showError(emailSignIn, 'emailSignIn-error', 'Используйте формат example@name.com');
        isValid = false;
    }

    // Валидация пароля
    if (!passwordSignIn.value) {
        showError(passwordSignIn, 'passwordSignIn-error', 'Введите пароль');
        isValid = false;
    } else if (!/^[\w.\-!@#$%^&*()]+$/.test(passwordSignIn.value)) {
        showError(passwordSignIn, 'passwordSignIn-error', 'Латинские буквы, цифры и ^.-_!@#$%&*()');
        isValid = false;
    } else if (passwordSignIn.value.length < 8) {
        showError(passwordSignIn, 'passwordSignIn-error', 'Минимум 8 символов');
        isValid = false;
    } else if (!/^(?=.*[A-Za-z])(?=.*\d).+$/.test(passwordSignIn.value)) {
        showError(passwordSignIn, 'passwordSignIn-error', 'Используйте комбинацию буквы + цифры');
        isValid = false;
    }

    // ✖ 

    if (isValid) {
        alert('Форма успешно отправлена!');
        this.submit();
    }
});

// Показать/скрыть пароль
const passwordSignInEyes = document.querySelector('#passwordSignInEyes');
passwordSignInEyes.addEventListener('click', function () {

    const password = document.getElementById('passwordSignIn');
    const type = password.type === 'password' ? 'text' : 'password';
    password.type = type;

    const eyesYes = document.querySelector('#passwordSignInEyes .eyesYes');
    const eyesNo = document.querySelector('#passwordSignInEyes .eyesNo');

    eyesYes.classList.toggle('notShow')
    eyesNo.classList.toggle('notShow')
});




emailSignIn.addEventListener('input', function () {
    // const nameRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    hideCorrect(this);
    showDelete('emailSignIn-delete');

    if (this.value.trim() == '') {
        hideError(this, 'emailSignIn-error');
        hideDelete('emailSignIn-delete');
    }
    // else if (!nameRegex.test(this.value.trim())) {
    //   showError(this, 'email-error', 'Введите почту в формате example@name.com');
    // }
    else {
        hideError(this, 'emailSignIn-error');
        showCorrect(this);

    }
});
emailSignIn.addEventListener('blur', function () {
    const nameRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    hideCorrect(this);

    if (this.value.trim() == '') {
        hideError(this, 'emailSignIn-error');
    }
    else if (!nameRegex.test(this.value.trim())) {
        // showError(this, 'email-error', 'Введите почту в формате example@name.com');
        showError(this, 'emailSignIn-error', 'Используйте формат example@name.com');
    }
    else {
        hideError(this, 'emailSignIn-error');
        showCorrect(this);
    }
});




passwordSignIn.addEventListener('input', function () {
    const nameRegex = /^[\w.\-!@#$%^&*()]+$/;
    hideCorrect(this);
    showDelete('passwordSignIn-delete');

    if (this.value.trim() == '') {
        hideError(this, 'passwordSignIn-error');
        hideDelete('passwordSignIn-delete');
    }
    else if (!nameRegex.test(this.value.trim())) {
        showError(this, 'passwordSignIn-error', 'Латинские буквы, цифры и ^.-_!@#$%&*()');
    }
    else {
        hideError(this, 'passwordSignIn-error');
        showCorrect(this);
    }
});

passwordSignIn.addEventListener('blur', function () {
    const nameRegex = /^[\w.\-!@#$%^&*()]+$/;
    hideCorrect(this);

    if (this.value.trim() == '') {
        hideError(this, 'passwordSignIn-error');
    }
    else if (!nameRegex.test(this.value.trim())) {
        showError(this, 'passwordSignIn-error', 'Латинские буквы, цифры и ^.-_!@#$%&*()');
    }
    else if (passwordSignIn.value.length < 8) {
        showError(passwordSignIn, 'passwordSignIn-error', 'Минимум 8 символов');
    }
    else if (!/^(?=.*[A-Za-z])(?=.*\d).+$/.test(passwordSignIn.value)) {
        showError(passwordSignIn, 'passwordSignIn-error', 'Используйте комбинацию буквы + цифры');
        isValid = false;
    }
    else {
        hideError(this, 'passwordSignIn-error');
        showCorrect(this);
    }
});






// function checkForm() {

//   const form = document.querySelector('form');

//   form.addEventListener('submit', function (event) {
//     let flag = true;
//     event.preventDefault(); // Предотвращаем отправку формы

//     // Сбрасываем сообщения об ошибках
//     // document.querySelector('.nameError').textContent = '';
//     // document.querySelector('.phoneError').textContent = '';
//     // document.querySelector('.emailError').textContent = '';

//     // Получаем значения полей
//     const name = document.querySelector('#usernameUp').value.trim();
//     // const phone = document.querySelector('#phone').value.trim();
//     const email = document.querySelector('#email').value.trim();

//     // Валидация имени
//     const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/; // Разрешает буквы, пробелы и дефисы
//     if (!nameRegex.test(name)) {
//       flag = false;
//       document.querySelector('.nameError').textContent = 'Введите корректное ИМЯ, пожалуйста.';
//     }



//     // Валидация электронной почты
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Простой паттерн для почты
//     if (!emailRegex.test(email)) {
//       flag = false;
//       // document.querySelector('.emailError').textContent = 'Введите корректную электронную ПОЧТУ, пожалуйста.';
//       console.log  ('Введите корректную электронную ПОЧТУ, пожалуйста.');

//     }

//     // Если все поля валидны, можно отправить форму (например, на сервер)
//     if (flag) {
//       alert('Форма успешно отправлена!  Мы в ближайшее время свяжемся с вами)');
//       setTimeout(() => { }, 1000)
//       nameForm.value = '';
//       phoneForm.value = '';
//       emailForm.value = '';
//       // Здесь можно добавить код для отправки формы, если необходимо
//     }
//   });
// }
// checkForm()



const goBlock = document.querySelector('.registrationBlock .goBlock');
const SignInFormBlock = document.querySelector('.registrationBlock .signIn .formBlock');
const CreateAccountFormBlock = document.querySelector('.registrationBlock .createAccount .formBlock');

const SignInInfo = document.querySelector('.registrationBlock .signIn .info');
const CreateAccountInfo = document.querySelector('.registrationBlock .createAccount .info');


const SignIn = document.querySelector('.registrationBlock .signIn');
const CreateAccount = document.querySelector('.registrationBlock .createAccount');

const InfoOnSign = document.querySelector('.registrationBlock .signIn .infoCreate');
const InfoOnCreate = document.querySelector('.registrationBlock .createAccount .infoSign');

const iInfoCreate = document.querySelector('.signIn .infoCreate');
const iformSign = document.querySelector('.signIn .formSignIn');

const iformCreate = document.querySelector('.createAccount .formCreate');
const iInfoSign = document.querySelector('.createAccount .infoSign');

SignInFormBlock.classList.add('go')
CreateAccountInfo.classList.toggle('go')


function toggleForms() {
    goBlock.classList.toggle('go')
    SignInFormBlock.classList.toggle('go')
    CreateAccountFormBlock.classList.toggle('go')
    SignInInfo.classList.toggle('go')
    CreateAccountInfo.classList.toggle('go')


    // SignIn.classList.toggle('colorWhite')
    // SignIn.classList.toggle('colorMain')
    // CreateAccount.classList.toggle('colorWhite')
    // CreateAccount.classList.toggle('colorMain')

    setTimeout(() => {
        iformSign.classList.toggle('notShow')
        iformCreate.classList.toggle('notShow')

    }, 310)

    iInfoCreate.classList.toggle('notShow')
    iInfoSign.classList.toggle('notShow')
}


let flagGoBlock = true

InfoOnSign.addEventListener('click', function () {

    if (flagGoBlock) {
        flagGoBlock = false
        toggleForms();

        setTimeout(() => {
            flagGoBlock = true
        }, 1000)
    }
})
InfoOnCreate.addEventListener('click', function () {

    if (flagGoBlock) {
        flagGoBlock = false
        toggleForms();

        setTimeout(() => {
            flagGoBlock = true
        }, 1000)
    }
})













const forgotPasswordBut = document.querySelector('.forgotPasswordBut')
const blockForgotPassword = document.querySelector('.blockForgotPassword')

forgotPasswordBut.addEventListener('click', function () {

    blockForgotPassword.classList.toggle('notShow')
    body.style.overflow = 'hidden';
})


const exitMaxForgotPassword = document.querySelector('.blockForgotPassword .exitMax')
exitMaxForgotPassword.addEventListener('click', function () {

    blockForgotPassword.classList.toggle('notShow')
    body.style.overflow = 'auto';
})

exitMaxForgotPassword.addEventListener('mouseenter', function () {

    exitForgotPassword.classList.add('mouseenter');
})
exitMaxForgotPassword.addEventListener('mouseleave', function () {

    exitForgotPassword.classList.remove('mouseenter');
})




const exitForgotPassword = document.querySelector('.blockForgotPassword .exit')
exitForgotPassword.addEventListener('click', function () {

    blockForgotPassword.classList.toggle('notShow')
    body.style.overflow = 'auto';
})


const formForgot = document.querySelector('.formForgot form');
const emailForgot = document.querySelector('#emailForgot');

formForgot.addEventListener('submit', function (e) {
    e.preventDefault();
    resetErrors();

    let isValid = true;

    // Валидация email
    if (!emailForgot.value.trim()) {
        showError(emailForgot, 'emailForgot-error', 'Email не должен быть пустым');
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailForgot.value)) {
        showError(emailForgot, 'emailForgot-error', 'Используйте формат example@name.com');
        isValid = false;
    }

    if (isValid) {
        alert('Форма успешно отправлена!');
        this.submit();
    }
});




emailForgot.addEventListener('input', function () {
    // const nameRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    hideCorrect(this);
    showDelete('emailForgot-delete');

    if (this.value.trim() == '') {
        hideError(this, 'emailForgot-error');
        hideDelete('emailForgot-delete');
    }
    // else if (!nameRegex.test(this.value.trim())) {
    //   showError(this, 'email-error', 'Введите почту в формате example@name.com');
    // }
    else {
        hideError(this, 'emailForgot-error');
        showCorrect(this);

    }
});
emailForgot.addEventListener('blur', function () {
    const nameRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    hideCorrect(this);

    if (this.value.trim() == '') {
        hideError(this, 'emailForgot-error');
    }
    else if (!nameRegex.test(this.value.trim())) {
        // showError(this, 'email-error', 'Введите почту в формате example@name.com');
        showError(this, 'emailForgot-error', 'Используйте формат example@name.com');
    }
    else {
        hideError(this, 'emailForgot-error');
        showCorrect(this);
    }
});