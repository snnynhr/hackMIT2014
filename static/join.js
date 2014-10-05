function load(h,w)
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
function loadToString(h,w)
{
	var pref = '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta http-equiv="X-UA-Compatible" content="IE=edge">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<meta name="description" content="">\n<meta name="author" content="">\n<title>MuSc</title>\n<link href="/static/css/bootstrap.min.css" rel="stylesheet">\n<link href="/static/css/grayscale.css" rel="stylesheet">\n<link href="/static/font-awesome-4.1.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">\n<script src="static/join.js"></script>\n<link href="http://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic" rel="stylesheet" type="text/css">\n<link href="http://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css">\n<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js"></script>\n<script>\nfunction bClicked()\n{\nconsole.log(this.id);\n$("#"+this.id).css("background-color","rgba(255,255,255,0.6)");\n}\n</script>\n</head>\n<body id="page-top" data-spy="scroll" data-target=".navbar-fixed-top">\n<header class="intro" style="padding: 0px 0px 0px 0px;">\n<div id = "ccc">\n<div id="wrapp">\n';
    var suff = '</div>\n</div>\n</header>\n<script src="/static/js/jquery-1.11.0.js"></script>\n<script src="/static/js/bootstrap.min.js"></script>\n<script src="/static/js/jquery.easing.min.js"></script>\n<script src="/static/js/grayscale.js"></script>\n</body>\n</html>\n';

	s = "";
	var ww = document.getElementById("ccc").offsetWidth;
	var www = Math.floor(((0.97)*ww)/w);
	var hh = $(window).height();
	var hhh = Math.floor((hh)/h);
	for(i=0; i<h; i++)
	{
		s +=  "<div id=wrapp"+i+">\n";
		for(j=0; j<w; j++)
		{
			s += '<button onclick="bclicked()"; id="'+i+j+'" style="display:inline; width: '+www+'px; height; '+hhh+'px; background-color: rgba(0,0,0,0.4);"></button>\n';
		}
		s += "</div>\n";
	}
	return pref + s + suff;
}
function exec() {
	load(4,3);
}
document.addEventListener('DOMContentLoaded', exec);