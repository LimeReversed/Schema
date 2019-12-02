table.onclick = getInfo;

function getInfo(e)
{
    //alert(e.target.textContent);
    var text = prompt("Insert text");
    var hours = prompt("Insert hours");
    
    e.target.rowSpan = hours;
    e.target.addList.add("");
    e.target.textContent = text;
    
}