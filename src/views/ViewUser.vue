<template>
  <h2>User View ({{ user.title || '' }})</h2>
  <h4>{{ message }}</h4>
  <h3></h3>
    <v-row>
    <v-col cols="8" sm="2">
      <span class="text-h6">Survey Name</span>
    </v-col>
    <v-col cols="8" sm="1">
      <span class="text-h6">View</span>
    </v-col>
    <v-col cols="8" sm="1">
      <span class="text-h6">Report</span>
    </v-col>
  </v-row>
  <ReportDisplay
    v-for="report in reports"
    :key="report.id"
    :report="report"
    @deleteReport="goDeleteReport(report)"
    @updatereport="goEditReport(report)"
  />
</template>
<script>
import UserDataService from '../services/UserDataService';
import ReportDataService from '../services/ReportDataService';
import ReportDisplay from '@/components/ReportDisplay.vue';
export default {
  name: 'view-user',
  props: ['id'],
  components: {
    ReportDisplay,
  },
  data() {
    return {
      user: {},
      reports: [],
      message: 'Add, Edit or Delete Reports',
    };
  },
  methods: {
    retrieveReports() {
      UserDataService.get(this.id)
        .then((response) => {
          this.user = response.data;
          ReportDataService.getAllReports(this.id)
            .then((response) => {
              this.tracks = response.data;
            })
            .catch((e) => {
              this.message = e.response.data.message;
            });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    goEditUser() {
      this.$router.push({ name: 'editUser', params: { id: this.id } });
    },
    goEditReport(report) {
      this.$router.push({
        name: 'editReport',
        params: { userId: this.id, reportId: report.id },
      });
    },
    goAddReport() {
      this.$router.push({ name: 'addReport', params: { userId: this.id } });
    },

    goDeleteReport(report) {
      ReportDataService.deleteReport(report.userId, report.id)
        .then(() => {
          this.retrieveReports();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: 'users' });
    },
  },
  mounted() {
    this.retrieveReports();
  },
};
</script>

<style></style>