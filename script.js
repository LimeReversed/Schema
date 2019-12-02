table.onclick = getInfo;


function getInfo(e)
{
    if (e.target.tagName == "TD"){
        var text = document.getElementById("text").value;
        var hours = document.getElementById("nr").value;
        //var color = prompt("Insert color : Red, blue, green");
        
        var minTable = document.getElementById('table');
        var myRowIndex = e.target.parentElement.rowIndex + 1;
        var myCellIndex = e.target.cellIndex;

        for(var i = myRowIndex; i < Number(myRowIndex) + Number(hours-1); i++){
            var a = document.getElementById(i.toString());
            a.deleteCell(myCellIndex);
        }

        e.target.style.backgroundColor = color;
        e.target.rowSpan = hours;
        e.target.textContent = text;
    }
}
$(document).ready(()=>{
    $('td').on('click', ()=>{
        $('#formContainer').show();
    });

    $('#btnSubmit').on('click', ()=>{
        $('#formContainer').hide();

    });
});
