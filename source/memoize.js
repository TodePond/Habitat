//=========//
// Memoize //
//=========//
{
	// Memoize the function - Modified from https://tjinlag.medium.com/memoize-javascript-function-638f3b7c80e9
    // keymaker is optional and allows you to specifiy a method for generating the key for the cache
    // It should be used if the default method is not suitable for the use case
    // The memo function returns a new function that will now be memoized, meaning it caches results
	Habitat.memo = (fn, keyMaker) => {
        // Make a Map (similar to an object but with faster lookup) to store the results of the function
        const cache = new Map()

        return (...args) => {
            // Make a key that will be used to look up the results of the function
            // This keyMaker is not very efficent, but should work for more use cases
            // A better keyMaker would be one that is specific to the use case, such as (a) => args[0]
            const key = keyMaker ? keyMaker.apply(this, args) : args.map(JSON.stringify).join('')

            // If the key is in the cache, return the value
            if (cache.has(key)) {
                return cache.get(key)
            }

            // If the key is not in the cache, run the function and store the result in the cache
            const result = fn.apply(this, args)
            cache.set(key, result)

            return result
        }
	}
	
	Habitat.memo.install = (global) => {
		global.memo = Habitat.memo	
		Habitat.memo.installed = true
	}
	
}
