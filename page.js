allItems = []
let newIndex = 0
let allInputs = {}
let mainBudget = 0
let realBudget = 0

let activeEditingData = {}

const loading = () => {
    if (localStorage.bibi) {



    }
}
const addBudget = () => {
    budget.innerHTML = `NGN ${document.getElementById('inputBudget').value}`
    if (!inputBudget.value) {
        document.getElementById('showMe').innerHTML = ''
        noBudgetYet.style.display = 'block'
    } else {
        mainBudget = document.getElementById('inputBudget').value
        showBudget.innerHTML = `NGN ${mainBudget}`
        inputBudget.value = ""
    }
    setTimeout(() => {
        noBudgetYet.style.display = 'none'
    }, 3000)
}
const submitItem = () => {
    // let text = document.getElementById("moreThanBudget").innerHTML;
    // document.getElementById("moreThanBudget").innerHTML =
    //     text.replace(/amount/i, "relationship");
    if (!inputOne.value || !inputTwo.value || !inputThree.value) {
        noItemYet.style.display = 'block'
    } else {

        allInputs = {
            inputOnes: document.getElementById('inputOne').value,
            inputTwos: parseFloat(inputTwo.value),
            inputThrees: parseFloat(inputThree.value),
            inputFour: (parseFloat(inputTwo.value * inputThree.value))
        }
        // console.log(mainBudget)
        // console.log(allInputs)

        allItems.push(allInputs)
        let stringing = JSON.stringify(allItems)
        localStorage.setItem('bibi', stringing)
        addorRemove()
    }
    setTimeout(() => {
        noItemYet.style.display = 'none'
    }, 3000)
}
const addorRemove = () => {
    if (localStorage.bibi) {
        allItems = JSON.parse(localStorage.getItem('bibi'));

    }
    if (allInputs.inputFour > mainBudget) {
        moreThanBudget.style.display = 'block'
    }
    else if (allInputs.inputFour <= mainBudget) {
        // console.log('yes');
        mainBudget = mainBudget - allInputs.inputFour
        showBudget.innerHTML = "NGN " + mainBudget
        moreThanBudget.style.display = 'none'


        displayItems()
    }
    else {
        moreThanBudget.style.display = 'none'

        displayItems()
    }
    setTimeout(() => {
        moreThanBudget.style.display = 'none'
    }, 3000)

}
const displayItems = () => {

    let tableHTML = '<table class="text-center">';
    tableHTML += '<tr>';
    tableHTML += `<th > S/N </th>`
    tableHTML += `<th> Item(s) </th>`
    tableHTML += '<th>' + 'Price' + '</th>'
    tableHTML += '<th>' + 'Quantity' + '</th>'
    tableHTML += '<th>' + 'Total Price' + '</th>'
    tableHTML += '<th>' + 'Action' + '</th>'
    tableHTML += '</tr>';

    allItems.map((allInputs, index) => {
        tableHTML += '<tr>';
        tableHTML += '<td>' + `<small> ${index + 1}</small>` + '</td>';
        tableHTML += '<td style= "width: 150px;">' + `<small>${allInputs.inputOnes} </small>` + '</td>';
        tableHTML += '<td style= "width: 120px;">' + `<small> ${allInputs.inputTwos} </small>` + '</td>';
        tableHTML += '<td>' + `<small> ${allInputs.inputThrees} </small>` + '</td>';
        tableHTML += '<td style= "width: 150px;">' + `<small> ${allInputs.inputFour} </small>` + '</td>';
        tableHTML += '<td>' + `<div class=''>
        <button class='btn  mx-auto btn-warning shadow  fs-6' data-bs-toggle="modal" data-bs-target="#exampleModal1 "onclick="edit(${index})">Edit</button>
        <button class='btn    mx-auto btn-danger  shadow fs-6' onclick='deleteTodo(${index})'>Delete</button>
        </div>` + '</td>';
        // tableHTML += '<td>'+`<small> ${cart[i]} </small>` + '</td>' ;    
        // tableHTML += '<td>'+`<small> ${cart[i]} </small>` + '</td>' ; 
        tableHTML += '</tr>';
    })




    tableHTML += '</table>';
    // console.log(tableHTML);
    document.getElementById('showMe').innerHTML = tableHTML;
    inputOne.value = ""
    inputTwo.value = ""
    inputThree.value = ""


}
const deleteTodo = (i) => {
    // showBudget.innerHTML = ""
    // console.log(allItems)
    // console.log(i)
    let confirmation = confirm('Are you sure you want to delete?')
    allItems.forEach((totalPrice, index) => {
        if (confirmation && index === i) {

            console.log(allItems)
            mainBudget = mainBudget + totalPrice.inputFour
            showBudget.innerHTML = "NGN " + mainBudget

            allItems.splice(i, 1)
        };
    })
    displayItems()
}


const edit = (i) => {

    allItems.forEach((data, index) => {
        if (index === i) {
            activeEditingData = data

        };
    })
}

const editAnyItem = () => {
    if (inputNew1.value == "" || inputNew2.value == "" || inputNew3.value == "") {
        alert('stop jhur')
    } else {
        let newModal = {
            inputOnes: document.getElementById('inputNew1').value,
            inputTwos: parseFloat(document.getElementById('inputNew2').value),
            inputThrees: parseFloat(document.getElementById('inputNew3').value),
            inputFour: (parseFloat(inputNew2.value * inputNew3.value))
        }

        mainBudget = (mainBudget + activeEditingData.inputFour) - newModal.inputFour

        allItems.splice(newIndex, 1, newModal)
        // console.log('yes');
        document.getElementById('inputNew1').value = ''
        document.getElementById('inputNew2').value = ''
        document.getElementById('inputNew3').value = ''

        showBudget.innerHTML = "NGN " + mainBudget
        displayItems()
    }
}


const deleteAll = () => {

    allItems.forEach((data, index) => {
        // console.log(allItems.length);
        if ((allItems.length - 1) === index) {
            mainBudget = (mainBudget + data.inputFour)
            console.log("last data")

            showBudget.innerHTML = "NGN " + mainBudget

            allItems = []
            newIndex = 0
            allInputs = {}
            activeEditingData = {}

            displayItems()

        }
        else {
            mainBudget = (mainBudget + data.inputFour)
        }
    })




}
