function init1(){
	corslink="https://cors.io/?";
	sheetlink="http://gsx2json.com/api?id=1z9hG-qSjrLTNY37crkBgIVt3IpjmVFYrDHeTsFqQHi4";
	x=$.getJSON(corslink+sheetlink, function(data) {});
	points=0;
	count=0;
	succ=0;
	}

function init2(){
	T=x.responseJSON;	
	next();
	}
	
function singlecheck(o, i){
	if (i.value==o.textContent){
		i.style.backgroundColor="--green";
		points++;
		succtmp++;
		}
	else{
		i.style.backgroundColor="#dc3545";
		}
	
	}
	
function check(){
	tytO.textContent=T.columns["tytuł"][num];
	singlecheck(tytO,tytI);
	//T.columns["tytuł"].splice(num,1);
	
	autO.textContent=T.columns["autor"][num];
	singlecheck(autO,autI);
	//T.columns["autor"].splice(num,1);
	
	nurO.textContent=T.columns["nurt"][num];
	singlecheck(nurO,nurI);
	//T.columns["nurt"].splice(num,1);
	
	//T.rows.splice(num,1);

	pkt.textContent=points+"/"+(3*count);
	
	if(succtmp==3)
		succ++;
	suk.textContent=succ+"/"+count;
	
	
	
	
	btn.value="Następny";
	btn.onclick=function(){next()};
	}
function next(){
	//if (T.rows.length==0)
	//	alert("koniec");
	
	num=Math.floor(Math.random()*T.rows.length);
	obr.src=T.columns["link"][num];
	//T.columns["link"].splice(num,1);
	
	tytO.textContent="";
	tytI.style.backgroundColor="";
	tytI.value="";
	
	autO.textContent="";
	autI.style.backgroundColor="";
	autI.value="";
	
	nurO.textContent="";
	nurI.style.backgroundColor="";
	nurI.value="";
	
	btn.value="Sprawdź";
	btn.onclick=function(){check()};
	
	count++;
	ilo.textContent=count;
	
	succtmp=0;
	}
