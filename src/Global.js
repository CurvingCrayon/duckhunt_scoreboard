let alertText = "";
let alertType = "";
let alertSubs = [];

module.exports.subAlert = function(fx){
    alertSubs.push(fx);
}
function updateAlert(){
    for(var i = 0; i < alertSubs.length; i++){
        alertSubs[i](alertText, alertType);
    }
}
module.exports.setAlert = function(val){
    alertText = val;
    updateAlert();
}

module.exports.setAlertType = function(type){
    alertType = type;
    updateAlert();
}


let confirmText = "";
let confirmSubs = [];
module.exports.confirmClick = function(){};
module.exports.cancelClick = function(){};
function updateConfirm(){
    for(var i = 0; i < confirmSubs.length; i++){
        confirmSubs[i](confirmText);
    }
}
module.exports.subConfirm = function(callback){
    confirmSubs.push(callback);
}
module.exports.confirm = function(text, confirm, cancel){
    confirmText = text;
    module.exports.confirmClick = confirm;
    module.exports.cancelClick = cancel;
    updateConfirm();
}