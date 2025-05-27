import app from './src/config/server'

app.listen(app.get('PORT'), () => {
  console.log('Server started on PORT', app.get('PORT'))
})
