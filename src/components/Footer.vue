<template>
  <div
    id="app-footer"
    class="footer-bar"
    :class="{ 'footer-none': !footerShow }"
  >
    <div class="footer-container">
      <div class="footer-social">
        <div class="icon-patreon footer-icon" v-if="socialView">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 194 194">
            <circle class="cls-2 cls-3" cx="96.74" cy="53.03" r="20.94" />
            <path
              class="cls-2 cls-3"
              d="M106.65,162.91H87.35a26.33,26.33,0,0,1-25.72-32L68.67,98.8A26.33,26.33,0,0,1,94.4,78.11H99.6A26.33,26.33,0,0,1,125.33,98.8l7.05,32.13A26.33,26.33,0,0,1,106.65,162.91Z"
            />
            <path
              class="cls-2 cls-3"
              d="M97,12A85,85,0,1,1,12,97,85,85,0,0,1,97,12M97,0a97,97,0,1,0,97,97A97.11,97.11,0,0,0,97,0Z"
            />
          </svg>
        </div>
        <div
          class="icon-contact footer-icon"
          @click="contactClicked"
          @mouseleave="showContact = false"
          @mouseenter="showContact = true"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 194 194">
            <path
              class="cls-2 cls-3"
              d="M97,12A85,85,0,1,1,12,97,85,85,0,0,1,97,12M97,0a97,97,0,1,0,97,97A97.11,97.11,0,0,0,97,0Z"
            />
            <path
              class="cls-2 cls-3"
              d="M163.78,59.61A19,19,0,0,0,149,52.54H47a19,19,0,0,0-19,19v58.93a19,19,0,0,0,19,19H149a19,19,0,0,0,19-19V71.53A18.87,18.87,0,0,0,163.78,59.61ZM162,130.47a13,13,0,0,1-13,13H47a13,13,0,0,1-13-13V71.53a13,13,0,0,1,13-13H149a12.7,12.7,0,0,1,3.46.47A13.05,13.05,0,0,1,162,71.53Z"
            />
            <path
              class="cls-2 cls-3"
              d="M93,101.38,32.39,63.25l3.19-5.06L93,94.31a9.41,9.41,0,0,0,10,0l57.41-36.13,3.19,5.06L103,101.38A9.41,9.41,0,0,1,93,101.38Z"
            />
          </svg>
          <transition name="show-label" mode="out-in">
            <div class="label" v-show="showContact">Contact</div>
          </transition>
        </div>
        <div class="icon-patreon footer-icon" v-if="socialView">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 194 194">
            <circle class="cls-2 cls-3" cx="96.74" cy="53.03" r="20.94" />
            <path
              class="cls-2 cls-3"
              d="M106.65,162.91H87.35a26.33,26.33,0,0,1-25.72-32L68.67,98.8A26.33,26.33,0,0,1,94.4,78.11H99.6A26.33,26.33,0,0,1,125.33,98.8l7.05,32.13A26.33,26.33,0,0,1,106.65,162.91Z"
            />
            <path
              class="cls-2 cls-3"
              d="M97,12A85,85,0,1,1,12,97,85,85,0,0,1,97,12M97,0a97,97,0,1,0,97,97A97.11,97.11,0,0,0,97,0Z"
            />
          </svg>
        </div>
      </div>
      <p class="copyrightTxt">Kalligator ©2021</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      footerShow: true,
      socialView: false,
      showContact: false,
    };
  },
  methods: {
    contactClicked() {
      this.$store.dispatch("updateUserComp", "contact");
      if (this.$router.currentRoute.path !== "/contact")
        this.$router.replace("/contact");
    },
  },
};
</script>

<style>
.footer-bar {
  z-index: 99;
  position: fixed;
  background: var(--col-00-t);
  width: 100vw;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.2rem 0.5rem;
  color: var(--col-00-htt);
  transition: all 0.5s ease-in-out;
}
.footer-bar a {
  text-decoration: none;
  color: var(--col-00-htt);
}
.footer-bar .label:hover {
  cursor: pointer;
}
.footer-bar:hover {
  background: var(--col-00-ttt);
  color: var(--col-0);
}
.footer-bar:hover a {
  color: var(--col-0);
}
.footer-bar:hover .footer-icon svg .cls-2 {
  fill: var(--col-00);
}
.footer-container {
  width: 90%;
  transform: translateX(5%);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.footer-none {
  display: none;
}
.footer-social {
  display: flex;
  justify-content: center;
  align-items: center;
}
.footer-icon {
  margin-right: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.footer-icon svg {
  width: 2rem;
  margin-right: 0.5rem;
  transition: all ease-in-out 0.3s;
}
.footer-icon svg .cls-1 {
  fill: none;
  transition: all ease-in-out 0.3s;
}
.footer-icon svg .cls-2 {
  fill: var(--col-00-htt);
  transition: all ease-in-out 0.3s;
}
.footer-icon svg .cls-4 {
  fill: none;
  transition: all ease-in-out 0.3s;
}
.footer-icon:hover svg {
  transform: scale(1.1);
}
.footer-icon:hover svg .cls-1 {
  fill: var(--col-2) !important;
}
.footer-icon:hover svg .cls-2 {
  fill: var(--col-4) !important;
}
</style>
