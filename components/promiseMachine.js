import { Machine } from 'xstate';

export const promiseMachine = Machine({
  id: 'promise',
  context: {
    // some data
  },
  initial: 'pending',
  states: {
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
