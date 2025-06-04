import { NextResponse } from 'next/server';
import type { ApiResponse } from '@/types/apiResponse';
import type { Category } from '@/types/category';

const EXTERNAL_API_URL = "https://backend.calquick.app/v2/api";
const OWNER_ID = process.env.NEXT_PUBLIC_OWNER_ID || "6829ddabc20c6404b3e2a66b";
const BUSINESS_ID = process.env.NEXT_PUBLIC_BUSINESS_ID || "682b5d636be45193cf943b85";

export async function GET() {
  try {
    // Get business data which includes categories
    const response = await fetch(
      `${EXTERNAL_API_URL}/public/${OWNER_ID}/${BUSINESS_ID}`,
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

    const data: ApiResponse<{ categories: Category[] }> = await response.json();
    
    return NextResponse.json({
      success: true,
      data: data.data.categories,
    } as ApiResponse<Category[]>);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { 
        success: false,
        data: [],
        error: error instanceof Error ? error.message : 'Failed to fetch categories'
      } as ApiResponse<Category[]>,
      { status: 500 }
    );
  }
} 