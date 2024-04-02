const itemName = document.getElementById("item-name");
const itemBP = document.getElementById("item-bp");
const itemWP = document.getElementById("item-wp");
const itemRP = document.getElementById("item-rp");
const localSave = {
    saveData: () => {localStorage.setItem("listData", document.getElementById("col-container").innerHTML)},
    loadData: () => {document.getElementById("col-container").innerHTML = localStorage.getItem("listData")},
    resetData: () => {window.localStorage.clear()},
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
    e.target.id == "delete-button" && e.target.parentNode.parentNode.parentNode.remove();
    localSave.saveData();
});

localSave.loadData();