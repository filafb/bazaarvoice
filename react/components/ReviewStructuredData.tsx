import React, { FC } from 'react'

import { getBaseUrl } from '../modules/baseUrl'

interface Props {
  productName: string
  productId: string
  productUrl: string
  review: {
    Rating: number
    UserNickname: string
    ReviewText: string
    SubmissionTime: string
  }
}

const ReviewStructuredData: FC<Props> = ({
  productName,
  productId,
  productUrl,
  review,
}) => {
  const baseUrl = getBaseUrl()

  const reviewStructuredData = {
    '@context': 'http://schema.org',
    '@type': 'Product',
    '@id': `${baseUrl}/${productUrl}/p`,
    mpn: productId,
    name: productName,
    review: {
      '@type': 'Review',
      reviewRating: {
        ratingValue: `${review.Rating}`,
        bestRating: '5',
      },
      author: {
        '@type': 'Person',
        name: review.UserNickname || 'Anonymous',
      },
      datePublished: review.SubmissionTime,
      reviewBody: review.ReviewText,
    },
  }

  return (
    <script
      type="application/ld+json"
      data-testid="schemaorg-review"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewStructuredData) }}
    />
  )
}

export default ReviewStructuredData
