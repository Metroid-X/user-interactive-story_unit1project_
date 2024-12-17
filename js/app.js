const bodyElem = document.querySelector('body');
const gameElem = document.querySelector('#game-box');
const textBoxesElem = document.querySelector('#text-boxes');
const dLogElem = document.querySelector('#d-log-box');
const playerElems = {
    p1: document.querySelector('#p1-box'),
    p2: document.querySelector('#p2-box'),
}

let roundNumber=1;
let gameNum=1;

const actionStates = {
    atk: 0,
    chg1: 1,
    chg2: 2,
    idle: 3,
    parry: 4,
    shldBash: 5,
    stunned: 6,
    victory: 7,
    defeat: 8,
}

const fighters = {
    knight:{
        sprites:[
            '-sprite-atk.png',
            '-sprite-chg-atk-frame1.png',
            '-sprite-chg-atk-frame2.png',
            '-sprite-idle.png',
            '-sprite-parry.png',
            '-sprite-parry.png',
            '-sprite-idle.png',
            '-sprite-chg-atk-frame1.png',
            '-sprite-parry.png',
        ],
    },
}


const pData = {
    p1:{
        sprElem: document.querySelector('#p1'),
        sprites:[
            './p1/p1'+fighters.knight.sprites[0],
            './p1/p1'+fighters.knight.sprites[1],
            './p1/p1'+fighters.knight.sprites[2],
            './p1/p1'+fighters.knight.sprites[3],
            './p1/p1'+fighters.knight.sprites[4],
            './p1/p1'+fighters.knight.sprites[5],
            './p1/p1'+fighters.knight.sprites[6],
            './p1/p1'+fighters.knight.sprites[7],
            './p1/p1'+fighters.knight.sprites[8],
        ],
        hp:{
            val: 400,
            barElem: playerElems.p1.querySelector('.hp-val'),
            txtElem: playerElems.p1.querySelector('p'),
            numElem: playerElems.p1.querySelector('#p1-hp'),
            cndElem: playerElems.p1.querySelector('span1'),
        },
        name:'P1',
        state: actionStates.idle,
        wins: 0,
        stunNext: 0,
    },
    p2:{
        sprElem: document.querySelector('#p2'),
        sprites:[
            './p2/p2'+fighters.knight.sprites[0],
            './p2/p2'+fighters.knight.sprites[1],
            './p2/p2'+fighters.knight.sprites[2],
            './p2/p2'+fighters.knight.sprites[3],
            './p2/p2'+fighters.knight.sprites[4],
            './p2/p2'+fighters.knight.sprites[5],
            './p2/p2'+fighters.knight.sprites[6],
            './p2/p2'+fighters.knight.sprites[7],
            './p2/p2'+fighters.knight.sprites[8],
        ],
        hp:{
            val: 400,
            barElem: playerElems.p2.querySelector('.hp-val'),
            txtElem: playerElems.p2.querySelector('p'),
            numElem: playerElems.p2.querySelector('#p2-hp'),
            cndElem: playerElems.p2.querySelector('span1'),
        },
        name:'P2',
        state: actionStates.idle,
        wins: 0,
        stunNext: 0,
    },
}



/* This is still here for reference so we know what the turn state numbers are/should be for.
const turnStates = [
    0,// nobody's turn; this state will later be used as the character selection screen.
    1,// turn select move phase.
    2,// turn animation bgn phase.
    3,// turn animation mid phase.
    4,// turn animation end phase.
];
*/

let playerTurn = 0; //playerTurn=0 is p1's turn, playerTurn=1 is p2's turn

let turnState = 0;


// the search array for objects that actually need to do stuff when clicked. It gets used in a while{} loop further down.
const srchArr = [
    document.querySelector('#op-1'),
    document.querySelector('#op-2'),
    document.querySelector('#op-3'),
    document.querySelector('#op-4'),
    dLogElem,
    bodyElem // this reference is only here as a failsafe in case the while loop somehow can't find any of the above indexes in its search, so having the body element allows the while loop to close if it fails.
]

const randInt = (min,max) => {
    if(min===undefined){
        min=0;
    }

    let randoms=[
        Math.round(min+Math.random()*(max-min)),
        Math.round(min+Math.random()*(max-min)),
        Math.round(min+Math.random()*(max-min)),
        Math.round(min+Math.random()*(max-min)),
        Math.round(min+Math.random()*(max-min)),
        Math.round(min+Math.random()*(max-min)),
    ]

    return randoms[Math.round(Math.random()*(randoms.length-1))];
}


pData.p1.hp.barElem.style.width=''+(pData.p1.hp.val/4)+'%'
pData.p2.hp.barElem.style.width=''+(pData.p2.hp.val/4)+'%'


