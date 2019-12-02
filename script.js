table.onclick = getInfo;

function getInfo(e)
{
    if (e.target.tagName == "TD"){
        var text = prompt("Insert text");
        var hours = prompt("Insert hours");
        
        e.target.rowSpan = hours;
        e.target.addList.add("");
        e.target.textContent = text;
    }
}