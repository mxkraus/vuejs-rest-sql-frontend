<template>
  <f7-page name="event">
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

    <f7-block-title>Infos zu {{event.evt_title}}:</f7-block-title>
    <f7-list simple-list>
      <f7-list-item>{{event.org_fullname}}</f7-list-item>
      <f7-list-item>{{event.evt_title}}</f7-list-item>
      <f7-list-item>{{event.evt_details}}</f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
const axios = require("axios");

export default {
  data: function() {
    return {
      event: {}
    };
  },
  computed: {},
  async created() {
    try {
      const res = await axios.get(
        "http://localhost:3000/event/" + this.$f7route.params.id
      );
      this.event = res.data.event[0];
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  }
};
</script>
