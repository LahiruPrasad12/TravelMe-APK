<template>
  <ion-page>
    <ion-content class="login-wrap">
      <ion-grid>
        <ion-row style="padding-top: 15px; align-items: center">
          <ion-col>
            <ion-img
              class="ion-float-center"
              src="https://i.postimg.cc/kgPQXz2s/Eyepax-logo.png"
              style="width: 50%"
            />
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-text>
              <h2 style="text-align: center; margin-top: 10%">Register</h2>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row class="ion-align-items-center ion-justify-content-center">
          <ion-col size="6">
            <ion-label position="floating">First Name</ion-label>
            <ion-input
              v-model="form.first_name"
              class="u-input"
              type="text"
            ></ion-input>
          </ion-col>
          <ion-col size="6">
            <ion-label position="floating">Last Name</ion-label>
            <ion-input
              class="u-input"
              v-model="form.last_name"
              clear-input
              required
              type="text"
            ></ion-input>
          </ion-col>
          <ion-col size="6">
            <ion-label position="floating">Email</ion-label>
            <ion-input
              class="u-input"
              v-model="form.email"
              clear-input
              required
              type="email"
            ></ion-input>
          </ion-col>
          <ion-col size="6">
            <ion-label position="floating">Mobile</ion-label>
            <ion-input
              class="u-input"
              v-model="form.mobile"
              clear-input
              required
              type="number"
            ></ion-input>
          </ion-col>
          <ion-col size="6">
            <ion-label position="floating">Password</ion-label>
            <ion-input
              class="u-input"
              v-model="form.password"
              clear-input
              required
              type="text"
            >
            </ion-input>
          </ion-col>
          <ion-col size="6">
            <ion-label position="floating">Select Type</ion-label>
            <ion-select
              class="u-input"
              v-model="form.account_type"
              placeholder="Select role"
              required
            >
              <ion-select-option value="local_passenger"
                >Local Passemger</ion-select-option
              >
              <ion-select-option value="foreign_passenger"
                >Foreign Passenger</ion-select-option
              >
            </ion-select>
          </ion-col>
        </ion-row>

        <ion-col>
          <ion-button
            :disabled="is_btn_loading"
            class="mt-5"
            expand="block"
            style="margin-top: 10%; margin-bottom: 5%"
            @click="saveData"
          >
            <ion-spinner :hidden="!is_btn_loading" name="circles"></ion-spinner>
            Register
          </ion-button>
        </ion-col>
        <ion-col size="12" style="margin-left: 20%">
          <span style="margin-top: 15%"
            >Already have an account? <a href="/login"> Login </a></span
          >
        </ion-col>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>



<script>
import auth_api from "@/apis/modules/auth_api";
import {
  addCircleOutline,
  arrowDownCircleOutline,
  arrowForwardCircleOutline,
  arrowForwardOutline,
  cafeOutline,
  calendarOutline,
  removeCircleOutline,
  timeOutline,
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
    return { enterAnimation, leaveAnimation, calendarOutline };
  },

  data() {
    return {
      is_btn_loading: false,
      is_open: false,
      form: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        mobile: "",
        account_type: "",
      },
    };
  },
  methods: {
    dismiss() {
      this.is_open = !this.is_open;
      this.$emit("closeModel");
    },
    openAddStaffModel() {
      this.is_open = true;
    },
    async saveData() {
      try {
        this.is_btn_loading = true;
        await auth_api.register(this.form)
        await this.successToast("user registered successfully");
        this.is_btn_loading = false;
        this.$router.push("/login");
      } catch (e) {
        await this.dangerToast(e);
      }
      this.is_btn_loading = false;
    },
  },
};
</script>

<style scoped>
</style>
