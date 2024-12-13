const gameElem = document.querySelector('#game-box');
const bodyElem = document.querySelector('body');

const buttonElems = {
    op1: document.querySelector('#op-1'),
    op2: document.querySelector('#op-2'),
    op3: document.querySelector('#op-3'),
    op4: document.querySelector('#op-4'),
    dLogBox: document.querySelector('#d-log-box'),
}

gameElem.addEventListener('click',(e)=>{

    let evTarg = e.target;

    if(evTarg.parentElement.parentElement.id=='text-boxes'){
        switch(evTarg.parentElement.id){
            case 'op-1':
                console.log(1)
                break;
            case 'op-2':
                console.log(2)
                break;
            case 'op-3':
                console.log(3)
                break;
            case 'op-4':
                console.log(4)
                break;
        }
    }else if(evTarg.id=='d-log-box'){
        console.log('dialogue')
    }
})