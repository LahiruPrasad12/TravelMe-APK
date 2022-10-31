<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar class="toolbar" style="padding-top: 10px">
        <ion-title>SCAN QR</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="main-container">
      <div class="">
        <ion-list>
          <ion-grid>
            <ion-row class="ion-justify-content-center">
              <ion-col size="8">
                <div
                  class="small-header anim"
                  style="--delay: 0.3s; margin-left: 5px"
                >
                  <ion-label position="floating">Origin</ion-label>
                  <ion-list>
                    <ion-item>
                      <ion-select
                        class="ion-activatable ripple-parent rectangle"
                        interface="popover"
                        v-model="origin"
                        placeholder="Select origin"
                      >
                        <ion-select-option value="matara"
                          >Matara</ion-select-option
                        >
                        <ion-select-option value="jaffna"
                          >Jaffna</ion-select-option
                        >
                        <ion-select-option value="negombo"
                          >Negombo</ion-select-option
                        >
                        <ion-select-option value="galle"
                          >Galle</ion-select-option
                        >
                        <ion-select-option value="colombo"
                          >Colombo</ion-select-option
                        >
                        <ion-select-option value="embilipitiya"
                          >Embilipitiya</ion-select-option
                        >
                      </ion-select>
                    </ion-item>
                  </ion-list>
                </div>
              </ion-col>
              <ion-col size="8">
                <div
                  class="small-header anim"
                  style="--delay: 0.3s; margin-left: 5px"
                >
                  <ion-button class="ion-float-right" @click="chengeDirection()">
                    <ion-icon slot="icon-only" :icon="arrowUp"></ion-icon>
                    <ion-icon slot="icon-only" :icon="arrowDown"></ion-icon>
                  </ion-button>
                </div>
              </ion-col>
              <ion-col size="8">
                <div
                  class="small-header anim"
                  style="--delay: 0.3s; margin-left: 5px"
                >
                  <ion-label position="floating">Destination</ion-label>
                  <ion-list>
                    <ion-item>
                      <ion-select
                        interface="popover"
                        v-model="destination"
                        placeholder="Select destination"
                      >
                        <ion-select-option value="galle"
                          >Galle</ion-select-option
                        >
                        <ion-select-option value="colombo"
                          >Colombo</ion-select-option
                        >
                        <ion-select-option value="embilipitiya"
                          >Embilipitiya</ion-select-option
                        >
                        <ion-select-option value="matara"
                          >Matara</ion-select-option
                        >
                        <ion-select-option value="jaffna"
                          >Jaffna</ion-select-option
                        >
                        <ion-select-option value="negombo"
                          >Negombo</ion-select-option
                        >
                      </ion-select>
                    </ion-item>
                  </ion-list>
                </div>
              </ion-col>
              <ion-col size="8">
                <div
                  class="small-header anim"
                  style="--delay: 0.3s; margin-left: 5px"
                >
                  <ion-button expand="block" @click="ViewServices()"
                    >Proceed</ion-button
                  >
                </div>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-list>
      </div>
    </ion-content>
    <ViewServices ref="service" />
  </ion-page>
</template>

<script>
import "@/assets/test.css";
import ViewServices from "./modules/view_services.vue";
import { arrowUp, arrowDown } from "ionicons/icons";
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
  IonSearchbar,
} from "@ionic/vue";
import { defineComponent } from "vue";

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
    IonFab,
    IonFabButton,
    IonIcon,
    IonFabList,
    IonButton,
    IonSelect,
    IonGrid,
    IonSelectOption,
    IonText,
    IonInput,
    IonSearchbar,
    ViewServices,
  },
  name: "index",
  data() {
    return {
      origin: "",
      destination: "",
    };
  },

  setup() {
    return { arrowUp, arrowDown };
  },

  methods: {
    ViewServices() {
      console.log(this.origin);
      this.$refs.service.openViewServicesModal(this.origin, this.destination);
    },
    chengeDirection(){
      let temp = this.origin;
      this.origin = this.destination;
      this.destination = temp;
    }
  },
});
</script>

<style scoped>
</style>
