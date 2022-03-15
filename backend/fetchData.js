import fetch from 'node-fetch';

const request = async (limit, skip) => {

    const query = `
    query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
      problemsetQuestionList: questionList(
        categorySlug: $categorySlug
        limit: $limit
        skip: $skip
        filters: $filters
      ) {
        total: totalNum
        questions: data {
          acRate
          difficulty
          freqBar
          frontendQuestionId: questionFrontendId
          isFavor
          paidOnly: isPaidOnly
          status
          title
          titleSlug
          topicTags {
            name
            id
            slug
          }
          hasSolution
          hasVideoSolution
        }
      }
    }
`

    const variables = {
      "categorySlug": "",
      "skip": skip,
      "limit": limit,
      "filters": {}
    }

    try {
      const response = await fetch('https://leetcode.com/graphql', {
    method: 'post',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({query, variables})
    })
      const result = await response.json()
      return result
    } catch (e) {
      console.log(e)
    }
}

const helper = async (limit=100, skip=0) => {
  const res = await request(limit, skip)
  return res
}

export default helper