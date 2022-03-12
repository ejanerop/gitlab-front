export class GitUser {
  id: number;
  name: string;
  username: string;
  state: string;
  web_url: string;
  avatar_url: string;
  visible: boolean = true;
  access_level?: number = 0;

  constructor(
    id: number,
    name: string,
    username: string,
    state: string,
    web_url: string,
    avatar_url: string,
    access_level?: number
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.state = state;
    this.web_url = web_url;
    this.avatar_url = avatar_url;
    this.access_level = access_level;
  }

  checkName(name: string) {
    if (this.includes(name)) {
      this.visible = true;
    } else {
      this.visible = false;
    }
  }

  includes(name: string) {
    return (
      this.name.toLowerCase().includes(name.toLowerCase()) ||
      this.username.toLowerCase().includes(name.toLowerCase())
    );
  }
}
