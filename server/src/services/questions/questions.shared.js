export const questionsPath = 'questions'

export const questionsMethods = ['find', 'get', 'create', 'patch', 'remove']

export const questionsClient = (client) => {
  const connection = client.get('connection')

  client.use(questionsPath, connection.service(questionsPath), {
    methods: questionsMethods
  })
}
