import { Machine } from 'xstate';

export const promiseMachine = Machine({
  id: 'promise',
  context: {
    // some data
  },
  initial: 'idle',
  states: {
    idle: {
      on: {
        PENDING: 'pending'
      }
    },
    pending: {
      on: {
        RESOLVE: 'resolved',
        REJECT: 'rejected',
        RESET: 'pending'
      }
    },
    resolved: {
      type: 'final'
    },
    rejected: {
      type: 'final'
    },
  }
})
