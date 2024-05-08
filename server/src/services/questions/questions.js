import { QuestionsService, getOptions } from './questions.class.js'
import { questionsPath, questionsMethods } from './questions.shared.js'

export * from './questions.class.js'

// A configure function that registers the service and its hooks via `app.configure`
export const questions = (app) => {
  // Register our service on the Feathers application
  app.use(questionsPath, new QuestionsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: questionsMethods,
    // You can add additional custom events to be sent to clients here
    events: ['reply']
  })
  // Initialize hooks
  app.service(questionsPath).hooks({
    around: {
      all: []
    },
    before: {
      all: [],
      find: [],
      get: [],
      create: [],
      patch: [],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
