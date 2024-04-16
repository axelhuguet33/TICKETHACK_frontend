document.querySelector('#search').addEventListener('click', function (){
    const departureName = document.querySelector('#departure').value; 
    const arrivalName = document.querySelector('#arrival').value;
    const dateTrip = new Date(document.querySelector('#calendar').value);
    console.log(departureName);
    console.log(arrivalName);
    console.log(dateTrip);
    

    const newDay= dateTrip.getDate();
    fetch(`http://localhost:3000/trips/${departureName}/${arrivalName}/${dateTrip}`)
    .then(response =>response.json())
    .then(data =>{
        console.log(data);
    })
})