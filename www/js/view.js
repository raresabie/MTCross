function viewMapObjectDetails(mapObj) {
    console.log("viewMapObjectDetails obj:"+mapObj.name);
    if(mapObj.isImageNull()){
        netGetImage(mapObj);
    }
    else{
        console.log("setting mapObj image from memory");
        $("#mapObjectImage").attr("src", mapObj.imgSrc);
    }
    $("#mapObjectDetailDiv").show();
    $("#mapObjectDetailDivIntern").show();
    $("#mapObjectName").html(mapObj.name);
    $("#mapObjectActionImage").click(null);
    $("#mapObjectActionImage").prop("onclick", null).off("click");
    $("#mapObjectActionImage").click(function () {
        console.log("mapObjAction clicked id: "+mapObj.id);
        netFightEat(mapObj);
    });
    if(mapObj.type==="MO"){
        $("#mapObjectActionImage").attr("src","img/fight.png");
        $("#mapObjectDamageDiv").attr("class", "col-8");
        switch (mapObj.size) {
            case "S": $("#mapObjectDamage").attr("src","img/monster_s.png"); break;
            case "M": $("#mapObjectDamage").attr("src","img/monster_m.png"); break;
            case "L": $("#mapObjectDamage").attr("src","img/monster_l.png"); break;
        }
    }
    else{
        $("#mapObjectActionImage").attr("src","img/eat.png");
        $("#mapObjectDamageDiv").attr("class", "col-6");
        switch (mapObj.size) {
            case "S": $("#mapObjectDamage").attr("src","img/candy_s.png"); break;
            case "M": $("#mapObjectDamage").attr("src","img/candy_m.png"); break;
            case "L": $("#mapObjectDamage").attr("src","img/candy_l.png"); break;
        }
    }
    if(mapObj.distance>50){
        $("#mapObjectActionImageDiv").hide();
        if(mapObj.distance>1000){
            $("#mapObjectAlertDistance").show().html("Devi avvicinarti altri "+parseInt(mapObj.distance/1000)+" chilometri");
        }
        else{
            $("#mapObjectAlertDistance").show().html("Devi avvicinarti altri "+mapObj.distance+" metri");
        }
    }
    else {
        $("#mapObjectActionImageDiv").show();
        $("#mapObjectAlertDistance").hide();
    }
}

// function setLpXpInMap(lp, xp){
//     $("#lpUserTextInMap").html(lp);
//     $("#xpUserTextInMap").html(xp);
// }