<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar class="toolbar" style="padding-top: 10px">
        <ion-title>MAKE PAYMENT</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen v-if="!is_make_payment">
      <div class="small-header anim" style="--delay: 0.3s; margin-left: 5px">
        <ion-segment value="cart_payment" scrollable>
          <ion-segment-button
            value="cart_payment"
            checked
            @click="carPayment()"
          >
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
          <ion-segment-button value="paypal_payment" @click="payPalPayment()">
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
      </div>
      <ion-card v-if="is_card_payment">
        <div class="small-header anim" style="--delay: 0.3s; margin-left: 5px">
          <ion-card-header>
            <ion-card-title>Card Payment</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-item>
              <ion-label position="floating">Amount</ion-label>
              <ion-input type="number" v-model="amount" required></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Card Number</ion-label>
              <ion-input
                type="number"
                v-model="cardNumber"
                required
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Expiry Date</ion-label>
              <ion-input type="date" v-model="expiryDate" required></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">CVV</ion-label>
              <ion-input type="number" v-model="cvv" required></ion-input>
            </ion-item>
            <ion-button expand="block" color="primary" @click="makePayment()"
              >Make Payment</ion-button
            >
          </ion-card-content>
        </div>
      </ion-card>
      <ion-card v-if="is_paypal_payment">
        <div class="small-header anim" style="--delay: 0.3s; margin-left: 5px">
          <ion-card-header>
            <ion-card-title>Paypal Payment</ion-card-title>
          </ion-card-header>
        </div>
        <div class="small-header anim" style="--delay: 0.3s; margin-left: 5px">
          <ion-card-content>
            <ion-item>
              <ion-label position="floating">Paypal Email Address</ion-label>
              <ion-input type="number" v-model="amount"></ion-input>
            </ion-item>
            <ion-button expand="block" color="primary" @click="makePayment()"
              >Make Payment</ion-button
            >
          </ion-card-content>
        </div>
      </ion-card>
    </ion-content>
    <ion-content fullscreen v-if="is_make_payment">
      <ion-textarea
        placeholder="Please save this QR Code to prove your payment to the driver"
        style="text-align: center"
      ></ion-textarea>
      <div style="margin-left: 18%; margin-top: 20%">
        <vue-qrcode v-bind:value="qrValue" />
      </div>
      <ion-text
        @click="router.push('/home/dash_board')"
        class="ion-text-wrap"
        color="primary"
        style="text-align: center; margin-left: 32%; margin-right: 12%"
        >Go Back To Home</ion-text
      >
    </ion-content>
  </ion-page>
</template>

<script>
import services_apis from "@/apis/modules/passengers/services_apis";
import VueQrcode from "vue-qrcode";
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
  IonText,
  IonTextarea
} from "@ionic/vue";
import {
  cafeOutline,
  calendarOutline,
  homeOutline,
  timeOutline,
  peopleOutline,
  mapOutline,
  arrowBackCircleOutline,
} from "ionicons/icons";
import { useRouter } from "vue-router";
import { defineComponent } from "vue";

export default defineComponent({
  name: "HelloWorld",
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
    VueQrcode,
    IonText,
    IonTextarea
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
      try {
        this.is_make_payment = true;
        this.qrValue = `name : ${this.get_sevice.name}, origin : ${this.get_sevice.origin} , detination : ${this.get_sevice.destination}, 
      amount : ${this.get_sevice.price}, payment-method : "cart payment", user-type : "passenger"`;
        this.successToast("Booking has been completed successfully");
      } catch (error) {
        console.log(error);
      }
    },
    async getServiceData() {
      try {
        let respond = (await services_apis.getOneService(this.id)).data.data
          .Servicess[0];
        this.get_sevice = respond;
        console.log(respond);
      } catch (error) {
        console.log(error);
      }
    },
  },

  mounted() {
    this.getServiceData();
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
      arrowBackCircleOutline,
    };
  },
  data() {
    return {
      id: this.$route.params.id,
      segment_value: "card_payment",
      form: {
        amount: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
      },
      is_card_payment: true,
      is_paypal_payment: false,
      qrValue: ``,
      is_make_payment: false,
      get_sevice: [],
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