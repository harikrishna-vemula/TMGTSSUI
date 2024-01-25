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
  selector: 'app-cosigner',
  templateUrl: './cosigner.component.html',
  styleUrls: ['./cosigner.component.scss']
})
export class CosignerComponent {
  isLinear = false;
  stepper: any; currentUser: any; result: any
  snapid: any;
  applicantId: number = 0; frmTenant: any; tenantId: number = 0;
  frmTenant5!: FormGroup;
  formulaeData: any; formulaValue?: string; filteredItem: any; dateToCheck?: Date;
  constructor(private fb: FormBuilder, private authservice: AuthService, private router: Router, private _userservice: UsersService, private activate: ActivatedRoute) {
    this.authservice.currentUser.subscribe(x => this.currentUser = x);
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
  }

  initForm(): void {
    this.frmTenant5 = this.fb.group({
      // basicinfo: this.fb.group({      
      // firstCtrl:['', ],
      applicantName: ['',],
      // applicantType: ['',  ],
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
      // paystubRecent: ['',  ],
      applicantTypeId: ['',],
      petDeposit:['',],
      propertyTypeId: ['',],
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
        creditScorePoints: [0,  ],
        creditScoreAvailable: [Boolean,],
         creditScoreAvailablePoints: [0, ],
        // accountPastDue60Days: ['', ],
        collectionAccounts: ['',],
        collectionAccountsPoints: [0,],
        collectionMedicalAccountsPoints: [0,],
        medicalCollections: ['',],
        propertyRelatedHousingRecord: [Boolean,],
         propertyRelatedHousingRecordPoints: [0, ],
        bankruptcy: [Number],
        bankruptcyPoints: [0,],
        bankRuptyActive: [Boolean,],
        bankRuptyActivePoints: [0,],
        liensRepossessions: [Date,],
        liensRepossessionsPoints: [0, ],
        evectionHistoryPoints: [0,  ],
        evectionHistory: [null],
        class1Felonies: [Boolean,],
        class1FeloniesPoints: [0, ],
        class2Felonies: [Date,],
        class2FeloniesPoints : [0, ],
        class1Misdemeaners: [Date,],
        class1MisdemeanersPoints: [0, ],
        class2Misdemeaners: [Date,],
        class2MisdemeanersPoints: [0,],
        depositApproved: [Boolean,],
        // depositToHold: [''],
        applicantId: ['',],
        tenantSNo: ['',],
        tenantId: [Number],
        createdBy: ['',],
        totalCreditSummaryPoints: [0,]

      }),
      landlord_ref: this.fb.group({
        rentalReferance: [Boolean,],
        lL1LandlordType: [Number],
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
        applicantId: ['',],
        tenantSNo: ['',],
        tenantId: [Number],
        createdBy: ['',],

      }),

      points_summary: this.fb.group({
       // totalPoints: ['',  ],
        finalApproval: [Boolean,],
        // totalDeposit: ['',  ],
        // depositToHoldPaid: ['',  ],
        // petDeposit: ['',  ],
        // additionalDeposit: ['',  ],
        // balanceDepositDue: ['',  ],
        applicantId: ['',],
        tenantSNo: ['',],
        tenantId: [Number],
        createdBy: ['',],
        balanceDepositDuePoints: [0,],
      }),
    })

  }
  ngOnInit() {
    this.getFormulae();
    this.initForm();
    this.subscribeT5Controls();
    this.frmTenant5.get('applicantName')?.setValue('');

    this.snapid = this.activate.snapshot.paramMap.get('id') || '';

    if (this.snapid) {

      this.getScroreSheetByApplicantId(this.snapid, 5);

    }

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
  subscribeT5Controls() {

    //Basic details
    this.frmTenant5.get('monthlyRent')?.valueChanges.subscribe(() => this.calculateT5IncomeCriteria());
    this.frmTenant5.get('section8Rent')?.valueChanges.subscribe(() => this.calculateT5IncomeCriteria());
    this.frmTenant5.get('applicantTypeId')?.valueChanges.subscribe(() => this.calculateT5IncomeCriteria());
    this.frmTenant5.get('propertyTypeId')?.valueChanges.subscribe(() => this.calculateT5IncomeCriteria());
    this.frmTenant5.get('standardDepositProperty')?.valueChanges.subscribe(() => this.calculateT5IncomeCriteria());

    this.frmTenant5.get('incom_verification.paystubRecent')?.valueChanges.subscribe(() => this.calculateT5IncomeCriteria());
    this.frmTenant5.get('incom_verification.ytD_Earnings')?.valueChanges.subscribe(() => this.calculateT5IncomeCriteria());
    this.frmTenant5.get('incom_verification.secondPayStub')?.valueChanges.subscribe(() => this.calculateT5IncomeCriteria());
    this.frmTenant5.get('incom_verification.bankStatement')?.valueChanges.subscribe(() => this.calculateT5IncomeCriteria());
    this.frmTenant5.get('credit_summary.creditScore')?.valueChanges.subscribe(() => this.calculateT5CreditSummary());
    this.frmTenant5.get('credit_summary.creditScoreAvailable')?.valueChanges.subscribe(() => this.calculateT5CreditSummary());
    this.frmTenant5.get('credit_summary.collectionAccounts')?.valueChanges.subscribe(() => this.calculateT5CreditSummary());
    this.frmTenant5.get('credit_summary.medicalCollections')?.valueChanges.subscribe(() => this.calculateT5CreditSummary());
    this.frmTenant5.get('credit_summary.propertyRelatedHousingRecord')?.valueChanges.subscribe(() => this.calculateT5CreditSummary());
    this.frmTenant5.get('credit_summary.bankruptcy')?.valueChanges.subscribe(() => this.calculateT5CreditSummary());
    this.frmTenant5.get('credit_summary.bankRuptyActive')?.valueChanges.subscribe(() => this.calculateT5CreditSummary());
    this.frmTenant5.get('credit_summary.liensRepossessions')?.valueChanges.subscribe(() => this.calculateT5CreditSummary());
    this.frmTenant5.get('credit_summary.evectionHistory')?.valueChanges.subscribe(() => this.calculateT5CreditSummary());
    this.frmTenant5.get('credit_summary.class1Felonies')?.valueChanges.subscribe(() => this.calculateT5CreditSummary());
    this.frmTenant5.get('credit_summary.class2Felonies')?.valueChanges.subscribe(() => this.calculateT5CreditSummary());
    this.frmTenant5.get('credit_summary.class1Misdemeaners')?.valueChanges.subscribe(() => this.calculateT5CreditSummary());
    this.frmTenant5.get('credit_summary.class2Misdemeaners')?.valueChanges.subscribe(() => this.calculateT5CreditSummary());

    this.frmTenant5.get('landlord_ref.rentalReferance')?.valueChanges.subscribe(() => this.calculateT5LandlordReferances());
    this.frmTenant5.get('landlord_ref.lL1ProperNotice')?.valueChanges.subscribe(() => this.calculateT5LandlordReferances());
    this.frmTenant5.get('landlord_ref.lL1NSF')?.valueChanges.subscribe(() => this.calculateT5LandlordReferances());
    this.frmTenant5.get('landlord_ref.lL1LatePayments')?.valueChanges.subscribe(() => this.calculateT5LandlordReferances());
    this.frmTenant5.get('landlord_ref.lL1PaymentOrVacantNotices')?.valueChanges.subscribe(() => this.calculateT5LandlordReferances());
    this.frmTenant5.get('landlord_ref.lL1TendayComplyNotice')?.valueChanges.subscribe(() => this.calculateT5LandlordReferances());
    this.frmTenant5.get('landlord_ref.lL1HOAViolations')?.valueChanges.subscribe(() => this.calculateT5LandlordReferances());
    this.frmTenant5.get('landlord_ref.lL1PropertyCleanliness')?.valueChanges.subscribe(() => this.calculateT5LandlordReferances());
    this.frmTenant5.get('landlord_ref.lL1Rerent')?.valueChanges.subscribe(() => this.calculateT5LandlordReferances());
    this.frmTenant5.get('landlord_ref.lL2ProperNotice')?.valueChanges.subscribe(() => this.calculateT5LandlordReferances());
    this.frmTenant5.get('landlord_ref.lL2NSF')?.valueChanges.subscribe(() => this.calculateT5LandlordReferances());
    this.frmTenant5.get('landlord_ref.lL2LatePayments')?.valueChanges.subscribe(() => this.calculateT5LandlordReferances());
    this.frmTenant5.get('landlord_ref.lL2PaymentOrVacantNotices')?.valueChanges.subscribe(() => this.calculateT5LandlordReferances());
    this.frmTenant5.get('landlord_ref.lL2TendayComplyNotice')?.valueChanges.subscribe(() => this.calculateT5LandlordReferances());
    this.frmTenant5.get('landlord_ref.lL2HOAViolations')?.valueChanges.subscribe(() => this.calculateT5LandlordReferances());
    this.frmTenant5.get('landlord_ref.lL2PropertyCleanliness')?.valueChanges.subscribe(() => this.calculateT5LandlordReferances());
    this.frmTenant5.get('landlord_ref.lL2Rerent')?.valueChanges.subscribe(() => this.calculateT5LandlordReferances());
    this.frmTenant5.get('pets.noOfLargeDogsCompanion')?.valueChanges.subscribe(() => this.calculateT5Pets());
    this.frmTenant5.get('pets.noOfCatsCompanions')?.valueChanges.subscribe(() => this.calculateT5Pets());
    this.frmTenant5.get('pets.noOfLargeDogsCompanion')?.valueChanges.subscribe(() => this.calculateT5Pets());
    this.frmTenant5.get('pets.noOfLargeDogsCompanions')?.valueChanges.subscribe(() => this.calculateT5Pets());
    this.frmTenant5.get('pets.noOfSmallDogsCompanion')?.valueChanges.subscribe(() => this.calculateT5Pets());
    this.frmTenant5.get('pets.noOfSmallDogsCompanions')?.valueChanges.subscribe(() => this.calculateT5Pets());

  }

  calculateT5IncomeCriteria() {

    const monthlyRentValue = parseFloat(this.frmTenant5.get('monthlyRent')?.value) || 0;
    const section8RentValue = parseFloat(this.frmTenant5.get('section8Rent')?.value) || 0;
    const applicantTypeId = parseFloat(this.frmTenant5.get('applicantTypeId')?.value) || 0;
    const propertyTypeId = parseFloat(this.frmTenant5.get('propertyTypeId')?.value) || 0;

    let incomeformula = 0;
    this.filteredItem = this.formulaeData.filter((item: { applicantTypeId: string | number; propertyTypeId: string | number; description: string | number }) => {

      return item.description == "Income Criteria" && item.applicantTypeId == applicantTypeId && item.propertyTypeId == propertyTypeId;
    });
    if (this.filteredItem.length > 0) {
      incomeformula = parseFloat(this.filteredItem[0].calculation) || 0;
    }


    //Primary Tenant
    const primarypaystubRecentValue = parseFloat(this.frmTenant5.get('incom_verification.paystubRecent')?.value) || 0;
    const primaryytD_EarningsValue = parseFloat(this.frmTenant5.get('incom_verification.ytD_Earnings')?.value) || 0;
    const primarysecondPayStubValue = parseFloat(this.frmTenant5.get('incom_verification.secondPayStub')?.value) || 0;
    const primarybankStatementValue = parseFloat(this.frmTenant5.get('incom_verification.bankStatement')?.value) || 0;

    const paystubRecentMonthly = (primarypaystubRecentValue / primaryytD_EarningsValue);
    const bankStatementMonthly = (primarysecondPayStubValue / primarybankStatementValue);
    const paystubMonthlyRentPoints = ((primarypaystubRecentValue / primaryytD_EarningsValue) / monthlyRentValue);
    const paystubsection8RentPoints = ((primarypaystubRecentValue / primaryytD_EarningsValue) / section8RentValue);
    const secondPaystubMonthlyRentPoints = ((primarysecondPayStubValue / primarybankStatementValue) / monthlyRentValue);
    const secondPaystubsection8RentPoints = ((primarysecondPayStubValue / primarybankStatementValue) / section8RentValue);
    const totalPayStubPoints = (paystubMonthlyRentPoints + paystubsection8RentPoints + secondPaystubMonthlyRentPoints + secondPaystubsection8RentPoints);

    this.frmTenant5.patchValue({
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

  calculateT5CreditSummary() {

    const applicantTypeId = parseFloat(this.frmTenant5.get('applicantTypeId')?.value) || 0;
    const propertyTypeId = parseFloat(this.frmTenant5.get('propertyTypeId')?.value) || 0;
    const primarycreditScoreValue = parseFloat(this.frmTenant5.get('credit_summary.creditScore')?.value) || 0;
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
    const primarycreditScoreAvailableValue = this.frmTenant5.get('credit_summary.creditScoreAvailable')?.value;
    this.filteredItem = this.formulaeData.filter((item: { startValue: string | number; propertyTypeId: string | number; description: string | number }) => {

      return item.description == "Credit Score Available" && item.propertyTypeId == propertyTypeId && item.startValue == (primarycreditScoreAvailableValue == false ? "No" : "Yes");
    });
    if (this.filteredItem.length > 0) {
      primarycreditScroreAvaiablePoints = parseFloat(this.filteredItem[0].calculation) || 0;
    }

    //collection accounts
    let primaryCollectionAccountsPoints = 0; let primaryCMAccountsPoints = 0;
    const primaryCollectionAccountsValue = parseFloat(this.frmTenant5.get('credit_summary.collectionAccounts')?.value) || 0;
    const primaryMedicalCollectionsValue = parseFloat(this.frmTenant5.get('credit_summary.medicalCollections')?.value) || 0;
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
    const primaryPropertyRelatedHousingRecordValue = this.frmTenant5.get('credit_summary.propertyRelatedHousingRecord')?.value;
    this.filteredItem = this.formulaeData.filter((item: { startValue: string | number; description: string | number }) => {

      return item.description == "Housing Records" && item.startValue == (primaryPropertyRelatedHousingRecordValue == false ? "No" : "Yes");
    });
    if (this.filteredItem.length > 0) {
      primaryPropertyRelatedHousingRecordPoints = parseFloat(this.filteredItem[0].calculation) || 0;
    }
    //Bankruptcy
    let primaryBankRuptcyDischargedPoints = 0; let primaryBankRuptcyActivePoints = 0;
    const primaryBankruptcyValue = parseFloat(this.frmTenant5.get('credit_summary.bankruptcy')?.value) || 0;
    primaryBankRuptcyDischargedPoints = primaryBankruptcyValue
    const primaryBankRuptyActiveValue = this.frmTenant5.get('credit_summary.bankRuptyActive')?.value;
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
    const primaryLiensRepossessionsValue = this.frmTenant5.get('credit_summary.liensRepossessions')?.value;
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

    const primaryevectionHistoryValue = this.frmTenant5.get('credit_summary.evectionHistory')?.value;
    const primaryclass2FeloniesValue = this.frmTenant5.get('credit_summary.class2Felonies')?.value;
    const primaryclass1FeloniesValue = this.frmTenant5.get('credit_summary.class1Felonies')?.value;
    const primaryclass1MisdemeanersValue = this.frmTenant5.get('credit_summary.class1Misdemeaners')?.value;
    const primaryclass2MisdemeanersValue = this.frmTenant5.get('credit_summary.class2Misdemeaners')?.value;

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

    const standardDepositProperty = parseFloat(this.frmTenant5.get('standardDepositProperty')?.value) || 0;
    const depositToHold = 0.7 * standardDepositProperty;

    this.frmTenant5.patchValue({
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
    this.calculateT5TotalPoints();
  }

  calculateT5LandlordReferances() {

    const monthlyRentValue = parseFloat(this.frmTenant5.get('monthlyRent')?.value) || 0;
    //Rental Referance
    let primaryLLRentalReferancePoints = 0;
    const primaryLLRentalReferanceValue = this.frmTenant5.get('landlord_ref.rentalReferance')?.value;
    if (primaryLLRentalReferanceValue == true) {
      primaryLLRentalReferancePoints = 0;
    }
    else {
      primaryLLRentalReferancePoints = monthlyRentValue;
    }

    //Landlord1
    let primarylL1ProperNoticePoints = 0;
    const primarylL1ProperNoticeValue = this.frmTenant5.get('landlord_ref.lL1ProperNotice')?.value;
    this.filteredItem = this.formulaeData.filter((item: { startValue: string | number; description: string | number }) => {

      return item.description == "Proper Notice" && item.startValue == (primarylL1ProperNoticeValue == false ? "No" : "Yes");
    });
    if (this.filteredItem.length > 0) {
      primarylL1ProperNoticePoints = parseFloat(this.filteredItem[0].calculation) || 0;
    }
    let primarylL1NSFPoints = parseFloat(this.frmTenant5.get('landlord_ref.lL1NSF')?.value) || 0;
    let primarylL1LatePaymentPoints = parseFloat(this.frmTenant5.get('landlord_ref.lL1LatePayments')?.value) || 0;
    let primarylL1PaymentOrVacantNoticesPoints = parseFloat(this.frmTenant5.get('landlord_ref.lL1PaymentOrVacantNotices')?.value) || 0;
    let primarylL1TendayComplyNoticePoints = parseFloat(this.frmTenant5.get('landlord_ref.lL1TendayComplyNotice')?.value) || 0;
    let primarylL1HOAViolationsPoints = parseFloat(this.frmTenant5.get('landlord_ref.lL1HOAViolations')?.value) || 0;
    let primarylL1PropertyCleanlinessPoints = 0;
    const primarylL1PropertyCleanlinessValue = this.frmTenant5.get('landlord_ref.lL1PropertyCleanliness')?.value;
    this.filteredItem = this.formulaeData.filter((item: { startValue: string | number; description: string | number }) => {

      return item.description == "Property Cleanliness" && item.startValue == (primarylL1PropertyCleanlinessValue == false ? "Good/Fair" : "Poor");
    });
    if (this.filteredItem.length > 0) {
      primarylL1PropertyCleanlinessPoints = parseFloat(this.filteredItem[0].calculation) || 0;
    }
    let primarylL1RerentPoints = 0;
    const primarylL1RerentValue = this.frmTenant5.get('landlord_ref.lL1Rerent')?.value;
    this.filteredItem = this.formulaeData.filter((item: { startValue: string | number; description: string | number }) => {

      return item.description == "Re-rent" && item.startValue == (primarylL1RerentValue == false ? "No" : "Yes");
    });
    if (this.filteredItem.length > 0) {
      primarylL1RerentPoints = parseFloat(this.filteredItem[0].calculation) || 0;
    }

    //Landlord2

    let primarylL2ProperNoticePoints = 0;
    const primarylL2ProperNoticeValue = this.frmTenant5.get('landlord_ref.lL2ProperNotice')?.value;
    this.filteredItem = this.formulaeData.filter((item: { startValue: string | number; description: string | number }) => {

      return item.description == "Proper Notice" && item.startValue == (primarylL2ProperNoticeValue == false ? "No" : "Yes");
    });
    if (this.filteredItem.length > 0) {
      primarylL2ProperNoticePoints = parseFloat(this.filteredItem[0].calculation) || 0;
    }
    let primarylL2NSFPoints = parseFloat(this.frmTenant5.get('landlord_ref.lL2NSF')?.value) || 0;
    let primarylL2LatePaymentsPoints = parseFloat(this.frmTenant5.get('landlord_ref.lL2LatePayments')?.value) || 0;
    let primarylL2PaymentOrVacantNoticesPoints = parseFloat(this.frmTenant5.get('landlord_ref.lL2PaymentOrVacantNotices')?.value) || 0;
    let primarylL2TendayComplyNoticePoints = parseFloat(this.frmTenant5.get('landlord_ref.lL2TendayComplyNotice')?.value) || 0;
    let primarylL2HOAViolationsPoints = parseFloat(this.frmTenant5.get('landlord_ref.lL2HOAViolations')?.value) || 0;
    let primarylL2PropertyCleanlinessPoints = 0;
    const primarylL2PropertyCleanlinessValue = this.frmTenant5.get('landlord_ref.lL2PropertyCleanliness')?.value;
    this.filteredItem = this.formulaeData.filter((item: { startValue: string | number; description: string | number }) => {

      return item.description == "Property Cleanliness" && item.startValue == (primarylL2PropertyCleanlinessValue == false ? "Good/Fair" : "Poor");
    });
    if (this.filteredItem.length > 0) {
      primarylL2PropertyCleanlinessPoints = parseFloat(this.filteredItem[0].calculation) || 0;
    }
    let primarylL2RerentPoints = 0;
    const primarylL2RerentValue = this.frmTenant5.get('landlord_ref.lL2Rerent')?.value;
    this.filteredItem = this.formulaeData.filter((item: { startValue: string | number; description: string | number }) => {

      return item.description == "Re-rent" && item.startValue == (primarylL2RerentValue == false ? "No" : "Yes");
    });
    if (this.filteredItem.length > 0) {
      primarylL2RerentPoints = parseFloat(this.filteredItem[0].calculation) || 0;
    }
    this.frmTenant5.patchValue({
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
    this.calculateT5TotalPoints();
  }

  calculateT5Pets() {

    let primarynoOfCatsCompanionsPoints = 0;
    const primarynoOfCatsCompanionsValue = parseFloat(this.frmTenant5.get('pets.noOfCatsCompanions')?.value) || 0;
    const primarynoOfCatsCompanionValue = this.frmTenant5.get('pets.noOfCatsCompanion')?.value;
    if (primarynoOfCatsCompanionValue) {
      primarynoOfCatsCompanionsPoints = 0;
    }
    else {
      primarynoOfCatsCompanionsPoints = 500 * primarynoOfCatsCompanionsValue;
    }
    let primarynoOfLargeDogsCompanionsPoints = 0;
    const primarynoOfLargeDogsCompanionsValue = parseFloat(this.frmTenant5.get('pets.noOfLargeDogsCompanions')?.value) || 0;
    const primarynoOfLargeDogsCompanionValue = this.frmTenant5.get('pets.noOfLargeDogsCompanion')?.value;
    if (primarynoOfLargeDogsCompanionValue) {
      primarynoOfLargeDogsCompanionsPoints = 0;
    }
    else {
      primarynoOfLargeDogsCompanionsPoints = 800 * primarynoOfLargeDogsCompanionsValue;
    }
    let primarynoOfSmallDogsCompanionsPoints = 0;
    const primarynoOfSmallDogsCompanionsValue = parseFloat(this.frmTenant5.get('pets.noOfSmallDogsCompanions')?.value) || 0;
    const primarynoOfSmallDogsCompanionValue = this.frmTenant5.get('pets.noOfSmallDogsCompanion')?.value;
    if (primarynoOfSmallDogsCompanionValue) {
      primarynoOfSmallDogsCompanionsPoints = 0;
    }
    else {
      primarynoOfSmallDogsCompanionsPoints = 500 * primarynoOfSmallDogsCompanionsValue;
    }
    this.frmTenant5.patchValue({
      pets: {

        noOfCatsCompanionPoints: this.formatNumber(primarynoOfCatsCompanionsPoints),
        noOfLargeDogsCompanionPoints: this.formatNumber(primarynoOfLargeDogsCompanionsPoints),
        noOfSmallDogsCompanionPoints: this.formatNumber(primarynoOfSmallDogsCompanionsPoints),


      }
    })
    this.calculateT5TotalPoints();
  }

  calculateT5TotalPoints() {


    let totalPoints = 0, finalApprove = false, totalDeposit = 0, petDeposit = 0, AddDeposit = 0, DepositDue = 0;
    const applicantTypeId = parseFloat(this.frmTenant5.get('applicantTypeId')?.value) || 0;
    const propertyTypeId = parseFloat(this.frmTenant5.get('propertyTypeId')?.value) || 0;
    const standardDepositProperty = parseFloat(this.frmTenant5.get('standardDepositProperty')?.value) || 0;
    const depositToHold = parseFloat(this.frmTenant5.get('credit_summary.depositToHold')?.value) || 0;
    const depositApproved = parseFloat(this.frmTenant5.get('credit_summary.depositApproved')?.value) || 0;

    let noOfCatsCompanionPoints = parseFloat(this.frmTenant5.get('pets.noOfCatsCompanionPoints')?.value) || 0;
    let noOfLargeDogsCompanionPoints = parseFloat(this.frmTenant5.get('pets.noOfLargeDogsCompanionPoints')?.value) || 0;
    let noOfSmallDogsCompanionPoints = parseFloat(this.frmTenant5.get('pets.noOfSmallDogsCompanionPoints')?.value) || 0;

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
      parseFloat(this.frmTenant5.get(fieldName)?.value) || 0
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

    this.frmTenant5.patchValue({
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


  getFormulae() {

    this._userservice.GetFormulae()
      .subscribe((data: any) => {

        this.formulaeData = data;
      });
  }

  getScroreSheetByApplicantId(snapid: any, sno: any) {

    this._userservice.GetScroreSheetByApplicantId(this.snapid, sno).subscribe((data) => {


      this.result = data
      if (this.result.length==0)
        return;
      if (sno == '5') {
        this.frmTenant = this.frmTenant5;
      }


      this.frmTenant.patchValue({
        // firstname: this.result[0].firstname,

        // firstname: this.result[0].firstname,
        tenantId: this.result[0].tenantId,
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
          creditScorePoints: this.result[0].creditScorePoints,
          creditScoreAvailable: this.result[0].creditScoreAvailable,
          medicalCollections: this.result[0].medicalCollections,
          //creditScoreAvailable: this.result[0].creditScoreAvailable,
          //creditScoreAvailable: this.result[0].creditScoreAvailable,


          //creditScorePoints: [Number,  ],

           creditScoreAvailablePoints: ['', ],
          // accountPastDue60Days: ['', ],
          collectionAccounts: this.result[0].collectionAccounts,
           collectionAccountsPoints: ['', ],

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



        },


        points_summary: {
          // totalPoints: this.result[0].totalPoints,
          finalApproval: this.result[0].finalApproval,
          // totalDeposit: this.result[0].totalDeposit,
          // depositToHoldPaid: this.result[0].depositToHoldpaid,
          // petDeposit: this.result[0].petDeposit,
          // additionalDeposit: this.result[0].additionalDeposit,
          // balanceDepositDue: this.result[0].balanceDepositDue,
        },
      })


      // modifiedBy: this.currentUser.id
    })

  }



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

  onPrimaryTenantSubmit1() {
    alert("working onPrimaryTenantSubmit1")
  }
  onTenantSubmit(tenantSNo: any) {


    if (tenantSNo == '5') {
      this.frmTenant = this.frmTenant5;
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

      this._userservice.CreatePointsSummary(this.frmTenant.value.points_summary).subscribe(
        (data) => {

        },
        (error) => {
          console.error('Error creating points summary:', error);
        }
      );
    }
    if (this.tabIndex < 4) {
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
