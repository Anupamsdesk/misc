/*global $*/
function TableService() {
    'use strict';
    var tables = {},clone,tableOptions,destroyAllTables;
    //use clone from underscore.js
    
    /* Table options have been hard-coded here... it might not be neccessary */
    tableOptions = {
        "bLengthChange" : false,
        "bFilter" : false,
        "bSort" : true,
        "bInfo" : false,
        "bAutoWidth" : false,
        "fnDestroy" : true,
        "aaSorting" : [[0, "asc"]],
        "bJQueryUI" : false,
        "fnDrawCallback" : 
        
        /* WARNING: DONT MANIPULATE DOM - skip this part if not absolutely neccessary*/
        function(oSettings) {
            var i, catgValue, priorityValue;
            for ( i = 0; i < oSettings.aoData.length; i+=1) {
                catgValue = oSettings.aoData[i]._aData[1];
                priorityValue = oSettings.aoData[i]._aData[2];
                if (catgValue.toLowerCase() === 'bug') {
                    oSettings.aoData[i].nTr.cells[1].innerHTML = "<span class='badge label-important'>Bug</span>";
                } else if (priorityValue.toLowerCase() === 'critical') {
                    oSettings.aoData[i].nTr.cells[2].innerHTML = "<span class='badge label-important'>Critical</span>";
                } else if (priorityValue.toLowerCase() === 'high') {
                    oSettings.aoData[i].nTr.cells[2].innerHTML = "<span class='badge label-warning'>High</span>";
                }
            }
        }
    }; 
    
    //destroy all tables
    destroyAllTables = function() {
        var keys = Object.keys(tables), key;
        keys.forEach(function(key, index) {
            if (tables[key !== null]) {
                tables[key].fnDestroy();
            }
        });
        tables = {};
    };
    
    //add a new table
    function addTable(tablename, opendata, columns) {
        var i, j, table, arr = [], dataarray = [], createOptions;

        for ( i = 0; i < opendata.length; i+=1) {
            arr = [];
            for ( j = 0; j < columns.length; j += 1) {
                arr.push(opendata[i][columns[j].name]);
            }
            dataarray.push(arr);
        }
        createOptions = clone(tableOptions);
        createOptions.aaData = dataarray;
        createOptions.aoColumns = columns;
        if (tables[tablename]) {
            tables[tablename].fnDestroy();
        }
        //This is not a good way to do it.. but then you have to call dataTable() constructor somewhere.
        table = $('#' + tablename + ' table').dataTable(createOptions);
        tables[tablename] = table;
    }

    return {
        addTable : addTable,
        destroyAllTables : destroyAllTables,
        tables : tables
    };
}
