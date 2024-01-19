import { Component } from '@angular/core';
import { CdkStep, StepperSelectionEvent } from '@angular/cdk/stepper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { UsersService } from 'src/app/users/users.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-approvalsummary',
  templateUrl: './approvalsummary.component.html',
  styleUrls: ['./approvalsummary.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class ApprovalsummaryComponent {

  coversheet1: any;
  approvalsummary1!: FormGroup;
  approvalSummaryForm: any; snapid: any;
  constructor(private fb: FormBuilder, private _userservice: UsersService, private activate: ActivatedRoute) { }
  ngOnInit() {
    this.snapid = this.activate.snapshot.paramMap.get('id') || '';

    if (this.snapid) {

      this.getApprovalSummaryByApplicantId(this.snapid);
      this.getCoverSheetbyapplicantId();

    }

    this.coversheet1 = this.fb.group({
      propertyManager: ['',],
      primaryTenant: ['',],
      tenant2: ['',],
      tenant3: ['',],
      tenant4: ['',],
      propertyAddress: ['',],
      city: ['',],
      state: ['',],
      unitCode: ['',],
      bestPOC: ['',],
      rentReadyDate: ['',],
      depositPaidDate: ['',],
      rentResponsibleDate: ['',],
      agreementType: ['',],
      qcDate: ['',],
      signingDate: ['',],
      withWhom: ['',],
      otherTerms: ['',],
      listPaidUtilities: ['',],
      monthlyRent: [0],
      otherMonthlyCharge11: [0],
      otherMonthlyCharge12: ['',],
      otherMonthlyCharge21: [0],
      otherMonthlyCharge22: ['',],
      otherMonthlyCharge31: [0],
      otherMonthlyCharge32: ['',],
      otherMonthlyCharge41: [0],
      otherMonthlyCharge42: ['',],
      moveinRentCharge: [0],
      moveinRentPaid: [0],
      otherMoveinCharge1: [0],
      otherMoveinChargePaid1: [0],
      otherMoveinCharge2: [0],
      otherMoveinChargePaid2: [0],
      otherMoveinCharge3: [0],
      otherMoveinChargePaid3: [0],
      rubsMoveinCharge: [0],
      rubsMoveinChargePaid: [0],
      prepaidCleaningCharge: [0],
      prepaidCleaningPaid: [0],
      securityDepositCharge: [0],
      securityDepositPaid: [0],
      nonRefProcessingFeeCharge: [0],
      nonRefProcessingFeePaid: [0],
      petDepositCharge: [0],
      petDepositPaid: [0],
      petNonRefFeeCharge: [0],
      petNonRefFeePaid: [0],
      additionDepositCharge: [0],
      additionDepositPaid: [0],
      subTotal: [0],
      paid: [0],
      dueatMoveinKeyPickup: [0], // Define your form controls here
    });
    // this.approvalsummary1 = this.fb.group({
    //   primarytenant:[],
    // });
    this.approvalSummaryForm = this.fb.group({
      approvalsummary1: this.fb.group({
        primarytenant: [''],  // Add appropriate default value
        tenant2: [''],
        tenant3: [''],
        tenant4: [''],
        tenant5: [''],
        property: [''],
        city: [''],
        state: ['']
      }),
      approval_primary1: this.fb.group({
        totalPoints: [''],
        finalApproval: [Boolean,],
        totalDepositTenant1: [''],
        depositToHold: [''],
        petDepositPrimaryTenant: [''],
        additionalDepositPrimaryTenant: [''],
        balanceOfDepositDue: ['']
      }),
      approval_tenant2: this.fb.group({
        totalPoints: [''],
        finalApproval: [Boolean,],
        petDepositTenant2: [''],
        additionalDepositTenant2: [''],
        balanceOfDepositDueTenant2: ['']
      }),
      approval_tenant3: this.fb.group({
        totalPoints: [''],
        finalApproval: [Boolean,],
        petDepositTenant3: [''],
        additionalDepositTenant3: [''],
        balanceOfDepositDueTenant3: ['']
      }),
      approval_tenant4: this.fb.group({
        totalPoints: [''],
        finalApproval: [Boolean,],
        petDepositTenant4: [''],
        additionalDepositTenant4: [''],
        balanceOfDepositDue: ['']
      }),
      approval_tenant5: this.fb.group({
        totalPoints: [''],
        finalApproval: [Boolean,],
      })
    });
  }

  getApprovalSummaryByApplicantId(snapid: any) {

    this._userservice.GetApprovalSummaryByApplicantId(this.snapid).subscribe((data) => {
      console.log(data, "getting data");
      console.log(data[0].applicantType, "applicant type");
      console.log(data[0].propertyType, "propertyType type");

      if (data[0]) {
        this.approvalSummaryForm.patchValue({

          approvalsummary1: {
            primarytenant: data[0].applicantName,
            property: data[0].property,
            city: data[0].city,
            state: data[0].state,


          },
          approval_primary1: {
            totalPoints: data[0].totalPoints,
            finalApproval: data[0].finalApproval,
            totalDepositTenant1: data[0].totalDeposit,
            depositToHold: data[0].depositToHoldpaid,
            petDepositPrimaryTenant: data[0].petDeposit,
            additionalDepositPrimaryTenant: data[0].additionalDeposit,
            balanceOfDepositDue: data[0].balanceDepositDue,
          }

        })
      }
      if (data[1]) {
        this.approvalSummaryForm.patchValue({

          approvalsummary1: {
            tenant2: data[1].applicantName,
            


          },
          approval_tenant2: {
            totalPoints: data[1].totalPoints,
            finalApproval: data[1].finalApproval,
            petDepositTenant2: data[1].petDeposit,
            additionalDepositTenant2: data[1].additionalDeposit,
            balanceOfDepositDueTenant2: data[1].balanceDepositDue,
          }

        })
      }
      if (data[2]) {
        this.approvalSummaryForm.patchValue({

          approvalsummary1: {
            tenant3: data[2].applicantName


          },
          approval_tenant3: {
            totalPoints: data[2].totalPoints,
            finalApproval: data[2].finalApproval,
            petDepositTenant3: data[2].petDeposit,
            additionalDepositTenant3: data[2].additionalDeposit,
            balanceOfDepositDueTenant3: data[2].balanceDepositDue
          }
        })
      }
      if (data[3]) {
        this.approvalSummaryForm.patchValue({

          approvalsummary1: {
            tenant4: data[3].applicantName


          },
          approval_tenant4: {
            totalPoints: data[3].totalPoints,
            finalApproval: data[3].finalApproval,
            petDepositTenant4: data[3].petDeposit,
            additionalDepositTenant4: data[3].additionalDeposit,
            balanceOfDepositDue: data[3].balanceDepositDue
          }

        })
      }
      if (data[4]) {
        this.approvalSummaryForm.patchValue({

          approvalsummary1: {
            tenant5: data[4].applicantName


          },
          approval_tenant5: {
            finalApproval: data[4].finalApproval,
          }

        })
      }

      // modifiedBy: this.currentUser.id
    })

  }


  getCoverSheetbyapplicantId() {

    // alert("edit-user compont")
      this._userservice.GetCoverSheetbyapplicantId(this.snapid).subscribe((data) => {
      console.log(data, "getting data");this.coversheet1.patchValue({
        propertyManager: data[0]?.propertyManager || '',
        primaryTenant: data[0]?.primaryTenant || '',
        tenant2: data[0]?.tenant2 || '',
        tenant3: data[0]?.tenant3 || '',
        tenant4: data[0]?.tenant4 || '',
        propertyAddress: data[0]?.propertyAddress || '',
        city: data[0]?.city || '',
        state: data[0]?.state || '',
        unitCode: data[0]?.unitCode || '',
        bestPOC: data[0]?.bestPOC || '',
        rentReadyDate: data[0]?.rentReadyDate || '',
        depositPaidDate: data[0]?.depositPaidDate || '',
        rentResponsibleDate: data[0]?.rentResponsibleDate || '',
        agreementType: data[0]?.agreementType || '',
        qcDate: data[0]?.qcDate || '',
        signingDate: data[0]?.signingDate || '',
        //signingTime: data[0]?.signingTime || '',
        withWhom: data[0]?.withWhom || '',
        otherTerms: data[0]?.otherTerms || '',
        listPaidUtilities: data[0]?.listPaidUtilities || '',
        monthlyRent: data[0]?.monthlyRent || '',
        otherMonthlyCharge11: data[0]?.otherMonthlyCharge11 || '',
        otherMonthlyCharge12: data[0]?.otherMonthlyCharge12 || '',
        otherMonthlyCharge21: data[0]?.otherMonthlyCharge21 || '',
        otherMonthlyCharge22: data[0]?.otherMonthlyCharge22 || '',
        otherMonthlyCharge31: data[0]?.otherMonthlyCharge31 || '',
        otherMonthlyCharge32: data[0]?.otherMonthlyCharge32 || '',
        otherMonthlyCharge41: data[0]?.otherMonthlyCharge41 || '',
        otherMonthlyCharge42: data[0]?.otherMonthlyCharge42 || '',
        otherMoveinChargePaid1: data[0]?.otherMoveinChargePaid1 || '',
        moveinRentCharge: data[0]?.moveinRentCharge || '',
        moveinRentPaid: data[0]?.moveinRentPaid || '',
        otherMoveinCharge1: data[0]?.otherMoveinCharge1 || '',
        otherMoveinCharge2: data[0]?.otherMoveinCharge2 || '',
        otherMoveinChargePaid2: data[0]?.otherMoveinChargePaid2 || '',
        otherMoveinCharge3: data[0]?.otherMoveinCharge3 || '',
        otherMoveinChargePaid3: data[0]?.otherMoveinChargePaid3 || '',
        rubsMoveinCharge: data[0]?.rubsMoveinCharge || '',
        rubsMoveinChargePaid: data[0]?.rubsMoveinChargePaid || '',
        prepaidCleaningCharge: data[0]?.prepaidCleaningCharge || '',
        prepaidCleaningPaid: data[0]?.prepaidCleaningPaid || '',
        securityDepositCharge: data[0]?.securityDepositCharge || '',
        securityDepositPaid: data[0]?.securityDepositPaid || '',
        nonRefProcessingFeeCharge: data[0]?.nonRefProcessingFeeCharge || '',
        nonRefProcessingFeePaid: data[0]?.nonRefProcessingFeePaid || '',
        petDepositCharge: data[0]?.petDepositCharge || '',
        petDepositPaid: data[0]?.petDepositPaid || '',
        petNonRefFeeCharge: data[0]?.petNonRefFeeCharge || '',
        petNonRefFeePaid: data[0]?.petNonRefFeePaid || '',
        additionDepositCharge: data[0]?.additionDepositCharge || '',
        additionDepositPaid: data[0]?.additionDepositPaid || '',
        subTotal: data[0]?.subTotal || '',
        paid: data[0]?.paid || '',
        dueatMoveinKeyPickup: data[0]?.dueatMoveinKeyPickup || '',
        //createdBy: data[0]?.createdBy || '',


        // ... continue for other form controls
        ///ModifiedBy: data[0]?.modifiedBy || '',
        //ModifiedDate: data[0]?.modifiedDate || ''
      })
    })
  }
}



// getMoveinRent(){
//   alert("getmovein working")
// }


