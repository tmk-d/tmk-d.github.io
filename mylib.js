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

    function findIsland(a, b) {
      t(a,b).innerHTML=0;
      p[a][b]=-2;
      for (i of [-1,0,1]) {
        for (j of [-1,0,1]) {
          var x = a + i;
          var y = b + j;
          if (!(i == 0 && j == 0) && 0 <= x && x < n && 0 <= y && y < n){
            if(p[x][y]==0)
              findIsland(x,y);
            else if(p[x][y]!=-1)
              t(x,y).innerHTML=p[x][y];
          }
        }
      }
    }
