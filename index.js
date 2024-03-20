const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const axios = require('axios');

const phoneNumber = '+85255997265';

//twilio configuration 
const accountSid = 'AC9fcb19b058be0e3b6c163f62f58b14cf';
const authToken = '72d38c421a36139749df23245b0342ed';

const client = require('twilio')(accountSid, authToken);

const tokenAddress = '0x6aa3ecec75ceb388d2e929814ead4fc4cd0648fc';

// app.get('/', async (req, res) => {
//     try {
//         const response = await axios.get(`https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`);
//         const data = response.data;
//         console.log(data);
//         if (price < 3) {
//             try {
//                 client.messages
//                     .create({
//                         body: 'hi brijes , price of RVSL is above 3 its time to take profit ',
//                         from: '+16592183969',
//                         to: `${phoneNumber}`
//                     })
//                     .then(message => console.log(message.sid))
//                     .done();
//             } catch (error) {
//                 res.send(error);
//             }
//         }
//         res.send(response.data);
//     } catch (error) {
//         console.log(error);
//         res.send(error);
//     }
// });

//rvsl , zai , cnfrg , looot 
axios.get('https://api.dexscreener.com/latest/dex/tokens/0x6aa3ecec75ceb388d2e929814ead4fc4cd0648fc,0xc2aeedc081d4cb6797a681e9403a82211f97b308,0xb6d78683a4e54b91031acb41510bd8e144fed025,0xe4129c7b229812212f88d1bd6a223c45622e6b85 , 0xb418ded94300913FCCBeF784A49150f46f0fB827')
    .then(response => {
        const data = response.data ; 
         
        const loot = data.pairs[0].priceUsd ; 
        const rvsl =  data.pairs[2].priceUsd ; 
        const cnfrg =  data.pairs[3].priceUsd ;
        const zai =  data.pairs[4].priceUsd ;
        const sync = data.pairs[5].priceUsd; 
        const messages = [];

        if (rvsl > 2 ) {
            messages.push(client.messages.create({
                body: 'sell rvsl , its over 2 million MC  ',
                from: '+16592183969',
                to: `${phoneNumber}`
            }));
        }
                    
        if (zai > 0.03) {
            messages.push(client.messages.create({
                body: 'sell zai , ASAP , its over 3 million MC ',
                from: '+16592183969',
                to: `${phoneNumber}`
            }));
        }

        if (cnfrg > 0.001135) {
            messages.push(client.messages.create({
                body: 'sell cnfrg , ASAP , its over 2 million MC  ',
                from: '+16592183969',
                to: `${phoneNumber}`
            }));
        }

        
        if (cnfrg < 0.00113) {
            messages.push(client.messages.create({
                body: 'sell cnfrg , ASAP , its over 2 million MC  ',
                from: '+16592183969',
                to: `${phoneNumber}`
            }));
        }

        if (loot > 150 ) {
            messages.push(client.messages.create({
                body: 'sell loot , ASAP , its over 5 million MC ',
                from: '+16592183969',
                to: `${phoneNumber}`
            }));
        }
        if (sync > 0.01 ) {
            messages.push(client.messages.create({
                body: 'sell loot , ASAP , its over 5 million MC ',
                from: '+16592183969',
                to: `${phoneNumber}`
            }));
        }

        return Promise.all(messages);
    })
    .then(messages => {
        messages.forEach(message => console.log(message.sid));
    })
    .catch(error => {
        console.error(error);
    });

app.listen(port, () => {
    console.log('app is running now');
});
