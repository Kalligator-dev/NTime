<template>
  <div id="logo-box">
    <div id="logo">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 632.57 632.57">
        <polygon
          class="cls-1"
          points="195.24 503.3 8.22 316.29 195.24 129.28 239.78 173.83 97.32 316.29 239.78 458.75 195.24 503.3"
        />
        <polygon
          class="cls-1"
          points="436.4 503.3 391.85 458.75 534.31 316.29 391.85 173.83 436.4 129.28 623.41 316.29 436.4 503.3"
        />
        <polygon
          class="cls-2"
          points="362.79 114.54 362.79 146.04 331.57 146.04 331.57 316.29 300.07 316.29 300.07 146.04 269.79 146.04 269.79 114.54 362.79 114.54"
        />
        <circle class="cls-3" cx="315.82" cy="316.29" r="31.5" />
      </svg>
    </div>

    <div id="logo-bounds">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 987.38 987.38">
        <path class="cls-1" d="M493.19,678.19s168,9,185-185-520-491-520-491" />
        <path class="cls-2" d="M678.19,494.19s9-168-185-185-491,520-491,520" />
        <path class="cls-3" d="M494.19,309.19s-168-9-185,185,520,491,520,491" />
        <path class="cls-4" d="M309.19,493.19s-9,168,185,185,491-520,491-520" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    document.querySelector("#logo").classList.add("animate-logo");
  },
};
</script>

<style>
#logo-box {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
}
#logo {
  z-index: 2;
  width: 30vw;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
}

#logo polygon.cls-1 {
  fill: transparent;
  stroke-width: 5;
  stroke: var(--col-3);
  stroke-dasharray: 100, 950;
  stroke-dashoffset: 310;
}
#logo polygon.cls-2 {
  fill: transparent;
  stroke-width: 3.5;
  stroke: var(--col-1);
  stroke-dasharray: 40, 540;
  stroke-dashoffset: 352;
}
#logo circle.cls-3 {
  fill: transparent;
  stroke-width: 5;
  stroke: var(--col-2);
  stroke-dasharray: 50, 50;
}

/* Logo BorderBox */
#logo-bounds {
  width: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  stroke-width: 2;
  stroke-dasharray: 153, 900;
  opacity: 0;
  fill: none;
}
#logo-bounds .cls-1 {
  stroke: var(--col-2);
}

#logo-bounds .cls-2 {
  stroke: var(--col-3);
}

#logo-bounds .cls-3 {
  stroke: var(--col-2);
}

#logo-bounds .cls-4 {
  stroke: var(--col-3);
}

/* Logo anim hovers */
.animate-logo + #logo-bounds {
  animation: logo-vfx-in 2s ease-out 0.2s forwards;
}

.animate-logo {
  animation: logo-rotate-in 0.8s ease-out 2.8s forwards;
}

.animate-logo .cls-1 {
  animation: logo-reveal-minmax-in 0.8s ease-out 1.8s forwards;
}
.animate-logo .cls-2 {
  animation: logo-reveal-t-in 1s ease-out 0.8s forwards;
}
.animate-logo .cls-3 {
  animation: logo-reveal-cir-in 2s ease-out forwards;
}

@keyframes logo-vfx-in {
  0% {
    opacity: 1;
    stroke-dashoffset: 153;
  }
  75% {
    opacity: 1;
    stroke-dashoffset: 1206;
  }
  100% {
    opacity: 0;
    stroke-dashoffset: 1206;
  }
}

@keyframes logo-reveal-cir-in {
  50% {
    fill: transparent;
    stroke-dashoffset: 28;
    stroke-dasharray: 50, 50;
  }
  100% {
    stroke-dasharray: 197, 0;
    fill: var(--col-2);
  }
}

@keyframes logo-reveal-t-in {
  100% {
    stroke-dasharray: 600, 0;
    stroke-dashoffset: 660;
  }
}

@keyframes logo-reveal-minmax-in {
  90% {
    fill: transparent;
    stroke-dasharray: 1100, 0;
    stroke-dashoffset: 835;
    stroke-width: 5;
  }
  100% {
    stroke-width: 0;
    fill: var(--col-3);
  }
}

@keyframes logo-rotate-in {
  80% {
    transform: translate(-50%, -50%) rotate(0deg) scale(1);
  }
  90% {
    transform: translate(-50%, -50%) rotate(0deg) scale(1.2);
  }
  100% {
    transform: translate(-50%, -50%) rotate(0deg) scale(1);
  }
}
</style>
