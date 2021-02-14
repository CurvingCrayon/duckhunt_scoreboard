var URL = "http://localhost:5000";
var TIMEOUT = 1000;

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
        xhttp.timeout = TIMEOUT;
        xhttp.ontimeout = function(){
            resolve({
                resp: "",
                status: 0
            });
        }
        xhttp.send();
    });
}
exports.getScores = async function(){
    const result = await getFromURL(URL + "/getScores");
    if(result.status == 200){ //Successful get from backend server
        if(result.resp !== "0"){ //If backend server was able to communicate with db
            var returnObj = JSON.parse(result.resp);
            returnObj.success = true;
            return returnObj;
        }
        else{
            return {
                success: false
            };
        }
    }
    else{
        return {
            success: false
        };
    }
};

exports.updateName = async function(id, name){
    const result = await getFromURL(URL + "/setName/"+id+"/"+name);
    if(result.status == 200){ //Successful get from backend db
        if(result.resp !== "0"){ //If backend server was able to communicate with db
            return true;
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
};

exports.deleteScore = async function(id){
    const result = await getFromURL(URL + "/deleteScore/"+id);
    if(result.status == 200){ //Successful get from backend db
        if(result.resp !== "0"){ //If backend server was able to communicate with db
            return true;
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
}