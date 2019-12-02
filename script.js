table.onclick = getInfo;

function getInfo(e)
{
    //alert(e.target.textContent);
    var text = prompt("Insert text");
    e.target.textContent = text;
}