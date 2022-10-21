const table_selector = $('.calendar_table_node');

// the first number is for the row ||| the second is for the collumn \\
let cell_1_1_1 = '01';  //first cell in the first row //in the first collumn //in the first table
let cell_1_2_1 = '02';      
let cell_1_3_1 = '03';          
let cell_1_4_1 = '04';
let cell_1_5_1 = '05';
let cell_1_6_1 = '06';
let cell_1_7_1 = '07';

let cell_2_1_1 = '08';
let cell_2_2_1 = '09';
let cell_2_3_1 = '10';
let cell_2_4_1 = '11';
let cell_2_5_1 = '12';
let cell_2_6_1 = '13';
let cell_2_7_1 = '14';

let cell_3_1_1 = '15';
let cell_3_2_1 = '16';
let cell_3_3_1 = '17';
let cell_3_4_1 = '18';
let cell_3_5_1 = '19';
let cell_3_6_1 = '20';
let cell_3_7_1 = '21';

let cell_4_1_1 = '22';
let cell_4_2_1 = '23';
let cell_4_3_1 = '24';
let cell_4_4_1 = '25';
let cell_4_5_1 = '26';
let cell_4_6_1 = '27';
let cell_4_7_1 = '28';

let cell_5_1_1 = '29';
let cell_5_2_1 = '30';
let cell_5_3_1 = '31';
let cell_5_4_1 = '32';
let cell_5_5_1 = '33';
let cell_5_6_1 = '34';
let cell_5_7_1 = '35';

let cell_6_1_1 = '36';
let cell_6_2_1 = '37';
let cell_6_3_1 = '38';
let cell_6_4_1 = '39';
let cell_6_5_1 = '40';
let cell_6_6_1 = '41';
let cell_6_7_1 = '42';


//each rows dummy data 1
let dummy_row_1  = [cell_1_1_1, cell_1_2_1, cell_1_3_1, cell_1_4_1, cell_1_5_1, cell_1_6_1, cell_1_7_1];
let dummy_row_2  = [cell_2_1_1, cell_2_2_1, cell_2_3_1, cell_2_4_1, cell_2_5_1, cell_2_6_1, cell_2_7_1];
let dummy_row_3  = [cell_3_1_1, cell_3_2_1, cell_3_3_1, cell_3_4_1, cell_3_5_1, cell_3_6_1, cell_3_7_1];
let dummy_row_4  = [cell_4_1_1, cell_4_2_1, cell_4_3_1, cell_4_4_1, cell_4_5_1, cell_4_6_1, cell_4_7_1];
let dummy_row_5  = [cell_5_1_1, cell_5_2_1, cell_5_3_1, cell_5_4_1, cell_5_5_1, cell_5_6_1, cell_5_7_1];
let dummy_row_6  = [cell_6_1_1, cell_6_2_1, cell_6_3_1, cell_6_4_1, cell_6_5_1, cell_6_6_1, cell_6_7_1];


//the full data table
let dummy_data_table = [dummy_row_1, dummy_row_2, dummy_row_3, dummy_row_4, dummy_row_5, dummy_row_6];


function fill_table(data, table) { //runs through each row and collumn, setting each cells innerHTML to the data desired
    let table_dimensions = { //dimensions of the table
        "rows": table.rows.length - 1, //row count
        "collumns": document.querySelectorAll('.calendar_table_node tr th').length //collumn count
    };
    if (table_dimensions.rows != data.length || table_dimensions.collumns != data[0].length) { //runs when the rows and collumns of table and data are inequal
        console.log('could not set data, data and table row counts do not align');
        return; //ends function early
    }
    for (let row_i = 0; row_i < data.length; row_i++) { //runs once for each row and skips the title row
        for (let collumn_i = 0; collumn_i < table.childNodes[1].childNodes[(row_i+1)*2].childNodes.length / 2 - 1; collumn_i++) { //runs once for each collumn within the row
            current_selected_cell = table.childNodes[1].childNodes[(row_i+1)*2].childNodes[collumn_i * 2 + 1]; //sets the selected cell for easy manipulation
            current_selected_cell.innerHTML = data[row_i][collumn_i]; //sets the innerhtml to the data passed
        }
    }
}

function $(a) {
    return document.querySelector(a);
}

fill_table(dummy_data_table, table_selector);




// collasally huge function to set the data for the years in the calendar
const month_day_count_asjkhhujasdbfghsdavbfghasvdghasv = { //this is just labels with syntax highlighitng
    'jan': 31,
    'feb': 28,
    'mar': 30,
    'apr': 30,
    'may': 31,
    'jun': 30,
    'jul': 31,
    'aug': 31,
    'sep': 30,
    'oct': 31,
    'nov': 30,
    'dec': 31
};

const month_day_count = [
    31, 28, 30, 30,
    31, 30, 31, 31,
    30, 31, 30, 31
];

console.log(month_day_count);


function set_calendar_data(year_count) { //starting year 1995 cuz the first was on a monday
    let years = [];
    for (let i = 0; i < year_count; i++) {
        let current_year;






        years.push(current_year);
        console.log(years);
    }


    
}

set_calendar_data(5);