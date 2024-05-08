window.onload = () => {
    let input = parseInt(prompt(`Please input an int value`, `(ex. 2, 4, 6)`));

    if(input<2 || isNaN(input)){
        alert(`Invalid input. Ensure the input is an integer greater than 2.`);
        location.reload();
    }
    let x1 = 0;
    let y1 = 0;
    let x2 = input-1;
    let y2 = input-1;
    let finished = true;
    const body = document.body;
    body.innerHTML += `<header><h1>Standard Table</h1></header>`;
    createTable(input, `table`);
    body.innerHTML += `<header><h1>Flipped Table</h1></header>`;
    createTable(input, `flippedTable`);
    const flippedTable = document.getElementById(`flippedTable`);
    const normalTable = document.getElementById(`table`);

    while(finished){

        if((x1==input-1 && x2==0 && y1==y2-1) || (x1==x2 && y1==y2)){
            finished = false;
        }

        if(x1!=y2 && x2!=y1){
            swap(x1,y1,x2,y2);
        }
        else{
            normalTable.rows[y1].cells[x1].style.backgroundColor = `yellow`;
            normalTable.rows[y2].cells[x2].style.backgroundColor = `yellow`;
            flippedTable.rows[y1].cells[x1].style.backgroundColor = `yellow`;
            flippedTable.rows[y2].cells[x2].style.backgroundColor = `yellow`;
        }

        if(x1!=input-1){
            x1++;
        }
        else{
            x1=0;
            y1++;
        }
        if(x2-1!= -1){
            x2--;
        }
        else{
            x2=input-1;
            y2--;
        }
    }
};

function createTable(input, id){
    const body = document.body;
    let counter = 1;

    let tableHTML = `<table id = `+id+`>`;
    for(let i=0; i<input; i++){
        tableHTML += `<tr>`;
        for(let x =0; x<input; x++){
            tableHTML += `<td>` +counter+`</td>`;
            counter++;
        }
        tableHTML +=`</tr>`;
    }
    tableHTML+=`</table>`;

    body.innerHTML += tableHTML;

}

function swap(x,y,x2,y2){
    const table = document.getElementById(`flippedTable`);

    const cell1 = table.rows[y].cells[x];
    const cell2 = table.rows[y2].cells[x2];

    const temp = cell1.innerHTML;

    cell1.innerHTML = cell2.innerHTML;
    cell2.innerHTML = temp;
}
