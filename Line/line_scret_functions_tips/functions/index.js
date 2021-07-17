const firebase = require('firebase');
const functions = require("firebase-functions");
const request = require("request-promise");
import { 
    getMessages,
    pathEnum, } from './src/read';
const readF = require("./src/read");
// if(process.env.NODE_ENV === 'development' )
// {
//     firebase.functions().useEmulator("localhost", 5001);
// }

const LINE_MESSAGING_API = "https://api.line.me/v2/bot/message";
const LINE_HEADER = {
  "Content-Type": "application/json",
  Authorization: `Bearer f3FwePnPmcmrlxwsb8XmJBBHxXIPYBaZwGKsqyUFz8BA2w76pCRiSqf1JN9D+fz8FshRBsuQIR2eHBuNtBFF7rwGUA9Yz7rZUqWjLB2bTQ9R4eFjoxqutshXDpEKypzd7v0osz+gnmzK+IuiATRSgQdB04t89/1O/w1cDnyilFU=`,
};

exports.LineBot = functions.https.onRequest((req, res) => {
const msg = readF.getMessages(readF.pathEnum.fun);
  if (req.body.events[0].message.type !== "text") {
    res.json({
        message: "No events message type as text",
        body: req.body,
    });
    return;
}
text: msg,
reply(req.body);
res.json({
    msg,
    body: req.body,
});
});

const reply = (bodyResponse) => {

    const msg = readF.getMessages(readF.pathEnum.fun);
    console.log(msg);
  return request({
    method: `POST`,
    uri: `${LINE_MESSAGING_API}/reply`,
    // uri: `${LINE_MESSAGING_API}/broadcast`, // TO ALL users
    // uri: `${LINE_MESSAGING_API}/multicast`, // TO defined users
    headers: LINE_HEADER,
    body: JSON.stringify({
    //   to: [`yyyyy`, `zzzzz`], // UserIDs for Multicast
      replyToken: bodyResponse.events[0].replyToken,
      messages: [
        {
          type: `text`,
          text: "🎉🎉" + bodyResponse.events[0].message.text,
        },
        {
            type: `text`,
            text: msg,
        },
      ],
    }),
  });
};

exports.HelloWorld = functions.https.onRequest((req, res) => {
    res.send('helloworld');
});
