<template>
    <v-row>
        <v-col cols="12" sm="2">
            <p> {{numbering}} {{ question }}</p>
            <!-- Single choice options - start -->
            <div v-for="option in options"  v-if="type == 'SINGLE_CHOICE'">
                <input v-model="this.form['responses'][id]" type="radio" :name="id" :value="option.choice" />
                <label>{{option.choice}}</label>
            </div>
            <!-- Single choice options - end -->
            <!-- Multi choice options - start -->
            <div v-for="option in options" v-if="type == 'MULTI_CHOICE'">
                <input v-model="this.form['responses'][id]" type="checkbox" :name="id" :id="option.id" :value="option.choice" />
                <label>{{option.choice}}</label>
            </div>

            <!-- Multi choice options - end -->
            <input v-if="type == 'TEXT'" v-model="this.form['responses'][id]" placeholder="Enter your response"/>
            <!-- BOOLEAN INPUT - START -->
            <input type="radio" :value="true" v-model="this.form['responses'][id]" :name="id" v-if="type == 'BOOLEAN'"/>
            <label v-if="type == 'BOOLEAN'">Yes</label>
            <br/>
            <input type="radio" :value="false" v-model="this.form['responses'][id]" :name="id" v-if="type == 'BOOLEAN'"/>
            <label v-if="type == 'BOOLEAN'">No</label>
            <!-- BOOLEAN INPUT - END -->
            <!-- SCALE INPUT - START -->
            <div v-for="scale in scales"  v-if="type == 'SCALE'">
                <input type="range" v-model="this.form['responses'][id]" step="1" :min="scale.min" :max="scale.max" :name="id" />
            </div>
            <!-- SCALE INPUT _=- END -->
        </v-col>
    </v-row>
</template>
<script>
export default {
    name: "view-survey-questions",
    props:
        ["survey",
            "id",
            "question",
            "type",
            "options","numbering","scales","form"]
    ,
    data() {
        return {

        }
    }
}
</script>