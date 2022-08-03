<template>
    <TopBar :showTabs="this.role == 'admin' ? 'true' : 'false'" :accessToken="this.accessToken" :role="this.role"
        :currentUserId="this.currentUserId" />
    <br />
    <h1>{{ survey?.name }} Report</h1>
    <v-btn size="small" @click="goBack()">Go Back</v-btn>
    <br />

    <div id="chart" cols="12" sm="2">
        <apexchart width="700" v-for="question in questions" :options="question.chartOptions" :series="question.series">
        </apexchart>
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
            questions: [],
        }
    },
    components: {
        TopBar,
        SurveyQuestions,
        apexchart: VueApexCharts,

    },
    methods: {
        goBack() {
            this.$router.push({
                name: 'surveys', params: {
                    accessToken: this.accessToken,
                    role: this.role,
                    currentUserId: this.currentUserId
                }
            });
        },
        retrieveSurvey() {
            const data = {}
            SurveyDataService.get(this.id, data)
                .then(responseBody => {
                    this.survey = responseBody.data[0];
                    for (let [index, ques] of this.survey.questions.entries()) {
                        const series = [];
                        const chartOptions = getDefaultChartOptions();
                        if (ques.responses.length > 0) {
                            var result = this.groupBy(ques.responses);
                            result.forEach(resp => {
                                series.push(resp.length);
                                chartOptions.title.text = index++ + ". " + ques.question;
                                chartOptions.labels.push(resp[0].response);
                            });
                            var question = { series, chartOptions }
                            this.questions.push(question);
                        }
                    }
                })
                .catch(e => {
                    console.log('exception:  ', e);
                });
        },

        groupBy(collection) {
            var i = 0, val, index,
                values = [], result = [];
            for (; i < collection.length; i++) {
                val = collection[i]["response"];
                index = values.indexOf(val);
                if (index > -1)
                    result[index].push(collection[i]);
                else {
                    values.push(val);
                    result.push([collection[i]]);
                }
            }
            return result;
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

function getDefaultChartOptions() {
    return {
        plotOptions: {
            pie: {
                size: 500,
                donut: {
                    size: '65%',
                    background: 'transparent',
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '22px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 600,
                            color: undefined,
                            offsetY: -10,
                            formatter: function (val) {
                                return val
                            }
                        },
                        value: {
                            show: true,
                            fontSize: '16px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 400,
                            color: undefined,
                            offsetY: 16,
                            formatter: function (val) {
                                return val
                            }
                        },
                        total: {
                            show: true,
                            showAlways: false,
                            label: 'Total',
                            fontSize: '22px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 600,
                            color: '#373d3f',
                            formatter: function (w) {
                                return w.globals.seriesTotals.reduce((a, b) => {
                                    return a + b
                                }, 0)
                            }
                        }
                    }
                },
            }
        },
        labels: [],
        title: {
            text: "",
            align: 'left',
            margin: 25,
            offsetX: 0,
            offsetY: 0,
            floating: true,
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                fontFamily: 'Helvetica, Arial, sans-serif',
                color: '#263238'
            },
        },
        chart: {
            type: 'donut',
        },
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
    };
}
</script>