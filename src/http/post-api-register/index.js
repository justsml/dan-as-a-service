const arc = require('@architect/functions')
const helpers = require('@architect/shared/helpers')
const data = require('@begin/data')
const tableName = 'members'
const parseBody = arc.http.helpers.bodyParser

// Enable secure sessions, express-style middleware, and more:
// https://docs.begin.com/en/functions/http/
//
// const begin = require('@architect/functions')

exports.handler = async function http(req) {
  let body = parseBody(req) // Pass the entire request object
  if (!body.email || body.email.length < 5)
    return helpers.createErrorResponse(new Error('Email address must be at least 5 characters.'))

  let result = await data.set({
    table: tableName,
    key: body.email,
    email: body.email,
    name: body.name || '[anonymous]',
    confirmed: false,
    confirmedByIp: false,
    confirmedDate: false,
    createdDate: new Date(),
    source: body.source || req.headers.get('referer') || 'site',
  })

  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      message: `Registered ${body.email}! Please check your email to confirm your account.`
    })
  }
}
