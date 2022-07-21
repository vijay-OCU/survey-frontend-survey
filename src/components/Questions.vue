<template>
  <v-container>
    <v-row class="justify-center">
      <v-col sm="7">
        <dynamic-form :form="form" @submitted="formSubmitted" @error="processErrrors" @change="valueChange" />
        <!-- <v-btn type="submit" :form="form.id">
          Submit
        </v-btn> -->
        <v-text v-if="error" class="red--text text--lighten-1">
          {{ error }}
        </v-text>
      </v-col>
      <v-col cols="9" sm="1">
        <v-btn size="small" icon="mdi-trash-can" @click="deleteQuestion(question, index)" />
      </v-col>
    </v-row>
    <!-- <v-row>
      <div class="" v-if="selectedType === 'TEXT'">
        <label class="">
          <span class="">Character limit <input type="number" class="" placeholder="" min="1" max="2048"
              :disabled="false"></span>
        </label>
      </div>
    </v-row> -->
    <!-- <v-row>
      <div class="" v-if="selectedType === 'BOOLEAN'">
        <div class="">Answer Choices</div>
        <div class="" v-for="(option, index) in question.options" :key="index">
          <div class="clear-both">
            <input type="text" class="width-100 float-left" placeholder="Enter an answer choice" v-model="option.body">
            <button class="" v-on:click="deleteQuestionOptionItem(question.options, index)"
              v-if="index > 1">Remove</button>
          </div>
        </div>
      </div>
    </v-row> -->

  </v-container>
</template>
<script>
import {
  Validator,
  CheckboxField,
  TextField,
  SelectField,
  required
} from '@asigloo/vue-dynamic-forms'; import '@asigloo/vue-dynamic-forms/dist/themes/default.scss'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    question: Object,
  },
  data() {
    return {
      questionTypes: [
        { value: 'BOOLEAN', label: 'Yes or No' },
        { value: 'MULTI_CHOICE', label: 'Multiple Choice' },
        { value: 'SCALE', label: 'Scale' },
        { value: 'SINGLE_CHOICE', label: 'Single Choice' },
        { value: 'TEXT', label: 'Text' },
      ],
      question: this.options,
      selectedType: 'TEXT',
    };
  },

  name: "Questions",
  setup() {
    let errors = null
    const form = ref({
      id: 'basic-demo',
      fields: {
        name: TextField({
          label: 'Enter the Question',
          validations: [
            Validator({ validator: required, text: 'This field is required' }),
          ],
        }),
        character: SelectField({
          label: 'Select Question Type',
          options: [
            {
              value: 'Boolean',
              label: 'Boolean',
            },
            {
              value: 'SINGLE_CHOICE',
              label: 'Single Choice',
            },
            {
              value: 'MULTI_CHOICE',
              label: 'Multi Choice',
            },
            {
              value: 'TEXT',
              label: 'Text Input',
            },
          ]
        }),
      },
    });
    function processErrrors(errs) {
      errors = errs
    }
    function formSubmitted(vals) {
      console.log(vals)
      this.$emit("addQuestion");
    }

    function valueChange(event) {
      console.log('value Changed');
    }
    return {
      form,
      processErrrors,
      formSubmitted,
      valueChange,
      errors
    };
  },

  methods: {
    deleteQuestion() {
      this.$emit("deleteQuestion");
    },
  },
});
</script>