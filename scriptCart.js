
fetch(`http://localhost:3000/carts/notPurchase`)
    .then(response =>response.json())
    .then(data =>{
        //console.log(data);
        let total = 0;
        console.log(data.trip);
        for(let i=0; i < data.trip.length; i++){
            total +=data.trip[i].price;
            console.log(data.trip[i]);
            const newHoraire= new Date(data.trip[i].date);
            console.log(data.trip[i]._id);
            document.querySelector('#cartList').innerHTML +=`
                <div class="cart">
                <div><p>${data.trip[i].departure} > ${data.trip[i].arrival}</p></div>
                <div><p>${newHoraire.getHours()}:${newHoraire.getMinutes()}</p></div>
                <div><p>${data.trip[i].price}€</p></div>
                <span class="delete" data-id=${data.trip[i]._id}>x</span>
            </div>`
        }
        
        const buttons = document.querySelectorAll('.delete');
        for(let i = 0 ; i< buttons.length ; i++) {
            buttons[i].addEventListener('click', function (){
                const buttonId =this.dataset.id;
                console.log(buttonId);
                fetch(`http://localhost:3000/carts/${buttonId}`,{
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({buttonId})
                })
                .then(response =>response.json())
                .then(data =>{
                    console.log(data);
                }).then(
                    this.parentNode.remove()
                )
            })
        }

        document.querySelector('#total').textContent=`Total : ${total}€`;
})

const buttons = document.querySelectorAll('.delete');
for(let i = 0 ; i< buttons.length ; i++) {
    buttons[i].addEventListener('click', function (){
        const buttonId =this.dataset.id;
        console.log(buttonId);
        fetch(`http://localhost:3000/carts/${buttonId}`,{
        method: 'DELETE',
        })
        .then(response =>response.json())
        .then(data =>{
            console.log(data);
        })
    })
}



document.querySelector('.purchase').addEventListener('click', function (){
    // fetch('http://localhost:3000/carts',{
    //     method: 'DELETE',
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log(data);
    // }).then();
    fetch(`http://localhost:3000/carts/purchase`)
    .then(response =>response.json())
    .then(data =>{
        console.log(data);
        window.location.assign("bookings.html");
    })
});
