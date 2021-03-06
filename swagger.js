const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.3'})


const doc = {
    openapi:"3.0.3",
    info: {
        version: "1.0.0",
        title: "Innoart API",
        description: "Documentation automatically generated by the <b>swagger-autogen</b> module."
    },
    host: "localhost:9000",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Book",
            "description": "Endpoints"
        }
    ],
    servers: [
        {
          url: 'http://localhost:9000/',
          description: 'Local server'
        },
        {
            url: 'http://localhost:4500/',
            description: 'Testing server'
        },
        {
          url: 'http://petstore.swagger.io/v2/swagger.json',
          description: 'Production server'
        }
      ],
      securityDefinitions: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'Authorization',
        }
    },
    definitions: {
        Parents: {
            father: "Simon Doe",
            mother: "Marie Doe"
        },
        User: {
            name: "Karthik",
            age: 29,
            parents: {
                $ref: '#/definitions/Parents'
            },
            diplomas: [
                {
                    school: "XYZ University",
                    year: 2020,
                    completed: true,
                    internship: {
                        hours: 290,
                        location: "XYZ Company"
                    }
                }
            ]
        },
        AddUser: {
            $name: "Karthik",
            $age: 29,
            about: ""
        },
        Order2: {
            type: "object",
            properties: {
              id1: {
                type: "integer",
                format: "int64"
              },
              petId: {
                type: "integer",
                format: "int64"
              },
              quantity: {
                type: "integer",
                format: "int32"
              },
              shipDate: {
                type: "string",
                format: "date-time"
              },
              status: {
                type: "string",
                description: "Order Status",
                enum: [
                  "placed",
                  "approved",
                  "delivered"
                ]
              },
              complete: {
                type: "boolean",
                default: false
              }
            },
            xml: {
              name: "Order"
            }
          },
          Category: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                format: "int64"
              },
              name: {
                type: "string"
              }
            },
            xml: {
              name: "Category"
            }
          },
          User: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                format: "int64"
              },
              username: {
                type: "string"
              },
              firstName: {
                type: "string"
              },
              lastName: {
                type: "string"
              },
              email: {
                type: "string"
              },
              password: {
                type: "string"
              },
              phone: {
                type: "string"
              },
              userStatus: {
                type: "integer",
                format: "int32",
                description: "User Status"
              }
            },
            xml: {
              name: "User"
            }
          },
          Tag: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                format: "int64"
              },
              name: {
                type: "string"
              }
            },
            xml: {
              name: "Tag"
            }
          },
          Pet: {
            type: "object",
            required: [
              "name",
              "photoUrls"
            ],
            properties: {
              id: {
                type: "integer",
                format: "int64"
              },
              category: {
                $ref: "#/definitions/Category"
              },
              name: {
                type: "string",
                example: "doggie"
              },
              photoUrls: {
                type: "array",
                xml: {
                  name: "photoUrl",
                  wrapped: true
                },
                items: {
                  type: "string"
                }
              },
              tags: {
                type: "array",
                xml: {
                  name: "tag",
                  wrapped: true
                },
                items: {
                  $ref: "#/definitions/Tag"
                }
              },
              status: {
                type: "string",
                description: "pet status in the store",
                enum: [
                  "available",
                  "pending",
                  "sold"
                ]
              }
            },
            xml: {
              name: "Pet"
            }
          },
          ApiResponse: {
            type: "object",
            properties: {
              code: {
                type: "integer",
                format: "int32"
              },
              type: {
                type: "string"
              },
              message: {
                type: "string"
              }
            }
          },
    }
}

const outputFile = './autojson/swagger-output.json'
const endpointsFiles = ['./app.js']

// swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
//     require('./app.js')           // Your project's root file
// })

swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
    require('./app.js')   // Your project's root file
  });