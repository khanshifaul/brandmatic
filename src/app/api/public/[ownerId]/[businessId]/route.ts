import { NextResponse } from 'next/server';
import type { Business } from '@/types/business';

const EXTERNAL_API_URL = "https://backend.calquick.app/v2/api";

export async function GET(
  request: Request,
  context: { params: { ownerId: string; businessId: string } }
) {
  const { ownerId, businessId } = context.params;
  
  try {
    const response = await fetch(
      `${EXTERNAL_API_URL}/public/${ownerId}/${businessId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`External API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching business:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch business data'
      },
      { status: 500 }
    );
  }
} 