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
        <v-btn size="small" icon="mdi-trash-can" @click="deleteQuestion(question, index)" :disabled="questionAdded" />
        <v-btn size="small" icon="mdi-content-save-outline" @click="addQuestion(question, index)"
          :disabled="questionAdded" />
        <v-btn size="small" icon="mdi-plus-box-multiple" @click="add()">Add Question</v-btn>
      </v-col>
      <div v-if="addOption">
        <Options v-for="(option, index) in options" :key="index" :option="option"
          @deleteQuestion="deleteOption(option, index)" @addQuestion="saveOption(option, index)" />
      </div>
    </v-row>

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
import Options from '../components/OptionsDisplay.vue';

export default defineComponent({
  props: {
    question: Object,
  },
  data() {
    return {
      selectedOption: { id: 0 },
      currentQuestion: this.question,
      selectedType: 'TEXT',
      questionAdded: false,
      options: [],
      addOption: true,
    };
  },
  components: {
    Options,
  },
  name: "Questions",
  setup(props) {
    let errors = null
    const form = ref({
      id: 'basic-demo',
      fields: {
        questionText: TextField({
          label: 'Enter the Question',
          validations: [
            Validator({ validator: required, text: 'This field is required' }),
          ],
          disabled: false,
        }),
        questionType: SelectField({
          label: 'Select Question Type',
          options: [
            {
              value: 'BOOLEAN',
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
            {
              value: 'SCALE',
              label: 'Scale',
            },
          ],
          disabled: false,
        }),
      },
    });
    function processErrrors(errs) {
      errors = errs
    }
    function formSubmitted(vals) {
      console.log(vals);
      this.$emit("addQuestion");
    }

    function valueChange(event) {
      props.question.type = event.questionType;
      props.question.text = event.questionText;
      console.log('Values:::', event.questionText, ':::', props.question.type, '::::::');
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

    isQuestionAdded() {
      return this.questionAdded;
    },

    deleteQuestion() {
      this.$emit("deleteQuestion");
    },

    addQuestion() {
      this.questionAdded = true;
      this.$emit("addQuestion");
    },
    add() {
      const option = {
        id: this.selectedOption.id,
        text: '',
        type: 'EMPTY',
        options: [],
        scale: []
      }
      this.options.push(JSON.parse(JSON.stringify(option)));
      console.log(JSON.stringify(this.options), 'Adding Question');
      console.log("Added Empty question, Questions Length", this.options.length);
      this.selectedOption.id = this.selectedOption.id + 1;
    },
  },
});
</script>