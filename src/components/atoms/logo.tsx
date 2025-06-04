import { useBusiness } from "@/hooks/useBusiness";
import { Business } from "@/types/business";
import Image from "next/image";
import { useMemo } from "react";

const Logo = () => {
  const { businessData } = useBusiness();
  const memoizedBusinessData = useMemo(() => businessData, [businessData]);

  if (!memoizedBusinessData || typeof memoizedBusinessData === undefined) return null;

  const business = memoizedBusinessData as unknown as Business;
  const name = business.businessName;
  const logoUrl = business.logo?.secure_url || business.logo?.optimizeUrl;

  return (
    <>
      {logoUrl ? (
        <Image
          src={logoUrl}
          alt='Logo'
          width={100}
          height={100}
          className='h-16 w-auto'
          onError={() => <h1 className='text-2xl font-bold'>{name}</h1>}
        />
      ) : (
        <h1 className='text-2xl font-bold'>{name}</h1>
      )}
    </>
  );
};

export default Logo;
