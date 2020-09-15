<template>
  <div>
    <div>Hi, I'm the Promise Machine.</div>
    <button id="send-pending" v-on:click="send('PENDING')">Send Pending</button>
    <button id="send-resolved" v-on:click="send('RESOLVE')">Send Resolved</button>
    <button id="send-rejected" v-on:click="send('REJECT')">Send Rejected</button>
    <div id="pending">{{ current.matches("pending") ? "Pending" : "Empty" }}</div>
    <div id="resolved">{{ current.matches("resolved") ? "Resolved" : "Empty" }}</div>
    <div id="rejected">{{ current.matches("rejected") ? "Rejected" : "Empty" }}</div>
    <button id="reset" v-on:click="reset()">Reset</button>
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
        debugger;
        this.current = state;
        this.context = state.context;
      })
      .start()
    }
  }
}
</script>
