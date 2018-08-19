import { Record } from 'immutable'
import { v4 as uuid} from 'uuid'

const DEFAULT_ATTRS = {
  id: undefined,
  cid: uuid(),
  _saving: false,
  _fetching: false,
  _deleted: false,
}

export default (attrs: object, description: string) => {
  return class extends Record({ ...DEFAULT_ATTRS, ...attrs }, description) {
    id: number
    cid: string

    static build (attrs: any) { return new this(attrs) }

    static actions: object = {
      fetchAll() { throw new Error(`fetchAll not implemented on ${description} class`) }
    }

    static selectors: object = {
      select() { throw new Error(`select not implemented on ${description} class`) },
      selectAll() { throw new Error(`selectAll not implemented on ${description} class`) }
    }

    get actions(): object {
      return {
        fetch: () => { throw new Error(`fetch not implemented on ${description}`) },
        create: () => { throw new Error(`create not implemented on ${description}`) },
        update: () => { throw new Error(`update not implemented on ${description}`) },
        destroy: () => { throw new Error(`destroy not implemented on ${description}`) }
      }
    }

    get identifier() { return this.persisted ? this.id : this.cid }
    get persisted() { return !!this.id; }

    identifierEquals(otherRecord) {
      return this.identifier.toString() === otherRecord.identifier.toString()
    }
  }
}