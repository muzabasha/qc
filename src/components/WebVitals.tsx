'use client'

import { useReportWebVitals } from 'next/web-vitals'

export function WebVitals() {
    useReportWebVitals((metric) => {
        // Send to analytics endpoint
        if (typeof window !== 'undefined') {
            fetch('/api/web-vitals', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(metric),
            }).catch(console.error)
        }
    })

    return null
}
