# MultiStorage

Simple wrapper around localStorage to create multiple independent storages.

## Examples

**Storage initialization**

    // specify storage key in constructor
    const UsersStorage = new MultiStorage('Users')
    
    // or later
    const AnyStorage = new MultiStorage()
    ...
    AnyStorage.useStorage('Books')

**Setting values**

    MultiStorage::set(key, value)

Key should be string. Value should be string or any serializable. Default serializer — `JSON.stringify()`

    UsersStorage.set('user1', {name: 'John', age: 30})
    AnyStorage.set('some_key', 'some_value')

**Getting values**

    MultiStorage::get(key, defaultValue = false)

If key not found in storage method can return default value.

    UsersStorage.get('user1') // -> {name: 'John', age: 30}
    UsersStorage.get('user100') // -> null
    UsersStorage.get('user100', 'no user') // -> no user

**Iterate over storage**

    UsersStorage.each((key, value, index) => {
        console.log(key, value) // -> 'user1', {name: 'John', age: 30}
        
        // index equals real localStorage index of found key, so it can be unexpected
        console.log(index) // -> 17
    })

**Storage size**

    UsersStorage.length // 1

Length is a computed property obtained by bypassing the entire repository. Potential bottleneck.

**Removing items**

    UsersStorage.remove('user1') // remove one item by key
    UsersStorage.clear() // remove all items in storage