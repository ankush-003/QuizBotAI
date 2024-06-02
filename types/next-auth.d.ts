import 'next-auth'
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
    interface User {
        _id?: string
        numQuizes?: number
        numGames?: number
        achievements?: any
        history?: any
        username?: string
    }
    interface Session {
        user: {
            _id?: string
            numQuizes?: number
            numGames?: number
            achievements?: any
            history?: any
            username?: string
        } & DefaultSession['user']
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        _id?: string
        numQuizes?: number
        numGames?: number
        achievements?: any
        history?: any
        username?: string
    }
}