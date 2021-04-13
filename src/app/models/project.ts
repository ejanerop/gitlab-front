import { GitUser } from "./git-user";

export class Project {

  id : number ;
  name : string ;
  description : string ;
  name_with_namespace : string ;
  owner? : GitUser ;
  avatar_url? : string ;
  forks_count? : number ;
  open_issues_count? : number;
  star_count? : number;
  public? : boolean = true;

  constructor ( id : number , name : string, description : string, name_with_namespace : string )
  {
    this.id = id;
    this.name = name;
    this.description = description;
    this.name_with_namespace = name_with_namespace;
  }

}
