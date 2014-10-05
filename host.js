function exec() {
	document.getElementById('submit').addEventListener('click',function()
		{
			//var xmlHttp = null;
		    //xmlHttp = new XMLHttpRequest();
		    console.log(document.getElementById("file").value);
		    //xmlHttp.open( "POST", , false );
		    //xmlHttp.send( null );
		    //return xmlHttp.responseText;
		});
}
document.addEventListener('DOMContentLoaded', exec);