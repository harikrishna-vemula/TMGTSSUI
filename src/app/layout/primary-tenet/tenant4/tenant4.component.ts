import { CdkStep } from '@angular/cdk/stepper';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStep } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute, Router } from "@angular/router";
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-tenant4',
  templateUrl: './tenant4.component.html',
  styleUrls: ['./tenant4.component.scss']
})
export class Tanant4Component {
  isLinear = false;
  stepper: any; currentUser: any; result: any
  snapid: any;
  applicantId: number = 0; frmTenant: any; tenantId: number = 0; selectedTabIndex: number = 0;
  frmTenant4!: FormGroup;
  formulaeData: any; formulaValue?: string; filteredItem: any; dateToCheck?: Date;
  constructor(private fb: FormBuilder, private authservice: AuthService, private router: Router, private _userservice: UsersService, private activate: ActivatedRoute) {
    this.authservice.currentUser.subscribe(x => this.currentUser = x);
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
  }
  initForm(): void {
    this.frmTenant4 = this.fb.group({
      // basicinfo: this.fb.group({      
      // firstCtrl:['', ],
      applicantName: ['',],
      applicantType: [''],
      applicantTypeId: ['',],
      property: ['',],
      city: ['',],
      state: ['',],
      zip: ['',],
      monthlyRent: ['',],
      section8Rent: ['',],
      standardDepositProperty: ['',],
      // propertyTypeId: ['',  ],
      // propertyType: ['',  ],
      // applicantTypeId: ['',  ],
      // ptype: ['',  ],
      applicantId: ['',],
      tenantSNo: ['',],
      tenantId: [Number],
      paystubRecent: ['',],
      propertyTypeId: ['',],
      petDeposit: ['',],
      createdBy: ['',],

      // }),
      incom_verification: this.fb.group({
        paystubRecent: ['',], //pay stub
        paystubRecentMonthly: ['',], //monthly
        ytD_Earnings: ['',], //results
        secondPayStub: ['',], //2nd stub
        bankStatementMonthly: ['',], //monthly
        bankStatement: ['',], //result
        xRent: ['',], //x-rent
        incomeAdequate: [Boolean,], //incomeAdequate
        applicantId: ['',],
        tenantSNo: ['',],
        tenantId: [Number],
        createdBy: ['',],
        paystubMonthlyRentPoints: [0,],
        paystubsection8RentPoints: [0,],
        secondPaystubMonthlyRentPoints: [0,],
        secondPaystubsection8RentPoints: [0,],
        totalPayStubPoints: [0,],
      }),
      credit_summary: this.fb.group({
        creditLines: [Boolean,],
        creditScore: ['',],
        creditScorePoints: [0,],
        creditScoreAvailable: [Boolean,],
        creditScoreAvailablePoints: [0,],
        // accountPastDue60Days: ['', ],
        collectionAccounts: ['',],
        collectionAccountsPoints: [0,],
        collectionMedicalAccountsPoints: [0,],
        medicalCollections: ['',],
        propertyRelatedHousingRecord: [Boolean,],
        propertyRelatedHousingRecordPoints: [0,],
        bankruptcy: [Number],
        bankruptcyPoints: [0,],
        bankRuptyActive: [Boolean,],
        bankRuptyActivePoints: [0,],
        liensRepossessions: [Date,],
        liensRepossessionsPoints: [0,],
        evectionHistoryPoints: [0,],
        evectionHistory: [null],
        class1Felonies: [Boolean,],
        class1FeloniesPoints: [0,],
        class2Felonies: [Date,],
        class2FeloniesPoints: [0,],
        class1Misdemeaners: [Date,],
        class1MisdemeanersPoints: [0,],
        class2MisdemeanersPoints: [0,],
        class2Misdemeaners: [Date,],
        depositApproved: [Boolean,],
        depositToHold: [''],
        applicantId: ['',],
        tenantSNo: ['',],
        tenantId: [Number],
        createdBy: ['',],
        totalCreditSummaryPoints: [0,]

      }),
      landlord_ref: this.fb.group({
        rentalReferance: [Boolean,],
        rentalReferancePoints: [0,],
        // lL1LandlordType: [Number,  ],
        lL1ProperNotice: [Boolean,],
        lL1ProperNoticePoints: [0,  ],
        lL1NSF: ['',],
        lL1NSFPoints: [0,  ],
        lL1LatePayments: ['',],
        lL1LatePaymentsPoints: [0,  ],
        lL1PaymentOrVacantNotices: ['',],
        lL1PaymentOrVacantNoticesPoints: [0,  ],
        lL1TendayComplyNotice: ['',],
        lL1TendayComplyNoticePoints: [0,  ],
        lL1HOAViolations: ['',],
        lL1HOAViolationsPoints: [0,  ],
        lL1PropertyCleanliness: ['',],
        lL1PropertyCleanlinessPoints: [0,  ],
        lL1Pets: [Boolean,],
        //lL1PetsPoints: ['',  ],
        lL1AdversePetReferance: [Boolean,],
        //lL1AdversePetReferancePoints: [0,  ],
        lL1Rerent: [Boolean,],
        lL1RerentPoints: [0,  ],


        // lL2LandlordType: [Number,  ],
        lL2ProperNotice: [Boolean,],
        lL2ProperNoticePoints: [0,  ],
        lL2NSF: ['',],
        lL2NSFPoints: [0,  ],
        lL2LatePayments: ['',],
        L2LatePaymentsPoints: [0,  ],
        lL2PaymentOrVacantNotices: ['',],
        lL2PaymentOrVacantNoticesPoints: [0,  ],
        lL2TendayComplyNotice: ['',],
        lL2TendayComplyNoticePoints: [0,  ],
        lL2HOAViolations: ['',],
        lL2HOAViolationsPoints: [0,  ],
        lL2PropertyCleanliness: ['',],
        lL2PropertyCleanlinessPoints: [0,  ],
        lL2Pets: [Boolean,],
        //lL2PetsPoints: ['',  ],
        lL2AdversePetReferance: [Boolean,],
        //lL2AdversePetReferancePoints: ['',  ],
        lL2Rerent: [Boolean,],
        lL2RerentPoints: [0,  ],
        applicantId: ['',],
        tenantSNo: ['',],
        tenantId: [Number],
        createdBy: ['',],

      }),
      rental_history: this.fb.group({
        rentalHistoryLength: [Boolean,],
        applicantId: ['',],
        tenantSNo: ['',],
        tenantId: [Number],
        createdBy: ['',],
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
      // }),
      points_summary: this.fb.group({
        totalPoints: ['',],
        finalApproval: [Boolean,],
        totalDeposit: ['',],
        depositToHoldPaid: ['',],
        petDeposit: ['',],
        additionalDeposit: ['',],
        balanceDepositDue: ['',],
        applicantId: ['',],
        tenantSNo: ['',],
        tenantId: [Number],
        createdBy: ['',],
        balanceDepositDuePoints: [0,],
      }),
    })
  }


  tabIndex = 0;
  onTabSelect(event: MatTabChangeEvent): void {

    this.tabIndex = event.index

    // Add your custom logic here
  }
  nextTab() {
    if (this.tabIndex < 5) {
      this.tabIndex++;
    }
  }
  prevTab() {
    if (this.tabIndex > 0) {
      this.tabIndex--;
    }
  }
  ngOnInit() {
    this.getFormulae();
    this.initForm();
    this.subscribeT4Controls();
    this.frmTenant4.get('applicantName')?.setValue('');

    this.snapid = this.activate.snapshot.paramMap.get('id') || '';

    if (this.snapid) {

      this.getScroreSheetByApplicantId(this.snapid, 4);

    }

  }
  subscribeT4Controls() {

    //Basic details
    this.frmTenant4.get('monthlyRent')?.valueChanges.subscribe(() => this.calculateT4IncomeCriteria());
    this.frmTenant4.get('section8Rent')?.valueChanges.subscribe(() => this.calculateT4IncomeCriteria());
    this.frmTenant4.get('applicantTypeId')?.valueChanges.subscribe(() => this.calculateT4IncomeCriteria());
    this.frmTenant4.get('propertyTypeId')?.valueChanges.subscribe(() => this.calculateT4IncomeCriteria());
    this.frmTenant4.get('standardDepositProperty')?.valueChanges.subscribe(() => this.calculateT4IncomeCriteria());

    this.frmTenant4.get('incom_verification.paystubRecent')?.valueChanges.subscribe(() => this.calculateT4IncomeCriteria());
    this.frmTenant4.get('incom_verification.ytD_Earnings')?.valueChanges.subscribe(() => this.calculateT4IncomeCriteria());
    this.frmTenant4.get('incom_verification.secondPayStub')?.valueChanges.subscribe(() => this.calculateT4IncomeCriteria());
    this.frmTenant4.get('incom_verification.bankStatement')?.valueChanges.subscribe(() => this.calculateT4IncomeCriteria());
    this.frmTenant4.get('credit_summary.creditScore')?.valueChanges.subscribe(() => this.calculateT4CreditSummary());
    this.frmTenant4.get('credit_summary.creditScoreAvailable')?.valueChanges.subscribe(() => this.calculateT4CreditSummary());
    this.frmTenant4.get('credit_summary.collectionAccounts')?.valueChanges.subscribe(() => this.calculateT4CreditSummary());
    this.frmTenant4.get('credit_summary.medicalCollections')?.valueChanges.subscribe(() => this.calculateT4CreditSummary());
    this.frmTenant4.get('credit_summary.propertyRelatedHousingRecord')?.valueChanges.subscribe(() => this.calculateT4CreditSummary());
    this.frmTenant4.get('credit_summary.bankruptcy')?.valueChanges.subscribe(() => this.calculateT4CreditSummary());
    this.frmTenant4.get('credit_summary.bankRuptyActive')?.valueChanges.subscribe(() => this.calculateT4CreditSummary());
    this.frmTenant4.get('credit_summary.liensRepossessions')?.valueChanges.subscribe(() => this.calculateT4CreditSummary());
    this.frmTenant4.get('credit_summary.evectionHistory')?.valueChanges.subscribe(() => this.calculateT4CreditSummary());
    this.frmTenant4.get('credit_summary.class1Felonies')?.valueChanges.subscribe(() => this.calculateT4CreditSummary());
    this.frmTenant4.get('credit_summary.class2Felonies')?.valueChanges.subscribe(() => this.calculateT4CreditSummary());
    this.frmTenant4.get('credit_summary.class1Misdemeaners')?.valueChanges.subscribe(() => this.calculateT4CreditSummary());
    this.frmTenant4.get('credit_summary.class2Misdemeaners')?.valueChanges.subscribe(() => this.calculateT4CreditSummary());

    this.frmTenant4.get('landlord_ref.rentalReferance')?.valueChanges.subscribe(() => this.calculateT4LandlordReferances());
    this.frmTenant4.get('landlord_ref.lL1ProperNotice')?.valueChanges.subscribe(() => this.calculateT4LandlordReferances());
    this.frmTenant4.get('landlord_ref.lL1NSF')?.valueChanges.subscribe(() => this.calculateT4LandlordReferances());
    this.frmTenant4.get('landlord_ref.lL1LatePayments')?.valueChanges.subscribe(() => this.calculateT4LandlordReferances());
    this.frmTenant4.get('landlord_ref.lL1PaymentOrVacantNotices')?.valueChanges.subscribe(() => this.calculateT4LandlordReferances());
    this.frmTenant4.get('landlord_ref.lL1TendayComplyNotice')?.valueChanges.subscribe(() => this.calculateT4LandlordReferances());
    this.frmTenant4.get('landlord_ref.lL1HOAViolations')?.valueChanges.subscribe(() => this.calculateT4LandlordReferances());
    this.frmTenant4.get('landlord_ref.lL1PropertyCleanliness')?.valueChanges.subscribe(() => this.calculateT4LandlordReferances());
    this.frmTenant4.get('landlord_ref.lL1Rerent')?.valueChanges.subscribe(() => this.calculateT4LandlordReferances());
    this.frmTenant4.get('landlord_ref.lL2ProperNotice')?.valueChanges.subscribe(() => this.calculateT4LandlordReferances());
    this.frmTenant4.get('landlord_ref.lL2NSF')?.valueChanges.subscribe(() => this.calculateT4LandlordReferances());
    this.frmTenant4.get('landlord_ref.lL2LatePayments')?.valueChanges.subscribe(() => this.calculateT4LandlordReferances());
    this.frmTenant4.get('landlord_ref.lL2PaymentOrVacantNotices')?.valueChanges.subscribe(() => this.calculateT4LandlordReferances());
    this.frmTenant4.get('landlord_ref.lL2TendayComplyNotice')?.valueChanges.subscribe(() => this.calculateT4LandlordReferances());
    this.frmTenant4.get('landlord_ref.lL2HOAViolations')?.valueChanges.subscribe(() => this.calculateT4LandlordReferances());
    this.frmTenant4.get('landlord_ref.lL2PropertyCleanliness')?.valueChanges.subscribe(() => this.calculateT4LandlordReferances());
    this.frmTenant4.get('landlord_ref.lL2Rerent')?.valueChanges.subscribe(() => this.calculateT4LandlordReferances());
    this.frmTenant4.get('pets.noOfLargeDogsCompanion')?.valueChanges.subscribe(() => this.calculateT4Pets());
    this.frmTenant4.get('pets.noOfCatsCompanions')?.valueChanges.subscribe(() => this.calculateT4Pets());
    this.frmTenant4.get('pets.noOfLargeDogsCompanion')?.valueChanges.subscribe(() => this.calculateT4Pets());
    this.frmTenant4.get('pets.noOfLargeDogsCompanions')?.valueChanges.subscribe(() => this.calculateT4Pets());
    this.frmTenant4.get('pets.noOfSmallDogsCompanion')?.valueChanges.subscribe(() => this.calculateT4Pets());
    this.frmTenant4.get('pets.noOfSmallDogsCompanions')?.valueChanges.subscribe(() => this.calculateT4Pets());

  }

  calculateT4IncomeCriteria() {

    const monthlyRentValue = parseFloat(this.frmTenant4.get('monthlyRent')?.value) || 0;
    const section8RentValue = parseFloat(this.frmTenant4.get('section8Rent')?.value) || 0;
    const applicantTypeId = parseFloat(this.frmTenant4.get('applicantTypeId')?.value) || 0;
    const propertyTypeId = parseFloat(this.frmTenant4.get('propertyTypeId')?.value) || 0;

    let incomeformula = 0;
    this.filteredItem = this.formulaeData.filter((item: { applicantTypeId: string | number; propertyTypeId: string | number; description: string | number }) => {

      return item.description == "Income Criteria" && item.applicantTypeId == applicantTypeId && item.propertyTypeId == propertyTypeId;
    });
    if (this.filteredItem.length > 0) {
      incomeformula = parseFloat(this.filteredItem[0].calculation) || 0;
    }


    //Primary Tenant
    const primarypaystubRecentValue = parseFloat(this.frmTenant4.get('incom_verification.paystubRecent')?.value) || 0;
    const primaryytD_EarningsValue = parseFloat(this.frmTenant4.get('incom_verification.ytD_Earnings')?.value) || 0;
    const primarysecondPayStubValue = parseFloat(this.frmTenant4.get('incom_verification.secondPayStub')?.value) || 0;
    const primarybankStatementValue = parseFloat(this.frmTenant4.get('incom_verification.bankStatement')?.value) || 0;

    const paystubRecentMonthly = (primarypaystubRecentValue / primaryytD_EarningsValue);
    const bankStatementMonthly = (primarysecondPayStubValue / primarybankStatementValue);
    const paystubMonthlyRentPoints = ((primarypaystubRecentValue / primaryytD_EarningsValue) / monthlyRentValue);
    const paystubsection8RentPoints = ((primarypaystubRecentValue / primaryytD_EarningsValue) / section8RentValue);
    const secondPaystubMonthlyRentPoints = ((primarysecondPayStubValue / primarybankStatementValue) / monthlyRentValue);
    const secondPaystubsection8RentPoints = ((primarysecondPayStubValue / primarybankStatementValue) / section8RentValue);
    const totalPayStubPoints = (paystubMonthlyRentPoints + paystubsection8RentPoints + secondPaystubMonthlyRentPoints + secondPaystubsection8RentPoints);

    this.frmTenant4.patchValue({
      incom_verification: {

        paystubRecentMonthly: this.formatNumber(paystubRecentMonthly),
        bankStatementMonthly: this.formatNumber(bankStatementMonthly),
        paystubMonthlyRentPoints: this.formatNumber(paystubMonthlyRentPoints),
        paystubsection8RentPoints: this.formatNumber(paystubsection8RentPoints),
        secondPaystubMonthlyRentPoints: this.formatNumber(secondPaystubMonthlyRentPoints),
        secondPaystubsection8RentPoints: this.formatNumber(secondPaystubsection8RentPoints),
        totalPayStubPoints: this.formatNumber(totalPayStubPoints),
        xRent: this.formatNumber(incomeformula),
        incomeAdequate: this.isValidNumber(totalPayStubPoints) && this.isValidNumber(incomeformula)
          ? totalPayStubPoints > incomeformula
          : false,

      }
    })


  }

  calculateT4CreditSummary() {

    const applicantTypeId = parseFloat(this.frmTenant4.get('applicantTypeId')?.value) || 0;
    const propertyTypeId = parseFloat(this.frmTenant4.get('propertyTypeId')?.value) || 0;
    const primarycreditScoreValue = parseFloat(this.frmTenant4.get('credit_summary.creditScore')?.value) || 0;
    let primarycreditScorePoints = 0;
    this.filteredItem = this.formulaeData.filter((item: { startValue: string | number; endValue: string | number; propertyTypeId: string | number; description: string | number }) => {
      const startValue = +item.startValue; // Convert to number
      const endValue = +item.endValue; // Convert to number      
      return startValue <= primarycreditScoreValue && primarycreditScoreValue <= endValue && item.description == "Credit Score" && item.propertyTypeId == propertyTypeId;
    });
    if (this.filteredItem.length > 0) {
      primarycreditScorePoints = parseFloat(this.filteredItem[0].calculation) || 0;
    }


    //credit score available
    let primarycreditScroreAvaiablePoints = 0;
    const primarycreditScoreAvailableValue = this.frmTenant4.get('credit_summary.creditScoreAvailable')?.value;
    this.filteredItem = this.formulaeData.filter((item: { startValue: string | number; propertyTypeId: string | number; description: string | number }) => {

      return item.description == "Credit Score Available" && item.propertyTypeId == propertyTypeId && item.startValue == (primarycreditScoreAvailableValue == false ? "No" : "Yes");
    });
    if (this.filteredItem.length > 0) {
      primarycreditScroreAvaiablePoints = parseFloat(this.filteredItem[0].calculation) || 0;
    }

    //collection accounts
    let primaryCollectionAccountsPoints = 0; let primaryCMAccountsPoints = 0;
    const primaryCollectionAccountsValue = parseFloat(this.frmTenant4.get('credit_summary.collectionAccounts')?.value) || 0;
    const primaryMedicalCollectionsValue = parseFloat(this.frmTenant4.get('credit_summary.medicalCollections')?.value) || 0;
    this.filteredItem = this.formulaeData.filter((item: { startValue: string | number; endValue: string | number; description: string | number }) => {
      const startValue = +item.startValue; // Convert to number
      const endValue = +item.endValue; // Convert to number     
      return startValue <= primaryCollectionAccountsValue && primaryCollectionAccountsValue <= endValue && item.description == "Collection Accounts";
    });
    if (this.filteredItem.length > 0) {
      primaryCollectionAccountsPoints = parseFloat(this.filteredItem[0].calculation) || 0;
    }
    primaryCMAccountsPoints = primaryCollectionAccountsValue - primaryMedicalCollectionsValue;

    //Property Related Housing Record
    let primaryPropertyRelatedHousingRecordPoints = 0;
    const primaryPropertyRelatedHousingRecordValue = this.frmTenant4.get('credit_summary.propertyRelatedHousingRecord')?.value;
    this.filteredItem = this.formulaeData.filter((item: { startValue: string | number; description: string | number }) => {

      return item.description == "Housing Records" && item.startValue == (primaryPropertyRelatedHousingRecordValue == false ? "No" : "Yes");
    });
    if (this.filteredItem.length > 0) {
      primaryPropertyRelatedHousingRecordPoints = parseFloat(this.filteredItem[0].calculation) || 0;
    }
    //Bankruptcy
    let primaryBankRuptcyDischargedPoints = 0; let primaryBankRuptcyActivePoints = 0;
    const primaryBankruptcyValue = parseFloat(this.frmTenant4.get('credit_summary.bankruptcy')?.value) || 0;
    primaryBankRuptcyDischargedPoints = primaryBankruptcyValue
    const primaryBankRuptyActiveValue = this.frmTenant4.get('credit_summary.bankRuptyActive')?.value;
    this.filteredItem = this.formulaeData.filter((item: { startValue: string | number; description: string | number }) => {

      return item.description == "Bankruptcy" && item.startValue == (primaryBankRuptyActiveValue == false ? "No" : "Yes");
    });
    if (this.filteredItem.length > 0) {
      primaryBankRuptcyActivePoints = parseFloat(this.filteredItem[0].calculation) || 0;
    }

    this.dateToCheck = new Date();
    let threeYearAgo = new Date(this.dateToCheck.setFullYear(this.dateToCheck.getFullYear() - 3));
    let fiveYearAgo = new Date(this.dateToCheck.setFullYear(this.dateToCheck.getFullYear() - 5));
    let sevenYearAgo = new Date(this.dateToCheck.setFullYear(this.dateToCheck.getFullYear() - 7));

    //Liens Repossessions
    let primaryLiensRepossessionsPoints = 0;
    const primaryLiensRepossessionsValue = this.frmTenant4.get('credit_summary.liensRepossessions')?.value;
    if (primaryLiensRepossessionsValue) {
      if (fiveYearAgo < primaryLiensRepossessionsValue) {
        this.filteredItem = this.formulaeData.filter((item: { startValue: string | number; description: string | number }) => {

          return item.description == "Eviction History" && item.startValue == "Last 5 Yrs";
        });
        if (this.filteredItem.length > 0) {
          primaryLiensRepossessionsPoints = parseFloat(this.filteredItem[0].calculation) || 0;

        }

      }
      else {
        primaryLiensRepossessionsPoints = 0;
      }
    }

    //Other Screening Summary
    let primaryEvictionHistoryPoints = 0, primaryClass1FeloniesPoints = 0, primaryClass2FeloniesPoints = 0, primaryClass1MisdemeanersPoints = 0, primaryClass2MisdemeanersPoints = 0;

    const primaryevectionHistoryValue = this.frmTenant4.get('credit_summary.evectionHistory')?.value;
    const primaryclass2FeloniesValue = this.frmTenant4.get('credit_summary.class2Felonies')?.value;
    const primaryclass1FeloniesValue = this.frmTenant4.get('credit_summary.class1Felonies')?.value;
    const primaryclass1MisdemeanersValue = this.frmTenant4.get('credit_summary.class1Misdemeaners')?.value;
    const primaryclass2MisdemeanersValue = this.frmTenant4.get('credit_summary.class2Misdemeaners')?.value;

    if (primaryevectionHistoryValue) {
      if (fiveYearAgo < primaryevectionHistoryValue) {
        this.filteredItem = this.formulaeData.filter((item: { startValue: string | number; description: string | number }) => {

          return item.description == "Eviction History" && item.startValue == "Last 5 Yrs";
        });
        if (this.filteredItem.length > 0) {
          primaryEvictionHistoryPoints = parseFloat(this.filteredItem[0].calculation) || 0;

        }

      }
      else {
        primaryEvictionHistoryPoints = 0;
      }
    }
    if (primaryclass1MisdemeanersValue) {
      if (fiveYearAgo < primaryclass1MisdemeanersValue) {
        this.filteredItem = this.formulaeData.filter((item: { startValue: string | number; description: string | number }) => {

          return item.description == "Eviction History" && item.startValue == "Last 5 Yrs";
        });
        if (this.filteredItem.length > 0) {
          primaryClass1MisdemeanersPoints = parseFloat(this.filteredItem[0].calculation) || 0;

        }

      }
      else {
        primaryClass1MisdemeanersPoints = 0;
      }
    }
    if (primaryclass2FeloniesValue) {
      if (sevenYearAgo < primaryclass2FeloniesValue) {
        this.filteredItem = this.formulaeData.filter((item: { startValue: string | number; description: string | number }) => {

          return item.description == "Eviction History" && item.startValue == "Last 7 Yrs";
        });
        if (this.filteredItem.length > 0) {
          primaryClass2FeloniesPoints = parseFloat(this.filteredItem[0].calculation) || 0;

        }

      }
      else {
        primaryClass2FeloniesPoints = 0;
      }
    }
    if (primaryclass2MisdemeanersValue) {
      if (threeYearAgo < primaryclass2MisdemeanersValue) {
        this.filteredItem = this.formulaeData.filter((item: { startValue: string | number; description: string | number }) => {

          return item.description == "Eviction History" && item.startValue == "Last 3 Yrs";
        });
        if (this.filteredItem.length > 0) {
          primaryClass2MisdemeanersPoints = parseFloat(this.filteredItem[0].calculation) || 0;

        }

      }
      else {
        primaryClass2MisdemeanersPoints = 0;
      }
    }
    this.filteredItem = this.formulaeData.filter((item: { startValue: string | number; description: string | number }) => {

      return item.description == "Housing Records" && item.startValue == (primaryclass1FeloniesValue == false ? "No" : "Yes");
    });
    if (this.filteredItem.length > 0) {
      primaryClass1FeloniesPoints = parseFloat(this.filteredItem[0].calculation) || 0;
    }

    //Deposit Approved
    let primaryTotalCreditSummaryPoints = (primarycreditScorePoints + primarycreditScroreAvaiablePoints + primaryCollectionAccountsPoints + primaryPropertyRelatedHousingRecordPoints + primaryBankRuptcyDischargedPoints
      + primaryBankRuptcyActivePoints + primaryLiensRepossessionsPoints + primaryEvictionHistoryPoints + primaryClass1FeloniesPoints + primaryClass2FeloniesPoints + primaryClass1MisdemeanersPoints +
      primaryClass2MisdemeanersPoints), primaryDepositApproved = false;
    this.filteredItem = this.formulaeData.filter((item: { startValue: string | number; endValue: string | number; propertyTypeId: string | number; description: string | number }) => {
      const startValue = +item.startValue; // Convert to number
      const endValue = +item.endValue;
      return item.description == "Deposit Approved" && item.propertyTypeId == propertyTypeId && startValue <= primaryTotalCreditSummaryPoints && primaryTotalCreditSummaryPoints <= endValue;
    });
    if (this.filteredItem.length > 0) {
      primaryDepositApproved = this.filteredItem[0].calculation == "Yes" ? true : false;

    }
    let totalCreditSummaryPoints = primarycreditScorePoints + primarycreditScroreAvaiablePoints + primaryCollectionAccountsPoints + primaryPropertyRelatedHousingRecordPoints
      + primaryBankRuptcyDischargedPoints + primaryBankRuptcyActivePoints + primaryLiensRepossessionsPoints + primaryEvictionHistoryPoints + primaryClass1FeloniesPoints +
      primaryClass2FeloniesPoints + primaryClass1MisdemeanersPoints + primaryClass2MisdemeanersPoints;

    const standardDepositProperty = parseFloat(this.frmTenant4.get('standardDepositProperty')?.value) || 0;
    const depositToHold = 0.7 * standardDepositProperty;

    this.frmTenant4.patchValue({
      credit_summary: {

        creditScorePoints: this.formatNumber(primarycreditScorePoints),
        creditScoreAvailablePoints: this.formatNumber(primarycreditScroreAvaiablePoints),
        collectionAccountsPoints: this.formatNumber(primaryCollectionAccountsPoints),
        collectionMedicalAccountsPoints: this.formatNumber(primaryCMAccountsPoints),
        propertyRelatedHousingRecordPoints: this.formatNumber(primaryPropertyRelatedHousingRecordPoints),
        bankruptcyPoints: this.formatNumber(primaryBankRuptcyDischargedPoints),
        bankRuptyActivePoints: this.formatNumber(primaryBankRuptcyActivePoints),
        liensRepossessionsPoints: this.formatNumber(primaryLiensRepossessionsPoints),
        evectionHistoryPoints: this.formatNumber(primaryEvictionHistoryPoints),
        class1FeloniesPoints: this.formatNumber(primaryClass1FeloniesPoints),
        class2FeloniesPoints: this.formatNumber(primaryClass2FeloniesPoints),
        class1MisdemeanersPoints: this.formatNumber(primaryClass1MisdemeanersPoints),
        class2MisdemeanersPoints: this.formatNumber(primaryClass2MisdemeanersPoints),
        totalCreditSummaryPoints: this.formatNumber(totalCreditSummaryPoints),
        depositApproved: primaryDepositApproved,
        depositToHold: this.formatNumber(depositToHold),

      }
    })
    this.calculateT4TotalPoints();
  }

  calculateT4LandlordReferances() {

    const monthlyRentValue = parseFloat(this.frmTenant4.get('monthlyRent')?.value) || 0;
    //Rental Referance
    let primaryLLRentalReferancePoints = 0;
    const primaryLLRentalReferanceValue = this.frmTenant4.get('landlord_ref.rentalReferance')?.value;
    if (primaryLLRentalReferanceValue == true) {
      primaryLLRentalReferancePoints = 0;
    }
    else {
      primaryLLRentalReferancePoints = monthlyRentValue;
    }

    //Landlord1
    let primarylL1ProperNoticePoints = 0;
    const primarylL1ProperNoticeValue = this.frmTenant4.get('landlord_ref.lL1ProperNotice')?.value;
    this.filteredItem = this.formulaeData.filter((item: { startValue: string | number; description: string | number }) => {

      return item.description == "Proper Notice" && item.startValue == (primarylL1ProperNoticeValue == false ? "No" : "Yes");
    });
    if (this.filteredItem.length > 0) {
      primarylL1ProperNoticePoints = parseFloat(this.filteredItem[0].calculation) || 0;
    }
    let primarylL1NSFPoints = parseFloat(this.frmTenant4.get('landlord_ref.lL1NSF')?.value) || 0;
    let primarylL1LatePaymentPoints = parseFloat(this.frmTenant4.get('landlord_ref.lL1LatePayments')?.value) || 0;
    let primarylL1PaymentOrVacantNoticesPoints = parseFloat(this.frmTenant4.get('landlord_ref.lL1PaymentOrVacantNotices')?.value) || 0;
    let primarylL1TendayComplyNoticePoints = parseFloat(this.frmTenant4.get('landlord_ref.lL1TendayComplyNotice')?.value) || 0;
    let primarylL1HOAViolationsPoints = parseFloat(this.frmTenant4.get('landlord_ref.lL1HOAViolations')?.value) || 0;
    let primarylL1PropertyCleanlinessPoints = 0;
    const primarylL1PropertyCleanlinessValue = this.frmTenant4.get('landlord_ref.lL1PropertyCleanliness')?.value;
    this.filteredItem = this.formulaeData.filter((item: { startValue: string | number; description: string | number }) => {

      return item.description == "Property Cleanliness" && item.startValue == (primarylL1PropertyCleanlinessValue == false ? "Good/Fair" : "Poor");
    });
    if (this.filteredItem.length > 0) {
      primarylL1PropertyCleanlinessPoints = parseFloat(this.filteredItem[0].calculation) || 0;
    }
    let primarylL1RerentPoints = 0;
    const primarylL1RerentValue = this.frmTenant4.get('landlord_ref.lL1Rerent')?.value;
    this.filteredItem = this.formulaeData.filter((item: { startValue: string | number; description: string | number }) => {

      return item.description == "Re-rent" && item.startValue == (primarylL1RerentValue == false ? "No" : "Yes");
    });
    if (this.filteredItem.length > 0) {
      primarylL1RerentPoints = parseFloat(this.filteredItem[0].calculation) || 0;
    }

    //Landlord2

    let primarylL2ProperNoticePoints = 0;
    const primarylL2ProperNoticeValue = this.frmTenant4.get('landlord_ref.lL2ProperNotice')?.value;
    this.filteredItem = this.formulaeData.filter((item: { startValue: string | number; description: string | number }) => {

      return item.description == "Proper Notice" && item.startValue == (primarylL2ProperNoticeValue == false ? "No" : "Yes");
    });
    if (this.filteredItem.length > 0) {
      primarylL2ProperNoticePoints = parseFloat(this.filteredItem[0].calculation) || 0;
    }
    let primarylL2NSFPoints = parseFloat(this.frmTenant4.get('landlord_ref.lL2NSF')?.value) || 0;
    let primarylL2LatePaymentsPoints = parseFloat(this.frmTenant4.get('landlord_ref.lL2LatePayments')?.value) || 0;
    let primarylL2PaymentOrVacantNoticesPoints = parseFloat(this.frmTenant4.get('landlord_ref.lL2PaymentOrVacantNotices')?.value) || 0;
    let primarylL2TendayComplyNoticePoints = parseFloat(this.frmTenant4.get('landlord_ref.lL2TendayComplyNotice')?.value) || 0;
    let primarylL2HOAViolationsPoints = parseFloat(this.frmTenant4.get('landlord_ref.lL2HOAViolations')?.value) || 0;
    let primarylL2PropertyCleanlinessPoints = 0;
    const primarylL2PropertyCleanlinessValue = this.frmTenant4.get('landlord_ref.lL2PropertyCleanliness')?.value;
    this.filteredItem = this.formulaeData.filter((item: { startValue: string | number; description: string | number }) => {

      return item.description == "Property Cleanliness" && item.startValue == (primarylL2PropertyCleanlinessValue == false ? "Good/Fair" : "Poor");
    });
    if (this.filteredItem.length > 0) {
      primarylL2PropertyCleanlinessPoints = parseFloat(this.filteredItem[0].calculation) || 0;
    }
    let primarylL2RerentPoints = 0;
    const primarylL2RerentValue = this.frmTenant4.get('landlord_ref.lL2Rerent')?.value;
    this.filteredItem = this.formulaeData.filter((item: { startValue: string | number; description: string | number }) => {

      return item.description == "Re-rent" && item.startValue == (primarylL2RerentValue == false ? "No" : "Yes");
    });
    if (this.filteredItem.length > 0) {
      primarylL2RerentPoints = parseFloat(this.filteredItem[0].calculation) || 0;
    }
    this.frmTenant4.patchValue({
      landlord_ref: {

        rentalReferancePoints: this.formatNumber(primaryLLRentalReferancePoints),
        lL1ProperNoticePoints: this.formatNumber(primarylL1ProperNoticePoints),
        lL1NSFPoints: this.formatNumber(primarylL1NSFPoints),
        lL1LatePaymentsPoints: this.formatNumber(primarylL1LatePaymentPoints),
        lL1PaymentOrVacantNoticesPoints: this.formatNumber(primarylL1PaymentOrVacantNoticesPoints),
        lL1TendayComplyNoticePoints: this.formatNumber(primarylL1TendayComplyNoticePoints),
        lL1HOAViolationsPoints: this.formatNumber(primarylL1HOAViolationsPoints),
        lL1PropertyCleanlinessPoints: this.formatNumber(primarylL1PropertyCleanlinessPoints),
        lL1RerentPoints: this.formatNumber(primarylL1RerentPoints),
        lL2ProperNoticePoints: this.formatNumber(primarylL2ProperNoticePoints),
        lL2NSFPoints: this.formatNumber(primarylL2NSFPoints),
        lL2LatePaymentsPoints: this.formatNumber(primarylL2LatePaymentsPoints),
        lL2PaymentOrVacantNoticesPoints: this.formatNumber(primarylL2PaymentOrVacantNoticesPoints),
        lL2TendayComplyNoticePoints: this.formatNumber(primarylL2TendayComplyNoticePoints),
        lL2HOAViolationsPoints: this.formatNumber(primarylL2HOAViolationsPoints),
        lL2PropertyCleanlinessPoints: this.formatNumber(primarylL2PropertyCleanlinessPoints),
        lL2RerentPoints: this.formatNumber(primarylL2RerentPoints),

      }
    })
    this.calculateT4TotalPoints();
  }

  calculateT4Pets() {

    let primarynoOfCatsCompanionsPoints = 0;
    const primarynoOfCatsCompanionsValue = parseFloat(this.frmTenant4.get('pets.noOfCatsCompanions')?.value) || 0;
    const primarynoOfCatsCompanionValue = this.frmTenant4.get('pets.noOfCatsCompanion')?.value;
    if (primarynoOfCatsCompanionValue) {
      primarynoOfCatsCompanionsPoints = 0;
    }
    else {
      primarynoOfCatsCompanionsPoints = 500 * primarynoOfCatsCompanionsValue;
    }
    let primarynoOfLargeDogsCompanionsPoints = 0;
    const primarynoOfLargeDogsCompanionsValue = parseFloat(this.frmTenant4.get('pets.noOfLargeDogsCompanions')?.value) || 0;
    const primarynoOfLargeDogsCompanionValue = this.frmTenant4.get('pets.noOfLargeDogsCompanion')?.value;
    if (primarynoOfLargeDogsCompanionValue) {
      primarynoOfLargeDogsCompanionsPoints = 0;
    }
    else {
      primarynoOfLargeDogsCompanionsPoints = 800 * primarynoOfLargeDogsCompanionsValue;
    }
    let primarynoOfSmallDogsCompanionsPoints = 0;
    const primarynoOfSmallDogsCompanionsValue = parseFloat(this.frmTenant4.get('pets.noOfSmallDogsCompanions')?.value) || 0;
    const primarynoOfSmallDogsCompanionValue = this.frmTenant4.get('pets.noOfSmallDogsCompanion')?.value;
    if (primarynoOfSmallDogsCompanionValue) {
      primarynoOfSmallDogsCompanionsPoints = 0;
    }
    else {
      primarynoOfSmallDogsCompanionsPoints = 500 * primarynoOfSmallDogsCompanionsValue;
    }
    this.frmTenant4.patchValue({
      pets: {

        noOfCatsCompanionPoints: this.formatNumber(primarynoOfCatsCompanionsPoints),
        noOfLargeDogsCompanionPoints: this.formatNumber(primarynoOfLargeDogsCompanionsPoints),
        noOfSmallDogsCompanionPoints: this.formatNumber(primarynoOfSmallDogsCompanionsPoints),


      }
    })
    this.calculateT4TotalPoints();
  }

  calculateT4TotalPoints() {


    let totalPoints = 0, finalApprove = false, totalDeposit = 0, petDeposit = 0, AddDeposit = 0, DepositDue = 0;
    const applicantTypeId = parseFloat(this.frmTenant4.get('applicantTypeId')?.value) || 0;
    const propertyTypeId = parseFloat(this.frmTenant4.get('propertyTypeId')?.value) || 0;
    const standardDepositProperty = parseFloat(this.frmTenant4.get('standardDepositProperty')?.value) || 0;
    const depositToHold = parseFloat(this.frmTenant4.get('credit_summary.depositToHold')?.value) || 0;
    const depositApproved = parseFloat(this.frmTenant4.get('credit_summary.depositApproved')?.value) || 0;

    let noOfCatsCompanionPoints = parseFloat(this.frmTenant4.get('pets.noOfCatsCompanionPoints')?.value) || 0;
    let noOfLargeDogsCompanionPoints = parseFloat(this.frmTenant4.get('pets.noOfLargeDogsCompanionPoints')?.value) || 0;
    let noOfSmallDogsCompanionPoints = parseFloat(this.frmTenant4.get('pets.noOfSmallDogsCompanionPoints')?.value) || 0;

    // Create an array of field names
    const fieldNames = [
      'credit_summary.creditScorePoints',
      'credit_summary.creditScoreAvailablePoints',
      'credit_summary.collectionAccountsPoints',
      'credit_summary.propertyRelatedHousingRecordPoints',
      'credit_summary.bankruptcyPoints',
      'credit_summary.bankRuptyActivePoints',
      'credit_summary.liensRepossessionsPoints',
      'credit_summary.evectionHistoryPoints',
      'credit_summary.class1FeloniesPoints',
      'credit_summary.class2FeloniesPoints',
      'credit_summary.class1MisdemeanersPoints',
      'credit_summary.class2MisdemeanersPoints',
      'landlord_ref.rentalReferancePoints',
      'landlord_ref.lL1ProperNoticePoints',
      'landlord_ref.lL1NSFPoints',
      'landlord_ref.lL1LatePaymentsPoints',
      'landlord_ref.lL1PaymentOrVacantNoticesPoints',
      'landlord_ref.lL1TendayComplyNoticePoints',
      'landlord_ref.lL1HOAViolationsPoints',
      'landlord_ref.lL1PropertyCleanlinessPoints',
      'landlord_ref.lL1RerentPoints',
      'landlord_ref.lL2ProperNoticePoints',
      'landlord_ref.lL2NSFPoints',
      'landlord_ref.lL2LatePaymentsPoints',
      'landlord_ref.lL2PaymentOrVacantNoticesPoints',
      'landlord_ref.lL2TendayComplyNoticePoints',
      'landlord_ref.lL2HOAViolationsPoints',
      'landlord_ref.lL2PropertyCleanlinessPoints',
      'landlord_ref.lL2RerentPoints',
      'landlord_ref.noOfCatsCompanionPoints',
      'landlord_ref.noOfLargeDogsCompanionPoints',
      'landlord_ref.noOfSmallDogsCompanionPoints',
    ];

    // Create an array of values by mapping over the field names and extracting values
    const values = fieldNames.map(fieldName =>
      parseFloat(this.frmTenant4.get(fieldName)?.value) || 0
    );

    totalPoints = values.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const maxValue = Math.max(...values);


    //final approval
    this.filteredItem = this.formulaeData.filter((item: { startValue: string | number; endValue: string | number; propertyTypeId: string | number; description: string | number }) => {
      const startValue = +item.startValue; // Convert to number
      const endValue = +item.endValue;
      return item.description == "Deposit Approved" && item.propertyTypeId == propertyTypeId && startValue <= totalPoints && totalPoints <= endValue;
    });
    if (this.filteredItem.length > 0) {
      finalApprove = this.filteredItem[0].calculation == "Yes" ? true : false;

    }


    //pet deposit
    petDeposit = noOfCatsCompanionPoints + noOfLargeDogsCompanionPoints + noOfSmallDogsCompanionPoints;

    //total deposit
    totalDeposit = standardDepositProperty + maxValue + petDeposit;

    //additional deposit
    AddDeposit = totalDeposit - standardDepositProperty;

    //balance deposit due

    DepositDue = totalDeposit - depositToHold;

    this.frmTenant4.patchValue({
      points_summary: {

        totalPoints: this.formatNumber(totalPoints),
        finalApproval: finalApprove,
        totalDeposit: this.formatNumber(totalDeposit),
        depositToHoldPaid: this.formatNumber(depositToHold),
        petDeposit: this.formatNumber(petDeposit),
        additionalDeposit: this.formatNumber(AddDeposit),
        balanceDepositDue: this.formatNumber(DepositDue),
      }
    })

  }


  getScroreSheetByApplicantId(snapid: any, sno: any) {

    this._userservice.GetScroreSheetByApplicantId(this.snapid, sno).subscribe((data) => {


      this.result = data
      if (this.result.length == 0)
        return;
      if (sno == '4') {
        this.frmTenant = this.frmTenant4;
      }
      this.tenantId = this.result[0].tenantId,

        this.frmTenant.patchValue({
          // firstname: this.result[0].firstname,

          // firstname: this.result[0].firstname,
          tenantId: this.result[0].tenantId,
          tenantSNo: sno,
          applicantName: this.result[0].applicantName,
          property: this.result[0].property,
          applicantType: this.result[0].applicantType,
          applicantTypeId: this.result[0].applicantTypeId,
          city: this.result[0].city,
          state: this.result[0].state,
          zip: this.result[0].zip,
          monthlyRent: this.result[0].monthlyRent,
          section8Rent: this.result[0].section8Rent,
          standardDepositProperty: this.result[0].standardDepositProperty,
          petDeposit: this.result[0].petDeposit,
          propertyTypeId: this.result[0].propertyTypeId,

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
          // pets: {
          //   petApprovedLandlordReferance1: this.result[0].petApprovedLandlordReferance1,
          //   petApprovedLandlordReferance2: this.result[0].petApprovedLandlordReferance2,


          //   noOfCatsCompanion: this.result[0].noOfCatsCompanion,
          //   noOfCatsCompanions: this.result[0].noOfCatsCompanions,
          //   noOfLargeDogsCompanion: this.result[0].noOfLargeDogsCompanion,
          //   noOfLargeDogsCompanions: this.result[0].noOfLargeDogsCompanions,
          //   noOfSmallDogsCompanion: this.result[0].noOfSmallDogsCompanion,
          //   noOfSmallDogsCompanions: this.result[0].noOfSmallDogsCompanions,
          //   // ... add other properties
          // },
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
  isValidNumber(value: any): boolean {
    // Check if the value is a valid number and not NaN
    return typeof value === 'number' && !isNaN(value);
  }
  formatNumber(value: any): string | null {
    if (this.isValidNumber(value)) {
      return value.toFixed(2);
    } else {
      return null;
    }
  }

  getFormulae() {

    this._userservice.GetFormulae()
      .subscribe((data: any) => {

        this.formulaeData = data;
      });
  }
  onPrimaryTenantSubmiT4() {
    alert("working onPrimaryTenantSubmiT4")
  }
  onTenantSubmit(tenantSNo: any) {


    if (tenantSNo == '4') {
      this.frmTenant = this.frmTenant4;
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
      // ,
      // pets: {
      //   createdBy: this.currentUser.id.toString(),

      // }
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
          tenantSNo: tenantSNo,
          tenantId: this.tenantId
        },
        credit_summary: {
          applicantId: this.snapid.toString(),
          tenantSNo: tenantSNo,
          tenantId: this.tenantId
        }
        ,
        landlord_ref: {
          applicantId: this.snapid.toString(),
          tenantSNo: tenantSNo,
          tenantId: this.tenantId
        }
        ,
        rental_history: {
          applicantId: this.snapid.toString(),
          tenantSNo: tenantSNo,
          tenantId: this.tenantId
        }
        // ,
        // pets: {
        //   applicantId: this.snapid.toString(),
        //   tenantSNo: tenantSNo
        // }
        ,
        points_summary: {
          applicantId: this.snapid.toString(),
          tenantSNo: tenantSNo,
          tenantId: this.tenantId
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
              // ,
              // pets: {
              //   applicantId: this.snapid ? this.snapid : this.applicantId.toString(),
              //   tenantSNo: tenantSNo,
              //   tenantId: this.tenantId
              // }
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
    // else if (this.tabIndex == 5) {


    //   this._userservice.CreatePets(this.frmTenant.value.pets).subscribe(
    //     (data) => {

    //     },
    //     (error) => {
    //       console.error('Error creating pets:', error);
    //     }
    //   );
    // }
    else if (this.tabIndex == 5) {


      this._userservice.CreatePointsSummary(this.frmTenant.value.points_summary).subscribe(
        (data) => {

        },
        (error) => {
          console.error('Error creating points summary:', error);
        }
      );
    }
    if (this.tabIndex < 5) {
      this.tabIndex++;
    }

    // }
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

}
