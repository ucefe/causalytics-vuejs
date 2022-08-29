<template>
  <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 2xl:col-span-2">
    <div class="flex items-center justify-between mb-4">
      <div class="flex-shrink-0">
        <h3 class="text-xl font-normal text-gray-500">Cost Per Click (CPC)</h3>
      </div>
      <div class="flex">
        <litepie-datepicker
          use-range
          :formatter="{ date: 'YYYY-MM-DD' }"
          v-model="dateValue"
        ></litepie-datepicker>
      </div>
    </div>

    <div v-if="loading" role="status">
      <svg
        aria-hidden="true"
        class="m-44 w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    </div>

    <the-alert
      v-if="noData"
      :alert-type="'blue'"
      title="No Campaigns Data Found!"
    ></the-alert>
    <Bar
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script>
import { defineComponent, h } from "vue";
import LitepieDatepicker from "litepie-datepicker";
import { Bar } from "vue-chartjs";
import TheAlert from "../layouts/TheAlert.vue";
import { ref } from "vue";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement
);

export default {
  name: "BarChart",
  components: { Bar, TheAlert, LitepieDatepicker },
  props: {
    chartId: {
      type: String,
      default: "bar-chart"
    },
    datasetIdKey: {
      type: String,
      default: "label"
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 180
    },
    cssClasses: {
      default: "",
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dateValue: [],
      infos: null,
      loading: true,
      noData: false,
      errored: null,
      chartData: {
        labels: ["Campaign Name"],
        datasets: []
      },

      chartOptions: {
        responsive: true
      }
    };
  },

  watch: {
    dateValue(val) {
      if (val[0] && val[1]) {
        this.fetchCampaignsInfo(val[0], val[1]);
      }
    }
  },

  methods: {
    generateRandomColor() {
      let maxVal = 82567; // 16777215
      let randomNumber = Math.random() * maxVal;
      randomNumber = Math.floor(randomNumber);
      randomNumber = randomNumber.toString(16);
      let randColor = randomNumber.padStart(6, 0);
      return `#${randColor.toUpperCase()}`;
    },

    async fetchCampaignsInfo(from, to) {
      this.loading = true;
      this.chartData.datasets = [];
      this.noData = false;
      const res = await fetch(
        ".netlify/functions/facebook?from=" + from + "&to=" + to,
        { method: "get" }
      );
      if (!res.ok) {
        this.loading = false;

        this.noData = true;
        throw new Error(res.message || "Failed fetch !");
      }
      let resp = await res.json();
      this.info = resp.data;
      if (this.info.length > 0) {
        this.info.forEach(data => {
          this.chartData.datasets.push({
            label: data.campaign_name,
            backgroundColor: this.generateRandomColor(),
            data: [data.cpc]
          });
        });
      } else {
        this.noData = true;
        this.chartData.datasets.push({
          label: "",
          backgroundColor: "#FFFFFF",
          data: []
        });
      }
      this.loading = false;
    }
  },
  mounted() {
    this.fetchCampaignsInfo("2021-01-07", "2022-08-07");
  }
};
</script>
