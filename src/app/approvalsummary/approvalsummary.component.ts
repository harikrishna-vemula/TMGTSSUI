import { Component } from '@angular/core';
import { CdkStep, StepperSelectionEvent } from '@angular/cdk/stepper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

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
  approvalSummaryForm: any;
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.coversheet1 = this.fb.group({
      propertyManager: ['', ],
      primaryTenant: ['', ],
      tenant2: ['', ],
      tenant3: ['', ],
      tenant4: ['', ],
      propertyAddress: ['', ],
      city: ['', ],
      state: ['', ],
      unitCode: ['', ],
      bestPOC: ['', ],
      rentReadyDate: ['', ],
      depositPaidDate: ['', ],
      rentResponsibleDate: ['', ],
      agreementType: ['', ],
      qcDate: ['', ],
      signingDate: ['', ],
      withWhom: ['', ],
      otherTerms: ['', ],
      listPaidUtilities: ['', ],
      monthlyRent: [0],
      otherMonthlyCharge11: [0],
      otherMonthlyCharge12: ['', ],
      otherMonthlyCharge21: [0],
      otherMonthlyCharge22: ['', ],
      otherMonthlyCharge31: [0],
      otherMonthlyCharge32: ['', ],
      otherMonthlyCharge41: [0],
      otherMonthlyCharge42: ['', ],
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
        property: [''],
        city: [''],
        state: ['']
      }),
      approval_primary1: this.fb.group({
        totalPoints: [''],
        finalApproval: [true],
        totalDepositTenant1: [''],
        depositToHold: [''],
        petDepositPrimaryTenant: [''],
        additionalDepositPrimaryTenant: [''],
        balanceOfDepositDue: ['']
      }),
      approval_tenant2: this.fb.group({
        totalPoints: [''],
        finalApproval: [true],
        petDepositTenant2: [''],
        additionalDepositTenant2: [''],
        balanceOfDepositDueTenant2: ['']
      }),
      approval_tenant3: this.fb.group({
        totalPoints: [''],
        finalApproval: [true],
        petDepositTenant3: [''],
        additionalDepositTenant3: [''],
        balanceOfDepositDueTenant3: ['']
      }),
      approval_tenant4: this.fb.group({
        totalPoints: [''],
        finalApproval: [true],
        petDepositTenant4: [''],
        additionalDepositTenant4: [''],
        balanceOfDepositDue: ['']
      }),
      approval_tenant5: this.fb.group({
        totalPoints: ['']
      })
    });
  }

  }
  // getMoveinRent(){
  //   alert("getmovein working")
  // }


