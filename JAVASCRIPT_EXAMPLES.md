# Real JavaScript Examples from HRM Project

This document shows real code examples from the HRM project with line-by-line explanations. Use this alongside the main tutorial to see how JavaScript concepts are used in practice.

---

## Example 1: React Component with Props (from Links.jsx)

This is a real component from the sidebar that displays navigation links.

```javascript
// Import statements - bring in code from other files
import React from "react";                           // Line 1: Import React library
import { Link, useLocation } from "react-router-dom"; // Line 2: Import routing tools
import { HiUserGroup } from "react-icons/hi";        // Line 3: Import icon component

// Component function - this is what defines our component
export function SidebarLinks(props) {                // Line 6: Export component function
  let location = useLocation();                      // Line 7: Get current page location
  const { routes, onClose } = props;                 // Line 8: Destructure props
  
  // Function inside component - check if route is active
  const activeRoute = (routeName) => {               // Line 10: Arrow function
    return location.pathname.includes(routeName);    // Line 11: Check if URL contains route
  };
  
  // Event handler function
  const handleLinkClick = () => {                    // Line 15: Function for click event
    if (onClose && window.innerWidth < 1200) {       // Line 16: Conditional check
      onClose();                                     // Line 16: Call function if conditions met
    }
  };
  
  // Function that creates JSX for each route
  const createLinks = (routes) => {                  // Line 19: Function takes array parameter
    return routes.map((route, index) => {            // Line 20: Map over array, return JSX for each
      if (route.layout === "/admin" || route.layout === "/rtl") {  // Line 21: Check condition
        return (                                     // Line 22: Return JSX
          <Link                                      // Line 23: React Router Link component
            key={index}                              // Line 24: Unique key for list items
            to={route.layout + "/" + route.path}     // Line 25: Construct URL
            onClick={handleLinkClick}                // Line 26: Attach click handler
          >
            <div className="relative mb-3 flex hover:cursor-pointer">  {/* Line 28 */}
              <li className="my-[3px] flex cursor-pointer items-center px-8">
                <span
                  className={                        // Line 34: Dynamic className
                    activeRoute(route.path)          // Line 35: Ternary condition
                      ? "font-bold text-brand-500 dark:text-white"  // Line 36: If active
                      : "font-medium text-gray-600"  // Line 37: If not active
                  }
                >
                  {route.icon ? route.icon : <HiUserGroup />}  {/* Line 40: Conditional render */}
                </span>
                <p className="ml-4 flex">{route.name}</p>  {/* Line 42: Display route name */}
              </li>
            </div>
          </Link>
        );
      }
      return null;                                   // Line 52: Return null if condition not met
    });
  };
  
  return <>{createLinks(routes)}</>;                 // Line 56: Return rendered links
}
```

### Key Concepts Used:

1. **Import/Export**: Bringing in code from other files and exporting this component
2. **Destructuring**: `const { routes, onClose } = props` extracts properties from props object
3. **Arrow Functions**: `const activeRoute = (routeName) => { ... }`
4. **Array.map()**: Transform array of routes into array of JSX elements
5. **Ternary Operator**: `condition ? valueIfTrue : valueIfFalse` for conditional values
6. **Conditional Rendering**: `{route.icon ? route.icon : <HiUserGroup />}` shows one or the other
7. **Template Literals**: Would use `` `${route.layout}/${route.path}` `` (shown as concatenation here)
8. **JSX**: HTML-like syntax in JavaScript

---

## Example 2: Understanding Props and Component Communication

