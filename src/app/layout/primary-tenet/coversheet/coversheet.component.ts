import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  _record:any;
  result: any; currentUser: any = {};
  coverSheetForm!: FormGroup;
  Agreements: string[] = ["AgreementType1", "AgreementType2", "AgreementType3"];
  UpdateCoverSheet: any;
  GetCoverSheetbyapplicantId: any;
 
  
  
   
  snapshot: any;
  id: MatDialogConfig<any> | undefined;
  // closeResult: string;
  constructor(
    private fb: FormBuilder,
    private _http: UsersService,
    private activate: ActivatedRoute,
    private _userservice: UsersService,
    private router: Router,
    private dialog: MatDialog  // Inject MatDialog here
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
  }

  ngOnInit() {
    
    this.initForm();
    if (this.activate && this.activate.snapshot) {
      this.snapid = this.activate.snapshot.paramMap.get('id') || '';
    }
    this.getdata();
    console.log(this.snapid, "snap id Coversheet component");


  }
  dateChanged(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value); // handle the selected date here
  }

  initForm(): void {
    this.coverSheetForm = this.fb.group({
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

