import { Type as T } from '@sinclair/typebox'
import type { RouteHandler } from '../src'
import { OpenAPIHono, createRoute } from '../src'

describe('supports async handler', () => {
  const route = createRoute({
    method: 'get',
    path: '/users',
    request: {},
    responses: {
      200: {
        content: {
          'application/json': {
            schema: T.Object({
              id: T.String(),
            }),
          },
        },
        description: 'Retrieve the user',
      },
    },
  })

  test('argument of openapi method', () => {
    const hono = new OpenAPIHono()

    hono.openapi(route, (c) => {
      return c.json({
        id: '123',
      })
    })

    hono.openapi(route, async (c) => {
      return c.json({
        id: '123',
      })
    })
  })

  test('RouteHandler type', () => {
    const handler: RouteHandler<typeof route> = (c) => {
      return c.json({
        id: '123',
      })
    }

    const asyncHandler: RouteHandler<typeof route> = async (c) => {
      return c.json({
        id: '123',
      })
    }

    const hono = new OpenAPIHono()
    hono.openapi(route, handler)
    hono.openapi(route, asyncHandler)
  })
})
