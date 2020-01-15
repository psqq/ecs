
export default class Component {
    erase() {
        for (let key in this) {
            this[key] = null;
        }
    }
    isInitialized() {
        for (let key in this) {
            if (this[key] != null) {
                return true;
            }
        }
        return false;
    }
    isNeedUpdate() {
        return false;
    }
    repr() {
        let s = this.constructor.name + "(";
        for (let key in this) {
            if (s[s.length - 1] != '(') {
                s += ', ';
            }
            let value = JSON.stringify(this[key]);
            s += `${key}=${value}`;
        }
        return s + ")";
    }
}
