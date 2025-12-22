let x1 = "hello";

// Runtime type check
if (typeof x1 === "string") {
    console.log("x is a string");
}

// Type inference using typeof
type Typeofx = typeof x; // Typeofx is inferred as 'string'

let person1 = {
    name: "hell",
    age: 10
}

// Creating a type alias from the person object
type PersonType = typeof person1; 
// Something is inferred as: { name: string; age: number; }


type Person3Key = keyof PersonType;

function getPropertyF(person: PersonType, key: Person3Key){
    return person[key];
}


