<template>
  <ion-modal
    :enter-animation="enterAnimation"
    :is-open="is_open"
    :leave-animation="leaveAnimation"
  >
    <ion-content fullscreen>
      <ion-loading
        :is-open="is_loading"
        cssClass="my-custom-class"
        message="Please wait..."
      />
      <ion-toolbar class="toolbar" style="padding-top: 10px">
        <ion-title style="margin-left: 20%">SERVICES</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="dismiss()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>

      <ion-grid v-if="services.length > 0">
        <ion-row>
          <ion-col
            size="12"
            v-for="service in services"
            :key="service._id"
            @click="make_payment(service)"
          >
            <div
              class="small-header anim"
              style="--delay: 0.3s; margin-left: 5px"
            >
              <ion-card>
                <ion-card-header>
                  <ion-card-title>{{ service.name }}</ion-card-title>
                  <ion-card-subtitle
                    >From {{ service.origin.toUpperCase() }} To
                    {{ service.destination.toUpperCase() }}</ion-card-subtitle
                  >
                </ion-card-header>

                <ion-card-content>
                  <span>
                    <ion-icon slot="icon-only" :icon="timeOutline"></ion-icon>
                    {{ service.start_time }} -
                    <ion-icon slot="icon-only" :icon="timeOutline"></ion-icon>
                    {{ service.arrival_time }}
                  </span>
                  <br />
                  <span>
                    <ion-icon
                      slot="icon-only"
                      :icon="pricetagOutline"
                    ></ion-icon>
                    {{ service.price }} LKR
                  </span>
                  <br />
                  <span>
                    <ion-icon slot="icon-only" :icon="carOutline"></ion-icon>
                    {{ service.bus_num }} |
                    <ion-icon
                      slot="icon-only"
                      :icon="contractOutline"
                    ></ion-icon>
                    {{ service.type }} |
                    <ion-icon
                      slot="icon-only"
                      :icon="phoneLandscapeOutline"
                    ></ion-icon>
                    {{ service.contact_num }} |
                  </span>
                </ion-card-content>
              </ion-card>
            </div>
          </ion-col>
        </ion-row>
        <!-- 
        <ion-button
          :disabled="is_btn_loading"
          class="mt-5"
          expand="block"
          shape="round"
          style="margin-top: 5%"
          @click="saveData"
        >
          <ion-spinner :hidden="!is_btn_loading" name="circles"></ion-spinner>
          Save
        </ion-button> -->
      </ion-grid>
      <div v-else>
        <lottie-animation
          ref="anim"
          :animationData="require('@/assets/lottie/waiting.json')"
          :loop="true"
          :autoPlay="true"
          :speed="1"
          @loopComplete="loopComplete"
          @complete="complete"
          @enterFrame="enterFrame"
          @segmentStart="segmentStart"
          @stopped="stopped"
        />
        <ion-textarea
          class="ion-text-wrap"
          placeholder="Oh Sorry! Theres no bus avaible at this time. please be good petirnt and wait for a while"
          style="text-align: center"
          :clear-on-edit="true"
        ></ion-textarea>
      </div>
    </ion-content>
  </ion-modal>
</template>

<script>
import services_apis from "@/apis/modules/passengers/services_apis";
import {
  timeOutline,
  pricetagOutline,
  carOutline,
  phoneLandscapeOutline,
  accessibilityOutline,
  contractOutline,
  cafeOutline,
  calendarOutline,
  removeCircleOutline,
  minusOutline,
} from "ionicons/icons";
import {
  IonModal,
  IonText,
  IonIcon,
  IonContent,
  IonToolbar,
  IonButton,
  IonTitle,
  IonItem,
  IonList,
  IonLabel,
  IonAvatar,
  IonImg,
  IonButtons,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  createAnimation,
  IonLoading,
  IonTextarea,
} from "@ionic/vue";

export default {
  components: {
    IonModal,
    IonContent,
    IonToolbar,
    IonButton,
    IonTitle,
    IonItem,
    IonList,
    IonLabel,
    IonAvatar,
    IonImg,
    IonButtons,
    IonGrid,
    IonRow,
    IonCol,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonSpinner,
    IonPage,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonText,
    IonIcon,
    IonLoading,
    IonTextarea,
  },
  name: "add_student",
  setup() {
    const enterAnimation = (baseEl) => {
      const root = baseEl.shadowRoot;

      const backdropAnimation = createAnimation()
        .addElement(root.querySelector("ion-backdrop"))
        .fromTo("opacity", "0.01", "var(--backdrop-opacity)");

      const wrapperAnimation = createAnimation()
        .addElement(root.querySelector(".modal-wrapper"))
        .keyframes([
          { offset: 0, opacity: "0", transform: "scale(0)" },
          { offset: 1, opacity: "0.99", transform: "scale(1)" },
        ]);

      return createAnimation()
        .addElement(baseEl)
        .easing("ease-out")
        .duration(500)
        .addAnimation([backdropAnimation, wrapperAnimation]);
    };

    const leaveAnimation = (baseEl) => {
      return enterAnimation(baseEl).direction("reverse");
    };
    return {
      enterAnimation,
      leaveAnimation,
      calendarOutline,
      timeOutline,
      pricetagOutline,
      carOutline,
      phoneLandscapeOutline,
      accessibilityOutline,
      contractOutline,
    };
  },

  data() {
    return {
      is_loading: false,
      is_open: false,
      services: [],
    };
  },
  methods: {
    dismiss() {
      this.is_open = !this.is_open;
      this.$emit("closeModel");
    },
    openViewServicesModal(origin, destination) {
      this.getServices(origin, destination);
      this.is_open = true;
    },
    async getServices(origin, destination) {
      try {
        this.is_loading = true;
        let respond = (await services_apis.getAllServices(origin, destination))
          .data.data.Servicess;
        this.services = respond;
      } catch (error) {}
      this.is_loading = false;
    },

    make_payment(data) {
      window.location = "home/payment/" + data._id;
    },
  },
};
</script>

<style scoped>
ion-card {
  --background: #000;
  --color: #9efff0;
}

ion-card-title {
  --color: #52ffe4;
}

ion-card-subtitle {
  --color: #d1fff8;
}

/* iOS places the subtitle above the title */
ion-card-header.ios {
  display: flex;
  flex-flow: column-reverse;
}
</style>
