export async function useFlow(...args: any[]) {
  let acc = {}

  // Check if the first argument is an object with named functions
  if (args.length === 1 && typeof args[0] === 'object' && args[0].constructor.name === 'Object') {
    const functions = args[0]
    for (const key in functions) {
      if (typeof functions[key] === 'function') {
        const result = await functions[key]()
        // Merge the result into the accumulator object
        acc = { ...acc, ...result }
      }
    }
  } else {
    // Handle as rest parameters (functions, arrays, promises)
    for (const fn of args) {
      if (Array.isArray(fn)) {
        const results = await Promise.all(fn.map((f) => (typeof f === 'function' ? f(acc) : f)))
        results.forEach((result) => Object.assign(acc, result))
      } else if (fn instanceof Promise) {
        const result = await fn
        Object.assign(acc, result)
      } else if (typeof fn === 'function') {
        const result = await fn(acc)
        if (typeof result !== 'object' && fn.name) {
          Object.assign(acc, { [fn.name]: result })
        } else {
          Object.assign(acc, result)
        }
      } else if (typeof fn === 'object' && fn.constructor.name === 'Object') {
        Object.assign(acc, fn)
      }
    }
  }

  return acc
}

// symlink
export const flow = useFlow
