$(init)
var s_id="Axj1NLfrrrVWRjON";
const BASE_URL="https://ewserver.di.unimi.it/mobicomp/mostri/";
var userRank=[];
var myUser=null;
var mapObjects=[];
var lastFightEat;
var markersList=[];
var distance_limit=50; //on start distance limit
var hack_counter=0;
const HACK_ENABLED=true;

function init() {
    if(localStorage.getItem("session_id")===null){
        changeDiv("#sessionDiv");
    }
    else{
        changeDiv("#mapDiv");
        onStart();
    }


    $("#saveSessionButton").click(function () {
        netControl($("#sessionText").val());

        // localStorage.setItem("session_id", $("#sessionText").val());
        // console.log("init - my new sid:" + localStorage.getItem("session_id"))
        // changeDiv("#mapDiv");
        // onStart();
    });
}

function onStart() {
    document.body.style.backgroundColor = "#4E555C";
    if(localStorage.getItem("session_id")===null){
        netRegister();
    }
    else {
        s_id=localStorage.getItem("session_id");
        setListeners();
        netGetProfile();
        netGetMap();
        setInterval(netGetMap, 10000);
        setInterval(function () {
            hack_counter=0;
        }, 5000);
    }
}

function setListeners() {
    //to show save button
    $("#usernameText").click(function () {
        console.log("loog - usernameText clicked");
        $("#saveButton").show();
    });

    $("#emailBox").click(function () {
        console.log("loog - emailText clicked");
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
        netSetName($("#usernameText").val(), $("#emailText").val());
        $("#saveButton").hide();
    });

    $("#userImage").click(getImgFromGallery);

    if(HACK_ENABLED){
        $("#buttonHack").click(function () {
            if(hack_counter<5 && distance_limit===50){
                hack_counter++;
                return;
            }

            hack_counter=0;

            if(distance_limit===50){
                var r = confirm("Attivare hackMode?");
            }
            else{
                var r = confirm("Disattivare hackMode?");
            }

            if (r === true) {
                if(distance_limit===50){
                    distance_limit=999999;
                }
                else distance_limit = 50;
            }
        });
    }


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
// ..........


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










