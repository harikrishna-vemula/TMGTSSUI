import { CdkStep } from '@angular/cdk/stepper';
import { Component,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStep } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-primary-tenant',
  templateUrl: './primary-tenant.component.html',
  styleUrls: ['./primary-tenant.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class PrimaryTenantComponent {
  // myForm: FormGroup;
  
  isLinear = true;
  completed: boolean = false;
  state?: string;
  options: string[] = ['Single', 'Couple', 'Roommates'];
  Propertys:any=['Multi-Family','Single-Family']
  options1:any=['Yes','No'];
  options2:any=['Fair/good','Poor']
  stepper: any;
  @ViewChild('tabGroup', { static: false }) tabGroup: MatTabGroup | undefined;
  constructor(private fb: FormBuilder){}

 
  ngOnInit(){}
  myForm = this.fb.group({
    basicinfo: this.fb.group({
      accountname: ['', Validators.required],
      roommates: ['', Validators.required],
    }),
    incom_verification:this.fb.group({
      pay_stub: ['', Validators.required],
      monthly: ['', Validators.required],
    }),
    credit_summary:this.fb.group({
      credit_lines: ['', Validators.required],
      credit_score: ['', Validators.required],
    }),
    landlord_ref:this.fb.group({
      rental_ref: ['', Validators.required],
      proper_notice: ['', Validators.required],
    }),
    payment_history:this.fb.group({
      payment_history_length: ['', Validators.required],
    }),
    pets:this.fb.group({
      pet_approved1: ['', Validators.required],
      pet_approved2: ['', Validators.required],
    }),
    final_sesstion:this.fb.group({
      total_points: ['', Validators.required],
      final_approval: ['', Validators.required],
    }),
  })
  second = this.fb.group({
    basicinfo: this.fb.group({
      accountname: ['', Validators.required],
      roommates: ['', Validators.required],
    }),
    incom_verification:this.fb.group({
      pay_stub: ['', Validators.required],
      monthly: ['', Validators.required],
    }),
    credit_summary:this.fb.group({
      credit_lines: ['', Validators.required],
      credit_score: ['', Validators.required],
    }),
    landlord_ref:this.fb.group({
      rental_ref: ['', Validators.required],
      proper_notice: ['', Validators.required],
    }),
    payment_history:this.fb.group({
      payment_history_length: ['', Validators.required],
    }),
    pets:this.fb.group({
      pet_approved1: ['', Validators.required],
      pet_approved2: ['', Validators.required],
    }),
    final_sesstion:this.fb.group({
      total_points: ['', Validators.required],
      final_approval: ['', Validators.required],
    }),
  })

  three = this.fb.group({
    basicinfo: this.fb.group({
      accountname: ['', Validators.required],
      roommates: ['', Validators.required],
    }),
    incom_verification:this.fb.group({
      pay_stub: ['', Validators.required],
      monthly: ['', Validators.required],
    }),
    credit_summary:this.fb.group({
      credit_lines: ['', Validators.required],
      credit_score: ['', Validators.required],
    }),
    landlord_ref:this.fb.group({
      rental_ref: ['', Validators.required],
      proper_notice: ['', Validators.required],
    }),
    payment_history:this.fb.group({
      payment_history_length: ['', Validators.required],
    }),
    pets:this.fb.group({
      pet_approved1: ['', Validators.required],
      pet_approved2: ['', Validators.required],
    }),
    final_sesstion:this.fb.group({
      total_points: ['', Validators.required],
      final_approval: ['', Validators.required],
    }),
  })
  four= this.fb.group({
    basicinfo: this.fb.group({
      accountname: ['', Validators.required],
      roommates: ['', Validators.required],
    }),
    incom_verification:this.fb.group({
      pay_stub: ['', Validators.required],
      monthly: ['', Validators.required],
    }),
    credit_summary:this.fb.group({
      credit_lines: ['', Validators.required],
      credit_score: ['', Validators.required],
    }),
    landlord_ref:this.fb.group({
      rental_ref: ['', Validators.required],
      proper_notice: ['', Validators.required],
    }),
    payment_history:this.fb.group({
      payment_history_length: ['', Validators.required],
    }),
    pets:this.fb.group({
      pet_approved1: ['', Validators.required],
      pet_approved2: ['', Validators.required],
    }),
    final_sesstion:this.fb.group({
      total_points: ['', Validators.required],
      final_approval: ['', Validators.required],
    }),
  })
  cosigner= this.fb.group({
    basicinfo: this.fb.group({
      accountname: ['', Validators.required],
      roommates: ['', Validators.required],
    }),
    incom_verification:this.fb.group({
      pay_stub: ['', Validators.required],
      monthly: ['', Validators.required],
    }),
    credit_summary:this.fb.group({
      credit_lines: ['', Validators.required],
      credit_score: ['', Validators.required],
    }),
    landlord_ref:this.fb.group({
      rental_ref: ['', Validators.required],
      proper_notice: ['', Validators.required],
    }),
    payment_history:this.fb.group({
      payment_history_length: ['', Validators.required],
    }),
    pets:this.fb.group({
      pet_approved1: ['', Validators.required],
      pet_approved2: ['', Validators.required],
    }),
    final_sesstion:this.fb.group({
      total_points: ['', Validators.required],
      final_approval: ['', Validators.required],
    }),
  })

  
  done() {
    this.completed = true;
    this.state = 'done';
    console.log(this.myForm.valid);
    console.log(this.second.valid);
  }

  onSubmit() {
    // Handle form submission
    console.log(this.myForm.value,"form values");
    
  }
  // Function to determine the CSS class for each step
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
nextTab() {
  if (this.tabGroup && this.tabGroup.selectedIndex !== null) {
    const currentIndex = this.tabGroup.selectedIndex;
    const tabCount = this.tabGroup._tabs.length;
    const nextIndex = (currentIndex + 1) % tabCount;

    this.tabGroup.selectedIndex = nextIndex;
  }
}

}

