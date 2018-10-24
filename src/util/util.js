function remove(array,obj){
	for(var i=0;i<array.length;i++){
		if(array[i]==obj){
			array.splice(i,1);
			return 
		}

	}

}
function isArray(obj){
	if(obj instanceof Array){
		return true
	}
	return false
}
export  {remove ,isArray};