//Dashboard POST --- trying to post to the database(console.log for now), output the body of form at the same time on the front end

document.getElementById('addData').addEventListener('submit', addData)

function addData(e){
    e.preventDefault();

    let destination = document.getElementById('destination').value;
    let departure = document.getElementById('departure').value;

    fetch('/dashboard', {
        method:'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({destination:destination, departure:departure})
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
}


//Dashboard GET..that is I posted some datas already with router.post and tried to fetch it back

/*document.getElementById('getData').addEventListener('click', getData);

function getData(){
    fetch('/dashboard')
    .then((res) => res.json())
    .then(data) => {
        let output = '<h2>Ride Requests</h2>';
        data.forEach(function(ride){
            output += `
                <div>
                    <p>${ride.destination}</p>
                    <p>${ride.departure}</p>
                </div>
            `;
        });
        document.getElementById('output').innerHTML = output;
    })
} */