import { CdkStep, StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStep } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute, Router } from "@angular/router";
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-primary-tenant',
  templateUrl: './primary-tenant.component.html',
  styleUrls: ['./primary-tenant.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class PrimaryTenantComponent {
  // myForm: FormGroup;

  isLinear = true;
  selectedTabIndex: number = 0;
  completed: boolean = false;
  steps = [true, true]; // Use an array to represent steps, e.g., [true, false, false] for three steps
  currentStep = 0;
  state?: string;
  // applicantTypes: string[] = ['Single', 'Couple', 'Roommates'];
  // applicantTypes = [
  //   { value: '1', label: 'Single' },
  //   { value: '2', label: 'Couple' },
  //   { value: '3', label: 'Roommates' },
  //   { value: '4', label: 'Couple+Roommates' }
  //   // Add more options as needed
  // ];
  propertyTypes: string[] = ['Multi-Family', 'Single-Family']
  options1: any = ['Yes', 'No'];
  options2: any = ['Fair/good', 'Poor']
  stepper: any;
  currentUser: any;
  incomeVerificationData: any;
  result: any
  @ViewChild('tabGroup', { static: false }) tabGroup: MatTabGroup | undefined;
  private _http: any;
  createApplicant: any;
  snapid: any;
  applicantId: number = 0; frmTenant: any; tenantId: number = 0; tenantSNO: number = 0;
  primaryTenantIncomeVerification: number = 0;
  constructor(private fb: FormBuilder, private authservice: AuthService, private router: Router, private _userservice: UsersService, private activate: ActivatedRoute) {
    this.authservice.currentUser.subscribe(x => this.currentUser = x);
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
  }


  ngOnInit() {
    this.frmPrimary.get('applicantName')?.setValue('');

    this.snapid = this.activate.snapshot.paramMap.get('id') || '';

    if (this.snapid) {

      this.getScroreSheetByApplicantId(this.snapid, 1);

    }

  }

  //Primary Tenant Section 
  frmPrimary = this.fb.group({
    // basicinfo: this.fb.group({
    // firstCtrl:['',Validators.required],
    appilcantId: [0, Validators.required],
    applicantName: ['', Validators.required],
    applicantType: [''],
    property: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zip: ['', Validators.required],
    monthlyRent: ['', Validators.required],
    section8Rent: ['', Validators.required],
    standardDepositProperty: ['', Validators.required],
    // propertyTypeId: ['', Validators.required],
    propertyType: ['', Validators.required],
    // applicantTypeId: ['', Validators.required],
    // ptype: ['', Validators.required],
    applicantId: ['', Validators.required],
    tenantSNo: ['', Validators.required],
    tenantId: [Number],
    paystubRecent: ['', Validators.required],
    applicantTypeId: [Number],
    propertyTypeId: ['', Validators.required],
    createdBy: ['', Validators.required],
    // }),
    incom_verification: this.fb.group({
      paystubRecent: ['', Validators.required], //pay stub
      paystubRecentMonthly: ['', Validators.required], //monthly
      yTD_Earnings: ['', Validators.required], //results
      secondPayStub: ['', Validators.required], //2nd stub
      bankStatementMonthly: ['', Validators.required], //monthly
      bankStatement: ['', Validators.required], //result
      xRent: ['', Validators.required], //x-rent
      incomeAdequate: [Boolean, Validators.required], //incomeAdequate
      applicantId: ['', Validators.required],
      tenantSNo: ['', Validators.required],
      tenantId: [Number],
      createdBy: ['', Validators.required],
    }),
    credit_summary: this.fb.group({
      creditLines: [Boolean, Validators.required],
      creditScore: [Number],
      //creditScorePoints: [Number, Validators.required],
      creditScoreAvailable: [Boolean, Validators.required],
      // creditScoreAvailablePoints: ['',Validators.required],
      // accountPastDue60Days: ['',Validators.required],
      collectionAccounts: [Number],
      // collectionAccountsPoints: ['',Validators.required],
      medicalCollections: ['', Validators.required],
      propertyRelatedHousingRecord: [Boolean, Validators.required],
      // propertyRelatedHousingRecordPoints: ['',Validators.required],
      bankruptcy: [Number],
      bankRuptyActive: [Boolean, Validators.required],
      //bankRuptyActivePoints: ['', Validators.required],
      liensRepossessions: [Date, Validators.required],
      // liensRepossessionsPoints: ['',Validators.required],
      //evectionHistoryPoints: ['', Validators.required],
      evectionHistory: [null],
      class1Felonies: [Boolean, Validators.required],
      // class1FeloniesPoints: ['',Validators.required],
      class2Felonies: [Date, Validators.required],
      // class2FeloniesPoints : ['',Validators.required],
      class1Misdemeaners: [Date, Validators.required],
      // class1MisdemeanersPoints: ['',Validators.required],
      class2Misdemeaners: [Date, Validators.required],
      depositApproved: [Boolean, Validators.required],
      depositToHold: [''],
      applicantId: ['', Validators.required],
      tenantSNo: ['', Validators.required],
      tenantId: [Number],
      createdBy: ['', Validators.required],
    }),
    landlord_ref: this.fb.group({
      rentalReferance: [Boolean, Validators.required],
      lL1LandlordType: [Number, Validators.required],
      lL1ProperNotice: [Boolean, Validators.required],
      //lL1ProperNoticePoints: [0, Validators.required],
      lL1NSF: ['', Validators.required],
      //lL1NSFPoints: [0, Validators.required],
      lL1LatePayments: ['', Validators.required],
      //lL1LatePaymentsPoints: [0, Validators.required],
      lL1PaymentOrVacantNotices: ['', Validators.required],
      //lL1PaymentOrVacantNoticesPoints: [0, Validators.required],
      lL1TendayComplyNotice: ['', Validators.required],
      //lL1TendayComplyNoticePoints: [0, Validators.required],
      lL1HOAViolations: ['', Validators.required],
      //lL1HOAViolationsPoints: [0, Validators.required],
      lL1PropertyCleanliness: ['', Validators.required],
      //lL1PropertyCleanlinessPoints: [0, Validators.required],
      lL1Pets: [Boolean, Validators.required],
      //lL1PetsPoints: ['', Validators.required],
      lL1AdversePetReferance: [Boolean, Validators.required],
      //lL1AdversePetReferancePoints: [0, Validators.required],
      lL1Rerent: [Boolean, Validators.required],
      //lL1RerentPoints: [0, Validators.required],


      lL2LandlordType: [Number, Validators.required],
      lL2ProperNotice: [Boolean, Validators.required],
      //lL2ProperNoticePoints: ['', Validators.required],
      lL2NSF: ['', Validators.required],
      //lL2NSFPoints: ['', Validators.required],
      lL2LatePayments: ['', Validators.required],
      //L2LatePaymentsPoints: ['', Validators.required],
      lL2PaymentOrVacantNotices: ['', Validators.required],
      //lL2PaymentOrVacantNoticesPoints: ['', Validators.required],
      lL2TendayComplyNotice: ['', Validators.required],
      //lL2TendayComplyNoticePoints: ['', Validators.required],
      lL2HOAViolations: ['', Validators.required],
      //lL2HOAViolationsPoints: ['', Validators.required],
      lL2PropertyCleanliness: ['', Validators.required],
      //lL2PropertyCleanlinessPoints: ['', Validators.required],
      lL2Pets: [Boolean, Validators.required],
      //lL2PetsPoints: ['', Validators.required],
      lL2AdversePetReferance: [Boolean, Validators.required],
      //lL2AdversePetReferancePoints: ['', Validators.required],
      lL2Rerent: [Boolean, Validators.required],
      //lL2RerentPoints: ['', Validators.required],
      applicantId: ['', Validators.required],
      tenantSNo: ['', Validators.required],
      tenantId: [Number],
      createdBy: ['', Validators.required],
    }),
    rental_history: this.fb.group({
      rentalHistoryLength: [Boolean, Validators.required],
      applicantId: ['', Validators.required],
      tenantSNo: ['', Validators.required],
      tenantId: [Number],
      createdBy: ['', Validators.required],
    }),
    pets: this.fb.group({
      petApprovedLandlordReferance1: ['', Validators.required],
      petApprovedLandlordReferance2: ['', Validators.required],
      noOfCatsCompanion: [Boolean, Validators.required],
      noOfCatsCompanions: [Number],
      noOfLargeDogsCompanion: [Boolean, Validators.required],
      noOfLargeDogsCompanions: [Number],
      noOfSmallDogsCompanion: [Boolean, Validators.required],
      noOfSmallDogsCompanions: [Number],
      applicantId: ['', Validators.required],
      tenantSNo: ['', Validators.required],
      tenantId: [Number],
      createdBy: ['', Validators.required],
    }),
    points_summary: this.fb.group({
      totalPoints: ['', Validators.required],
      finalApproval: [Boolean, Validators.required],
      totalDeposit: ['', Validators.required],
      depositToHoldPaid: ['', Validators.required],
      petDeposit: ['', Validators.required],
      additionalDeposit: ['', Validators.required],
      balanceDepositDue: ['', Validators.required],
      applicantId: ['', Validators.required],
      tenantSNo: ['', Validators.required],
      tenantId: [Number],
      createdBy: ['', Validators.required],
    }),
  })

  //Primary Tenant Section End


  coverSheetForm = this.fb.group({
    applicantId: ['', Validators.required],
    propertyManager: ['', Validators.required],
    primaryTenant: ['', Validators.required],
    tenant2: ['', Validators.required],
    tenant3: ['', Validators.required],
    tenant4: ['', Validators.required],
    propertyAddress: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    unitCode: ['', Validators.required],
    bestPOC: ['', Validators.required],
    rentReadyDate: ['', Validators.required],
    depositPaidDate: ['', Validators.required],
    rentResponsibleDate: ['', Validators.required],
    agreementType: ['', Validators.required],
    qcDate: ['', Validators.required],
    signingDate: ['', Validators.required],
    //signingTime: [Time, Validators.required],
    withWhom: ['', Validators.required],
    otherTerms: ['', Validators.required],
    listPaidUtilities: ['', Validators.required],
    otherMonthlyCharge11: ['', Validators.required],
    otherMonthlyCharge12: ['', Validators.required],
    otherMonthlyCharge21: ['', Validators.required],
    otherMonthlyCharge22: ['', Validators.required],
    otherMonthlyCharge31: ['', Validators.required],
    otherMonthlyCharge32: ['', Validators.required],
    otherMonthlyCharge41: ['', Validators.required],
    otherMonthlyCharge42: ['', Validators.required],
    otherMoveinCharge1: ['', Validators.required],
    otherMoveinChargePaid1: ['', Validators.required],
    moveinRentCharge: ['', Validators.required],
    moveinRentPaid: ['', Validators.required],

    otherMoveinCharge2: ['', Validators.required],
    otherMoveinChargePaid2: ['', Validators.required],
    otherMoveinCharge3: ['', Validators.required],
    otherMoveinChargePaid3: ['', Validators.required],
    rubsMoveinCharge: ['', Validators.required],
    rubsMoveinChargePaid: ['', Validators.required],
    prepaidCleaningCharge: ['', Validators.required],
    prepaidCleaningPaid: ['', Validators.required],


    securityDepositCharge: ['', Validators.required],
    securityDepositPaid: ['', Validators.required],
    nonRefProcessingFeeCharge: ['', Validators.required],
    nonRefProcessingFeePaid: ['', Validators.required],
    petDepositCharge: ['', Validators.required],
    petDepositPaid: ['', Validators.required],
    petNonRefFeeCharge: ['', Validators.required],
    petNonRefFeePaid: ['', Validators.required],

    additionDepositCharge: ['', Validators.required],
    additionDepositPaid: ['', Validators.required],
    subTotal: ['', Validators.required],
    paid: ['', Validators.required],
    dueatMoveinKeyPickup: ['', Validators.required],
    createdBy: ['', Validators.required],

    modifiedBy: ['', Validators.required],


    // Other charges...
  });
  frmTenant2 = this.fb.group({
    // basicinfo: this.fb.group({      
    // firstCtrl:['',Validators.required],
    applicantName: ['', Validators.required],
    applicantType: [''],
    property: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zip: ['', Validators.required],
    monthlyRent: ['', Validators.required],
    section8Rent: ['', Validators.required],
    standardDepositProperty: ['', Validators.required],
    // propertyTypeId: ['', Validators.required],
    propertyType: ['', Validators.required],
    // applicantTypeId: ['', Validators.required],
    // ptype: ['', Validators.required],
    applicantId: ['', Validators.required],
    tenantSNo: ['', Validators.required],
    tenantId: [Number],
    paystubRecent: ['', Validators.required],
    applicantTypeId: [Number],
    propertyTypeId: ['', Validators.required],
    createdBy: ['', Validators.required],

    // }),
    incom_verification: this.fb.group({
      paystubRecent: ['', Validators.required], //pay stub
      paystubRecentMonthly: ['', Validators.required], //monthly
      yTD_Earnings: ['', Validators.required], //results
      secondPayStub: ['', Validators.required], //2nd stub
      bankStatementMonthly: ['', Validators.required], //monthly
      bankStatement: ['', Validators.required], //result
      xRent: ['', Validators.required], //x-rent
      incomeAdequate: [Boolean, Validators.required], //incomeAdequate
      applicantId: ['', Validators.required],
      tenantSNo: ['', Validators.required],
      tenantId: [Number],
      createdBy: ['', Validators.required],
    }),
    credit_summary: this.fb.group({
      creditLines: [Boolean, Validators.required],
      creditScore: ['', Validators.required],
      //creditScorePoints: [Number, Validators.required],
      creditScoreAvailable: [Boolean, Validators.required],
      // creditScoreAvailablePoints: ['',Validators.required],
      // accountPastDue60Days: ['',Validators.required],
      collectionAccounts: ['', Validators.required],
      // collectionAccountsPoints: ['',Validators.required],
      medicalCollections: ['', Validators.required],
      propertyRelatedHousingRecord: [Boolean, Validators.required],
      // propertyRelatedHousingRecordPoints: ['',Validators.required],
      bankruptcy: [0, Validators.required],
      bankRuptyActive: [Boolean, Validators.required],
      //bankRuptyActivePoints: ['', Validators.required],
      liensRepossessions: [Date, Validators.required],
      // liensRepossessionsPoints: ['',Validators.required],
      //evectionHistoryPoints: ['', Validators.required],
      evectionHistory: [null],
      class1Felonies: [Boolean, Validators.required],
      // class1FeloniesPoints: ['',Validators.required],
      class2Felonies: [Date, Validators.required],
      // class2FeloniesPoints : ['',Validators.required],
      class1Misdemeaners: [Date, Validators.required],
      // class1MisdemeanersPoints: ['',Validators.required],
      class2Misdemeaners: [Date, Validators.required],
      depositApproved: [Boolean, Validators.required],
      depositToHold: [''],
      applicantId: ['', Validators.required],
      tenantSNo: ['', Validators.required],
      tenantId: [Number],
      createdBy: ['', Validators.required],

    }),
    landlord_ref: this.fb.group({
      rentalReferance: [Boolean, Validators.required],
      lL1LandlordType: [Number, Validators.required],
      lL1ProperNotice: [Boolean, Validators.required],
      //lL1ProperNoticePoints: [0, Validators.required],
      lL1NSF: ['', Validators.required],
      //lL1NSFPoints: [0, Validators.required],
      lL1LatePayments: ['', Validators.required],
      //lL1LatePaymentsPoints: [0, Validators.required],
      lL1PaymentOrVacantNotices: ['', Validators.required],
      //lL1PaymentOrVacantNoticesPoints: [0, Validators.required],
      lL1TendayComplyNotice: ['', Validators.required],
      //lL1TendayComplyNoticePoints: [0, Validators.required],
      lL1HOAViolations: ['', Validators.required],
      //lL1HOAViolationsPoints: [0, Validators.required],
      lL1PropertyCleanliness: ['', Validators.required],
      //lL1PropertyCleanlinessPoints: [0, Validators.required],
      lL1Pets: [Boolean, Validators.required],
      //lL1PetsPoints: ['', Validators.required],
      lL1AdversePetReferance: [Boolean, Validators.required],
      //lL1AdversePetReferancePoints: [0, Validators.required],
      lL1Rerent: [Boolean, Validators.required],
      //lL1RerentPoints: [0, Validators.required],


      lL2LandlordType: [Number, Validators.required],
      lL2ProperNotice: [Boolean, Validators.required],
      //lL2ProperNoticePoints: ['', Validators.required],
      lL2NSF: ['', Validators.required],
      //lL2NSFPoints: ['', Validators.required],
      lL2LatePayments: ['', Validators.required],
      //L2LatePaymentsPoints: ['', Validators.required],
      lL2PaymentOrVacantNotices: ['', Validators.required],
      //lL2PaymentOrVacantNoticesPoints: ['', Validators.required],
      lL2TendayComplyNotice: ['', Validators.required],
      //lL2TendayComplyNoticePoints: ['', Validators.required],
      lL2HOAViolations: ['', Validators.required],
      //lL2HOAViolationsPoints: ['', Validators.required],
      lL2PropertyCleanliness: ['', Validators.required],
      //lL2PropertyCleanlinessPoints: ['', Validators.required],
      lL2Pets: [Boolean, Validators.required],
      //lL2PetsPoints: ['', Validators.required],
      lL2AdversePetReferance: [Boolean, Validators.required],
      //lL2AdversePetReferancePoints: ['', Validators.required],
      lL2Rerent: [Boolean, Validators.required],
      //lL2RerentPoints: ['', Validators.required],
      applicantId: ['', Validators.required],
      tenantSNo: ['', Validators.required],
      tenantId: [Number],
      createdBy: ['', Validators.required],

    }),
    rental_history: this.fb.group({
      rentalHistoryLength: [Boolean, Validators.required],
      applicantId: ['', Validators.required],
      tenantSNo: ['', Validators.required],
      tenantId: [Number],
      createdBy: ['', Validators.required],
    }),
    pets: this.fb.group({
      petApprovedLandlordReferance1: ['', Validators.required],
      petApprovedLandlordReferance2: ['', Validators.required],
      noOfCatsCompanion: [Boolean, Validators.required],
      noOfCatsCompanions: ['', Validators.required],
      noOfLargeDogsCompanion: [Boolean, Validators.required],
      noOfLargeDogsCompanions: ['', Validators.required],
      noOfSmallDogsCompanion: [Boolean, Validators.required],
      noOfSmallDogsCompanions: ['', Validators.required],
      applicantId: ['', Validators.required],
      tenantSNo: ['', Validators.required],
      tenantId: [Number],
      createdBy: ['', Validators.required],
    }),
    points_summary: this.fb.group({
      totalPoints: ['', Validators.required],
      finalApproval: [Boolean, Validators.required],
      totalDeposit: ['', Validators.required],
      depositToHoldPaid: ['', Validators.required],
      petDeposit: ['', Validators.required],
      additionalDeposit: ['', Validators.required],
      balanceDepositDue: ['', Validators.required],
      applicantId: ['', Validators.required],
      tenantSNo: ['', Validators.required],
      tenantId: [Number],
      createdBy: ['', Validators.required],
    }),
  })

  frmTenant3 = this.fb.group({
    // basicinfo: this.fb.group({      
    // firstCtrl:['',Validators.required],
    applicantName: ['', Validators.required],
    applicantType: [''],
    property: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zip: ['', Validators.required],
    monthlyRent: ['', Validators.required],
    section8Rent: ['', Validators.required],
    standardDepositProperty: ['', Validators.required],
    // propertyTypeId: ['', Validators.required],
    propertyType: ['', Validators.required],
    // applicantTypeId: ['', Validators.required],
    // ptype: ['', Validators.required],
    applicantId: ['', Validators.required],
    tenantSNo: ['', Validators.required],
    tenantId: [Number],
    paystubRecent: ['', Validators.required],
    applicantTypeId: [Number],
    propertyTypeId: ['', Validators.required],
    createdBy: ['', Validators.required],

    // }),
    incom_verification: this.fb.group({
      paystubRecent: ['', Validators.required], //pay stub
      paystubRecentMonthly: ['', Validators.required], //monthly
      yTD_Earnings: ['', Validators.required], //results
      secondPayStub: ['', Validators.required], //2nd stub
      bankStatementMonthly: ['', Validators.required], //monthly
      bankStatement: ['', Validators.required], //result
      xRent: ['', Validators.required], //x-rent
      incomeAdequate: [Boolean, Validators.required], //incomeAdequate
      applicantId: ['', Validators.required],
      tenantSNo: ['', Validators.required],
      tenantId: [Number],
      createdBy: ['', Validators.required],
    }),
    credit_summary: this.fb.group({
      creditLines: [Boolean, Validators.required],
      creditScore: ['', Validators.required],
      //creditScorePoints: [Number, Validators.required],
      creditScoreAvailable: [Boolean, Validators.required],
      // creditScoreAvailablePoints: ['',Validators.required],
      // accountPastDue60Days: ['',Validators.required],
      collectionAccounts: ['', Validators.required],
      // collectionAccountsPoints: ['',Validators.required],
      medicalCollections: ['', Validators.required],
      propertyRelatedHousingRecord: [Boolean, Validators.required],
      // propertyRelatedHousingRecordPoints: ['',Validators.required],
      bankruptcy: [0, Validators.required],
      bankRuptyActive: [Boolean, Validators.required],
      //bankRuptyActivePoints: ['', Validators.required],
      liensRepossessions: [Date, Validators.required],
      // liensRepossessionsPoints: ['',Validators.required],
      //evectionHistoryPoints: ['', Validators.required],
      evectionHistory: [null],
      class1Felonies: [Boolean, Validators.required],
      // class1FeloniesPoints: ['',Validators.required],
      class2Felonies: [Date, Validators.required],
      // class2FeloniesPoints : ['',Validators.required],
      class1Misdemeaners: [Date, Validators.required],
      // class1MisdemeanersPoints: ['',Validators.required],
      class2Misdemeaners: [Date, Validators.required],
      depositApproved: [Boolean, Validators.required],
      depositToHold: [''],
      applicantId: ['', Validators.required],
      tenantSNo: ['', Validators.required],
      tenantId: [Number],
      createdBy: ['', Validators.required],

    }),
    landlord_ref: this.fb.group({
      rentalReferance: [Boolean, Validators.required],
      lL1LandlordType: [Number, Validators.required],
      lL1ProperNotice: [Boolean, Validators.required],
      //lL1ProperNoticePoints: [0, Validators.required],
      lL1NSF: ['', Validators.required],
      //lL1NSFPoints: [0, Validators.required],
      lL1LatePayments: ['', Validators.required],
      //lL1LatePaymentsPoints: [0, Validators.required],
      lL1PaymentOrVacantNotices: ['', Validators.required],
      //lL1PaymentOrVacantNoticesPoints: [0, Validators.required],
      lL1TendayComplyNotice: ['', Validators.required],
      //lL1TendayComplyNoticePoints: [0, Validators.required],
      lL1HOAViolations: ['', Validators.required],
      //lL1HOAViolationsPoints: [0, Validators.required],
      lL1PropertyCleanliness: ['', Validators.required],
      //lL1PropertyCleanlinessPoints: [0, Validators.required],
      lL1Pets: [Boolean, Validators.required],
      //lL1PetsPoints: ['', Validators.required],
      lL1AdversePetReferance: [Boolean, Validators.required],
      //lL1AdversePetReferancePoints: [0, Validators.required],
      lL1Rerent: [Boolean, Validators.required],
      //lL1RerentPoints: [0, Validators.required],


      lL2LandlordType: [Number, Validators.required],
      lL2ProperNotice: [Boolean, Validators.required],
      //lL2ProperNoticePoints: ['', Validators.required],
      lL2NSF: ['', Validators.required],
      //lL2NSFPoints: ['', Validators.required],
      lL2LatePayments: ['', Validators.required],
      //L2LatePaymentsPoints: ['', Validators.required],
      lL2PaymentOrVacantNotices: ['', Validators.required],
      //lL2PaymentOrVacantNoticesPoints: ['', Validators.required],
      lL2TendayComplyNotice: ['', Validators.required],
      //lL2TendayComplyNoticePoints: ['', Validators.required],
      lL2HOAViolations: ['', Validators.required],
      //lL2HOAViolationsPoints: ['', Validators.required],
      lL2PropertyCleanliness: ['', Validators.required],
      //lL2PropertyCleanlinessPoints: ['', Validators.required],
      lL2Pets: [Boolean, Validators.required],
      //lL2PetsPoints: ['', Validators.required],
      lL2AdversePetReferance: [Boolean, Validators.required],
      //lL2AdversePetReferancePoints: ['', Validators.required],
      lL2Rerent: [Boolean, Validators.required],
      //lL2RerentPoints: ['', Validators.required],
      applicantId: ['', Validators.required],
      tenantSNo: ['', Validators.required],
      tenantId: [Number],
      createdBy: ['', Validators.required],

    }),
    rental_history: this.fb.group({
      rentalHistoryLength: [Boolean, Validators.required],
      applicantId: ['', Validators.required],
      tenantSNo: ['', Validators.required],
      tenantId: [Number],
      createdBy: ['', Validators.required],
    }),
    pets: this.fb.group({
      petApprovedLandlordReferance1: ['', Validators.required],
      petApprovedLandlordReferance2: ['', Validators.required],
      noOfCatsCompanion: [Boolean, Validators.required],
      noOfCatsCompanions: ['', Validators.required],
      noOfLargeDogsCompanion: [Boolean, Validators.required],
      noOfLargeDogsCompanions: ['', Validators.required],
      noOfSmallDogsCompanion: [Boolean, Validators.required],
      noOfSmallDogsCompanions: ['', Validators.required],
      applicantId: ['', Validators.required],
      tenantSNo: ['', Validators.required],
      tenantId: [Number],
      createdBy: ['', Validators.required],
    }),
    points_summary: this.fb.group({
      totalPoints: ['', Validators.required],
      finalApproval: [Boolean, Validators.required],
      totalDeposit: ['', Validators.required],
      depositToHoldPaid: ['', Validators.required],
      petDeposit: ['', Validators.required],
      additionalDeposit: ['', Validators.required],
      balanceDepositDue: ['', Validators.required],
      applicantId: ['', Validators.required],
      tenantSNo: ['', Validators.required],
      tenantId: [Number],
      createdBy: ['', Validators.required],
    }),
  })
  frmTenant4 = this.fb.group({
    // basicinfo: this.fb.group({      
    // firstCtrl:['',Validators.required],
    applicantName: ['', Validators.required],
    applicantType: ['', Validators.required],
    property: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zip: ['', Validators.required],
    monthlyRent: ['', Validators.required],
    section8Rent: ['', Validators.required],
    standardDepositProperty: ['', Validators.required],
    // propertyTypeId: ['', Validators.required],
    propertyType: ['', Validators.required],
    // applicantTypeId: ['', Validators.required],
    // ptype: ['', Validators.required],
    applicantId: ['', Validators.required],
    tenantSNo: ['', Validators.required],
    tenantId: [Number],
    paystubRecent: ['', Validators.required],
    applicantTypeId: [Number],
    propertyTypeId: ['', Validators.required],
    createdBy: ['', Validators.required],

    // }),
    incom_verification: this.fb.group({
      paystubRecent: ['', Validators.required], //pay stub
      paystubRecentMonthly: ['', Validators.required], //monthly
      yTD_Earnings: ['', Validators.required], //results
      secondPayStub: ['', Validators.required], //2nd stub
      bankStatementMonthly: ['', Validators.required], //monthly
      bankStatement: ['', Validators.required], //result
      xRent: ['', Validators.required], //x-rent
      incomeAdequate: [Boolean, Validators.required], //incomeAdequate
      applicantId: ['', Validators.required],
      tenantSNo: ['', Validators.required],
      tenantId: [Number],
      createdBy: ['', Validators.required],
    }),
    credit_summary: this.fb.group({
      creditLines: [Boolean, Validators.required],
      creditScore: ['', Validators.required],
      //creditScorePoints: [Number, Validators.required],
      creditScoreAvailable: [Boolean, Validators.required],
      // creditScoreAvailablePoints: ['',Validators.required],
      // accountPastDue60Days: ['',Validators.required],
      collectionAccounts: ['', Validators.required],
      // collectionAccountsPoints: ['',Validators.required],
      medicalCollections: ['', Validators.required],
      propertyRelatedHousingRecord: [Boolean, Validators.required],
      // propertyRelatedHousingRecordPoints: ['',Validators.required],
      bankruptcy: [0, Validators.required],
      bankRuptyActive: [Boolean, Validators.required],
      //bankRuptyActivePoints: ['', Validators.required],
      liensRepossessions: [Date, Validators.required],
      // liensRepossessionsPoints: ['',Validators.required],
      //evectionHistoryPoints: ['', Validators.required],
      evectionHistory: [null],
      class1Felonies: [Boolean, Validators.required],
      // class1FeloniesPoints: ['',Validators.required],
      class2Felonies: [Date, Validators.required],
      // class2FeloniesPoints : ['',Validators.required],
      class1Misdemeaners: [Date, Validators.required],
      // class1MisdemeanersPoints: ['',Validators.required],
      class2Misdemeaners: [Date, Validators.required],
      depositApproved: [Boolean, Validators.required],
      depositToHold: [''],
      applicantId: ['', Validators.required],
      tenantSNo: ['', Validators.required],
      tenantId: [Number],
      createdBy: ['', Validators.required],

    }),
    landlord_ref: this.fb.group({
      rentalReferance: [Boolean, Validators.required],
      lL1LandlordType: [Number, Validators.required],
      lL1ProperNotice: [Boolean, Validators.required],
      //lL1ProperNoticePoints: [0, Validators.required],
      lL1NSF: ['', Validators.required],
      //lL1NSFPoints: [0, Validators.required],
      lL1LatePayments: ['', Validators.required],
      //lL1LatePaymentsPoints: [0, Validators.required],
      lL1PaymentOrVacantNotices: ['', Validators.required],
      //lL1PaymentOrVacantNoticesPoints: [0, Validators.required],
      lL1TendayComplyNotice: ['', Validators.required],
      //lL1TendayComplyNoticePoints: [0, Validators.required],
      lL1HOAViolations: ['', Validators.required],
      //lL1HOAViolationsPoints: [0, Validators.required],
      lL1PropertyCleanliness: ['', Validators.required],
      //lL1PropertyCleanlinessPoints: [0, Validators.required],
      lL1Pets: [Boolean, Validators.required],
      //lL1PetsPoints: ['', Validators.required],
      lL1AdversePetReferance: [Boolean, Validators.required],
      //lL1AdversePetReferancePoints: [0, Validators.required],
      lL1Rerent: [Boolean, Validators.required],
      //lL1RerentPoints: [0, Validators.required],


      lL2LandlordType: [Number, Validators.required],
      lL2ProperNotice: [Boolean, Validators.required],
      //lL2ProperNoticePoints: ['', Validators.required],
      lL2NSF: ['', Validators.required],
      //lL2NSFPoints: ['', Validators.required],
      lL2LatePayments: ['', Validators.required],
      //L2LatePaymentsPoints: ['', Validators.required],
      lL2PaymentOrVacantNotices: ['', Validators.required],
      //lL2PaymentOrVacantNoticesPoints: ['', Validators.required],
      lL2TendayComplyNotice: ['', Validators.required],
      //lL2TendayComplyNoticePoints: ['', Validators.required],
      lL2HOAViolations: ['', Validators.required],
      //lL2HOAViolationsPoints: ['', Validators.required],
      lL2PropertyCleanliness: ['', Validators.required],
      //lL2PropertyCleanlinessPoints: ['', Validators.required],
      lL2Pets: [Boolean, Validators.required],
      //lL2PetsPoints: ['', Validators.required],
      lL2AdversePetReferance: [Boolean, Validators.required],
      //lL2AdversePetReferancePoints: ['', Validators.required],
      lL2Rerent: [Boolean, Validators.required],
      //lL2RerentPoints: ['', Validators.required],
      applicantId: ['', Validators.required],
      tenantSNo: ['', Validators.required],
      tenantId: [Number],
      createdBy: ['', Validators.required],

    }),
    rental_history: this.fb.group({
      rentalHistoryLength: [Boolean, Validators.required],
      applicantId: ['', Validators.required],
      tenantSNo: ['', Validators.required],
      tenantId: [Number],
      createdBy: ['', Validators.required],
    }),
    pets: this.fb.group({
      petApprovedLandlordReferance1: ['', Validators.required],
      petApprovedLandlordReferance2: ['', Validators.required],
      noOfCatsCompanion: [Boolean, Validators.required],
      noOfCatsCompanions: ['', Validators.required],
      noOfLargeDogsCompanion: [Boolean, Validators.required],
      noOfLargeDogsCompanions: ['', Validators.required],
      noOfSmallDogsCompanion: [Boolean, Validators.required],
      noOfSmallDogsCompanions: ['', Validators.required],
      applicantId: ['', Validators.required],
      tenantSNo: ['', Validators.required],
      tenantId: [Number],
      createdBy: ['', Validators.required],
    }),
    points_summary: this.fb.group({
      totalPoints: ['', Validators.required],
      finalApproval: [Boolean, Validators.required],
      totalDeposit: ['', Validators.required],
      depositToHoldPaid: ['', Validators.required],
      petDeposit: ['', Validators.required],
      additionalDeposit: ['', Validators.required],
      balanceDepositDue: ['', Validators.required],
      applicantId: ['', Validators.required],
      tenantSNo: ['', Validators.required],
      tenantId: [Number],
      createdBy: ['', Validators.required],
    }),
  })

  frmTenant5 = this.fb.group({
    // basicinfo: this.fb.group({      
    // firstCtrl:['',Validators.required],
    applicantName: ['', Validators.required],
    applicantType: ['', Validators.required],
    property: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zip: ['', Validators.required],
    monthlyRent: ['', Validators.required],
    section8Rent: ['', Validators.required],
    standardDepositProperty: ['', Validators.required],
    // propertyTypeId: ['', Validators.required],
    propertyType: ['', Validators.required],
    // applicantTypeId: ['', Validators.required],
    // ptype: ['', Validators.required],
    applicantId: ['', Validators.required],
    tenantSNo: ['', Validators.required],
    tenantId: [Number],
    paystubRecent: ['', Validators.required],
    applicantTypeId: ['', Validators.required],
    propertyTypeId: ['', Validators.required],
    createdBy: ['', Validators.required],

    // }),
    incom_verification: this.fb.group({
      paystubRecent: ['', Validators.required], //pay stub
      paystubRecentMonthly: ['', Validators.required], //monthly
      yTD_Earnings: ['', Validators.required], //results
      secondPayStub: ['', Validators.required], //2nd stub
      bankStatementMonthly: ['', Validators.required], //monthly
      bankStatement: ['', Validators.required], //result
      xRent: ['', Validators.required], //x-rent
      incomeAdequate: [Boolean, Validators.required], //incomeAdequate
      applicantId: ['', Validators.required],
      tenantSNo: ['', Validators.required],
      tenantId: [Number],
      createdBy: ['', Validators.required],
    }),
    credit_summary: this.fb.group({
      creditLines: [Boolean, Validators.required],
      creditScore: ['', Validators.required],
      //creditScorePoints: [Number, Validators.required],
      creditScoreAvailable: [Boolean, Validators.required],
      // creditScoreAvailablePoints: ['',Validators.required],
      // accountPastDue60Days: ['',Validators.required],
      collectionAccounts: ['', Validators.required],
      // collectionAccountsPoints: ['',Validators.required],
      medicalCollections: ['', Validators.required],
      propertyRelatedHousingRecord: [Boolean, Validators.required],
      // propertyRelatedHousingRecordPoints: ['',Validators.required],
      bankruptcy: [0, Validators.required],
      bankRuptyActive: [Boolean, Validators.required],
      //bankRuptyActivePoints: ['', Validators.required],
      liensRepossessions: [Date, Validators.required],
      // liensRepossessionsPoints: ['',Validators.required],
      //evectionHistoryPoints: ['', Validators.required],
      evectionHistory: [null],
      class1Felonies: [Boolean, Validators.required],
      // class1FeloniesPoints: ['',Validators.required],
      class2Felonies: [Date, Validators.required],
      // class2FeloniesPoints : ['',Validators.required],
      class1Misdemeaners: [Date, Validators.required],
      // class1MisdemeanersPoints: ['',Validators.required],
      class2Misdemeaners: [Date, Validators.required],
      depositApproved: [Boolean, Validators.required],
      depositToHold: [''],
      applicantId: ['', Validators.required],
      tenantSNo: ['', Validators.required],
      tenantId: [Number],
      createdBy: ['', Validators.required],

    }),
    landlord_ref: this.fb.group({
      rentalReferance: [Boolean, Validators.required],
      lL1LandlordType: [Number, Validators.required],
      lL1ProperNotice: [Boolean, Validators.required],
      //lL1ProperNoticePoints: [0, Validators.required],
      lL1NSF: ['', Validators.required],
      //lL1NSFPoints: [0, Validators.required],
      lL1LatePayments: ['', Validators.required],
      //lL1LatePaymentsPoints: [0, Validators.required],
      lL1PaymentOrVacantNotices: ['', Validators.required],
      //lL1PaymentOrVacantNoticesPoints: [0, Validators.required],
      lL1TendayComplyNotice: ['', Validators.required],
      //lL1TendayComplyNoticePoints: [0, Validators.required],
      lL1HOAViolations: ['', Validators.required],
      //lL1HOAViolationsPoints: [0, Validators.required],
      lL1PropertyCleanliness: ['', Validators.required],
      //lL1PropertyCleanlinessPoints: [0, Validators.required],
      lL1Pets: [Boolean, Validators.required],
      //lL1PetsPoints: ['', Validators.required],
      lL1AdversePetReferance: [Boolean, Validators.required],
      //lL1AdversePetReferancePoints: [0, Validators.required],
      lL1Rerent: [Boolean, Validators.required],
      //lL1RerentPoints: [0, Validators.required],


      lL2LandlordType: [Number, Validators.required],
      lL2ProperNotice: [Boolean, Validators.required],
      //lL2ProperNoticePoints: ['', Validators.required],
      lL2NSF: ['', Validators.required],
      //lL2NSFPoints: ['', Validators.required],
      lL2LatePayments: ['', Validators.required],
      //L2LatePaymentsPoints: ['', Validators.required],
      lL2PaymentOrVacantNotices: ['', Validators.required],
      //lL2PaymentOrVacantNoticesPoints: ['', Validators.required],
      lL2TendayComplyNotice: ['', Validators.required],
      //lL2TendayComplyNoticePoints: ['', Validators.required],
      lL2HOAViolations: ['', Validators.required],
      //lL2HOAViolationsPoints: ['', Validators.required],
      lL2PropertyCleanliness: ['', Validators.required],
      //lL2PropertyCleanlinessPoints: ['', Validators.required],
      lL2Pets: [Boolean, Validators.required],
      //lL2PetsPoints: ['', Validators.required],
      lL2AdversePetReferance: [Boolean, Validators.required],
      //lL2AdversePetReferancePoints: ['', Validators.required],
      lL2Rerent: [Boolean, Validators.required],
      //lL2RerentPoints: ['', Validators.required],
      applicantId: ['', Validators.required],
      tenantSNo: ['', Validators.required],
      tenantId: [Number],
      createdBy: ['', Validators.required],

    }),
    rental_history: this.fb.group({
      rentalHistoryLength: [Boolean, Validators.required],
      applicantId: ['', Validators.required],
      tenantSNo: ['', Validators.required],
      tenantId: [Number],
      createdBy: ['', Validators.required],
    }),
    pets: this.fb.group({
      petApprovedLandlordReferance1: ['', Validators.required],
      petApprovedLandlordReferance2: ['', Validators.required],
      noOfCatsCompanion: [Boolean, Validators.required],
      noOfCatsCompanions: ['', Validators.required],
      noOfLargeDogsCompanion: [Boolean, Validators.required],
      noOfLargeDogsCompanions: ['', Validators.required],
      noOfSmallDogsCompanion: [Boolean, Validators.required],
      noOfSmallDogsCompanions: ['', Validators.required],
      applicantId: ['', Validators.required],
      tenantSNo: ['', Validators.required],
      tenantId: [Number],
      createdBy: ['', Validators.required],
    }),
    points_summary: this.fb.group({
      totalPoints: ['', Validators.required],
      finalApproval: [Boolean, Validators.required],
      totalDeposit: ['', Validators.required],
      depositToHoldPaid: ['', Validators.required],
      petDeposit: ['', Validators.required],
      additionalDeposit: ['', Validators.required],
      balanceDepositDue: ['', Validators.required],
      applicantId: ['', Validators.required],
      tenantSNo: ['', Validators.required],
      tenantId: [Number],
      createdBy: ['', Validators.required],
    }),
  })




  done() {
    this.completed = true;
    this.state = 'done';
    console.log(this.frmPrimary.valid);
    console.log(this.frmTenant2.valid);
  }

  // onSubmit() {
  //   // alert("working")
  //   // console.log(this.firstCtrl.value," first tab form values");
  //   this._userservice.CreateApplicant(this.firstCtrl.value).subscribe((data)=>{
  //     console.log(data,"sending data to Create applications");

  //   })
  // }
  tabIndex = 0;
  onTabSelect(event: MatTabChangeEvent): void {

    this.tabIndex = event.index

    // Add your custom logic here
  }
  nextTab() {
    if (this.tabIndex < 6) {
      this.tabIndex++;
    }
  }
  prevTab() {
    if (this.tabIndex > 0) {
      this.tabIndex--;
    }
  }
  onSubmit() {
    // if (this.frmBasic.incovalid) { 
    const incomeVerificationData = this.frmPrimary.get('incom_verification')?.value;
    // }
  }
  goToNextStep() {
    this.stepper.next();
  }

  onPrimaryTenantSubmit1() {

  }
  onTenant2Submit() {

  }
  onTenantSubmit(tenantSNo: any) {
    
    if (tenantSNo == '1') {
      this.frmTenant = this.frmPrimary;
    }
    else if (tenantSNo == '2') {
      this.frmTenant = this.frmTenant2;
    }
    else if (tenantSNo == '3') {
      this.frmTenant = this.frmTenant3;
    }
    else if (tenantSNo == '4') {
      this.frmTenant = this.frmTenant4;
    }
    else if (tenantSNo == '5') {
      this.frmTenant = this.frmTenant3;
    }
    this.frmTenant.patchValue({
      tenantSNo: tenantSNo,
      createdBy: this.currentUser.id.toString(),
      applicantId: '0',
      incom_verification: {
        createdBy: this.currentUser.id.toString(),
        
      },
      credit_summary: {
        createdBy: this.currentUser.id.toString(),
        
      }
      ,
      landlord_ref: {
        createdBy: this.currentUser.id.toString(),
        
      }
      ,
      rental_history: {
        createdBy: this.currentUser.id.toString(),
       
      }
      ,
      pets: {
        createdBy: this.currentUser.id.toString(),
        
      }
      ,
      points_summary: {
        createdBy: this.currentUser.id.toString(),
        
      }
    })
    if (this.snapid) {
      this.frmTenant.patchValue({
        applicantId: this.snapid.toString(),
        incom_verification: {
          applicantId: this.snapid.toString(),
          tenantSNo: tenantSNo
        },
        credit_summary: {
          applicantId: this.snapid.toString(),
          tenantSNo: tenantSNo
        }
        ,
        landlord_ref: {
          applicantId: this.snapid.toString(),
          tenantSNo: tenantSNo
        }
        ,
        rental_history: {
          applicantId: this.snapid.toString(),
          tenantSNo: tenantSNo
        }
        ,
        pets: {
          applicantId: this.snapid.toString(),
          tenantSNo: tenantSNo
        }
        ,
        points_summary: {
          applicantId: this.snapid.toString(),
          tenantSNo: tenantSNo
        }
      })
    }

    // if (this.myForm.valid) {
    console.log(this.tabIndex, "tab index values");
    // Send data to the backend
    console.log(this.frmTenant.value, "primary post data console");
    if (this.tabIndex == 0) {
      // alert("tab1")
      console.log(this.tabIndex, "tab index values");
      this._userservice.CreateApplicant(this.frmTenant.value).subscribe(
        (data) => {
          console.log('Data sent to Create applications:', data);
          if (data.ApplicantId > 0) {
            this.applicantId = data.ApplicantId;
            this.tenantId = data.TenantId;
            this.frmTenant.patchValue({
              applicantId: this.snapid ? this.snapid : this.applicantId.toString(),
              tenantId: this.tenantId
            });
            this.frmTenant.patchValue({
              incom_verification: {
                applicantId: this.snapid ? this.snapid : this.applicantId.toString(),
                tenantSNo: tenantSNo,
                tenantId: this.tenantId
              },
              credit_summary: {
                applicantId: this.snapid ? this.snapid : this.applicantId.toString(),
                tenantSNo: tenantSNo,
                tenantId: this.tenantId
              }
              ,
              landlord_ref: {
                applicantId: this.snapid ? this.snapid : this.applicantId.toString(),
                tenantSNo: tenantSNo,
                tenantId: this.tenantId
              }
              ,
              rental_history: {
                applicantId: this.snapid ? this.snapid : this.applicantId.toString(),
                tenantSNo: tenantSNo,
                tenantId: this.tenantId
              }
              ,
              pets: {
                applicantId: this.snapid ? this.snapid : this.applicantId.toString(),
                tenantSNo: tenantSNo,
                tenantId: this.tenantId
              }
              ,
              points_summary: {
                applicantId: this.snapid ? this.snapid : this.applicantId.toString(),
                tenantSNo: tenantSNo,
                tenantId: this.tenantId
              }

            })


          }
          // Move to the next tab
          // Optionally, reset the form or perform other actions after moving to the next tab
          // this.firstCtrl.reset(); // Reset the form if needed
        },
        (error) => {
          console.error('Error creating applicant:', error);
          // Handle error response here
        }
      );
    }
    else if (this.tabIndex == 1) {

      this._userservice.CreateIncomeVerfication(this.frmTenant.value.incom_verification).subscribe(
        (data) => {

        },
        (error) => {
          console.error('Error creating income:', error);

        }
      );
    }
    else if (this.tabIndex == 2) {


      this._userservice.CreateCreditSummary(this.frmTenant.value.credit_summary).subscribe(
        (data) => {

        },
        (error) => {
          console.error('Error creating credit summary:', error);

        }
      );
    }

    else if (this.tabIndex == 3) {


      this._userservice.CreateLandLordReferences(this.frmTenant.value.landlord_ref).subscribe(
        (data) => {

        },
        (error) => {
          console.error('Error creating landlord reference:', error);
        }
      );
    }
    else if (this.tabIndex == 4) {


      this._userservice.createRentalHistory(this.frmTenant.value.rental_history).subscribe(
        (data) => {

        },
        (error) => {
          console.error('Error creating landlord reference:', error);
        }
      );
    }
    else if (this.tabIndex == 5) {


      this._userservice.CreatePets(this.frmTenant.value.pets).subscribe(
        (data) => {

        },
        (error) => {
          console.error('Error creating pets:', error);
        }
      );
    }
    else if (this.tabIndex == 6) {


      this._userservice.CreatePointsSummary(this.frmTenant.value.points_summary).subscribe(
        (data) => {

        },
        (error) => {
          console.error('Error creating points summary:', error);
        }
      );
    }
    this.tabIndex++;
    // }
  }

  onStepChange(event: StepperSelectionEvent): void {
     
    if (event.selectedIndex == 0 || event.selectedIndex == 0) {
      this.tenantSNO = 1;
    }
    else {
      this.tenantSNO = event.selectedIndex;
    }

    
    if (this.snapid) {
      this.getScroreSheetByApplicantId(this.snapid, this.tenantSNO.toString());
    }
    // Additional logic can be added here based on the step change
  }
  selectionChange(sNo:any) {
    
  }


  getdata() {
    //alert("edit-user compont")

    this._userservice.UpdateApplicant(this.snapid).subscribe((data) => {
      console.log(data, "getting data from primarytanent component");
      this.result = data
      console.log(this.result.data, "data primary tenant");

      this.frmPrimary.patchValue({
        // basicinfo: {
        applicantName: this.result.data.applicantName,
        applicantType: this.result.data.applicantType,
        property: this.result.data.property,
        city: this.result.data.city,
        state: this.result.data.state,
        zip: this.result.data.zip,
        monthlyRent: this.result.data.monthlyRent,
        section8Rent: this.result.data.section8Rent,
        standardDepositProperty: this.result.data.standardDepositProperty,
        // propertyTypeId: this.result.data.propertyTypeId,
        propertyType: this.result.data.propertyType,
        applicantId: this.result.data.id,
        //   // paystubRecent: this.result.data.paystubRecent,
        // paystubRecentMonthly:this.result.data.paystubRecentMonthly,
        // yTD_Earnings:this.result.data.yTD_Earnings,
        tenantSNo: "1",

        // },
      })
      localStorage.setItem('applicantId', this.result.data.id);
    })
  }

  getScroreSheetByApplicantId(snapid: any, sno: any) {
    
    this._userservice.GetScroreSheetByApplicantId(this.snapid, sno).subscribe((data) => {
      console.log(data, "getting data");
      console.log(data[0].applicantType, "applicant type");
      console.log(data[0].propertyType, "propertyType type");

      this.result = data
      if (sno == '1') {
        this.frmTenant = this.frmPrimary;
      }
      else if (sno == '2') {
        this.frmTenant = this.frmTenant2;
      }
      else if (sno == '3') {
        this.frmTenant = this.frmTenant3;
      }
      else if (sno == '4') {
        //this.frmTenant = this.frmTenant4;
      }
      else if (sno == '5') {
        //this.frmTenant = this.frmTenant3;
      }

      this.frmTenant.patchValue({
        // firstname: this.result[0].firstname,

        // firstname: this.result[0].firstname,
        tenantId: this.result[0].tenantId ,
        tenantSNo: sno,
        applicantName: this.result[0].applicantName,
        property: this.result[0].property,
        applicantTypeId: this.result[0].applicantTypeId,
        city: this.result[0].city,
        state: this.result[0].state,
        zip: this.result[0].zip,
        monthlyRent: this.result[0].monthlyRent,
        section8Rent: this.result[0].section8Rent,
        standardDepositProperty: this.result[0].standardDepositProperty,
        propertyTypeId: this.result[0].propertyTypeId,

        incom_verification: {
          paystubRecent: this.result[0].paystubRecent,
          paystubRecentMonthly: this.result[0].paystubRecentMonthly,
          yTD_Earnings: this.result[0].yTD_Earnings,
          secondPayStub: this.result[0].secondPayStub,
          bankStatementMonthly: this.result[0].bankStatementMonthly,
          bankStatement: this.result[0].bankStatement,
          xRent: this.result[0].xRent,
          incomeAdequate: this.result[0].incomeAdequate
        },
        credit_summary: {
          creditLines: this.result[0].creditLines,
          creditScore: this.result[0].creditScore,
          //creditScorePoints: this.result[0].creditScorePoints,
          creditScoreAvailable: this.result[0].creditScoreAvailable,
          medicalCollections: this.result[0].medicalCollections,
          //creditScoreAvailable: this.result[0].creditScoreAvailable,
          //creditScoreAvailable: this.result[0].creditScoreAvailable,


          //creditScorePoints: [Number, Validators.required],

          // creditScoreAvailablePoints: ['',Validators.required],
          // accountPastDue60Days: ['',Validators.required],
          collectionAccounts: this.result[0].collectionAccounts,
          // collectionAccountsPoints: ['',Validators.required],

          propertyRelatedHousingRecord: this.result[0].propertyRelatedHousingRecord,
          // propertyRelatedHousingRecordPoints: ['',Validators.required],
          bankRuptyActive: this.result[0].bankRuptyActive,
          // bankRuptyActivePoints: this.result[0].bankRuptyActivePoints,
          liensRepossessions: this.result[0].liensRepossessions,
          // liensRepossessionsPoints: ['',Validators.required],
          //evectionHistoryPoints: ['', Validators.required],

          evectionHistory: this.result[0]?.evectionHistory,
          class1Felonies: this.result[0].class1Felonies,
          // class1FeloniesPoints: ['',Validators.required],
          class2Felonies: this.result[0].class2Felonies,
          // class2FeloniesPoints : ['',Validators.required],
          class1Misdemeaners: this.result[0].class1Misdemeaners,
          // class1MisdemeanersPoints: ['',Validators.required],
          class2Misdemeaners: this.result[0].class2Misdemeaners,
          depositApproved: this.result[0].depositApproved,
          depositToHold: this.result[0].depositToHold,
          bankruptcy: this.result[0].bankruptcy,

          // ... add other properties
        },
        landlord_ref: {
          rentalReferance: this.result[0].rentalReferance,

          //lL1LandlordType: this.result[0].lL1LandlordType,
          lL1ProperNotice: this.result[0].lL1ProperNotice,
          //lL1ProperNoticePoints: this.result[0].lL1ProperNoticePoints,
          lL1NSF: this.result[0].lL1NSF,
          //lL1NSFPoints: this.result[0].lL1NSFPoints,
          lL1LatePayments: this.result[0].lL1LatePayments,
          //lL1LatePaymentsPoints: this.result[0].lL1LatePaymentsPoints,
          lL1PaymentOrVacantNotices: this.result[0].lL1PaymentOrVacantNotices,
          //lL1PaymentOrVacantNoticesPoints: this.result[0].lL1PaymentOrVacantNoticesPoints,
          lL1TendayComplyNotice: this.result[0].lL1TendayComplyNotice,
          //lL1TendayComplyNoticePoints: this.result[0].lL1TendayComplyNoticePoints,
          lL1HOAViolations: this.result[0].lL1HOAViolations,
          //lL1HOAViolationsPoints: this.result[0].lL1HOAViolationsPoints,
          lL1PropertyCleanliness: this.result[0].lL1PropertyCleanliness,
          //lL1PropertyCleanlinessPoints: this.result[0].lL1PropertyCleanlinessPoints,
          lL1Pets: this.result[0].lL1Pets,
          //lL1PetsPoints: this.result[0].lL1PetsPoints,
          lL1AdversePetReferance: this.result[0].lL1AdversePetReferance,
          //lL1AdversePetReferancePoints: this.result[0].lL1AdversePetReferancePoints,
          lL1Rerent: this.result[0].lL1Rerent,
          //lL1RerentPoints: this.result[0].lL1RerentPoints,


          //lL2LandlordType: this.result[0].rentalReferance,
          lL2ProperNotice: this.result[0].lL2ProperNotice,
          //lL2ProperNoticePoints: this.result[0].lL2ProperNoticePoints,
          lL2NSF: this.result[0].lL2NSF,
          //lL2NSFPoints: this.result[0].lL2NSFPoints,
          lL2LatePayments: this.result[0].lL2LatePayments,
          //lL2LatePaymentsPoints: this.result[0].lL2LatePaymentsPoints,
          lL2PaymentOrVacantNotices: this.result[0].lL2PaymentOrVacantNotices,
          //lL2PaymentOrVacantNoticesPoints: this.result[0].lL2PaymentOrVacantNoticesPoints,
          lL2TendayComplyNotice: this.result[0].lL2TendayComplyNotice,
          //lL2TendayComplyNoticePoints: this.result[0].lL2TendayComplyNoticePoints,
          lL2HOAViolations: this.result[0].lL2HOAViolations,
          //lL2HOAViolationsPoints: this.result[0].lL2HOAViolationsPoints,
          lL2PropertyCleanliness: this.result[0].lL2PropertyCleanliness,
          //lL2PropertyCleanlinessPoints: this.result[0].lL2PropertyCleanlinessPoints,
          lL2Pets: this.result[0].lL2Pets,
          //lL2PetsPoints: this.result[0].lL2PetsPoints,
          lL2AdversePetReferance: this.result[0].lL2AdversePetReferance,
          //lL2AdversePetReferancePoints: this.result[0].lL2AdversePetReferancePoints,
          lL2Rerent: this.result[0].lL2Rerent,
          //lL2RerentPoints: this.result[0].lL2RerentPoints,
          // ... add other properties
        },
        rental_history: {
          rentalHistoryLength: this.result[0].rentalHistoryLength,
        },
        pets: {
          petApprovedLandlordReferance1: this.result[0].petApprovedLandlordReferance1,
          petApprovedLandlordReferance2: this.result[0].petApprovedLandlordReferance2,


          noOfCatsCompanion: this.result[0].noOfCatsCompanion,
          noOfCatsCompanions: this.result[0].noOfCatsCompanions,
          noOfLargeDogsCompanion: this.result[0].noOfLargeDogsCompanion,
          noOfLargeDogsCompanions: this.result[0].noOfLargeDogsCompanions,
          noOfSmallDogsCompanion: this.result[0].noOfSmallDogsCompanion,
          noOfSmallDogsCompanions: this.result[0].noOfSmallDogsCompanions,
          // ... add other properties
        },
        points_summary: {
          totalPoints: this.result[0].totalPoints,
          finalApproval: this.result[0].finalApproval,
          totalDeposit: this.result[0].totalDeposit,
          depositToHoldPaid: this.result[0].depositToHoldpaid,
          petDeposit: this.result[0].petDeposit,
          additionalDeposit: this.result[0].additionalDeposit,
          balanceDepositDue: this.result[0].balanceDepositDue,
        },
      })


      // modifiedBy: this.currentUser.id
    })

  }
  //this.frmPrimary.patchValue({
  //  // firstname: this.result[0].firstname,

  //  // firstname: this.result[0].firstname,
  //  tenantId: snapid,
  //  tenantSNo: sno,
  //  applicantName: this.result[0].applicantName,
  //  property: this.result[0].property,
  //  applicantTypeId: this.result[0].applicantTypeId,
  //  city: this.result[0].city,
  //  state: this.result[0].state,
  //  zip: this.result[0].zip,
  //  monthlyRent: this.result[0].monthlyRent,
  //  section8Rent: this.result[0].section8Rent,
  //  standardDepositProperty: this.result[0].standardDepositProperty,
  //  propertyTypeId: this.result[0].propertyTypeId,

  //  incom_verification: {
  //    paystubRecent: this.result[0].paystubRecent,
  //    paystubRecentMonthly: this.result[0].paystubRecentMonthly,
  //    yTD_Earnings: this.result[0].yTD_Earnings,
  //    secondPayStub: this.result[0].secondPayStub,
  //    bankStatementMonthly: this.result[0].bankStatementMonthly,
  //    bankStatement: this.result[0].bankStatement,
  //    xRent: this.result[0].xRent,
  //    incomeAdequate: this.result[0].incomeAdequate
  //  },
  //  credit_summary: {
  //    creditLines: this.result[0].creditLines,
  //    creditScore: this.result[0].creditScore,
  //    //creditScorePoints: this.result[0].creditScorePoints,
  //    creditScoreAvailable: this.result[0].creditScoreAvailable,
  //    medicalCollections: this.result[0].medicalCollections,
  //    //creditScoreAvailable: this.result[0].creditScoreAvailable,
  //    //creditScoreAvailable: this.result[0].creditScoreAvailable,


  //    //creditScorePoints: [Number, Validators.required],

  //    // creditScoreAvailablePoints: ['',Validators.required],
  //    // accountPastDue60Days: ['',Validators.required],
  //    collectionAccounts: this.result[0].collectionAccounts,
  //    // collectionAccountsPoints: ['',Validators.required],

  //    propertyRelatedHousingRecord: this.result[0].propertyRelatedHousingRecord,
  //    // propertyRelatedHousingRecordPoints: ['',Validators.required],
  //    bankRuptyActive: this.result[0].bankRuptyActive,
  //    // bankRuptyActivePoints: this.result[0].bankRuptyActivePoints,
  //    liensRepossessions: this.result[0].liensRepossessions,
  //    // liensRepossessionsPoints: ['',Validators.required],
  //    //evectionHistoryPoints: ['', Validators.required],

  //    evectionHistory: this.result[0]?.evectionHistory,
  //    class1Felonies: this.result[0].class1Felonies,
  //    // class1FeloniesPoints: ['',Validators.required],
  //    class2Felonies: this.result[0].class2Felonies,
  //    // class2FeloniesPoints : ['',Validators.required],
  //    class1Misdemeaners: this.result[0].class1Misdemeaners,
  //    // class1MisdemeanersPoints: ['',Validators.required],
  //    class2Misdemeaners: this.result[0].class2Misdemeaners,
  //    depositApproved: this.result[0].depositApproved,
  //    depositToHold: this.result[0].depositToHold,
  //    bankruptcy: this.result[0].bankruptcy,

  //    // ... add other properties
  //  },
  //  landlord_ref: {
  //    rentalReferance: this.result[0].rentalReferance,

  //    //lL1LandlordType: this.result[0].lL1LandlordType,
  //    lL1ProperNotice: this.result[0].lL1ProperNotice,
  //    //lL1ProperNoticePoints: this.result[0].lL1ProperNoticePoints,
  //    lL1NSF: this.result[0].lL1NSF,
  //    //lL1NSFPoints: this.result[0].lL1NSFPoints,
  //    lL1LatePayments: this.result[0].lL1LatePayments,
  //    //lL1LatePaymentsPoints: this.result[0].lL1LatePaymentsPoints,
  //    lL1PaymentOrVacantNotices: this.result[0].lL1PaymentOrVacantNotices,
  //    //lL1PaymentOrVacantNoticesPoints: this.result[0].lL1PaymentOrVacantNoticesPoints,
  //    lL1TendayComplyNotice: this.result[0].lL1TendayComplyNotice,
  //    //lL1TendayComplyNoticePoints: this.result[0].lL1TendayComplyNoticePoints,
  //    lL1HOAViolations: this.result[0].lL1HOAViolations,
  //    //lL1HOAViolationsPoints: this.result[0].lL1HOAViolationsPoints,
  //    lL1PropertyCleanliness: this.result[0].lL1PropertyCleanliness,
  //    //lL1PropertyCleanlinessPoints: this.result[0].lL1PropertyCleanlinessPoints,
  //    lL1Pets: this.result[0].lL1Pets,
  //    //lL1PetsPoints: this.result[0].lL1PetsPoints,
  //    lL1AdversePetReferance: this.result[0].lL1AdversePetReferance,
  //    //lL1AdversePetReferancePoints: this.result[0].lL1AdversePetReferancePoints,
  //    lL1Rerent: this.result[0].lL1Rerent,
  //    //lL1RerentPoints: this.result[0].lL1RerentPoints,


  //    //lL2LandlordType: this.result[0].rentalReferance,
  //    lL2ProperNotice: this.result[0].lL2ProperNotice,
  //    //lL2ProperNoticePoints: this.result[0].lL2ProperNoticePoints,
  //    lL2NSF: this.result[0].lL2NSF,
  //    //lL2NSFPoints: this.result[0].lL2NSFPoints,
  //    lL2LatePayments: this.result[0].lL2LatePayments,
  //    //lL2LatePaymentsPoints: this.result[0].lL2LatePaymentsPoints,
  //    lL2PaymentOrVacantNotices: this.result[0].lL2PaymentOrVacantNotices,
  //    //lL2PaymentOrVacantNoticesPoints: this.result[0].lL2PaymentOrVacantNoticesPoints,
  //    lL2TendayComplyNotice: this.result[0].lL2TendayComplyNotice,
  //    //lL2TendayComplyNoticePoints: this.result[0].lL2TendayComplyNoticePoints,
  //    lL2HOAViolations: this.result[0].lL2HOAViolations,
  //    //lL2HOAViolationsPoints: this.result[0].lL2HOAViolationsPoints,
  //    lL2PropertyCleanliness: this.result[0].lL2PropertyCleanliness,
  //    //lL2PropertyCleanlinessPoints: this.result[0].lL2PropertyCleanlinessPoints,
  //    lL2Pets: this.result[0].lL2Pets,
  //    //lL2PetsPoints: this.result[0].lL2PetsPoints,
  //    lL2AdversePetReferance: this.result[0].lL2AdversePetReferance,
  //    //lL2AdversePetReferancePoints: this.result[0].lL2AdversePetReferancePoints,
  //    lL2Rerent: this.result[0].lL2Rerent,
  //    //lL2RerentPoints: this.result[0].lL2RerentPoints,
  //    // ... add other properties
  //  },
  //  rental_history: {
  //    rentalHistoryLength: this.result[0].rentalHistoryLength,
  //  },
  //  pets: {
  //    petApprovedLandlordReferance1: this.result[0].petApprovedLandlordReferance1,
  //    petApprovedLandlordReferance2: this.result[0].petApprovedLandlordReferance2,


  //    noOfCatsCompanion: this.result[0].noOfCatsCompanion,
  //    noOfCatsCompanions: this.result[0].noOfCatsCompanions,
  //    noOfLargeDogsCompanion: this.result[0].noOfLargeDogsCompanion,
  //    noOfLargeDogsCompanions: this.result[0].noOfLargeDogsCompanions,
  //    noOfSmallDogsCompanion: this.result[0].noOfSmallDogsCompanion,
  //    noOfSmallDogsCompanions: this.result[0].noOfSmallDogsCompanions,
  //    // ... add other properties
  //  },
  //  points_summary: {
  //    totalPoints: this.result[0].totalPoints,
  //    finalApproval: this.result[0].finalApproval,
  //    totalDeposit: this.result[0].totalDeposit,
  //    depositToHoldPaid: this.result[0].depositToHoldpaid,
  //    petDeposit: this.result[0].petDeposit,
  //    additionalDeposit: this.result[0].additionalDeposit,
  //    balanceDepositDue: this.result[0].balanceDepositDue,
  //  },
  //})


  //    // modifiedBy: this.currentUser.id
  //  })

  //}

  // updatedata() {
  //   // alert("bye")
  //   const payload = {
  //     'id': this.snapid,
  //     'fullname': this.UpdateUser.value.fullname,
  //     'role': this.UpdateUser.value.role,
  //     'username': this.UpdateUser.value.username,
  //     'password': this.UpdateUser.value.password,
  //     'address': this.UpdateUser.value.address,
  //     'email': this.UpdateUser.value.email,
  //     'status': this.UpdateUser.value.status,
  //     'phone': this.UpdateUser.value.phone
  //   }
  //   this._http.UpdateUser1(payload).subscribe((res: any) => {
  //     console.log(res, "this is updateddddd data");

  //   })
  // }
  // onSubmit(){
  // //   // console.log(this.createUser.value,"post data");
  //           this._http.createUser(this.createApplicant.value).subscribe((res: any)=>{
  //     console.log(res,"posted data");

  //   })

  // }
  stepColorClass(step: CdkStep | undefined): string {
    if (step) {
      if (step === this.stepper?.selected) {
        return 'active-step'; // Apply this class to the selected step
      } else if (step.completed) {
        return 'completed-step'; // Apply this class to completed steps
      }
    }
    return 'default-step'; // Apply this class to other steps
  }
  previousTab() {
    if (this.tabGroup && this.tabGroup.selectedIndex !== null) {
      const currentIndex = this.tabGroup.selectedIndex;
      const tabCount = this.tabGroup._tabs.length;
      // Move to the previous tab in a circular manner
      const previousIndex = (currentIndex - 1 + tabCount) % tabCount;

      this.tabGroup.selectedIndex = previousIndex;
    }
  }

  nextStep() {
    if (this.tabGroup && this.tabGroup.selectedIndex !== null) {
      const currentIndex = this.tabGroup.selectedIndex;
      const tabCount = this.tabGroup._tabs.length;
      // Move to the next tab in a circular manner
      const nextIndex = (currentIndex + 1) % tabCount;

      this.tabGroup.selectedIndex = nextIndex;
    }
  }
  // changeStep(index: number) {
  //   this.currentStep = index;
  // }
  // nextStep() {
  //   this.currentStep++;
  // }
}
