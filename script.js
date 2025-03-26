const menu = document.getElementById('menu')
const smallScreenNav = document.getElementById('smallScreenNav')

menu.addEventListener('click', () => {
    menu.classList.toggle('active')
    smallScreenNav.classList.toggle('active')
})

const headings = document.querySelectorAll(' #support p, #services p, #about p, #parthner p ')

headings.forEach(heading => {
    heading.addEventListener('click', () => {
        heading.parentElement.classList.toggle('active')
    })
})

// UPDATE NUMBER OF CART IN NAVBAR

function updateCartNumber() {
    const cart = JSON.parse(localStorage.getItem('cart')) || []

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

    document.getElementById('cartNumber').innerHTML = cartCount


}

updateCartNumber()

// FETCH CART ITEMS FROM LOCALSTORAGE

function displayCartItem() {
    const bagCart = document.getElementById('bagCart')
    const cart = JSON.parse(localStorage.getItem('cart')) || []

    bagCart.innerHTML = ''

    if (cart.length === 0) {
        bagCart.innerHTML = '<p>No item in cart</p>'
        return
    }

    cart.forEach((item) => {
        const cartItem = document.createElement('div')
        cartItem.className = 'cart-item'

        cartItem.innerHTML = `
            <div id='bagImg'>
                <img src="${item.image}" />
            </div>
            <div>
                <p class="bagTitle">${item.name}</p>
                <p class="bagSize">Size:- ${item.size}</p>
                <p class="bagPrice">Rs. ${item.price}</p>
                <button class="remove-btn" data-id='${item.id}' data-size='${item.size}' >Remove</button>
            </div>
        `
        bagCart.appendChild(cartItem)

    })

}

function removeItemFromCart(id, size) {
    let cart = JSON.parse(localStorage.getItem('cart')) || []

    cart = cart.filter(item => !(item.id === id && item.size === size))

    localStorage.setItem('cart', JSON.stringify(cart))

    displayCartItem()
    updateCartNumber()
    updateCheckOutButton()

}

const bagCart = document.getElementById('bagCart')

if (bagCart) {

    bagCart.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const id = e.target.getAttribute('data-id')
            const size = e.target.getAttribute('data-size')
            removeItemFromCart(parseInt(id), size)
        }
    })
} else {
    console.log("Error");

}


function toggleFunction() {
    const bagsSideBar = document.getElementById('bags')
    bagsSideBar.classList.toggle('open')
}

document.getElementById('openBag').addEventListener('click', () => {
    toggleFunction()
    displayCartItem()
})

document.getElementById('closeBtn').addEventListener('click', () => {
    toggleFunction()
})


displayCartItem()

function updateCheckOutButton() {

    const checkOutBtn = document.querySelector('#checkoutButton')

    if (checkOutBtn) {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || []
        checkOutBtn.disabled = storedCart.length === 0
    }

}


const checkOutBtn = document.querySelector('#checkoutButton')

if (checkOutBtn) {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || []
    checkOutBtn.disabled = storedCart.length === 0
}


function accountCheck() {

    const checkUser = JSON.parse(localStorage.getItem('user'))
    console.log(checkUser);

    if (!checkUser) {
        return;
    }

    let account = document.querySelector('#account')


    account.innerHTML =
        ` 
        <div class='userDropdown'>
            <button class='userMenu' > ${checkUser.username} <i class="fa-solid fa-angle-down"></i> </button>
            <div class='dropdown-content'>
                <span>${checkUser.username}</span>
                <button id='logout-btn'>Logout</button>
            </div>
        </div>
        `

    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('user')
        accountCheck()
        window.location.reload()
    })

}

accountCheck()

