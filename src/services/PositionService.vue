<template>
    <div></div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios';

export default {
    GetTagPos(TagID,){
        return axios.get(Vue.prototype.$bkURL + "getTagPosition?version=2&tag="+TagID);
    },
}
</script>