<template>
  <f7-app :params="f7params">
    <!-- Left panel with cover effect-->
    <f7-panel left reveal theme-dark>
      <f7-view>
        <f7-page>
          <f7-navbar title="Left Panel"></f7-navbar>
          <f7-block>Left panel content goes here</f7-block>
        </f7-page>
      </f7-view>
    </f7-panel>

    <!-- Views/Tabs container -->
    <f7-views tabs class="safe-areas">
      <f7-col width="50">
        <f7-button
          id="installBtn"
          fill
          raised
          @click="installer()"
          :style="{ display: installButtonStyle }"
          >App installieren</f7-button
        >
      </f7-col>

      <!-- Tabbar for switching views-tabs -->
      <f7-toolbar tabbar labels bottom>
        <f7-link
          tab-link="#view-catalog"
          tab-link-active
          icon-ios="f7:home"
          icon-aurora="f7:home"
          icon-md="material:home"
          text="Home"
        ></f7-link>
        <f7-link
          tab-link="#view-events"
          icon-ios="f7:event"
          icon-aurora="f7:event"
          icon-md="material:event"
          text="Kalender"
        ></f7-link>
        <f7-link
          tab-link="#view-settings"
          icon-ios="f7:gear"
          icon-aurora="f7:gear"
          icon-md="material:settings"
          text="Settings"
        ></f7-link>
      </f7-toolbar>


      <!-- Catalog View -->
      <f7-view id="view-catalog" name="catalog" tab url="/"></f7-view>

      <!-- Your main view/tab, should have "view-main" class. It also has "tab-active" class -->
      <f7-view id="view-events" main tab tab-active url="/events/"></f7-view>

      <!-- Settings View -->
      <f7-view id="view-settings" name="settings"  tab url="/settings/" ></f7-view>

    </f7-views>

    <!-- Popup -->
    <f7-popup id="my-popup">
      <f7-view>
        <f7-page>
          <f7-navbar title="Popup">
            <f7-nav-right>
              <f7-link popup-close>Close</f7-link>
            </f7-nav-right>
          </f7-navbar>
          <f7-block>
            <p>Popup content goes here.</p>
          </f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>

    <f7-login-screen id="my-login-screen">
      <f7-view>
        <f7-page login-screen>
          <f7-login-screen-title>Login</f7-login-screen-title>
          <f7-list form>
            <f7-list-input
              type="email"
              name="email"
              placeholder="Your email"
              :value="email"
              @input="email = $event.target.value"
              required
            ></f7-list-input>
            <f7-list-input
              type="password"
              name="password"
              placeholder="Your password"
              :value="password"
              @input="password = $event.target.value"
              required
            ></f7-list-input>
          </f7-list>
          <f7-list>
            <f7-list-button
              title="Sign In"
              @click="login"
            ></f7-list-button>
            <f7-block-footer>
              Some text about login information.<br />Click "Sign In" to close
              Login Screen
            </f7-block-footer>
          </f7-list>
        </f7-page>
      </f7-view>
    </f7-login-screen>
  </f7-app>
</template>
<script>
const axios = require("axios");
//import routes from "../js/routes.js";

export default {
  data() {
    return {
      email: '',
      password: '',
      // Framework7 Parameters
      f7params: {
        name: "DorfApp", // App name
        theme: "auto", // Automatic theme detection
        axios: axios,
        calendar: {
          url: "calendar/",
          dateFormat: "dd.mm.yyyy",
        },
        // App root data
        data: function() {
          return {
            events: [],
            msg: "das ist eine Debug-Nachricht!!!",
            products: [
              {
                id: "1",
                title: "Apple iPhone 8",
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.",
              },
              {
                id: "2",
                title: "Apple iPhone 8 Plus",
                description:
                  "Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!",
              },
              {
                id: "3",
                title: "Apple iPhone X",
                description:
                  "Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.",
              },
            ],
          };
        },
        // App routes
        routes: this.$routes,
        installButtonStyle: "none",
        // Register service worker
        serviceWorker: {
          path: "/service-worker.js",
        },
      },
    };
  },
  methods: { 
    login: function () {

        const self = this;
        const app = self.$f7;

        let email = self.email
        let password = self.password
        
        this.$store.dispatch('login', { email, password })

      .then(() => {
        app.loginScreen.close();
      })
      .catch(err => {
        console.log(err.text);
        app.dialog.alert('Login fehlgeschlagen.', () => {
          app.loginScreen.close();
        });
      })
    }
  },
  mounted() {
    this.$f7ready((f7) => {
      console.log(this.$f7);

      // Call F7 APIs here
      let installPrompt;

      window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        installPrompt = e;
        this.installButtonStyle = "block";
      });

      this.installer = () => {
        this.installButtonStyle = "none";
        installPrompt.prompt();
        installPrompt.userChoice.then((res) => {
          if (res.outcome === "accepted") {
            console.log("User accepted");
          } else {
            console.log("User denied");
          }
          installPrompt = null;
        });
      };
    });
  },
};
</script>
<style lang="scss">
#installBtn {
  border-radius: 0 !important;
  background-color: #29a02d;
}
</style>
