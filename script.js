const menu = document.getElementById('menu')
const smallScreenNav = document.getElementById('smallScreenNav')

menu.addEventListener('click', () => {
    menu.classList.toggle('active')
    smallScreenNav.classList.toggle('active')
})

const headings = document.querySelectorAll(' #support p, #services p, #about p, #parthner p ')

headings.forEach(heading=>{
    heading.addEventListener('click', () => {
        heading.parentElement.classList.toggle('active')
    })
})