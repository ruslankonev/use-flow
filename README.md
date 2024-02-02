# useFlow()

The `useFlow` function orchestrates asynchronous operations, allowing for sequential and parallel execution of tasks. This versatile tool supports a variety of use cases, from data fetching and processing to complex workflow management.

## Features

- **Flexible Arguments**: Accepts an arbitrary number of functions, arrays of functions for parallel execution, and promises.
- **Sequential Execution**: Processes tasks in the order they are provided, passing the result of one task as the input to the next.
- **Parallel Execution**: Supports parallel task execution by accepting arrays of functions, utilizing `Promise.all` for efficiency.
- **Dynamic Workflow Management**: Easily manage complex asynchronous workflows within a single, cohesive pipeline.

## Installation

```sh
npm i @ruslankonev/use-flow
```

No specific installation steps are required other than including the `useFlow` function in your project. Ensure you have a modern JavaScript environment that supports `async/await` syntax.

## Usage

### Basic Example

```typescript
// Define asynchronous tasks
async function fetchData() {
  // Simulate fetching data
  return { data: 'Sample data' };
}

function processData(data) {
  // Process and return data
  return { processedData: `${data.data} processed` };
}

async function saveData(processedData) {
  // Simulate saving data
  console.log(processedData);
}

// Execute tasks sequentially
useFlow(
  fetchData,
  processData,
  saveData
);

// One more example
useFlow(
  () => ({startValue: Date.now()}),
  (payload) => somePromise({value: 1}),
  (response) => processData
);

```

### Parallel Execution

To execute tasks in parallel, wrap them in an array:

```typescript
async function fetchUserData() {
  // Fetch user data
  return { user: 'John Doe' };
}

async function fetchPosts() {
  // Fetch posts
  return ['Post 1', 'Post 2'];
}

// Execute fetchUserData and fetchPosts in parallel, then process results
useFlow(
  [fetchUserData, fetchPosts],
  processData
);
```

### Handling Promises

The `useFlow` function can also handle promises directly as part of the workflow:

```typescript
const somePromise = new Promise((resolve) => resolve('Some data'));

useFlow(
  somePromise,
  (response) => processData
);
```

## Error Handling

Ensure to implement error handling within your tasks. The `useFlow` function does not catch errors by default, so consider using try-catch blocks within asynchronous tasks or chaining `.catch()` for promises.

## Contributing

Contributions are welcome! If you have suggestions or want to improve the `useFlow` function, please feel free to submit a pull request or open an issue.
