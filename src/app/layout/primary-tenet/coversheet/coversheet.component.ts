import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/users/users.service';
import { ActivatedRoute, Router } from "@angular/router";
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';



@Component({
  selector: 'coversheet-component',
  templateUrl: './coversheet.component.html',
  styleUrls: ['./coversheet.component.scss']
})
export
  class CoversheetComponent implements OnInit {
  @ViewChild('view_record', { static: false })
  viewRecordElmRef!: ElementRef;
  snapid: any;
  _record: any;
  result: any; currentUser: any = {};
  coverSheetForm!: FormGroup;
  Agreements: string[] = ["AgreementType1", "AgreementType2", "AgreementType3"];
  UpdateCoverSheet: any;
  GetCoverSheetbyapplicantId: any;
  daysInMonth: any;
  moveinRent: any;
  lastDayOfMonth: any;
  remainingDays: any;


  snapshot: any;
  id: MatDialogConfig<any> | undefined;
  // closeResult: string;
  constructor(
    private fb: FormBuilder,
    private _http: UsersService,
    private activate: ActivatedRoute,
    private _userservice: UsersService,
    private router: Router,
    private dialog: MatDialog,  // Inject MatDialog here
    // @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
  }
  //diablecontrols() {
  //  this.coverSheetForm.get('primaryTenant')?.disable();
  //  this.coverSheetForm.get('tenant2')?.disable();
  //  this.coverSheetForm.get('tenant3')?.disable();
  //  this.coverSheetForm.get('tenant4')?.disable();
  //  this.coverSheetForm.get('moveinRentCharge')?.disable();
  //  this.coverSheetForm.get('otherMoveinCharge1')?.disable();
  //  this.coverSheetForm.get('otherMoveinCharge2')?.disable();
  //  this.coverSheetForm.get('otherMoveinCharge3')?.disable();
  //  this.coverSheetForm.get('rubsMoveinCharge')?.disable();
  //  this.coverSheetForm.get('prepaidCleaningCharge')?.disable();
  //  this.coverSheetForm.get('securityDepositCharge')?.disable();
  //  this.coverSheetForm.get('nonRefProcessingFeeCharge')?.disable();
  //  this.coverSheetForm.get('petDepositCharge')?.disable();
  //  this.coverSheetForm.get('petNonRefFeeCharge')?.disable();
  //  this.coverSheetForm.get('additionDepositCharge')?.disable();

  //}


  ngOnInit() {

    this.initForm();
    if (this.activate && this.activate.snapshot) {
      this.snapid = this.activate.snapshot.paramMap.get('id') || '';
    }

    this.getdata();
    console.log(this.snapid, "snap id Coversheet component");
    this.coverSheetForm.get('moveinRentCharge')?.valueChanges.subscribe(() => this.calculateSum());
    this.coverSheetForm.get('otherMoveinCharge1')?.valueChanges.subscribe(() => this.calculateSum());
    this.coverSheetForm.get('otherMoveinCharge2')?.valueChanges.subscribe(() => this.calculateSum());
    this.coverSheetForm.get('otherMoveinCharge3')?.valueChanges.subscribe(() => this.calculateSum());
    this.coverSheetForm.get('rubsMoveinCharge')?.valueChanges.subscribe(() => this.calculateSum());
    this.coverSheetForm.get('prepaidCleaningCharge')?.valueChanges.subscribe(() => this.calculateSum());
    this.coverSheetForm.get('securityDepositCharge')?.valueChanges.subscribe(() => this.calculateSum());
    this.coverSheetForm.get('nonRefProcessingFeeCharge')?.valueChanges.subscribe(() => this.calculateSum());
    this.coverSheetForm.get('petDepositCharge')?.valueChanges.subscribe(() => this.calculateSum());
    this.coverSheetForm.get('petNonRefFeeCharge')?.valueChanges.subscribe(() => this.calculateSum());
    this.coverSheetForm.get('additionDepositCharge')?.valueChanges.subscribe(() => this.calculateSum());

    this.coverSheetForm.get('moveinRentPaid')?.valueChanges.subscribe(() => this.calculateSum());
    this.coverSheetForm.get('otherMoveinChargePaid1')?.valueChanges.subscribe(() => this.calculateSum());
    this.coverSheetForm.get('otherMoveinChargePaid2')?.valueChanges.subscribe(() => this.calculateSum());
    this.coverSheetForm.get('otherMoveinChargePaid3')?.valueChanges.subscribe(() => this.calculateSum());
    this.coverSheetForm.get('rubsMoveinChargePaid')?.valueChanges.subscribe(() => this.calculateSum());
    this.coverSheetForm.get('prepaidCleaningPaid')?.valueChanges.subscribe(() => this.calculateSum());
    this.coverSheetForm.get('securityDepositPaid')?.valueChanges.subscribe(() => this.calculateSum());
    this.coverSheetForm.get('nonRefProcessingFeePaid')?.valueChanges.subscribe(() => this.calculateSum());
    this.coverSheetForm.get('petDepositPaid')?.valueChanges.subscribe(() => this.calculateSum());
    this.coverSheetForm.get('petNonRefFeePaid')?.valueChanges.subscribe(() => this.calculateSum());
    this.coverSheetForm.get('additionDepositPaid')?.valueChanges.subscribe(() => this.calculateSum());
    //this.diablecontrols();
  }
  dateChanged(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value); // handle the selected date here
  }

  getValues() {
    //const rentResponsibleDateValue = this.coverSheetForm.get('rentResponsibleDate')?.value;
    //const monthlyRentValue = this.coverSheetForm.get('monthlyRent')?.value;
    const otherMonthlyCharge11Value = this.coverSheetForm.get('otherMonthlyCharge11')?.value;
    const otherMonthlyCharge21Value = this.coverSheetForm.get('otherMonthlyCharge21')?.value;
    const otherMonthlyCharge31Value = this.coverSheetForm.get('otherMonthlyCharge31')?.value;
  }

  calculateSum() {
    //Charge Values
    const moveinRentChargeValue = parseFloat(this.coverSheetForm.get('moveinRentCharge')?.value) || 0;
    const otherMoveinCharge1Value = parseFloat(this.coverSheetForm.get('otherMoveinCharge1')?.value) || 0;
    const otherMoveinCharge2Value = parseFloat(this.coverSheetForm.get('otherMoveinCharge2')?.value) || 0;
    const otherMoveinCharge3Value = parseFloat(this.coverSheetForm.get('otherMoveinCharge3')?.value) || 0;
    const rubsMoveinChargeValue = this.coverSheetForm.get('rubsMoveinCharge')?.value || 0;
    const prepaidCleaningChargeValue = this.coverSheetForm.get('prepaidCleaningCharge')?.value || 0;
    const securityDepositChargeValue = this.coverSheetForm.get('securityDepositCharge')?.value || 0;
    const nonRefProcessingFeeChargeValue = this.coverSheetForm.get('nonRefProcessingFeeCharge')?.value || 0;
    const petDepositChargeValue = this.coverSheetForm.get('petDepositCharge')?.value || 0;
    const petNonRefFeeChargeValue = this.coverSheetForm.get('petNonRefFeeCharge')?.value || 0;
    const additionDepositChargeValue = this.coverSheetForm.get('additionDepositCharge')?.value || 0;

    //Paid Values
    const moveinRentPaidValue = this.coverSheetForm.get('moveinRentPaid')?.value || 0;
    const otherMoveinChargePaid1Value = parseFloat(this.coverSheetForm.get('otherMoveinChargePaid1')?.value) || 0;
    const otherMoveinChargePaid2Value = parseFloat(this.coverSheetForm.get('otherMoveinChargePaid2')?.value) || 0;
    const otherMoveinChargePaid3Value = parseFloat(this.coverSheetForm.get('otherMoveinChargePaid3')?.value) || 0;
    const rubsMoveinChargePaidValue = this.coverSheetForm.get('rubsMoveinChargePaid')?.value || 0;
    const prepaidCleaningPaidValue = this.coverSheetForm.get('prepaidCleaningPaid')?.value || 0;
    const securityDepositPaidValue = this.coverSheetForm.get('securityDepositPaid')?.value || 0;
    const nonRefProcessingFeePaidValue = this.coverSheetForm.get('nonRefProcessingFeePaid')?.value || 0;
    const petDepositPaidValue = this.coverSheetForm.get('petDepositPaid')?.value || 0;
    const petNonRefFeePaidValue = this.coverSheetForm.get('petNonRefFeePaid')?.value || 0;
    const additionDepositPaidValue = this.coverSheetForm.get('additionDepositPaid')?.value || 0;
    //const dueatMoveinKeyPickupValue = this.coverSheetForm.get('dueatMoveinKeyPickup')?.value || 0;


    //Total Charge Values
    const sumTotalValue = (moveinRentChargeValue + otherMoveinCharge1Value + otherMoveinCharge2Value + otherMoveinCharge3Value + rubsMoveinChargeValue +
      prepaidCleaningChargeValue + securityDepositChargeValue + nonRefProcessingFeeChargeValue + petDepositChargeValue + petNonRefFeeChargeValue + additionDepositChargeValue);

    //Total Paid Values
    const paidValue = (moveinRentPaidValue + otherMoveinChargePaid1Value + otherMoveinChargePaid2Value + otherMoveinChargePaid3Value + rubsMoveinChargePaidValue
      + prepaidCleaningPaidValue + securityDepositPaidValue + nonRefProcessingFeePaidValue + petDepositPaidValue + petNonRefFeePaidValue+ additionDepositPaidValue);

    const dueatMoveinKeyPickupValue = (sumTotalValue - paidValue);

    this.coverSheetForm.patchValue({
      subTotal: sumTotalValue.toFixed(2),
      paid: paidValue.toFixed(2),
      dueatMoveinKeyPickup: dueatMoveinKeyPickupValue.toFixed(2),

    })
  }


  getOtherMoveinCharge1() {
    const otherMonthlyCharge11Value = this.coverSheetForm.get('otherMonthlyCharge11')?.value || 0;
    this.coverSheetForm.patchValue({
      otherMoveinCharge1: ((otherMonthlyCharge11Value / this.daysInMonth) * this.remainingDays).toFixed(2),

    })
  }
  getOtherMoveinCharge2() {
    const otherMonthlyCharge11Value = this.coverSheetForm.get('otherMonthlyCharge21')?.value || 0;
    this.coverSheetForm.patchValue({
      otherMoveinCharge2: ((otherMonthlyCharge11Value / this.daysInMonth) * this.remainingDays).toFixed(2),

    })
  }
  getOtherMoveinCharge3() {
    const otherMonthlyCharge11Value = this.coverSheetForm.get('otherMonthlyCharge31')?.value || 0;
    this.coverSheetForm.patchValue({
      otherMoveinCharge3: ((otherMonthlyCharge11Value / this.daysInMonth) * this.remainingDays).toFixed(2),

    })
  }

  getMoveinRent(inputDate: any, monthlyRent: any) {
    const selectedDate = inputDate.value ? new Date(inputDate.value) : new Date(inputDate);

    if (!isNaN(selectedDate.getTime())) {
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1; // JavaScript months are 0-indexed
      this.daysInMonth = new Date(year, month, 0).getDate();
      this.lastDayOfMonth = new Date(year, month, 0).getDate();
      this.remainingDays = this.lastDayOfMonth - selectedDate.getDate() + 1;
      //this.daysInMonth = daysInMonth;

      this.moveinRent = (monthlyRent / this.daysInMonth) * this.remainingDays;
      this.coverSheetForm.patchValue({
        moveinRentCharge: this.moveinRent.toFixed(2),

      })
    }

  }

  initForm(): void {
    this.coverSheetForm = this.fb.group({
      applicantId: ['',],
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
      //signingTime: [Time,  ],
      monthlyRent: ['',],
      withWhom: ['',],
      otherTerms: ['',],
      listPaidUtilities: ['',],
      otherMonthlyCharge11: ['',],
      otherMonthlyCharge12: ['',],
      otherMonthlyCharge21: ['',],
      otherMonthlyCharge22: ['',],
      otherMonthlyCharge31: ['',],
      otherMonthlyCharge32: ['',],
      otherMonthlyCharge41: ['',],
      otherMonthlyCharge42: ['',],
      otherMoveinCharge1: ['',],
      otherMoveinChargePaid1: ['',],
      moveinRentCharge: ['',],
      moveinRentPaid: ['',],

      otherMoveinCharge2: ['',],
      otherMoveinChargePaid2: ['',],
      otherMoveinCharge3: ['',],
      otherMoveinChargePaid3: ['',],
      rubsMoveinCharge: ['',],
      rubsMoveinChargePaid: ['',],
      prepaidCleaningCharge: ['',],
      prepaidCleaningPaid: ['',],


      securityDepositCharge: ['',],
      securityDepositPaid: ['',],
      nonRefProcessingFeeCharge: ['',],
      nonRefProcessingFeePaid: ['',],
      petDepositCharge: ['',],
      petDepositPaid: ['',],
      petNonRefFeeCharge: ['',],
      petNonRefFeePaid: ['',],

      additionDepositCharge: ['',],
      additionDepositPaid: ['',],
      subTotal: ['',],
      paid: ['',],
      dueatMoveinKeyPickup: ['',],
      createdBy: ['',],

      modifiedBy: ['',],


      // Other charges...
    });
  }
  onSubmit() {

    if (this.snapid) {
      this.coverSheetForm.patchValue({
        applicantId: this.snapid,
        createdBy: this.currentUser.id.toString(),
      })
      this._userservice.CreateCoverSheet(this.coverSheetForm.value).subscribe(
        (data) => {
          console.log('Data sent to Create applications:', data);

          // Move to the next tab
          // Optionally, reset the form or perform other actions after moving to the next tab
          // this.firstCtrl.reset(); // Reset the form if needed
        },
        (error) => {
          console.error('Error creating applicant:', error);
          // Handle error response here
        }
      );




      // Move to the next tab
      // Optionally, reset the form or perform other actions after moving to the next tab
      // this.firstCtrl.reset(); // Reset the form if needed


    }


    console.log(this.coverSheetForm.value, "form values");


    //  this.userService.createCoverSheet(this.coverSheetForm.value)
    //    .subscribe(response => {

    //      console.log('Cover sheet created successfully:', response);
    //    }, error => {

    //      console.error('Error creating cover sheet:', error);
    //    });
    //}
  }
  getdata() {

    // alert("edit-user compont")
    this._http.GetCoverSheetbyapplicantId(this.snapid).subscribe((data) => {
      console.log(data, "getting data");
      this.result = data
      this.getMoveinRent(new Date(this.result[0]?.rentResponsibleDate), this.result[0]?.monthlyRent || 0);
      this.coverSheetForm.patchValue({
        propertyManager: this.result[0]?.propertyManager || '',
        primaryTenant: this.result[0]?.primaryTenant || '',
        tenant2: this.result[0]?.tenant2 || '',
        tenant3: this.result[0]?.tenant3 || '',
        tenant4: this.result[0]?.tenant4 || '',
        propertyAddress: this.result[0]?.propertyAddress || '',
        city: this.result[0]?.city || '',
        state: this.result[0]?.state || '',
        unitCode: this.result[0]?.unitCode || '',
        bestPOC: this.result[0]?.bestPOC || '',
        rentReadyDate: this.result[0]?.rentReadyDate || '',
        depositPaidDate: this.result[0]?.depositPaidDate || '',
        rentResponsibleDate: this.result[0]?.rentResponsibleDate || '',
        agreementType: this.result[0]?.agreementType || '',
        qcDate: this.result[0]?.qcDate || '',
        signingDate: this.result[0]?.signingDate || '',
        //signingTime: this.result[0]?.signingTime || '',
        withWhom: this.result[0]?.withWhom || '',
        otherTerms: this.result[0]?.otherTerms || '',
        listPaidUtilities: this.result[0]?.listPaidUtilities || '',
        monthlyRent: this.result[0]?.monthlyRent || '',
        otherMonthlyCharge11: this.result[0]?.otherMonthlyCharge11 || '',
        otherMonthlyCharge12: this.result[0]?.otherMonthlyCharge12 || '',
        otherMonthlyCharge21: this.result[0]?.otherMonthlyCharge21 || '',
        otherMonthlyCharge22: this.result[0]?.otherMonthlyCharge22 || '',
        otherMonthlyCharge31: this.result[0]?.otherMonthlyCharge31 || '',
        otherMonthlyCharge32: this.result[0]?.otherMonthlyCharge32 || '',
        otherMonthlyCharge41: this.result[0]?.otherMonthlyCharge41 || '',
        otherMonthlyCharge42: this.result[0]?.otherMonthlyCharge42 || '',
        otherMoveinChargePaid1: this.result[0]?.otherMoveinChargePaid1 || '',
        moveinRentCharge: this.result[0]?.moveinRentCharge || '',
        moveinRentPaid: this.result[0]?.moveinRentPaid || '',
        otherMoveinCharge1: this.result[0]?.otherMoveinCharge1 || '',
        otherMoveinCharge2: this.result[0]?.otherMoveinCharge2 || '',
        otherMoveinChargePaid2: this.result[0]?.otherMoveinChargePaid2 || '',
        otherMoveinCharge3: this.result[0]?.otherMoveinCharge3 || '',
        otherMoveinChargePaid3: this.result[0]?.otherMoveinChargePaid3 || '',
        rubsMoveinCharge: this.result[0]?.rubsMoveinCharge || '',
        rubsMoveinChargePaid: this.result[0]?.rubsMoveinChargePaid || '',
        prepaidCleaningCharge: this.result[0]?.prepaidCleaningCharge || '',
        prepaidCleaningPaid: this.result[0]?.prepaidCleaningPaid || '',
        securityDepositCharge: this.result[0]?.securityDepositCharge || '',
        securityDepositPaid: this.result[0]?.securityDepositPaid || '',
        nonRefProcessingFeeCharge: this.result[0]?.nonRefProcessingFeeCharge || '',
        nonRefProcessingFeePaid: this.result[0]?.nonRefProcessingFeePaid || '',
        petDepositCharge: this.result[0]?.petDepositCharge || '',
        petDepositPaid: this.result[0]?.petDepositPaid || '',
        petNonRefFeeCharge: this.result[0]?.petNonRefFeeCharge || '',
        petNonRefFeePaid: this.result[0]?.petNonRefFeePaid || '',
        additionDepositCharge: this.result[0]?.additionDepositCharge || '',
        additionDepositPaid: this.result[0]?.additionDepositPaid || '',
        subTotal: this.result[0]?.subTotal || '',
        paid: this.result[0]?.paid || '',
        dueatMoveinKeyPickup: this.result[0]?.dueatMoveinKeyPickup || '',
        //createdBy: this.result[0]?.createdBy || '',


        // ... continue for other form controls
        ///ModifiedBy: this.result[0]?.modifiedBy || '',
        //ModifiedDate: this.result[0]?.modifiedDate || ''
      })
    })
  }

  updatedata() {
    // alert("bye")
    const payload = {
      propertyManager: this.result[0]?.propertyManager || '',
      primaryTenant: this.result[0]?.primaryTenant || '',
      tenant2: this.result[0]?.tenant2 || '',
      tenant3: this.result[0]?.tenant3 || '',
      tenant4: this.result[0]?.tenant4 || '',
      propertyAddress: this.result[0]?.propertyAddress || '',
      city: this.result[0]?.city || '',
      state: this.result[0]?.state || '',
      unitCode: this.result[0]?.unitCode || '',
      bestPOC: this.result[0]?.bestPOC || '',
      rentReadyDate: this.result[0]?.rentReadyDate || '',
      depositPaidDate: this.result[0]?.depositPaidDate || '',
      rentResponsibleDate: this.result[0]?.rentResponsibleDate || '',
      agreementType: this.result[0]?.agreementType || '',
      qcDate: this.result[0]?.qcDate || '',
      signingDate: this.result[0]?.signingDate || '',
      signingTime: this.result[0]?.signingTime || '',
      withWhom: this.result[0]?.withWhom || '',
      otherTerms: this.result[0]?.otherTerms || '',
      listPaidUtilities: this.result[0]?.listPaidUtilities || '',
      otherMonthlyCharge11: this.result[0]?.otherMonthlyCharge11 || '',
      otherMonthlyCharge12: this.result[0]?.otherMonthlyCharge12 || '',
      otherMonthlyCharge21: this.result[0]?.otherMonthlyCharge21 || '',
      otherMonthlyCharge22: this.result[0]?.otherMonthlyCharge22 || '',
      otherMonthlyCharge31: this.result[0]?.otherMonthlyCharge31 || '',
      otherMonthlyCharge32: this.result[0]?.otherMonthlyCharge32 || '',
      otherMonthlyCharge41: this.result[0]?.otherMonthlyCharge41 || '',
      otherMonthlyCharge42: this.result[0]?.otherMonthlyCharge42 || '',
      otherMoveinChargePaid1: this.result[0]?.otherMoveinChargePaid1 || '',
      moveinRent1: this.result[0]?.moveinRent1 || '',
      moveinRent2: this.result[0]?.moveinRent2 || '',
      otherMoveinCharge1: this.result[0]?.otherMoveinCharge1 || '',
      otherMoveinCharge2: this.result[0]?.otherMoveinCharge2 || '',
      otherMoveinChargePaid2: this.result[0]?.otherMoveinChargePaid2 || '',
      otherMoveinCharge3: this.result[0]?.otherMoveinCharge3 || '',
      otherMoveinChargePaid3: this.result[0]?.otherMoveinChargePaid3 || '',
      rubsMoveinCharge: this.result[0]?.rubsMoveinCharge || '',
      rubsMoveinChargePaid: this.result[0]?.rubsMoveinChargePaid || '',
      prepaidCleaningCharge: this.result[0]?.prepaidCleaningCharge || '',
      prepaidCleaningPaid: this.result[0]?.prepaidCleaningPaid || '',
      securityDepositCharge: this.result[0]?.securityDepositCharge || '',
      securityDepositPaid: this.result[0]?.securityDepositPaid || '',
      nonRefProcessingFeeCharge: this.result[0]?.nonRefProcessingFeeCharge || '',
      nonRefProcessingFeePaid: this.result[0]?.nonRefProcessingFeePaid || '',
      petDepositCharge: this.result[0]?.petDepositCharge || '',
      petDepositPaid: this.result[0]?.petDepositPaid || '',
      petNonRefFeeCharge: this.result[0]?.petNonRefFeeCharge || '',
      petNonRefFeePaid: this.result[0]?.petNonRefFeePaid || '',
      additionDepositCharge: this.result[0]?.additionDepositCharge || '',
      additionDepositPaid: this.result[0]?.additionDepositPaid || '',
      subTotal: this.result[0]?.subTotal || '',
      paid: this.result[0]?.paid || '',
      dueatMoveinKeyPickup: this.result[0]?.dueatMoveinKeyPickup || '',
      createdBy: this.result[0]?.createdBy || '',


      // ... continue for other form controls
      ModifiedBy: this.result[0]?.modifiedBy || '',
      ModifiedDate: this.result[0]?.modifiedDate || ''
    }
    this._http.UpdateUser1(payload).subscribe((res: any) => {
      console.log(res, "this is updated data");
      this.router.navigate(['/scoresheet']);

    })
  }
  onCancel() {
    this.router.navigate(['/scoresheet']);

  }
  viewRecord() {
    console.log('View Record:', this.result);

    // Open the dialog here using MatDialog
    const dialogRef = this.dialog.open(CoversheetComponent, {
      width: '1010px',
      data: {
        id: this.id,       // Pass the id to the dialog
        recordData: this.result[0],  // Pass the data to the dialog
      },
    });

    // Subscribe to the afterClosed event to handle actions after the dialog is closed
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
      // You can perform any actions based on the result here
    });
  }


  open(content: any) {

  }

  // getdata(){
  //   this._http.GetAllUsers(this.snapid).subscribe((data)=>{
  //     console.log(data,"getting data");
  //     this.result=data
  //     this.formdata.patchValue({
  //       firstname:this.result.firstname,
  //       age:this.result.age,
  //       gmail:this.result.gmail,
  //       phn:this.result.phn,
  //       gender:this.result.gender,
  //       selectlist:this.result.selectlist
  //     })
  //   })
  // }
}




// Access the data like this:
// const tenantId = data.tenantId;
// const paystubRecent = data.paystubRecent;
// ...

// You can add any additional methods or event handlers here

