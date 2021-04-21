<template>
  <div id="contact-form">
    <form class="form">
      <div id="header-new" class="main-header header-block">
        <h1>Contact</h1>
      </div>
      <div id="contact-inputs">
        <div id="top-row">
          <div class="form-block">
            <label for="contact-name">
              Name
            </label>
            <input
              class="input-field"
              type="text"
              v-model="name"
              required
              minlength="0"
              maxlength="15"
              placeholder="Name"
              @blur="checkName"
            />
            <input-line></input-line>
          </div>
          <div class="form-block">
            <label for="contact-email">
              Email
            </label>
            <input
              class="input-field"
              type="text"
              v-model="email"
              required
              minlength="0"
              maxlength="20"
              placeholder="Email"
              @blur="checkEmail"
            />
            <input-line></input-line>
          </div>
        </div>
        <div class="form-block" id="contact-message">
          <label for="contact-message">
            Message
          </label>
          <textarea
            class="input-field textarea-field"
            type="text"
            v-model="message"
            required
            minlength="10"
            maxlength="500"
            placeholder="Message"
            @blur="checkMsg"
          ></textarea>
          <input-line></input-line>
        </div>
      </div>
      <div id="contact-btns-bar">
        <button
          class="form-btn"
          id="contact-sub-btn"
          @click.prevent="subBtnClicked"
          :disabled="subBtnDisabled"
        >
          Submit
        </button>
        <button
          class="form-btn"
          id="contact-back-btn"
          @click.prevent="backBtnClicked"
        >
          Cancel
        </button>
      </div>
      <transition name="show-err" mode="out-in">
        <div class="err" v-if="errShow">
          <div class="err-form" v-for="(msg, index) in err.msg" :key="index">
            <p :class="msg.type">{{ msg.txt }}</p>
          </div>
        </div>
      </transition>
    </form>
  </div>
</template>

<script>
import { db } from "../../firebase/db";
export default {
  data() {
    return {
      errShow: false,
      name: "",
      email: "",
      message: "",
      errTime: "",
      err: {
        msg: [],
      },
      subBtnDisabled: false,
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
      if (this.name.length < 2) {
        let msg = {
          txt: "Please Enter your name",
          type: "err-msg",
        };
        this.addError(msg);
        return false;
      }
      return true;
    },
    checkMsg() {
      if (this.message.length < 10 || this.message.length > 500) {
        let msg = {
          txt:
            "Please Enter your message. It must be between 10 & 500 characters long",
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
    subBtnClicked() {
      if (this.checkName() && this.checkEmail() && this.checkMsg()) {
        this.subBtnDisabled = true;
        let msg = {
          txt: "Sending your message",
          type: "success-msg",
        };
        this.addError(msg);
        let curTime = new Date().getTime();
        db.collection("contact")
          .doc(this.email)
          .update({
            name: this.name,
            [curTime]: this.message,
          })
          .then(() => {
            let msg2 = {
              txt:
                "Message Successfully sent. Thank you for it and please enjoy the app",
              type: "success-msg",
            };
            this.name = "";
            this.email = "";
            this.message = "";
            this.addError(msg2);
            setTimeout(() => {
              if (this.$router.currentRoute.path === "/contact")
                this.$router.replace("/");
            }, 2000);
          })
          .catch((error) => {
            if (error.code === "not-found") {
              db.collection("contact")
                .doc(this.email)
                .set({
                  name: this.name,
                  [curTime]: this.message,
                })
                .then(() => {
                  let msg2 = {
                    txt:
                      "Message Successfully sent. Thank you for it and please enjoy the app",
                    type: "success-msg",
                  };
                  this.name = "";
                  this.email = "";
                  this.message = "";
                  this.addError(msg2);
                  setTimeout(() => {
                    if (this.$router.currentRoute.path === "/contact")
                      this.$router.replace("/");
                  }, 2000);
                })
                .catch((error) => {
                  let errorMessage = error.message;
                  let msg = {
                    txt: `Error: ${errorMessage}`,
                    type: "err-msg",
                  };
                  this.addError(msg, 2);
                  // ...
                  this.regBtnDisabled = false;
                });
            } else {
              let errorMessage = error.message;
              let msg = {
                txt: `Error: ${errorMessage}`,
                type: "err-msg",
              };
              this.addError(msg, 2);
              // ...
              this.regBtnDisabled = false;
            }
          });
      }
    },
    backBtnClicked() {
      this.$router.replace("/");
    },
  },
};
</script>

<style>
#contact-form {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#contact-form .form {
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#contact-inputs {
  width: 90%;
  height: 80%;
  margin-top: 2rem;
}
#contact-inputs #top-row {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
#contact-inputs .form-block {
  width: 100%;
}
#contact-inputs input,
#contact-inputs textarea {
  width: 100%;
  background: var(--col-0-t);
  padding: 1rem;
  margin-top: 0.3rem;
}
#contact-inputs textarea {
  resize: none;
  height: 60%;
}
#contact-inputs #contact-message {
  width: 100%;
  height: calc(100% - 1rem);
}
#contact-inputs svg {
  height: 2px;
  width: 100%;
  vertical-align: top;
}
#contact-btns-bar {
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 640px) {
  #contact-form .form {
    width: 100%;
  }
  #contact-inputs {
    width: 95%;
    margin-top: 1.5rem;
  }
  #contact-inputs input,
  #contact-inputs textarea {
    padding: 0.5rem;
    margin-top: 0.1rem;
  }
}
</style>
