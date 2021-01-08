class User{
    constructor (xp, lp, name, img, email){
        this._xp=xp;
        this._lp=lp;
        this._name=name;
        this._email=email;
        this._img=img;
        this._lon=null;
        this._lat=null;
    }

    get name(){return this._name;}
    get xp(){return this._xp;}
    get lp(){return this._lp;}
    get img(){return this._img;}
    get imgSrc(){
        if(this._img==null || this._img===""){
            return "img/user.jpeg";
        }
        else{
            return "data:image/png;base64,"+this._img;
        }
    }
    get lat(){return this._lat;}
    get lon(){return this._lon;}
    get email(){return this._email}

    set img(img){this._img=img;}
    set lp(lp){this._lp=lp+"";}
    set xp(xp){this._xp=xp+"";}
    set lon(lon){this._lon=lon;}
    set lat(lat){this._lat=lat;}

    setData (xp, lp, name, img, email){
        this._xp=xp;
        this._lp=lp;
        this._name=name;
        this._img=img;
        this._email=email;
    }

    setLpXp(lp, xp){
        this._lp=lp+"";
        this._xp=xp+"";
        setLpXpInMap(lp, xp);
    }

    print(){
        return this._name+",  "+this._img;
    }
}

class mapObject {
    constructor (id, lat, lon, size, type, name){
        this._id=id;
        this._lat=lat;
        this._lon=lon;
        this._size=size;
        this._type=type;
        this._name=name;
        this._img="";
        this._marker=null;
        if(myUser!=null)
            this._distance=distanceBetween(myUser.lat==null?45.476095:myUser.lat, myUser.lon==null?9.231862:myUser.lon, parseFloat(this._lat), parseFloat(this._lon), "K");
        else
            this._distance=distanceBetween(45.476095, 9.231862, parseFloat(this._lat), parseFloat(this._lon), "K");
        if(this._img==="")
            netGetImage(this);
    }

    get id(){return this._id;}
    get size(){return this._size;}
    get type(){return this._type;}
    get name(){return this._name;}
    get img(){return this._img;}
    get imgSrc(){
        if(this._img==null || this._img===""){
            return "img/monster.jpeg";
        }
        else{
            return "data:image/png;base64,"+this._img;
        }
    }
    get getLonLat(){
        return [ parseFloat(this._lon), parseFloat(this._lat)];
    }
    get marker(){return this._marker;}
    get distance(){return this._distance;}
    get lon(){return this._lon;}
    get lat(){return this._lat;}



    set distance(distance){this._distance=distance;}
    set marker(marker){this._marker=marker;}
    set img(img){this._img=img;}
    set lon(lon){this._lon=lon;}
    set lat(lat){this._lat=lat;}


    isImageNull(){
        if(this._img==null || this._img===""){
            return true;
        }
        else{
            return false;
        }
    }
}

class FightEatEvent {
    constructor(died, oldLp, oldXp, newLp, newXp, mapObj){
        this._died=died;
        this._oldLp=parseInt(oldLp);
        this._oldXp=parseInt(oldXp);
        this._newLp=newLp;
        this._newXp=newXp;
        this._mapObj=mapObj;
    }
    get died(){return this._died;}
    get oldLp(){return this._oldLp;}
    get oldXp(){return this._oldXp;}
    get newLp(){return this._newLp;}
    get newXp(){return this._newXp;}
    get mapObj(){return this._mapObj;}
    get diffLp(){
        if(this._newLp-this._oldLp>=0){
            return "+"+(this._newLp-this._oldLp);
        }
        else {
            return (this._newLp-this._oldLp);
        }
    }
    get diffXp(){
        if(this._newXp-this._oldXp>=0){
            return "+"+(this._newXp-this._oldXp);
        }
        else{
            return (this._newXp-this._oldXp);
        }
    }
}


//DATA SETTING
function getRowForRankList(user, index) {
    var retString;
    retString="<div class=\"row\" style='margin-bottom: 10px'>\n" +
        "                    <div class=\"col-2 border-right text-center\">\n" +
        "                        <h1>" +
        index +
        "</h1>\n" + "</div>" +
        "<div class='col-3'>" +
        "<img src='"+user.imgSrc+"' class='img-fluid' style=\"-webkit-user-select: none;margin: auto;\" > " +
        "</div>" +
        "                    <div class=\"col-7 border-bottom\">\n" +
        "                        <table class=\"table table-borderless table-responsive\"  style=\"margin-bottom: 0\">\n" +
        "                            <thead>\n" +
        "                                <tr class=\"table-borderless\" style=\"padding: 0\">\n" +
        "                                    <td style=\"padding: 0\">\n" +
        "                                        <p  style=\"margin-bottom: 0\" class='nameText'>" +
        user.name +
        "</p>\n" +
        "                                    </td>\n" +
        "                                </tr>\n" +
        "                                <tr style=\"padding: 0\">\n" +
        "                                    <td style=\"padding: 0\" >\n" +
        "                                        <img class=\"img-fluid rankGameIcon\" src=\"img/heart.png\">\n" +
        "                                        <p style=\"display: inline; font-size: 15px\" class=\"heartText\">" +
        user.lp +
        "</p>\n" +
        "                                    </td>\n" +
        "                                    <td  style=\"padding: 0\" align=\"left\">\n" +
        "                                        <img class=\"img-fluid rankGameIcon\" src=\"img/expirience.png\">\n" +
        "                                        <p style=\"display: inline; font-size: 15px\" class=\"expirienceText\">" +
        user.xp +
        "</p>\n" +
        "                                    </td>\n" +
        "                                </tr>\n" +
        "                            </thead>\n" +
        "                        </table>\n" +
        "                    </div>\n" +
        "                </div>";
    return retString;
}

