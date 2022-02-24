// fetch our data from the server or file
// assign those data to our UI (i.e our html )
// add and event that will handle the change of the data 

// variable to hold data 
let data;
let currentTime = 'weekly'

// fetch data 
fetch('./data.json')
    .then(response=> response.json())
    .then((newdata)=>{
        data= newdata
        changer()
    })




const container = document.getElementById("container")
// console.log(container.innerText)
console.log(container.classList)


function changer(){
    // one of the way to do it 
    // title.innerHTML = data[0].title;
    // timeframe.innerHTML = data[0].timeframes.weekly.current + "Hrs";
    // previous.innerHTML = "previous -" + data[0].timeframes.weekly.previous + "Hrs"

    for(let i = 0; i < data.length; i++){
        // create an element and assign to div
        let div = document.createElement('div');
        // set the attribute of the created element for class to the strings 
        div.setAttribute("class", "card " + data[i].title.toLowerCase().replace(' ', '-'))
        // change the inner HTML of the created element 
        div.innerHTML = `
        <div class="card-bottom">
            <div class="title-div">
                <p class="title">${data[i].title}</p>
            </div>
            <div class="current-div">
                <h3 class="timeframe">${data[i].timeframes[currentTime].current}hrs</h3>
                <p class="previous">${prev(currentTime)} - ${data[i].timeframes[currentTime].previous}hrs</p>
            </div>
        </div>`

        // append the created element to the document main element 
        container.appendChild(div)
    }
}

// get the classname of element to add an event 
const calenda = document.querySelectorAll(".calenda")
console.log(calenda)
calenda.forEach((item)=>{
    item.addEventListener('click', ()=>{
        currentTime = item.innerText.toLowerCase()
        const cards= document.querySelectorAll('.card');
        const main = document.getElementById('container');

        cards.forEach(card=>{
            main.removeChild(card)
        })
        changer()
        calenda.forEach(val=>{
            val.classList.remove('active')
        })
        item.classList.add("active")
    })
})



function prev(ct){
    switch (ct){
        case 'daily':
            return "Yesterday";
            break;
        case 'weekly':
            return "Last week";
            break;
        case 'monthly':
            return "Last month"
            break;
        default:
            return "error"
    }
}