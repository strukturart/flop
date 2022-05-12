"use strict";

export const chats =
  '{{#each data}}{{#DocumentList}}<article ><div class="user-date"><span>{{user}}</span> {{transform_date time}}</div><div>{{message}}</div></article>{{/DocumentList}}{{/each}}';
