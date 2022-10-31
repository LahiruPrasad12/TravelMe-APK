<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar class="toolbar" style="padding-top: 10px; ">
        <ion-title>SCAN QR</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="main-container">
      <div class="">
        <ion-list>

          <ion-grid>
            <ion-row class="ion-justify-content-center">

              <ion-col size="8">
                <div class="small-header anim" style="--delay: .3s; margin-left: 5px">
                  <ion-label position="floating">Origin</ion-label>
                  <ion-list>
                    <ion-item>
                      <ion-select class="ion-activatable ripple-parent rectangle" interface="popover"
                                  placeholder="Select origin">
                        <ion-select-option value="apples">Apples</ion-select-option>
                        <ion-select-option value="oranges">Oranges</ion-select-option>
                        <ion-select-option value="bananas">Bananas</ion-select-option>
                      </ion-select>
                    </ion-item>
                  </ion-list>
                </div>
              </ion-col>
              <ion-col size="8">
                <div class="small-header anim" style="--delay: .3s; margin-left: 5px">
                  <ion-button class="ion-float-right">
                    <ion-icon slot="icon-only" :icon="star"></ion-icon>
                  </ion-button>
                </div>
              </ion-col>
              <ion-col size="8">
                <div class="small-header anim" style="--delay: .3s; margin-left: 5px">
                  <ion-label position="floating">Destination</ion-label>
                  <ion-list>
                    <ion-item>
                      <ion-select interface="popover" placeholder="Select destination">
                        <ion-select-option value="apples">Apples</ion-select-option>
                        <ion-select-option value="oranges">Oranges</ion-select-option>
                        <ion-select-option value="bananas">Bananas</ion-select-option>
                      </ion-select>
                    </ion-item>
                  </ion-list>
                </div>
              </ion-col>
              <ion-col size="8">
                <div class="small-header anim" style="--delay: .3s; margin-left: 5px">
                  <ion-button expand="block">Proceed</ion-button>
                </div>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import '@/assets/test.css'
import {
  star
} from 'ionicons/icons';
import {
  IonAvatar,
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonLoading,
  IonNavLink,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonTitle,
  IonToolbar,
  IonButton,
  IonSelect,
  IonGrid,
  IonSelectOption,
  IonText,
  IonInput,
  IonSearchbar
} from '@ionic/vue';
import {defineComponent} from 'vue';

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonFooter,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    IonInfiniteScrollContent,
    IonInfiniteScroll,
    IonRefresher,
    IonRefresherContent,
    IonAvatar,
    IonRow,
    IonCol,
    IonNavLink,
    IonLoading,
    IonFab, IonFabButton, IonIcon, IonFabList, IonButton,
    IonSelect,
    IonGrid,
    IonSelectOption,
    IonText,
    IonInput,
    IonSearchbar
  },
  name: "index",

  setup() {
    return {star};
  },

  methods: {
    handleChange(event) {
      console.log(event);
      const query = event.target.value.toLowerCase();
      this.results = this.data.filter(d => d.toLowerCase().indexOf(query) > -1);
    },
  },


})
</script>

<style scoped>

</style>
