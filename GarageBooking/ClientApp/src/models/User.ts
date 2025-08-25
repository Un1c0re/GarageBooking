export default class User {
  constructor(options: Partial<User>) {
    this.id = options.id ?? 0;
    this.keycloakId = options.keycloakId ?? "";
    this.nickname = options.nickname ?? "";
    this.firstName = options.firstName ?? "";
    this.lastName = options.lastName ?? "";
    this.email = options.email ?? "";
  }

  id: number;
  keycloakId: string;
  nickname: string;
  firstName: string;
  lastName: string;
  email: string;

  get fullName() {
    return this.firstName + " " + this.lastName;
  }
}
