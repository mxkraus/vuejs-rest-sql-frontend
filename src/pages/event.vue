<template>
  <f7-page name="event">
    <f7-navbar :title="event.evt_title" back-link="Back"></f7-navbar>
    <f7-block-title>Infos zu {{event.evt_title}}:</f7-block-title>
    <f7-block strong>
      {{event.evt_details}}
    </f7-block>
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
  async created() {
    try{
      const res = await axios.get('http://localhost:3000/event/' + this.$f7route.params.id);
      this.event = res.data.event[0];
    }catch(e){
      console.log(e);
    }
  }
};
</script>
