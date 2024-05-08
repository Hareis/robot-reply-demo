import {nanoid} from 'nanoid'
// This is a skeleton for a custom service class. Remove or add the methods you need here
export class QuestionsService {
  constructor(options) {
    this.options = options
  }
  setup(app) {
    this.app = app
  }
  async find(_params) {
    return []
  }

  async get(id, _params) {
    return {
      id: 0,
      text: `A new message with ID: ${id}!`
    }
  }
  async create(data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map((current) => this.create(current, params)))
    }
    const rid=nanoid(8)
    //这里应该替换成robot框架做响应，现在为了模拟效果，直接返回一个固定的答案
    this.emit('created', {
      ...data,
      rid:rid,
      answer: `你好，我收到了你的消息"${data.question}”，正在思考中...`,
      outputing: true,
      first:1
    })
    await this.sleep(3000)
    const contentList = [
      `AIGC（Artificial Intelligence Generated Content）即人工智能生成内容，即人工智能通过学习大量的数据，来实现自动生成各种内容，如文本、图像、音频、视频等，是继专家生产内容（PGC, Professional Generated Content）、用户生产内容（UGC, User Generated Content）之后的新型内容创作方式`,
      `**AIGC有什么优势？**`,
        `- 随着数字内容消费的不断增长，对于高质量、高效率、多样化的内容需求日益迫切。AIGC有效解决了传统内容创作中成本高、效率低、人力资源有限的问题，尤其适用于需要快速生产大量重复性内容的领域。AIGC主要有以下优势： `,
      `- 提升速度和效率：AIGC可以快速生成大量高质量的内容。例如，在新闻产业中，AI可以自动撰写标准新闻报道，释放记者从事更深入的调查性报道。在软件开发中，AI能够自动生成代码片段，加速开发过程。这种速度优势使企业能够更迅速地响应市场变化，保持竞争力。`,
      `定制化的用户体验：AIGC利用机器学习来分析用户的历史行为和偏好，创建个性化的内容和推荐，从而提供更加针对个人的服务。在电子商务平台，这意味着更精准的商品推荐；在内容平台，这意味着更贴合个人兴趣的文章、视频和音乐推荐。这种个性化加深了与用户的互动，提高了用户粘性。`
    ]
    for (let index = 0; index < 5; index++) {
      this.emit('created', {
        ...data,
        rid:rid,
        answer: contentList[index],
        outputing: true
      })
      await this.sleep(1000)
    }
    return {
      id: 0,
      ...data,
      rid:rid,
      answer: '',
      outputing: false
    }
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
  // This method has to be added to the 'methods' option to make it available to clients
  async update(id, data, _params) {
    return {
      id: 0,
      ...data
    }
  }

  async patch(id, data, _params) {
    return {
      id: 0,
      text: `Fallback for ${id}`,
      ...data
    }
  }

  async remove(id, _params) {
    return {
      id: 0,
      text: 'removed'
    }
  }
}

export const getOptions = (app) => {
  return { app }
}
