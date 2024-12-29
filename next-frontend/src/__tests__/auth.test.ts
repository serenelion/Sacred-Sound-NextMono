
import { getUserEmailFromToken } from '@/lib/auth'

describe('Auth Flow', () => {
  test('getUserEmailFromToken returns email from valid token', () => {
    const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20ifQ.qPOgUn8mGYGN-8t1_qeE76QJBEMYf-VWjygO-AgYx6k'
    const email = getUserEmailFromToken(mockToken)
    expect(email).toBe('test@test.com')
  })

  test('getUserEmailFromToken returns null for invalid token', () => {
    const email = getUserEmailFromToken('invalid-token')
    expect(email).toBeNull()
  })
})
