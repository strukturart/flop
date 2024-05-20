<img src="/images/logo.svg" width="228"/>

# flop

![badge-release](https://img.shields.io/github/v/release/strukturart/fwatermelon?include_prereleases&style=plastic)
[![badge-bhackers](https://img.shields.io/badge/bHackers-bHackerStore-orange)](https://store.bananahackers.net/#watermelon)
![badge-downloads](https://img.shields.io/github/downloads/strukturart/watermelon/total)

Is a <a href="https://en.wikipedia.org/wiki/WebRTC">WebRTC</a> chat-client, for the KaiOs.
Currently you can exchange text messages, pictures and your location with each other. You can create new chats and join chats.

### Features

- create chat
- join chat
- share location
- share image
- invite users

![image-4](/images/mockup.png)

## yes, but

In order to establish a connection between 2 peers, you have to know the id of the peers. To do this, I use the API: mozActivity / webActivity, which enables the exchange via a URL (sharing by SMS or EMAIL). In KaiOS there is also the option of deep linking, which I don't use because KaiOS 3 is not very widespread.

## How to install

- bHaCkerStore
- KaiOS Store(coming soon)
- Sideloading <a href="https://www.martinkaptein.com/blog/sideloading-and-deploying-apps-to-kai-os/">step-by-step article</a> by martinkaptein

## Test Version

<a href="https://flop.bhackers.uber.space/">https://flop.bhackers.uber.space/</a>

### known problems

In certain cases a connection between two peers cannot be established. The solution should be a separate TURN server, which can be specified when establishing the connection. The connection data to the TURN server must be saved in an .env

`TURN_APP_KEY=xx
TURN_APP_NAME=xx`

https://www.metered.ca/tools/openrelay/

### LICENSES

- peerJS MIT License
- mithril

## Donation

If you use the app often, please donate an amount to me.
<br>

<table class="border-0"> 
  <tr class="border-0" >
    <td valign="top" class="border-0">
        <div>
            <noscript><a href="https://liberapay.com/perry_______/donate"><img alt="Donate using Liberapay" src="https://liberapay.com/assets/widgets/donate.svg"></a></noscript>
        </div>
    </td>
    <td valign="top" class="border-0">
        <div>
            <a href="https://paypal.me/strukturart?locale.x=de_DE" target="_blank">
                <img src="/images/paypal.png" width="120px">
            </a>
        </div>
    </td>
    <td valign="top" class="border-0">
        <div>
            <div>Bitcoin</div>
            <img src="/images/bitcoin_rcv.png" width="120px">
        </div>
    </td>

  </tr>
 </table>
