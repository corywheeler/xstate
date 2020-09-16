<template>
  <div class="mt-5">
    <div class="mb-2 underline">Hi, I'm the Promise Machine.</div>
    <button id="send-pending"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            v-on:click="send('PENDING')">Send Pending
    </button>
    <button id="send-resolved"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            v-on:click="send('RESOLVE')">Send Resolved
    </button>
    <button id="send-rejected"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            v-on:click="send('REJECT')">Send Rejected
    </button>
    <div id="pending" v-if="current.matches('pending')">Pending</div>
    <div id="resolved" v-if="current.matches('resolved')">Resolved</div>
    <div id="rejected" v-if="current.matches('rejected')">Rejected</div>
    <button id="reset"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            v-on:click="reset()">Reset
    </button>
  </div>
</template>

<script>
import { interpret } from 'xstate';
import { promiseMachine } from '~/components/promiseMachine'

export default {
  name: 'promise-machine',
  created() {
    this.reset();
  },
  data() {
    return {
      promiseservice: interpret(promiseMachine),
      current: promiseMachine.initialState,
      context: promiseMachine.context
    }
  },
  methods: {
    send(event) {
      this.promiseservice.send(event)
    },
    reset() {
      console.log('Look to services and Actors to handle this instead.');

      this.promiseservice = interpret(promiseMachine);
      this.promiseservice.onTransition(state => {
        this.current = state;
        this.context = state.context;
      })
      .start()
    }
  }
}
</script>
