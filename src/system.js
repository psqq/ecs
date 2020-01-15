import Entity from "./entity";
import Engine from "./engine";


export default class System {
    constructor() {
        /** @type {Engine} */
        this.engine = null;
    }
    setEngine(engine) {
        this.engine = engine;
    }
    /**
     * @param {Entity[]} entities
     * @param {number} deltaTime
     */
    update(entities, deltaTime) { }
}
