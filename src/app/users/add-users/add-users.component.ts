import { Component } from '@angular/core';
import { FormBuilder, Validators ,FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent {

  currentUser: any={ };
  constructor(private fb: FormBuilder,private router: Router,private _http:UsersService) {
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


    createUser = this.fb.group({
     
      fullname: ['', Validators.required],
      // lastname: ['', Validators.required],
      // middlename: ['', Validators.required],
      roleId: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      status: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],  
      createdBy: this.currentUser.id,  
     
      })

      ngOnInit(){

      }
      onSubmit(){
        // console.log(this.createUser.value,"post data");
        this.createUser.patchValue({
          createdBy: this.currentUser.id.toString()

        })
                this._http.createUser(this.createUser.value).subscribe((res)=>{
          console.log(res,"posted data");
          this.router.navigate(['/users']);
          Swal.fire({
            title: 'Record Added Sucessfully',
            text: 'User Added Sucessfully',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          
        })
        
      }
      onCancel(){
        this.router.navigate(['/users']);

      }
  }
  

