<template>
  <div id="login-form">
    <form class="form">
      <div id="header-login" class="main-header header-block">
        <h1>{{ signTxt }}</h1>
      </div>
      <div class="form-block" id="login-inputs">
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
      <p v-if="regTxtShow">
        Not a user?
        <span class="regTxt" @click="spanClicked">Register here</span> instead
      </p>
      <p v-if="resetPWTxt">
        Forgot your password?
        <span class="regTxt" @click="resetPWClicked">Reset password</span>
      </p>
      <p v-if="verEmailTxt">
        Cannot find the verification email?
        <span class="regTxt" @click="sendVerEmail">Resend email</span> or click
        on "Register here" to register a new user"
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
      signTxt: "Log-in",
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
      regTxtShow: true,
      resetPWTxt: false,
      verEmailTxt: false,
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
      if (this.checkEmail() && this.checkPW()) {
        this.regBtnDisabled = true;
        let msg = {
          txt: "Checking input with server",
          type: "success-msg",
        };
        this.addError(msg);
        // Login with Firebase
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            let user = firebase.auth().currentUser;
            let uid, emailVerified;
            if (user != null) {
              uid = user.uid;
              emailVerified = user.emailVerified;
            }
            if (emailVerified) {
              db.collection("users")
                .doc(uid)
                .update({
                  verified: true,
                })
                .then(() => {
                  this.$router.push("/app");
                  this.$store.dispatch("updateLoggedIn", true);
                  this.$store.dispatch("updateVerified", true);
                })
                .catch((e) => {
                  let msg = {
                    txt: e.message,
                    type: "err-msg",
                  };
                  this.addError(msg, 2);
                });
            } else {
              let msg = {
                txt:
                  "Email is not verified. Please follow the link sent to your email to verify your email",
                type: "err-msg",
              };
              this.regBtnDisabled = false;
              this.verEmailTxt = true;
              this.addError(msg, 2);
            }
          })
          .catch((error) => {
            this.regBtnDisabled = false;
            // Handle Errors here.
            let errorCode = error.code;
            // ...
            let msgTxt;
            if (errorCode === "auth/user-not-found") {
              msgTxt = {
                txt:
                  'Email is not registered. Please click on "Register here" to create a new account',
                type: "err-msg",
              };
            } else if (errorCode === "auth/wrong-password") {
              msgTxt = {
                txt:
                  'Wrong Password! Please re-check your password or click on "Reset password"',
                type: "err-msg",
              };
              this.resetPWTxt = true;
            } else if (errorCode === "auth/too-many-requests") {
              msgTxt = {
                txt:
                  "You tried too many times. Please wait and try again later",
                type: "err-msg",
              };
            }
            this.addError(msgTxt, 2);
          });
      }
    },
    spanClicked() {
      this.$store.dispatch("updateUserComp", "register");
      if (this.$router.currentRoute.path !== "/user")
        this.$router.replace("/user");
    },
    resetPWClicked() {
      this.$store.dispatch("updateUserComp", "register");
      if (this.$router.currentRoute.path !== "/user")
        this.$router.replace("/user");
    },
    sendVerEmail() {
      firebase.auth().currentUser.sendEmailVerification();
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
  height: 100%;
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
