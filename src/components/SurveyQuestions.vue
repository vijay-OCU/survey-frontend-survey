<template>
    <br />
    <div class="pa-1" :style="questionStyling">
        <p> {{ numbering }}. {{ question }}</p>

    </div>
    <!-- SCALE INPUT - START -->
    <div v-for="scale in scales" v-if="type == 'SCALE'">
        <v-row class="pa-2">
            <v-col>
                <div style="display: flex;">
                    <span>{{ scale.min }}</span>
                    <input style="margin: 0 10px;" type="range" v-model="this.form['responses'][id]" step="1"
                        :min="scale.min" :max="scale.max" :name="id" />
                    <span>{{ scale.max }}</span>
                </div>
                <br />
                <div :style="questionStyling">Selected Value: {{ this.form['responses'][id] || "Not selected" }}</div>
            </v-col>
        </v-row>
    </div>
    <!-- SCALE INPUT _=- END -->
    <!-- Single choice options - start -->
    <div v-for="option in options" v-if="type == 'SINGLE_CHOICE'">
        <v-row class="pa-1">
            <v-col cols="12" sm="2">
                <input class="pa-1" :style="footerStyles" v-model="this.form['responses'][id]" type="radio" :name="id"
                    :value="option.choice" />
                <label class="pa-1">{{ option.choice }}</label>
            </v-col>
        </v-row>
    </div>
    <!-- Single choice options - end -->
    <!-- Multi choice options - start -->
    <div v-for="option in options" v-if="type == 'MULTI_CHOICE'">
        <v-row class="pa-1">
            <v-col>
                <input v-model="this.form['responses'][`checkbox-${id}-${option.choice}`]" type="checkbox" :name="id"
                    :id="option.id" :value="option.choice" />
                <label class="pa-1">{{ option.choice }}</label>
            </v-col>
        </v-row>
    </div>
    <div v-if="type == 'TEXT'">
        <v-row class="pa-2">
            <v-col>
                <!-- Multi choice options - end -->
                <input v-if="type == 'TEXT'" v-model="this.form['responses'][id]" placeholder="Enter your response" />
            </v-col>
        </v-row>
    </div>
    <div v-if="type == 'BOOLEAN'">
        <v-row class="pa-2">
            <v-col>
                <!-- BOOLEAN INPUT - START -->
                <input type="radio" :value="'true'" v-model="this.form['responses'][id]" :name="id"
                    v-if="type == 'BOOLEAN'" />
                <label class="pa-1" v-if="type == 'BOOLEAN'">Yes</label>
                <br />
                <br />  
                <input type="radio" :value="'false'" v-model="this.form['responses'][id]" :name="id"
                    v-if="type == 'BOOLEAN'" />
                <label class="pa-1" v-if="type == 'BOOLEAN'">No</label>
                <!-- BOOLEAN INPUT - END -->
            </v-col>
        </v-row>
    </div>




</template>
<script>
export default {
    name: "view-survey-questions",
    props:
        ["survey",
            "id",
            "question",
            "type",
            "options", "numbering", "scales", "form"]
    ,
    data() {
        return {
            questionStyling: {
                color: 'black',
                fontSize: '15px',
                fontWeight: 'bold',

            }
        }
    }
}
</script>