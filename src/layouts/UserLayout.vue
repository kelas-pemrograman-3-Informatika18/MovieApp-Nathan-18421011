<template>
  <q-layout view="lHh LpR lFf">
    <q-toolbar unelevated style="height: 50px;" class="bg-white text-blue-grey-14">
      <div class="text-h5 q-ml-lg">MovieNight</div>
      <q-space />
      <div v-if="$q.screen.md || $q.screen.md || $q.screen.lg || $q.screen.xl">
        <q-btn size="medium" :to="{ name: 'homeUser' }" flat>Home</q-btn>
        <q-btn size="medium" :to="{ name: 'myOrder' }" flat>Pesanan Saya</q-btn>
        <q-btn size="medium" @click="alert" flat>About</q-btn>
        <q-btn size="medium" @click="logout()" flat>Logout</q-btn>
      </div>
      <q-btn flat @click="drawer = !drawer" round v-if="$q.screen.xs || $q.screen.sm" icon="menu"/>
    </q-toolbar>
    <q-drawer
        v-model="drawer"
        :width="200"
        :breakpoint="500"
        side="right"
      >
        <q-scroll-area class="fit">
          <q-list padding class="menu-list">

            <q-item clickable v-ripple :to="{ name: 'homeUser' }">
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>
              <q-item-section>
                HOME
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple :to="{ name: 'myOrder' }">
              <q-item-section avatar>
                <q-icon name="shopping_cart" />
              </q-item-section>
              <q-item-section>
                PESANAN SAYA
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="alert">
              <q-item-section avatar>
                <q-icon name="info" />
              </q-item-section>
              <q-item-section>
                ABOUT
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="logout()">
              <q-item-section avatar>
                <q-icon name="power_settings_new" />
              </q-item-section>
              <q-item-section>
                LOGOUT
              </q-item-section>
            </q-item>

          </q-list>
        </q-scroll-area>
      </q-drawer>
    <q-page-container class="bg-grey-3">
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
export default {
  data () {
    return {
      drawer: false
    }
  },
  methods: {
    logout () {
      this.$q.localStorage.remove()
      this.$router.push({ name: 'loginPage' })
    },
    alert () {
      this.$q.dialog({
        title: 'About',
        message: 'MovieApp Project 2020'
      }).onOk(() => {
        console.log('OK')
      }).onCancel(() => {
        console.log('Cancel')
      }).onDismiss(() => {
        console.log('I am triggered on both OK and Cancel')
      })
    }
  }
}
</script>
