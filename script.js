const itemName = document.getElementById("item-name");
const itemBP = document.getElementById("item-bp");
const itemWP = document.getElementById("item-wp");
const itemRP = document.getElementById("item-rp");
const localSave = {
    saveData: () => {localStorage.setItem("listData", document.getElementById("col-container").innerHTML)},
    loadData: () => {document.getElementById("col-container").innerHTML = localStorage.getItem("listData")},
    resetData: () => {window.localStorage.clear()},
}

function searchItem(){
    var searchInput = document.getElementById("search-input"); //search input box
    var filter = searchInput.value.toUpperCase();   //Converting the inputed value on textbox to uppercase
    let list = document.getElementById("col-container").children;    //access all the "tr" elements 

    for(let i = 0; i < list.length; i++){   //loop to all "tr" elements
        searchNameOfItem = list[i].getElementsByTagName("td")[0]; // access the index 1(item-name) of "td" on the "tr" elements and store it to a new variable
        if(searchNameOfItem.innerHTML.toUpperCase().indexOf(filter) > -1){ //converts the innerhtml of td[1] to uppercase and begin search using indexOf method passing "filter" and starts to index 0
            list[i].classList.remove("hidden")
        } else {
            list[i].classList.add("hidden")
        }
    }
}

function addToList(){
    let a = document.createElement("tr");
    a.innerHTML = ` <td>${itemName.value}</td>
                    <td>${itemBP.value}</td>
                    <td>${itemWP.value}</td>
                    <td>${itemRP.value}</td>
                    <td>
                        <div id="list-button-container" class="flex flex-row gap-x-2 justify-end">
                            <button id="edit-button" class="btn btn-warning btn-sm rounded-md">Edit</button>
                            <button id="delete-button" class="btn btn-error btn-sm rounded-md">Delete</button>
                        </div>
                    </td>`;

    document.getElementById("col-container").appendChild(a);
    localSave.saveData();
}

function editItem(event){
    document.getElementById("my_modal_3").showModal();
    document.getElementById("add-new-item").classList.add("hidden");
    document.getElementById("update-item").classList.remove("hidden");

    itemName.value = event.target.parentNode.parentNode.parentNode.children[0].innerHTML;
    itemBP.value = event.target.parentNode.parentNode.parentNode.children[1].innerHTML;
    itemWP.value = event.target.parentNode.parentNode.parentNode.children[2].innerHTML;
    itemRP.value = event.target.parentNode.parentNode.parentNode.children[3].innerHTML;

    document.getElementById("update-item").onclick = () => {
        if (itemName.value == "" || isNaN(itemBP.value) || isNaN(itemWP.value) || isNaN(itemRP.value)){
            console.log("Invalid input") 
        } else {
            event.target.parentNode.parentNode.parentNode.children[0].innerHTML = itemName.value;
            event.target.parentNode.parentNode.parentNode.children[1].innerHTML = itemBP.value;
            event.target.parentNode.parentNode.parentNode.children[2].innerHTML = itemWP.value;
            event.target.parentNode.parentNode.parentNode.children[3].innerHTML = itemRP.value;

            localSave.saveData();
        }
    };
}

function clearInput(){
    document.getElementById("add-new-item").classList.remove("hidden");
    document.getElementById("update-item").classList.add("hidden");

    itemName.value = "";
    itemBP.value = "";
    itemWP.value = "";
    itemRP.value = "";
}

const addNewItem = document.getElementById("add-new-item").onclick = () =>{
    itemName.value == "" || isNaN(itemBP.value) || isNaN(itemWP.value) || isNaN(itemRP.value) 
    ? console.log("Invalid input") 
    : addToList();

    itemName.value = "";
    itemBP.value = "";
    itemWP.value = "";
    itemRP.value = "";
};

const actionBtn = document.getElementById("col-container").addEventListener("click", (e) => {
    e.target.id == "edit-button" && editItem(e);
    e.target.id == "delete-button" && e.target.parentNode.parentNode.parentNode.remove();
    localSave.saveData();
});

const clearBtn = document.getElementById("clear-button").onclick = () => {
    document.getElementById("clear-modal").showModal();
    document.getElementById("confirm-clear").onclick = () => {
        localSave.resetData();
        window.location.reload();
    }
}

localSave.loadData();