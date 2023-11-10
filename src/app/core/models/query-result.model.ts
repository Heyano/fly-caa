export class QueryResultsModel {
    data: any [] = [];
    success : boolean = false;
    pagination : any = {};
    startIndex: number = 1
    endIndex: number = 1
    totalRecords: number = 1;
    limit : number = 1;
    page: number = 0;
}


export class QueryResultModel {
    data: any = {};
    success : boolean = false;
    pagination : any = {};
}
