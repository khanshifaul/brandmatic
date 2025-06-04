import { NextResponse } from 'next/server';

import type { Product } from '@/types/product';
import { ApiResponse } from '@/types/apiResponse';

const EXTERNAL_API_URL = "https://backend.calquick.app/v2/api";
const OWNER_ID = process.env.NEXT_PUBLIC_OWNER_ID || "6829ddabc20c6404b3e2a66b";
const BUSINESS_ID = process.env.NEXT_PUBLIC_BUSINESS_ID || "682b5d636be45193cf943b85";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Build query parameters
    const queryParams = new URLSearchParams();
    searchParams.forEach((value, key) => {
      if (value) queryParams.append(key, value);
    });

    const response = await fetch(
      `${EXTERNAL_API_URL}/public/${OWNER_ID}/${BUSINESS_ID}/products?${queryParams}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 60 } // Cache for 1 minute since products change frequently
      }
    );

    if (!response.ok) {
      throw new Error(`External API responded with status: ${response.status}`);
    }

    const data: ApiResponse<Product[]> = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { 
        success: false,
        data: [],
        error: error instanceof Error ? error.message : 'Failed to fetch products'
      } as ApiResponse<Product[]>,
      { status: 500 }
    );
  }
}
