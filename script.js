//your JS code here. If required.
let quoteDisplayDiv=document.getElementsByClassName('quote-display')[0];
let showTimer=document.querySelector('.timer');
const quoteInput=document.getElementById('quoteInput');

async function getQuotes(){
let response=await fetch('http://api.quotable.io/random');
let data=await response.json();
// console.log(data.content);
return data.content;
}

async function showQuotes(){
    let quotes=await getQuotes();
    console.log('added')
    quoteDisplayDiv.innerHTML="";
    let quotesArr=quotes.split("");
    quotesArr.forEach((char)=>{
        let charElm=document.createElement('span');
        charElm.innerText=char;
        quoteDisplayDiv.append(charElm);
    })
    // quoteDisplayDiv.innerHTML=quotes;
    quoteInput.value="";
    startTimer();
}

showQuotes();

let start;
let timer;
function startTimer(){
showTimer.innerText=0;
start=new Date();
timer=setInterval(()=>{
  showTimer.innerText=Math.floor((new Date()-start)/1000);
},1000);
}


quoteInput.addEventListener('input',()=>{
    const userInput=quoteInput.value.split("");
    const quotesArray=quoteDisplayDiv.querySelectorAll('span');

    console.log(userInput,quotesArray);
  let isCorrect=true;
    quotesArray.forEach((charSpan,index)=>{
        let character=userInput[index];

        if(character===null){
            isCorrect=false;
            charSpan.classList.add('incorrect');
            charSpan.classList.remove('correct');
        }
        else if(character===charSpan.innerText){
            charSpan.classList.add('correct');
            charSpan.classList.remove('incorrect');
        }
        else{
          isCorrect=false;
          charSpan.classList.add('incorrect');
          charSpan.classList.remove('correct');
        }
    })

    if(quotesArray.length===userInput.length && isCorrect){
        clearInterval(timer);
        setTimeout(showQuotes,3000);
    }
})