
fetch(`http://localhost:3000/carts/`)
    .then(response =>response.json())
    .then(data =>{
        //console.log(data);
        let total = 0;
        for(let i=0; i < data.trip.length; i++){
            total +=data.trip[i].price;
            console.log(data.trip[i]);
            const newHoraire= new Date(data.trip[i].date);
            document.querySelector('#cartList').innerHTML +=`
                <div class="cart">
                <p>${data.trip[i].departure} > ${data.trip[i].arrival} ${newHoraire.getHours()}:${newHoraire.getMinutes()} ${data.trip[i].price}€</p>
                <span class="delete">x</span>
            </div>`
        }
        document.querySelector('#total').textContent=`Total : ${total}€`;

})
document.querySelector('.purchase').addEventListener('click', function (){
    fetch('http://localhost:3000/carts',{
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });
})
