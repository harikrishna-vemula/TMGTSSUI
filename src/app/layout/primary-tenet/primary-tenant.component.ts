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
    // appilcantId: [0, Validators.required],
    applicantName: ['', Validators.required],
    applicantType: ['',],
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
    applicantId: [''],
    tenantSNo: ['', Validators.required],
    tenantId: [Number],
    paystubRecent: ['', Validators.required],
    applicantTypeId: [Number,Validators.required],
    propertyTypeId: ['', Validators.required],
    applicationStatusId: ['', Validators.required],
    createdBy: ['', Validators.required],
    // }),
    incom_verification: this.fb.group({
      paystubRecent: [Number,  ], //pay stub
      paystubRecentMonthly: [Number,  ], //monthly
      ytD_Earnings: [Number,  ], //results
      secondPayStub: ['',  ], //2nd stub
      bankStatementMonthly: ['',  ], //monthly
      bankStatement: ['',  ], //result
      xRent: ['',  ], //x-rent
      incomeAdequate: [Boolean,  ], //incomeAdequate
      applicantId: ['',  ],
      tenantSNo: ['',  ],
      tenantId: [Number],
      createdBy: ['',  ],
    }),
    credit_summary: this.fb.group({
      creditLines: [Boolean,  ],
      creditScore: [Number],
      //creditScorePoints: [Number,  ],
      creditScoreAvailable: [Boolean,  ],
      // creditScoreAvailablePoints: ['', ],
      // accountPastDue60Days: ['', ],
      collectionAccounts: [Number],
      // collectionAccountsPoints: ['', ],
      medicalCollections: ['',  ],
      propertyRelatedHousingRecord: [Boolean,  ],
      // propertyRelatedHousingRecordPoints: ['', ],
      bankruptcy: [Number],
      bankRuptyActive: [Boolean,  ],
      //bankRuptyActivePoints: ['',  ],
      liensRepossessions: [Date,  ],
      // liensRepossessionsPoints: ['', ],
      //evectionHistoryPoints: ['',  ],
      evectionHistory: [null],
      class1Felonies: [Boolean,  ],
      // class1FeloniesPoints: ['', ],
      class2Felonies: [Date,  ],
      // class2FeloniesPoints : ['', ],
      class1Misdemeaners: [Date,  ],
      // class1MisdemeanersPoints: ['', ],
      class2Misdemeaners: [Date,  ],
      depositApproved: [Boolean,  ],
      depositToHold: [''],
      applicantId: ['',  ],
      tenantSNo: ['',  ],
      tenantId: [Number],
      createdBy: ['',  ],
    }),
    landlord_ref: this.fb.group({
      rentalReferance: [Boolean,  ],
      lL1LandlordType: [Number,  ],
      lL1ProperNotice: [Boolean,  ],
      //lL1ProperNoticePoints: [0,  ],
      lL1NSF: ['',  ],
      //lL1NSFPoints: [0,  ],
      lL1LatePayments: ['',  ],
      //lL1LatePaymentsPoints: [0,  ],
      lL1PaymentOrVacantNotices: ['',  ],
      //lL1PaymentOrVacantNoticesPoints: [0,  ],
      lL1TendayComplyNotice: ['',  ],
      //lL1TendayComplyNoticePoints: [0,  ],
      lL1HOAViolations: ['',  ],
      //lL1HOAViolationsPoints: [0,  ],
      lL1PropertyCleanliness: ['',  ],
      //lL1PropertyCleanlinessPoints: [0,  ],
      lL1Pets: [Boolean,  ],
      //lL1PetsPoints: ['',  ],
      lL1AdversePetReferance: [Boolean,  ],
      //lL1AdversePetReferancePoints: [0,  ],
      lL1Rerent: [Boolean,  ],
      //lL1RerentPoints: [0,  ],


      lL2LandlordType: [Number,  ],
      lL2ProperNotice: [Boolean,  ],
      //lL2ProperNoticePoints: ['',  ],
      lL2NSF: ['',  ],
      //lL2NSFPoints: ['',  ],
      lL2LatePayments: ['',  ],
      //L2LatePaymentsPoints: ['',  ],
      lL2PaymentOrVacantNotices: ['',  ],
      //lL2PaymentOrVacantNoticesPoints: ['',  ],
      lL2TendayComplyNotice: ['',  ],
      //lL2TendayComplyNoticePoints: ['',  ],
      lL2HOAViolations: ['',  ],
      //lL2HOAViolationsPoints: ['',  ],
      lL2PropertyCleanliness: ['',  ],
      //lL2PropertyCleanlinessPoints: ['',  ],
      lL2Pets: [Boolean,  ],
      //lL2PetsPoints: ['',  ],
      lL2AdversePetReferance: [Boolean,  ],
      //lL2AdversePetReferancePoints: ['',  ],
      lL2Rerent: [Boolean,  ],
      //lL2RerentPoints: ['',  ],
      applicantId: ['',  ],
      tenantSNo: ['',  ],
      tenantId: [Number],
      createdBy: ['',  ],
    }),
    rental_history: this.fb.group({
      rentalHistoryLength: [Boolean,  ],
      applicantId: ['',  ],
      tenantSNo: ['',  ],
      tenantId: [Number],
      createdBy: ['',  ],
    }),
    pets: this.fb.group({
      petApprovedLandlordReferance1: ['',  ],
      petApprovedLandlordReferance2: ['',  ],
      noOfCatsCompanion: [Boolean,  ],
      noOfCatsCompanions: [Number],
      noOfLargeDogsCompanion: [Boolean,  ],
      noOfLargeDogsCompanions: [Number],
      noOfSmallDogsCompanion: [Boolean,  ],
      noOfSmallDogsCompanions: [Number],
      applicantId: ['',  ],
      tenantSNo: ['',  ],
      tenantId: [Number],
      createdBy: ['',  ],
    }),
    points_summary: this.fb.group({
      totalPoints: ['',  ],
      finalApproval: [Boolean,  ],
      totalDeposit: ['',  ],
      depositToHoldPaid: ['',  ],
      petDeposit: ['',  ],
      additionalDeposit: ['',  ],
      balanceDepositDue: ['',  ],
      applicantId: ['',  ],
      tenantSNo: ['',  ],
      tenantId: [Number],
      createdBy: ['',  ],
    }),
  })

  //Tenant 2 Section stats here 
  frmTenant2 = this.fb.group({
    // basicinfo: this.fb.group({      
    // firstCtrl:['', ],
    applicantName: ['',  ],
    applicantType: [''],
    property: ['',  ],
    city: ['',  ],
    state: ['',  ],
    zip: ['',  ],
    monthlyRent: ['',  ],
    section8Rent: ['',  ],
    standardDepositProperty: ['',  ],
    // propertyTypeId: ['',  ],
    propertyType: ['',  ],
    // applicantTypeId: ['',  ],
    // ptype: ['',  ],
    applicantId: ['',  ],
    tenantSNo: ['',  ],
    tenantId: [Number],
    paystubRecent: ['',  ],
    applicantTypeId: [Number],
    propertyTypeId: ['',  ],
    createdBy: ['',  ],

    // }),
    incom_verification: this.fb.group({
      paystubRecent: ['',  ], //pay stub
      paystubRecentMonthly: ['',  ], //monthly
      ytD_Earnings: ['',  ], //results
      secondPayStub: ['',  ], //2nd stub
      bankStatementMonthly: ['',  ], //monthly
      bankStatement: ['',  ], //result
      xRent: ['',  ], //x-rent
      incomeAdequate: [Boolean,  ], //incomeAdequate
      applicantId: ['',  ],
      tenantSNo: ['',  ],
      tenantId: [Number],
      createdBy: ['',  ],
    }),
    credit_summary: this.fb.group({
      creditLines: [Boolean,  ],
      creditScore: ['',  ],
      //creditScorePoints: [Number,  ],
      creditScoreAvailable: [Boolean,  ],
      // creditScoreAvailablePoints: ['', ],
      // accountPastDue60Days: ['', ],
      collectionAccounts: ['',  ],
      // collectionAccountsPoints: ['', ],
      medicalCollections: ['',  ],
      propertyRelatedHousingRecord: [Boolean,  ],
      // propertyRelatedHousingRecordPoints: ['', ],
      bankruptcy: [0,  ],
      bankRuptyActive: [Boolean,  ],
      //bankRuptyActivePoints: ['',  ],
      liensRepossessions: [Date,  ],
      // liensRepossessionsPoints: ['', ],
      //evectionHistoryPoints: ['',  ],
      evectionHistory: [null],
      class1Felonies: [Boolean,  ],
      // class1FeloniesPoints: ['', ],
      class2Felonies: [Date,  ],
      // class2FeloniesPoints : ['', ],
      class1Misdemeaners: [Date,  ],
      // class1MisdemeanersPoints: ['', ],
      class2Misdemeaners: [Date,  ],
      depositApproved: [Boolean,  ],
      depositToHold: [''],
      applicantId: ['',  ],
      tenantSNo: ['',  ],
      tenantId: [Number],
      createdBy: ['',  ],

    }),
    landlord_ref: this.fb.group({
      rentalReferance: [Boolean,  ],
      lL1LandlordType: [Number,  ],
      lL1ProperNotice: [Boolean,  ],
      //lL1ProperNoticePoints: [0,  ],
      lL1NSF: ['',  ],
      //lL1NSFPoints: [0,  ],
      lL1LatePayments: ['',  ],
      //lL1LatePaymentsPoints: [0,  ],
      lL1PaymentOrVacantNotices: ['',  ],
      //lL1PaymentOrVacantNoticesPoints: [0,  ],
      lL1TendayComplyNotice: ['',  ],
      //lL1TendayComplyNoticePoints: [0,  ],
      lL1HOAViolations: ['',  ],
      //lL1HOAViolationsPoints: [0,  ],
      lL1PropertyCleanliness: ['',  ],
      //lL1PropertyCleanlinessPoints: [0,  ],
      lL1Pets: [Boolean,  ],
      //lL1PetsPoints: ['',  ],
      lL1AdversePetReferance: [Boolean,  ],
      //lL1AdversePetReferancePoints: [0,  ],
      lL1Rerent: [Boolean,  ],
      //lL1RerentPoints: [0,  ],


      lL2LandlordType: [Number,  ],
      lL2ProperNotice: [Boolean,  ],
      //lL2ProperNoticePoints: ['',  ],
      lL2NSF: ['',  ],
      //lL2NSFPoints: ['',  ],
      lL2LatePayments: ['',  ],
      //L2LatePaymentsPoints: ['',  ],
      lL2PaymentOrVacantNotices: ['',  ],
      //lL2PaymentOrVacantNoticesPoints: ['',  ],
      lL2TendayComplyNotice: ['',  ],
      //lL2TendayComplyNoticePoints: ['',  ],
      lL2HOAViolations: ['',  ],
      //lL2HOAViolationsPoints: ['',  ],
      lL2PropertyCleanliness: ['',  ],
      //lL2PropertyCleanlinessPoints: ['',  ],
      lL2Pets: [Boolean,  ],
      //lL2PetsPoints: ['',  ],
      lL2AdversePetReferance: [Boolean,  ],
      //lL2AdversePetReferancePoints: ['',  ],
      lL2Rerent: [Boolean,  ],
      //lL2RerentPoints: ['',  ],
      applicantId: ['',  ],
      tenantSNo: ['',  ],
      tenantId: [Number],
      createdBy: ['',  ],

    }),
    rental_history: this.fb.group({
      rentalHistoryLength: [Boolean,  ],
      applicantId: ['',  ],
      tenantSNo: ['',  ],
      tenantId: [Number],
      createdBy: ['',  ],
    }),
    pets: this.fb.group({
      petApprovedLandlordReferance1: ['',  ],
      petApprovedLandlordReferance2: ['',  ],
      noOfCatsCompanion: [Boolean,  ],
      noOfCatsCompanions: ['',  ],
      noOfLargeDogsCompanion: [Boolean,  ],
      noOfLargeDogsCompanions: ['',  ],
      noOfSmallDogsCompanion: [Boolean,  ],
      noOfSmallDogsCompanions: ['',  ],
      applicantId: ['',  ],
      tenantSNo: ['',  ],
      tenantId: [Number],
      createdBy: ['',  ],
    }),
    points_summary: this.fb.group({
      totalPoints: ['',  ],
      finalApproval: [Boolean,  ],
      // totalDeposit: ['',  ],
      // depositToHoldPaid: ['',  ],
      petDeposit: ['',  ],
      additionalDeposit: ['',  ],
      balanceDepositDue: ['',  ],
      applicantId: ['',  ],
      tenantSNo: ['',  ],
      tenantId: [Number],
      createdBy: ['',  ],
    }),
  })

