/******************************************************************************************************
 *                                  Moteur de jeu 2D en JavaScript                                    *
 *                                                                                                    *
 *                                             Version 1.0                                            *
 ******************************************************************************************************
 *                    position are calculate for X:0 Y:0 in the bottom-left corner                    *
 *                             propriety in GAME.OBJ["name"] are READONLY !                           *
 ******************************************************************************************************/

let GAME = {
    SCENE : document.getElementById("__scene__"),
    OBJ : {

    },
    createOBJ : function (_name, _sizeX, _sizeY, _posX, _posY, _deg = 0, _picture = null) {
        GAME.OBJ[_name] = {
            name : _name,
            sizeX : _sizeX,
            sizeY : _sizeY,
            posX : _posX,
            posY : _posY,
            deg : _deg,
            picture : _picture,
            show : function () { document.getElementById(this.name).style.display = "block" },
            hide : function () { document.getElementById(this.name).style.display = "none" },
            move : function (newX, newY) { this.posX = newX; this.posY = newY; document.getElementById(this.name).style.bottom = newY; document.getElementById(this.name).style.left = newX; },
            moveinT : function (newX, unitX, newY, unitY, ms) {
                const FrameTime = 5;let nbFrame = ms / FrameTime;let X1 = parseInt(this.posX);let Y1 = parseInt(this.posY);let XperF = (newX - X1) / nbFrame;let YperF = (newY - Y1) / nbFrame;let tempThis = this;
                for(let i = 1 ;i <= nbFrame; i++){setTimeout(function() {tempThis.move((X1 + (XperF * i)) + unitX  , (Y1 + (YperF * i)) + unitY)}, FrameTime * i);}
                setTimeout(function() { tempThis.move(newX + unitX  , newY + unitY) }, ms); },
            scale : function (newX, newY) { this.sizeX = newX; this.sizeY = newY; document.getElementById(this.name).style.height = newY; document.getElementById(this.name).style.width = newX; },
            scaleinT : function (newX, unitX, newY, unitY, ms) {
                const FrameTime = 5;let nbFrame = ms / FrameTime;let X1 = parseInt(this.sizeX);let Y1 = parseInt(this.sizeY);let XperF = (newX - X1) / nbFrame;let YperF = (newY - Y1) / nbFrame;let tempThis = this;
                for(let i = 1 ;i <= nbFrame; i++){setTimeout(function() {tempThis.scale((X1 + (XperF * i)) + unitX  , (Y1 + (YperF * i)) + unitY)}, FrameTime * i);}
                setTimeout(function() { tempThis.scale(newX + unitX  , newY + unitY) }, ms); },
            rotate : function (newdeg) { this.deg = newdeg; document.getElementById(this.name).style.transform = "rotate("+newdeg+"deg)"; },
            rotateinT : function (newdeg, ms) {
                const FrameTime = 5;let nbFrame = ms / FrameTime;let D1 = this.deg;let DperF = (newdeg - D1) / nbFrame;let tempThis = this;
                for(let i = 1 ;i <= nbFrame; i++){setTimeout(function() {tempThis.rotate((D1 + (DperF * i)))}, FrameTime * i);}
                setTimeout(function() { tempThis.rotate(newdeg) }, ms); },
            changePicture : function (link) { this.picture = link; document.getElementById(this.name).innerHTML = "<img src='" + link + "' alt='" + this.name + "' style='height:100%;width:100%;'>"; },
            onclick : function (callback) { document.getElementById(this.name).addEventListener("click", callback); }
        }
        /*GAME.OBJ[_name].name = _name
        GAME.OBJ[_name].sizeX = _sizeX
        GAME.OBJ[_name].sizeY = _sizeY
        GAME.OBJ[_name].posX = _posX
        GAME.OBJ[_name].posY = _posY
        GAME.OBJ[_name].deg = _deg
        GAME.OBJ[_name].picture = _picture*/
        GAME.SCENE.innerHTML += "<div id='" + _name + "' style='position:absolute;height:" + _sizeY + ";width:" + _sizeX + ";bottom:" + _posY + ";left:" + _posX + ";'></div>"
        if(_picture != null){ document.getElementById(_name).innerHTML = "<img src='" + _picture + "' alt='" + _name + "' style='height:100%;width:100%;'>" }
    },

    clearSCENE : function () {
        GAME.OBJ = {}
        GAME.SCENE.innerHTML = ""
    },

    COLLIDER : {
        FIXE : {
            POINTinBOX : function (pointX, pointY, objet) {
                if (pointX >= objet.posX && pointX < objet.posX + objet.sizeX && pointY >= objet.posY && pointY < objet.posY + objet.sizeY) { return true }
                else { return false }

            },
            BOXwithBOX : function (objet1, objet2) {
                if((objet2.posX >= objet1.posX + objet1.sizeX) || (objet2.posX + objet2.sizeX <= objet1.posX) || (objet2.posY >= objet1.posY + objet1.sizeY) || (objet2.posY + objet2.sizeY <= objet1.posY)) { return false }
                else { return true }
            }
        },
        ORINTED : {
            POINTinBOX : function (pointX, pointY, objet) {
                let points = [{x: objet.posX,y: objet.posY}, {x: objet.posX + objet.sizeX,y: objet.posY}, {x: objet.posX + objet.sizeX,y: objet.posY + objet.sizeY}, {x: objet.posX,y: objet.posY + objet.sizeY}]
                for(let i = 0;i < points.lenght;i++){
                    let pointA = points[i]
                    if(i == points.lenght - 1) { let pointB = points[0] } else { let pointB = points[i + 1] }
                    let vecteurAB = { x: pointB.x - pointA.x, y: pointB.y - pointA.y }
                    let vecteurAP = { x: pointX - pointA.x, y: pointY - pointA.y }
                    if(((vecteurAB.x * vecteurAP.y) - (vecteurAB.y * vecteurAP.x)) < 0){ return false }
                }
                return true
            },
            BOXwithBOX : function (objet1, objet2){
                let points1 = [{x: objet1.posX,y: objet1.posY}, {x: objet1.posX + objet1.sizeX,y: objet1.posY}, {x: objet1.posX + objet1.sizeX,y: objet1.posY + objet1.sizeY}, {x: objet1.posX,y: objet1.posY + objet1.sizeY}]
                let points2 = [{x: objet2.posX,y: objet2.posY}, {x: objet2.posX + objet2.sizeX,y: objet2.posY}, {x: objet2.posX + objet2.sizeX,y: objet2.posY + objet2.sizeY}, {x: objet2.posX,y: objet2.posY + objet2.sizeY}]
                for(let j = 0;j < points1.lenght;j++){
                    pointX = points1[j].x
                    pointY = points1[j].y
                    for(let i = 0;i < points2.lenght;i++){
                        let pointA = points2[i]
                        if(i == points2.lenght - 1) { let pointB = points2[0] } else { let pointB = points2[i + 1] }
                        let vecteurAB = { x: pointB.x - pointA.x, y: pointB.y - pointA.y }
                        let vecteurAP = { x: pointX - pointA.x, y: pointY - pointA.y }
                        if(((vecteurAB.x * vecteurAP.y) - (vecteurAB.y * vecteurAP.x)) < 0){ return false }
                    }
                }
                for(let j = 0;j < points2.lenght;j++){
                    pointX = points2[j].x
                    pointY = points2[j].y
                    for(let i = 0;i < points1.lenght;i++){
                        let pointA = points1[i]
                        if(i == points1.lenght - 1) { let pointB = points1[0] } else { let pointB = points1[i + 1] }
                        let vecteurAB = { x: pointB.x - pointA.x, y: pointB.y - pointA.y }
                        let vecteurAP = { x: pointX - pointA.x, y: pointY - pointA.y }
                        if(((vecteurAB.x * vecteurAP.y) - (vecteurAB.y * vecteurAP.x)) < 0){ return false }
                    }
                }
                return true
            }
        }
    },

    KEYBOARD : {
        __value__ : {
            A:{code:65,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            B:{code:66,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            C:{code:67,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            D:{code:68,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            E:{code:69,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            F:{code:70,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            G:{code:71,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            H:{code:72,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            I:{code:73,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            J:{code:74,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            K:{code:75,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            L:{code:76,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            M:{code:77,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            N:{code:78,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            O:{code:79,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            P:{code:80,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            Q:{code:81,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            R:{code:82,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            S:{code:83,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            T:{code:84,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            U:{code:85,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            V:{code:86,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            W:{code:87,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            X:{code:88,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            Y:{code:89,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            Z:{code:90,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            ESPACE:{code:32,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            ENTER:{code:13,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            UP:{code:38,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            DOWN:{code:40,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            RIGHT:{code:39,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            LEFT:{code:37,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            number0:{code:48,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            number1:{code:49,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            number2:{code:50,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            number3:{code:51,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            number4:{code:52,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            number5:{code:53,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            number6:{code:54,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            number7:{code:55,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            number8:{code:56,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            number9:{code:57,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            numpad0:{code:96,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            numpad1:{code:97,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            numpad2:{code:98,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            numpad3:{code:99,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            numpad4:{code:100,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            numpad5:{code:101,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            numpad6:{code:102,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            numpad7:{code:103,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            numpad8:{code:104,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            numpad9:{code:105,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            numpadDIVIDE:{code:111,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            numpadMULTIPLY:{code:106,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            numpadLESS:{code:109,ispressed:false,onkeydown:function(){},onkeyup:function(){}},
            numpadMORE:{code:107,ispressed:false,onkeydown:function(){},onkeyup:function(){}}
        },

        onkeyup : function (keyname, callback) {
            if(GAME.KEYBOARD.__value__[keyname] != null){
                GAME.KEYBOARD.__value__[keyname].onkeyup = callback;
                return true;
            } else { return false; }
        },

        onkeydown : function (keyname, callback) {
            if(GAME.KEYBOARD.__value__[keyname] != null){
                GAME.KEYBOARD.__value__[keyname].onkeydown = callback;
                return true;
            } else { return false; }
        },

        iskeypressed : function (keyname) {
            if(GAME.KEYBOARD.__value__[keyname] != null){
                return GAME.KEYBOARD.__value__[keyname].ispressed;
            } else { return false; }
        },

        __keydown__ : function (event) {
            for(let key in GAME.KEYBOARD.__value__){
                if(GAME.KEYBOARD.__value__[key].code == event.code){
                    GAME.KEYBOARD.__value__[key].onkeydown();
                    GAME.KEYBOARD.__value__[key].ispressed = true;
                }
            }
        },

        __keyup__ : function (event) {
            for(let key in GAME.KEYBOARD.__value__){
                if(GAME.KEYBOARD.__value__[key].code == event.code){
                    GAME.KEYBOARD.__value__[key].onkeyup();
                    GAME.KEYBOARD.__value__[key].ispressed = false;
                }
            }
        }
    },

    /*__functionality__ : {
        show : function (_name) { document.getElementById(_name).style.display = "block" },
        hide : function (_name) { document.getElementById(_name).style.display = "none" },
        move : function (_name, newX, unitX, newY, unitY, ms) {

            const FrameTime = 1000;
            let nbFrame = ms / FrameTime;
            let X1 = parseInt(GAME.OBJ[_name].posX);
            let Y1 = parseInt(GAME.OBJ[_name].posY);
            let XperF = (newX - X1) / nbFrame;
            let YperF = (newY - Y1) / nbFrame;

            for(let i = 1 ;i <= nbFrame; i++){
                setTimeout(function() {
                    GAME.__functionality__.teleport(_name, (X1 + (XperF * i)) + unitX  , (Y1 + (YperF * i)) + unitY)
                }, FrameTime * i);
            }

            // if MS mod FrameTime != 0 --> do :
            setTimeout(function() { GAME.__functionality__.teleport(_name, newX + unitX  , newY + unitY) }, ms);

        },
        teleport : function (_name, newX, newY) { GAME.OBJ[_name].posX = newX; GAME.OBJ[_name].posY = newY; document.getElementById(_name).style.bottom = newY; document.getElementById(_name).style.left = newX; },
        scale : function (_name, newX, unitX, newY, unitY, ms) {

            /*const FrameTime = 1000;
            let nbFrame = ms / FrameTime;
            let X1 = parseInt(this.sizeX);
            let Y1 = parseInt(this.sizeY);
            let XperF = (newX - X1) / nbFrame;
            let YperF = (newY - Y1) / nbFrame;
            let tempThis = this

            for(let i = 1 ;i <= nbFrame; i++){
                setTimeout(function() {
                    tempThis.teleport((X1 + (XperF * i)) + unitX  , (Y1 + (YperF * i)) + unitY)
                }, FrameTime * i);
            }*//*
            

        },
        changeSize : function (_name, newX, newY) { GAME.OBJ[_name].sizeX = newX; GAME.OBJ[_name].sizeY = newY; document.getElementById(_name).style.height = newY; document.getElementById(_name).style.width = newX; },
        rotate : function (_name, newdeg, second) {},
        turn : function (_name, newdeg) { GAME.OBJ[_name].deg = newdeg; document.getElementById(_name).style.transform = "rotate("+newdeg+"deg)"; },
        changePicture : function (_name, link) { GAME.OBJ[_name].picture = link; document.getElementById(_name).innerHTML = "<img src='" + link + "' alt='" + _name + "' style='height:100%;width:100%;'>"; }
    }*/
}

// ===================== SETUP =======================
GAME.SCENE.addEventListener("keydown", function (event) {
    GAME.KEYBOARD.__keydown__(event);
});
GAME.SCENE.addEventListener("keyup", function (event) {
    GAME.KEYBOARD.__keyup__(event);
});