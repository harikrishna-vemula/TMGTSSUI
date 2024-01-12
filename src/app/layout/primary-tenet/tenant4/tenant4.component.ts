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
  constructor(private fb: FormBuilder, private authservice: AuthService, private router: Router, private _userservice: UsersService, private activate: ActivatedRoute) {
    this.authservice.currentUser.subscribe(x => this.currentUser = x);
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
  }

  frmTenant4 = this.fb.group({
    // basicinfo: this.fb.group({      
    // firstCtrl:['',Validators.required],
    applicantName: ['', Validators.required],
    applicantType: [''],
    applicantTypeId: ['', Validators.required],
    property: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zip: ['', Validators.required],
    monthlyRent: ['', Validators.required],
    section8Rent: ['', Validators.required],
    standardDepositProperty: ['', Validators.required],
    // propertyTypeId: ['', Validators.required],
    // propertyType: ['', Validators.required],
    // applicantTypeId: ['', Validators.required],
    // ptype: ['', Validators.required],
    applicantId: ['', Validators.required],
    tenantSNo: ['', Validators.required],
    tenantId: [Number],
    paystubRecent: ['', Validators.required],    
    propertyTypeId: ['', Validators.required],
    createdBy: ['', Validators.required],

    // }),
    incom_verification: this.fb.group({
      paystubRecent: ['', Validators.required], //pay stub
      paystubRecentMonthly: ['', Validators.required], //monthly
      ytD_Earnings: ['', Validators.required], //results
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
      // lL1LandlordType: [Number, Validators.required],
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


      // lL2LandlordType: [Number, Validators.required],
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
    // pets: this.fb.group({
    //   petApprovedLandlordReferance1: ['', Validators.required],
    //   petApprovedLandlordReferance2: ['', Validators.required],
    //   noOfCatsCompanion: [Boolean, Validators.required],
    //   noOfCatsCompanions: ['', Validators.required],
    //   noOfLargeDogsCompanion: [Boolean, Validators.required],
    //   noOfLargeDogsCompanions: ['', Validators.required],
    //   noOfSmallDogsCompanion: [Boolean, Validators.required],
    //   noOfSmallDogsCompanions: ['', Validators.required],
    //   applicantId: ['', Validators.required],
    //   tenantSNo: ['', Validators.required],
    //   tenantId: [Number],
    // }),
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
    this.frmTenant4.get('applicantName')?.setValue('');

    this.snapid = this.activate.snapshot.paramMap.get('id') || '';

    if (this.snapid) {

      this.getScroreSheetByApplicantId(this.snapid, 4);

    }

  }
  getScroreSheetByApplicantId(snapid: any, sno: any) {

    this._userservice.GetScroreSheetByApplicantId(this.snapid, sno).subscribe((data) => {
   

      this.result = data
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
  onPrimaryTenantSubmit1() {
    alert("working onPrimaryTenantSubmit1")
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