const dLogClass = {
    select: 'd-log-box-b',
    animate: 'd-log-box-a',
}

const players = [
    'p1',
    'p2'
]

gameElem.addEventListener('click',(e)=>{
    if(turnState===1){
        playerTurn=0
    }else if(turnState===2){
        playerTurn=1
    }
    let playerStored = pData[players[playerTurn]];
    let enemyStored = pData[players[Math.abs(playerTurn-1)]];
    
    if((pData.p1.hp.val>0&&pData.p2.hp.val>0)|turnState<=0){
        if(turnState<=0){
            if(turnState===-1){
                roundNumber=0;
                pData.p1.hp.val=400;
                pData.p2.hp.val=400;
                pData.p1.state=actionStates.idle;
                pData.p2.state=actionStates.idle;
                pData.p1.sprElem.src=pData.p1.sprites[pData.p1.state];
                pData.p2.sprElem.src=pData.p2.sprites[pData.p2.state];
                gameNum++;
            }
            turnState=1;

            dLogElem.querySelector('h1').remove()
            let newInner = document.createElement('p');
            newInner.innerHTML=`Round ${roundNumber}. It's ${pData[players[playerTurn]].name}'s turn.`
            newInner.setAttribute('class','first-line')
            dLogElem.appendChild(newInner)
            newInner = document.createElement('p');
            newInner.innerHTML="select your move."
            newInner.setAttribute('class','mid-line')
            dLogElem.appendChild(newInner)
            newInner = document.createElement('p');
            newInner.innerHTML=`Game no.${gameNum}`
            newInner.setAttribute('class','last-line')
            dLogElem.appendChild(newInner)
            dLogElem.setAttribute('class',dLogClass.select)
            
            console.log('end step '+(turnState-1)+' in turn cycle')
            console.log('player'+(1+playerTurn)+"'s turn")
        }else{

            
            
                
            

            console.log('')
            console.log('start step '+(turnState)+' in turn cycle')
            
            // The following code cycles through the objects in the search array until it finds one in the event path, then it sets a variable of the checked object through the path array.

            let ii=0; 
            //this is just a temporary variable for the while loop similar to how you would use i on a for loop.

            let evPath = e.composedPath();
            // this is just a shorthand variable for the event path array so we don't need to type out 'e.composedPath()' each time we want to reference it.

            while(evPath.indexOf(srchArr[ii])===-1){ii++} 
            // this loop cycles through the search array until it finds that a searchable element in the path array.

            let trueTarg=srchArr[ii]
            // this sets the intended target of the event to the correct element in the path, based on
            
            if(turnState===1|turnState===2){
                if(turnState===1){
                    playerTurn=0
                }else if(turnState===2){
                    playerTurn=1
                }
                playerStored = pData[players[playerTurn]];
                enemyStored = pData[players[Math.abs(playerTurn-1)]];
                switch(playerStored.state){
                    case actionStates.stunned:
                        dLogElem.setAttribute('class',dLogClass.animate);
                        turnState=turnState+1
                        break;
                    case actionStates.chg1:
                        dLogElem.setAttribute('class',dLogClass.animate);
                        playerStored.state=actionStates.chg2
                        turnState=turnState+1
                        break;
                    default:
                        
                        switch(trueTarg.id){
                            case 'op-1':
                                
                                playerStored.state = actionStates.chg1;

                                console.log('option 1');
                                turnState++
                                break;
                            case 'op-2':
                                
                                playerStored.state = actionStates.parry;

                                console.log('option 2');
                                turnState++;
                                break;
                            case 'op-3':
                                
                                playerStored.state = actionStates.atk;

                                console.log('option 3');
                                turnState++
                                break;
                            case 'op-4':
                                
                                playerStored.state = actionStates.shldBash;

                                console.log('option 4');
                                turnState++
                                break;
                            default:
                                console.log('no action');
                                
                        }
                        
                        if(turnState>2){
                            dLogElem.setAttribute('class',dLogClass.animate);
                        }else{
                            dLogElem.setAttribute('class',dLogClass.select);
                        }
                        if(turnState==2&&pData.p2.state===actionStates.stunned){
                            dLogElem.setAttribute('class',dLogClass.animate);
                            turnState++
                        }
                        console.log('end step '+(turnState)+' in turn cycle')
                }
                
            }else{
                let brOrNot = ['','<br><br>']
                playerTurn=0;
                let dmg;
                switch(turnState){
                    case 3:
                        dLogElem.querySelector('.mid-line').innerHTML='';
                        for(i=0;i<2;i++){
                            tmpNME=[playerStored,enemyStored][i]
                            tmpPLY=[enemyStored,playerStored][i]
                            switch(tmpPLY.state){
                                case actionStates.atk:
                                    dLogElem.querySelector('.mid-line').innerHTML+=`${brOrNot[i]}${tmpPLY.name} slashed at ${tmpNME.name} with their sword.`;
                                    if(tmpNME.state===actionStates.parry){
                                        dLogElem.querySelector('.mid-line').innerHTML+=`<br><br>${tmpNME.name} was prepared for the attack!`
                                        dmg=randInt(7.5,15);
                                    }else{
                                        dmg=randInt(15,30);
                                    }
                                    tmpNME.hp.val-=dmg
                                    dLogElem.querySelector('.mid-line').innerHTML+=`<br><br>${tmpNME.name} took ${dmg} pts of  damage!`
                                    break;
                                case actionStates.chg1:
                                    dLogElem.querySelector('.mid-line').innerHTML+=`${brOrNot[i]}${tmpPLY.name} began preparing a mighty blow...`;

                                    break;
                                case actionStates.chg2:
                                    dLogElem.querySelector('.mid-line').innerHTML+=`${brOrNot[i]}${tmpPLY.name} unleashed a Greatslash!!`;

                                    if(tmpNME.state===actionStates.parry){
                                        dLogElem.querySelector('.mid-line').innerHTML+=`<br><br>${tmpNME.name} was prepared for the attack!<br><br>`
                                        dmg=randInt(15,30);
                                        tmpPLY.stunNext=1;
                                    }else{
                                        dmg=randInt(30,60);
                                    }
                                    tmpNME.hp.val-=dmg
                                    dLogElem.querySelector('.mid-line').innerHTML+=`${tmpNME.name} took ${dmg} pts of  damage!`
                                    break;
                                case actionStates.parry:
                                    
                                    
                                    if(tmpNME.state===(actionStates.parry||actionStates.stunned||actionStates.chg1)){
                                        dLogElem.querySelector('.mid-line').innerHTML+=`${brOrNot[i]}${tmpPLY.name} was prepared for an attack, but none occured!`;
                                        tmpPLY.stunNext=1;
                                    }
                                    break;
                                case actionStates.shldBash:

                                    dLogElem.querySelector('.mid-line').innerHTML+=`${brOrNot[i]}${tmpPLY.name} bashed ${tmpNME.name} with their sheild!`;
                                    
                                    let dmgb = randInt(30,60);
                                    let recoil = Math.round(dmgb/2);
                                    
                                    if(tmpNME.state===actionStates.parry){
                                        dLogElem.querySelector('.mid-line').innerHTML+=`<br><br>${tmpNME.name} was prepared for the attack!<br><br>`
                                        dmg=recoil;
                                        tmpPLY.stunNext=1;
                                    }else{
                                        dLogElem.querySelector('.mid-line').innerHTML+=`<br><br>`
                                        dmg=dmgb;
                                    }

                                    tmpNME.hp.val-=dmg;
                                    tmpPLY.hp.val-=recoil;
                                    
                                    dLogElem.querySelector('.mid-line').innerHTML+=`${tmpNME.name} took ${dmg} pts of  damage!<br><br>${tmpPLY.name} is hit with ${recoil} pts of recoil.`

                                    break;
                                case actionStates.stunned:
                                    dLogElem.querySelector('.mid-line').innerHTML+=`${brOrNot[i]}${tmpPLY.name} is recovering from their disadvantage!`;
                                    break;
                                    
                            }
                        }
                        tmpPLY.sprElem.src=tmpPLY.sprites[tmpPLY.state];
                        turnState++
                        break;
                    case 4:
                        
                        for(i=0;i<2;i++){
                            tmpPLY=[playerStored,enemyStored][i]
                            tmpNME=[enemyStored,playerStored][i]
                            switch(tmpPLY.state){
                                case actionStates.atk:
                                    if(tmpNME.state===actionStates.parry){
                                        tmpPLY.state=actionStates.stunned;
                                    }else{
                                    }
                                    break;

                                case actionStates.chg1:
                                    
                                    break;

                                case actionStates.chg2:

                                    if(tmpNME.state===actionStates.parry){
                                        tmpPLY.state=actionStates.stunned;
                                    }else{
                                    }
                                    break;

                                case actionStates.parry:
                                    if(tmpNME.state===(actionStates.parry||actionStates.chg1||actionStates.stunned)){
                                        tmpPLY.state=actionStates.stunned;
                                        
                                    }else{
                                        
                                    }
                                    break;

                                case actionStates.shldBash:
                                    if(tmpNME.state===actionStates.parry){
                                        tmpPLY.state=actionStates.stunned;
                                    }else{
                                    }
                                    break;

                                case actionStates.stunned:
                                    tmpPLY.state=actionStates.idle;
                                    break;
                                    
                                
                            }
                            if(tmpPLY.stunNext===1){
                                tmpPLY.state=actionStates.stunned
                            }
                            tmpPLY.stunNext=0;
                        }
                        turnState++
                        break;
                }
                playerStored.sprElem.src=playerStored.sprites[playerStored.state];
                enemyStored.sprElem.src=enemyStored.sprites[enemyStored.state];
                for(i=0;i<2;i++){
                    tmpPLY=[enemyStored,playerStored][i];
                    
                    if(tmpPLY.state===actionStates.stunned){
                        tmpPLY.hp.cndElem.innerHTML='HP: ///';
                        
                        dLogElem.querySelector('.mid-line').innerHTML+=`<br><br>${tmpPLY.name} is at a disadvantage!`;
                    }else{
                        tmpPLY.hp.cndElem.innerHTML='HP:';
                        
                        
                    }
                }
                
                console.log('pass dialogue')
            }
            

            playerStored=pData[players[playerTurn]];
            enemyStored = pData[players[Math.abs(playerTurn-1)]];
            console.log('player'+(1+playerTurn)+"'s turn");
        }
        if(turnState<3){
            dLogElem.querySelector('.first-line').innerHTML=`Round ${roundNumber}. It's ${'P'+turnState}'s turn.`;
            // if(playerStored.state===actionStates.stunned){
            //     dLogElem.querySelector('.mid-line').innerHTML="You're at a disadvantage!<br><br>You cannot move!"
            // }else if(playerStored.state===actionStates.chg1){
            //     dLogElem.querySelector('.mid-line').innerHTML="You're almost ready to unleash your attack!"
            // }else{
                dLogElem.querySelector('.mid-line').innerHTML="select your move."
            // }
        }else{
            dLogElem.querySelector('.first-line').innerHTML=''
            dLogElem.querySelector('.first-line').innerHTML=`round ${roundNumber} start`;
            if(turnState===5){
                roundNumber++;
                turnState=1;
                for(i=0;i<2;i++){
                    tmpPLY=[playerStored,enemyStored][i]
                    tmpNME=[enemyStored,playerStored][i]
                    switch(tmpPLY.state){
                        case actionStates.stunned:tmpPLY.state=actionStates.stunned
                            break;
                        case actionStates.chg1:
                            break;
                        default:
                            tmpPLY.state=actionStates.idle
                    }
                    tmpPLY.sprElem.src=tmpPLY.sprites[tmpPLY.state];
                }
            }
            
        }
        console.log(turnState);
    }else
    if(turnState>0&&(pData.p1.hp.val<=0|pData.p2.hp.val<=0)){
        dLogElem.querySelector('.first-line').remove();
        dLogElem.querySelector('.mid-line').remove();
        dLogElem.querySelector('.last-line').remove();
        let victoryTxt=document.createElement('h1');
        if(pData.p1.hp.val<=0&&pData.p2.hp.val>0){
            pData.p1.hp.val=0;
            pData.p1.state=actionStates.defeat;
            pData.p2.state=actionStates.victory;
            victoryTxt.innerHTML='Player 2 Wins!!!';
            pData.p2.wins++
        }else if(pData.p2.hp.val<=0&&pData.p1.hp.val>0){
            pData.p2.hp.val=0;
            pData.p1.state=actionStates.victory;
            pData.p2.state=actionStates.defeat;
            victoryTxt.innerHTML='Player 1 Wins!!!';
            pData.p1.wins++
        }else if(pData.p2.hp.val<=0&&pData.p1.hp.val<=0){
            pData.p1.hp.val=0;
            pData.p2.hp.val=0;
            pData.p1.state=actionStates.defeat;
            pData.p2.state=actionStates.defeat;
            victoryTxt.innerHTML='Draw - Nobody Wins!!!';
        }
        let playAgain = document.createElement('p')
        playAgain.style.fontSize='20px'
        playAgain.style.textAlign='center'
        playAgain.innerHTML='Click To Play Again'
        victoryTxt.appendChild(playAgain);
        dLogElem.appendChild(victoryTxt);
        pData.p1.sprElem.src=pData.p1.sprites[pData.p1.state];
        pData.p2.sprElem.src=pData.p2.sprites[pData.p2.state];
        turnState=-1
    }
    pData.p1.hp.barElem.style.width=`${(pData.p1.hp.val/4)}%`;
    pData.p2.hp.barElem.style.width=`${(pData.p2.hp.val/4)}%`;
    
    pData.p1.hp.numElem.innerHTML=`${(pData.p1.hp.val)}/400`;
    pData.p2.hp.numElem.innerHTML=`${(pData.p2.hp.val)}/400`;
    
    console.log(pData.p1.hp.barElem.style.width);
    
});