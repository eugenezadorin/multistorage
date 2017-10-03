export default class MultiStorage
{
    constructor(storageName = false, options = {}) {
        this.storageName = storageName
        this.defaultOptions = {}
        this.options = Object.assign(this.defaultOptions, options)
    }

    get length () {
        if (!this.storageName) {
            return window.localStorage.length
        }
        
        let len = 0
        this.each(() => len++)
        return len
    }

    useStorage(storageName) {
        this.storageName = storageName
    }

    set(key, value) {
        window.localStorage.setItem(
            this._prepareKey(key),
            JSON.stringify(value)
        )
    }

    get(key, defaultValue) {
        const value = window.localStorage.getItem(this._prepareKey(key))
        if (!value && typeof defaultValue != 'undefined') {
            return defaultValue
        }
        return value
    }

    each(callback) {
        let i, key
        const storageName = this.storageName ? ('@' + this.storageName + ':') : false

        for (i = 0; i < window.localStorage.length; i++) {
            key = window.localStorage.key(i)
            if (storageName) {
                if (key.indexOf(storageName) === 0) {
                    callback(this._decodeKey(key), window.localStorage.getItem(key), i)
                }
            } else {
                callback(key, window.localStorage.getItem(key), i)
            }
        }
    }

    remove(key) {
        window.localStorage.removeItem(this._prepareKey(key))
    }

    clear() {
        if (!this.storageName) {
            window.localStorage.clear()
            return
        }

        this.each((key) => this.remove(key))
    }

    _prepareKey(k) {
        if (this.storageName) {
            return `@${this.storageName}:${k}` 
        }
        return k
    }

    _decodeKey(k) {
        if (this.storageName) {
            return k.replace(`@${this.storageName}:`, '') 
        }
        return k
    }
}