```javascript
// Parent component passes data down
function Sidebar() {
  const routes = [                              // Line 3: Array of route objects
    { name: "Dashboard", path: "dashboard", layout: "/admin" },
    { name: "Profile", path: "profile", layout: "/admin" }
  ];
  
  const handleClose = () => {                   // Line 9: Function to close sidebar
    console.log("Sidebar closing");
  };
  
  return (
    <SidebarLinks                               // Line 14: Use the component
      routes={routes}                           // Line 15: Pass routes as prop
      onClose={handleClose}                     // Line 16: Pass function as prop
    />
  );
}

// Child component receives props
function SidebarLinks(props) {                  // Line 22: props contains passed data
  console.log(props.routes);                    // Line 23: Access routes array
  console.log(props.onClose);                   // Line 24: Access function
  
  // Or destructure props
  const { routes, onClose } = props;            // Line 27: Extract into variables
  
  // Now use them directly
  routes.forEach(route => console.log(route.name));  // Line 30: Use routes
  onClose();                                    // Line 31: Call the function
}
```

### Explanation:
- **Props** are how data flows from parent to child components
- Parent component defines data and functions, passes them as attributes
- Child component receives them in `props` parameter
- Can destructure props for easier access

---

## Example 3: State Management with useState

```javascript
import { useState } from 'react';

function Counter() {
  // useState returns [currentValue, updateFunction]
  const [count, setCount] = useState(0);        // Line 5: Initialize state to 0
  
  // Event handlers update state
  const increment = () => {                     // Line 8: Function to increase
    setCount(count + 1);                        // Line 9: Set new value
  };
  
  const decrement = () => {                     // Line 12: Function to decrease
    setCount(count - 1);                        // Line 13: Set new value
  };
  
  const reset = () => {                         // Line 16: Function to reset
    setCount(0);                                // Line 17: Set back to 0
  };
  
  return (
    <div>
      <h1>Count: {count}</h1>                   {/* Line 22: Display current count */}
      <button onClick={increment}>+</button>    {/* Line 23: Attach event handler */}
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### Key Points:
- **useState Hook**: Adds state to functional components
- **Array Destructuring**: `const [value, setter] = useState(initial)` extracts both items
- **State Updates**: Call setter function to change state
- **Re-rendering**: When state changes, component re-renders with new value
- **Event Handlers**: Pass function reference (without `()`) to onClick

---

## Example 4: Working with Forms and Controlled Inputs

```javascript
import { useState } from 'react';

