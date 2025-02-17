// admin/pages/custom-page.tsx
import Link from 'next/link';

export default function CustomPage () {
    return (
        <>
            <h1>This is a custom Admin UI Page v1</h1>
            <p>It can be accessed via the route <Link href="/custom-page">/custom-page</Link></p>
        </>
    )
}