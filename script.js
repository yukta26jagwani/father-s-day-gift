const content = document.getElementById("content");

const sequence = [
    {
        type:"photo",
        value:"photos/photo1.jpeg"
    },
    {
        type:"photo",
        value:"photos/photo2.jpeg"
    },
    {
        type:"message",
        value:"Papa, thank you har ek cheez ke liye, maine aaj tak jo maanga hai aapne sab kuch diya hai merko. thankyou and i love you❤️"
    },
    {
        type:"photo",
        value:"photos/photo3.jpeg"
    },
    {
        type:"photo",
        value:"photos/photo4.jpeg"
    },
    {
        type:"voice"
    }
];

let current = 0;
let paused = false;
let waitingForResume = false;

function startSurprise(){

    document.getElementById("startPage").style.display="none";
    document.getElementById("surprisePage").style.display="block";

    document.getElementById("bgMusic").play();

    showBalloon();
}

function showBalloon(){

    content.innerHTML="";

    const balloon=document.createElement("div");

    balloon.className="balloon";
    balloon.innerHTML="Pop Me 🎈";

    balloon.onclick=()=>{

    confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
    });

    balloon.remove();
    showItem();
    };

    content.appendChild(balloon);
}

function showItem(){

    const item=sequence[current];

    const div=document.createElement("div");
    div.className="center";

    if(item.type==="photo"){

        div.innerHTML=
        `<img src="${item.value}" class="photo">`;

    }

    if(item.type==="message"){

        div.innerHTML=
        `<div class="message">${item.value}</div>`;

    }

    if(item.type==="voice"){

        div.innerHTML=
        `
        <h2>🎤 A Message For You</h2>
        <audio controls>
            <source src="audio/voice.mp3" type="audio/mpeg">
        </audio>
        `;
    }

    content.appendChild(div);
    const pauseBtn = document.createElement("button");

pauseBtn.innerHTML = "⏸ Pause";

pauseBtn.style.position = "absolute";
pauseBtn.style.bottom = "20px";
pauseBtn.style.right = "20px";
pauseBtn.style.padding = "10px 20px";

pauseBtn.onclick = (e)=>{

    e.stopPropagation();

    paused = true;

    pauseBtn.innerHTML = "▶ Continue";
};

content.appendChild(pauseBtn);

    current++;

   if(current < sequence.length){

    setTimeout(()=>{

        if(paused){
            waitingForResume = true;
        }else{
            showBalloon();
        }

    },3000);

}
}

document.addEventListener("click", () => {

    if(waitingForResume){
        paused = false;
        waitingForResume = false;
        showBalloon();
    }

});
