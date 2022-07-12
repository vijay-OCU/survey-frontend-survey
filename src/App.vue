<template>
    <v-app>
      <v-app-bar  >
            <v-img
                class="mx-2"
                :src="logo"
                max-height="40"
                max-width="40"
                contain
            ></v-img>
            <v-app-bar-title>Albums</v-app-bar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn 
                    variant="text"
                    @click="goAlbums"
                    >
                  Albums
                </v-btn>
                <v-btn 
                    variant="text"
                    @click="goArtists"
                    >
                  Artists
                </v-btn>
            </v-toolbar-items>
      </v-app-bar>
      <v-main >
        <v-container>
          <router-view />
        </v-container>
      </v-main>  
    </v-app>
</template>

<script>
import logo from './assets/oc-logo-white.png'
export default {
  name: 'App',

  data: () => ({
    logo,
  }),
  methods: {
    goAlbums() {
      this.$router.push({ name: 'albums' });
    },
    goArtists() {
      this.$router.push({ name: 'artists' });
    }
  },

}
</script>

