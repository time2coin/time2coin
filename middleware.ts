import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * time2coin Multi-Jurisdiction Middleware
 * Automatically detects visiting user's country from Vercel Edge Geolocation
 * and initializes local jurisdiction cookie & request header.
 */

const JURISDICTION_MAP: Record<string, string> = {
  MY: 'MY-MYR', // Malaysia (RM 6.00 benchmark)
  SG: 'SG-SGD', // Singapore (S$ 5.00)
  ID: 'ID-IDR', // Indonesia (Rp 20,000)
  IN: 'IN-INR', // India (₹ 80.00)
  TH: 'TH-THB', // Thailand (฿ 60.00)
  US: 'US-USD', // United States ($ 6.00)
  DE: 'EU-EUR', // Eurozone ($ 6.00)
  FR: 'EU-EUR',
  ES: 'EU-EUR',
  IT: 'EU-EUR',
  NL: 'EU-EUR',
  AU: 'AU-AUD', // Australia (A$ 8.00)
};

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // 1. Check if user already has a saved jurisdiction cookie
  const existingJurisdiction = request.cookies.get('time2coin_jurisdiction')?.value;

  if (!existingJurisdiction) {
    // 2. Read country code from Vercel Edge network header
    const country =
      request.geo?.country ||
      request.headers.get('x-vercel-ip-country') ||
      'MY';

    const detectedJurisdiction = JURISDICTION_MAP[country] || 'MY-MYR';

    // 3. Set cookie valid for 1 year
    response.cookies.set('time2coin_jurisdiction', detectedJurisdiction, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });

    response.headers.set('x-time2coin-jurisdiction', detectedJurisdiction);
  } else {
    response.headers.set('x-time2coin-jurisdiction', existingJurisdiction);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static assets & images
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
