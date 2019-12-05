
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
        var desiredColor = document.querySelector('input[name="radioChoice"]:checked').value;
        
        addDiv(text, desiredColor, desiredRowSpan);
        
       
        //Removing eventlisteners for adding activitys
        currentTarget.removeEventListener('click', showForm);
        currentTarget.removeEventListener('click', addActivity);
        
        //Adding eventlistener for removing activity
        currentTarget.addEventListener('click', removeActivity);
    }

    
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

function addDiv(text, choosenColor, hours){

    var num = document.getElementById('table').rows[0].cells[0].offsetHeight;

    var a = Number(num*hours)+"px".toString();
    var myDiv = document.getElementsByClassName('drag')[0];
    myDiv.innerHTML = text;
    myDiv.style.backgroundColor = choosenColor;
    myDiv.style.height = a;
    myDiv.style.width = "13%";
    myDiv.class ="drag";
    document.body.appendChild(myDiv);

}
$(document).ready(()=>{

    $(function(){
       
        $('.drag').draggable();
        
        $('#drop').droppable();
    
        $('#delete').droppable({
            over: function(event, ui) {
                ui.draggable.remove();
            }
        });
    
    });
    $('#btnSubmit').on('click', () => {
        $('.drag').next();

    });
});