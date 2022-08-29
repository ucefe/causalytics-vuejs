<template>
  <nav-bar></nav-bar>
  <div class="flex overflow-hidden bg-white pt-16">
    <side-nav></side-nav>
    <div
      id="main-content"
      class="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64"
    >
      <main>
        <div class="pt-6 px-4">
          <div
            class="w-full grid grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-4"
          >
            <bar-chart></bar-chart>
          </div>
        </div>
      </main>
    </div>
  </div>
  <the-footer></the-footer>
</template>

<script>
import SideNav from "@/components/dashboard/SideNav.vue";
import NavBar from "@/components/dashboard/NavBar.vue";
import BarChart from "@/components/dashboard/BarChart.vue";
import TheFooter from "@/components/layouts/TheFooter.vue";

export default {
  components: {
    SideNav,
    NavBar,
    BarChart,
    TheFooter
  }
};
</script>
