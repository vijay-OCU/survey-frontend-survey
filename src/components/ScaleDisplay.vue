<template>
  <v-container>
    <v-row class="justify-center">
      <v-col sm="7">
        <dynamic-form :form="scaleForm" @submitted="formSubmitted" @error="processErrrors" @change="valueChange" />
        <v-text v-if="error" class="red--text text--lighten-1">
          {{ error }}
        </v-text>
      </v-col>
      <v-col cols="9" sm="1">
        <v-btn size="small" icon="mdi-trash-can" @click="deleteScale()" :disabled="true" />
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
    scale: Object,
    questionAdded: Boolean,
  },
  data() {
    return {
    };
  },

  name: "Scales",
  setup(props, context) {
    let errors = null
    const scaleForm = ref({
      id: 'scale-form',
      fields: {
        minValue: TextField({
          label: 'Enter Min Value',
          validations: [
            Validator({ validator: required, text: 'This field is required' }),
          ],
          disabled: props.questionAdded,
        }),
        maxValue: TextField({
          label: 'Enter Max Value',
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
    }

    function valueChange(event) {
      console.log('Entered value', event);
      props.scale.min = event.minValue;
      props.scale.max = event.maxValue;

      console.log('Scale value Changed:::', props.scale.min, props.scale.max);

    }
    return {
      scaleForm,
      processErrrors,
      formSubmitted,
      valueChange,
      errors
    };
  },

  methods: {
    deleteScale() {
      this.$emit("deleteScale");
    },
  },
});
</script>