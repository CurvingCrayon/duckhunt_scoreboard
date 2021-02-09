var URL = "http://localhost:5000";
 
function getFromURL(url){
    return new Promise((resolve, reject)=> {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4/* && this.status == 200*/) {
                resolve({
                    resp: this.responseText, 
                    status: this.status
                });
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    });
}
exports.getScores = async function(){
    const result = await getFromURL(URL + "/getScores");
    if(result.status == 200){ //Successful get
        var returnObj = JSON.parse(result.resp);
        returnObj.success = true;
        return returnObj;
    }
    else{
        return {
            success: false
        };
    }
};