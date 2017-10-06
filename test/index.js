import test from 'ava'
import MultiStorage from '../index'

global.window = {}
import 'mock-local-storage'
window.localStorage = global.localStorage

test('initialization', t => {
    const storage = new MultiStorage('Users')
    t.is(storage.storageName, 'Users')

    storage.useStorage('Books')
    t.is(storage.storageName, 'Books')
})

test('setter/getter', t => {
    const storage = new MultiStorage('Users')
    storage.set('usr1', 'test1')
    t.is(storage.get('usr1'), 'test1')
})

test('getter default', t => {
    const storage = new MultiStorage('Users')
    const value = storage.get('key_not_exists', 'default value')
    t.is(value, 'default value')
})

test('length', t => {
    const storage = new MultiStorage('Foo')
    storage.set('key1', 'value1')
    storage.set('key2', 'value2')
    storage.set('key3', 'value3')
    t.is(storage.length, 3)
})

test('remove/clear', t => {
    const storage = new MultiStorage('Foo')
    storage.set('key1', 'value1')
    storage.set('key2', 'value2')
    storage.set('key3', 'value3')

    storage.remove('key1')
    t.is(storage.length, 2)

    storage.clear()
    t.is(storage.length, 0)
})

test('custom serializer', t => {
    const serialize = () => { 
        return JSON.stringify('serialized value')
    }
    const storage = new MultiStorage('Bar', { 
        serialize 
    })

    storage.set('key1', 'value1')
    t.is(storage.get('key1'), 'serialized value')
})