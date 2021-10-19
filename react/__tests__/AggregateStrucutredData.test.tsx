import React from 'react'
import { render } from '@vtex/test-tools/react'

import AggregateStructuredData from '../components/AggregateStructuredData'
import { mockProduct } from '../__fixture__/product'
import * as getBaseUrl from '../modules/baseUrl'

let mockGetBaseUrl: jest.SpyInstance
const mockedBaseUrl = `www.vtex.com.br`

describe('AggregateStructuredData component', () => {
  beforeAll(() => {
    mockGetBaseUrl = jest
      .spyOn(getBaseUrl, 'getBaseUrl')
      .mockReturnValue(mockedBaseUrl)
  })

  afterAll(() => {
    mockGetBaseUrl.mockRestore()
  })

  it(`should have the product's final production URI as @id`, () => {
    const { productName, productId, linkText } = mockProduct

    const { getByTestId } = render(
      <AggregateStructuredData
        productName={productName}
        productId={productId}
        productUrl={linkText}
        average={5}
        total={3}
      />
    )

    const schemaIdRegex = new RegExp(`"@id":"${mockedBaseUrl}/${linkText}/p"`)

    expect(getByTestId('schemaorg-aggregate').textContent).toMatch(
      schemaIdRegex
    )
  })
})
