function load(h,w)
{
	s = "";
	for(i=0; i<h; i++)
	{
		s +=  "<div id=wrapp"+i+"></div>\n";
	}
	document.getElementById("wrapp").innerHTML = s;

	var ww = $(window).width();
	var www = Math.floor(((0.8)*ww)/w);
	var hh = $(window).height();
	var hhh = Math.floor(((0.8)*hh)/h);
	console.log(ww);
	console.log(www);
	console.log(hh);
	console.log(hhh);
	for(i=0; i<h; i++)
	{
		for(j=0; j<w; j++)
		{
			$('<button>')
		        .attr({'id':i+""+j,'style':'width: '+www+"px; height: " + hhh + "px; background-color: rgba(0,0,0,0.4);"})
		        .appendTo('#wrapp'+i)
		        .text("("+i+","+j+")")
		        .click(function(){
		            console.log(this.id);
		            $("#"+this.id).css("background-color","rgba(255,255,255,0.6)");
		        });
		}
	}
}
function exec() {
	load(4,3);
}
document.addEventListener('DOMContentLoaded', exec);