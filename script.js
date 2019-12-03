var currentTarget;

var allTableDataCells = document.getElementsByTagName("td");

for(var td of allTableDataCells){
    td.addEventListener("click", showForm);
}

function showForm () {
    $('#formContainer').show();
    currentTarget = this;
    document.getElementById('btnSubmit').addEventListener('click', addActivity);
}

function addActivity () {
    //Hiding the form
    $('#formContainer').hide();

    if(checkIfValidInput()){
        var parent = currentTarget.parentElement;
        var cellIndex = currentTarget.cellIndex;
        
        var text = document.getElementById("text").value;
        var desiredRowSpan = document.getElementById("nr").value;
        var desiredColor = document.querySelector('input[name="radioChoise"]:checked').value;
        
        //Setting the values from the form
        currentTarget.textContent = text;
        currentTarget.rowSpan = desiredRowSpan;
        currentTarget.style.backgroundColor = desiredColor;

        
        //Removing superfluous cells
        for(var i = 0; i < (Number(desiredRowSpan)-1); i++){
            parentsSibling = parent.nextElementSibling;
            parentsSibling.deleteCell(cellIndex);
            parent = parentsSibling;
        }
    
        //Removing eventlisteners for adding activitys
        currentTarget.removeEventListener('click', showForm);
        currentTarget.removeEventListener('click', addActivity);
        
        //Adding eventlistener for removing activity
        currentTarget.addEventListener('click', removeActivity);
    }

    
}

function removeActivity () {
    
    //Saving current rowspan for use in loop
    var currentRowspan = this.rowSpan;
    
    //Resetting the cell to be empty
    this.textContent = "";
    this.rowSpan = "1";
    if((this.parentElement.rowIndex % 2) == 0){
        this.style.backgroundColor = "lightgrey";
    }
    else{
        this.style.backgroundColor = "white";
    }

    //Inserting cells where the removal of rowspan left gaps
    var parent = this.parentElement;
    var cellIndex = this.cellIndex;
    for(var i = 0; i < (Number(currentRowspan)-1); i++){
        var parentsSibling = parent.nextElementSibling;
        parentsSibling.insertCell(cellIndex);
        parentsSibling.cells[cellIndex].addEventListener('click', showForm);
        parent = parentsSibling;
    }

    //re-adding eventlistener to the cell to make it clickable for adding new activity.
    this.addEventListener('click', showForm);
}

//This function makes sure there are no collissions between activitys and that the activity doesn't go out of time range in calendar.
function checkIfValidInput () {
    var desiredRowSpan = document.getElementById("nr").value;
    var parent = currentTarget.parentElement;  
    var cellIndex = currentTarget.cellIndex;
    var isValid = true;
    for(var i = 0; i < (Number(desiredRowSpan)-1); i++){
        var parentsSibling = parent.nextElementSibling;
        if(parentsSibling == null){
            isValid = false;
            alert("activity out of range");
            break;
        }
        else if(parentsSibling.cells[cellIndex].textContent != ""){
            isValid = false;
            alert("Not possible to add activity due to collisions");
            break;
        }
        parent = parentsSibling;
    }

    return isValid;
}
