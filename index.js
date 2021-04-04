const wa = require('@open-wa/wa-automate');
const dotenv = require('dotenv').config();
const fetch = require("node-fetch");

const launchConfig = {
    useChrome: true,
    autoRefresh:true,
    cacheEnabled:false,
    headless: false,
    disableSpins: true,
    hostNotificationLang: 'PT_BR',
    logConsole: false,
    popup: true,
    sessionId: 'hr'
}

var myMap = new Map();
var myState = new Map();
var myList = new Map();
var prevMsg = new Map();

const Url = "https://apiexamples.vtexcommercestable.com.br/api/catalog_system/pvt/products/GetProductAndSkuIds?categoryId=1&_from=1&_to=10";

function start(client) {
  client.onMessage(async message => {
    
    if(message.sender.isBusiness){
      myMap.set(message.from,message.sender.verifiedName);
    } else {
      myMap.set(message.from,message.sender.formattedName);
    }
    prevMsg.set(message.chatId,message.body); //Manter a mensagem Anterior

    switch (message.body){
    case 'Hi mormaii':
      await client.sendText(message.from, '👋 Oi, eu sou o Viny Garopaba, seu consultor automatizado Mormaii!  😃🛒');
      await client.sendText(message.from, 'Que bom falar com você '+myMap.get(message.from)+' ! Eu vou te auxiliar em nosso atendimento. Ok?');
      await client.sendText(message.chatId, '1 - Masculino\n2 - Feminino\n3 - Infantil\n4 - Equipamentos\n5 - Promoções\n6 - Digital Influencers\n7 - Fale com um Vendedor de Loja');
      await client.sendText(message.chatId, 'Digite MENU a qualquer momento para voltar para o menu principal.');
      console.log("Client:", client);
      break;
    
    case 'MENU':
      menu(client, message.chatId);
      break;

    case 'PAGO':
      await client.sendText(message.from, 'Aloha, Obrigado por sua preferência! Sinta-se Mormaii. #Mormaii 🌊');
      await fetch(Url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-VTEX-API-AppKey': process.env.APPKEY,
          'X-VTEX-API-AppToken': process.env.APPTOKEN
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      break;
    default:
      await client.sendText(message.from, 'Me desculpe, mas não entendi.... 🌊');
    }
  });
}

function menu(client, clientChatId){
  (async () => {
    await client.simulateTyping(message.chatId,true);
    await client.sendText(clientChatId, '1 - Masculino\n2 - Feminino\n3 - Infantil\n4 - Equipamentos\n5 - Promoções\n6 - Digital Influencers\n7 - Fale com um Vendedor de Loja');
    await client.sendText(clientChatId, 'Digite MENU a qualquer momento para voltar para o menu principal.');
    await client.simulateTyping(message.chatId,false);
    client.onMessage(async message2 => {
      console.log("AQUI >> ",message2);
      subcategories(client,message2.chatId);
    })
  });
}

function subcategories(client, clientChatId){
  (async () => {
    dataUrl = "http://www.irimageco.com/wp-content/uploads/2019/01/Under-Construction-Sign-for-Locator-300x141.png"; //Under Construction Image URL
    switch (recieved){
      case '1':
          await client.sendText(clientChatId, '1 - Camisetas👕 \n2 - Bermudas🩳\n3 - Calçados👞\n4 - Relógios⌚\n5 - Óculos 🕶');
          await client.sendImage(clientChatId, dataUrl, 'catalogX.jpeg', 'Nosso catálogo desta sessão.')
          break;
      case '2':
          await client.sendText(clientChatId, '1 - Camisetas👕 \n2 - Moda Praia👙/🩱\n3 - Calçados👟👠\n4 - Relógios⌚\n5 - Óculos 🕶');
          await client.sendImage(clientChatId, dataUrl, 'catalogX.jpeg', 'Nosso catálogo desta sessão.')
          break;
      case '3':
          await client.sendText(clientChatId, '1 - Camisetas👕 \n2 - Neoprene\n3 - Calçados👟👠\n4 - Relógios⌚\n5 - Óculos 🕶');
          await client.sendImage(clientChatId, dataUrl, 'catalogX.jpeg', 'Nosso catálogo desta sessão.')
          break;
      case '4':
          await client.sendText(clientChatId, '1 - Mergulho🤿\n2 - Natação🏊🏼\n3 - Prachas Surf/Bobyboard🏄🏽‍♂️\n4 - Camping🏕️\n5 - Skate/Longboard🛹');
          await client.sendImage(clientChatId, dataUrl, 'catalogX.jpeg', 'Nosso catálogo desta sessão.')
          break;
      case '5':
          await client.sendText(clientChatId, '1 - Mochila🎒\n2 - Nautica🛥️\n3 - Natação🏊🏼');
          await client.sendImage(clientChatId, dataUrl, 'catalogX.jpeg', 'Nosso catálogo desta sessão.')
          break;
      case '6':
          await client.sendText(clientChatId, '1 - Marcos Giorgi\n2 - Tainá Hinkel\n3 - Carlos Burli\n4 - Rodrigo Leal Maizena\n5 - Leonardo de Deus');
          await client.sendImage(clientChatId, dataUrl, 'catalogX.jpeg', 'Nosso catálogo desta sessão.')
          break;
      case '7':
          await client.sendText(clientChatId, 'Opção não Disponível no momento. Visite nosso site: https://www.mormaiishop.com.br/institucional/nossas-lojas');
          break;
    }
    itemQuestion(client,clientChatId);
  });
}

function itemQuestion(client, clientChatId){
  (async () => {
    await client.sendText(clientChatId, 'Qual Produto do nosso catálogo gostaria de adquirir?');
  });
}

function itemSize(client, clientChatId, item){
  (async () => {
    switch (item.type){
      case 'Roupa':
        await client.sendText(clientChatId, 'Qual Tamanho? P, M, G, GG');
        break;
      case 'CalcaF':
        await client.sendText(clientChatId, 'Qual Tamanho? 36, 38, 40, 42, 44, 46');
        break;
      case 'CalcaM':
        await client.sendText(clientChatId, 'Qual Tamanho? 38, 40, 42, 44, 46, 48, 50');
        break;
      case 'Chinelo':
          await client.sendText(clientChatId, 'Qual Tamanho? 33-34, 35-36, 37-38, 39-40, 41-42, 44');
          break;
      case 'TenisF':
          await client.sendText(clientChatId, 'Qual Tamanho? 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44');
          break;
      case 'TenisM':
          await client.sendText(clientChatId, 'Qual Tamanho? 37, 38, 39, 40, 41, 42, 43, 44');
          break;
    }
    
  });
}

function itemConfirmation(client, clientChatId){
  (async () => {
    await client.sendText(clientChatId, 'Produto X, Tamanho M - R$XYZ - Adicionado na lista de compras. Você gostaria de adicionar mais algum produto?');
  });
}

wa.create(launchConfig).then(start);