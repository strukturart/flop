<img src="/images/logo.svg" width="228"/>

# flop

![badge-release](https://img.shields.io/github/v/release/strukturart/fwatermelon?include_prereleases&style=plastic)
[![badge-bhackers](https://img.shields.io/badge/bHackers-bHackerStore-orange)](https://store.bananahackers.net/#watermelon)
![badge-downloads](https://img.shields.io/github/downloads/strukturart/watermelon/total)

Is a <a href="https://en.wikipedia.org/wiki/WebRTC">WebRTC</a> chat client for KaiOS, built with a local-first approach — your data stays on your device by default.
Currently, you can exchange text messages, pictures, and your location with others. You can create new chats and join existing ones, all without relying on a central server.

### Features

- join chat
- share location
- share live location
- share image
- audio message
- download chats
- download addressbook
  ![image-4](/images/mockup.png)

## yes, but

In order to establish a connection between 2 peers, you have to know the id of the peers. To do this, I use the API: mozActivity / webActivity, which enables the exchange via a URL (sharing by SMS or EMAIL).

## How to install

- <a href="https://www.kaiostech.com/store/apps/?bundle_id=kaios.app.flop">KaiOS Store</a>
- Sideloading <a href="https://www.martinkaptein.com/blog/sideloading-and-deploying-apps-to-kai-os/">step-by-step article</a> by martinkaptein

## Test Version

<a href="https://flop.chat/">https://flop.chat/</a>

## Data structur

`{
nickname: string,
type: string, // "text", "image", "audio", "gps","güs_live","pod","ping"
payload: object, // varies by message type
id: string, // uuidv4()
datetime: Date,
from?: string, // only stored locally in chat_data
to?: string, // only stored locally in chat_data
pod?: boolean // only stored locally in chat_data (always false)
}`

### ping

`{
  nickname: string,
  type: "ping",
  payload: {},
  from: string,
  to: string,
  id: string
}`

### Build your own

Installing the dependencies<br>
`npm -i`

Build KaiOS 3 app<br>
`npm run build`<br>

Build KaiOS 2 app<br>
`npm run build-k2`<br>

If you want to create a browser version<br>
`npm run web`

### known problems

In certain cases a connection between two peers cannot be established. The solution should be a separate TURN server, which can be specified when establishing the connection. The connection data to the TURN server must be saved in an .env

`TURN_APP_KEY=xx
TURN_APP_NAME=xx`

https://www.metered.ca/tools/openrelay/

### LICENSES

- peerJS MIT License
- mithril
- leaflet
- dayJS

## Donation

If you use the app often, please donate an amount to me.

<a href="https://liberapay.com/perry_______/donate"><img alt="Donate using Liberapay" src="https://liberapay.com/assets/widgets/donate.svg"></a>
