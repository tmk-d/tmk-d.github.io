function printarray(arr){
    var out="";
    for(let i=0; i<arr.length; i++){
        for(let j=0; j<arr[i].length; j++){
            out+=arr[i][j]+"\t";
        }
        out+="\n";
    }
    return out;
    }


function multArray(rows, cols, def){
    A = new Array(rows);
    for(i=0; i<rows; i++){
        A[i] = new Array(cols);
        A[i].fill(def);
        }
    return A;
    }