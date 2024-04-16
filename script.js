document.querySelector('#search').addEventListener('click', function (){
    //console.log(document.querySelectorAll('#response')[0]);
    document.querySelector('#response').firstElementChild.remove();
    // for(let i=1; i<document.querySelectorAll('#response').length; i++){
    //     document.querySelectorAll('#response')[i].remove();
    // }



//récupération du départ, de l'arrivée et de la date    
    const departureName = document.querySelector('#departure').value; 
    const arrivalName = document.querySelector('#arrival').value;
    const dateTrip = new Date(document.querySelector('#calendar').value);
    console.log(departureName);

    if(departureName==="" || arrivalName==="" || dateTrip===""){
        document.querySelector('#response').innerHTML += `
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
                    document.querySelector('#response').innerHTML += `
                    <div id='noTripFound'>
                    <img src="images/notfound.png" alt="train">
                    <p>No trip found.</p>
                    </div>`;
                }else{
                    for(let i=0; i < listTrip.length; i++){
                        const newHoraire= new Date(listTrip[i].date);
                        document.querySelector('#response').innerHTML += `
                            <div class="tripsList">
                            <p>${listTrip[i].departure} > ${listTrip[i].arrival} ${newHoraire.getHours()}:${newHoraire.getMinutes()} ${listTrip[i].price}€</p>
                            <button class="book" type="button">Book</button>
                            </div>`
                    }
                }
            })
        }
        console.log(listTrip);
        for(let i=0; i < listTrip.length; i++){
            const newHoraire= new Date(listTrip[i].date);
            document.querySelector('#response').innerHTML += `
                <div class="tripsList">
                <p>${listTrip[i].departure} > ${listTrip[i].arrival} ${newHoraire.getHours()}:${newHoraire.getMinutes()} ${listTrip[i].price}€</p>
                <button class="book" type="button">Book</button>
                </div>`
        }

    })


