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

function maketr(a, b, tab){
	var tr = document.createElement("tr");
	
	var td = document.createElement("td");
	td.innerHTML=a;
	tr.appendChild(td);
	
	td = document.createElement("td");
	td.innerHTML=b;
	tr.appendChild(td);
	
	tab.appendChild(tr);
}

function check(){
	succtmp=0;
	
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
	
	
	if(succtmp==3){
		succ++;
		maketr(T[num]["tytuł"],T[num]["autor"],wowT);
	}
	else if(succtmp==0)
		maketr(T[num]["tytuł"],T[num]["autor"],wtfT);
	else
		maketr(T[num]["tytuł"],T[num]["autor"],mehT);
	suk.textContent=succ+"/"+count;
	
	wowP.innerHTML=(100*wowT.children.length/count).toFixed(2)+"%";
	wowP.style.width=wowP.innerHTML;
	mehP.innerHTML=(100*mehT.children.length/count).toFixed(2)+"%";
	mehP.style.width=mehP.innerHTML;
	wtfP.innerHTML=(100*wtfT.children.length/count).toFixed(2)+"%";
	wtfP.style.width=wtfP.innerHTML;


	
	
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
	}
