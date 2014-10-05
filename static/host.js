function exec() {
	document.getElementById('submit').addEventListener('click',function()
		{
			$.post("makeroom",
			  {
			    rows:document.getElementById("h").value,
			    cols:document.getElementById("w").value
			  },
			  function(data,status){
			    alert("Data: " + data + "\nStatus: " + status);
			  });
			//var xmlHttp = null;
		    //xmlHttp = new XMLHttpRequest();
		    console.log(document.getElementById("file").value);
		    //xmlHttp.open( "POST", , false );
		    //xmlHttp.send( null );
		    //return xmlHttp.responseText;
		});
}
document.addEventListener('DOMContentLoaded', exec);