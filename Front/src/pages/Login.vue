<template>
  <div>
    <img class="wave-login" src="statics/images/wave2.png" />
    <div class="container-login">
      <div class="img animar">
        <!--<img src="statics/images/welcome.svg">-->
      </div>
      <div class="login-content">
        <div class="form-signin">
          <img src="statics/images/user.png" class="img-avatar" />
          <h5 class="title">Bienvenido</h5>

          <br />

          <div class="form-group">
            <q-input color="grey-5" filled v-model="usuario" label="Usuario">
              <template v-slot:prepend>
                <q-icon
                  name="account_circle"
                  class="input-color"
                  color="grey-5"
                />
              </template>
            </q-input>
          </div>
          <br />
          <div class="form-group">
            <q-input
              v-model="password"
              filled
              color="grey-5"
              :type="isPwd ? 'password' : 'text'"
              label="Contraseña"
            >
              <template v-slot:prepend>
                <q-icon name="lock" color="grey-5" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer input-color"
                  @click="isPwd = !isPwd"
                  color="grey-5"
                />
              </template>
            </q-input>
          </div>

          <input
            type="submit"
            class="btn-login"
            value="Iniciar Sesión"
            @click.prevent="login()"
          />

          <br />

          <div class="row">
            <div class="col-4">
              <hr class="my-4" />
            </div>

            <div class="col-4" style="margin-top: -10px">
              <span class="cambio-color">O</span>
            </div>

            <div class="col-4">
              <hr class="my-4" />
            </div>
          </div>

          <br />

          <br /><br />
          <router-link
            :to="{ name: 'register' }"
            class="item item-link"
            tag="div"
            ><span class="cambio-color"
              >¿No tienes una cuenta? Regístrate</span
            ></router-link
          >
          <br /><br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import facebookLogin from "facebook-login-vuejs";
//import GoogleLogin from 'vue-google-login';

export default {
  data() {
    return {
      icon: "statics/images/icon.png",
      prueba: "",
      alert: false,
      isPwd: true,
      usuario: "",
      password: "",
      user: [],

      isConnected: false,
      name: "",
      email_fb: "",
      personalID: "",
      FB: undefined,
    };
  },

  methods: {
    login() {
      if (this.usuario == "" || this.password == "") {
        this.$vs.notify({
          text: "Debes ingresar un usuario y una contraseña",
          color: "danger",
          icon: "warning",
        });
      } else {
        this.$vs.loading({
          color: "#339FFF",
          type: "corners",
        });

        const authUser = {};

        this.$axios
          .post("/api/login", {
            usuario: this.usuario,
            password: this.password,
          })

          .then((response) => {
            if (response.data.code == 1) {
              //si el usuario no se encuentra registrado

              this.$vs.notify({
                text: "El usuario ingresado no se encuentra registrado",
                color: "danger",
                icon: "warning",
              });

              this.$vs.loading.close();

              this.usuario = "";
              this.password = "";
            } else {
              localStorage.setItem("token", response.data.token);

              localStorage.setItem(
                "lbUser",
                JSON.stringify(response.data.user)
              );

              const redirectTo = "home";
              this.$router.push({ name: redirectTo });

              this.$vs.loading.close();
            }
          })
          .catch((error) => {});
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

.or {
  color: white;
}

.icono {
  position: absolute;
  top: 3px;
  left: 2px;
  width: 30px;
}

.button-facebbok {
  position: relative;
  padding: 0 5px 0px 20px;
  border: none;
  line-height: 34px;
  font-size: 14px;
  color: #fff;
  min-width: 225px;
  background-image: linear-gradient(#4c69ba, #3b55a0);
}
</style>
