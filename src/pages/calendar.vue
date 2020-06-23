<template>
  <f7-page name="home">
    <!-- Top Navbar -->
    <f7-navbar :sliding="false">
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title>Störnstein</f7-nav-title>
      <f7-nav-right>
        <f7-link login-screen-open="#my-login-screen">Login</f7-link>
      </f7-nav-right>
      <!-- <f7-nav-title-large>DorfApp</f7-nav-title-large> -->
    </f7-navbar>

    <f7-list v-if="events" class="events">
      <f7-list-item
        v-for="(event) in events"
        :key="event.evt_id"
        :title="event.evt_title"
        :link="`/event/${event.evt_id}/`"
      ></f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>

const axios = require("axios");

export default {
  data: function() {
    return {
      events: [],
      showButton: false
    };
  },
  mounted(){

  },
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
