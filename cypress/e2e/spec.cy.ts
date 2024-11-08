// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })

let token: string = ''

beforeEach(() => {
  const tokenHolder = { token: '' }
  const username = 'jperez'
  const password = 'admin123'
  cy.login(username, password, tokenHolder).then(response => {
    token = tokenHolder.token
    console.log({ TOKEN: token })
  })
})

describe('section a) Parking Spot Reserve', () => {
  it('should reserve a parking spot', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/reservations/reserve',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        vehicle: {
          id: 1,
          licensePlate: 'ABC-123',
          brand: 'Toyota',
          model: 'Camry',
          customerId: 1,
        },
        startTime: '2023-10-14T10:00:00Z',
        endTime: '2023-10-14T12:00:00Z',
      },
    }).then(response => {
      console.log(response.body)
    })
  })
})

describe('section b) Consult Parking Occupation', () => {
  it('should get the parking occupation details', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/parking-spots/occupation-details',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        time: '2023-10-15T11:00:00Z',
      },
    }).then(response => {
      console.log(response.body)
    })
  })
})

describe('section c) Update Employee', () => {
  it("should update employee's email and address", () => {
    cy.request({
      method: 'PATCH',
      url: 'http://localhost:3000/api/employees/update/1',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        employee: { email: 'test@test.com', address: 'test address' },
      },
    }).then(response => {
      console.log(response.body)
    })
  })
})

describe('section d) Parking Logs Access', () => {
  it('should get activity logs succesfully', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3000/api/activity-logs/all',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(response => {
      console.log(response.body)
    })
  })
})
