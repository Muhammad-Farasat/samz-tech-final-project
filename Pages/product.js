fetch('../product.json').then(response => response.json()).then(products => {

    const urlParams = new URLSearchParams(window.location.search)
    const productId = urlParams.get('id')


    const product = products.find(p => p.id == productId)

    if (product) {
        document.getElementById('product-name').innerHTML = product.name
        document.getElementById('product-price').innerHTML = product.price
        document.getElementById('product-description').innerHTML = product.description
        
        const mainImage = document.getElementById('main-image')
        mainImage.src = product.images[0]

        const thumbnailsContainer = document.getElementById('thumbnails')
        product.images.forEach(image => {
            const thumbnail = document.createElement('img')
            thumbnail.src = image;
            thumbnail.addEventListener('click', ()=>{
                mainImage.src = image;
            })
            thumbnailsContainer.appendChild(thumbnail)
        })

        const sizeSelect = document.getElementById('size-button')
        product.sizes.forEach(size => {
            const button = document.createElement('button');
            button.innerHTML = size;
            button.classList.add('size-btn')
            button.addEventListener('click', ()=> {
                document.querySelectorAll('.size-btn').forEach(btn =>{
                    btn.classList.remove('selected')
                })

                button.classList.add('selected')
            })
            sizeSelect.appendChild(button);
        }); 

        document.getElementById('add-to-cart').addEventListener('click', () => {
            const selectedSize = document.getElementById('size').value

            const cartItem = {
                id: product.id,
                name: product.name,
                price: product.price,
                size: selectedSize,
                quantity: 1,
                image: product.images[0]
            }

            addToCart(cartItem)
            window.location.reload()
            alert("Added to Cart..!")

        })


    }else{
        document.getElementById('product').innerHTML = "<h2> Product not found...!</h2>"
    }

}).catch(error => console.error('Error while bring product', error))



function addToCart(item){
    let cart = JSON.parse(localStorage.getItem('cart')) || []

    const existingItem = cart.find(cartItem => cartItem.id === item.id && cartItem.size === item.size)

    if (existingItem) {
        existingItem.quantity += 1
    }
    else{
        cart.push(item)
    }

    localStorage.setItem('cart', JSON.stringify(cart))

}

