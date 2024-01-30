<img src="/images/logo.svg" width="228"/>

# watermelon

![badge-release](https://img.shields.io/github/v/release/strukturart/fwatermelon?include_prereleases&style=plastic)
[![badge-bhackers](https://img.shields.io/badge/bHackers-bHackerStore-orange)](https://store.bananahackers.net/#watermelon)
![badge-downloads](https://img.shields.io/github/downloads/strukturart/watermelon/total)

Is a <a href="https://en.wikipedia.org/wiki/WebRTC">WebRTC</a> chat-client, for the KaiOs.
Currently you can exchange text messages and pictures with each other. You can create new rooms and join rooms.

### Features

- create room
- join room
- room favorits
- share location
- share image

![image-1](/images/image-1.png)
![image-2](/images/image-2.png)
![image-2](/images/image-3.png)
![image-4](/images/image-4.png)

## How to install

- bHaCkerStore
- KaiOs Store(coming soon)
- Sideloading <a href="https://www.martinkaptein.com/blog/sideloading-and-deploying-apps-to-kai-os/">step-by-step article</a> by martinkaptein

### known problems

In certain cases a connection between two peers cannot be established. The solution should be a separate TURN server, which can be specified when establishing the connection. The connection data to the TURN server must be saved in an .env

`TURN={"iceServers":[{"urls":"stun:stun.relay.metered.ca:80"},{"urls":"turn:standard.relay.metered.ca:80","username":"","credential":""},{"urls":"turn:standard.relay.metered.ca:80?transport=tcp","username":"","credential":""},{"urls":"turn:standard.relay.metered.ca:443","username":"","credential":""},{"urls":"turns:standard.relay.metered.ca:443?transport=tcp","username":"","credential":""}]}`

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
