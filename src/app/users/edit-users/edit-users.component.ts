// Import necessary modules
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'edit-users-component',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})
export class EditUserComponent implements OnInit {
  snapid: any;
  result: any; currentUser: any={ };
  constructor(private fb: FormBuilder, private router: Router, private activate: ActivatedRoute, private _http: UsersService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
  }
  // Assuming you have roles and statuses defined in your component.
  roles: any[] = [
    { value: 'admin', viewValue: 'Admin' },
    { value: 'editor', viewValue: 'Editor' },
    { value: 'reader', viewValue: 'Reader' },
    // Add more roles as needed
  ];

  statuses: any[] = [
    { value: 'Active', viewValue: 'Active' },
    { value: 'Inactive', viewValue: 'Inactive' },
    // Add more statuses as needed
  ];


  UpdateUser = this.fb.group({
    id: ['', Validators.required],
    firstname: ['', Validators.required],
    roleId: ['', Validators.required],
    userName: ['', Validators.required],
    email: ['', Validators.required],
    address: ['', Validators.required],
    status: ['', Validators.required],
    password: ['', Validators.required],
    phone: ['', Validators.required],
    modifiedBy: this.currentUser.id,
  })

  ngOnInit() {
    this.snapid = this.activate.snapshot.paramMap.get('id') || '';
    this.getdata();
    console.log(this.snapid,"snap id edituser componet");

  }
  onSubmit() {
    // console.log(this.createUser.value,"post data");
    this.UpdateUser.patchValue({
      modifiedBy: this.currentUser.id.toString()
      
    })
    this._http.UpdateUser(this.UpdateUser.value).subscribe((res) => {
      console.log(res, "posted data");
      this.router.navigate(['/users']);
    })

  }
  getdata() {
    debugger;
    // alert("edit-user compont")
    this._http.GetUserDetailsById(this.snapid).subscribe((data) => {
      console.log(data, "getting data");
      this.result = data
      debugger;
      this.UpdateUser.patchValue({
        // firstname: this.result[0].firstname,
        roleId: this.result[0].roleId,
        userName: this.result[0].userName,
        email: this.result[0].email,
        address: this.result[0].address,
        status: this.result[0].status,
        password: this.result[0].password,
        phone: this.result[0].phone,
        id:this.result[0].id,
        // modifiedBy: this.currentUser.id
      })
    })
  }

  updatedata() {
    // alert("bye")
    const payload = {
      'id': this.UpdateUser.value.id,
      // 'firstname': this.UpdateUser.value.firstname,
      //'role': this.UpdateUser.value.role,
      'roleId': this.UpdateUser.value.roleId,
      'userName': this.UpdateUser.value.userName,
      'password': this.UpdateUser.value.password,
      'address': this.UpdateUser.value.address,
      'email': this.UpdateUser.value.email,
      'status': this.UpdateUser.value.status,
      'phone': this.UpdateUser.value.phone,
      //  'modifiedBy': this.currentUser.id
    }
    this._http.UpdateUser1(payload).subscribe((res: any) => {
      console.log(res, "this is updateddddd data");
      this.router.navigate(['/users']);

    })
  }
  onCancel(){
    this.router.navigate(['/users']);

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
