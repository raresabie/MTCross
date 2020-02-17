

function showLoading() {
    $("#loadingDiv").show();
    $("#loadingDiv1").show();
}
function hideLoading() {
    $("#loadingDiv").hide();
    $("#loadingDiv1").hide();
}

function netRegister() {
    showLoading()
    $.ajax({
        method:'post',
        url:BASE_URL+'register.php',
        data: "",
        dataType: 'json',
        success: function (result) {
            hideLoading()
            console.log(result);
            // result=JSON.stringify(result);
            // console.log("Richiesta rete successo json: "+result);
            localStorage.setItem("session_id",result.session_id);
            console.log("netRegister - positivo");
            onStart();
        },
        error: function (error) {
            console.log("netRegister Richiesta rete errore: "+error);
            hideLoading();
        }
    });
}

function netGetRanking() {
    showLoading()
    $.ajax({
        method:'post',
        url:BASE_URL+'ranking.php',
        data: JSON.stringify({session_id : s_id}),
        dataType: 'json',
        success: function (result) {
            hideLoading()
            console.log(result);
            // result=JSON.stringify(result);
            // console.log("Richiesta rete successo json: "+result);
            setUserRank(result);
            if(userRank.length>0){
                console.log("Risultato Array maggiore di 0");
                // $("#rankingList").html("");
                $("#rankingList").html("");
                userRank.forEach(function (user, index) {
                    // $("#img").attr("src", atob(user.img));
                    console.log("Utente"+ index+" uid "+user.name);
                    $("#rankingList").append("<li>"+getRowForRankList(user,index+1)+"</li>");
                });
            }
        },
        error: function (error) {
            console.log("Richiesta rete errore: "+error);
            hideLoading()
        }
    });
}

function netGetProfile() {
    showLoading()
    $.ajax({
        method:'post',
        url:BASE_URL+'getprofile.php',
        data: JSON.stringify({session_id : s_id}),
        dataType: 'json',
        success: function (result) {
            hideLoading()
            console.log(result);
            // result=JSON.stringify(result);
            // console.log("Richiesta rete successo json: "+result);
            setMyUser(result)
            if(myUser!=null){
                console.log("netGetProfile - setting profile");
                // image = document.getElementById("userImage")
                // image.src = myUser.imgSrc;
                $("#userImage").attr("src",myUser.imgSrc);
                $("#usernameText").val(myUser.name);
                $("#lpUserText").html(myUser.lp);
                $("#xpUserText").html(myUser.xp);
                $("#sessionId").html(s_id);
                setLpXpInMap(myUser.lp, myUser.xp);
            }
        },
        error: function (error) {
            console.log("Richiesta rete errore: "+error);
            hideLoading();
        }
    });
}

function netGetMap() {
    console.log("netGetMap init");
    showLoading()
    $.ajax({
        method:'post',
        url:BASE_URL+'getmap.php',
        data: JSON.stringify({session_id : s_id}),
        dataType: 'json',
        success: function (result) {
            hideLoading()
            console.log(result);
            setMap(result);
            updatePosition();
            if(mapObjects.length>0){
                console.log("netGetMap - setting map");
                // $("#userImage").attr("src",myUser.imgSrc);
            }
        },
        error: function (error) {
            console.log("Richiesta rete errore: "+error);
            hideLoading();
        }
    });
}

function netGetImage(mapObj) {
    showLoading()
    $.ajax({
        method:'post',
        url:BASE_URL+'getimage.php',
        data: JSON.stringify({
            session_id : s_id,
            target_id: mapObj.id
        }),
        dataType: 'json',
        success: function (result) {
            hideLoading()
            console.log(result);
            // result=JSON.stringify(result);
            // console.log("Richiesta rete successo json: "+result);
            mapObj.img=result.img;
            if(mapObj.img!=null){
                console.log("netGetImage - setting Image");
                // image = document.getElementById("userImage")
                // image.src = myUser.imgSrc;
                $("#mapObjectImage").attr("src",mapObj.imgSrc);
            }
        },
        error: function (error) {
            console.log("netGetImage Richiesta rete errore: "+error);
            hideLoading();
        }
    });
}

function netFightEat(mapObj) {
    showLoading();
    console.log("netFightEat init");
    $.ajax({
        method:'post',
        url:BASE_URL+'fighteat.php',
        data: JSON.stringify({
            session_id : s_id,
            target_id: mapObj.id
        }),
        dataType: 'json',
        success: function (result) {
            hideLoading();
            console.log("netFightEat positive with id: "+mapObj.id);
            console.log(result);
            lastFightEat=null;
            // result=JSON.stringify(result);
            // console.log("Richiesta rete successo json: "+result);
            setLastFightEat(result, mapObj);
        },
        error: function (error) {
            console.log("netFightEat Richiesta rete errore: "+error);
            hideLoading();
        }
    });
}

function netSetName(name) {
    showLoading()
    $.ajax({
        method:'post',
        url:BASE_URL+'setprofile.php',
        data: JSON.stringify({
            session_id : s_id,
            username: name
        }),
        dataType: 'json',
        success: function (result) {
            hideLoading()
            // result=JSON.stringify(result);
            console.log(" netSetName Richiesta rete successo json: "+result);
            myUser.name=name;
            $("#usernameText").val(name);
        },
        error: function (error) {
            console.log("netSetName Richiesta rete errore: "+error);
            $("#usernameText").val(myUser.name);
            $("#saveButton").hide();
            hideLoading();
            alert("errore di rete");
        }
    });
}

function netSetImage(image) {
    showLoading()
    $.ajax({
        method:'post',
        url:BASE_URL+'setprofile.php',
        data: JSON.stringify({
            session_id : s_id,
            img: image
        }),
        dataType: 'json',
        success: function (result) {
            hideLoading()
            // result=JSON.stringify(result);
            console.log(" netSetImage Richiesta rete successo json: "+result);
            myUser.img=image;
            $("#userImage").attr("src","data:image/png;base64,"+image);
        },
        error: function (error) {
            console.log("netSetImage Richiesta rete errore: "+error);
            $("#userImage").val(myUser.imgSrc);
            hideLoading();
            alert("errore di rete");
        }
    });
}