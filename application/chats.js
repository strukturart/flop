"use strict";

export const chats =
  '{{#each data}}{{#DocumentList}}<article tabindex="{{@index}}"><div class="user-date"><span>{{user}}</span> {{time}}</div><div>{{message}}</div></article>{{/DocumentList}}{{/each}}';
