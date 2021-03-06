var app = require('../app')
var db = app.get('db')

var Customer = function (customer) {
  this.id = customer.id
  this.name = customer.name
  this.registered_at = customer.registered_at
  this.address = customer.address
  this.city = customer.city
  this.state = customer.state
  this.postal_code = customer.postal_code
  this.phone = customer.phone
  this.account_credit = customer.account_credit
}

Customer.all = function (callback) {
  db.customers.find (function (error, customers) {
    callback(null, customers.map (function (customer) {
      return new Customer(customer)
    }))
  })
}

Customer.find = function(name, callback) {
  db.customers.findOne({name: name}, function(error, customer) {
    if(error || !customer) {
      callback(new Error("Customer not found"), undefined)
    } else {
      callback(null, new Customer(customer))
    }
  })
}

Customer.find_by_id = function(id, callback) {
  db.customers.findOne({id: id}, function(error, customer) {
    if(error || !customer) {
      callback(new Error("Customer not found"), undefined)
    } else {
      callback(null, new Customer(customer))
    }
  })
}

Customer.sort = function(field, n, p, callback){
  db.customers.find({}, {
    order: field,
    limit: n,
    offset: p
  }, function(error, customers) {
    if (error || !customers) {
      callback(new Error("Could not retrieve customers"), undefined)
    } else {
      callback(null, customers.map (function (customer) {
        return new Customer(customer)
      }))
    }
  })
}

module.exports = Customer
