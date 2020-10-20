import { Hook } from './hook'
import { Suite } from './suite'
import { Test } from './test'

/**
 * Main class for a runnable class (e.g. test, suite or a hook)
 * mainly used to capture its running duration
 */
export default abstract class RunnableStats {
    start?: Date
    end?: Date
    _duration: number

    constructor (public type: string) {
        this.start = new Date()
        this._duration = 0
    }

    complete () {
        this.end = new Date()
        this._duration = this.end.getTime() - this.start!.getTime()
    }

    get duration () {
        if (this.end) {
            return this._duration
        }
        return new Date().getTime() - this.start!.getTime()
    }

    /**
     * ToDo: we should always rely on uid
     */
    static getIdentifier (runner: Hook | Suite | Test) {
        return runner.uid || runner.title
    }
}
