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

function updateCartNumber(){
    const cart = JSON.parse(localStorage.getItem('cart')) || []

    const cartCount = cart.reduce((total, item)=> total + item.quantity, 0)

    document.getElementById('cartNumber').innerHTML = cartCount
    

}

updateCartNumber()


function displayCartItem(){
    const bagCart = document.getElementById('bagCart')
    const cart = JSON.parse(localStorage.getItem('cart')) || []

    bagCart.innerHTML = ''

    if (cart.length === 0) {
        bagCart.innerHTML = '<p>No item in cart</p>'        
        return
    }

    cart.forEach((item)=>{
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

function toggleFunction(){
    const bagsSideBar = document.getElementById('bags')
    bagsSideBar.classList.toggle('open')
}

document.getElementById('openBag').addEventListener('click', ()=>{
    toggleFunction()
    displayCartItem()
})

document.getElementById('closeBtn').addEventListener('click', ()=>{
    toggleFunction()
})





displayCartItem()
