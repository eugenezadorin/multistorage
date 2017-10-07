# MultiStorage

Simple wrapper around localStorage to create multiple independent storages.

In fact, items still stored in localStorage, but keys are dynamically converted as follows:

    key -> @StorageName:key

All class methods applies only to keys with @StorageName prefix.

But if there is no storage name specified for current MultiStorage instance, it works like usual localStorage. For example:

    let myStorage = new MultiStorage()
    myStorage.set('some_key', 'some_value') // equals to localStorage.setItem('some_key', 'some_value')
    myStorage.clear() // works as proxy for localStorage.clear()

## Installation

    npm install multi-localstorage
    
    // Then you can use
    import MultiStorage from 'multi-localstorage'

    // or include compiled script
    <script src="node_modules/multi-localstorage/dist/multistorage.min.js"></script>

## Examples

**Storage initialization**

    // specify storage key in constructor
    const UsersStorage = new MultiStorage('Users')
    
    // or anytime later
    const AnyStorage = new MultiStorage()
    ...
    AnyStorage.useStorage('Books') // there is no items convertation under the hood, just changing storage name. Previously saved items have not changed.

**Setting values**

    MultiStorage::set(key, value)

Key should be string. Value should be string or any serializable. Default serializer — `JSON.stringify()`

    UsersStorage.set('user1', {name: 'John', age: 30}) // equals to localStorage.setItem('@Users:user1', JSON.stringify({name: 'John', age: 30}))
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