<script>
import { RouterLink, RouterView } from "vue-router";

export default {
    created() {
        this.$store.dispatch("checkLocalStorage");
    },
};
</script>

<template>
    <RouterView />
</template>
