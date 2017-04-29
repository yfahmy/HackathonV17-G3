<template>
  <div class="hello">
  <h1>{{date(time).toDateString()}}</h1>
  <h2>{{date(time).toLocaleTimeString()}}</h2>
  <div>
    Samlet promille: {{getTotalBAC()}}
  </div>
  <div>
    Gjennomsnittlig: {{getAverageBAC()}}
  </div>
    <input type="button" v-on:click="play()" value="play/pause">
    <input type="range" v-model="time" min="1493460000" max="1493478000"/>
    Speed:
    <input type="button" v-on:click="speed+=10; play();play();" value="+">
    <input type="button" v-on:click="speed-=10; play();play();" value="-">
    
    <h2>Timeline</h2>
    <div v-for="trans in getTransactions()">
      {{date(trans.time).toLocaleTimeString()}}: {{getPerson(trans.person).name}} bought {{trans.item}}
    </div>
  </div>
</template>

<script>
export default {

  // {{date(trans.data)}}: {{persons[trans.person].name}} bought {{trans.item}}
  name: 'hello',

  methods: {
    compTrans: function (a, b) {
      if (a.time < b.time) {
        return -1
      }
      if (a.time > b.time) {
        return 1
      }

      return 0
    },

    date: function (epoch) { return new Date(epoch * 1000) },

    play: function () {
      if (this.playing) {
        clearInterval(this.timer)
      } else {
        this.timer = setInterval(this.update, 1000 / this.speed)
      }

      this.playing = !this.playing
    },

    update: function () {
      this.time++
    },

    getPerson: function (id) {
      var p = null
      this.persons.forEach(function (person) {
        if (person.id === id) {
          p = person
        }
      })
      return p
    },

    getTransactions: function () {
      var trans = []
      for (var i = 0; i < this.transactions.length; i++) {
        if (this.transactions[i].time <= this.time) {
          trans.push(this.transactions[i])
        }
      }
      trans.sort(this.compTrans)
      trans.reverse()

      return trans
    },
    getTransactionsForPerson: function (person) {
      var trans = []
      for (var i = 0; i < this.transactions.length; i++) {
        if (this.transactions[i].time <= this.time && this.transactions[i].person === person.id) {
          trans.push(this.transactions[i])
        }
      }
      trans.sort(this.compTrans)

      return trans
    },

    getBAC: function (person) {
      var trans = this.getTransactionsForPerson(person)
      if (trans.length === 0) {
        return 0
      }
      var startTime = trans[0].time
      var hoursSinceStart = (this.time - startTime) / 3600

      var bac = 12 * trans.length / (person.weight * 0.6) - 0.15 * hoursSinceStart

      if (bac < 0) {
        bac = 0
      }

      return Math.round(bac * 100) / 100
    },

    getTotalBAC: function () {
      var bac = 0
      var t = this
      this.persons.forEach(function (person) {
        bac += t.getBAC(person)
      })
      return bac
    },
    getAverageBAC: function () {
      return this.getTotalBAC() / this.persons.length
    }
  },

  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      time: 1493460000,
      timer: null,
      speed: 10,
      playing: false,

      persons: [
        {
          'id': 1,
          'name': 'Eivind',
          'weight': 75,
          'gender': 'm'
        },
        {
          'id': 2,
          'name': 'Sigurd',
          'weight': 80,
          'gender': 'm'
        },
        {
          'id': 3,
          'name': 'Yara',
          'weight': 60,
          'gender': 'f'
        },
        {
          'id': 4,
          'name': 'Jerome',
          'weight': 80,
          'gender': 'm'
        },
        {
          'id': 5,
          'name': 'Donald',
          'weight': 100,
          'gender': 'm'
        }
      ],
      transactions: [
        {
          'person': 1,
          'time': 1493460868,
          'item': 'beer'
        },
        {
          'person': 1,
          'time': 1493467974,
          'item': 'beer'
        },
        {
          'person': 1,
          'time': 1493464374,
          'item': 'beer'
        },
        {
          'person': 1,
          'time': 1493469032,
          'item': 'shot'
        },
        {
          'person': 2,
          'time': 1493461810,
          'item': 'shot'
        },
        {
          'person': 2,
          'time': 1493463610,
          'item': 'shot'
        },
        {
          'person': 2,
          'time': 1493464210,
          'item': 'shot'
        },
        {
          'person': 3,
          'time': 1493464210,
          'item': 'beer'
        },
        {
          'person': 4,
          'time': 1493460010,
          'item': 'beer'
        },
        {
          'person': 4,
          'time': 1493462410,
          'item': 'beer'
        },
        {
          'person': 5,
          'time': 1493460610,
          'item': 'beer'
        },
        {
          'person': 5,
          'time': 1493461810,
          'item': 'beer'
        },
        {
          'person': 5,
          'time': 1493463010,
          'item': 'beer'
        },
        {
          'person': 5,
          'time': 1493464210,
          'item': 'beer'
        },
        {
          'person': 5,
          'time': 1493464900,
          'item': 'beer'
        },
        {
          'person': 5,
          'time': 1493465120,
          'item': 'beer'
        },
        {
          'person': 5,
          'time': 1493468410,
          'item': 'beer'
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
