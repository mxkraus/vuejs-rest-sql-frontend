<template>
  <f7-page name="addevent">
    <!-- Top Navbar -->
    <f7-navbar :sliding="false">
      <f7-nav-left>
        <f7-link back>Zurück</f7-link>
        <!-- <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link> -->
      </f7-nav-left>
      <f7-nav-title>Termin hinzufügen</f7-nav-title>
      <!-- <f7-nav-right>
        <f7-link login-screen-open="#my-login-screen">Login</f7-link>
      </f7-nav-right>-->
    </f7-navbar>

    <f7-block strong>
      <f7-block-title>Neuen Termin erstellen</f7-block-title>

      <form id="my-form" class="form-ajax-submit" action="send-here.html" method="POST">
        <f7-list no-hairlines-md>
          <f7-list-input
            name="evt_title"
            label="Titel"
            type="text"
            placeholder="Um was geht´s?"
            validate="true"
          ></f7-list-input>
          <f7-list-input
            name="evt_time_from"
            label="Startzeitpunkt"
            type="date"
            placeholder="Beginn"
          ></f7-list-input>
          <f7-list-input name="evt_time_to" label="Endzeitpunkt" type="date"></f7-list-input>
          <f7-list-input name="evt_organizer" label="Organisator" type="select">
            <option value="0">- Auswählen -</option>
            <option
              :value="c.org_id"
              v-for="c in this.organisations"
              :key="c.org_id"
            >{{c.org_fullname}}</option>
          </f7-list-input>
          <f7-list-input
            name="evt_details"
            label="Beschreibung"
            type="textarea"
            placeholder="Details zum Event"
          ></f7-list-input>

          <!-- Submit Form -->
          <f7-button @click="eventFormSubmit()">Speichern</f7-button>
        </f7-list>
      </form>
    </f7-block>
  </f7-page>
</template>

<script>
const axios = require("axios");

export default {
  data: function() {
    return {
      formData: {
        evt_title: ""
      },
      events: [],
      showButton: false,
      organisations: []
    };
  },
  computed : {
    token : function(){ return this.$store.getters.authToken}
  },
  mounted() {},
  async created() {
    try {
      const res = await axios.get("http://localhost:3000/orgs?usr_id=51");
      this.organisations = res.data.orgs;
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    
    async eventFormSubmit() {
      var formData = this.$f7.form.convertToData("#my-form");
      this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
      const res = await this.$http.post(
        "http://localhost:3000/event",
        formData
      );
      if (res.status == 201) {
        this.$f7.dialog.alert("Neuer Termin wurd erstellt.", () => {
          const prev = this.$f7router.previousRoute.url;
          this.$f7router.back(prev, {
            ignoreCache: true,
            force: true,
            context: {}
          });
        });
      }
    }

  }
};
</script>
