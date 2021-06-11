<template>
  <q-footer class="color-tabs footer shadow-1">
    <q-tabs class="color-item">
      <q-route-tab name="home" icon="home" to="/home" exact />
      <q-route-tab name="info" icon="info" to="/info" exact />
    </q-tabs>
  </q-footer>
</template>

<script>
export default {
  name: "PageIndex",

  data() {
    return {
      tab: "mails",
    };
  },
};
</script>

<style lang="scss">
@media screen and (min-width: 768px) {
  .q-footer {
    display: none;
  }
}

.footer {
  // height: 50px;
  border-top-right-radius: 20%;
  border-top-left-radius: 20%;
}

.color-tabs {
  background-color: white;
  //box-shadow: 7px 7px 7px 7px rgba(0, 0, 0, 0.2);
}

.color-item {
  color: #c4c4c4;
}

.q-tabs .q-router-link--exact-active {
  color: #339fff !important;
}
</style>
