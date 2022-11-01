<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar class="toolbar" style="padding-top: 10px">
        <ion-title>MAKE PAYMENT</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
      <div class="small-header anim" style="--delay: 0.3s; margin-left: 5px">
        <ion-row>
          <ion-segment
            v-if="!is_make_payment"
            value="cart_payment"
            style="margin-top: 5%;margin-left: 15%"
            scrollable
            class="ion-align-items-center ion-justify-content-center"
            
          >
            <ion-col size="6">
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
            </ion-col>
            <ion-col size="6">
              <ion-segment-button
                value="paypal_payment"
                @click="payPalPayment()"
              >
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
            </ion-col>
          </ion-segment>
        </ion-row>
        <ion-card v-if="is_card_payment">
          <ion-card-header>
            <ion-card-title>Card Payment</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-row class="ion-align-items-center ion-justify-content-center">
              <ion-col size="12">
                <ion-col size="12">
                  <ion-label position="floating">Account Name</ion-label>
                  <ion-input
                    class="u-input"
                    v-model="account_name"
                    clear-input
                    required
                    type="text"
                  >
                  </ion-input>
                  <ion-row v-show="passwordError" class="ion-text-start">
                    <ion-col size="12">
                      <ion-text color="danger">
                        <span>{{ passwordError }}</span>
                      </ion-text>
                    </ion-col>
                  </ion-row>
                </ion-col>
                <ion-label position="floating">Account Number</ion-label>
                <ion-input
                  v-model="account_number"
                  class="u-input"
                  type="number"
                ></ion-input>
                <ion-row v-show="accountNumberErr" class="ion-text-start">
                  <ion-col size="12">
                    <ion-text color="danger">
                      <span>{{ accountNumberErr }}</span>
                    </ion-text>
                  </ion-col>
                </ion-row>
              </ion-col>
              <ion-col size="12">
                <ion-label position="floating">Expiry Date</ion-label>
                <ion-input
                  class="u-input"
                  v-model="expiry_date"
                  clear-input
                  required
                  type="date"
                ></ion-input>
                <ion-row v-show="expiry_dateError" class="ion-text-start">
                  <ion-col size="12">
                    <ion-text color="danger">
                      <span>{{ expiry_dateError }}</span>
                    </ion-text>
                  </ion-col>
                </ion-row>
              </ion-col>
              <ion-col size="12">
                <ion-label position="floating">CVV</ion-label>
                <ion-input
                  class="u-input"
                  v-model="cvv"
                  clear-input
                  required
                  name="cvv"
                  type="number"
                ></ion-input>
                <ion-row v-show="cvv_Error" class="ion-text-start">
                  <ion-col size="12">
                    <ion-text color="danger">
                      <span>{{ cvv_Error }}</span>
                    </ion-text>
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col size="12">
                    <h1 style="text-align: center; margin-top: 2%">
                      Fee Rs.{{ get_sevice.price }}
                    </h1>
                  </ion-col>
                </ion-row>
              </ion-col>
              <ion-col size="12">
                <ion-button
                  expand="block"
                  color="primary"
                  @click="makeCardPayment()"
                  >Make Payment</ion-button
                >
              </ion-col>
            </ion-row>
          </ion-card-content>
        </ion-card>
        <ion-card v-if="is_paypal_payment">
          <div
            class="small-header anim"
            style="--delay: 0.3s; margin-left: 5px"
          >
            <ion-card-header>
              <ion-card-title>Paypal Payment</ion-card-title>
            </ion-card-header>
          </div>
          <div
            class="small-header anim"
            style="--delay: 0.3s; margin-left: 5px"
          >
            <ion-card-content>
              <ion-col size="12">
                <ion-label position="floating">Paypal Email Address</ion-label>
                <ion-input
                  class="u-input"
                  v-model="email"
                  clear-input
                  required
                  name="email"
                  type="text"
                ></ion-input>
                <ion-row v-show="emailError" class="ion-text-start">
                  <ion-col size="12">
                    <ion-text color="danger">
                      <span>{{ emailError }}</span>
                    </ion-text>
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col size="12">
                    <h1 style="text-align: center; margin-top: 2%">
                      Fee Rs.{{ get_sevice.price }}
                    </h1>
                  </ion-col>
                </ion-row>
              </ion-col>
              <ion-button
                expand="block"
                color="primary"
                @click="makePaypalPayment()"
                >Make Payment</ion-button
              >
            </ion-card-content>
          </div>
        </ion-card>
        <ion-card v-if="is_make_payment">
          <div
            class="small-header anim"
            style="--delay: 0.3s; margin-left: 5px"
          >
            <ion-card-header>
              <ion-card-title>Generated QR Code</ion-card-title>
            </ion-card-header>
          </div>
          <ion-card-content
            class="ion-align-items-center ion-justify-content-center"
          >
            <ion-textarea
              placeholder="Please save this QR Code to prove your payment to the driver"
              style="text-align: center"
            ></ion-textarea>
            <ion-row class="ion-align-items-center ion-justify-content-center">
              <vue-qrcode v-bind:value="qrValue" />
            </ion-row>
            <ion-text
              @click="router.push('/home/dash_board')"
              class="ion-align-items-center ion-justify-content-center"
              color="primary"
              style="margin-left: 30%; text-align: center"
              >Go Back To Home</ion-text
            >
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>



