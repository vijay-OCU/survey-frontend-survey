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
        <v-btn size="small" icon="mdi-plus-box-multiple" @click="add()" :disabled="questionAdded">Add Question</v-btn>
      </v-col>
      <div v-if="this.question.showOptions">
        <Options v-for="(option, index) in options" :key="index" :option="option" :questionAdded="this.questionAdded"
          @deleteOption="deleteOption(option, index)" @saveOption="saveOption(option, index)" />
      </div>
      <div v-if="this.question.showScale">
        <Scale :scale="scale" :questionAdded="this.questionAdded" @deleteScale="deleteScale" />
      </div>
    </v-row>

  </v-container>
</template>
<script>
import {
  Validator,
  TextField,
  SelectField,
  required
} from '@asigloo/vue-dynamic-forms'; import '@asigloo/vue-dynamic-forms/dist/themes/default.scss'
import { defineComponent, ref } from 'vue'
import Options from '../components/OptionsDisplay.vue';
import Scale from '../components/ScaleDisplay.vue';

export default defineComponent({
  props: {
    question: Object,
  },
  data() {
    return {
      selectedOption: { id: 0 },
      questionAdded: false,
      options: [],
      scale: {},
      showOptions: false,
      showScale: false,
    };
  },
  components: {
    Options,
    Scale,
  },
  name: "Questions",
  setup(props, context) {
    let errors = null
    const form = ref({
      id: 'question-form',
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
      // console.log(vals);
      // this.$emit("addQuestion");
    }

    function valueChange(event) {
      props.question.type = event.questionType;
      props.question.text = event.questionText;
      console.log('question Saved?? ', props.questionAdded);
      console.log('Values:::', event.questionText, ':::', props.question.type, '::::::');

      if (props.question.type == 'SCALE') {
        props.question.options = [];
        console.log('Enabling Scale');
        props.question.showOptions = false;
        props.question.showScale = true;
      }
      else if (props.question.type == 'SINGLE_CHOICE' || props.question.type == 'MULTI_CHOICE' || props.question.type == 'BOOLEAN') {
        console.log('Enabling Option');
        props.question.scale = null;
        props.question.showOptions = true;
        props.question.showScale = false;
      }
      else {
        props.question.options = [];
        props.question.scale = null;

        props.question.showOptions = false;
        props.question.showScale = false;
      }
      console.log('question After Saving', props.question);
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
      this.question.options = this.options;
      const updatedScale = {
        "min": this.scale.min,
        "max": this.scale.max
      }
      console.log(this.question.scale, 'Scale Values');
      this.question.scale = updatedScale;
      this.$emit("addQuestion");
    },

    deleteOption(option, index) {
      this.options.splice(index, 1);
      console.log("Deleted option with Index:", index, "Questions Length", this.options.length);
    },

    deleteScale() {
      this.question.scale = [];
      this.showScale = false;
    },


    saveOption(option, index) {
      console.log(JSON.stringify(this.options), 'Saving Option, with Index ->', index);
      if (index >= 0) {
        this.options.splice(index, 1, option.text);
      }
      console.log("Saved Option:", index, "Options Length", this.options.length, JSON.stringify(this.options));

    },


    add() {
      const option = {
        id: this.selectedOption.id,
        text: '',
      }
      this.options.push(JSON.parse(JSON.stringify(option)));
      console.log(JSON.stringify(this.options), 'Adding Option');
      console.log("Added Empty option, Options Length", this.options.length);
      this.selectedOption.id = this.selectedOption.id + 1;
    },
  },
});
</script>