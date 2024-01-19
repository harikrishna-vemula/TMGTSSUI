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
  constructor(private fb: FormBuilder, private authservice: AuthService, private router: Router, private _userservice: UsersService, private activate: ActivatedRoute) {
    this.authservice.currentUser.subscribe(x => this.currentUser = x);
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
  }

  frmTenant5 = this.fb.group({
    // basicinfo: this.fb.group({      
    // firstCtrl:['', ],
    applicantName: ['',  ],
    // applicantType: ['',  ],
    property: ['',  ],
    city: ['',  ],
    state: ['',  ],
    zip: ['',  ],
    monthlyRent: ['',  ],
    section8Rent: ['',  ],
    standardDepositProperty: ['',  ],
    // propertyTypeId: ['',  ],
    // propertyType: ['',  ],
    // applicantTypeId: ['',  ],
    // ptype: ['',  ],
    applicantId: ['',  ],
    tenantSNo: ['',  ],
    tenantId: [Number],
    // paystubRecent: ['',  ],
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
      // depositToHold: [''],
      applicantId: ['',  ],
      tenantSNo: ['',  ],
      tenantId: [Number],
      createdBy: ['',  ],

    }),
    landlord_ref: this.fb.group({
      rentalReferance: [Boolean,  ],
      lL1LandlordType: [Number],
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
      applicantId: ['',  ],
      tenantSNo: ['',  ],
      tenantId: [Number],
      createdBy: ['',  ],

    }),

    points_summary: this.fb.group({
      // totalPoints: ['',  ],
      finalApproval: [Boolean,  ],
      // totalDeposit: ['',  ],
      // depositToHoldPaid: ['',  ],
      // petDeposit: ['',  ],
      // additionalDeposit: ['',  ],
      // balanceDepositDue: ['',  ],
      applicantId: ['',  ],
      tenantSNo: ['',  ],
      tenantId: [Number],
      createdBy: ['',  ],
    }),
  })


  ngOnInit() {
    this.frmTenant5.get('applicantName')?.setValue('');

    this.snapid = this.activate.snapshot.paramMap.get('id') || '';

    if (this.snapid) {

      this.getScroreSheetByApplicantId(this.snapid, 5);

    }

  }
  getScroreSheetByApplicantId(snapid: any, sno: any) {

    this._userservice.GetScroreSheetByApplicantId(this.snapid, sno).subscribe((data) => {


      this.result = data
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
