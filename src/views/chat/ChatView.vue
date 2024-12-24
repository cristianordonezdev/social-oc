<script setup lang="ts">
import { joinConversation, startSignalRConnection, sendMessage, onReceiveMessage } from '../../utils/SignalRService';
import { ref, onMounted} from 'vue';
import { getUserData, decodeJWT } from '@/utils/user';
import { services_wrapper } from '@/services/services.wrapper';

const user_id = ref("");
const message = ref<string>("");
const messages = ref<any>([]);
const page_conversations = ref<number>(1);
const conversations = ref<any>([]);
const conversation_selected = ref<any>({
  id: "",
  tokenConversation: "",
  messages: []
})

// onReceiveMessage((user: any, message: any ) => {
//   messages.value.push({ user, message });
// });
const id_conversation = "";
const token_conversation = "";

onMounted(async () => {
  user_id.value = decodeJWT()

  await startSignalRConnection();
    // openConversa-twion();
  getConversations()
})

const sendMessageFunction = async () => {
  await sendMessage(conversation_selected.value.id, message.value, conversation_selected.value.tokenConversation);
  message.value = "";
};

onReceiveMessage(async (data: any) => {
  conversation_selected.value.messages.unshift(data)
  
  conversations.value.map((c: any) => {
    if (c.id === conversation_selected.value.id) {
      c.messageList.lastMessage = data.messageText ?? "";
      c.messageList.lastMessageTime = data.createdAt ?? "";
      c.messageList.participantId = data.senderId ?? "";
    }
  })
})

const getConversations = () => {
  services_wrapper.get(`/conversation?page=${page_conversations.value}&pageSize=10`).then((response) => {
    conversations.value = response;
  })
}

const conversationSelected = async (conversation: any) => {
  conversation_selected.value = conversation;
  await joinConversation(conversation_selected.value.id, conversation_selected.value.tokenConversation);
  getMessages();
}

const getMessages = () => {
  services_wrapper.get(`/message/${conversation_selected.value.id}?page=1&pageSize=10`, conversation_selected.value.tokenConversation).then((response) => {
    conversation_selected.value.messages = response
    console.log(response)
  })
};
</script>

<template>
  <section class="main-container-chat">
    <div class="chats-list">
      <div class="border-bottom mb-2">
        Active chats <div>6</div>
      </div>
      <div class="px-3">
        <div class="mb-3 position-relative">
          <input type="text" class="form-control">
          <i class="bi bi-search search-icon-messages"></i>

        </div>
        
        <div 
          class="d-flex align-items-center py-2 container-chat-user mb-2" 
          v-for="i in conversations" :key="i.id"
          @click="conversationSelected(i)"
          :class="{'active-chat': conversation_selected.id === i.id}"

        >
          <div class="avatar-main-chat-list me-2" v-if="!i.participantSecond.imageProfile">
            <i class="bi bi-person-fill"></i>
          </div>
          <img class="avatar-main-chat-list me-2" :src="i.participantSecond.imageProfile" :alt="i.participantSecond.username" v-else>
          <div>
            <strong class="text-overflow">{{ i.participantSecond.name }} </strong>
            <div class="last-message m-0" v-if="i.messageList">{{ i.messageList.lastMessage }}</div>
          </div>
        </div>
      </div>


    </div>
    <div class="chat-selected" v-if="conversation_selected.id.length > 0">
      <div class="d-flex align-items-center justify-content-between p-3 border-bottom w-100">
        <div class="d-flex align-items-center">
          <div class="avatar-main"  v-if="!conversation_selected.participantSecond.imageProfile">
            <i class="bi bi-person-fill"></i>
          </div>
          <img class="avatar-main" :src="conversation_selected.participantSecond.imageProfile" :alt="conversation_selected.participantSecond.username" v-else>

          <div class="ms-2">
            <strong>{{ conversation_selected.participantSecond.name }}</strong>
            <div class="d-flex align-items-center"><div class="dot"></div>online</div>
          </div>
        </div>
        <div class="d-flex align-items-center">
          <button class="button-action">
            <i class="bi bi-telephone-fill"></i>
          </button>
          <button class="button-action">
            <i class="bi bi-camera-video-fill"></i>
          </button>
          <button class="button-action">
            <i class="bi bi-three-dots-vertical"></i>
          </button>
        </div>
      </div>
      <div class="container-messages">
        <div v-for="msg in conversation_selected.messages" :key="msg.id" :class="user_id === msg.senderId ? 'right-position' : 'left-position'" class="d-flex">
          <div v-if="user_id !== msg.senderId">
            <div class="avatar-container-chat me-2" v-if="!conversation_selected.participantSecond.imageProfile">
              <i class="bi bi-person-fill"></i>
            </div>
            <img class="avatar-container-chat me-2" :src="conversation_selected.participantSecond.imageProfile" :alt="conversation_selected.participantSecond.username" v-else>
          </div>
          <span :class="user_id === msg.senderId ? 'blue' : 'gray'" class="msg-bubble">{{ msg.messageText }}</span>
        </div>
      </div>
      <div class="d-flex p-3 border-top">
        <input type="text" class="form-control input-message" v-model="message" @keyup.enter="sendMessageFunction()">
        
        <button class="btn btn-primary ms-2" @click="sendMessageFunction()">
          <i class="bi bi-send-fill"></i>
        </button>
      </div>
    </div>
    <div class="d-flex flex-column align-items-center justify-content-center w-100 mb-5" v-else>
      <i class="bi bi-chat-left-heart chat-left-icon"></i>
      <h5>Your messages</h5>
      <p>Send photos and private messages to a friend</p>
      <button class="btn btn-primary ms-2">
        Send message  
      </button>
    </div>
  </section>
