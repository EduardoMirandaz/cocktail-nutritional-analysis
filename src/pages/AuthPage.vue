<template>
  <div id="q-app" class="containerLoginPage">
    <div class="q-pa-md" style="max-width: 400px">
      <h5>Gudu Cocktails Authentication</h5>
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
          ref="form"
          greedy
        >
          <q-input
            filled
            v-model="name"
            @input="programaticSubmit"
            debounce="500"
            label="Your username *"
            hint="Insert your username"
            :rules="[validateUsername]"
          ></q-input>
          <q-input
            filled
            v-model="password"
            @input="programaticSubmit"
            debounce="500"
            label="Your password *"
            hint="Insert your password"
            :rules="[validatePassword]"
            type="password"
          ></q-input>
          <q-toggle @input="programaticSubmit" v-model="accept"
          label="JavaScript é bom" ></q-toggle>
          <div>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" ></q-btn>
            <q-btn label="Submit" type="submit" color="primary" @click="onSubmit"
            class="q-ml-sm"></q-btn>
          </div>
        </q-form>
      </div>
  </div>
</template>

<script>

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AuthPage',
  components: { },
  data() {
    return {
      name: null,
      password: null,
      accept: false,
    };
  },
  mounted() {
  },
  methods: {
    validateUsername(val) {
      if (!val) {
        return 'Please type something';
      }
      if (!/^[a-zA-Z0-9]{3,}$/.test(val)) {
        return 'Username must contain only letters or numbers and have at least 3 characters';
      }
      return true; // Return true if the username is valid
    },
    validatePassword(val) {
      if (!val) {
        return 'Please type something';
      }
      if (!/^\d+$/.test(val)) {
        return 'Password must contain only numbers';
      }
      if (val.length < 3) {
        return 'Password must have at least 3 digits';
      }
      return true;
    },
    programaticSubmit() {
      const { form } = this.$refs;
      setTimeout(() => {
        form.submit();
      }, 100);
    },
    onSubmit() {
      if (this.validateUsername(this.name) === true
      && this.validatePassword(this.password) === true) {
        localStorage.setItem('usuarioLogado', this.name);
        window.location.href = '/';
      }
    },

    onReset() {
      this.name = null;
      this.password = null;
      this.accept = false;
    },
  },
});
</script>

<style scoped>
.containerLoginPage {
  display: flex;
  justify-content: center;
  padding: 4rem;
}
</style>
