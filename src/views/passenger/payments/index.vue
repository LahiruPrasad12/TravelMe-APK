<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar class="toolbar" style="padding-top: 10px">
        <ion-title>MAKE PAYMENT</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
      <ion-segment value="buttons" scrollable>
        <ion-segment-button value="default" checked @click="carPayment()">
          <ion-label>
            <a
              class="nav-link active"
              id="visa-tab"
              data-toggle="tab"
              href="#visa"
              role="tab"
              aria-controls="visa"
              aria-selected="true"
            >
              <img src="https://i.imgur.com/sB4jftM.png" width="80" /> </a
          ></ion-label>
        </ion-segment-button>
        <ion-segment-button value="segment" @click="payPalPayment()">
          <ion-label>
            <a
              class="nav-link"
              id="paypal-tab"
              data-toggle="tab"
              href="#paypal"
              role="tab"
              aria-controls="paypal"
              aria-selected="false"
            >
              <img src="https://i.imgur.com/yK7EDD1.png" width="80" /> </a
          ></ion-label>
        </ion-segment-button>
      </ion-segment>
      <ion-card v-if="is_card_payment">
        <ion-card-header>
          <ion-card-title>Card Payment</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-item>
            <ion-label position="floating">Amount</ion-label>
            <ion-input type="number" v-model="amount"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Card Number</ion-label>
            <ion-input type="number" v-model="cardNumber"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Expiry Date</ion-label>
            <ion-input type="date" v-model="expiryDate"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">CVV</ion-label>
            <ion-input type="number" v-model="cvv"></ion-input>
          </ion-item>
          <ion-button expand="block" color="primary" @click="makePayment()"
            >Make Payment</ion-button
          >
        </ion-card-content>
      </ion-card>
      <ion-card v-if="is_paypal_payment">
        <ion-card-header>
          <ion-card-title>Paypal Payment</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-item>
            <ion-label position="floating">Paypal Email Address</ion-label>
            <ion-input type="number" v-model="amount"></ion-input>
          </ion-item>
          <ion-button expand="block" color="primary" @click="makePayment()"
            >Make Payment</ion-button
          >
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import services_apis from "@/apis/modules/passengers/services_apis";
import {
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonGrid,
  IonRow,
  IonCol,
  IonSegment,
  IonSegmentButton,
  IonSlides,
  IonSlide,
} from "@ionic/vue";
import {
  cafeOutline,
  calendarOutline,
  homeOutline,
  timeOutline,
  peopleOutline,
  mapOutline,
} from "ionicons/icons";
import { useRouter } from "vue-router";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    IonLabel,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonPage,
    IonRouterOutlet,
    IonGrid,
    IonRow,
    IonCol,
    IonSegment,
    IonSegmentButton,
    IonSlides,
    IonSlide,
  },
  methods: {
    carPayment() {
      this.is_card_payment = true;
      this.is_paypal_payment = false;
    },
    payPalPayment() {
      this.is_card_payment = false;
      this.is_paypal_payment = true;
    },
    makePayment() {
      console.log(this.form);
    },
    async getServiceData(){
      let respond = (await services_apis.getOneService(this.id)).data.data.Servicess[0]
      console.log(respond)
    }
  },

  mounted(){
    this.getServiceData()
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
    };
  },
  data() {
    return {
      id: this.$route.params.id,
      form: {
        amount: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
      },
      is_card_payment: false,
      is_paypal_payment: false,
    };
  },
});
</script>

<style>
body {
  height: 100vh;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: #eee;
}
.launch {
  height: 50px;
}
.close {
  font-size: 21px;
  cursor: pointer;
}
.modal-body {
  height: 450px;
}
.nav-tabs {
  border: none !important;
}
.nav-tabs .nav-link.active {
  color: #495057;
  background-color: #fff;
  border-color: #ffffff #ffffff #fff;
  border-top: 3px solid blue !important;
}
.nav-tabs .nav-link {
  margin-bottom: -1px;
  border: 1px solid transparent;
  border-top-left-radius: 0rem;
  border-top-right-radius: 0rem;
  border-top: 3px solid #eee;
  font-size: 20px;
}
.nav-tabs .nav-link:hover {
  border-color: #e9ecef #ffffff #ffffff;
}
.nav-tabs {
  display: table !important;
  width: 100%;
}
.nav-item {
  display: table-cell;
}
.form-control {
  border-bottom: 1px solid #eee !important;
  border: none;
  font-weight: 600;
}
.form-control:focus {
  color: #495057;
  background-color: #fff;
  border-color: #8bbafe;
  outline: 0;
  box-shadow: none;
}
.inputbox {
  position: relative;
  margin-bottom: 20px;
  width: 100%;
}
.inputbox span {
  position: absolute;
  top: 7px;
  left: 11px;
  transition: 0.5s;
}
.inputbox i {
  position: absolute;
  top: 13px;
  right: 8px;
  transition: 0.5s;
  color: #3f51b5;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.inputbox input:focus ~ span {
  transform: translateX(-0px) translateY(-15px);
  font-size: 12px;
}
.inputbox input:valid ~ span {
  transform: translateX(-0px) translateY(-15px);
  font-size: 12px;
}
.pay button {
  height: 47px;
  border-radius: 37px;
}
</style>