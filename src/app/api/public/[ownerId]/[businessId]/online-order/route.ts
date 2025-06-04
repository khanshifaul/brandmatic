import { NextResponse } from 'next/server';
import type { ApiResponse } from '@/types/apiResponse';
import type { OnlineOrderPayload, OnlineOrderResponse } from '@/types/onlineOrder';

const EXTERNAL_API_URL = "https://backend.calquick.app/v2/api";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ ownerId: string; businessId: string }> }
) {
  const { ownerId, businessId } = await params;
  
  try {
    const orderData: OnlineOrderPayload = await request.json();

    const response = await fetch(
      `${EXTERNAL_API_URL}/public/${ownerId}/${businessId}/online-order`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      }
    );

    if (!response.ok) {
      throw new Error(`External API responded with status: ${response.status}`);
    }

    const data: ApiResponse<OnlineOrderResponse> = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating online order:', error);
    return NextResponse.json({
      success: false,
      data: null,
      error: error instanceof Error ? error.message : 'Failed to create online order'
    }, { status: 500 });
  }
} 