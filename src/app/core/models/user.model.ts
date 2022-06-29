
export class User {
  id: string;
  _id: string;
  banners: [];
  isActivated: boolean;
  isSuccess: boolean;
  userId: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string;
  emailId: string;
  about: string;
  fullName: string;
  email: string;
  type: string;
  mobile: number;
  phoneNumber: string;
  role: string;
  city: string;
  confirmPassword: string;
  oldPassword: string;
  password: string;
  newPassword: string;
  token: string;
  createdAt: string;
  otp: string;
  otpToken: string;
  avatarImages: string;
  avatar: string;

  category: string;
  description: string;
  facebook: string;
  website: string;
  twitter: string;
  instagram: string;
  country: string;
  zipCode: string;
  lat: string;
  long: string;
  answer: string;
  securityQuestion: string;
  providerId: string;
  programId: string;
  status: string;
  name: string;
  note: string;
  personalNote: string;
  state: string;
  provider_logo: string;
  skills = [];
  alert: any;
  alertType: any;
  disableAlert: string;
  tagsId = [];
  length: any;
  roleId: string;
  imageFor: string;
  gallery: string;
  image: string;
  imageId: string;


  constructor(obj?: any) {

    if (!obj) {
      return;
    }

    this.id = obj.id;
    this._id = obj._id;
    this.banners = obj.banners;
    this.isActivated = obj.isActivated;
    this.isSuccess = obj.isSuccess;
    this.fullName = obj.fullName;
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
    this.about = obj.about;
    this.emailId = obj.emailId;
    this.email = obj.email;
    this.addressLine1 = obj.addressLine1;
    this.addressLine2 = obj.addressLine2;
    this.type = obj.type;
    this.mobile = obj.mobile;
    this.phoneNumber = obj.phoneNumber;
    this.password = obj.password;
    this.newPassword = obj.newPassword;
    this.oldPassword = obj.oldPassword;
    this.confirmPassword = obj.confirmPassword;
    this.city = obj.city;
    this.token = obj.token;
    this.createdAt = obj.createdAt;
    this.otp = obj.otp;
    this.otpToken = obj.otpToken;
    this.avatarImages = obj.avatarImages;
    this.avatar = obj.avatar;

    this.category = obj.category;
    this.description = obj.description;
    this.facebook = obj.facebook;
    this.website = obj.website;
    this.twitter = obj.twitter;
    this.instagram = obj.instagram;
    this.country = obj.country;
    this.zipCode = obj.zipCode;
    this.lat = obj.lat;
    this.long = obj.long;
    this.securityQuestion = obj.securityQuestion;
    this.answer = obj.answer;

    this.providerId = obj.providerId;
    this.programId = obj.programId;
    this.status = obj.status;
    this.name = obj.name;
    this.note = obj.note;
    this.personalNote = obj.personalNote;
    this.state = obj.state;
    this.provider_logo = obj.provider_logo;
    this.skills = obj.skills;
    this.alert = obj.alert;
    this.alertType = obj.alertType;
    this.disableAlert = obj.disableAlert;
    this.roleId = obj.roleId;
    this.imageFor = obj.imageFor;
    this.image = obj.image;
    this.gallery = obj.gallery;
    this.imageId = obj.imageId;
  }
}
