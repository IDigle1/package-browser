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

          <user-card />
      </v-container>
      
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import PackageList from './components/PackageList.vue';
import UserCard from './components/UserCard.vue';
import VHeader from './components/VHeader.vue';
export default {
  name: "App",
  components: {
    PackageList,
    VHeader,
    UserCard
  },

  data: () => ({
      search: '',
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
