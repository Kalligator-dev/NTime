<template>
  <div id="profile-comp">
    <h1>Hi, {{ name }}</h1>
    <p>We hope you're having a fantastic, productive day</p>
    <p>
      Profile page is going to be added soon and replace this page. For now,
      please <span class="emphasis" @click="spanClicked">get back</span> to your
      the app
    </p>
  </div>
</template>

<script>
export default {
  computed: {
    name() {
      let nameLS = localStorage.getItem("name");
      if (nameLS !== "null") {
        return nameLS;
      } else {
        return "";
      }
    },
  },
  methods: {
    spanClicked() {
      this.$router.replace("/app");
    },
  },
  mounted() {
    setTimeout(() => {
      this.$router.replace("/app");
    }, 2000);
  },
};
</script>

<style>
#profile-comp {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--col-0);
}
#profile-comp h1 {
  margin-bottom: 2rem;
}
#profile-comp .emphasis {
  color: var(--col-2);
  cursor: pointer;
}
</style>
