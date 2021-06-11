<template>
  <div>
    <q-header elevated class="shadow-1">
      <q-toolbar class="color-header fixed">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          class="icon-color"
          v-show="this.show"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title align="center">
          <p class="title">
            {{ this.message }}
            <span class="rosado title"> {{ this.name }}</span>
          </p>
        </q-toolbar-title>

        <q-btn flat class="icon-color">
          <q-icon name="exit_to_app" @click="confirm = true" />
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="767"
      :width="250"
      show-if-above
      bordered
      content-class="bg-grey-1"
      v-show="this.show"
    >
      <br /><br /><br /><br /><br /><br /><br />
      <q-list padding>
        <q-item-label header class="text-grey-8"
          >Menú de Navegación</q-item-label
        >

        <q-item clickable to="/home" exact>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Inicio</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable to="/info" exact>
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Info</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <q-img
        class="absolute-top"
        src="statics/images/img.jpg"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="statics/images/user.png" />
          </q-avatar>
          <div v-text="this.username"></div>
        </div>
      </q-img>
    </q-drawer>

    <!-- Modal cerrar sesion-->

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="account_circle" class="color-ro" text-color="white" />
          <span class="q-ml-sm">¿Estás seguro que quieres cerrar sesión?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cerrar" color="deep-purple-9" v-close-popup />
          <q-btn
            flat
            label="Aceptar"
            class="rosado"
            @click.prevent="Logout()"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>


<script>
export default {
  name: "PrincipalLayout",

  created: function () {
    this.info_user();
    this.movil();
  },

  data() {
    return {
      confirm: false,
      tab: "mails",
      leftDrawerOpen: false,
      img_user: "",
      username: "",
      message: "",
      name: "",
      show: false,

      essentialLinks: [
        {
          title: "Docs",
          caption: "quasar.dev",
          icon: "school",
          link: "https://quasar.dev",
        },
      ],
    };
  },

  methods: {
    movil() {
      if (screen.width >= 768) {
        this.show = true;
      }
    },

    info_user() {
      const authUser = JSON.parse(window.localStorage.getItem("lbUser"));

      this.username = authUser[0].nombre_completo;

      var nombre = authUser[0].nombre_completo.split(" ");
      this.name = nombre[0];

      const moment = require("moment");
      const hora_server = moment(new Date()).local().format("HH:mm");

      if (hora_server >= "00:00" && hora_server <= "11:59") {
        this.message = "Buenos días";
      }

      if (hora_server >= "12:00" && hora_server <= "17:59") {
        this.message = "Buenas tardes";
      }

      if (hora_server >= "18:00" && hora_server <= "23:59") {
        this.message = "Buenas noches";
      }
    },

    Logout() {
      this.$vs.loading({
        color: "#339FFF",
        type: "corners",
      });

      localStorage.removeItem("lbUser");
      localStorage.removeItem("token");

      window.location = "";

      this.$vs.loading.close();
    },
  },
};
</script>

<style>
.icon-color {
  color: #339fff;
}

.color-name {
  color: black;
}

.q-drawer .q-router-link--exact-active {
  color: #339fff !important;
}

.color-header {
  color: black;
  background-color: white;
}

.rosado {
  color: #339fff;
}

.title {
  margin-top: -5px;
  margin-bottom: -5px;
}
</style>
