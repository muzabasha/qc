import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Log Web Vitals to console in development
        if (process.env.NODE_ENV === 'development') {
            console.log('Web Vitals:', body)
        }

        // In production, you would send this to your analytics service
        // Example: await analytics.track(body)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error logging web vitals:', error)
        return NextResponse.json({ success: false }, { status: 500 })
    }
}
