import { Sheet, SheetContent, SheetHeader } from './sheet';
import { NavLinks } from './nav-links';

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  return (
    <Sheet isOpen={open} onClose={() => onOpenChange(false)} position='left'>
      <SheetHeader onClose={() => onOpenChange(false)}>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-semibold'>Menu</h2>
        </div>
      </SheetHeader>
      <SheetContent>
        <div className='mt-8'>
          <NavLinks />
        </div>
      </SheetContent>
    </Sheet>
  );
} 