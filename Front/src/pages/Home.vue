<template>
  <div class="q-pa-md q-gutter-sm">
    <PrincipalLayout></PrincipalLayout>

    <br /><br />

    <q-scroll-area
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      v-bind:style="{ height: this.height + 'px' }"
    >
      <br />
      <h4 class="title">Clase activa</h4>
      <br />

      <div class="row">
        <div class="col-md-12 container">
          <iframe
            class="responsive-iframe"
            src="https://www.youtube.com/embed/HRaoYuRKBaA"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          >
          </iframe>
        </div>
      </div>
    </q-scroll-area>

    <vs-popup
      classContent="popup-example"
      class="font-title"
      title="Chat"
      :active.sync="popupChat2"
    >
    </vs-popup>

    <!-- Modal chat -->

    <vs-popup
      classContent="popup-example"
      class="font-title"
      title="Chat"
      :active.sync="popupChat"
    >
      <div id="contenedorChat" :style="{ background: backgroundColor }">
        <beautiful-chat
          :alwaysScrollToBottom="alwaysScrollToBottom"
          :colors="colors"
          :isOpen="true"
          :messageList="messageList"
          :messageStyling="messageStyling"
          :newMessagesCount="newMessagesCount"
          :onMessageWasSent="onMessageWasSent"
          :open="openChat"
          :close="closeChat"
          :participants="participants"
          :showLauncher="true"
          :showEmoji="true"
          :showFile="false"
          :showTypingIndicator="showTypingIndicator"
          :titleImageUrl="titleImageUrl"
          @onType="handleOnType"
          @edit="editMessage"
          @remove="removeMessage"
        >
          <template v-slot:text-message-toolbox="scopedProps">
            <button
              v-if="!scopedProps.me && scopedProps.message.type === 'text'"
              @click.prevent="like(scopedProps.message.id)"
            >
              👍
            </button>
          </template>
          <template v-slot:text-message-body="scopedProps">
            <p
              class="sc-message--text-content"
              v-html="scopedProps.messageText"
            ></p>
            <p
              v-if="scopedProps.message.data.meta"
              class="sc-message--meta"
              :style="{
                color: scopedProps.messageColors.color,
              }"
            >
              {{ scopedProps.message.data.meta }}
            </p>
            <p
              v-if="scopedProps.message.isEdited || scopedProps.message.liked"
              class="sc-message--edited"
            >
              <template v-if="scopedProps.message.isEdited">✎</template>
              <template v-if="scopedProps.message.liked">👍</template>
            </p>
          </template>
        </beautiful-chat>
      </div>
    </vs-popup>

    <q-dialog v-model="alert_chat"> </q-dialog>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="mail" color="primary" @click="popupChat = true" />
    </q-page-sticky>

    <div>
      <TabsLayout></TabsLayout>
    </div>
  </div>
</template>

<script>
"use strict";
import messageHistory from "./messageHistory";
import chatParticipants from "./chatProfiles";
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import TestArea from "./TestArea.vue";
import availableColors from "./colors";