// Tenant 3 section starts here 
  frmTenant3 = this.fb.group({
    // basicinfo: this.fb.group({      
    // firstCtrl:['', ],
    applicantName: ['',  ],
    applicantType: [''],
    property: ['',  ],
    city: ['',  ],
    state: ['',  ],
    zip: ['',  ],
    monthlyRent: ['',  ],
    section8Rent: ['',  ],
    standardDepositProperty: ['',  ],
    // propertyTypeId: ['',  ],
    propertyType: ['',  ],
    // applicantTypeId: ['',  ],
    // ptype: ['',  ],
    applicantId: ['',  ],
    tenantSNo: ['',  ],
    tenantId: [Number],
    paystubRecent: ['',  ],
    applicantTypeId: [Number],
    propertyTypeId: ['',  ],
    createdBy: ['',  ],

    // }),
    incom_verification: this.fb.group({
      paystubRecent: ['',  ], //pay stub
      paystubRecentMonthly: ['',  ], //monthly
      ytD_Earnings: ['',  ], //results
      secondPayStub: ['',  ], //2nd stub
      bankStatementMonthly: ['',  ], //monthly
      bankStatement: ['',  ], //result
      xRent: ['',  ], //x-rent
      incomeAdequate: [Boolean,  ], //incomeAdequate
      applicantId: ['',  ],
      tenantSNo: ['',  ],
      tenantId: [Number],
      createdBy: ['',  ],
    }),
    credit_summary: this.fb.group({
      creditLines: [Boolean,  ],
      creditScore: ['',  ],
      //creditScorePoints: [Number,  ],
      creditScoreAvailable: [Boolean,  ],
      // creditScoreAvailablePoints: ['', ],
      // accountPastDue60Days: ['', ],
      collectionAccounts: ['',  ],
      // collectionAccountsPoints: ['', ],
      medicalCollections: ['',  ],
      propertyRelatedHousingRecord: [Boolean,  ],
      // propertyRelatedHousingRecordPoints: ['', ],
      bankruptcy: [0,  ],
      bankRuptyActive: [Boolean,  ],
      //bankRuptyActivePoints: ['',  ],
      liensRepossessions: [Date,  ],
      // liensRepossessionsPoints: ['', ],
      //evectionHistoryPoints: ['',  ],
      evectionHistory: [null],
      class1Felonies: [Boolean,  ],
      // class1FeloniesPoints: ['', ],
      class2Felonies: [Date,  ],
      // class2FeloniesPoints : ['', ],
      class1Misdemeaners: [Date,  ],
      // class1MisdemeanersPoints: ['', ],
      class2Misdemeaners: [Date,  ],
      depositApproved: [Boolean,  ],
      depositToHold: [''],
      applicantId: ['',  ],
      tenantSNo: ['',  ],
      tenantId: [Number],
      createdBy: ['',  ],

    }),
    landlord_ref: this.fb.group({
      rentalReferance: [Boolean,  ],
      lL1LandlordType: [Number,  ],
      lL1ProperNotice: [Boolean,  ],
      //lL1ProperNoticePoints: [0,  ],
      lL1NSF: ['',  ],
      //lL1NSFPoints: [0,  ],
      lL1LatePayments: ['',  ],
      //lL1LatePaymentsPoints: [0,  ],
      lL1PaymentOrVacantNotices: ['',  ],
      //lL1PaymentOrVacantNoticesPoints: [0,  ],
      lL1TendayComplyNotice: ['',  ],
      //lL1TendayComplyNoticePoints: [0,  ],
      lL1HOAViolations: ['',  ],
      //lL1HOAViolationsPoints: [0,  ],
      lL1PropertyCleanliness: ['',  ],
      //lL1PropertyCleanlinessPoints: [0,  ],
      lL1Pets: [Boolean,  ],
      //lL1PetsPoints: ['',  ],
      lL1AdversePetReferance: [Boolean,  ],
      //lL1AdversePetReferancePoints: [0,  ],
      lL1Rerent: [Boolean,  ],
      //lL1RerentPoints: [0,  ],


      lL2LandlordType: [Number,  ],
      lL2ProperNotice: [Boolean,  ],
      //lL2ProperNoticePoints: ['',  ],
      lL2NSF: ['',  ],
      //lL2NSFPoints: ['',  ],
      lL2LatePayments: ['',  ],
      //L2LatePaymentsPoints: ['',  ],
      lL2PaymentOrVacantNotices: ['',  ],
      //lL2PaymentOrVacantNoticesPoints: ['',  ],
      lL2TendayComplyNotice: ['',  ],
      //lL2TendayComplyNoticePoints: ['',  ],
      lL2HOAViolations: ['',  ],
      //lL2HOAViolationsPoints: ['',  ],
      lL2PropertyCleanliness: ['',  ],
      //lL2PropertyCleanlinessPoints: ['',  ],
      lL2Pets: [Boolean,  ],
      //lL2PetsPoints: ['',  ],
      lL2AdversePetReferance: [Boolean,  ],
      //lL2AdversePetReferancePoints: ['',  ],
      lL2Rerent: [Boolean,  ],
      //lL2RerentPoints: ['',  ],
      applicantId: ['',  ],
      tenantSNo: ['',  ],
      tenantId: [Number],
      createdBy: ['',  ],

    }),
    rental_history: this.fb.group({
      rentalHistoryLength: [Boolean,  ],
      applicantId: ['',  ],
      tenantSNo: ['',  ],
      tenantId: [Number],
      createdBy: ['',  ],
    }),
    pets: this.fb.group({
      petApprovedLandlordReferance1: ['',  ],
      petApprovedLandlordReferance2: ['',  ],
      noOfCatsCompanion: [Boolean,  ],
      noOfCatsCompanions: ['',  ],
      noOfLargeDogsCompanion: [Boolean,  ],
      noOfLargeDogsCompanions: ['',  ],
      noOfSmallDogsCompanion: [Boolean,  ],
      noOfSmallDogsCompanions: ['',  ],
      applicantId: ['',  ],
      tenantSNo: ['',  ],
      tenantId: [Number],
      createdBy: ['',  ],
    }),
    points_summary: this.fb.group({
      totalPoints: ['',  ],
      finalApproval: [Boolean,  ],
      // totalDeposit: ['',  ],
      // depositToHoldPaid: ['',  ],
      petDeposit: ['',  ],
      additionalDeposit: ['',  ],
      balanceDepositDue: ['',  ],
      applicantId: ['',  ],
      tenantSNo: ['',  ],
      tenantId: [Number],
      createdBy: ['',  ],
    }),
  })

  //tenant 4 Section Stats here
  frmTenant4 = this.fb.group({
    // basicinfo: this.fb.group({      
    // firstCtrl:['', ],
    applicantName: ['',  ],
    applicantType: [''],
    property: ['',  ],
    city: ['',  ],
    state: ['',  ],
    zip: ['',  ],
    monthlyRent: ['',  ],
    section8Rent: ['',  ],
    standardDepositProperty: ['',  ],
    // propertyTypeId: ['',  ],
    propertyType: ['',  ],
    // applicantTypeId: ['',  ],
    // ptype: ['',  ],
    applicantId: ['',  ],
    tenantSNo: ['',  ],
    tenantId: [Number],
    paystubRecent: ['',  ],
    applicantTypeId: [Number],
    propertyTypeId: ['',  ],
    createdBy: ['',  ],

    // }),
    incom_verification: this.fb.group({
      paystubRecent: ['',  ], //pay stub
      paystubRecentMonthly: ['',  ], //monthly
      ytD_Earnings: ['',  ], //results
      secondPayStub: ['',  ], //2nd stub
      bankStatementMonthly: ['',  ], //monthly
      bankStatement: ['',  ], //result
      xRent: ['',  ], //x-rent
      incomeAdequate: [Boolean,  ], //incomeAdequate
      applicantId: ['',  ],
      tenantSNo: ['',  ],
      tenantId: [Number],
      createdBy: ['',  ],
    }),
    credit_summary: this.fb.group({
      creditLines: [Boolean,  ],
      creditScore: ['',  ],
      //creditScorePoints: [Number,  ],
      creditScoreAvailable: [Boolean,  ],
      // creditScoreAvailablePoints: ['', ],
      // accountPastDue60Days: ['', ],
      collectionAccounts: ['',  ],
      // collectionAccountsPoints: ['', ],
      medicalCollections: ['',  ],
      propertyRelatedHousingRecord: [Boolean,  ],
      // propertyRelatedHousingRecordPoints: ['', ],
      bankruptcy: [0,  ],
      bankRuptyActive: [Boolean,  ],
      //bankRuptyActivePoints: ['',  ],
      liensRepossessions: [Date,  ],
      // liensRepossessionsPoints: ['', ],
      //evectionHistoryPoints: ['',  ],
      evectionHistory: [null],
      class1Felonies: [Boolean,  ],
      // class1FeloniesPoints: ['', ],
      class2Felonies: [Date,  ],
      // class2FeloniesPoints : ['', ],
      class1Misdemeaners: [Date,  ],
      // class1MisdemeanersPoints: ['', ],
      class2Misdemeaners: [Date,  ],
      depositApproved: [Boolean,  ],
      depositToHold: [''],
      applicantId: ['',  ],
      tenantSNo: ['',  ],
      tenantId: [Number],
      createdBy: ['',  ],

    }),
    landlord_ref: this.fb.group({
      rentalReferance: [Boolean,  ],
      lL1LandlordType: [Number,  ],
      lL1ProperNotice: [Boolean,  ],
      //lL1ProperNoticePoints: [0,  ],
      lL1NSF: ['',  ],
      //lL1NSFPoints: [0,  ],
      lL1LatePayments: ['',  ],
      //lL1LatePaymentsPoints: [0,  ],
      lL1PaymentOrVacantNotices: ['',  ],
      //lL1PaymentOrVacantNoticesPoints: [0,  ],
      lL1TendayComplyNotice: ['',  ],
      //lL1TendayComplyNoticePoints: [0,  ],
      lL1HOAViolations: ['',  ],
      //lL1HOAViolationsPoints: [0,  ],
      lL1PropertyCleanliness: ['',  ],
      //lL1PropertyCleanlinessPoints: [0,  ],
      lL1Pets: [Boolean,  ],
      //lL1PetsPoints: ['',  ],
      lL1AdversePetReferance: [Boolean,  ],
      //lL1AdversePetReferancePoints: [0,  ],
      lL1Rerent: [Boolean,  ],
      //lL1RerentPoints: [0,  ],


      lL2LandlordType: [Number,  ],
      lL2ProperNotice: [Boolean,  ],
      //lL2ProperNoticePoints: ['',  ],
      lL2NSF: ['',  ],
      //lL2NSFPoints: ['',  ],
      lL2LatePayments: ['',  ],
      //L2LatePaymentsPoints: ['',  ],
      lL2PaymentOrVacantNotices: ['',  ],
      //lL2PaymentOrVacantNoticesPoints: ['',  ],
      lL2TendayComplyNotice: ['',  ],
      //lL2TendayComplyNoticePoints: ['',  ],
      lL2HOAViolations: ['',  ],
      //lL2HOAViolationsPoints: ['',  ],
      lL2PropertyCleanliness: ['',  ],
      //lL2PropertyCleanlinessPoints: ['',  ],
      lL2Pets: [Boolean,  ],
      //lL2PetsPoints: ['',  ],
      lL2AdversePetReferance: [Boolean,  ],
      //lL2AdversePetReferancePoints: ['',  ],
      lL2Rerent: [Boolean,  ],
      //lL2RerentPoints: ['',  ],
      applicantId: ['',  ],
      tenantSNo: ['',  ],
      tenantId: [Number],
      createdBy: ['',  ],

    }),
    rental_history: this.fb.group({
      rentalHistoryLength: [Boolean,  ],
      applicantId: ['',  ],
      tenantSNo: ['',  ],
      tenantId: [Number],
      createdBy: ['',  ],
    }),
    // pets: this.fb.group({
    //   petApprovedLandlordReferance1: ['',  ],
    //   petApprovedLandlordReferance2: ['',  ],
    //   noOfCatsCompanion: [Boolean,  ],
    //   noOfCatsCompanions: ['',  ],
    //   noOfLargeDogsCompanion: [Boolean,  ],
    //   noOfLargeDogsCompanions: ['',  ],
    //   noOfSmallDogsCompanion: [Boolean,  ],
    //   noOfSmallDogsCompanions: ['',  ],
    //   applicantId: ['',  ],
    //   tenantSNo: ['',  ],
    //   tenantId: [Number],
    //   createdBy: ['',  ],
    // }),
    points_summary: this.fb.group({
      totalPoints: ['',  ],
      finalApproval: [Boolean,  ],
      // totalDeposit: ['',  ],
      // depositToHoldPaid: ['',  ],
      petDeposit: ['',  ],
      additionalDeposit: ['',  ],
      balanceDepositDue: ['',  ],
      applicantId: ['',  ],
      tenantSNo: ['',  ],
      tenantId: [Number],
      createdBy: ['',  ],
    }),
  })

  //Co-signer section starts here 
  frmTenant5 = this.fb.group({
    // basicinfo: this.fb.group({      
    // firstCtrl:['', ],
    applicantName: ['',  ],
    applicantType: ['',  ],
    property: ['',  ],
    city: ['',  ],
    state: ['',  ],
    zip: ['',  ],
    monthlyRent: ['',  ],
    section8Rent: ['',  ],
    standardDepositProperty: ['',  ],
    // propertyTypeId: ['',  ],
    propertyType: ['',  ],
    // applicantTypeId: ['',  ],
    // ptype: ['',  ],
    applicantId: ['',  ],
    tenantSNo: ['',  ],
    tenantId: [Number],
    paystubRecent: ['',  ],
    applicantTypeId: ['',  ],
    propertyTypeId: ['',  ],
    createdBy: ['',  ],

    // }),
    incom_verification: this.fb.group({
      paystubRecent: ['',  ], //pay stub
      paystubRecentMonthly: ['',  ], //monthly
      ytD_Earnings: ['',  ], //results
      secondPayStub: ['',  ], //2nd stub
      bankStatementMonthly: ['',  ], //monthly
      bankStatement: ['',  ], //result
      xRent: ['',  ], //x-rent
      incomeAdequate: [Boolean,  ], //incomeAdequate
      applicantId: ['',  ],
      tenantSNo: ['',  ],
      tenantId: [Number],
      createdBy: ['',  ],
    }),
    credit_summary: this.fb.group({
      creditLines: [Boolean,  ],
      creditScore: ['',  ],
      //creditScorePoints: [Number,  ],
      creditScoreAvailable: [Boolean,  ],
      // creditScoreAvailablePoints: ['', ],
      // accountPastDue60Days: ['', ],
      collectionAccounts: ['',  ],
      // collectionAccountsPoints: ['', ],
      medicalCollections: ['',  ],
      propertyRelatedHousingRecord: [Boolean,  ],
      // propertyRelatedHousingRecordPoints: ['', ],
      bankruptcy: [0,  ],
      bankRuptyActive: [Boolean,  ],
      //bankRuptyActivePoints: ['',  ],
      liensRepossessions: [Date,  ],
      // liensRepossessionsPoints: ['', ],
      //evectionHistoryPoints: ['',  ],
      evectionHistory: [null],
      class1Felonies: [Boolean,  ],
      // class1FeloniesPoints: ['', ],
      class2Felonies: [Date,  ],
      // class2FeloniesPoints : ['', ],
      class1Misdemeaners: [Date,  ],
      // class1MisdemeanersPoints: ['', ],
      class2Misdemeaners: [Date,  ],
      depositApproved: [Boolean,  ],
      depositToHold: [''],
      applicantId: ['',  ],
      tenantSNo: ['',  ],
      tenantId: [Number],
      createdBy: ['',  ],

    }),
    landlord_ref: this.fb.group({
      rentalReferance: [Boolean,  ],
      lL1LandlordType: [Number,  ],
      lL1ProperNotice: [Boolean,  ],
      //lL1ProperNoticePoints: [0,  ],
      lL1NSF: ['',  ],
      //lL1NSFPoints: [0,  ],
      lL1LatePayments: ['',  ],
      //lL1LatePaymentsPoints: [0,  ],
      lL1PaymentOrVacantNotices: ['',  ],
      //lL1PaymentOrVacantNoticesPoints: [0,  ],
      lL1TendayComplyNotice: ['',  ],
      //lL1TendayComplyNoticePoints: [0,  ],
      lL1HOAViolations: ['',  ],
      //lL1HOAViolationsPoints: [0,  ],
      lL1PropertyCleanliness: ['',  ],
      //lL1PropertyCleanlinessPoints: [0,  ],
      lL1Pets: [Boolean,  ],
      //lL1PetsPoints: ['',  ],
      lL1AdversePetReferance: [Boolean,  ],
      //lL1AdversePetReferancePoints: [0,  ],
      lL1Rerent: [Boolean,  ],
      //lL1RerentPoints: [0,  ],


      lL2LandlordType: [Number,  ],
      lL2ProperNotice: [Boolean,  ],
      //lL2ProperNoticePoints: ['',  ],
      lL2NSF: ['',  ],
      //lL2NSFPoints: ['',  ],
      lL2LatePayments: ['',  ],
      //L2LatePaymentsPoints: ['',  ],
      lL2PaymentOrVacantNotices: ['',  ],
      //lL2PaymentOrVacantNoticesPoints: ['',  ],
      lL2TendayComplyNotice: ['',  ],
      //lL2TendayComplyNoticePoints: ['',  ],
      lL2HOAViolations: ['',  ],
      //lL2HOAViolationsPoints: ['',  ],
      lL2PropertyCleanliness: ['',  ],
      //lL2PropertyCleanlinessPoints: ['',  ],
      lL2Pets: [Boolean,  ],
      //lL2PetsPoints: ['',  ],
      lL2AdversePetReferance: [Boolean,  ],
      //lL2AdversePetReferancePoints: ['',  ],
      lL2Rerent: [Boolean,  ],
      //lL2RerentPoints: ['',  ],
      applicantId: ['',  ],
      tenantSNo: ['',  ],
      tenantId: [Number],
      createdBy: ['',  ],

    }),
    rental_history: this.fb.group({
      rentalHistoryLength: [Boolean,  ],
      applicantId: ['',  ],
      tenantSNo: ['',  ],
      tenantId: [Number],
      createdBy: ['',  ],
    }),
    pets: this.fb.group({
      petApprovedLandlordReferance1: ['',  ],
      petApprovedLandlordReferance2: ['',  ],
      noOfCatsCompanion: [Boolean,  ],
      noOfCatsCompanions: ['',  ],
      noOfLargeDogsCompanion: [Boolean,  ],
      noOfLargeDogsCompanions: ['',  ],
      noOfSmallDogsCompanion: [Boolean,  ],
      noOfSmallDogsCompanions: ['',  ],
      applicantId: ['',  ],
      tenantSNo: ['',  ],
      tenantId: [Number],
      createdBy: ['',  ],
    }),
    points_summary: this.fb.group({
      totalPoints: ['',  ],
      finalApproval: [Boolean,  ],
      totalDeposit: ['',  ],
      depositToHoldPaid: ['',  ],
      petDeposit: ['',  ],
      additionalDeposit: ['',  ],
      balanceDepositDue: ['',  ],
      applicantId: ['',  ],
      tenantSNo: ['',  ],
      tenantId: [Number],
      createdBy: ['',  ],
    }),
  })

  //Coversheet Section Starts here 
  coverSheetForm = this.fb.group({
    applicantId: ['',  ],
    propertyManager: ['',  ],
    primaryTenant: ['',  ],
    tenant2: ['',  ],
    tenant3: ['',  ],
    tenant4: ['',  ],
    propertyAddress: ['',  ],
    city: ['',  ],
    state: ['',  ],
    unitCode: ['',  ],
    bestPOC: ['',  ],
    rentReadyDate: ['',  ],
    depositPaidDate: ['',  ],
    rentResponsibleDate: ['',  ],
    agreementType: ['',  ],
    qcDate: ['',  ],
    signingDate: ['',  ],
    //signingTime: [Time,  ],
    withWhom: ['',  ],
    otherTerms: ['',  ],
    listPaidUtilities: ['',  ],
    otherMonthlyCharge11: ['',  ],
    otherMonthlyCharge12: ['',  ],
    otherMonthlyCharge21: ['',  ],
    otherMonthlyCharge22: ['',  ],
    otherMonthlyCharge31: ['',  ],
    otherMonthlyCharge32: ['',  ],
    otherMonthlyCharge41: ['',  ],
    otherMonthlyCharge42: ['',  ],
    otherMoveinCharge1: ['',  ],
    otherMoveinChargePaid1: ['',  ],
    moveinRentCharge: ['',  ],
    moveinRentPaid: ['',  ],

    otherMoveinCharge2: ['',  ],
    otherMoveinChargePaid2: ['',  ],
    otherMoveinCharge3: ['',  ],
    otherMoveinChargePaid3: ['',  ],
    rubsMoveinCharge: ['',  ],
    rubsMoveinChargePaid: ['',  ],
    prepaidCleaningCharge: ['',  ],
    prepaidCleaningPaid: ['',  ],


    securityDepositCharge: ['',  ],
    securityDepositPaid: ['',  ],
    nonRefProcessingFeeCharge: ['',  ],
    nonRefProcessingFeePaid: ['',  ],
    petDepositCharge: ['',  ],
    petDepositPaid: ['',  ],
    petNonRefFeeCharge: ['',  ],
    petNonRefFeePaid: ['',  ],

    additionDepositCharge: ['',  ],
    additionDepositPaid: ['',  ],
    subTotal: ['',  ],
    paid: ['',  ],
    dueatMoveinKeyPickup: ['',  ],
    createdBy: ['',  ],

    modifiedBy: ['',  ],


    // Other charges...
  });



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
     
    //if (event.selectedIndex == 0) {
    //  this.tenantSNO = 1;
    //}
    //else {
      
    //}
    this.tenantSNO = event.selectedIndex + 1;
    
    if (this.snapid && this.tenantSNO<4) {
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
        // ytD_Earnings:this.result.data.ytD_Earnings,
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
        applicationStatusId: this.result[0].applicationStatusId,

        incom_verification: {
          paystubRecent: this.result[0].paystubRecent,
          paystubRecentMonthly: this.result[0].paystubRecentMonthly,
          ytD_Earnings: this.result[0].ytD_Earnings,
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


          //creditScorePoints: [Number,  ],

          // creditScoreAvailablePoints: ['', ],
          // accountPastDue60Days: ['', ],
          collectionAccounts: this.result[0].collectionAccounts,
          // collectionAccountsPoints: ['', ],

          propertyRelatedHousingRecord: this.result[0].propertyRelatedHousingRecord,
          // propertyRelatedHousingRecordPoints: ['', ],
          bankRuptyActive: this.result[0].bankRuptyActive,
          // bankRuptyActivePoints: this.result[0].bankRuptyActivePoints,
          liensRepossessions: this.result[0].liensRepossessions,
          // liensRepossessionsPoints: ['', ],
          //evectionHistoryPoints: ['',  ],

          evectionHistory: this.result[0]?.evectionHistory,
          class1Felonies: this.result[0].class1Felonies,
          // class1FeloniesPoints: ['', ],
          class2Felonies: this.result[0].class2Felonies,
          // class2FeloniesPoints : ['', ],
          class1Misdemeaners: this.result[0].class1Misdemeaners,
          // class1MisdemeanersPoints: ['', ],
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
  calculateIncomeAdequate() {
    //const primaryPaystubRecentValue = pathis.frmPrimary.get('incom_verification.paystubRecent')?.value) || 0;
    //const primaryytD_EarningsValue = this.frmPrimary.get('incom_verification.ytD_Earnings')?.value || 0;
    //const dueatMoveinKeyPickupValue = (primaryPaystubRecentValue/primaryytD_EarningsValue);
    //this.frmPrimary.patchValue({
    //  incom_verification: {

    //    paystubRecentMonthly: (primaryPaystubRecentValue / primaryytD_EarningsValue).toFixed(2),
    //    ytD_Earnings: this.result[0].ytD_Earnings,
    //    secondPayStub: this.result[0].secondPayStub,
    //    bankStatementMonthly: this.result[0].bankStatementMonthly,
    //    bankStatement: this.result[0].bankStatement,
    //    xRent: this.result[0].xRent,
    //    incomeAdequate: this.result[0].incomeAdequate
    //  }
     

    //})
  }
  // changeStep(index: number) {
  //   this.currentStep = index;
  // }
  // nextStep() {
  //   this.currentStep++;
  // }
}
