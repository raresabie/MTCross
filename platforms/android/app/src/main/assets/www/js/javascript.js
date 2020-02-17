$(onStart)
var s_id="Axj1NLfrrrVWRjON";
const BASE_URL="https://ewserver.di.unimi.it/mobicomp/mostri/";
var userRank=[];
var myUser=null;
var mapObjects=[];
var lastFightEat;
var markersList=[];

function onStart() {
    if(localStorage.getItem("session_id")===null){
        netRegister();
    }
    else {
        s_id=localStorage.getItem("session_id");
        setListeners();
        netGetProfile();
        netGetMap();
    }
}

function setListeners() {
    //to show save button
    $("#usernameText").click(function () {
        console.log("loog - usernameText clicked");
        $("#saveButton").show();
    });

    $("#buttonToRanking").click(function () {
        changeDiv("#rankingDiv");
        netGetRanking();
    });

    $("#buttonToMap").click(function () {
        changeDiv("#mapDiv");
        updatePosition(false);
        netGetMap();

    });

    $("#buttonToProfile").click(function () {
        changeDiv('#profileDiv');
        netGetProfile();
    })

    $("#buttonBackInRank").click(function () {
        changeDiv("#profileDiv");
        netGetProfile();
    });

    $("#saveButton").click(function () {
        netSetName($("#usernameText").val());
        $("#saveButton").hide();
    });

    $("#userImage").click(getImgFromGallery);

}
//ImageChanging
function getImgFromGallery(){
    var picture= navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        destinationType: Camera.DestinationType.DATA_URL
    });
    console.log("picture result: "+picture);
}
function onSuccess(imageData) {
    console.log("getImgFromGallery success");
    netSetImage(imageData);
}
function onFail(message) {
    alert('GetImgFromGallery Failed because: ' + message);
}



function setLpXpInMap(lp, xp){
    $("#lpUserTextInMap").html(lp+"");
    $("#xpUserTextInMap").html(xp+"");
}

function changeDiv(newDiv) {
    $(".container").hide();
    $(newDiv).show();
    $(newDiv).css("display","block");
}
function addDiv(newDiv) {
    $(newDiv).show();
}
function removeDiv(oldDiv) {
    $(oldDiv).hide();
}

function addMarker(mapObject) {
    console.log("addMarker: "+mapObject.name+ "at"+ mapObject.getLonLat+ " distance: "+mapObject.distance);
    var el = document.createElement('div');
    if(mapObject.type==="MO"){
        el.className = 'marker monsterIcon';
    }
    else {
        el.className = 'marker candyIcon';
    }
    el.setAttribute("id",mapObject.id+"");
    el.addEventListener('click', function () {
            console.log("cliccked mapObj id: "+mapObject.id+", distance: "+mapObject.distance);
            viewMapObjectDetails(mapObject);
        }
    );
    // make a marker for each feature and add to the map
    markersList.push( new mapboxgl.Marker(el)
        .setLngLat(mapObject.getLonLat)
        // .setPopup(function () {
        //     console.log("marker "+mapObject.name+" cliccked");
        // })
        .addTo(map)
    );
}

function closeFightEatDiv() {
    removeAllMarkers();
    changeDiv("#mapDiv");
    $("#mapObjectDamage").attr("src","");
    $("#mapObjectImageFE").attr("src","");
    $("#mapObjectNameFE").html("");
    $("#lpDifferenceText").html("");
    $("#xpDifferenceText").html("");
    netGetMap();
}










