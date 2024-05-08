import { questions } from './questions/questions.js'

export const services = (app) => {
  app.configure(questions)

  // All services will be registered here
}
