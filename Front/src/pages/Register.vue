<template>
  <div>
    <img class="wave-login" src="statics/images/wave2.png" />

    <q-scroll-area
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      v-bind:style="{ height: this.height + 'px' }"
    >
      <div class="container-login">
        <div class="img animar"></div>

        <div class="login-content">
          <div class="form-signin">
            <br />

            <img src="statics/images/user.png" class="img-avatar" />
            <h5 class="title">Bienvenido</h5>

            <br />

            <div v-if="step === 1">
              <vs-row>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center">
                  <vs-input
                    color="#339FFF"
                    v-model="nombre_completo"
                    class="font-body align-text"
                    placeholder="Nombre completo"
                  />
                </vs-col>
              </vs-row>

              <br />

              <vs-row>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center">
                  <vs-select
                    class="selectExample"
                    placeholder="Tipo de documento"
                    v-model="id_tipo_documento"
                    width="200px"
                    color="#fbb03b"
                  >
                    <vs-select-item
                      :key="index"
                      :value="item.id"
                      :name="item.marcador"
                      :text="item.nombre"
                      v-for="(item, index) in arraydocumentos"
                    />
                  </vs-select>
                </vs-col>
              </vs-row>

              <br />

              <vs-row>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center">
                  <vs-input
                    color="#339FFF"
                    v-model="numero_documento"
                    class="font-body align-text"
                    placeholder="Número documento"
                  />
                </vs-col>
              </vs-row>

              <br />
              <vs-row>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center">
                  <vs-input
                    color="#339FFF"
                    v-model="telefono"
                    class="font-body align-text"
                    placeholder="Teléfono"
                  />
                </vs-col>
              </vs-row>

              <br />

              <vs-row>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center">
                  <vs-input
                    color="#339FFF"
                    v-model="direccion"
                    class="font-body align-text"
                    placeholder="Dirección"
                  />
                </vs-col>
              </vs-row>

              <input
                type="submit"
                @click.prevent="next()"
                class="btn-form"
                value="Siguiente"
              />
            </div>

            <div v-if="step === 2">
              <vs-row>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center">
                  <vs-input
                    color="#339FFF"
                    v-model="usuario"
                    class="font-body align-text"
                    placeholder="Usuario"
                  />
                </vs-col>
              </vs-row>

              <br />

              <vs-row>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center">
                  <vs-input
                    color="#339FFF"
                    type="password"
                    v-model="password"
                    class="font-body align-text"
                    placeholder="Contraseña"
                  />
                </vs-col>
              </vs-row>

              <br />

              <vs-row>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center">
                  <vs-input
                    color="#339FFF"
                    type="password"
                    v-model="password_confirmation"
                    class="font-body align-text"
                    placeholder="Confirmar contraseña"
                  />
                </vs-col>
              </vs-row>

              <input
                type="submit"
                @click.prevent="prev()"
                class="btn-form"
                value="Atrás"
              />

              <input
                type="submit"
                class="btn-login"
                value="Crear cuenta"
                @click="register"
              />
            </div>

            <br />
            <router-link
              :to="{ name: 'login' }"
              class="item item-link"
              tag="div"
            >
              <span class="cambio-color"
                >¿Ya tienes una cuenta? Inicia Sesión</span
              >
            </router-link>

            <br /><br />
          </div>
        </div>
      </div>
    </q-scroll-area>
  </div>
</template>

