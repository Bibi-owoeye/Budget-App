let arrayitem = []

const buttonAction = ()=>{
    let one = document.getElementById('one').value
    let two = Number(document.getElementById('two').value)
    let three = Number(document.getElementById('three').value)
    
   

    let numbers = {
        one, two, three
    }
    arrayitem.push(numbers)
let stringing = JSON.stringify(arrayitem)
    localStorage.setItem('bibi', stringing)

    window.location.href="appear.html"
}
const arise = () =>{
    if(localStorage.bibi){
        arrayitem = JSON.parse(localStorage.getItem('bibi'));
    }
    

    arrayitem.map((bibi, i)=>{
        document.getElementById('display').innerHTML +=`
        <p>${bibi.one}</p>
        <p>${bibi.two}</p>
        <p>${bibi.three}</p>
        `
    })
}

arise()