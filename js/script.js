// Select DOM elements
const body = document.body;
const navMenuMobile = document.querySelector('.menu-mobile');
const burgerMenu = document.querySelector('.burger-menu');
const menuItems = document.querySelectorAll('.menu-mobile li');
const imageSkillList = document.querySelectorAll('.skills-container .row .col-3 img')
const contactForm =  document.getElementById('contactForm');
const submitButton = document.getElementById('submitBtn');

// Handle window width changes
function setMenuStyle() {
    if (window.innerWidth > 991) {
        closeMobileMenu();
        navMenuMobile.classList.replace('menu-mobile', 'menu-desktop');
    } else {
        navMenuMobile.classList.replace('menu-desktop', 'menu-mobile');
    }
}

// Reset the mobile menu state
function closeMobileMenu() {
    burgerMenu.classList.remove('open');
    navMenuMobile.classList.remove('show');
    body.classList.remove('overflow-hidden');
}

// Toggle the mobile menu
function toggleMobileMenu() {
    burgerMenu.classList.toggle('open');
    navMenuMobile.classList.toggle('show');
    body.classList.toggle('overflow-hidden');

}

// Handle menu item activation
function menuItemActive() {
    menuItems.forEach(item => item.classList.remove('active'));
    this.classList.add('active');
    if (window.innerWidth <= 991) {
        toggleMobileMenu();
    }
}

// Event listeners for Menu
function menuEventListeners() {
    burgerMenu.addEventListener('click', toggleMobileMenu);
    window.addEventListener('resize', setMenuStyle);
    menuItems.forEach(item => item.addEventListener('click', menuItemActive));
}

// Added delay for image animation
function addDelayAnimationImagesSkill(){
    imageSkillList.forEach((image, i ) => {
        const randomDelay = generateRandomNumber(0.5, 3.5);
        image.style.animationDelay = `${randomDelay}s`;
    })
}

// Generating a random number
function generateRandomNumber(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}

// EmailJs
function  startEmailJS(){
    emailjs.init("FoSYNKe0_5ndJU-w7");
}

// Check valid form
function checkFormValidity() {
    if (contactForm.checkValidity()) {
        submitButton.removeAttribute('disabled');
    } else {
        submitButton.setAttribute('disabled', 'true');
    }
}

// Send email
async function sendEmail(event, sendingStatus){
    event.preventDefault();
    const formData = event.target.elements;
    const name = formData.name.value;
    const email = formData.email.value;
    const message = formData.message.value;

    try{
        await emailjs.send("service_ostfstp", "template_dwh8uzb", {
            from_name: name,
            from_email: email,
            message: message,
        });

        sendingStatus.innerText = "Message sent successfully!";
        sendingStatus.classList.replace('yellow-gradient-text', 'text-green');

        formData.name.value = '';
        formData.email.value = '';
        formData.message.value = '';
    } catch (e){
        sendingStatus.innerText = "Oops! Something went wrong.";
        sendingStatus.classList.replace('yellow-gradient-text', 'text-danger');
    }

}

// Script
function init() {
    setMenuStyle();
    menuEventListeners();
    addDelayAnimationImagesSkill();
    startEmailJS();
    checkFormValidity();

    contactForm.addEventListener('input', checkFormValidity);
    contactForm.addEventListener('submit', async function(event) {
        const sendingStatus = document.createElement('p');
        sendingStatus.classList.add('yellow-gradient-text', 'm-0');
        sendingStatus.innerText = 'Sending...';
        contactForm.append(sendingStatus);

        await sendEmail(event, sendingStatus);

        setTimeout(() => {
            sendingStatus.remove();
        }, 4000);
    });
}

init();