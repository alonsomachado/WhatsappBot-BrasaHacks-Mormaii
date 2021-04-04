const wa = require('@open-wa/wa-automate');

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
};

function start(client) {
  client.onMessage(async message => {
    if (message.body === 'Hi mormaii') {
      await client.sendText(message.from, '👋 Oi, eu sou o Vini Guarujá, seu consultor mormaii!  😃🛒');
      await client.sendText(message.from, 'Que bom falar com você '+message.sender.formattedName+' ! Eu vou te auxiliar em nosso atendimento. Ok?');
      menu(client, message.from);
    }
    if (message.body === 'MENU') {
      await client.simulateTyping(message.from,true);
      console.log("Message:", message);
      menu(client, message.from);
    }
  });
}

function menu(client, clientChatId){
  (async () => {
    await client.sendText(clientChatId, '1 - Roupas Masculinas\n');
    await client.sendText(clientChatId, '2 - Roupas Femininas');
    /*await client.sendText(clientChatId, '3 - Roupas Infantis');
    await client.sendText(clientChatId, '4 - Equipamentos');
    await client.sendText(clientChatId, '5-  Promoções');
    await client.sendText(clientChatId, '6 - Digital Influencers');
    await client.sendText(clientChatId, 'Digite MENU a qualquer momento para voltar para o menu principal.');*/
  });
}
function subs(client, clientChatId){
  (async () => {
    await client.sendText(clientChatId, '1 - Camisas👚 ');
    await client.sendText(clientChatId, '2 - Bermudas🩳');
    await client.sendText(clientChatId, '3 - Calçados👞👠');
    await client.sendText(clientChatId, '4 - Relógios⌚');
    await client.sendText(clientChatId, '5 - Óculos 🕶');
  });
}

wa.create(launchConfig).then(start);