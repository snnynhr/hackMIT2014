exports.generate = function(h,w)
{
	s = ""+
"<!DOCTYPE html>\n"+
"<html lang=\"en\">\n"+
"<head>\n"+
"    <meta charset=\"utf-8\">\n"+
"   <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n"+
"    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n"+
"   <meta name=\"description\" content=\"\">\n"+
"    <meta name=\"author\" content=\"\">\n"+
"\n"+
    "<title>MuSc</title>\n"+
"\n"+
    "<script src=\"/socket.io/socket.io.js\"></script>\n"+
    "<!-- Bootstrap Core CSS -->\n"+
    "<link href=\"/static/css/bootstrap.min.css\" rel=\"stylesheet\">\n"+
    "<link href=\"/static/css/grayscale.css\" rel=\"stylesheet\">\n"+
    "<link href=\"/static/font-awesome-4.1.0/css/font-awesome.min.css\" rel=\"stylesheet\" type=\"text/css\">\n"+
    "<link href=\"http://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic\" rel=\"stylesheet\" type=\"text/css\">\n"+
    "<link href=\"http://fonts.googleapis.com/css?family=Montserrat:400,700\" rel=\"stylesheet\" type=\"text/css\">\n"+
    "<script type=\"text/javascript\" src=\"http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js\"></script>\n"+
"</head>\n"+
"<body id=\"page-top\" data-spy=\"scroll\" data-target=\".navbar-fixed-top\">\n"+
    "<header class=\"intro\" style=\"padding: 0px 0px 0px 0px;\">\n"+
        "<div id = \"ccc\">\n"+
            "<div id=\"wrapp\"></div>\n"+
        "</div>\n"+
    "</header>\n"+
    "<script src=\"/static/js/jquery-1.11.0.js\"></script>\n"+
    "<script src=\"/static/js/bootstrap.min.js\"></script>\n"+
    "<script src=\"/static/js/jquery.easing.min.js\"></script>\n"+
    "<script src=\"/static/js/grayscale.js\"></script>\n"+
    "<script>\n"+
    "function load(h,w)\n"+
    "{\n"+
      "s = \"\";\n"+
      "for(i=0; i<h; i++)\n"+
      "{\n"+
        "s +=  '<div id=\"wrapp'+i+'\"></div>\\n'\n"+
      "}\n"+
      "document.getElementById(\"wrapp\").innerHTML = s;\n"+
      "var ww = document.getElementById(\"ccc\").offsetWidth;\n"+
      "var www = Math.floor(((0.97)*ww)/w);\n"+
      "var hh = $(window).height();\n"+
      "var hhh = Math.floor((hh)/h);\n"+
      "for(i=0; i<h; i++)\n"+
      "{\n"+
        "for(j=0; j<w; j++)\n"+
        "{\n"+
          "$('<button>')\n"+
                ".attr({'id':i+\"\"+j,'style':'display:inline; width: '+www+\"px; height: \" + hhh + \"px; background-color: rgba(0,0,0,0.4);\"})\n"+
                ".appendTo('#wrapp'+i)\n"+
                ".text(\"(\"+i+\",\"+j+\")\")\n"+
                ".click(function(){\n"+
                    "console.log(this.id);\n"+
                    "var urlarray = window.location.pathname.split('/');\n"+
                    "var roomName = urlarray[urlarray.length-1];\n"+
                    "var socket = io('/'+roomName);\n"+
                    "console.log(roomName);\n"+
                    "socket.on('image', function(msg){\n"+
                      "window.location.href = msg.url;\n"+
                    "});\n"+
                    "socket.emit('finalizePosition', {row: parseInt(this.id[1]), col: parseInt(this.id[0])});\n"+
                    "$(\"#\"+this.id).css(\"background-color\",\"rgba(255,255,255,0.6)\");\n"+
                "});\n"+
        "}\n"+
      "}\n"+
    "}\n"+
    "document.addEventListener('DOMContentLoaded', load("+h+","+w+"));\n"+
    "</script>\n"+
"</body>\n"+
"</html>\n";
	return s;
}