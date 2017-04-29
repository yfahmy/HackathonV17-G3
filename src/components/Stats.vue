<template>
  <div class="hello">
    <input type="range" v-model="time" min="1493460000" max="1493478000"/>
    {{date(time)}}
    <center>
      <table v-for="person in persons">
        <tr>
          <th>{{person.name}}</th>
          <th>{{getBAC(person)}}</th>
        </tr>
      </table>
    </center>
  </div>
</template>

<script>
export default {
  // {{date(trans.data)}}: {{persons[trans.person].name}} bought {{trans.item}}
  name: 'hello',

  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      time: 1493460000,
      date: function (epoch) { return new Date(epoch * 1000) },
      persons: [
        {
          'id': 1,
          'name': 'Eivind',
          'weight': 75,
          'gender': 'm',
          'currenBAC': 0
        },
        {
          'id': 2,
          'name': 'Sigurd',
          'weight': 80,
          'gender': 'm',
          'currenBAC': 0
        },
        {
          'id': 3,
          'name': 'Yara',
          'weight': 60,
          'gender': 'f',
          'currenBAC': 0
        },
        {
          'id': 4,
          'name': 'Jerome',
          'weight': 80,
          'gender': 'm',
          'currenBAC': 0
        },
        {
          'id': 5,
          'name': 'Donald',
          'weight': 100,
          'gender': 'm',
          'currenBAC': 0
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
  },

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
    sortTopDrunkest: function () {
      this.persons.sort(function (a, b) {
        return parseFloat(b.currentBAC - a.currentBAC)
      })
    },
    getTransactions: function () {
      var trans = []
      for (var i = 0; i < this.transactions.length; i++) {
        if (this.transactions[i].time <= this.time) {
          trans.push(this.transactions[i])
        }
      }
      trans.sort(this.compTrans)

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
      person.currentBAC = bac
      this.sortTopDrunkest()
      return Math.round(bac * 100) / 100
    },

    getAlcoholLitre: function (drink) {
      switch (drink) {
        case 'beer':
          return 0.5 * 0.04
        case 'shot':
          return 0.035 * 0.4
      }
    },

    calculateBAC: function (transaction) {
      var personID = transaction.person
      const person = this.persons[personID - 1]
      var previousTransactions = this.getTransactionsForPerson(person)
      if (previousTransactions <= 0) {
        return 0
      }
      var startTime = previousTransactions[0].time
      var hoursSinceStart = (this.time - startTime) / 3600
      const weight = person.weight
      const gender = person.gender
      const alcoholOunces = this.getAlcoholLitre(transaction.item) * 0.0295735
      var bac
      switch (gender) {
        case 'f':
          bac = (alcoholOunces * 100) / (0.66 * weight) - (0.15 * hoursSinceStart)
          break
        case 'm':
          bac = (alcoholOunces * 100) / (0.73 * weight) - (0.15 * hoursSinceStart)
          break
      }
      return Math.round(bac * 100) / 100
    },

    getPerson: function (id) {
      for (var i = 0; i < this.persons.length; i++) {
        if (this.persons[i].id === id) {
          return this.persons[i]
        }
      }
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
