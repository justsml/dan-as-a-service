let test = require('tape')
let tiny = require('tiny-json-http')
let sandbox = require('@architect/sandbox')
let url = 'http://localhost:6666'

let end // Saves a reference to be used later to shut down the sandbox

test('Start sandbox', async t => {
  t.plan(2)
  t.ok(sandbox, 'Sandbox loaded')
  end = await sandbox.start()
  t.ok(end, 'Sandbox started!')
})

test('post /api/register', async t => {
  t.plan(1)
  const data = {
    name: 'dan',
    email: 'dan@example.com',
    source: 'testing'
  }
  try {
    let result = await tiny.post({url: `${url}/api/register`, data})
    t.ok(result, 'Got result:', console.log(result.body.toString().substring(0,50) + '...'))
  } catch (err) {
    console.log('FAILED:', err)
    t.fail(err)
  }
})

test('Shut down sandbox', t=> {
  t.plan(1)
  end()
  tiny.get({url},
  function win (err, result) {
    if (err) {
      t.equal(err.code, 'ECONNREFUSED', 'Sandbox succssfully shut down')
    } else {
      t.fail('Sandbox did not shut down')
    }
  })
})

