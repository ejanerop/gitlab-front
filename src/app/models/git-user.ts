export class GitUser {

  id : number ;
  name : string ;
  username : string ;
  state : string ;
  web_url : string ;
  avatar_url : string ;

  constructor (
    id : number ,
    name : string,
    username : string,
    state : string ,
    web_url : string ,
    avatar_url : string
  )
  {
    this.id = id;
    this.name = name;
    this.username = username;
    this.state = state;
    this.web_url = web_url;
    this.avatar_url = avatar_url;
  }

}
