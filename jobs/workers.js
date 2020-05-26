const NodeResque = require('node-resque');
const mailer = require('./mailer');

const connectionDetails = {
    pkg: 'ioredis',
    host: '127.0.0.1',
    password: null,
    port: 6379,
    database: 0
  }
  const jobs = {
    'add': {
      perform: (a, b) => {
        let answer = a + b;
        return answer
      }
    },
    'email': {
        perform: (args)=>{
            
            try{
                var a  = mailer.send(args);
                return a
                
              }
              catch(error){
                console.log("error",error)
              }

        }
    }
  }


async function boot () {

  const worker = new NodeResque.Worker({connection: connectionDetails, queues: ['emailQueue','moviesuggestions']}, jobs)
  await worker.connect()
  worker.start()

  worker.on('start', () => { console.log('worker started') })
  worker.on('end', () => { console.log('worker ended') })
  worker.on('cleaning_worker', (worker, pid) => { console.log(`cleaning old worker ${worker}`) })
  worker.on('poll', (queue) => { console.log(`worker polling ${queue}`) })
  worker.on('ping', (time) => { console.log(`worker check in @ ${time}`) })
  worker.on('job', (queue, job) => { console.log(`working job ${queue} ${JSON.stringify(job)}`) })
  worker.on('reEnqueue', (queue, job, plugin) => { console.log(`reEnqueue job (${plugin}) ${queue} ${JSON.stringify(job)}`) })
  worker.on('success', (queue, job, result) => { console.log(`job success ${queue} ${JSON.stringify(job)} >> ${result}`) })
  worker.on('failure', (queue, job, failure) => { console.log(`job failure ${queue} ${JSON.stringify(job)} >> ${failure}`) })
  worker.on('error', (error, queue, job) => { console.log(`error ${queue} ${JSON.stringify(job)}  >> ${error}`) })
  worker.on('pause', () => { console.log('worker paused') })

}

const queue = new NodeResque.Queue({connection: connectionDetails}, jobs)
queue.on('error', function (error) { console.log(error) })

module.exports = {
    boot,queue
}