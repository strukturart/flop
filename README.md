<img src="/images/logo.svg" width="228"/>

# flop

![badge-release](https://img.shields.io/github/v/release/strukturart/watermelon?include_prereleases&style=plastic)
[![badge-bhackers](https://img.shields.io/badge/bHackers-bHackerStore-orange)](https://store.bananahackers.net/#watermelon)
![badge-downloads](https://img.shields.io/github/downloads/strukturart/watermelon/total)

Is a <a href="https://en.wikipedia.org/wiki/WebRTC">WebRTC</a> chat client for KaiOS, built with a local-first approach — your data stays on your device by default.
Currently, you can exchange text messages, pictures, and your location with others. You can create new chats and join existing ones.

### Features

- join chat
- share location
- share live location
- share image
- audio message

## yes, but

In order to establish a connection between 2 peers, you have to know the id of the peers. To do this, I use the API: mozActivity / webActivity, which enables the exchange via a URL (sharing by SMS or EMAIL).

## How to install

- <a href="https://www.kaiostech.com/store/apps/?bundle_id=kaios.app.flop">KaiOS Store</a>
- Sideloading <a href="https://www.martinkaptein.com/blog/sideloading-and-deploying-apps-to-kai-os/">step-by-step article</a> by martinkaptein

## Test Version

<a href="https://flop.chat/">https://flop.chat/</a>

## Data objects

## User profile

### `settings.unique_id`

- Generated **once during installation** of the app.
- Serves as a **persistent, internal user ID**.
- Used for internal logic.
- **Cannot be changed** via the user interface.
- Typically generated as: `flop-<uuid>`.

### `settings.custom_peer_id`

- Separately generated ID for **identification on the PeerJS server**.
- Used for **signaling and establishing connections between peers**.
- Can be changed by the user, e.g., to **prevent spam through identifiable IDs**.
- Typically generated as: `flop-<uuid>`.

### `nickname`

- The **nickname** is a human-readable identifier for the user.
- It is used to generate the user's **profile icon**, ensuring a visually identifiable representation.
- The nickname has **no security relevance** and is **not required to be unique**.
- It is typically auto-generated (e.g., a random string) and can be changed by the user to personalize their appearance in the app.

### Initial data object

```javascript
{
  nickname: generateRandomString(10),
  custom_peer_id: “flop-” + uuidv4(16),
  unique_id: “flop-” + uuidv4(16)
}`
```

These objects are sent and received; they always have the same structure, only the payload object differs depending on the type.

```javascript
{
nickname: string,
type: string, // "text", "image", "audio", "gps","gps_live","pod","ping","typing"
payload: object, // varies by message type
id: string, // uuidv4()
datetime: Date,
from?: string, // only stored locally in chat_data
to?: string, // only stored locally in chat_data
pod?: boolean // only stored locally in chat_data (always false)
}
```

### ping

fires a silent data packet at regular intervals to update the connection status,
Mainly used for KaiOS2.

```javascript
{
  nickname: string,
  type: "ping",
  payload: {},
  from: string,
  to: string,
  id: string
}
```

### pod

Proof of delivery  
A silent message is sent back when a data packet has arrived.

```javascript

{
  nickname: string,
  type: "pod",
  payload: {},
  from: string,
  to: string,
  id: string
}

```

### typing

when the user is currently writing

```javascript

{
  nickname: string,
  type: "typing",
  payload: {},
  from: string,
  to: string,
  id: string
}

```

### text

```javascript
{
  nickname: string,
  payload: { text: string },
  datetime: Date,
  type: "text",
  from: string,
  to: string,
  id: string,
  pod: false
}

```

### image

An image is sent as base64 and stored as blob

```javascript
{
  nickname: string,
  type: "image",
  payload: {
    image: string,
    filename: string,
    mimeType: string
  },
  id: string,
  datetime: Date
  pod: false

}
```

### audio

an audion is sent as a arrayBuffer and stored as blob

```javascript

{
  nickname: string,
  datetime: Date,
  type: "audio",
  payload: {
    audio: Blob,
    filename: string,     // "<id>.mp3"
    mimeType: string
  },
  from: string,
  to: string,
  id: string,
  pod: false
}



```

### gps_live

The current geolocation of the device is sent, and the message is updated at the recipient's end.

```javascript

{
  nickname: string,
  datetime: Date,
  type: "gps_live",
  payload: {
    lat: number,
    lng: number
  },
  from: string,
  to: string,
  id: string,
  pod: false
}


```

### gps

The current geolocation of the device is sent

```javascript

{
  nickname: string,
  type: "gps",
  payload: {
    lat: "",
    lng: ""
  },
  id: string,
  datetime: Date
  pod: false

}


```

### Build your own

Installing the dependencies<br>
`npm -i`

Build KaiOS 3 app<br>
`npm run build`<br>

Build KaiOS 2 app<br>
`npm run build-k2`<br>

If you want to create a browser version<br>
`npm run web`

### TURN-SERVER

To establish a connection, a TURN SERVER is usually required. This server does not store any chat data but only forwards it. The default server used is https://www.metered.ca/tools/openrelay/, which offers a free plan and is very reliable. The access data should be stored in an .env file.

`TURN_APP_KEY=xx
TURN_APP_NAME=xx`

https://www.metered.ca/tools/openrelay/

### LICENSES

- peerJS MIT License
- mithril
- leaflet
- dayJS
- openstreetmap

## Donation

If you use the app often, please donate an amount to me.

<a href="https://liberapay.com/perry_______/donate"><img alt="Donate using Liberapay" src="https://liberapay.com/assets/widgets/donate.svg"></a>

```

```