<script>
import auth_api from "@/apis/modules/auth_api";
import { lockClosedOutline, mailOutline, eye, eyeOff } from "ionicons/icons";
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
  IonSegment,
  IonSegmentButton,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { defineRule, useField, useForm } from "vee-validate";
import { useRouter } from "vue-router";
import VueQrcode from "vue-qrcode";
import services_apis from "@/apis/modules/passengers/services_apis";
export default defineComponent({
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
    VueQrcode,
    IonSegment,
    IonSegmentButton,
  },
  name: "add_student",

  data() {
    return {
      is_btn_loading: false,
      is_open: false,
      email: "",
      validat1: "",
      validat2: "",
      account_name: "",
      account_number: "",
      expiry_date: "",
      cvv: "",
      is_paypal_payment: false,
      is_card_payment: true,
      is_make_payment: false,
      qrValue: ``,
      get_sevice: [],
      id: this.$route.params.id,
    };
  },
  setup() {
    // validation rules
    defineRule("requiredAccountName", (value) => {
      if (!value || !value.length) {
        return "The account name field is required";
      }
      return true;
    });

    defineRule("cvv", (cvv) => {
      if (!/.{3}/.test(cvv)) {
        return "please enter valid CVV";
      }
      return true;
    });

    defineRule("requiredAccountNumber", (value) => {
      if (!value || !value.length) {
        return "The account number field is required";
      }
      return true;
    });

    defineRule("requiredEXPDate", (value) => {
      if (!value || !value.length) {
        return "The expire date field is required";
      }
      return true;
    });

    defineRule("requiredCVV", (value) => {
      if (!value || !value.length) {
        return "The CVV field is required";
      }
      return true;
    });

    // checking valid email
    defineRule("email", (email) => {
      if (
        !/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/.test(
          email
        )
      ) {
        return "Please enter a valid email";
      }
      return true;
    });

    defineRule("requiredEmail", (value) => {
      if (!value || !value.length) {
        return "The Email field is required";
      }
      return true;
    });

    function validation() {
      return theForm.validate();
    }

    const schema = {
      account_number: "requiredAccountNumber",
      account_name: "requiredAccountName",
      first_name: "requiredAccountName",
      expiry_date: "requiredEXPDate",
      cvv: "requiredCVV|cvv",
      email: "requiredEmail|email",
    };

    // Create a form context with the validation schema
    const theForm = useForm({
      validationSchema: schema,
    });

    // No need to define rules for fields
    const { value: email, errorMessage: emailError } = useField("email");
    const { value: account_name, errorMessage: passwordError } =
      useField("account_name");
    const { value: account_number, errorMessage: accountNumberErr } =
      useField("account_number");
    const { value: expiry_date, errorMessage: expiry_dateError } =
      useField("expiry_date");
    const { value: cvv, errorMessage: cvv_Error } = useField("cvv");

    const router = useRouter();
    return {
      validation,
      emailError,
      passwordError,
      email,
      account_name,
      expiry_dateError,
      cvv_Error,
      cvv,
      expiry_date,
      router,
      lockClosedOutline,
      mailOutline,
      eye,
      eyeOff,
      account_number,
      accountNumberErr,
    };
  },
  methods: {
    carPayment() {
      this.is_card_payment = true;
      this.is_paypal_payment = false;
      this.is_make_payment = false;
    },
    payPalPayment() {
      this.is_card_payment = false;
      this.is_paypal_payment = true;
      this.is_make_payment = false;
    },
    async makeCardPayment() {
      try {
        this.validat1 = await this.validation();
        if (this.validat1) {
          this.is_card_payment = false;
          this.is_paypal_payment = false;
          this.is_make_payment = true;
          this.qrValue = `name : ${this.get_sevice.name}, origin : ${this.get_sevice.origin} , detination : ${this.get_sevice.destination}, 
      amount : ${this.get_sevice.price}, payment-method : "cart payment", user-type : "passenger"`;
          this.successToast("Booking has been completed successfully");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async makePaypalPayment() {
      try {
        this.validat2 = await this.validation();
        if (this.validat2) {
          this.is_card_payment = false;
          this.is_paypal_payment = false;
          this.is_make_payment = true;
          this.qrValue = `name : ${this.get_sevice.name}, origin : ${this.get_sevice.origin} , detination : ${this.get_sevice.destination}, 
      amount : ${this.get_sevice.price}, payment-method : "paypal payment", user-type : "passenger"`;
          this.successToast("Booking has been completed successfully");
        }
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
});
</script>

<style scoped>
</style>
