function logGetSet(obj) {
    const logHandler = {
      get: (target, key, receiver) => {
        const result = target[key]
        console.log(`get '${key}' as ${result}`)
        return result
      },
      set: (target, key, value, receiver) => {
        console.log(`set '${key}' to ${value}`)
        target[key] = value
      }
    }
    return new Proxy(obj, logHandler)
  }
  
  
  function logEverything(obj) {
    let logging = false
    const logHandler = new Proxy({}, {
      get(target, trapKey, receiver) {
        return (...args) => {
          if (!logging) {
            logging = true
            console.log(trapKey, args)
            logging = false
          }
          return Reflect[trapKey](...args);
        }
      }
    })
    return new Proxy(obj, logHandler)
  }
  
  let a = [1, 2, 3, {a:1, b:2}];
  let logged = logEverything(a);
  logged[2];
  for (let i in logged) console.log(i);