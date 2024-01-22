import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, BehaviorSubject, tap, catchError } from 'rxjs'
// import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  open(content: any, arg1: { ariaLabelledBy: string; }) {
    throw new Error('Method not implemented.');
  }
  getUsers() {
    throw new Error('User display error');
  }
  url = 'http://localhost:5132/api/';
  private currentUserSubject: BehaviorSubject<any> | undefined;

  currentUser: any = {};
  constructor(private _http: HttpClient) {

    //this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
}

  // getUsers(){
  //   alert("working")
  //   return this._http.get(this.url);
  //   console.log(this.url,"url of service");
  GetAllUsers(): Observable<any> {
    
    return this._http.get<any>(this.url + 'Users/GetAllUsers')
      .pipe(
        tap((data) => {
          console.log('Data from GetAllUsers:', data);
        }),
        catchError((error) => {
          console.error('Error in GetAllUsers:', error);
          throw error; // Rethrow the error or handle as needed
        })
      );
  }
  GetArchivedScoreSheets(): Observable<any> {
    
    return this._http.get<any>(this.url + 'Scoresheet/getArchivedScoreSheets')
      .pipe(
        tap((data) => {
        }),
        catchError((error) => {
          throw error; // Rethrow the error or handle as needed
        })
        
      );
  }
  GetFormulae(): Observable<any> {

    return this._http.get<any>(this.url + 'Scoresheet/GetFormulae')
      .pipe(
        tap((data) => {
          console.log('Data from GetFormulae:', data);
        }),
        catchError((error) => {
          console.error('Error in GetFormulae:', error);
          throw error; // Rethrow the error or handle as needed
        })
      );
  }

  // GetAllUsers1(snapid:any): Observable<any> {
  //   alert("working")
  //   console.log(snapid,"service id");

  //   return this._http.get<any>(this.url + 'Users/GetAllUsers/'+snapid)
  //   .pipe(
  //     tap((data) => {
  //       console.log('Data from GetAllUsers1:', data);
  //     }),
  //     catchError((error) => {
  //       console.error('Error in GetAllUsers1:', error);
  //       throw error; // Rethrow the error or handle as needed
  //     })
  //   );
  // }
  GetUserDetailsById(id: any): Observable<any> {
   
    return this._http.get<any>(this.url + `Users/GetUserDetailsById/${id}`)
      .pipe(
        tap((data) => {
          console.log('Data from GetUserDetailsById:', data);
        }),
        catchError((error) => {
          console.error('Error in GetAllUsers:', error);
          throw error; // Rethrow the error or handle as needed
        })
      );
  }
  UpdateUser(data: any) {
    return this._http.post(this.url + 'Users/UpdateUser', data)
  }

  UpdateUser1(postd: any) {
    return this._http.put(this.url + 'Users/UpdateUser/', + postd.id, postd)
  }



  createUser(data: any) {
    return this._http.post(this.url + 'Users/CreateUser', data)
  }
  CreateApplicant(data: any): Observable<any> {
    return this._http.post(this.url + 'Scoresheet/createApplicant', data)
  }
  CreateIncomeVerfication(data: any): Observable<any> {
    return this._http.post(this.url + 'Scoresheet/createIncomeVerfication', data)
  }
  CreateCreditSummary(data: any): Observable<any> {
    return this._http.post(this.url + 'Scoresheet/createCreditSummary', data)
  }
  CreateLandLordReferences(data: any): Observable<any> {
    return this._http.post(this.url + 'Scoresheet/createLandLordReferences', data)
  }
  createRentalHistory(data: any): Observable<any> {
    return this._http.post(this.url + 'Scoresheet/createRentalHistory', data)
  }
  CreatePets(data: any): Observable<any> {
    return this._http.post(this.url + 'Scoresheet/createPets', data)
  }
  CreatePointsSummary(data: any): Observable<any> {
    return this._http.post(this.url + 'Scoresheet/createPointsSummary', data)
  }
 
  
  Getapplicantinfo(): Observable<any> {
    return this._http.get(this.url + 'Scoresheet/getAllApplicants')
  }
  // UpdateApplicant(id:any): Observable<any>{
  //   return this._http.get(this.url+`Scoresheet/UpdateApplicant/${id}`)
  // }
  UpdateApplicant(id: any): Observable<any> {
    // alert("workingb aupdate aplicanent")
    return this._http.get<any>(this.url + `Scoresheet/updateApplicant/${id}`)
      .pipe(
        tap((data) => {
          console.log('Data from UpdateApplicant:', data);
        }),
        catchError((error) => {
          console.error('Error in UpdateApplicant:', error);
          throw error; // Rethrow the error or handle as needed
        })
      );
  }

  GetScroreSheetByApplicantId(appid:any,sno:any): Observable<any> {
    //return this._http.get(this.url + 'Scoresheet/GetScroreSheetByApplicantId/${appid}/${sno}')

    return this._http.get<any>(this.url + `Scoresheet/GetScroreSheetByApplicantId/${appid}/${sno}`)
      .pipe(
        tap((data) => {
          console.log('Data from GetUserDetailsById:', data);
        }),
        catchError((error) => {
          console.error('Error in GetAllUsers:', error);
          throw error; // Rethrow the error or handle as needed
        })
      );
  }
  GetApprovalSummaryByApplicantId(appid: any): Observable<any> {
    //return this._http.get(this.url + 'Scoresheet/GetScroreSheetByApplicantId/${appid}/${sno}')

    return this._http.get<any>(this.url + `Scoresheet/GetApprovalSummaryByApplicantId/${appid}`)
      .pipe(
        tap((data) => {
          console.log('Data from GetApprovalSummaryByApplicantId:', data);
        }),
        catchError((error) => {
          console.error('Error in GetApprovalSummaryByApplicantId:', error);
          throw error; // Rethrow the error or handle as needed
        })
      );
  }
  CreateCoverSheet(data: any) {
    return this._http.post(this.url + 'Scoresheet/CreateCoverSheet', data)
  }

  GetCoverSheetbyapplicantId(appid: any): Observable<any> {
    //return this._http.get(this.url + 'Scoresheet/GetScroreSheetByApplicantId/${appid}/${sno}')

    return this._http.get<any>(this.url + `Scoresheet/getCoversheettByApplicantId/${appid}`)
      .pipe(
        tap((data) => {
          console.log('Data from getCoversheettByApplicantId:', data);
        }),
        catchError((error) => {
          console.error('Error in GetAllUsers:', error);
          throw error; // Rethrow the error or handle as needed
        })
      );
  }

 
  // UpdateApplicant(id:any): Observable<any>{
  //   return this._http.get(this.url+`Scoresheet/UpdateApplicant/${id}`)
  // }
  UpdateCoversheetapplicant(id: any): Observable<any> {
    // alert("workingb aupdate aplicanent")
    return this._http.get<any>(this.url + `CoverSheet/UpdateCoverSheet/${id}`)
      .pipe(
        tap((data) => {
          console.log('Data from UpdateApplicant:', data);
        }),
        catchError((error) => {
          console.error('Error in UpdateApplicant:', error);
          throw error; // Rethrow the error or handle as needed
        })
      );
  }

}
