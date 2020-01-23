@app
dimsum-zo7

@static

@http
get /
get /api/contact
post /api/contact
post /api/register
post /api/confirm/:id

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
