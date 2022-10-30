<template>
  <ion-modal is-open="">
    <ion-content>
      <ion-toolbar>
        <ion-title>Modal</ion-title>
        <ion-buttons slot="end">
          <ion-button color="light" @click="dismiss()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-list>
        <ion-item>
          <ion-avatar slot="start">
            <ion-img src="https://i.pravatar.cc/300?u=b"></ion-img>
          </ion-avatar>
          <ion-label>
            <h2>Connor Smith</h2>
            <p>Sales Rep</p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-avatar slot="start">
            <ion-img src="https://i.pravatar.cc/300?u=a"></ion-img>
          </ion-avatar>
          <ion-label>
            <h2>Daniel Smith</h2>
            <p>Product Designer</p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-avatar slot="start">
            <ion-img src="https://i.pravatar.cc/300?u=d"></ion-img>
          </ion-avatar>
          <ion-label>
            <h2>Greg Smith</h2>
            <p>Director of Operations</p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-avatar slot="start">
            <ion-img src="https://i.pravatar.cc/300?u=e"></ion-img>
          </ion-avatar>
          <ion-label>
            <h2>Zoey Smith</h2>
            <p>CEO</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-modal>
</template>

<script>
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonItem,
  IonList,
  IonAvatar,
  IonImg,
  IonLabel,
} from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonItem,
    IonList,
    IonAvatar,
    IonImg,
    IonLabel,
  },
  methods: {
    dismiss() {
      this.$refs.modal.$el.dismiss();
    },
  },
});
</script>


<style scoped>

</style>
