import { CdkStep } from '@angular/cdk/stepper';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-cosigner',
  templateUrl: './cosigner.component.html',
  styleUrls: ['./cosigner.component.scss']
})
export class CosignerComponent {
  isLinear = false;
  stepper: any;
  constructor(private fb: FormBuilder, private _http: UsersService) { }

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
    alert("working submit")
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
