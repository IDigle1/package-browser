<template>
  <v-app>
    <v-header 
      v-model="search"
      @get-search="getSearch()"
    />
    
    <v-main>
      <package-list />
    </v-main>
    
    <v-footer color="#634379">
      <v-container class="theme-max-width">

          <v-card>
            <v-card-title class="justify-center">
              <v-avatar>
                <img src="https://hsto.org/getpro/moikrug/uploads/user/100/045/068/3/avatar/medium_0a1f9d108ffbfe97f221f6c74418a166.jpg" alt="">
              </v-avatar>
                <div class="d-flex flex-column pl-2">
                  <span>Evgeny Falaleev</span>
                  <a class="github-link" href="https://github.com/IDigle1/">github.com/IDigle1</a>
                  
                </div>
            </v-card-title>
            
          </v-card>
      </v-container>
      
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import PackageList from './components/PackageList.vue';
import VHeader from './components/VHeader.vue';
export default {
  name: "App",
  components: {
    PackageList,
    VHeader
  },

  data: () => ({
      search: 'express',
      
  }),

  methods: {
    ...mapActions({
      searchPackage: 'api/searchPackage',
      request: 'request'
    }),
    getSearch() {
      this.searchPackage({
        query: this.search
      });
    }
  }
};
</script>

<style lang="scss">
  .theme--light.v-application {
      background: #9b59b626!important;
  }

  .theme-max-width {
    max-width: 960px;
  }

  .github-link {
    font-size: 15px;
  }
</style>
