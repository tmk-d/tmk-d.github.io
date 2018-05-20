function init(){
	$('.form-control').attr("disabled",true)
	link="https://spreadsheets.google.com/feeds/list/1z9hG-qSjrLTNY37crkBgIVt3IpjmVFYrDHeTsFqQHi4/od6/public/values?alt=json";
	$.getJSON(link, function(data) {
		T=gsx2json(data);
		btn.disabled=false;
		$("#baza")[0].children[0].appendChild(maketable())
		});
	isFirst=1;
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
		succtmp++;
		if(isFirst)
			points++;
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
	
	tytO.textContent=t["tytuł"];
	singlecheck(tytO,tytI);
	
	autO.textContent=t["autor"];
	singlecheck(autO,autI);
	
	nurO.textContent=t["nurt"];
	singlecheck(nurO,nurI);
		
	if(isFirst){		
		if(succtmp==3){
			succ++;
			maketr(t["tytuł"],t["autor"],wowT);
		}
		else if(succtmp==0)
			maketr(t["tytuł"],t["autor"],wtfT);
		else
			maketr(t["tytuł"],t["autor"],mehT);
		
		wowP.innerHTML=(100*wowT.children.length/count).toFixed(2)+"%";
		wowP.style.width=wowP.innerHTML;
		mehP.innerHTML=(100*mehT.children.length/count).toFixed(2)+"%";
		mehP.style.width=mehP.innerHTML;
		wtfP.innerHTML=(100*wtfT.children.length/count).toFixed(2)+"%";
		wtfP.style.width=wtfP.innerHTML;
		
		pkt.textContent=points+"/"+(3*count);
		suk.textContent=succ+"/"+count;
	}
	
	if(succtmp==3)
		isFirst=1;
	else
		isFirst=0;

	btn.value="Dalej";
	btn.onclick=function(){next()};
}
function next(){
	if (T.length==0 && isFirst){
		$("#test").removeClass("active");
		$("#testA").removeClass("active");
		$("#wynik").addClass("active show");
		$("#wynikA").addClass("active show");
		$("#koniec").removeClass("d-none");
		}

	else{
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
		
		if(isFirst){
			num=Math.floor(Math.random()*T.length);
			t=T.splice(num,1)[0];
			count++;
			ilo.textContent=count;
			obr.src=t["link"];
		}
	}
}
