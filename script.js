document.querySelector('#search').addEventListener('click', function (){
    
    document.querySelector('#cssResponse').innerHTML = ``;
    // fetch('http://localhost:3000/carts',{
    //     method: 'DELETE',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({})

    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log(data);
    // });


//récupération du départ, de l'arrivée et de la date    
    const departureName = document.querySelector('#departure').value; 
    const arrivalName = document.querySelector('#arrival').value;
    const dateTrip = new Date(document.querySelector('#calendar').value);

    if(departureName==="" || arrivalName==="" || dateTrip===""){
        document.querySelector('#cssResponse').innerHTML = `
            <div id='noTripFound'>
            <img src="images/notfound.png" alt="train">
            <p>No trip found.</p>
            </div>`;

    }else {
//récupération de l'année du mois et du jour de date récupéré
            const newDay = dateTrip.getDate();
            const newMonth = dateTrip.getMonth()+ 1;
            const newYear = dateTrip.getFullYear();

            fetch(`http://localhost:3000/trips/${departureName}/${arrivalName}`)
            .then(response =>response.json())
            .then(data =>{

                const listTrip = [];
                for (let i=0; i<data.trip.length; i++){
                    const dateData = new Date(data.trip[i].date);
                    if(dateData.getUTCFullYear()===newYear && (dateData.getUTCMonth()+1)===newMonth && dateData.getUTCDate()===newDay){
                        listTrip.push(data.trip[i]);
                    }
                }
                console.log(listTrip);
                if(listTrip.length===0){
                    document.querySelector('#cssResponse').innerHTML += `
                    <div id='noTripFound'>
                    <img src="images/notfound.png" alt="train">
                    <p>No trip found.</p>
                    </div>`;
                }else{
                    
                    for(let i=0; i < listTrip.length; i++){
                        console.log(listTrip[i])
                        const newHoraire= new Date(listTrip[i].date);
                        document.querySelector('#cssResponse').innerHTML += `
                            <div class="tripsList">
                            <p>${listTrip[i].departure} > ${listTrip[i].arrival}   ${newHoraire.getHours()}:${newHoraire.getMinutes()}   ${listTrip[i].price}€</p>
                            <button class="book" data-id=${listTrip[i]._id} type="button">Book</button>
                            </div>`
                        
                    }
                }

                const buttons = document.querySelectorAll('.book')
                for(let i = 0 ; i< buttons.length ; i++) {
                    buttons[i].addEventListener('click', function (){
                        const tripId =this.dataset.id;
                        //let tripToCart;
                        console.log(tripId);
                        fetch(`http://localhost:3000/trips/${tripId}`)
                        .then(response =>response.json())
                        .then(data =>{
                            //tripToCart = data.trip;
                            console.log(data.trip);
                            fetch('http://localhost:3000/carts', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(data.trip)
        
                            })
                            .then(response => response.json())
                            .then(data => {
                                console.log(data);
                            });

                        })
                    })
                }
            })
       
        }
    })


