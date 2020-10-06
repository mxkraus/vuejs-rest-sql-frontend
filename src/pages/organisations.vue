<template>
  <f7-page name="calendar">

    <!-- Top Navbar -->
    <f7-navbar :sliding="false">
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title>Störnstein</f7-nav-title>
      <f7-nav-right>
        <f7-link v-if="!isLoggedIn" login-screen-open="#my-login-screen">Login</f7-link>
        <f7-link v-if="isLoggedIn">Logout</f7-link>
      </f7-nav-right>
    </f7-navbar>

    <f7-block-title>Alle Organisationen</f7-block-title>

  </f7-page>
</template>

<script>
const axios = require("axios");

export default {
  data () {
    return {
      orgs: [],
    };
  },
  computed : {
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
  },
  mounted() {},
  async created() {
    try {
      const res = await axios.get("http://localhost:3000/orgs");
      
    } catch (e) {
      console.log(e);
    }
  }
};
</script>
