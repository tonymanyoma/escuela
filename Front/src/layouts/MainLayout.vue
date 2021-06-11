<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink";

export default {
  name: "MainLayout",

  created: function () {
    this.Existuser();

    screen.orientation.lock("portrait");
  },

  components: {
    EssentialLink,
  },

  data() {
    return {
      confirm: false,
      tab: "mails",
      leftDrawerOpen: false,
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
    Existuser() {
      const authToken = window.localStorage.getItem("token");
    },
  },
};
</script>

<style lang="scss">
.q-item {
  color: #a9a9a9;
}

.color-ro {
  background-color: #339fff;
  color: white;
}

/*.fixed{

  position:fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 2;

}*/
</style>
