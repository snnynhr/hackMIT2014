function exec() {
	document.getElementById('host').addEventListener('click',function()
		{
			var xmlHttp = null;
		    xmlHttp = new XMLHttpRequest();
		    xmlHttp.open( "GET", theUrl, false );
		    xmlHttp.send( null );
		    return xmlHttp.responseText;
		});
	document.getElementById('join').addEventListener('click',function()
		{
			console.log("ji");
		});
}
document.addEventListener('DOMContentLoaded', exec);