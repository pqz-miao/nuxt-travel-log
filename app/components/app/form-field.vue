<script lang="ts" setup>
const { label, error, name, type, disabled } = defineProps<{
  label: string;
  name: string;
  type: "text" | "textarea" | "number";
  error?: string;
  disabled?: boolean;
}>();
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">
      {{ label }}
    </legend>
    <Field
      :as="type === 'textarea' ? 'textarea' : 'input'"
      :name="name"
      :type="type"
      :disabled="disabled"
      class="w-full"
      :class="{
        'input-error': error,
        'input': type === 'number' || type === 'text',
        'textarea': type === 'textarea',
      }"
    />
    <p v-if="error" class="fieldset-label text-error">
      {{ error }}
    </p>
  </fieldset>
</template>
