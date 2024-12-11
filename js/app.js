const bodyElem = document.querySelector('body');
const headElem = document.querySelector('head');
const titleElem = document.querySelector('title');
const commentsElem = document.querySelector('#cmnt-sect');

const clickElems = {
    cmntBttn : document.querySelector('#cmnt-bttn'),
    player : document.querySelector('#ply'),
    npc : document.querySelector('.npc'),
    firstHint : document.querySelector('#fst-clue'),
    dLogBox : document.querySelector('.d-log-box'),
}

const openingStuff = [
    'error: nothing to post',   // iC=0
                                // iC=1
                                // iC=2
                                // iC=3
                                // iC=4
                                // iC=5
    "okay, this is getting annoying. What are you doing?", // iC=6
    "Hey! I said stop!", // iC=7
    "Enough! I'm taking away your button.<br>Let's talk.", // iC=8
    "" // iC=9
];

const worldRooms = {
    'index' : {
        'portals' : [
            'head-space',
            'comments'
        ]
    },
    'head-space' : {
        'portals' : [
            'link-zone',
            'index',
            'source zone'
        ]
    },
    'link-zone' : {
        'portals' : [
            'head-space',
            'the cascade'
        ]
    },
    'the cascade' : {
        'portals' : [
            'link-zone'
        ]
    },
    'the DMV' : {

    },
    'style city' : {

    },
}



let introCounter = 0;
let dBoxOpen=false;
const clickHandler = (event) => {
    


    

    switch(event.target){
        case clickElems.cmntBttn :

            break;
        case clickElems.player :
            if(!dBoxOpen){
                const tmpDLBoxP=document.createElement('div');
                tmpDLBoxP.setAttribute('class','d-log-box');
                tmpDLBoxP.textContent = "hi!";
                clickElems.dLogBox = tmpDLBoxP;
                commentsElem.appendChild(tmpDLBoxP);
                dBoxOpen=true;
            }
            break;
        case clickElems.npc :
            if(!dBoxOpen){
                const tmpDLBoxP=document.createElement('div');
                tmpDLBoxP.setAttribute('class','d-log-box');
                tmpDLBoxP.textContent = "hi!";
                clickElems.dLogBox = tmpDLBoxP;
                commentsElem.appendChild(tmpDLBoxP);
                dBoxOpen=true;
            }
            break;
        case clickElems.firstHint :
            break;
        case clickElems.dLogBox :
            clickElems.dLogBox.remove();
            dBoxOpen=false;
            break;
        default:
            console.log("hi! :3");
    }
};

const playerData = {
    x: 0,
    y: 0,
    facing: "R",
}

const playerFaces = {
    L:'&lpar;⁰̑.&ThinSpace;⁰̑&ThinSpace;&rpar;&rsaquo;',
    R:'&lsaquo;&lpar;&ThinSpace;̑º&ThinSpace;.̑º&rpar;',
    U:' /̱(一)̱',
    D:'&lpar;&ThinSpace;&ThinSpace;.&rpar;',
}

let keyDownAny = false;
let keysDownNow=[];

bodyElem.addEventListener('click',clickHandler);

let keysPressed = {};

document.addEventListener('keydown', move = (ev) => {


    keysPressed[ev.key]=true;


    keyDownAny=true;

});

document.addEventListener('keyup', stop=(ev)=>{
    keysPressed[ev.key]=false;
    if(Object.keys(keysPressed).length===0){
        keyDownAny=false;
    };
});

// document.addEventListener('keydown',()=>{
    setInterval(()=>{
        if(keysPressed.ArrowUp==true){
            playerData.y=playerData.y-5
            // playerData.facing='U'
        }else if(keysPressed.ArrowDown==true){
            playerData.y=playerData.y+5
            // playerData.facing='D'
        }
        
        if(keysPressed.ArrowLeft==true&&playerData.x>=0){
            playerData.x=playerData.x-5
            playerData.facing='L'
        }else if(keysPressed.ArrowRight==true){
            playerData.x=playerData.x+5
            playerData.facing='R'
        }

        clickElems.player.style.transform = `translate(${playerData.x}px, ${playerData.y}px)`
        clickElems.player.innerHTML=playerFaces[playerData.facing]
    }, 50);
// })