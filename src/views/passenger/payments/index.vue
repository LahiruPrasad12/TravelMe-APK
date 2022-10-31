<template>
    <h1>Make Payment {{id}}</h1>
</template>

<script>
import {IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from '@ionic/vue';
import {cafeOutline, calendarOutline, homeOutline, timeOutline,peopleOutline, mapOutline} from 'ionicons/icons';
import {useRouter} from "vue-router";
import {defineComponent} from "vue";

export default defineComponent({
  components: {IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet},
  methods: {
    
  },
  setup() {
    const router = useRouter();
    return {
      no: 1,
      calendarOutline,
      cafeOutline,
      homeOutline,
      mapOutline,
      peopleOutline,
      timeOutline,
      router,
    }
  },
  data() {
    return {
     id : this.$route.params.id,
    };
  }
});
</script>
