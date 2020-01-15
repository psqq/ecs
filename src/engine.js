import Entity from "./entity";


export default class Engine {
    /**
     * @param {Object} options
     * @param {number} options.fixedDeltaTime
     */
    constructor(options) {
        /** @type {System[]} */
        this.systems = [];
        /** @type {Map<number, Entity>} */
        this.entities = new Map();
        this.fixedDeltaTime = options.fixedDeltaTime || 0;
        this._uid = 0;
    }
    getSystem(SystemClass) {
        for (let system of this.systems) {
            if (system instanceof SystemClass) {
                return system;
            }
        }
    }
    /**
     * @param {Entity} entity
     */
    removeEntity(entity) {
        this.entities.delete(entity.id);
    }
    /**
     * @type {System} system
     */
    addSystem(system) {
        system.setEngine(this);
        this.systems.push(system);
    }
    getAllSystems() {
        return this.systems;
    }
    getAllEntities() {
        return this.entities.values();
    }
    getEntitiesInGroup(groupName) {
        let result = [];
        for (let e of this.entities.values()) {
            for (let g of e.gets(Group)) {
                if (g.name == groupName) {
                    result.push(e);
                }
            }
        }
        return result;
    }
    /**
     * @param {Component[]} components
     */
    createEntity(...components) {
        let id = this._uid++;
        let entity = new Entity(id, components);
        this.entities.set(id, entity);
        return entity;
    }
    isNeedUpdate() {
        for (let e of this.entities.values()) {
            if (e.isNeedUpdate()) {
                return true;
            }
        }
        return false;
    }
    /**
     * @param {System[]} systems
     * @param {Entity[]} entities
     * @param {number} deltaTime
     */
    update(systems, entities, deltaTime) {
        if (!systems || systems.length == 0 || !entities || entities.length == 0) {
            return;
        }
        for (let system of systems) {
            system.update(entities, deltaTime);
        }
    }
    /**
     * @param {number} deltaTime
     */
    updateAll(deltaTime) {
        this.update(this.getAllSystems(), this.getAllEntities(), deltaTime);
    }
    /**
     * @param {number} deltaTime
     */
    updateEntitiesGroup(groupName, deltaTime) {
        this.update(this.getAllSystems(), this.getEntitiesInGroup(groupName), deltaTime);
    }
}
