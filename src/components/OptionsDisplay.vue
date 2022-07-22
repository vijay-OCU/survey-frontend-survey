<template>
  <v-container>
    <v-row class="justify-center">
      <v-col sm="7">
        <dynamic-form :form="form" @submitted="formSubmitted" @error="processErrrors" @change="valueChanged" />
        <v-text v-if="error" class="red--text text--lighten-1">
          {{ error }}
        </v-text>
      </v-col>
      <v-col cols="9" sm="1">
        <v-btn size="small" icon="mdi-trash-can" @click="deleteOption(Option, index)" />
      </v-col>
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

export default defineComponent({
  props: {
    Option: Object,
  },
  data() {
    return {
      Option: this.options,
      selectedType: 'TEXT',
    };
  },

  name: "Options",
  setup() {
    let errors = null
    const form = ref({
      id: 'basic-demo',
      fields: {
        name: TextField({
          label: 'Enter the Option',
          validations: [
            Validator({ validator: required, text: 'This field is required' }),
          ],
        }),
      },
    });
    function processErrrors(errs) {
      errors = errs
    }
    function formSubmitted(vals) {
      console.log(vals)
      this.$emit("addOption");
    }

    function valueChanged(values) {
      console.log('Values', values);
    }
    return {
      form,
      processErrrors,
      formSubmitted,
      valueChanged,
      errors
    };
  },

  methods: {
    deleteOption() {
      this.$emit("deleteOption");
    },
  },
});
</script>