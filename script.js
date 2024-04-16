document.querySelector('#search').addEventListener('click', function (){
    const departureName = document.querySelector('#departure').value; 
    const arrivalName = document.querySelector('#arrival').value;
    const dateTrip = new Date(document.querySelector('#calendar').value);
    console.log(departureName);
    console.log(arrivalName);
    console.log(dateTrip);
    const newDay = dateTrip.getDate();
    const newMonth = dateTrip.getMonth()+ 1;
    const newYear = dateTrip.getFullYear();

    console.log(newDay);
    console.log(newMonth);
    console.log(newYear);
    fetch(`http://localhost:3000/trips/${departureName}/${arrivalName}`)
    .then(response =>response.json())
    .then(data =>{
        const listTrip = [];
        //const dateData = new Date(data.trip[0].date);
        // console.log(dateData.getFullYear());
        // console.log(dateData.getMonth()+1);
        // console.log(dateData.getDate());
        //console.log(data.trip[0].date.getFullYear());
        for (let i=0; i<data.trip.length; i++){
            const dateData = new Date(data.trip[i].date);
            if(dateData.getUTCFullYear()===newYear && (dateData.getUTCMonth()+1)===newMonth && dateData.getUTCDate()===newDay){
                listTrip.push(data.trip[i]);
            }
        
        }
        console.log(listTrip);
    })
})