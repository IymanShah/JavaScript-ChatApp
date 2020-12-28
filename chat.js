let user = "";
const keyInStore ="ChatHistory";
document.addEventListener("DOMContentLoaded", function(e) {
    
    while (user == "") {
      user = prompt("Please enter your Display Name");
    }
    document.querySelector("#displayName").value = user;
    //showMessages(user);
    const refreshInterval = setInterval(function() {
        showMessages(user)
      }, 1000)
  })

document.addEventListener("DOMContentLoaded", function(e) {
    let button = document.querySelector(".sendButton");
    let messageText = document.querySelector(".messageBox");

  });

function ProcessMessage(){
    let messageArea = document.querySelector(".messageBox"); 
    let currentMessage = {
        user: user,
        sentTime : Math.floor(new Date()),
        messageText:  messageArea.value
    }; 
    messageArea.value= "";
    CreateUiComponents(currentMessage);
    PostMessageToStorage(currentMessage);

}

function CreateUiComponents(message){
    let chatBlock = document.querySelector(".chat");
    
    let messageLi = document.createElement("li");
        //Create heading block
    let headingDiv = document.createElement("div");
    let userP = document.createElement("p");
    let timeSpan = document.createElement("span");
    userP.setAttribute("style","display: inline;float:left; margin:0px; font-weight:bold");
    userP.innerText = message.user;
    
    timeSpan.setAttribute("style","display: inline; float:left;margin-left:20px");
    timeSpan.innerText =  new Date(message.sentTime).toLocaleTimeString([],{hour: '2-digit', minute:'2-digit'});
    let messageDiv = document.createElement("div");

    headingDiv
    //Create Message Bloc    
    let messagespan = document.createElement("span");
    
    messagespan.setAttribute("style","display: inline-block");
    messageDiv.appendChild(messagespan);
    messagespan.innerText = message.messageText;
    messageLi.appendChild(userP);
    messageLi.appendChild(timeSpan);  
    messageLi.appendChild(messagespan);
    chatBlock.appendChild(messageLi);
}
function PostMessageToStorage(msgs){
    
    let messagesInStorage = grabMessages(keyInStore);
    if(messagesInStorage){

        messagesInStorage.push(msgs);
        localStorage.setItem(keyInStore, JSON.stringify(messagesInStorage));
    }
    else{
        let messageDetails = []; 
        messageDetails.push(msgs);
        localStorage.setItem(keyInStore, JSON.stringify(messageDetails));
    }
}

function submit(e) {

    if(document.querySelector(".messageBox").value && e.code === 'Enter'){
       ProcessMessage();
    }
}

function grabMessages(){
    return JSON.parse(localStorage.getItem(keyInStore));
}

function showMessages(usr){

    let messages = grabMessages(keyInStore);
    if(messages){
        let chatBlock = document.querySelector(".chat");
        chatBlock.innerHTML ="";
        messages.forEach(element => {
            CreateUiComponents(element);
        });
    }
   
}