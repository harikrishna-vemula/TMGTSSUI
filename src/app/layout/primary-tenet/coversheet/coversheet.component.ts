import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'coversheet-component',
  templateUrl: './coversheet.component.html',
  styleUrls: ['./coversheet.component.scss']
})
export class CoversheetComponent implements OnInit {
  snapid: any;
  result: any; currentUser: any={ };
  coverSheetForm!: FormGroup;
  Agreements: string[] = ["AgreementType1", "AgreementType2", "AgreementType3"];
  UpdateCoverSheet: any;
  GetCoverSheetbyapplicantId: any;
  router: any;
  activate: any;
  snapshot:any;
  constructor(private fb: FormBuilder, private _http: UsersService) { }

  ngOnInit() {

    this.initForm();   
      this.snapid = this.activate.snapshot.paramMap.get('applicantid') || '';
      this.getdata();
      console.log(this.snapid,"snap id editapplicant componet");
  
    

  }

  initForm(): void {
    this.coverSheetForm = this.fb.group({
      PropertyManager: ['', Validators.required],
      PrimaryTenant: ['', Validators.required],
      Tenant2: ['', Validators.required],
      Tenant3: ['', Validators.required],
      Tenant4: ['', Validators.required],
      PropertyAddress: ['', Validators.required],
      City: ['', Validators.required],
      State: ['', Validators.required],
      UnitCode: ['', Validators.required],
      BestPOC: ['', Validators.required],
      RentReadyDate: ['', Validators.required],
      DepositPaidDate: ['', Validators.required],
      RentResponsibleDate: ['', Validators.required],
      AgreementType: ['', Validators.required],
      QCDate: ['', Validators.required],
      SigningDate: ['', Validators.required],
      SigningTime: ['', Validators.required],
      WithWhom: ['', Validators.required],
      OtherTerms: ['', Validators.required],
      ListPaidUtilities: ['', Validators.required],
      OtherMonthlyCharge11: ['', Validators.required],
      OtherMonthlyCharge12: ['', Validators.required],
      OtherMonthlyCharge21: ['', Validators.required],
      OtherMonthlyCharge22: ['', Validators.required],
      OtherMonthlyCharge31: ['', Validators.required],
      OtherMonthlyCharge32: ['', Validators.required],
      OtherMonthlyCharge41: ['', Validators.required],
      OtherMonthlyCharge42: ['', Validators.required],
      OtherMoveinCharge1: ['', Validators.required],
      OtherMoveinChargePaid1: ['', Validators.required],
      MoveinRent1: ['', Validators.required],
      MoveinRent2: ['', Validators.required],

      OtherMoveinCharge2: ['', Validators.required],
      OtherMoveinChargePaid2: ['', Validators.required],
      OtherMoveinCharge3: ['', Validators.required],
      OtherMoveinChargePaid3: ['', Validators.required],
      RubsMoveinCharge: ['', Validators.required],
      RubsMoveinChargePaid: ['', Validators.required],
      PrepaidCleaningCharge: ['', Validators.required],
      PrepaidCleaningPaid: ['', Validators.required],


      SecurityDepositCharge: ['', Validators.required],
      SecurityDepositPaid: ['', Validators.required],
      NonRefProcessingFeeCharge: ['', Validators.required],
      NonRefProcessingFeePaid: ['', Validators.required],
      PetDepositCharge: ['', Validators.required],
      PetDepositPaid: ['', Validators.required],
      PetNonRefFeeCharge: ['', Validators.required],
      PetNonRefFeePaid: ['', Validators.required],

      AdditionDepositCharge: ['', Validators.required],
      AdditionDepositPaid: ['', Validators.required],
      SubTotal: ['', Validators.required],
      Paid: ['', Validators.required],
      DueatMoveinKeyPickup: ['', Validators.required],
      CreatedBy: ['', Validators.required],
      CreatedDate: ['', Validators.required],
      ModifiedBy: ['', Validators.required],
      ModifiedDate: ['', Validators.required],

      // Other charges...
    });
  }
  onSubmit() {
    if (this.snapid) {
      this.coverSheetForm.patchValue({
        incom_verification: {
          applicantId: this.snapid.toString(),
        },
      })
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
    debugger;
    // alert("edit-user compont")
    this._http.GetCoverSheetbyapplicantId(this.snapid).subscribe((data) => {
      console.log(data, "getting data");
      this.result = data
      debugger;
      this.GetCoverSheetbyapplicantId.patchValue({
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
      rentReadyDate : this.result[0]?.rentReadyDate || '',
      depositPaidDate : this.result[0]?.depositPaidDate || '',
      rentResponsibleDate:  this.result[0]?.rentResponsibleDate || '',
      agreementType:  this.result[0]?.agreementType || '',
      qCDate:  this.result[0]?.qCDate || '',
      signingDate:  this.result[0]?.signingDate || '',
      signingTime: this.result[0]?.signingTime || '',
      withWhom:  this.result[0]?.withWhom || '',
      otherTerms:  this.result[0]?.otherTerms || '',
      listPaidUtilities:  this.result[0]?.listPaidUtilities || '',
      otherMonthlyCharge11:  this.result[0]?.otherMonthlyCharge11 || '',
      otherMonthlyCharge12: this.result[0]?.otherMonthlyCharge12 || '',
      otherMonthlyCharge21: this.result[0]?.otherMonthlyCharge21 || '',
      otherMonthlyCharge22: this.result[0]?.otherMonthlyCharge22 || '',
      otherMonthlyCharge31: this.result[0]?.otherMonthlyCharge31 || '',
      otherMonthlyCharge32: this.result[0]?.otherMonthlyCharge32 || '',
      otherMonthlyCharge41: this.result[0]?.otherMonthlyCharge41 || '',
      otherMonthlyCharge42: this.result[0]?.otherMonthlyCharge42 || '',
      otherMoveinChargePaid1:  this.result[0]?.otherMoveinChargePaid1  || '',
      moveinRent1:  this.result[0]?.moveinRent1 || '',
      moveinRent2: this.result[0]?.moveinRent2 || '',
      otherMoveinCharge1: this.result[0]?.otherMoveinCharge1 || '',
      otherMoveinCharge2: this.result[0]?.otherMoveinCharge2 || '',
      otherMoveinChargePaid2: this.result[0]?.otherMoveinChargePaid2 || '',
      otherMoveinCharge3: this.result[0]?.otherMoveinCharge3 || '',
      otherMoveinChargePaid3: this.result[0]?.otherMoveinChargePaid3 || '',
      rubsMoveinCharge: this.result[0]?.rubsMoveinCharge || '',
      rubsMoveinChargePaid:  this.result[0]?.rubsMoveinChargePaid || '',
      prepaidCleaningCharge:  this.result[0]?.prepaidCleaningCharge || '',
      prepaidCleaningPaid:  this.result[0]?.prepaidCleaningPaid || '',
      securityDepositCharge:  this.result[0]?.securityDepositCharge || '',
      securityDepositPaid:  this.result[0]?.securityDepositPaid || '',
      nonRefProcessingFeeCharge: this.result[0]?.nonRefProcessingFeeCharge || '',
      nonRefProcessingFeePaid:  this.result[0]?.nonRefProcessingFeePaid || '',
      petDepositCharge: this.result[0]?.petDepositCharge || '',
      petDepositPaid: this.result[0]?.petDepositPaid || '',
      petNonRefFeeCharge:  this.result[0]?.petNonRefFeeCharge || '',
      petNonRefFeePaid: this.result[0]?.petNonRefFeePaid || '',
      additionDepositCharge: this.result[0]?.additionDepositCharge || '',
      additionDepositPaid: this.result[0]?.additionDepositPaid || '',
      subTotal:  this.result[0]?.subTotal || '',
      paid: this.result[0]?.paid || '',
      dueatMoveinKeyPickup:  this.result[0]?.dueatMoveinKeyPickup || '',
      createdBy:  this.result[0]?.createdBy  || '',
      createdDate : this.result[0]?.createdDate || '',

      // ... continue for other form controls
      ModifiedBy: this.result[0]?.modifiedBy || '',
      ModifiedDate: this.result[0]?.modifiedDate || ''
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
      rentReadyDate : this.result[0]?.rentReadyDate || '',
      depositPaidDate : this.result[0]?.depositPaidDate || '',
      rentResponsibleDate:  this.result[0]?.rentResponsibleDate || '',
      agreementType:  this.result[0]?.agreementType || '',
      qCDate:  this.result[0]?.qCDate || '',
      signingDate:  this.result[0]?.signingDate || '',
      signingTime: this.result[0]?.signingTime || '',
      withWhom:  this.result[0]?.withWhom || '',
      otherTerms:  this.result[0]?.otherTerms || '',
      listPaidUtilities:  this.result[0]?.listPaidUtilities || '',
      otherMonthlyCharge11:  this.result[0]?.otherMonthlyCharge11 || '',
      otherMonthlyCharge12: this.result[0]?.otherMonthlyCharge12 || '',
      otherMonthlyCharge21: this.result[0]?.otherMonthlyCharge21 || '',
      otherMonthlyCharge22: this.result[0]?.otherMonthlyCharge22 || '',
      otherMonthlyCharge31: this.result[0]?.otherMonthlyCharge31 || '',
      otherMonthlyCharge32: this.result[0]?.otherMonthlyCharge32 || '',
      otherMonthlyCharge41: this.result[0]?.otherMonthlyCharge41 || '',
      otherMonthlyCharge42: this.result[0]?.otherMonthlyCharge42 || '',
      otherMoveinChargePaid1:  this.result[0]?.otherMoveinChargePaid1  || '',
      moveinRent1:  this.result[0]?.moveinRent1 || '',
      moveinRent2: this.result[0]?.moveinRent2 || '',
      otherMoveinCharge1: this.result[0]?.otherMoveinCharge1 || '',
      otherMoveinCharge2: this.result[0]?.otherMoveinCharge2 || '',
      otherMoveinChargePaid2: this.result[0]?.otherMoveinChargePaid2 || '',
      otherMoveinCharge3: this.result[0]?.otherMoveinCharge3 || '',
      otherMoveinChargePaid3: this.result[0]?.otherMoveinChargePaid3 || '',
      rubsMoveinCharge: this.result[0]?.rubsMoveinCharge || '',
      rubsMoveinChargePaid:  this.result[0]?.rubsMoveinChargePaid || '',
      prepaidCleaningCharge:  this.result[0]?.prepaidCleaningCharge || '',
      prepaidCleaningPaid:  this.result[0]?.prepaidCleaningPaid || '',
      securityDepositCharge:  this.result[0]?.securityDepositCharge || '',
      securityDepositPaid:  this.result[0]?.securityDepositPaid || '',
      nonRefProcessingFeeCharge: this.result[0]?.nonRefProcessingFeeCharge || '',
      nonRefProcessingFeePaid:  this.result[0]?.nonRefProcessingFeePaid || '',
      petDepositCharge: this.result[0]?.petDepositCharge || '',
      petDepositPaid: this.result[0]?.petDepositPaid || '',
      petNonRefFeeCharge:  this.result[0]?.petNonRefFeeCharge || '',
      petNonRefFeePaid: this.result[0]?.petNonRefFeePaid || '',
      additionDepositCharge: this.result[0]?.additionDepositCharge || '',
      additionDepositPaid: this.result[0]?.additionDepositPaid || '',
      subTotal:  this.result[0]?.subTotal || '',
      paid: this.result[0]?.paid || '',
      dueatMoveinKeyPickup:  this.result[0]?.dueatMoveinKeyPickup || '',
      createdBy:  this.result[0]?.createdBy  || '',
      createdDate : this.result[0]?.createdDate || '',

      // ... continue for other form controls
      ModifiedBy: this.result[0]?.modifiedBy || '',
      ModifiedDate: this.result[0]?.modifiedDate || ''
    }
    this._http.UpdateUser1(payload).subscribe((res: any) => {
      console.log(res, "this is updateddddd data");
      this.router.navigate(['/scoresheet']);

    })
  }
  onCancel(){
    this.router.navigate(['/scoresheet']);

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

