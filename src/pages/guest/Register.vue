<template>
    <q-layout>
        <q-page-container>
            <q-page padding class="bg-blue-grey-1">
                <div class="row">
                    <q-card class="fixed-center col-md-4 col-xs-12 text-blue-grey-14">
                        <q-card-section>
                            <div class="text-h6">
                                Register
                            </div>
                            <q-form @submit="onSubmit">
                                <q-input
                                    v-model="username"
                                    label="Username"
                                    :rules="[
                                        val => val && val.length > 0 || 'Type your username'
                                    ]"
                                    />
                                <q-input
                                    v-model="fullname"
                                    label="Fullname"
                                    :rules="[
                                        val => val && val.length > 0 || 'Type your fullname'
                                    ]"
                                    />
                                <q-input
                                    v-model="email"
                                    label="Email"
                                    :rules="[
                                        val => val && val.length > 0 || 'Type your email'
                                    ]"
                                    />
                                <q-input
                                    v-model="password"
                                    label="Password"
                                    type="password"
                                    :rules="[
                                        val => val && val.length > 0 || 'Type your password'
                                    ]"
                                    />
                                <div>
                                    <q-btn class="full-width" unelevated color="primary" label="Register" type="submit"/>
                                    <q-btn class="full-width" :to="{ name: 'loginPage' }" unelevated label="Login"/>
                                </div>
                            </q-form>
                        </q-card-section>
                    </q-card>
                </div>
            </q-page>
        </q-page-container>
    </q-layout>
</template>
<script>
export default {
  data () {
    return {
      username: null,
      fullname: null,
      email: null,
      password: null
    }
  },
  methods: {
    onSubmit () {
      this.$axios.post('user/register', {
        username: this.username,
        fullname: this.fullname,
        email: this.email,
        password: this.password
      }).then(res => {
        if (res.data.sukses) {
          this.$showNotif(res.data.pesan, 'positive')
          this.$router.push({ name: 'loginPage' })
        } else {
          this.$showNotif(res.data.pesan, 'negative')
        }
      })
    }
  }
}
</script>