function setUserRank (result){
    console.log("setUserRanking: init");
    if(result.ranking.length>0){
        userRank=[];
        result.ranking.forEach(function (userR, index) {
            userRank.push(new User(userR.xp, userR.lp, userR.username, userR.img));
            console.log("Utente"+ userRank[index].name+" xp "+userRank[index].xp);
        });
    }
}

function setMyUser(result) {
    console.log("setMyUser: init");
    if(result!=null){
        if(myUser==null){
            myUser=new User(result.xp, result.lp, result.username, result.img, result.email);
        }
        else{
            myUser.setData(result.xp, result.lp, result.username, result.img, result.email);
        }
    }
}

function setMap(result) {
    console.log("setMyUser: init");
    var changeData=false;
    if(mapObjects.length === result.mapobjects.length){
        result.mapobjects.forEach(function (mapObj) {
            if(!isIdInMapObjArray(mapObj.id)){
                changeData=true;
            }
        });
    }
    else{
        changeData=true;
    }
    if(changeData){
        mapObjects=[];
        result.mapobjects.forEach(function (mapObj, index) {

            mapObjects.push(new mapObject(mapObj.id, mapObj.lat, mapObj.lon, mapObj.size, mapObj.type, mapObj.name));
            console.log("mapObj:"+ mapObjects[index].name+" size: "+mapObjects[index].size);
            addMarker(mapObjects[index]);
        });
    }
    else{
        console.log("setMap - updating map");
        removeAllMarkers();
        result.mapobjects.forEach(function (mapObj, i){
            mObj=getMapObjById(mapObj.id);
            if(mapObj.lat !== mObj.lat && mapObj.lon !== mObj.lon){
                mObj.lat=mapObj.lat;
                mObj.lon=mapObj.lon;
            }
            addMarker(mObj);
        });
        updateMapObjectDistance();
    }
    map.on('click', );
}

function setLastFightEat(result, mapObj) {
    console.log("setLastFightEat init");
    lastFightEat=new FightEatEvent(
        result.died,
        myUser.lp,
        myUser.xp,
        result.lp,
        result.xp,
        mapObj
    );
    myUser.setLpXp(result.lp, result.xp);

    $("#mapObjectImageFE").attr("src",mapObj.imgSrc);
    $("#mapObjectNameFE").html(mapObj.name);
    if(lastFightEat.died){
        $("#fightEatResultImage").attr("src", "img/dead.png");
    }
    else {
        $("#fightEatResultImage").attr("src", "img/victory.png");
    }
    $("#lpDifferenceText").html(lastFightEat.diffLp);
    $("#xpDifferenceText").html(lastFightEat.diffXp);

    $("#mapObjectDetailDiv").hide();
    $("#mapObjectDetailDivIntern").hide();
    $("#fightEatDiv").show();
    $("#fightEatDivIntern").show();
}

function removeAllMarkers() {
    console.log("removeAllMarkers init");
    markersList.forEach(function(marker, index){
        if(marker!=null){
            marker.remove();
        }
    });
    markersList=[];
}

//data getting

function getMapObjById(id) {
    for(var i = 0 ; i<mapObjects.length; i++){
        if(mapObjects[i].id===id)
            return mapObjects[i];
    }
    return false;
}

function isIdInMapObjArray(element) {
    for(var i = 0; mapObjects.length; i++){
        if(element===mapObjects[i].id)
            return true;
    }
    return false;
}

//position
function updatePosition() {
    navigator.geolocation.getCurrentPosition(position => {
        console.log("lat:"+position.coords.latitude);
        console.log("lon:"+position.coords.longitude);
        myUser.lat=position.coords.latitude;
        myUser.lon=position.coords.longitude;
        updateMapObjectDistance();
    });
}

function updateMapObjectDistance() {
    mapObjects.forEach(function (mapObj, index){
        mapObjects[index].distance=distanceBetween(myUser.lat, myUser.lon, parseFloat(mapObj._lat), parseFloat(mapObj._lon), "K");
        // console.log("dist"+myUser.lat+" "+ myUser.lon+" "+ mapObj._lat+" "+mapObj._lon);
    });
}

function distanceBetween(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit=="K") { dist = dist * 1.609344;}
        if (unit=="N") { dist = dist * 0.8684;}
        return parseInt(dist*1000);
    }
}