const Telegraf = require("telegraf");
const express = require("express");

const expressApp = express();

const tokenBotTelegram = process.env.TOKEN_BOT_TELEGRAM;
const bot = new Telegraf(tokenBotTelegram);

expressApp.use(bot.webhookCallback("/bot"));
bot.telegram.setWebhook(`${process.env.URL_WEBHOOK}/bot`)

bot.start((ctx) => {
  ctx.reply(
    "Hola, soy el bot de ... Puedes pedirme ayuda con el comando /help"
  );
});

bot.command("/test", (ctx) => {
  console.log("COMANDO TEST");
  ctx.reply("Hola Mundo Bot");
});

bot.help((ctx) => {
  console.log("COMANDO HELP");
  ctx.reply(
    "¿Con qué puedo ayudarte? Te recuerdo los comandos que puedes pedirme:"
  );
});

bot.on("text", (ctx) => {
  console.log("COMANDO text");
  ctx.reply("Respuesta bot");
});


//La aplicación de express empieza a escuchar
expressApp.listen(process.env.PORT, () => {
  console.log(`El servidor esta escuchando ${process.env.PORT}`);
});
