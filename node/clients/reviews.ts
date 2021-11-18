import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'

import { BazaarVoiceReviews } from '../typings/reviews'

interface GetReviewArgs {
  appKey: string
  fieldProductId: string
  sort: string
  offset: string
  filter: string
  quantity: number
  contentLocale: string
  isRatingsOnly: boolean
}

export default class Reviews extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('http://api.bazaarvoice.com', context, options)
  }

  public async getReviews({
    appKey,
    fieldProductId,
    sort,
    offset,
    filter,
    quantity,
    contentLocale,
    isRatingsOnly,
  }: GetReviewArgs): Promise<BazaarVoiceReviews> {
    const endpoint = `/data/reviews.json?apiversion=5.4&passkey=${appKey}&Filter=ProductId:eq:${fieldProductId}&Sort=${sort}&Limit=${quantity}&Offset=${offset}&Include=Products,Comments&Stats=Reviews${
      filter
        ? `&Filter=Rating:eq:${filter}`
        : isRatingsOnly
        ? ''
        : '&Filter=IsRatingsOnly:eq:false'
    }${contentLocale ? `&Filter=ContentLocale:eq:${contentLocale}` : ``}`

    return this.http.get(endpoint, {
      metric: 'bazaarvoice-get-reviews',
    })
  }

  public async getReview({ reviewId, appKey }: any) {
    const endpoint = `/data/reviews.json?apiversion=5.4&passkey=${appKey}&filter=id:${reviewId}`

    return this.http.get(endpoint, {
      metric: 'bazaarvoice-get-reviews',
    })
  }
}
