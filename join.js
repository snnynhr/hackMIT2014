exports.load = function(h,w)
{
	s = "";
	for(i=0; i<h; i++)
	{
		s +=  "<div id=wrapp"+i+"></div>\n";
	}
	document.getElementById("wrapp").innerHTML = s;

	var ww = document.getElementById("ccc").offsetWidth;
	var www = Math.floor(((0.97)*ww)/w);
	var hh = $(window).height();
	var hhh = Math.floor((hh)/h);

	for(i=0; i<h; i++)
	{
		for(j=0; j<w; j++)
		{
			$('<button>')
		        .attr({'id':i+""+j,'style':'display:inline; width: '+www+"px; height: " + hhh + "px; background-color: rgba(0,0,0,0.4);"})
		        .appendTo('#wrapp'+i)
		        .text("("+i+","+j+")")
		        .click(function(){
		            console.log(this.id);
		            $("#"+this.id).css("background-color","rgba(255,255,255,0.6)");
		        });
		}
	}
}