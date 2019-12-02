table.onclick = getInfo;

function getInfo(e)
{
    //alert(e.target.textContent);
    var text = prompt("Insert text");
    e.target.rowSpan = "2";
    e.target.addList.add("");
    e.target.textContent = text;
    
}

