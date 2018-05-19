function init(){
	link="https://spreadsheets.google.com/feeds/list/1z9hG-qSjrLTNY37crkBgIVt3IpjmVFYrDHeTsFqQHi4/od6/public/values?alt=json";
	$.getJSON(link, function(data) {
		T=gsx2json(data);
		btn.disabled=false;
		$("table")[0].appendChild(maketable())
		});
	points=0;
	count=0;
	succ=0;
	}

function obj2td(obj){
	var td = document.createElement("td");
	td.innerHTML=obj;
	return td;
	}

function maketable(){
	var frag = document.createDocumentFragment();
	for(i in T){
		var tr = document.createElement("tr");
		tr.appendChild(obj2td(T[i]["tytuł"]));
		tr.appendChild(obj2td(T[i]["autor"]));
		tr.appendChild(obj2td(T[i]["nurt"]));
		tr.appendChild(obj2td(
			'<a href="'+T[i].link+'">Link</a>'
		));
		frag.appendChild(tr);
		}
	var tb = document.createElement("tbody");
	tb.appendChild(frag);
	return tb;
	}
	
function gsx2json(gsdata){
	gsdata=gsdata.feed.entry;
	var table=[];
	for (i in gsdata){
		var row={};
		row["tytuł"]=gsdata[i].gsx$tytuł.$t;
		row["autor"]=gsdata[i].gsx$autor.$t;
		row["nurt"]=gsdata[i].gsx$nurt.$t;
		row["link"]=gsdata[i].gsx$link.$t;
		table[i]=row;
		}
	return table;
	}


function singlecheck(o, i){
	if (i.value==o.textContent){
		i.style.backgroundColor="#28a745";
		points++;
		succtmp++;
		}
	else{
		i.style.backgroundColor="#dc3545";
		}
	
	}
	
function check(){
	tytO.textContent=T[num]["tytuł"];
	singlecheck(tytO,tytI);
	//T.columns["tytuł"].splice(num,1);
	
	autO.textContent=T[num]["autor"];
	singlecheck(autO,autI);
	//T.columns["autor"].splice(num,1);
	
	nurO.textContent=T[num]["nurt"];
	singlecheck(nurO,nurI);
	//T.columns["nurt"].splice(num,1);
	
	pkt.textContent=points+"/"+(3*count);
	
	if(succtmp==3)
		succ++;
	suk.textContent=succ+"/"+count;
	
	
	
	
	btn.value="Następny";
	btn.onclick=function(){next()};
	}
function next(){
	//if (T.length==0)
	//	alert("koniec");
	
	num=Math.floor(Math.random()*T.length);
	obr.src=T[num]["link"];
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
