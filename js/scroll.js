(function(){
 	var myElement = document.getElementById("download-app");
    // construct an instance of Headroom, passing the element
    if(myElement){
	    var headroom  = new Headroom(myElement,{
	    	"offset":50
	    });
	    // initialise
	    headroom.init();
	}
})()