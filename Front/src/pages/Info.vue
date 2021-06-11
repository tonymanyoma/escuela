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
      <h4 class="title">Acerca de esta App</h4>
      <br />

      <img src="statics/images/student.jpg" alt="Nature" class="img" />
    </q-scroll-area>

    <div>
      <TabsLayout></TabsLayout>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageInfo",

  created: function () {
    this.Height_scroll();
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

      renderComponent: true,
      Productos: [],
      id_ciudad: "",
      slide: 1,
      slide: "style",
      height: 0,
    };
  },

  mounted() {},

  methods: {
    Height_scroll() {
      this.height = screen.height;
    },
  },
};
</script>

<style>
.text {
  text-align: center;
}

.title {
  text-align: center;
}

img {
  width: 100%;
  height: auto;
}
</style>