export default {
  components: {
    Header,
    Footer,
    TestArea,
  },

  created: function () {
    this.setColor("blue");
    this.Height_scroll();

    this.abrirChat();

    const authUser = JSON.parse(window.localStorage.getItem("lbUser"));

    var nombre = authUser[0].nombre_completo.split(" ");
    var id = authUser[0].id;
    this.$socket.emit("info-usuario", {
      id_usuario: id,
      usuario: nombre[0],
    });
  },

  computed: {
    linkColor() {
      return this.chosenColor === "dark"
        ? this.colors.sentMessage.text
        : this.colors.launcher.bg;
    },
    backgroundColor() {
      return this.chosenColor === "dark" ? this.colors.messageList.bg : "#fff";
    },
  },

  mounted() {
    this.messageList.forEach((x) => (x.liked = false));
  },

  sockets: {
    connect() {
      // Fired when the socket connects.
      console.log("socket connected");
    },

    disconnect() {
      console.log("socket disconnected");
    },

    // Fired when the server sends something on the "messageChannel" channel.
  },

  data() {
    return {
      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: 0.75,
      },

      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#027be3",
        width: "9px",
        opacity: 0.2,
      },

      mostrar: false,
      alert: false,
      alert_chat: false,
      popupChat: false,
      popupChat2: false,
      participants: [],
      titleImageUrl:
        "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
      messageList: messageHistory,
      newMessagesCount: 0,
      isChatOpen: false,
      showTypingIndicator: "",
      colors: null,
      availableColors,
      chosenColor: null,
      alwaysScrollToBottom: true,
      messageStyling: true,
      userIsTyping: false,
      authorMensaje: "",

      idPedido: 0,
      fotoMiniatura: "",
      Pedidos: [],
      Datos_Pedidos: [],
      Combos: [],
      Detalles: [],
      Usuarios: [],
      arrayestados: [],
      arrayciudades: [],
      loading: true,
      newid_estado: "",
      newtelefono: "",
      newdireccion: "",
      errors: [],
      fillpedidos: {
        id: "",
        id_estado: "",
        tiempo_entrega: "",
        id_usuario: "",
      },
      timer: "",
      countTemp: 0,
      height: 0,
      pedido_exist: false,
    };
  },

  methods: {
    Height_scroll() {
      this.height = screen.height;
    },

    sendMessage(text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen
          ? this.newMessagesCount
          : this.newMessagesCount + 1;
        this.onMessageWasSent({
          author: "prueba",
          type: "text",
          id: Math.random(),
          data: { text },
        });
      }
    },
    handleTyping(text) {
      this.showTypingIndicator =
        text.length > 0
          ? this.participants[this.participants.length - 1].id
          : "";
    },
    onMessageWasSent(message) {
      const authUser = JSON.parse(window.localStorage.getItem("lbUser"));

      var nombre = authUser[0].nombre_completo.split(" ");
      var id = authUser[0].id;

      var dataSend;

      if (authUser[0].id_role == 1) {
        var msjFinal = "Moderador-" + nombre[0] + ": " + message.data.text;

        dataSend = { text: msjFinal };
      } else {
        var msjFinal = nombre[0] + ": " + message.data.text;

        dataSend = { text: msjFinal };
      }

      this.$socket.emit("chat", {
        authorMensaje: nombre[0],
        id_usuario: id,
        mensaje: {
          author: nombre[0],
          type: message.type,
          id: Math.random(),
          data: dataSend,
        },
      });

      this.messageList = [
        ...this.messageList,
        Object.assign({}, message, { id: Math.random() }),
      ];
    },
    openChat() {
      this.isChatOpen = true;
      this.newMessagesCount = 0;
    },

    closeChat() {
      this.isChatOpen = false;
      this.alert_chat = false;
    },
    setColor(color) {
      this.colors = this.availableColors[color];
      this.chosenColor = color;
    },
    showStylingInfo() {
      this.$modal.show("dialog", {
        title: "Info",
        text: "You can use *word* to <strong>boldify</strong>, /word/ to <em>emphasize</em>, _word_ to <u>underline</u>, `code` to <code>write = code;</code>, ~this~ to <del>delete</del> and ^sup^ or ¡sub¡ to write <sup>sup</sup> and <sub>sub</sub>",
      });
    },
    messageStylingToggled(e) {
      this.messageStyling = e.target.checked;
    },
    handleOnType() {
      this.$root.$emit("onType");
      this.userIsTyping = true;
    },
    editMessage(message) {
      const m = this.messageList.find((m) => m.id === message.id);
      m.isEdited = true;
      m.data.text = message.data.text;
    },
    removeMessage(message) {
      if (confirm("Delete?")) {
        const m = this.messageList.find((m) => m.id === message.id);
        m.type = "system";
        m.data.text = "This message has been removed";
      }
    },
    like(id) {
      const m = this.messageList.findIndex((m) => m.id === id);
      var msg = this.messageList[m];
      msg.liked = !msg.liked;
      this.$set(this.messageList, m, msg);
    },

    show_table_combo() {
      if (!(this.Combos == null)) {
        this.mostrar = true;
      }
    },

    abrirChat() {
      const authUser = JSON.parse(window.localStorage.getItem("lbUser"));

      var nombre = authUser[0].nombre_completo.split(" ");
      var id = authUser[0].id;

      let me = this;
      this.$http({
        url: "http://localhost:3050/api/participantes",
        method: "POST",
      })
        .then((response) => {
          var participants = response.data.user;

          for (var i = 0; i < participants.length; i++) {
            var participante = new Object();

            participante.id = participants[i].id;
            participante.name = participants[i].usuario;
            participante.imageUrl = "statics/images/user.png";

            me.participants.push(participante);
          }
        })
        .catch((error) => {});

      //Recuperar chats

      this.$http({
        url: "http://localhost:3050/api/chatsCanal",
        method: "POST",
      })
        .then((response) => {
          console.log(response.data);
          var arrayChats = response.data.chats;

          if (arrayChats.length == 0) {
            this.messageList = [];
          } else {
            for (var i = 0; i < arrayChats.length; i += 1) {
              if (id == arrayChats[i].id_dueno_mensaje) {
                //es mi mensaje
                //crear objecto mensaje
                var mensaje = new Object();
                mensaje.author = "me";
                mensaje.type = arrayChats[i].mensaje.type;
                mensaje.id = arrayChats[i].mensaje.id;
                mensaje.data = arrayChats[i].mensaje.data;

                this.messageList = [
                  ...this.messageList,
                  Object.assign({}, mensaje, {
                    id: Math.random(),
                  }),
                ];
              } else {
                this.messageList = [
                  ...this.messageList,
                  Object.assign({}, arrayChats[i].mensaje, {
                    id: Math.random(),
                  }),
                ];
              }
            }
          }
        })
        .catch((error) => {});

      this.$socket.on(
        "chat",
        function (data) {
          this.messageList.push(data);
          // console.log(data.mensaje);

          this.messageList = [
            ...this.messageList,
            Object.assign({}, data.mensaje, {
              id: Math.random(),
            }),
          ];
        }.bind(this)
      );
    },
  },
};
</script>

<style>
.title {
  text-align: center;
}

.my-sticky-header-table {
  /* height or max-height is important */
  height: 150px;
}

.q-table__top,
.q-table__bottom,
thead tr:first-child th {
  /* bg color is important for th; just specify one */
  background-color: #7f82eb;
  color: white;
}

.sc-chat-window[data-v-353e1b70] {
  width: 550px !important;
  height: 500px;
  position: inherit !important;
}

.container {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
}

/* Then style the iframe to fit in the container div with full height and width */
.responsive-iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
</style>