<script>
export default {
  created: function () {
    this.select_tipo_documento();
    this.Height_scroll();
  },

  data() {
    return {
      alert: false,
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

      isPwd: true,
      email: null,
      password: null,
      user: [],
      accept: false,
      numero_documento: "",
      nombre_completo: "",
      id_tipo_documento: "",
      email: "",
      password: "",

      telefono: "",
      direccion: "",
      password_confirmation: "",
      has_error: false,
      error: "",
      errors: {},
      success: false,
      arraydocumentos: [],
      arraydepartamentos: [],
      arrayciudads: [],
      loading: true,
      toggle: true,
      markers: [],
      places: [],
      terminos: false,
      height: 0,
      step: 1,
      usuario: "",
    };
  },

  mounted() {},

  methods: {
    prev() {
      this.step--;
    },
    next() {
      if (
        this.step == 1 &&
        (this.nombre_completo == "" ||
          this.id_tipo_documento == "" ||
          this.numero_documento == "" ||
          this.telefono == "" ||
          this.direccion == "")
      ) {
        this.$vs.notify({
          text: "Debes completar la información para continuar",
          color: "danger",
          icon: "warning",
        });
      } else {
        this.step++;
      }
    },

    Height_scroll() {
      this.height = screen.height;
    },

    select_tipo_documento() {
      let me = this;
      let url = "/api/tiposDocumentos";
      this.$axios
        .get(url)
        .then((response) => {
          me.arraydocumentos = response.data;
          //console.log(me.arraydocumentos);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },

    register() {
      if (
        this.nombre_completo == "" ||
        this.id_tipo_documento == "" ||
        this.numero_documento == "" ||
        this.telefono == "" ||
        this.direccion == "" ||
        this.usuario == "" ||
        this.password == "" ||
        this.password_confirmation == ""
      ) {
        this.$vs.notify({
          text: "Debes completar la información para continuar",
          color: "danger",
          icon: "warning",
        });
      } else {
        this.$vs.loading({
          color: "#339FFF",
          type: "corners",
        });

        this.$axios
          .post("/api/register", {
            nombre_completo: this.nombre_completo,
            id_tipo_documento: this.id_tipo_documento,
            numero_documento: this.numero_documento,
            direccion: this.direccion,
            telefono: this.telefono,
            usuario: this.usuario,
            password: this.password,
            password_confirmation: this.password_confirmation,
            id_role: 2,
          })
          .then((response) => {
            if (response.data.code == 1) {
              this.$vs.notify({
                text: "Este usuario ya se encuentra registrado",
                color: "danger",
                icon: "warning",
              });

              this.$vs.loading.close();
            } else {
              this.$vs.notify({
                text: "Cuenta creada con éxito",
                color: "success",
                icon: "done",
              });

              const redirectTo = "login";
              this.$router.push({ name: redirectTo });

              this.$vs.loading.close();
            }
          })
          .catch((error) => {
            if (error.response.data.code == 1) {
              this.$vs.notify({
                text: "Este usuario ya se encuentra registrado",
                color: "danger",
                icon: "warning",
              });

              this.$q.loading.hide();
            }
          });
      }
    },
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  font-family: "Poppins", sans-serif;
  overflow: hidden;
}

.wave-login {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 100%;
  z-index: -1;
}

.container-login {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 7rem;
  padding: 0 2rem;
}

.img {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.logo {
  position: absolute;
  bottom: 5px;
  right: 10px;
  width: 80px;
}

.login-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
}

.img img {
  width: 500px;
}

form-login {
  width: 360px;
}

.login-content .img-avatar {
  height: 100px;
}

.login-content-login h2 {
  margin: 15px 0;
  color: #333;
  text-transform: uppercase;
  font-size: 2.9rem;
}

.login-content-login .input-div {
  position: relative;
  display: grid;
  grid-template-columns: 7% 93%;
  margin: 25px 0;
  padding: 5px 0;
  border-bottom: 2px solid #d9d9d9;
}

.login-content-login .input-div.one {
  margin-top: 0;
}

.i-login {
  color: #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
}

.i-login i {
  transition: 0.3s;
}

.input-div-login > div {
  position: relative;
  height: 45px;
}

.input-div-login > div > h5 {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 18px;
  transition: 0.3s;
}

.input-div-login:before,
.input-div:after {
  content: "";
  position: absolute;
  bottom: -2px;
  width: 0%;
  height: 2px;
  background-color: #38d39f;
  transition: 0.4s;
}

.input-div-login:before {
  right: 50%;
}

.input-div-login:after {
  left: 50%;
}

.input-div-login.focus:before,
.input-div.focus:after {
  width: 50%;
}

.input-div-login.focus > div > h5 {
  top: -5px;
  font-size: 15px;
}

.input-div-login.focus > .i > i {
  color: #38d39f;
}

.input-div-login > div > input {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: none;
  padding: 0.5rem 0.7rem;
  font-size: 1.2rem;
  color: #555;
  font-family: "poppins", sans-serif;
}

.input-div-login.pass {
  margin-bottom: 4px;
}

a-login {
  display: block;
  text-align: right;
  text-decoration: none;
  color: #999;
  font-size: 0.9rem;
  transition: 0.3s;
}

a:hover {
  color: #7f82eb;
}

.btn-form {
  width: 45%;
  height: 30px;
  border-radius: 25px;
  outline: none;
  border: none;
  background-image: linear-gradient(to right, #7476b3, #7f82eb, #7476b3);
  background-size: 200%;
  font-size: 1.1rem;
  color: #fff;
  font-family: "Poppins", sans-serif;

  margin: 1rem 0;
  cursor: pointer;
  transition: 0.5s;
}

.btn-login {
  display: block;
  width: 100%;
  height: 50px;
  border-radius: 25px;
  outline: none;
  border: none;
  background-image: linear-gradient(to right, #7476b3, #7f82eb, #7476b3);
  background-size: 200%;
  font-size: 1.2rem;
  color: #fff;
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  margin: 1rem 0;
  cursor: pointer;
  transition: 0.5s;
}

.btn-login:hover {
  background-position: right;
}

@media screen and (max-width: 1050px) {
  .container-login {
    grid-gap: 15rem;
  }
}

@media screen and (max-width: 1000px) {
  form-login {
    width: 290px;
  }

  .login-content-login h2 {
    font-size: 2.4rem;
    margin: 8px 0;
  }

  .img img {
    width: 400px;
  }
}

@media screen and (max-width: 900px) {
  .container-login {
    grid-template-columns: 1fr;
  }

  .img {
    display: none;
  }

  .wave {
    display: none;
  }

  .login-content {
    justify-content: center;
  }
}

.bg-mo {
  background-color: #7f82eb;
  color: white;
}

.bg-ro {
  background-color: #c35d89;
  color: white;
}

.input-color {
  color: #a3a0a2;
}

@media only screen and (min-width: 300px) and (max-width: 710px) {
  .cambio-color {
    color: white !important;
  }
}

.animar {
  animation: bounce1 0.5s alternate infinite ease-in;
}

@keyframes bounce1 {
  0% {
    transform: translateY(-2%);
  }

  100% {
    transform: translateY(0%);
  }
}

.gif-style {
  width: 310px;
  height: 172px;
}
</style>
