<template>
  <svg viewBox="0 0 40 2" class="input-line-svg" preserveAspectRatio="none">
    <path d="M0 1 L40 1" />
    <path class="focus" d="M0 1 L40 1" />
    <path class="invalid" d="M0 1 L40 1" />
    <path class="valid" d="M0 1 L40 1" />
  </svg>
</template>

<script>
export default {};
</script>

<style>
.input-line-svg .focus,
.input-line-svg .valid,
.input-line-svg .invalid {
  transition: all 0.2s ease-in;
  stroke-dasharray: 0 20;
  stroke-dashoffset: -20;
}
.input-line-svg .focus {
  stroke: var(--col-2);
}
.input-line-svg .invalid {
  stroke: var(--col-rejected);
}
.input-line-svg .valid {
  stroke: var(--col-approved);
}

input:focus ~ .input-line-svg .focus,
input:valid ~ .input-line-svg .valid,
input[data-touched]:invalid ~ .input-line-svg .invalid,
textarea:focus ~ .input-line-svg .focus,
textarea:valid ~ .input-line-svg .valid,
textarea[data-touched]:invalid ~ .input-line-svg .invalid {
  stroke-dasharray: 40 0;
  stroke-dashoffset: 0;
}
</style>
