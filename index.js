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

const Url = "https://apiexamples.vtexcommercestable.com.br/api/catalog_system/pvt/products/GetProductAndSkuIds?categoryId=1&_from=1&_to=10";

function start(client) {
  client.onMessage(async message => {
    
    if(message.sender.isBusiness){
      myMap.set(message.from,message.sender.verifiedName);
    } else {
      myMap.set(message.from,message.sender.formattedName);
    }

    switch (message.body){
    case 'Hi mormaii':
      await client.sendText(message.from, '👋 Oi, eu sou o Vini Guarujá, seu consultor mormaii!  😃🛒');
      await client.sendText(message.from, 'Que bom falar com você '+myMap.get(message.from)+' ! Eu vou te auxiliar em nosso atendimento. Ok?');
      await client.sendText(message.chatId, '1 - Roupas Masculinas\n2 - Roupas Femininas\n3 - Roupas Infantis\n4 - Equipamentos\n5-  Promoções\n6 - Digital Influencers');
      await client.sendText(message.chatId, 'Digite MENU a qualquer momento para voltar para o menu principal.');
      console.log("Client:", client);
      break;
    
    case 'MENU':
      await client.simulateTyping(message.chatId,true);
      console.log("Message:", message);
      await client.sendText(message.chatId, '1 - Roupas Masculinas\n2 - Roupas Femininas\n3 - Roupas Infantis\n4 - Equipamentos\n5-  Promoções\n6 - Digital Influencers');
      await client.sendText(message.chatId, 'Digite MENU a qualquer momento para voltar para o menu principal.');
      await client.simulateTyping(message.chatId,false);
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
      await client.sendText(message.from, 'Desculpa, Não entendi.... 🌊');
    }
  });
}

function menu(client, clientChatId){
  (async () => {
    await client.simulateTyping(message.chatId,true);
    await client.sendText(clientChatId, '1 - Roupas Masculinas\n2 - Roupas Femininas\n3 - Roupas Infantis\n4 - Equipamentos\n5-  Promoções\n6 - Digital Influencers');
    await client.sendText(clientChatId, 'Digite MENU a qualquer momento para voltar para o menu principal.');
    await client.simulateTyping(message.chatId,false);
  });
}

function subcategories(client, clientChatId){
  (async () => {
    await client.sendText(clientChatId, '1 - Camisas👚 ');
    await client.sendText(clientChatId, '2 - Bermudas🩳');
    await client.sendText(clientChatId, '3 - Calçados👞👠');
    await client.sendText(clientChatId, '4 - Relógios⌚');
    await client.sendText(clientChatId, '5 - Óculos 🕶');
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