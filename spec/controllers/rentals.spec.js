var request = require("request")

var baseUrl = "http://localhost:3000"


describe("RentalsController", function() {
  var url = function(endpoint) {
    return baseUrl + "/rentals" + endpoint
  }

  describe("#getRentals", function(done) {
    it("returns a Success response", function(done) {
      request.get(url("/"), function(error, response, body) {
        expect(response.statusCode).toBe(200)
        done()
      })
    })

    it("returns JSON", function(done) {
      request.get(url("/"), function(error, response, body) {
        expect(response.headers['content-type']).toContain('application/json')
        done()
      })
    })

    it("should be an array of objects", function(done) {
      request.get(url("/"), function(error, response, body) {
        var data = JSON.parse(body)
        expect(typeof data).toEqual('object')

        for (var record of data) {
          expect(Object.keys(record)).toEqual([ 'id', 'title', 'overview', 'release_date', 'inventory' ])
        }
        done()
      })
    })
  })

  describe('#getRentalsShow', function(done) {
    it('returns a success response', function(done) {
      request.get(url("/Jaws"), function(error, response, body) {
        expect(response.statusCode).toBe(200)
        done()
      })
    })

    it("returns JSON", function(done) {
      request.get(url("/Jaws"), function(error, response, body) {
        expect(response.headers['content-type']).toContain('application/json')
        done()
      })
    })

    it("should be an array of objects", function(done) {
      request.get(url("/Jaws"), function(error, response, body) {
        var data = JSON.parse(body)
        expect(typeof data).toEqual('object')

        for (var record of data) {
          expect(Object.keys(record)).toEqual([ 'id', 'title', 'overview', 'release_date', 'inventory' ])
        }
        done()
      })
    })
  })
})
