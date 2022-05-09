import { RequiredValidation } from '@/application/validation'
import { RequiredFieldError } from '@/application/validation/errors'

describe('RequiredValidation', () => {
  it('Should return error if field is empty', () => {
    const sut = new RequiredValidation('email')

    const error = sut.validate('')

    expect(error).toEqual(new RequiredFieldError())
  })
})
