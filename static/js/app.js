
/**
 * Generates a table body as per the data provided
 * Uses D3js 
 * 
 * @param {Array} data - data to populate the table
 */
function tabulate(data) {
	// DOM table that will be used to populate data with D3js
	var table = d3.select('table')

	// get the table body to append data rows
	var	tbody = d3.select('tbody');

	// table columns that should appear in head of Table
    var columns = [ 'datetime', 'city', 'state', 'country', 'shape', 'durationMinutes', 'comments'];

	// removing all the old data rows to make sure that every render has new rows
    tbody.node().innerHTML = ""

	// create a row for each object in the data
	var rows = tbody.selectAll('tr')
	  .data(data)
	  .enter()
	  .append('tr');

	// create a cell in each row for each column
	var cells = rows.selectAll('td')
	  .data(function (row) {
	    return columns.map(function (column) {
	      return {column: column, value: row[column]};
	    });
	  })
	  .enter()
	  .append('td')
	    .text(function (d) { return d.value; });

  // return the table instance
  return table;
}

/**
 * Generates filtered data by the help of date as provided
 * Uses D3js
 * 
 * @param {Array} data - data to filter the table 
 */
function filterTable(data){

	// getting the value of date field to filter data according to date
    let date = d3.select('#datetime').property('value');
 
	// filtering data with respect to date
    let filteredData = data.filter(row => row.datetime === date.trim());

    if(date.length > 0){
        tabulate(filteredData); // render table with filtered data
    } else {
        tabulate(data); // render table with all data
    }
}


/**
 * Reset the table to default state with default data
 * Uses D3js 
 * 
 * @param {Array} data - data to populate the table
 */
function resetTable(data){

    d3.select('#datetime').value = "";
    tabulate(data);
}

(function(){

    // from data.js
    var tableData = data;

    // Add an event listener to the filter button created in the html part
    d3.select("#filter-btn").on("click", function(){
        filterTable(tableData);
    });
	
    // Add an event listener to the reset button created in the html part
    d3.select("#reset-btn").on("click", function(){
        resetTable(tableData);
    });
    
// render the tables
tabulate(data); 

})(window);

