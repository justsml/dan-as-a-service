@app
dimsum-zo7

@static

@http
get /
get /api/contact
post /api/contact
post /api/register

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
