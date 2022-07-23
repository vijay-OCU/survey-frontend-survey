<template>
  <v-container>
    <v-row class="justify-center">
      <v-col sm="7">
        <dynamic-form :form="optionForm" @submitted="formSubmitted" @error="processErrrors" @change="valueChange"/>
        <!-- <v-btn type="submit" :form="optionForm.id">
          Add Option
        </v-btn> -->
        <v-text v-if="error" class="red--text text--lighten-1">
          {{ error }}
        </v-text>
      </v-col>
      <v-col cols="9" sm="1">
        <v-btn size="small" icon="mdi-trash-can" @click="deleteOption(option, index)" :disabled="questionAdded"  />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import {
  Validator,
  TextField,
  required
} from '@asigloo/vue-dynamic-forms'; import '@asigloo/vue-dynamic-forms/dist/themes/default.scss'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    option: Object,
    questionAdded: Boolean,
  },
  data() {
    return {
      // Option: this.options,
      // selectedType: 'TEXT',
    };
  },

  name: "Options",
  setup(props, context) {
    let errors = null
    const optionForm = ref({
      id: 'option-form',
      fields: {
        optionText: TextField({
          label: 'Enter Option Text',
          validations: [
            Validator({ validator: required, text: 'This field is required' }),
          ],
         disabled: props.questionAdded,
        }),
      },
    });
    function processErrrors(errs) {
      errors = errs
    }
    function formSubmitted(vals) {
      // props.option.text = vals.optionText;
      // console.log('Option', props.option.text);
      // context.emit("saveOption");
    }

    function valueChange(event) {
      console.log('Entered Option', event.optionText);
      props.option.text = event.optionText;
      console.log('Option value Changed:::', props.option);
            console.log('question Saved?:::', props.questionAdded);

    }
    return {
      optionForm,
      processErrrors,
      formSubmitted,
      valueChange,
      errors
    };
  },

  methods: {
    deleteOption() {
      this.$emit("deleteOption");
    },
    // saveOption() {
    //   this.$emit("saveOption");
    // },
  },
});
</script>