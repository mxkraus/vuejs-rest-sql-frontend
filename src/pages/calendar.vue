<template>
  <f7-page name="home">
    <!-- Top Navbar -->
    <f7-navbar large :sliding="false">
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>DorfApp</f7-nav-title>
      <f7-nav-right>
        <!-- <f7-link fill raised login-screen-open="#my-login-screen">Login</f7-link> -->
        <f7-link link="/login/" title="login">Login</f7-link>
      </f7-nav-right>
      <f7-nav-title-large>DorfApp</f7-nav-title-large>
    </f7-navbar>

    <f7-block>
      <img :src="f7logo" alt="">
    </f7-block>

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

// import f7 Logo to tell webpack to cache this asseet
import f7logo from '../static/icons/128x128.png';

export default {
  data: function() {
    return {
      events: [],
      f7logo: f7logo,
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