</template>

<style scoped lang="scss">

.main-container-chat {
  .chat-left-icon {
    font-size: 50px;
  }
  .container-chat-user {
    cursor: pointer;
    padding: 1em;
    // text-overflow: ellipsis;
    // white-space: nowrap;
    border-radius: 0.45em;
    // overflow: hidden;

    .avatar-main-chat-list {
      background-color: #eff2f6;
      border-radius: 100%;
      height: 48px;
      width: 48px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #ccc;
      flex-shrink: 0;
    }

  }
  .text-overflow {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 230px;
    display: block;
  }
  .active-chat {
    background-color: #0F6FEC1A;
  }
  min-width: 1200px;
  background-color: white;
  display: flex;
  border: 1px solid #dee2e6;
  border-radius: 0.4em;
  height: 86vh !important;

  .chats-list {
    min-width: 350px !important;
    border-right: 1px solid #dee2e6;
  }
  .search-icon-messages {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    font-size: 20px;
    background-color: white;
    padding-left: 0.2em;
  }
  .last-message {
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    // background-color: red;
    width: 230px;
    // display: block;
    // width: 300px;
  }


  .chat-selected {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;
    // overflow: scroll;
    .avatar-main {
      background-color: #eff2f6;
      border-radius: 100%;
      height: 48px;
      width: 48px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .dot {
      background-color: green;
      width: 13px;
      height: 13px;
      border-radius: 100%;
      margin-right: 0.3em;
    }
    .container-messages {
      flex-grow: 1;
      background-color: white;
      display: flex;
      flex-direction: column-reverse;
      overflow-y: auto;
      padding: 1.5em;

      .avatar-container-chat {
        background-color: #eff2f6;
        border-radius: 100%;
        height: 35px;
        width: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
      }
 

      .blue {
        background-color: #0f6fec;
        color: white;
      }
      .gray {
        background-color: #EEF0F2;
        color: #444 !important;
      }
      .msg-bubble {
        
        padding: 8px 16px;
        border-radius: .4rem;
        display: inline-block;
        // max-width: 80
        margin-bottom: 10px;
        // word-wrap:; 
      }
      .right-position {
        align-self: flex-end;
      }
      .left-position {
        align-self: flex-start;
      }
    }
    .button-action {
      height: 40px;
      width: 40px;
      border-radius: 100%;
      color: #0f6fec;
      background-color: #0f6fec1a;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      margin-left: 0.5em;
    }
    .input-message {
      padding: 0.5em;
    }
  }
}
</style>
