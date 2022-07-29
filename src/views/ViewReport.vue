<template>
    <TopBar :showTabs="this.role == 'admin' ? 'true' : 'false'" :accessToken="this.accessToken" :role="this.role"
        :currentUserId="this.currentUserId" />
    <h1>{{ survey?.name }}</h1>

    <div id="chart" cols="12" sm="2">
        <apexchart type="pie" width="500" :options="this.chartOptions" :series="this.series"></apexchart>
    </div>
</template>
<script>
import TopBar from './TopBar.vue';
import SurveyQuestions from '../components/SurveyQuestions.vue'
import SurveyDataService from '../services/SurveyDataService';
import VueApexCharts from 'vue3-apexcharts'

export default {
    name: "view-report",
    props: ['accessToken', 'role', 'currentUserId', 'id'],
    data() {
        return {
            survey: {},
            series: [5, 5, 5, 5, 10],
            chartOptions: {
                labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
                responsive: [{
                    breakpoint: 100,
                    options: {
                        // chart: {
                        //     width: 100
                        // },
                        legend: {
                            position: 'top'
                        }
                    }
                }]
            },
        }
    },
    components: {
        TopBar,
        SurveyQuestions,
        apexchart: VueApexCharts,

    },
    methods: {
        retrieveSurvey() {
            const data = {}
            SurveyDataService.get(this.id, data)
                .then(response => {
                    this.survey = response.data[0];
                })
                .catch(e => {
                    this.message = e.response.data.message;
                });
        },
    },
    mounted() {
        this.retrieveSurvey();
    },
    watch: {
        $route() {
            this.retrieveSurvey();
        },
    },
}
</script>