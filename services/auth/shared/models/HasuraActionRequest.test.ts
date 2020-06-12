import { plainToClass, IsInt, Min, Max, Length, validateOrReject } from "../deps.ts";

const users = [{
  "id": 1,
  "firstName": "Johny",
  "lastName": "Cage",
  "age": 27,
}, {
  "id": 2,
  "firstName": "Ismoil",
  "lastName": "Somoni",
  "age": 50,
}, {
  "id": 3,
  "firstName": "Luke",
  "lastName": "Dacascos",
  "age": 12,
}];

export class User {
  @IsInt()
  @Min(0)
  @Max(10)
  id!: number;
  
  @Length(10, 20)
  firstName!: string;
  
  @Length(10, 20)
  lastName!: string;

  @IsInt()
  @Min(0)
  @Max(10)
  age!: number;

  getName() {
    return this.firstName + " " + this.lastName;
  }

  isAdult() {
    return this.age > 36 && this.age < 60;
  }
}

const realUsers: User[] = users.map((user) => {
  return plainToClass(User, user);
});

Deno.test("class transform test", async () => {
  realUsers.forEach((user) => {
    console.log(user);
    console.log(user.getName());
    console.log(user.isAdult());
  });
});

async function validateOrRejectExample(input: any) {
  try {
      await validateOrReject(input);
  } catch (errors) {
      console.log("Caught promise rejection (validation failed). Errors: ", errors)
  }
}

Deno.test("class validate test", async () => {
  realUsers.forEach(validateOrRejectExample);
});
