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
          <ion-col size="12">
            <ion-label position="floating">First Name</ion-label>
            <ion-input
              v-model="first_name"
              class="u-input"
              type="text"
            ></ion-input>
            <ion-row v-show="first_nameError" class="ion-text-start">
              <ion-col size="12">
                <ion-text color="danger">
                  <span>{{ first_nameError }}</span>
                </ion-text>
              </ion-col>
            </ion-row>
          </ion-col>
          <ion-col size="12">
            <ion-label position="floating">Last Name</ion-label>
            <ion-input
              class="u-input"
              v-model="last_name"
              clear-input
              required
              type="text"
            ></ion-input>
            <ion-row v-show="last_nameError" class="ion-text-start">
              <ion-col size="12">
                <ion-text color="danger">
                  <span>{{ last_nameError }}</span>
                </ion-text>
              </ion-col>
            </ion-row>
          </ion-col>
          <ion-col size="12">
            <ion-label position="floating">Email</ion-label>
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
          </ion-col>
          <ion-col size="12">
            <ion-label position="floating">Password</ion-label>
            <ion-input
              class="u-input"
              v-model="password"
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
          <ion-col size="6">
            <ion-label position="floating">Mobile</ion-label>
            <ion-input
              class="u-input"
              v-model="mobile"
              clear-input
              required
              type="number"
              minlength="10"
            ></ion-input>
            <ion-row v-show="mobileError" class="ion-text-start">
              <ion-col size="12">
                <ion-text color="danger">
                  <span>{{ mobileError }}</span>
                </ion-text>
              </ion-col>
            </ion-row>
          </ion-col>

          <ion-col size="6">
            <ion-label position="floating">Select Type</ion-label>
            <ion-select
              class="u-input"
              v-model="account_type"
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
            <ion-row v-show="account_typeError" class="ion-text-start">
              <ion-col size="12">
                <ion-text color="danger">
                  <span>{{ account_typeError }}</span>
                </ion-text>
              </ion-col>
            </ion-row>
          </ion-col>
        </ion-row>

        <ion-col>
          <ion-button
            :disabled="is_btn_loading"
            class="mt-5"
            expand="block"
            style="margin-top: 5%; margin-bottom: 5%"
            @click="saveData"
          >
            <ion-spinner :hidden="!is_btn_loading" name="circles"></ion-spinner>
            Register
          </ion-button>
        </ion-col>
        <ion-col size="12" style="margin-left: 18%">
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
} from "@ionic/vue";
import { defineComponent } from "vue";
import { defineRule, useField, useForm } from "vee-validate";
import { useRouter } from "vue-router";
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
  },
  name: "add_student",

  data() {
    return {
      is_btn_loading: false,
      is_open: false,
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      mobile: "",
      account_type: "",
      validat: "",
    };
  },
  setup() {
    // validation rules

    // require
    defineRule("requiredEmail", (value) => {
      if (!value || !value.length) {
        return "The Email field is required";
      }
      return true;
    });

    defineRule("requiredPassword", (value) => {
      if (!value || !value.length) {
        return "The Password field is required";
      }
      return true;
    });

    defineRule("requiredFirstName", (value) => {
      if (!value || !value.length) {
        return "The First Name field is required";
      }
      return true;
    });

    defineRule("requiredLastName", (value) => {
      if (!value || !value.length) {
        return "The Last Name field is required";
      }
      return true;
    });

    defineRule("requiredAccountType", (value) => {
      if (!value || !value.length) {
        return "The Account type field is required";
      }
      return true;
    });

    defineRule("requiredMobile", (value) => {
      if (!value || !value.length) {
        return "The Mobile Number field is required";
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

    // checking valid [password]
    defineRule("password", (password) => {
      if (
        !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/.test(password)
      ) {
        return "Your password must contain at least one uppercase, one lowercase, one special character and one digit";
      }
      return true;
    });

    function validation() {
      return theForm.validate();
    }

    const schema = {
      email: "requiredEmail|email",
      password: "requiredPassword|password",
      first_name: "requiredFirstName",
      last_name: "requiredLastName",
      account_type: "requiredAccountType",
      mobile: "requiredMobile",
    };

    // Create a form context with the validation schema
    const theForm = useForm({
      validationSchema: schema,
    });

    // No need to define rules for fields
    const { value: email, errorMessage: emailError } = useField("email");
    const { value: password, errorMessage: passwordError } =
      useField("password");
    const { value: first_name, errorMessage: first_nameError } =
      useField("first_name");
    const { value: last_name, errorMessage: last_nameError } =
      useField("last_name");
    const { value: account_type, errorMessage: account_typeError } =
      useField("account_type");
    const { value: mobile, errorMessage: mobileError } = useField("mobile");

    const router = useRouter();
    return {
      validation,
      emailError,
      passwordError,
      email,
      password,
      last_nameError,
      account_typeError,
      account_type,
      last_name,
      mobileError,
      mobile,
      router,
      lockClosedOutline,
      mailOutline,
      eye,
      eyeOff,
      first_name,
      first_nameError,
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
        this.validat = await this.validation();
        if (this.validat.valid) {
          this.registerUser();
        }
      } catch (e) {
        await this.dangerToast(e);
      }
    },

    async registerUser() {
      try {
        this.is_btn_loading = true;
        let payload = {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password,
          mobile: this.mobile,
          account_type: this.account_type,
        };
        await auth_api.register(payload);
        await this.successToast("user registered successfully");
        this.is_btn_loading = false;
        this.$router.push("/login");
      } catch (e) {
        await this.dangerToast(e);
      }
      this.is_btn_loading = false;
    },
  },
});
</script>

<style scoped>
</style>
