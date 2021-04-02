export class ContactResponse {
  page:number;
  per_page:number;
  total:number;
  total_pages:number;
  data:any;
  support:any;

  constructor( page:number,per_page: number, total :number, total_pages:number, data:any, support: any){

    this.page=page;
    this.per_page=per_page;
    this.total=total;
    this.total_pages=total_pages;
    this.data=data;
    this.support=support;

  }


}
