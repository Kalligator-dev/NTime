<template>
  <div id="login-form">
    <form class="form">
      <div id="header-login" class="main-header header-block">
        <h1>{{ signTxt }}</h1>
      </div>
      <div class="form-block" id="login-inputs">
        <div class="mini-block" id="login-user">
          <label for="login-user">Name</label>
          <input
            class="input-field"
            type="text"
            placeholder="name"
            v-model="user"
            id="login-user-input"
            minlength="2"
            maxlength="15"
            @blur="checkName"
            required
          />
          <input-line></input-line>
        </div>
        <div class="mini-block" id="login-email">
          <label for="login-email">Email</label>
          <input
            class="input-field"
            type="email"
            v-model="email"
            placeholder="email@email.com"
            id="login-email"
            @blur="checkEmail"
            required
          />
          <input-line></input-line>
        </div>
        <div class="mini-block" id="login-pw">
          <label for="login-pw">Password</label>
          <input
            class="input-field"
            type="password"
            v-model="password"
            id="login-pw"
            minlength="8"
            maxlength="15"
            placeholder="password"
            @blur="checkPW"
            required
          />
          <input-line></input-line>
        </div>
        <button
          class="form-btn"
          id="reg-btn"
          @click.prevent="subBtnClicked"
          :disabled="regBtnDisabled"
        >
          submit
        </button>
      </div>
      <p>
        Already a user?
        <span class="regTxt" @click="spanClicked">Login here</span> instead
      </p>
    </form>
    <transition name="show-err" mode="out-in">
      <div class="err" v-if="errShow">
        <div class="err-form" v-for="(msg, index) in err.msg" :key="index">
          <p :class="msg.type">{{ msg.txt }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import { db } from "../../firebase/db";

export default {
  data() {
    return {
      signTxt: "Register",
      user: "",
      email: "",
      password: "",
      err: {
        msg: [],
      },
      errShow: false,
      errErr: false,
      errTime: null,
      regBtnDisabled: false,
    };
  },
  methods: {
    addError(msg, mult = 1) {
      this.err.msg.unshift(msg);
      this.errShow = true;
      clearTimeout(this.errTime);
      this.errTime = setTimeout(() => {
        this.errShow = false;
        this.errErr = false;
      }, 2500 * mult);
      setTimeout(() => {
        this.err.msg.pop();
      }, 2500 * mult);
    },
    checkName() {
      if (this.user.length < 2) {
        let msg = {
          txt: "Please Enter your name",
          type: "err-msg",
        };
        this.addError(msg);
        return false;
      }
      return true;
    },
    checkEmail() {
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(this.email)) {
        let msg = {
          txt: "Please Enter a valid e-mail",
          type: "err-msg",
        };
        this.addError(msg);
        return false;
      }
      return true;
    },
    checkPW() {
      if (this.password.length < 8) {
        let msg = {
          txt: "Please Enter a password that contains at least 8 characters",
          type: "err-msg",
        };
        this.addError(msg);
        return false;
      }
      return true;
    },
    subBtnClicked() {
      if (this.checkName() && this.checkEmail() && this.checkPW()) {
        this.regBtnDisabled = true;
        let msg = {
          txt: "Checking input with server",
          type: "success-msg",
        };
        this.addError(msg);
        // Register At Firebase
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((e) => {
            e.user.updateProfile({ displayName: this.user });
            let id = e.user.uid;
            db.collection("users")
              .doc(id)
              .set({
                timetable: [],
                tasks: [],
                darkMode: this.$store.getters.darkMode,
                verified: false,
              })
              .then(() => {
                e.user.sendEmailVerification();
                this.$store.dispatch("updateUserComp", "login");
                if (this.$router.currentRoute.path !== "/user")
                  this.$router.replace("/user");
              })
              .catch((error) => {
                // Handle Errors here.
                let errorMessage = error.message;
                let msg = {
                  txt: `Error: ${errorMessage}`,
                  type: "err-msg",
                };
                this.addError(msg, 2);
                // ...
                this.regBtnDisabled = false;
              });
          })
          .catch((error) => {
            // Handle Errors here.
            let errorMessage = error.message;
            let msg = {
              txt: `Error: ${errorMessage}`,
              type: "err-msg",
            };
            this.addError(msg, 2);
            // ...
            this.regBtnDisabled = false;
          });
      }
    },
    spanClicked() {
      this.$store.dispatch("updateUserComp", "login");
      if (this.$router.currentRoute.path !== "/user")
        this.$router.replace("/user");
    },
  },
};
</script>

<style>
#login-form {
  position: relative;
  height: 100%;
  width: 90%;
}
#login-form .form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#login-form .form #reg-btn {
  align-self: flex-end;
  margin-bottom: 2rem;
}
#login-inputs {
  display: flex;
  flex-direction: column;
  width: 50%;
  max-width: 960px;
}
#login-inputs label {
  align-self: flex-start;
  margin-bottom: 0.2rem;
}
#login-inputs .mini-block {
  width: 100%;
}
#login-inputs input {
  padding: 0.5rem;
  font-size: 1.2rem;
  width: 100%;
  background: var(--col-0-t);
  display: block;
  text-align: center;
}
#login-inputs input + svg {
  height: 2px;
  margin-bottom: 0.5rem;
}
#login-form .form p {
  color: var(--col-0);
}
#login-form .form p span {
  color: var(--col-3);
}
#login-form .form p span:hover {
  color: var(--col-1);
  cursor: pointer;
}

@media (max-width: 640px) {
  #login-form .form #reg-btn {
    align-self: flex-end;
    margin-bottom: 2rem;
  }
  #login-inputs {
    width: 100%;
  }
  #login-inputs label {
    margin-bottom: 0.1rem;
  }
  #login-inputs input {
    font-size: 1rem;
  }
  #login-inputs input + svg {
    margin-bottom: 0.2rem;
  }
}
</style>
