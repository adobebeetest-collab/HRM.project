# JavaScript Tutorial for Beginners - Line by Line Guide

Welcome to this comprehensive JavaScript tutorial! This guide will teach you JavaScript from the ground up, explaining each concept line by line. This tutorial is specifically designed for beginners working with the HRM.project codebase.

---

## Table of Contents
1. [Introduction to JavaScript](#1-introduction-to-javascript)
2. [Variables and Data Types](#2-variables-and-data-types)
3. [Operators](#3-operators)
4. [Conditional Statements](#4-conditional-statements)
5. [Loops](#5-loops)
6. [Functions](#6-functions)
7. [Arrays](#7-arrays)
8. [Objects](#8-objects)
9. [ES6+ Modern Features](#9-es6-modern-features)
10. [DOM Manipulation](#10-dom-manipulation)
11. [Asynchronous JavaScript](#11-asynchronous-javascript)
12. [React-Specific JavaScript](#12-react-specific-javascript)
13. [Common Patterns in This Project](#13-common-patterns-in-this-project)

---

## 1. Introduction to JavaScript

JavaScript is a programming language that makes websites interactive. It runs in your web browser and can also run on servers using Node.js.

### Your First JavaScript Code

```javascript
// This is a comment - it won't be executed
console.log("Hello, World!");  // This prints text to the console
```

**Line by Line Explanation:**
- `//` creates a comment that JavaScript ignores
- `console.log()` is a function that prints output to the browser's console
- `"Hello, World!"` is a string (text) we're printing
- `;` marks the end of a statement (optional in many cases, but good practice)

---

## 2. Variables and Data Types

Variables store data that you can use and change in your program.

### Variable Declarations

```javascript
// Modern way to declare variables (ES6+)
let userName = "John";        // Line 1: Can be reassigned
const userAge = 25;           // Line 2: Cannot be reassigned
var oldStyle = "avoid this";  // Line 3: Old way, has issues

// Changing variable values
userName = "Jane";            // Line 5: This works with let
// userAge = 26;              // Line 6: This would cause an error with const
```

**Line by Line Explanation:**
- **Line 1**: `let` declares a variable that can change. `userName` is the variable name, `"John"` is the initial value
- **Line 2**: `const` declares a constant - a variable that cannot be reassigned
- **Line 3**: `var` is the old way (avoid using it)
- **Line 5**: We can change a `let` variable's value
- **Line 6**: We cannot reassign a `const` variable

### Data Types

```javascript
// 1. String (text)
let message = "Hello";           // Line 1: Using double quotes
let greeting = 'Hi there';       // Line 2: Using single quotes
let template = `Welcome ${userName}`; // Line 3: Template literal with variable

// 2. Number
let age = 25;                    // Line 5: Integer
let price = 19.99;               // Line 6: Decimal
let negative = -10;              // Line 7: Negative number

// 3. Boolean (true/false)
let isActive = true;             // Line 9: Boolean value
let isLoggedIn = false;          // Line 10: Boolean value

// 4. Undefined
let notDefined;                  // Line 12: Variable declared but no value

// 5. Null
let emptyValue = null;           // Line 14: Intentionally empty value

// 6. Array
let numbers = [1, 2, 3, 4, 5];   // Line 16: List of values

// 7. Object
let person = {                   // Line 18: Object with properties
  name: "John",
  age: 30
};
```

**Line by Line Explanation:**
- **Lines 1-3**: Strings can use `"`, `'`, or `` ` `` (backticks). Backticks allow you to insert variables using `${}`
- **Lines 5-7**: Numbers can be integers, decimals, or negative
- **Lines 9-10**: Booleans represent true/false values
- **Line 12**: `undefined` means the variable has no value yet
- **Line 14**: `null` means intentionally no value
- **Line 16**: Arrays hold multiple values in order
- **Lines 18-21**: Objects hold key-value pairs

---

## 3. Operators

Operators perform operations on values.

### Arithmetic Operators

```javascript
let a = 10;
let b = 3;

let sum = a + b;        // Line 4: Addition (13)
let difference = a - b; // Line 5: Subtraction (7)
let product = a * b;    // Line 6: Multiplication (30)
let quotient = a / b;   // Line 7: Division (3.333...)
let remainder = a % b;  // Line 8: Modulus - remainder of division (1)
let power = a ** b;     // Line 9: Exponentiation (1000)

// Increment and Decrement
let count = 0;
count++;                // Line 12: Increases count by 1 (now count = 1)
count--;                // Line 13: Decreases count by 1 (now count = 0)
```

**Line by Line Explanation:**
- **Line 4**: `+` adds two numbers together
- **Line 5**: `-` subtracts the second number from the first
- **Line 6**: `*` multiplies two numbers
- **Line 7**: `/` divides the first number by the second
- **Line 8**: `%` gives the remainder after division (10 ÷ 3 = 3 remainder 1)
- **Line 9**: `**` raises a to the power of b
- **Line 12**: `++` adds 1 to the variable
- **Line 13**: `--` subtracts 1 from the variable

### Comparison Operators

```javascript
let x = 5;
let y = 10;

let isEqual = x === y;           // Line 4: Strict equality (false)
let isNotEqual = x !== y;        // Line 5: Not equal (true)
let isGreater = x > y;           // Line 6: Greater than (false)
let isLess = x < y;              // Line 7: Less than (true)
let isGreaterOrEqual = x >= 5;   // Line 8: Greater than or equal (true)
let isLessOrEqual = x <= 10;     // Line 9: Less than or equal (true)
```

**Line by Line Explanation:**
- **Line 4**: `===` checks if values are exactly equal (strict equality)
- **Line 5**: `!==` checks if values are not equal
- **Line 6**: `>` checks if left is greater than right
- **Line 7**: `<` checks if left is less than right
- **Line 8**: `>=` checks if left is greater than or equal to right
- **Line 9**: `<=` checks if left is less than or equal to right

### Logical Operators

```javascript
let isAdult = true;
let hasLicense = false;

let canDrive = isAdult && hasLicense;  // Line 4: AND - both must be true (false)
let canEnter = isAdult || hasLicense;  // Line 5: OR - at least one true (true)
let isChild = !isAdult;                // Line 6: NOT - opposite of isAdult (false)
```

**Line by Line Explanation:**
- **Line 4**: `&&` (AND) returns true only if both conditions are true
- **Line 5**: `||` (OR) returns true if at least one condition is true
- **Line 6**: `!` (NOT) inverts the boolean value (true becomes false, false becomes true)

---

## 4. Conditional Statements

Conditional statements let your code make decisions.

### If-Else Statements

```javascript
let age = 18;

// Simple if statement
if (age >= 18) {                    // Line 4: Check if condition is true
  console.log("You are an adult");  // Line 5: Executes if condition is true
}

// If-else statement
if (age >= 18) {                    // Line 9: Check condition
  console.log("You can vote");      // Line 10: Executes if true
} else {                            // Line 11: Otherwise...
  console.log("You cannot vote");   // Line 12: Executes if false
}

// If-else-if statement
let score = 85;

if (score >= 90) {                  // Line 17: Check first condition
  console.log("Grade: A");          // Line 18: Execute if score >= 90
} else if (score >= 80) {           // Line 19: Check second condition
  console.log("Grade: B");          // Line 20: Execute if score >= 80
} else if (score >= 70) {           // Line 21: Check third condition
  console.log("Grade: C");          // Line 22: Execute if score >= 70
} else {                            // Line 23: If none of the above
  console.log("Grade: F");          // Line 24: Execute if all else fails
}
```

**Line by Line Explanation:**
- **Lines 4-6**: Basic if - code runs only if condition is true
- **Lines 9-13**: If-else - one block runs (either if or else)
- **Lines 17-25**: If-else-if chain - checks conditions in order, runs first match

### Ternary Operator

```javascript
let age = 20;
let status = age >= 18 ? "adult" : "minor";  // Line 2: Shorthand if-else
console.log(status);  // Prints "adult"
```

**Line by Line Explanation:**
- **Line 2**: The ternary operator `condition ? valueIfTrue : valueIfFalse` is a shorthand for if-else
- If `age >= 18` is true, `status` gets "adult", otherwise "minor"

---

## 5. Loops

Loops repeat code multiple times.

### For Loop

```javascript
// Traditional for loop
for (let i = 0; i < 5; i++) {       // Line 2
  console.log(i);                    // Line 3: Prints 0, 1, 2, 3, 4
}
```

**Line by Line Explanation:**
- **Line 2**: For loop has three parts:
  - `let i = 0` - initialization (starts at 0)
  - `i < 5` - condition (runs while this is true)
  - `i++` - increment (adds 1 after each iteration)
- **Line 3**: This code runs 5 times (i = 0, 1, 2, 3, 4)

### While Loop

```javascript
let count = 0;                      // Line 1: Initialize counter

while (count < 3) {                 // Line 3: Check condition before each iteration
  console.log(count);               // Line 4: Prints 0, 1, 2
  count++;                          // Line 5: Increment counter
}
```

**Line by Line Explanation:**
- **Line 1**: Start with count at 0
- **Line 3**: While loop checks condition before each iteration
- **Line 4**: Code inside loop runs if condition is true
- **Line 5**: Increment count (important to avoid infinite loop!)

### For...of Loop (Arrays)

```javascript
let fruits = ["apple", "banana", "orange"];

for (let fruit of fruits) {         // Line 3: Loop through array
  console.log(fruit);               // Line 4: Prints each fruit
}
```

**Line by Line Explanation:**
- **Line 3**: `for...of` loops through array values directly
- **Line 4**: On each iteration, `fruit` holds the current array item

---

## 6. Functions

Functions are reusable blocks of code.

### Function Declaration

```javascript
// Basic function
function greet() {                  // Line 2: Declare function named 'greet'
  console.log("Hello!");            // Line 3: Function body
}

greet();                            // Line 6: Call/execute the function

// Function with parameters
function greetPerson(name) {        // Line 9: Function with one parameter
  console.log("Hello, " + name);    // Line 10: Use the parameter
}

greetPerson("Alice");               // Line 13: Call with argument "Alice"

// Function with return value
function add(a, b) {                // Line 16: Function with two parameters
  return a + b;                     // Line 17: Return the sum
}

let result = add(5, 3);             // Line 20: Call function and store result
console.log(result);                // Line 21: Prints 8
```

**Line by Line Explanation:**
- **Lines 2-4**: Define a function using the `function` keyword
- **Line 6**: Execute the function by writing its name with `()`
- **Lines 9-11**: Parameters are variables that receive values when function is called
- **Line 13**: Pass "Alice" as an argument to the `name` parameter
- **Lines 16-18**: `return` sends a value back to where the function was called
- **Line 20**: The returned value (8) is stored in `result`

### Function Expression

```javascript
const multiply = function(a, b) {   // Line 1: Store function in variable
  return a * b;
};

let product = multiply(4, 5);       // Line 5: Call the function
```

**Line by Line Explanation:**
- **Line 1**: Functions can be stored in variables
- Function expressions are useful for callbacks and higher-order functions

### Arrow Functions (ES6+)

```javascript
// Basic arrow function
const square = (x) => {             // Line 2: Arrow function with one parameter
  return x * x;
};

// Shorter arrow function (implicit return)
const cube = (x) => x * x * x;      // Line 7: One-liner with automatic return

// No parameters
const sayHi = () => console.log("Hi!");  // Line 10: Empty parentheses for no params

// One parameter (parentheses optional)
const double = x => x * 2;          // Line 13: Parentheses optional with 1 param
```

**Line by Line Explanation:**
- **Line 2**: Arrow functions use `=>` instead of `function` keyword
- **Line 7**: For one expression, you can omit `{}` and `return` (implicit return)
- **Line 10**: Use `()` when there are no parameters
- **Line 13**: With one parameter, parentheses are optional

---

## 7. Arrays

Arrays store ordered lists of values.

### Creating and Accessing Arrays

```javascript
// Creating an array
let fruits = ["apple", "banana", "orange"];  // Line 2: Array with 3 items

// Accessing elements (zero-indexed)
let firstFruit = fruits[0];         // Line 5: Get first item (apple)
let secondFruit = fruits[1];        // Line 6: Get second item (banana)

// Array length
let count = fruits.length;          // Line 9: Number of items (3)

// Modifying elements
fruits[1] = "grape";                // Line 12: Change banana to grape
```

**Line by Line Explanation:**
- **Line 2**: Create array with square brackets `[]`
- **Lines 5-6**: Access items using index (starting at 0)
- **Line 9**: `.length` property gives the number of items
- **Line 12**: Assign new value to an index to change that element

### Array Methods

```javascript
let numbers = [1, 2, 3, 4, 5];

// Add elements
numbers.push(6);                    // Line 4: Add to end [1,2,3,4,5,6]
numbers.unshift(0);                 // Line 5: Add to beginning [0,1,2,3,4,5,6]

// Remove elements
let last = numbers.pop();           // Line 8: Remove and return last item
let first = numbers.shift();        // Line 9: Remove and return first item

// Find elements
let index = numbers.indexOf(3);     // Line 12: Find index of value 3
let exists = numbers.includes(4);   // Line 13: Check if 4 exists (true/false)

// Slice (copy portion)
let slice = numbers.slice(1, 4);    // Line 16: Copy items from index 1 to 3

// Splice (remove/add items)
numbers.splice(2, 1, 99);           // Line 19: At index 2, remove 1, add 99
```

**Line by Line Explanation:**
- **Line 4**: `push()` adds item to end of array
- **Line 5**: `unshift()` adds item to beginning of array
- **Line 8**: `pop()` removes and returns last item
- **Line 9**: `shift()` removes and returns first item
- **Line 12**: `indexOf()` finds the position of a value
- **Line 13**: `includes()` checks if value exists
- **Line 16**: `slice(start, end)` copies portion (end not included)
- **Line 19**: `splice(index, deleteCount, newItems...)` modifies array

### Array Iteration Methods

```javascript
let numbers = [1, 2, 3, 4, 5];

// forEach - execute function for each element
numbers.forEach((num) => {          // Line 4: Loop through array
  console.log(num * 2);             // Line 5: Print each number doubled
});

// map - create new array with transformed values
let doubled = numbers.map((num) => num * 2);  // Line 9: [2,4,6,8,10]

// filter - create new array with items that pass test
let evens = numbers.filter((num) => num % 2 === 0);  // Line 12: [2,4]

// find - return first item that passes test
let found = numbers.find((num) => num > 3);  // Line 15: Returns 4

// reduce - reduce array to single value
let sum = numbers.reduce((total, num) => {  // Line 18: Calculate sum
  return total + num;
}, 0);  // Start with 0
```

**Line by Line Explanation:**
- **Lines 4-6**: `forEach()` runs function for each array item (no return value)
- **Line 9**: `map()` creates new array by transforming each item
- **Line 12**: `filter()` creates new array with items that return true
- **Line 15**: `find()` returns first item that matches condition
- **Lines 18-20**: `reduce()` combines all items into single value

---

## 8. Objects

Objects store key-value pairs (properties).

### Creating and Using Objects

```javascript
// Creating an object
let person = {                      // Line 2: Object literal
  firstName: "John",                // Line 3: Property (key: value)
  lastName: "Doe",                  // Line 4: Another property
  age: 30,                          // Line 5: Number property
  isEmployed: true                  // Line 6: Boolean property
};

// Accessing properties - dot notation
let name = person.firstName;        // Line 10: Get value using dot

// Accessing properties - bracket notation
let lastName = person["lastName"];  // Line 13: Get value using brackets

// Adding new properties
person.email = "john@example.com";  // Line 16: Add new property

// Modifying properties
person.age = 31;                    // Line 19: Change existing property

// Deleting properties
delete person.isEmployed;           // Line 22: Remove property
```

**Line by Line Explanation:**
- **Lines 2-7**: Object literal with curly braces `{}`
- **Lines 3-6**: Each property is `key: value` separated by commas
- **Line 10**: Dot notation is most common way to access properties
- **Line 13**: Bracket notation useful for variable keys or special characters
- **Line 16**: Add property by assigning to new key
- **Line 19**: Modify by assigning new value to existing key
- **Line 22**: `delete` removes a property

### Object Methods

```javascript
let calculator = {
  value: 0,                         // Line 2: Property
  
  add: function(num) {              // Line 4: Method (function in object)
    this.value += num;              // Line 5: 'this' refers to calculator object
    return this;                    // Line 6: Return object for chaining
  },
  
  subtract(num) {                   // Line 9: Shorthand method syntax
    this.value -= num;
    return this;
  },
  
  getValue() {                      // Line 14: Method to get value
    return this.value;
  }
};

calculator.add(5).subtract(2);      // Line 19: Method chaining
console.log(calculator.getValue()); // Line 20: Prints 3
```

**Line by Line Explanation:**
- **Line 4**: Method is a function stored as an object property
- **Line 5**: `this` refers to the current object
- **Line 6**: Returning `this` allows method chaining
- **Line 9**: ES6+ shorthand for defining methods
- **Line 19**: Can chain methods that return `this`

### Object Destructuring (ES6+)

```javascript
let person = {
  name: "Alice",
  age: 25,
  city: "New York"
};

// Destructuring - extract properties
const { name, age } = person;       // Line 8: Extract name and age
console.log(name);                  // Line 9: Prints "Alice"
console.log(age);                   // Line 10: Prints 25

// Rename while destructuring
const { city: location } = person;  // Line 13: Extract city as location
console.log(location);              // Line 14: Prints "New York"

// Default values
const { country = "USA" } = person; // Line 17: Use default if property missing
```

**Line by Line Explanation:**
- **Line 8**: Destructuring extracts properties into variables with same names
- **Lines 9-10**: Variables `name` and `age` now exist
- **Line 13**: Use `:` to rename property while extracting
- **Line 17**: Use `=` to provide default value if property doesn't exist

---

## 9. ES6+ Modern Features

Modern JavaScript has many powerful features.

### Template Literals

```javascript
let name = "Alice";
let age = 25;

// Old way (concatenation)
let message1 = "My name is " + name + " and I am " + age;

// New way (template literals)
let message2 = `My name is ${name} and I am ${age}`;  // Line 8: Using backticks

// Multi-line strings
let html = `
  <div>
    <h1>${name}</h1>
    <p>Age: ${age}</p>
  </div>
`;  // Line 16: Multi-line with embedded variables
```

**Line by Line Explanation:**
- **Line 8**: Template literals use backticks `` ` `` and `${}` for variables
- **Lines 10-16**: Template literals can span multiple lines naturally
- Easier to read than string concatenation with `+`

### Spread Operator

```javascript
// Array spreading
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let combined = [...arr1, ...arr2];  // Line 4: [1,2,3,4,5,6]

// Copy array
let copy = [...arr1];               // Line 7: Creates new array [1,2,3]

// Object spreading
let person = { name: "John", age: 30 };
let employee = {
  ...person,                        // Line 12: Copy all properties from person
  role: "Developer"                 // Line 13: Add new property
};
// Result: { name: "John", age: 30, role: "Developer" }

// Function arguments
let numbers = [1, 2, 3];
console.log(Math.max(...numbers));  // Line 18: Spread array as arguments
```

**Line by Line Explanation:**
- **Line 4**: `...` spreads array items into new array
- **Line 7**: Spreads into new array to create a copy
- **Lines 11-14**: Spreads object properties into new object
- **Line 18**: Spreads array items as separate function arguments

### Rest Parameters

```javascript
// Collect remaining arguments
function sum(...numbers) {          // Line 2: ...numbers collects all arguments
  let total = 0;
  for (let num of numbers) {
    total += num;
  }
  return total;
}

console.log(sum(1, 2, 3, 4, 5));   // Line 10: Can pass any number of arguments

// Mix regular and rest parameters
function introduce(firstName, lastName, ...hobbies) {  // Line 13
  console.log(`${firstName} ${lastName} likes: ${hobbies.join(", ")}`);
}

introduce("John", "Doe", "reading", "gaming", "coding");
```

**Line by Line Explanation:**
- **Line 2**: Rest parameter `...numbers` collects all arguments into an array
- **Line 10**: Can pass any number of arguments
- **Line 13**: Can combine regular parameters with rest parameter (rest must be last)

### Default Parameters

```javascript
// Function with default parameter
function greet(name = "Guest") {    // Line 2: Default value if not provided
  console.log(`Hello, ${name}!`);
}

greet();                            // Line 6: Uses default "Guest"
greet("Alice");                     // Line 7: Uses provided "Alice"

// Multiple defaults
function createUser(name = "Anonymous", role = "user") {  // Line 10
  return { name, role };
}
```

**Line by Line Explanation:**
- **Line 2**: `= "Guest"` provides default value if parameter not passed
- **Line 6**: When called without argument, uses default
- **Line 7**: When called with argument, uses that instead
- **Line 10**: Can have multiple default parameters

### Array Destructuring

```javascript
let colors = ["red", "green", "blue"];

// Destructure array
const [first, second] = colors;     // Line 4: Extract first two items
console.log(first);                 // Line 5: Prints "red"
console.log(second);                // Line 6: Prints "green"

// Skip elements
const [, , third] = colors;         // Line 9: Skip first two, get third
console.log(third);                 // Line 10: Prints "blue"

// Rest in destructuring
const [primary, ...others] = colors;  // Line 13: Get first and rest
console.log(others);                // Line 14: Prints ["green", "blue"]
```

**Line by Line Explanation:**
- **Line 4**: Destructure extracts array items into variables by position
- **Line 9**: Use commas to skip elements
- **Line 13**: Use rest operator to collect remaining items

---

## 10. DOM Manipulation

DOM (Document Object Model) represents the HTML structure.

### Selecting Elements

```javascript
// Select single element
const title = document.getElementById("title");  // Line 2: By ID
const button = document.querySelector(".btn");   // Line 3: By CSS selector

// Select multiple elements
const items = document.querySelectorAll("li");   // Line 6: All matching elements
const divs = document.getElementsByClassName("container");  // Line 7: By class
```

**Line by Line Explanation:**
- **Line 2**: `getElementById()` finds element with specific ID
- **Line 3**: `querySelector()` finds first element matching CSS selector
- **Line 6**: `querySelectorAll()` finds all matching elements
- **Line 7**: `getElementsByClassName()` finds elements by class name

### Modifying Elements

```javascript
const heading = document.querySelector("h1");

// Change text content
heading.textContent = "New Title";  // Line 4: Change text

// Change HTML
heading.innerHTML = "<span>New Title</span>";  // Line 7: Change HTML

// Change styles
heading.style.color = "blue";       // Line 10: Change CSS property
heading.style.fontSize = "24px";    // Line 11: camelCase for CSS properties

// Change attributes
const link = document.querySelector("a");
link.setAttribute("href", "https://example.com");  // Line 15: Set attribute
const url = link.getAttribute("href");  // Line 16: Get attribute

// Add/remove classes
heading.classList.add("highlight");     // Line 19: Add CSS class
heading.classList.remove("old-class");  // Line 20: Remove CSS class
heading.classList.toggle("active");     // Line 21: Toggle class on/off
```

**Line by Line Explanation:**
- **Line 4**: `textContent` changes the text inside element
- **Line 7**: `innerHTML` can change HTML structure (be careful with user input!)
- **Lines 10-11**: `style` property changes inline CSS
- **Lines 15-16**: `setAttribute/getAttribute` work with HTML attributes
- **Lines 19-21**: `classList` methods manage CSS classes

### Event Handling

```javascript
const button = document.querySelector("button");

// Add event listener
button.addEventListener("click", function() {  // Line 4: Listen for click
  console.log("Button clicked!");              // Line 5: Run when clicked
});

// Arrow function event listener
button.addEventListener("click", () => {       // Line 9: Using arrow function
  alert("Clicked!");
});

// Event with parameter
button.addEventListener("click", (event) => {  // Line 14: Event object
  console.log(event.target);                   // Line 15: Element that was clicked
  event.preventDefault();                      // Line 16: Prevent default behavior
});

// Common events
input.addEventListener("input", (e) => {       // Line 20: Text input change
  console.log(e.target.value);                 // Line 21: Current input value
});

form.addEventListener("submit", (e) => {       // Line 24: Form submission
  e.preventDefault();                          // Line 25: Stop form from submitting
  // Handle form data here
});
```

**Line by Line Explanation:**
- **Lines 4-6**: `addEventListener(event, function)` runs function when event happens
- **Line 9**: Can use arrow functions for cleaner syntax
- **Line 14**: Event object contains information about the event
- **Line 15**: `event.target` is the element that triggered the event
- **Line 16**: `preventDefault()` stops default browser behavior
- **Line 20**: "input" event fires when text input changes
- **Lines 24-26**: Handle form submission

---

## 11. Asynchronous JavaScript

Asynchronous code doesn't block the program while waiting.

### Callbacks

```javascript
// Callback function
function fetchData(callback) {              // Line 2: Function takes callback
  setTimeout(() => {                        // Line 3: Simulate delay
    const data = { id: 1, name: "John" };   // Line 4: Get data
    callback(data);                         // Line 5: Call the callback with data
  }, 2000);                                 // Line 6: Wait 2 seconds
}

// Using the callback
fetchData((data) => {                       // Line 10: Pass function as callback
  console.log(data);                        // Line 11: Runs after 2 seconds
});
```

**Line by Line Explanation:**
- **Line 2**: Function accepts another function as parameter (callback)
- **Line 3**: `setTimeout` delays execution
- **Line 5**: Execute callback function with data
- **Line 10**: Pass arrow function that will be called later

### Promises

```javascript
// Creating a promise
function fetchUser() {
  return new Promise((resolve, reject) => {  // Line 3: Create promise
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve({ id: 1, name: "Alice" });   // Line 7: Success
      } else {
        reject("Error fetching user");       // Line 9: Failure
      }
    }, 1000);
  });
}

// Using the promise
fetchUser()
  .then((user) => {                          // Line 17: Handle success
    console.log(user);
    return user.id;
  })
  .then((id) => {                            // Line 21: Chain another operation
    console.log(`User ID: ${id}`);
  })
  .catch((error) => {                        // Line 24: Handle error
    console.error(error);
  })
  .finally(() => {                           // Line 27: Always runs
    console.log("Done");
  });
```

**Line by Line Explanation:**
- **Line 3**: Promise represents eventual completion/failure of async operation
- **Line 7**: `resolve(value)` when operation succeeds
- **Line 9**: `reject(reason)` when operation fails
- **Line 17**: `.then()` handles successful result
- **Line 21**: Can chain multiple `.then()` calls
- **Line 24**: `.catch()` handles any errors
- **Line 27**: `.finally()` runs regardless of success/failure

### Async/Await

```javascript
// Async function
async function getUser() {                  // Line 2: 'async' keyword
  const response = await fetch("/api/user"); // Line 3: 'await' pauses execution
  const data = await response.json();       // Line 4: Wait for JSON parsing
  return data;                              // Line 5: Return the data
}

// Using async/await
async function displayUser() {
  try {                                     // Line 10: Try block for errors
    const user = await getUser();           // Line 11: Wait for result
    console.log(user.name);                 // Line 12: Use the data
  } catch (error) {                         // Line 13: Catch errors
    console.error("Error:", error);         // Line 14: Handle error
  }
}

// Call async function
displayUser();                              // Line 19: Execute function
```

**Line by Line Explanation:**
- **Line 2**: `async` keyword makes function return a promise
- **Line 3**: `await` pauses execution until promise resolves
- **Line 4**: Can await multiple times in sequence
- **Lines 10-15**: Use try/catch to handle errors with async/await
- Makes asynchronous code look synchronous (easier to read)

---

## 12. React-Specific JavaScript

This project uses React, which has specific JavaScript patterns.

### JSX (JavaScript XML)

```javascript
// JSX looks like HTML in JavaScript
const element = <h1>Hello, World!</h1>;     // Line 2: JSX element

// JSX with JavaScript expressions
const name = "Alice";
const greeting = <h1>Hello, {name}!</h1>;   // Line 6: Embed JS in {}

// JSX with attributes
const image = <img src="photo.jpg" alt="Photo" />;  // Line 9

// JSX with className (not class)
const div = <div className="container">Content</div>;  // Line 12: Use className
```

**Line by Line Explanation:**
- **Line 2**: JSX looks like HTML but it's JavaScript
- **Line 6**: Use `{}` to embed JavaScript expressions
- **Line 9**: JSX attributes use camelCase
- **Line 12**: Use `className` instead of `class` (JavaScript keyword)

### React Components

```javascript
// Functional component
function Welcome(props) {                   // Line 2: Component is a function
  return <h1>Hello, {props.name}</h1>;      // Line 3: Return JSX
}

// Arrow function component
const Greeting = (props) => {               // Line 7: Using arrow function
  return <div>Welcome, {props.user}</div>;
};

// Component with destructuring
const UserCard = ({ name, age }) => {       // Line 12: Destructure props
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
    </div>
  );
};

// Using components
<Welcome name="Alice" />                    // Line 22: Pass props
<UserCard name="John" age={30} />          // Line 23: Multiple props
```

**Line by Line Explanation:**
- **Line 2**: React component is a function that returns JSX
- **Line 3**: Props (properties) are passed as parameters
- **Line 7**: Can use arrow functions for components
- **Line 12**: Destructure props directly in parameters
- **Lines 22-23**: Use components like HTML tags, pass data as attributes

### React Hooks

```javascript
import { useState, useEffect } from 'react';

// useState hook
function Counter() {
  const [count, setCount] = useState(0);    // Line 5: Declare state variable
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>  {/* Line 10 */}
        Increment
      </button>
    </div>
  );
}

// useEffect hook
function UserProfile() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {                         // Line 22: Runs after render
    fetch("/api/user")
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);                                   // Line 26: Empty array = run once
  
  return <div>{user?.name}</div>;           // Line 28: Optional chaining
}
```

**Line by Line Explanation:**
- **Line 5**: `useState(initialValue)` returns [value, setter function]
- **Line 10**: Call setter function to update state
- **Line 22**: `useEffect()` runs side effects after render
- **Line 26**: Dependency array `[]` controls when effect runs (empty = once)
- **Line 28**: `?.` optional chaining - access property only if user exists

### Event Handling in React

```javascript
function Form() {
  const [value, setValue] = useState("");
  
  // Event handler function
  const handleChange = (event) => {         // Line 5: Event handler
    setValue(event.target.value);           // Line 6: Update state with input value
  };
  
  const handleSubmit = (event) => {         // Line 9: Submit handler
    event.preventDefault();                 // Line 10: Prevent page refresh
    console.log("Submitted:", value);
  };
  
  return (
    <form onSubmit={handleSubmit}>          {/* Line 15: Pass handler */}
      <input 
        value={value}                       {/* Line 17: Controlled input */}
        onChange={handleChange}             {/* Line 18: Update on change */}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

**Line by Line Explanation:**
- **Lines 5-7**: Event handler function updates state
- **Line 6**: `event.target.value` gets input's current value
- **Line 10**: Prevent default form submission behavior
- **Line 15**: Pass function reference to event handler (no `()`)
- **Lines 17-18**: Controlled input - React controls the value

---

## 13. Common Patterns in This Project

Let's look at patterns used in the HRM project.

### Import/Export Modules

```javascript
// Exporting from a file (components/Button.jsx)
export default function Button({ children, onClick }) {  // Line 2: Default export
  return <button onClick={onClick}>{children}</button>;
}

export const SmallButton = () => { /* ... */ };  // Line 6: Named export

// Importing in another file
import Button from './components/Button';        // Line 9: Import default
import { SmallButton } from './components/Button';  // Line 10: Import named

// Import multiple named exports
import { useState, useEffect } from 'react';     // Line 13: Multiple imports

// Import everything
import * as Utils from './utils';                // Line 16: Import all as object
```

**Line by Line Explanation:**
- **Line 2**: `export default` for main export (one per file)
- **Line 6**: Named export for additional exports
- **Line 9**: Import default export (can rename)
- **Line 10**: Import named export (must use exact name or rename with `as`)
- **Line 13**: Import multiple named exports in `{}`
- **Line 16**: Import all named exports as object

### API Calls with Axios

```javascript
import axios from 'axios';

// GET request
async function fetchUsers() {
  try {
    const response = await axios.get('/api/users');  // Line 6: GET request
    console.log(response.data);                      // Line 7: Access data
  } catch (error) {
    console.error('Error:', error);                  // Line 9: Handle error
  }
}

// POST request
async function createUser(userData) {
  try {
    const response = await axios.post('/api/users', userData);  // Line 16
    return response.data;
  } catch (error) {
    throw error;
  }
}

// With headers
const authToken = "your-actual-token-here";  // Line 24: Get token from state/storage
const config = {
  headers: { Authorization: `Bearer ${authToken}` }  // Line 26: Use template literal
};
const response = await axios.get('/api/data', config);  // Line 28
```

**Line by Line Explanation:**
- **Line 6**: `axios.get(url)` makes HTTP GET request
- **Line 7**: Response data is in `response.data`
- **Line 9**: Always handle errors with try/catch
- **Line 16**: `axios.post(url, data)` sends data to server
- **Lines 24-28**: Pass config object for headers, params, etc.

### React Router

```javascript
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>                         {/* Line 5: Wrap app */}
      <nav>
        <Link to="/">Home</Link>            {/* Line 7: Navigation link */}
        <Link to="/about">About</Link>
      </nav>
      
      <Routes>                              {/* Line 11: Define routes */}
        <Route path="/" element={<Home />} />      {/* Line 12: Route */}
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

// Programmatic navigation
function LoginForm() {
  const navigate = useNavigate();           // Line 21: Get navigate function
  
  const handleLogin = () => {
    // After login...
    navigate('/dashboard');                 // Line 25: Navigate programmatically
  };
  
  return <button onClick={handleLogin}>Login</button>;
}
```

**Line by Line Explanation:**
- **Line 5**: `BrowserRouter` enables routing
- **Line 7**: `Link` component for navigation (doesn't reload page)
- **Line 11**: `Routes` wraps all route definitions
- **Line 12**: `Route` defines path and component to render
- **Line 21**: `useNavigate` hook for programmatic navigation
- **Line 25**: Call `navigate(path)` to change route

### Context API (State Management)

```javascript
import { createContext, useContext, useState } from 'react';

// Create context
const UserContext = createContext();        // Line 4: Create context

// Provider component
function UserProvider({ children }) {
  const [user, setUser] = useState(null);   // Line 8: State
  
  const login = (userData) => {             // Line 10: Function
    setUser(userData);
  };
  
  const value = { user, login };            // Line 14: Value to provide
  
  return (
    <UserContext.Provider value={value}>    {/* Line 17: Provide value */}
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use context
function useUser() {
  return useContext(UserContext);           // Line 25: Access context
}

// Using in component
function Profile() {
  const { user, login } = useUser();        // Line 30: Use context hook
  
  if (!user) {
    return <button onClick={() => login({name: "John"})}>Login</button>;
  }
  
  return <div>Welcome, {user.name}</div>;
}
```

**Line by Line Explanation:**
- **Line 4**: `createContext()` creates context object
- **Lines 7-21**: Provider component wraps children and provides value
- **Line 14**: Combine all values/functions to share
- **Line 17**: `Provider` component makes value available to descendants
- **Line 25**: `useContext()` accesses context value
- **Line 30**: Destructure needed values from context

---

## Practice Exercises

Now that you've learned JavaScript, try these exercises:

### Exercise 1: Variables and Functions
```javascript
// Create a function that takes a name and age, returns greeting
// Example: greetUser("Alice", 25) → "Hello Alice, you are 25 years old"
```

### Exercise 2: Arrays
```javascript
// Create function that takes array of numbers, returns only even numbers
// Example: getEvens([1,2,3,4,5,6]) → [2,4,6]
```

### Exercise 3: Objects
```javascript
// Create object representing a book with title, author, pages
// Add method to get book summary
```

### Exercise 4: Async/Await
```javascript
// Create async function that simulates fetching user data
// Use setTimeout to delay 2 seconds, then return user object
```

### Exercise 5: React Component
```javascript
// Create React component that displays counter
// Include buttons to increment and decrement
```

---

## Next Steps

1. **Practice Daily**: Code every day, even if just for 30 minutes
2. **Build Projects**: Create small projects to apply what you learned
3. **Read Code**: Look at files in this HRM project to see real examples
4. **Use Console**: Practice in browser console (F12)
5. **Debug**: Use `console.log()` to understand code flow
6. **Ask Questions**: When stuck, ask for help or search online

---

## Useful Resources

- **MDN Web Docs**: https://developer.mozilla.org/en-US/docs/Web/JavaScript
- **JavaScript.info**: https://javascript.info/
- **React Docs**: https://react.dev/
- **W3Schools**: https://www.w3schools.com/js/

---

## Common Mistakes to Avoid

1. **Forgetting `const`/`let`**: Always declare variables
2. **Using `var`**: Use `const` (preferred) or `let` instead
3. **Mutating state directly**: In React, use setState functions
4. **Not handling errors**: Always use try/catch with async code
5. **Forgetting `async` keyword**: Required when using `await`
6. **Not using `===`**: Use strict equality `===` not loose `==`

---

## Debugging Tips

```javascript
// 1. Console logging
console.log("Value:", someVariable);

// 2. Debugger statement (pauses execution in browser)
debugger;

// 3. Check type
console.log(typeof myVariable);

// 4. Log object properties
console.table(myObject);

// 5. Conditional logging
console.assert(condition, "Error message if false");
```

---

**Congratulations!** You now have a solid foundation in JavaScript. Keep practicing and refer back to this tutorial whenever you need a refresher. The more you code, the better you'll get!

Happy coding! 🚀