function LoginForm() {
  // State for each input field
  const [email, setEmail] = useState("");       // Line 5: Email state
  const [password, setPassword] = useState(""); // Line 6: Password state
  const [error, setError] = useState(null);     // Line 7: Error message state
  
  // Handle input changes
  const handleEmailChange = (e) => {            // Line 10: e is event object
    setEmail(e.target.value);                   // Line 11: Get input value, update state
  };
  
  const handlePasswordChange = (e) => {         // Line 14: Handler for password
    setPassword(e.target.value);                // Line 15: Update password state
  };
  
  // Handle form submission
  const handleSubmit = (e) => {                 // Line 19: Submit handler
    e.preventDefault();                         // Line 20: Prevent page reload
    
    // Validation
    if (!email || !password) {                  // Line 23: Check if fields are empty
      setError("Please fill all fields");       // Line 24: Set error message
      return;                                   // Line 25: Stop execution
    }
    
    // Clear error if validation passes
    setError(null);                             // Line 29: Clear any previous error
    
    // Submit data
    console.log({ email, password });           // Line 32: Log the data
    // Would call API here in real app
  };
  
  return (
    <form onSubmit={handleSubmit}>              {/* Line 37: Attach submit handler */}
      {error && <div className="error">{error}</div>}  {/* Line 38: Show error if exists */}
      
      <input
        type="email"
        value={email}                           {/* Line 42: Controlled input */}
        onChange={handleEmailChange}            {/* Line 43: Update on change */}
        placeholder="Email"
      />
      
      <input
        type="password"
        value={password}                        {/* Line 49: Controlled input */}
        onChange={handlePasswordChange}         {/* Line 50: Update on change */}
        placeholder="Password"
      />
      
      <button type="submit">Login</button>      {/* Line 54: Submit button */}
    </form>
  );
}
```

### Concepts:
- **Controlled Inputs**: React controls input value via state
- **Event Object**: `e.target.value` gets current input value
- **preventDefault()**: Stops form from submitting normally (page reload)
- **Conditional Rendering**: `{error && <div>{error}</div>}` shows error only if it exists
- **Multiple State Variables**: Each piece of data has its own state

---

## Example 5: Fetching Data with useEffect

```javascript
import { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);       // Line 5: State for users array
  const [loading, setLoading] = useState(true); // Line 6: Loading state
  const [error, setError] = useState(null);     // Line 7: Error state
  
  // Fetch data when component mounts
  useEffect(() => {                             // Line 10: useEffect hook
    const fetchUsers = async () => {            // Line 11: Async function inside
      try {
        setLoading(true);                       // Line 13: Set loading to true
        const response = await axios.get('/api/users');  // Line 14: API call
        setUsers(response.data);                // Line 15: Update users state
        setError(null);                         // Line 16: Clear any errors
      } catch (err) {                           // Line 17: Catch errors
        setError(err.message);                  // Line 18: Set error message
        console.error("Error fetching users:", err);
      } finally {                               // Line 20: Finally always runs
        setLoading(false);                      // Line 21: Set loading to false
      }
    };
    
    fetchUsers();                               // Line 25: Call the function
  }, []);                                       // Line 26: Empty array = run once on mount
  
  // Conditional rendering based on state
  if (loading) {                                // Line 29: Show loading state
    return <div>Loading users...</div>;
  }
  
  if (error) {                                  // Line 33: Show error state
    return <div>Error: {error}</div>;
  }
  
  // Render users list
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (                  // Line 43: Map over users array
          <li key={user.id}>                    {/* Line 44: Unique key required */}
            {user.name} - {user.email}          {/* Line 45: Display user data */}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Important Concepts:
- **useEffect**: Runs side effects (API calls, subscriptions) after render
- **Dependency Array**: `[]` means run once when component mounts
- **Async/Await**: Makes API calls cleaner and easier to read
- **Try/Catch/Finally**: Handle success, errors, and cleanup
- **Conditional Rendering**: Show different UI based on state (loading, error, data)
- **Array.map()**: Transform data array into JSX array
- **Keys**: Each item in list needs unique `key` prop for React optimization

---

## Example 6: React Router Navigation

```javascript
import { useNavigate, useParams, Link } from 'react-router-dom';

function ProductPage() {
  const navigate = useNavigate();               // Line 4: Get navigate function
  const { id } = useParams();                   // Line 5: Get URL parameters
  
  const goBack = () => {                        // Line 7: Function to go back
    navigate(-1);                               // Line 8: Go to previous page
  };
  
  const goToHome = () => {                      // Line 11: Function to go home
    navigate('/');                              // Line 12: Navigate to home route
  };
  
  const goToProduct = (productId) => {          // Line 15: Navigate with parameter
    navigate(`/products/${productId}`);         // Line 16: Dynamic URL
  };
  
  return (
    <div>
      <h1>Product {id}</h1>                     {/* Line 21: Display URL param */}
      
      {/* Declarative navigation with Link */}
      <Link to="/">Home</Link>                  {/* Line 24: Link component */}
      <Link to="/products">All Products</Link>
      
      {/* Programmatic navigation with buttons */}
      <button onClick={goBack}>Go Back</button>         {/* Line 28 */}
      <button onClick={goToHome}>Go Home</button>
      <button onClick={() => goToProduct(123)}>         {/* Line 30: Inline function */}
        View Product 123
      </button>
    </div>
  );
}
```

### Concepts:
- **useNavigate**: Hook for programmatic navigation
- **useParams**: Hook to access URL parameters
- **Link Component**: Declarative way to navigate (like `<a>` but without page reload)
- **navigate()**: Function to change routes programmatically
- **Template Literals**: Build dynamic URLs with variables

---

## Example 7: Context API for Global State

```javascript
import { createContext, useContext, useState } from 'react';

// 1. Create the context
const AuthContext = createContext();            // Line 4: Create context object

// 2. Create provider component
export function AuthProvider({ children }) {    // Line 7: Provider wraps app
  const [user, setUser] = useState(null);       // Line 8: State for user
  const [isAuthenticated, setIsAuthenticated] = useState(false);  // Line 9
  
  // Functions to manipulate state
  const login = (userData) => {                 // Line 12: Login function
    setUser(userData);                          // Line 13: Set user data
    setIsAuthenticated(true);                   // Line 14: Mark as authenticated
  };
  
  const logout = () => {                        // Line 17: Logout function
    setUser(null);                              // Line 18: Clear user data
    setIsAuthenticated(false);                  // Line 19: Mark as not authenticated
  };
  
  // Value object with everything we want to share
  const value = {                               // Line 23: Create value object
    user,                                       // Line 24: Include user state
    isAuthenticated,                            // Line 25: Include auth state
    login,                                      // Line 26: Include login function
    logout                                      // Line 27: Include logout function
  };
  
  return (
    <AuthContext.Provider value={value}>        {/* Line 31: Provide value */}
      {children}                                {/* Line 32: Render child components */}
    </AuthContext.Provider>
  );
}

// 3. Create custom hook for easy access
export function useAuth() {                     // Line 38: Custom hook
  return useContext(AuthContext);               // Line 39: Return context value
}

// 4. Use in App.jsx
function App() {
  return (
    <AuthProvider>                              {/* Line 45: Wrap entire app */}
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </AuthProvider>
  );
}

// 5. Use in any component
function Navigation() {
  const { user, isAuthenticated, logout } = useAuth();  // Line 57: Access context
  
  return (
    <nav>
      {isAuthenticated ? (                      // Line 61: Conditional rendering
        <>
          <span>Welcome, {user?.name}</span>    {/* Line 63: Optional chaining */}
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>          // Line 67: Show login if not authenticated
      )}
    </nav>
  );
}

function Profile() {
  const { user, isAuthenticated } = useAuth();  // Line 74: Access context
  
  if (!isAuthenticated) {                       // Line 76: Guard clause
    return <div>Please log in</div>;
  }
  
  return <div>User Profile: {user.name}</div>;  // Line 80: Show profile
}
```

### Key Points:
- **createContext()**: Creates context object
- **Provider Component**: Wraps app/components that need access to context
- **useContext()**: Hook to access context value in any component
- **Custom Hook**: `useAuth()` makes it easier to use context
- **Shared State**: Any component can access and update shared state
- **No Prop Drilling**: Don't need to pass props through every level

---

## Example 8: Conditional Class Names (Dynamic Styling)

```javascript
function Button({ variant, isActive, disabled, children }) {
  // Build className string based on props
  let className = "px-4 py-2 rounded ";         // Line 3: Base classes
  
  // Add variant classes
  if (variant === "primary") {                  // Line 6: Check variant
    className += "bg-blue-500 text-white ";     // Line 7: Add primary styles
  } else if (variant === "secondary") {         // Line 8: Check secondary
    className += "bg-gray-200 text-gray-800 ";  // Line 9: Add secondary styles
  }
  
  // Add active state classes
  if (isActive) {                               // Line 13: Check if active
    className += "ring-2 ring-blue-300 ";       // Line 14: Add ring for active
  }
  
  // Add disabled state classes
  if (disabled) {                               // Line 18: Check if disabled
    className += "opacity-50 cursor-not-allowed ";  // Line 19: Disabled styles
  }
  
  return (
    <button className={className} disabled={disabled}>  {/* Line 23 */}
      {children}                                {/* Line 24: Button content */}
    </button>
  );
}

// Alternative: Using template literals and ternary operators
function ButtonAlt({ variant, isActive, disabled, children }) {
  const className = `
    px-4 py-2 rounded
    ${variant === "primary" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}
    ${isActive ? "ring-2 ring-blue-300" : ""}   // Line 34: Conditional class
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
  `.trim();                                     // Line 36: Remove extra whitespace
  
  return (
    <button className={className} disabled={disabled}>
      {children}
    </button>
  );
}

// Usage examples
<Button variant="primary" isActive={true}>Click Me</Button>
<Button variant="secondary" disabled={true}>Disabled</Button>
```

### Concepts:
- **String Concatenation**: Building className by adding strings
- **Template Literals**: Using backticks for multi-line strings with variables
- **Ternary Operators**: Conditional values in JSX
- **Conditional Classes**: Add/remove classes based on props/state

---

## Example 9: Array Methods in Practice

```javascript
function EmployeeList() {
  const [employees, setEmployees] = useState([
    { id: 1, name: "John", role: "Developer", salary: 80000 },
    { id: 2, name: "Jane", role: "Designer", salary: 75000 },
    { id: 3, name: "Bob", role: "Developer", salary: 85000 },
    { id: 4, name: "Alice", role: "Manager", salary: 95000 }
  ]);
  
  // Filter: Get only developers
  const developers = employees.filter((emp) => {  // Line 11: Filter array
    return emp.role === "Developer";              // Line 12: Condition
  });
  // Result: [{John}, {Bob}]
  
  // Map: Get array of names
  const names = employees.map((emp) => emp.name);  // Line 17: Extract names
  // Result: ["John", "Jane", "Bob", "Alice"]
  
  // Find: Get specific employee
  const manager = employees.find((emp) => {       // Line 21: Find first match
    return emp.role === "Manager";
  });
  // Result: {id: 4, name: "Alice", ...}
  
  // Reduce: Calculate total salary
  const totalSalary = employees.reduce((sum, emp) => {  // Line 27: Reduce to sum
    return sum + emp.salary;                      // Line 28: Add salary to sum
  }, 0);                                          // Line 29: Start sum at 0
  // Result: 335000
  
  // Sort: Order by salary (descending)
  const sortedBySalary = [...employees].sort((a, b) => {  // Line 33: Copy and sort
    return b.salary - a.salary;                   // Line 34: Sort descending
  });
  // Result: [Alice, Bob, John, Jane]
  
  // Some: Check if any developer exists
  const hasDevelopers = employees.some((emp) => {  // Line 39: Check if any match
    return emp.role === "Developer";
  });
  // Result: true
  
  // Every: Check if all earn > 70k
  const allEarnAbove70k = employees.every((emp) => {  // Line 45: Check if all match
    return emp.salary > 70000;
  });
  // Result: true
  
  return (
    <div>
      <h2>All Employees ({employees.length})</h2>  {/* Line 52: Array length */}
      
      <h3>Developers Only</h3>
      {developers.map((dev) => (                  // Line 55: Map filtered array
        <div key={dev.id}>{dev.name}</div>
      ))}
      
      <h3>Names: {names.join(", ")}</h3>          {/* Line 59: Join array to string */}
      
      <h3>Manager: {manager?.name}</h3>           {/* Line 61: Optional chaining */}
      
      <h3>Total Salary: ${totalSalary.toLocaleString()}</h3>  {/* Line 63 */}
      
      <h3>Sorted by Salary</h3>
      {sortedBySalary.map((emp) => (
        <div key={emp.id}>
          {emp.name}: ${emp.salary.toLocaleString()}
        </div>
      ))}
    </div>
  );
}
```

### Array Methods Summary:
- **filter()**: Create new array with items that pass test
- **map()**: Transform each item into something new
- **find()**: Get first item that matches
- **reduce()**: Combine all items into single value
- **sort()**: Reorder items (always work with copy using spread)
- **some()**: Check if at least one item passes test
- **every()**: Check if all items pass test
- **join()**: Combine array items into string

---

## Example 10: Error Boundaries and Error Handling

```javascript
import { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetchData = async () => {
    try {
      setLoading(true);                         // Line 10: Start loading
      setError(null);                           // Line 11: Clear previous errors
      
      const response = await fetch('/api/data');  // Line 13: Make request
      
      if (!response.ok) {                       // Line 15: Check if request succeeded
        throw new Error(`HTTP error! status: ${response.status}`);  // Line 16
      }
      
      const jsonData = await response.json();   // Line 19: Parse JSON
      setData(jsonData);                        // Line 20: Store data
      
    } catch (err) {                             // Line 22: Catch any errors
      console.error("Fetch error:", err);       // Line 23: Log error
      setError(err.message);                    // Line 24: Store error message
      
    } finally {                                 // Line 26: Always runs
      setLoading(false);                        // Line 27: Stop loading
    }
  };
  
  useEffect(() => {
    fetchData();                                // Line 32: Fetch on mount
  }, []);
  
  // Render based on state
  if (loading) return <LoadingSpinner />;       // Line 36: Loading state
  if (error) return <ErrorMessage error={error} onRetry={fetchData} />;  // Line 37
  if (!data) return <div>No data available</div>;  // Line 38: No data state
  
  return <DataDisplay data={data} />;           // Line 40: Success state
}

// Error message component
function ErrorMessage({ error, onRetry }) {
  return (
    <div className="error-container">
      <h2>Oops! Something went wrong</h2>
      <p>{error}</p>                            {/* Line 49: Display error message */}
      <button onClick={onRetry}>Try Again</button>  {/* Line 50: Retry button */}
    </div>
  );
}
```

### Error Handling Best Practices:
- **Try/Catch/Finally**: Structure for handling errors
- **Loading State**: Show feedback while waiting
- **Error State**: Display errors to user
- **Retry Functionality**: Allow user to try again
- **Conditional Rendering**: Show appropriate UI for each state

---

## Tips for Reading This Project's Code

1. **Start with Routes** (`src/routes.js`): See what pages exist
2. **Look at Views** (`src/views/`): Main page components
3. **Check Components** (`src/components/`): Reusable pieces
4. **Study One File at a Time**: Don't try to understand everything at once
5. **Use Console.log**: Add logging to understand data flow
6. **Read Imports First**: See what tools/libraries the file uses
7. **Follow the Data**: Track where data comes from and goes

---

## Common Patterns You'll See

### Pattern 1: Component File Structure
```javascript
// 1. Imports at top
import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

// 2. Component function
function MyComponent({ props }) {
  // 3. Hooks at top of component
  const [state, setState] = useState();
  
  // 4. Functions/handlers
  const handleClick = () => { };
  
  // 5. useEffect for side effects
  useEffect(() => { }, []);
  
  // 6. Return JSX
  return <div>...</div>;
}

// 7. Export at bottom
export default MyComponent;
```

### Pattern 2: Async Data Fetching
```javascript
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  async function loadData() {
    try {
      setLoading(true);
      const response = await axios.get('/api/endpoint');
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  loadData();
}, []);
```

### Pattern 3: Form Handling
```javascript
const [formData, setFormData] = useState({ name: '', email: '' });

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  await axios.post('/api/submit', formData);
};
```

---

## Debugging Strategies

### 1. Console Logging
```javascript
function MyComponent({ data }) {
  console.log('Component rendered');          // See when component renders
  console.log('Data:', data);                 // See what data looks like
  
  const handleClick = () => {
    console.log('Button clicked');           // Track user interactions
    console.log('Current state:', someState);  // Check state values
  };
  
  return <button onClick={handleClick}>Click</button>;
}
```

### 2. React DevTools
- Install React Developer Tools browser extension
- Inspect component props and state
- Track component re-renders
- View component hierarchy

### 3. Network Tab
- Open browser DevTools (F12)
- Go to Network tab
- See all API requests
- Check request/response data

### 4. Breakpoints
```javascript
function MyComponent() {
  debugger;  // Pause execution here when DevTools open
  
  const data = processData();
  return <div>{data}</div>;
}
```

---

## Next Steps

1. **Open a File**: Start with `src/App.jsx` or a simple component
2. **Read Line by Line**: Use this guide to understand each line
3. **Make Small Changes**: Try changing text, colors, or behavior
4. **Break Things**: See what happens when you change code (you can always undo)
5. **Build Something**: Create a new simple component
6. **Ask Questions**: Use console.log to explore how things work

**Remember**: Everyone starts as a beginner. The best way to learn is by doing!

Happy coding! 🎉
