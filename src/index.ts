export async function useFlow(...functions: any) {
  if (!functions) return

  let acc = {}

  if (typeof functions == 'function') {
    let resp = await functions(acc)

    if (typeof resp == 'function') {
      resp = await resp()
    }

    return resp
  }

  if (functions.constructor.name === 'Object') {
    for (const func in functions) {
      const fn = functions[func]

      if (typeof fn === 'function') {
        let resp = await fn(acc)

        if (typeof resp == 'function') {
          resp = await resp()
        }

        if (resp && fn.name) {
          acc[func] = resp
        }
      }
    }
  } else {
    for (const fn of functions) {
      // const fn = functions[func]

      if (Array.isArray(fn)) {
        acc = await Promise.all(fn)
      }

      if (fn instanceof Promise) {
        await fn
      }

      if (typeof fn === 'function') {
        let resp = await fn(acc)

        if (typeof resp === 'function') {
          resp = await resp()
        }

        if (resp && fn.name) {
          acc[fn.name] = resp
        }
      }
    }
  }

  return acc
}

// symlink
export const flow = useFlow
