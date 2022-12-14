const table_selector = $('.calendar_table_node');

function fill_table(data, table) { //runs through each row and collumn, setting each cells innerHTML to the data desired
    data = data[selected_year][selected_month];

    let date = new Date();                  //date variable
    let today = date.getDate();             //get the date number in the month
    let month = date.getMonth();            //get the month
    let year = date.getFullYear() - 1995;   //get the year (in code the real year is set later)

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
            if (current_selected_cell.innerHTML == today && selected_month == month && selected_year == year) { //when the selected cell is the current day
                current_selected_cell.style.backgroundColor = 'var(--calendar-secondary)' //highlights the cell
            } else {
                current_selected_cell.style.backgroundColor = ''; //unhighlights the cell when its no longer the same
            }
        }
    }

    $('.date_label').innerHTML = `${selected_year + 1995}, ${get_month_from_num(selected_month)}`; //sets the date label
}

function $(a) { //$ function query selector
    return document.querySelector(a);
}




// gets the data for which days are what date
//need to add function for leap years, and the 400 year gregorian rule
function get_calendar_data(year_count) { //starting year 1995 cuz the first was on a monday
    const month_day_count = [
        31, 28, 31, 30,
        31, 30, 31, 31,
        30, 31, 30, 31
    ];                                                                          //data on the amount of days in a month
    let years = [];                                                             //every year generated
    let leap_index = 2;                                                         //sets the leap index according to the first year (1995) hardcoded
    let leap_day = 0;                                                           //initializes the leap day to 0
    let stop_index = 0;                                                         //index on what place the code stopped counting up
    
    for (let i = 0; i < year_count; i++) { //once for each year
        let current_year = [];                                                  //the year that the loop generates
        leap_index++;                                                           //increments the leap index up one
        
        for (let month_i = 0; month_i < 12; month_i++) { //once for each month
            if (isDivisible(leap_index, 4) && month_i==1) {
                leap_day = 1;   //leap day
            } else { 
                leap_day = 0;   //no leap day
            }
            current_month = [];                                                 //the month that each loop generates
            let running = true;                                                 //helps to fill in the 0's after it finishes
            let day_date_i = 0 - stop_index;                                    //resets the date count and subtracts the stop_index so the dates are correct
            for (let week_i = 0; week_i < 6; week_i++) {                        //once for each week in month 
                let current_week = [];                                          //current week this generates
                for (let day_i = 0; day_i < 7; day_i++) { //once for each day in week
                    if (day_date_i < month_day_count[month_i] + leap_day && running) {     //increments the date filling in each day, and stops when it reaches the amount of days in that specific month according to the constant data
                        day_date_i++;
                    } else if (running) {                                       //runs when it stops counting the date up
                        day_date_i = 0;                                         //resets the date counter
                        running = false;                                        //stops it from counting up
                        stop_index = day_i;                                     //sets the stop_index to the specific location that the code stopped
                    }
                    current_week.push(day_date_i);                              //pushes the day to the week
                }
                // console.log('week end')
                current_month.push(current_week);                               //pushes the week to the month
            }
            // console.log('month end');
            current_year.push(current_month);                                   //pushes the month to the year
        }
        // console.log(current_year);
        years.push(current_year);                                               //pushes the year to years array
    }
    return years;
}

let selected_month = 0; //jan
let selected_year = 0; //1995

function change_month(e) {
    if (selected_year == 0 && isNegative(e) && isNegative(selected_month-1)) return;    //prevents from going bellow 0
    if (e==-12 && selected_year == 0) {                                                 //prevents from going bellow 0
        selected_month = 0;
        fill_table(calendar_data, table_selector);
        return;
    }
    if (selected_year == 2500 - 1995 && e==12 || selected_year == 2500 - 1995 && selected_month>10 && e==1) return; //prevents from going above 2500

    if(e==1)  selected_month++; //increments up one month
    if(e==-1) selected_month--; //increments down one month
    if(e==12) selected_year++;  //increments up one year
    if(e==-12)selected_year--;  //increments down one year

    if (selected_month > 11) {  //overflow when it goes past december
        selected_year++;        //increments up one year
        selected_month = selected_month -12; //sets the month to according month
    }

    if (selected_month < 0) {   //overflow when it goes below january
        selected_year--;        //increments down one year
        selected_month = 12 + selected_month; //sets the month to the according month
    }
    
    

    console.log(`${selected_year}:${selected_month}`)
    fill_table(calendar_data, table_selector);
}

let calendar_data;
window.onload = (e) => {
    let date = new Date(); //date variable
    
    selected_year = date.getFullYear() - 1995;  //sets the year
    selected_month = date.getMonth();           //sets the month
    
    calendar_data = get_calendar_data(2500 - 1994);     //sets data for the calendar to set to
    fill_table(calendar_data, table_selector);          //fills the table
}

function isNegative(num) {
    if (num >= 0) return false; //positive
    if (num < 0)  return true;  //negative
}

function isDivisible(num, by) {
    const a = `${(num / by)}`.split('.');   //splits a into an array on the .
    if (a.length == 1) {//when array length is 1
        if (isNaN(a[0])) { //if a is NaN
            console.log('variable is the wrong type')
            return false;                   //if something is broken
        }
        return true;                        //num is divisible by by
    } else if (a.length == 2) {//if array length is 2
        return false;                       //num is not divisible by by
    }
}

function get_month_from_num(num) { //if given the month value it returns the month
    const months = [ //constant data on the months
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]
    return `${months[num]}`; //returns the month
}