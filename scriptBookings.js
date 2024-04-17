    fetch('http://localhost:3000/carts',{
    })
    .then(response => response.json())
    .then(data => {
        const dateActuelle = new Date();
        console.log(dateActuelle);
        for(let i = 0; i < data.trip.length; i++){
            console.log(data.trip[i]);
            const newHoraire= new Date(data.trip[i].date);
             let newTime =Math.round((newHoraire - dateActuelle)/3600000);
             console.log(newTime);
            //console.log(newHoraire.parse());
            document.querySelector('#bookingList').innerHTML +=`
            <div class="booking">
                <div><p>${data.trip[i].departure} > ${data.trip[i].arrival} </p></div>
                <div><p>${newHoraire.getHours()}:${newHoraire.getMinutes()} </p></div>
                <div><p>${data.trip[i].price}€</p></div>
            <span class="departureIn"> Departure in ${newTime} hours</span>
            </div>`;
        }

    });
    // fetch('http://localhost:3000/carts',{
    //     method: 'DELETE',
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log(data);
    // });
