import Component from "./component";

export default class Entity {
    /**
     * @param {number} id
     * @param {Component[]} components
     */
    constructor(id, components) {
        this.id = id;
        this.components = components || [];
    }
    isNeedUpdate() {
        for (let c of this.components) {
            if (c.isNeedUpdate()) {
                return true;
            }
        }
        return false;
    }
    /**
     * @param {new (...arg: any) => Component} ComponentClass
     */
    _hasOne(ComponentClass) {
        return !!this.get(ComponentClass);
    }
    /**
     * @param {new (...arg: any) => T} ComponentClass
     * @returns {T[]}
     * @template T
     */
    gets(ComponentClass) {
        let result = [];
        for (let component of this.components) {
            if (component instanceof ComponentClass) {
                result.push(component);
            }
        }
        return result;
    }
    /**
     * @param {new (...arg: any) => T} ComponentClass
     * @returns {T}
     * @template T
     */
    get(ComponentClass) {
        return this.gets(ComponentClass)[0];
    }
    /**
     * @param {(new (...arg: any) => Component)[]} ComponentClasses
     */
    has(...ComponentClasses) {
        for (let ComponentClass of ComponentClasses) {
            if (!this._hasOne(ComponentClass)) {
                return false;
            }
        }
        return true;
    }
}
