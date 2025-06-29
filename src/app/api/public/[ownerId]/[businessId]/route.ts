import { NextResponse } from 'next/server';
import type { ApiResponse } from '@/types/apiResponse';
import type { Business } from '@/types/business';

const EXTERNAL_API_URL = "https://backend.calquick.app/v2/api";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ ownerId: string; businessId: string }> }
) {
  const { ownerId, businessId } = await params;
  
  try {
    const response = await fetch(
      `${EXTERNAL_API_URL}/public/${ownerId}/${businessId}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`External API responded with status: ${response.status}`);
    }

    const data: ApiResponse<Business> = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching business:', error);
    return NextResponse.json({
      success: false, 
      data: null,
      error: error instanceof Error ? error.message : 'Failed to fetch business data'
    }, { status: 500 });
  }
} 