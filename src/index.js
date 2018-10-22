(function(apiUrl) {
  function fetchParrotsCount() {
    return fetch(apiUrl + "/messages/parrots-count")
      .then(function(response) {
        return response.json();
      })
      .then(function(count) {
        document.getElementById("parrots-counter").innerHTML = count;
      });
  }

  function listMessages() {
    return fetch(apiUrl + "/messages")
     .then(function(response){
        return response.json();
      })
      .then(function(dados){
        formatMessage(dados);
      });
      
    // Faz um request para a API de listagem de mensagens
    // Atualiza a o conteúdo da lista de mensagens
    // Deve ser chamado a cada 3 segundos
  };

  function parrotMessage(messageId) {
    return fetch(apiUrl + "/messages")
      .then(function(){

     });

    // Faz um request para marcar a mensagem como parrot no servidor
    // Altera a mensagem na lista para que ela apareça como parrot na interface
  }

  function sendMessage(message, authorId) {
    fetch(apiUrl + "/messages",{
      method:"POST",
      headers : {
        'Accept':'application/json','Content-Type': 'application/json' 
      }, body : JSON.stringify({"message" : message.value  , "author_id" : authorId})
    })
    .then(function(response){
      listMessages();
      window.alert("ENVIADO COM SUCESSO!!!");
    })
    .catch(function(err){
      window.alert("ERRO TENTE NOVAMENTE!!! ");
    });
        
    // Manda a mensagem para a API quando o usuário envia a mensagem
    // Caso o request falhe exibe uma mensagem para o usuário utilizando Window.alert ou outro componente visual
    // Se o request for bem sucedido, atualiza o conteúdo da lista de mensagens
  }

  function getMe() {
    return fetch(apiUrl + "/me")
        .then(function(response){
          return response.json();
        })
        .then(function(dado){
          document.images.namedItem("imgAuthor_send").setAttribute("src",dado['avatar']);
          getIdUser = dado['id'];
        });
    // Faz um request para pegar os dados do usuário atual
    // Exibe a foto do usuário atual na tela e armazena o seu ID para quando ele enviar uma mensagem
  }

  
  let getIdUser;

  const formatMessage = (dados) => {
    var myObject = dados;
    let outt = "<div id='list-message' class='list-messages' >";
        for (i in myObject){
           outt += "<input type='image' class='btn_parrot' src='images/light-parrot.svg'>" +
                   "<img class='imgMsg_List' src=" + ' "' + myObject[i]['author']['avatar'] + '" />' +
                   "<h3 class='textAuthor_List' >" + myObject[i]['author']['name'] + "</h3>" +
                   "<h3 class='textMsg_List' >" + myObject[i]['content'] + " </h3>" ;
                   if(i == 199) break;
        }
        outt += "</div>"
        
        document.getElementById("forma").innerHTML = outt;
  }


  

  function initialize() {
    getMe();
    fetchParrotsCount();
    setInterval(() =>{ listMessages(),3000})

document.getElementById("img_send").addEventListener("click",function(){
  let boxValue = document.querySelector("#box_send");
  sendMessage(boxValue,getIdUser);
})

  }
  initialize();
})("https://tagchatter.herokuapp.com");