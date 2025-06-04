import { NextResponse } from 'next/server';
import type { ApiResponse } from '@/types/apiResponse';
import type { Product } from '@/types/product';

const EXTERNAL_API_URL = "https://backend.calquick.app/v2/api";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ ownerId: string; businessId: string }> }
) {
  const { ownerId, businessId } = await params;
  
  try {
    const { searchParams } = new URL(request.url);
    
    // Build query parameters
    const queryParams = new URLSearchParams();
    searchParams.forEach((value, key) => {
      if (value) queryParams.append(key, value);
    });

    const response = await fetch(
      `${EXTERNAL_API_URL}/public/${ownerId}/${businessId}/products?${queryParams}`,
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
    return NextResponse.json({
      success: false,
      data: [],
      error: error instanceof Error ? error.message : 'Failed to fetch products'
    }, { status: 500 });
  }
} 