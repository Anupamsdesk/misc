/*global $*/
function TableService() {
    'use strict';
    var tables = {},clone,tableOptions,destroyAllTables;
     clone = function(obj) {
        var copy, attr;
        if (null === obj || "object" !== typeof obj)
            {return obj;}
        copy = obj.constructor();
        for (attr in obj) {
            if (obj.hasOwnProperty(attr)){
                copy[attr] = obj[attr];
            }
        }
        return copy;
    }; 
    tableOptions = {
        "bLengthChange" : false,
        "bFilter" : false,
        "bSort" : true,
        "bInfo" : false,
        "bAutoWidth" : false,
        "fnDestroy" : true,
        "aaSorting" : [[0, "asc"]],
        "bJQueryUI" : false,
        "fnDrawCallback" : function(oSettings) {
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
    destroyAllTables = function() {
        var keys = Object.keys(tables), key;
        keys.forEach(function(key, index) {
            if (tables[key !== null]) {
                tables[key].fnDestroy();
            }
        });
        tables = {};
    };
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
        table = $('#' + tablename + ' table').dataTable(createOptions);
        tables[tablename] = table;
    }

    return {
        addTable : addTable,
        destroyAllTables : destroyAllTables,
        tables : tables
    };
}
