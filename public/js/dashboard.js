//Dashboard GET offers

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



