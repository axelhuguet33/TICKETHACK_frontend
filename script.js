document.querySelector('#search').addEventListener('click', function (){
    const departureName = document.querySelector('#departure').value; 
    const arrivalName = document.querySelector('#arrival').value;
    const dateTrip = document.querySelector('#calendar').value;
    console.log(departureName);
    console.log(arrivalName);
    console.log(dateTrip);
    // fetch('http://localhost:3000/trips')
    // .then(response =>response.json())
    // .then(trips =>{

    // })
})