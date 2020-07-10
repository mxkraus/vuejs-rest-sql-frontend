<template>
  <f7-page name="calendar">

    <!-- Top Navbar -->
    <f7-navbar :sliding="false">
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title>Störnstein</f7-nav-title>
      <f7-nav-right>
        <f7-link login-screen-open="#my-login-screen">Login</f7-link>
      </f7-nav-right>
    </f7-navbar>

    <f7-block-title>Alle Termine</f7-block-title>

    <f7-list v-if="events" class="page-content">
      <f7-list-item
        v-for="(event) in events"
        :key="event.evt_id"
        :title="event.evt_title"
        :link="`/event/${event.evt_id}/`"
      ></f7-list-item>
      <f7-list-item>
        <f7-button href="/add-event/" fill>Termin hinzufügen</f7-button>
      </f7-list-item>
    </f7-list>

  </f7-page>
</template>

<script>
const axios = require("axios");

export default {
  data () {
    return {
      events: [],
      showButton: false
    };
  },
  mounted() {},
  async created() {
    try {
      const res = await axios.get("http://localhost:3000/events");
      this.events = res.data.events;
    } catch (e) {
      console.log(e);
    }
  }
};
</script>
