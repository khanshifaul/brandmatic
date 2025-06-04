import { NextResponse } from 'next/server';
import type { ApiResponse } from '@/types/apiResponse';
import type { Product } from '@/types/product';

const EXTERNAL_API_URL = "https://backend.calquick.app/v2/api";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ ownerId: string; businessId: string; productId: string }> }
) {
  const { ownerId, businessId, productId } = await params;

  try {
    const response = await fetch(
      `${EXTERNAL_API_URL}/public/${ownerId}/${businessId}/products?_id=${productId}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 60 } // Cache for 1 minute
      }
    );

    if (!response.ok) {
      throw new Error(`External API responded with status: ${response.status}`);
    }

    const data: ApiResponse<Product[]> = await response.json();
    
    if (!data.data.length) {
      return NextResponse.json({
        success: false,
        data: null,
        error: 'Product not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: data.data[0],
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({
      success: false,
      data: null,
      error: error instanceof Error ? error.message : 'Failed to fetch product'
    }, { status: 500 });
  }
} 